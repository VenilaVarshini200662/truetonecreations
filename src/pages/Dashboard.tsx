import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Clock, CheckCircle, AlertCircle, Truck, RefreshCw } from "lucide-react";

type ServiceRequest = {
  id: string;
  service_type: string;
  title: string;
  description: string;
  status: string;
  admin_reply: string | null;
  delivery_url: string | null;
  created_at: string;
};

const statusConfig: Record<string, { label: string; icon: typeof Clock; color: string }> = {
  pending: { label: "Pending", icon: Clock, color: "bg-yellow-100 text-yellow-800" },
  in_progress: { label: "In Progress", icon: RefreshCw, color: "bg-blue-100 text-blue-800" },
  completed: { label: "Completed", icon: CheckCircle, color: "bg-green-100 text-green-800" },
  revision_requested: { label: "Revision Requested", icon: AlertCircle, color: "bg-orange-100 text-orange-800" },
  delivered: { label: "Delivered", icon: Truck, color: "bg-primary/10 text-primary" },
};

const serviceLabels: Record<string, string> = {
  content_writing: "Content Writing",
  video_image_editing: "Video & Image Editing",
  poster_making: "Poster Making",
};

const Dashboard = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    setLoading(true);
    supabase
      .from("service_requests")
      .select("*")
      .eq("client_id", user.id)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setRequests(data ?? []);
        setLoading(false);
      });
  }, [user]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h1 className="font-serif text-3xl font-bold text-foreground">My Requests</h1>
                <p className="text-muted-foreground mt-1">Track your service requests and deliveries</p>
              </div>
              <Link to="/submit-request">
                <Button variant="hero" className="group">
                  <Plus className="w-5 h-5" />
                  New Request
                </Button>
              </Link>
            </div>

            {loading ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
              </div>
            ) : requests.length === 0 ? (
              <div className="text-center py-20 rounded-3xl bg-gradient-card border border-border">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center">
                  <Plus className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="font-serif text-xl font-bold text-foreground mb-2">No requests yet</h3>
                <p className="text-muted-foreground mb-6">Submit your first service request to get started!</p>
                <Link to="/submit-request">
                  <Button variant="hero">Submit a Request</Button>
                </Link>
              </div>
            ) : (
              <div className="grid gap-4">
                {requests.map((req) => {
                  const status = statusConfig[req.status] ?? statusConfig.pending;
                  const StatusIcon = status.icon;
                  return (
                    <div key={req.id} className="p-6 rounded-2xl bg-gradient-card border border-border shadow-soft hover:shadow-elevated transition-shadow">
                      <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Badge variant="secondary" className="text-xs">
                              {serviceLabels[req.service_type] ?? req.service_type}
                            </Badge>
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${status.color}`}>
                              <StatusIcon className="w-3 h-3" />
                              {status.label}
                            </span>
                          </div>
                          <h3 className="font-serif text-lg font-bold text-foreground">{req.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{req.description}</p>
                          <p className="text-xs text-muted-foreground mt-2">
                            Submitted: {new Date(req.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex flex-col gap-2 items-end">
                          {req.admin_reply && (
                            <div className="p-3 rounded-xl bg-secondary text-sm max-w-xs">
                              <p className="text-xs font-medium text-primary mb-1">Admin Reply:</p>
                              <p className="text-foreground">{req.admin_reply}</p>
                            </div>
                          )}
                          {req.delivery_url && (
                            <Button
                              variant="hero"
                              size="sm"
                              onClick={async () => {
                                const { data, error } = await supabase.storage
                                  .from("deliverables")
                                  .createSignedUrl(req.delivery_url!, 3600, { download: true });
                                if (error) {
                                  console.error("Download error:", error);
                                  return;
                                }
                                if (data?.signedUrl) {
                                  const link = document.createElement("a");
                                  link.href = data.signedUrl;
                                  link.download = req.delivery_url!.split("/").pop() || "delivery";
                                  document.body.appendChild(link);
                                  link.click();
                                  document.body.removeChild(link);
                                }
                              }}
                            >
                              Download Delivery
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
