import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Clock, CheckCircle, AlertCircle, Truck, RefreshCw,
  MessageSquare, Upload, Eye, Users,
} from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type RequestStatus = Database["public"]["Enums"]["request_status"];

type ServiceRequest = {
  id: string;
  service_type: string;
  title: string;
  description: string;
  status: RequestStatus;
  admin_reply: string | null;
  delivery_url: string | null;
  created_at: string;
  client_id: string;
  profiles?: { full_name: string; email: string } | null;
};

const statusConfig: Record<string, { label: string; icon: typeof Clock; color: string }> = {
  pending: { label: "Pending", icon: Clock, color: "bg-yellow-100 text-yellow-800" },
  in_progress: { label: "In Progress", icon: RefreshCw, color: "bg-blue-100 text-blue-800" },
  completed: { label: "Completed", icon: CheckCircle, color: "bg-green-100 text-green-800" },
  revision_requested: { label: "Revision", icon: AlertCircle, color: "bg-orange-100 text-orange-800" },
  delivered: { label: "Delivered", icon: Truck, color: "bg-primary/10 text-primary" },
};

const serviceLabels: Record<string, string> = {
  content_writing: "Content Writing",
  video_image_editing: "Video & Image Editing",
  poster_making: "Poster Making",
};

const statusOptions: { value: RequestStatus; label: string }[] = [
  { value: "pending", label: "Pending" },
  { value: "in_progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
  { value: "revision_requested", label: "Revision Requested" },
  { value: "delivered", label: "Delivered" },
];

const AdminDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);
  const [replyText, setReplyText] = useState("");
  const [newStatus, setNewStatus] = useState<RequestStatus>("pending");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const fetchRequests = async () => {
    const { data, error } = await supabase
      .from("service_requests")
      .select("*, profiles!service_requests_client_id_fkey(full_name, email)")
      .order("created_at", { ascending: false });

    if (error) {
      // Fallback: fetch without join if foreign key doesn't exist
      const { data: fallbackData } = await supabase
        .from("service_requests")
        .select("*")
        .order("created_at", { ascending: false });
      setRequests((fallbackData as ServiceRequest[]) ?? []);
    } else {
      setRequests((data as unknown as ServiceRequest[]) ?? []);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!user) return;
    fetchRequests();
  }, [user]);

  const handleOpenRequest = (req: ServiceRequest) => {
    setSelectedRequest(req);
    setReplyText(req.admin_reply ?? "");
    setNewStatus(req.status);
  };

  const handleSave = async () => {
    if (!selectedRequest) return;
    setSaving(true);

    const { error } = await supabase
      .from("service_requests")
      .update({
        status: newStatus,
        admin_reply: replyText.trim() || null,
      })
      .eq("id", selectedRequest.id);

    setSaving(false);
    if (error) {
      toast({ title: "Error", description: "Failed to update request.", variant: "destructive" });
      return;
    }

    toast({ title: "Updated!", description: "Request has been updated successfully." });
    setSelectedRequest(null);
    fetchRequests();
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedRequest || !e.target.files?.[0]) return;
    const file = e.target.files[0];
    setUploading(true);

    const filePath = `${selectedRequest.client_id}/${selectedRequest.id}/${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from("deliverables")
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      toast({ title: "Upload Failed", description: uploadError.message, variant: "destructive" });
      setUploading(false);
      return;
    }

    // Store the file path (not a public URL) so we can generate signed URLs on demand
    const { error: updateError } = await supabase
      .from("service_requests")
      .update({ delivery_url: filePath, status: "delivered" as RequestStatus })
      .eq("id", selectedRequest.id);

    setUploading(false);
    if (updateError) {
      toast({ title: "Error", description: "File uploaded but failed to update request.", variant: "destructive" });
      return;
    }

    toast({ title: "Delivered!", description: "File uploaded and request marked as delivered." });
    setSelectedRequest(null);
    fetchRequests();
  };

  const filtered = filterStatus === "all" ? requests : requests.filter((r) => r.status === filterStatus);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
              <div>
                <h1 className="font-serif text-3xl font-bold text-foreground flex items-center gap-3">
                  <Users className="w-8 h-8 text-primary" />
                  Admin Dashboard
                </h1>
                <p className="text-muted-foreground mt-1">Manage all client service requests</p>
              </div>
              <div className="flex items-center gap-3">
                <Label className="text-sm whitespace-nowrap">Filter:</Label>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-[180px] bg-card">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Requests</SelectItem>
                    {statusOptions.map((s) => (
                      <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20 rounded-3xl bg-gradient-card border border-border">
                <h3 className="font-serif text-xl font-bold text-foreground mb-2">No requests found</h3>
                <p className="text-muted-foreground">
                  {filterStatus === "all" ? "No client requests yet." : "No requests with this status."}
                </p>
              </div>
            ) : (
              <div className="grid gap-4">
                {filtered.map((req) => {
                  const status = statusConfig[req.status] ?? statusConfig.pending;
                  const StatusIcon = status.icon;
                  return (
                    <div
                      key={req.id}
                      className="p-6 rounded-2xl bg-gradient-card border border-border shadow-soft hover:shadow-elevated transition-shadow cursor-pointer"
                      onClick={() => handleOpenRequest(req)}
                    >
                      <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
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
                          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                            <span>Client: {req.profiles?.full_name ?? req.profiles?.email ?? req.client_id.slice(0, 8)}</span>
                            <span>Submitted: {new Date(req.created_at).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="gap-2 shrink-0">
                          <Eye className="w-4 h-4" /> Manage
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Manage Request Dialog */}
            <Dialog open={!!selectedRequest} onOpenChange={(open) => !open && setSelectedRequest(null)}>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle className="font-serif">Manage Request</DialogTitle>
                </DialogHeader>
                {selectedRequest && (
                  <div className="space-y-5">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Title</p>
                      <p className="text-foreground font-medium">{selectedRequest.title}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Description</p>
                      <p className="text-foreground text-sm">{selectedRequest.description}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Service</p>
                      <Badge variant="secondary">{serviceLabels[selectedRequest.service_type] ?? selectedRequest.service_type}</Badge>
                    </div>

                    <div className="space-y-2">
                      <Label>Update Status</Label>
                      <Select value={newStatus} onValueChange={(v) => setNewStatus(v as RequestStatus)}>
                        <SelectTrigger className="bg-card">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {statusOptions.map((s) => (
                            <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Reply to Client</Label>
                      <Textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="e.g. I'll have this ready in 2 days..."
                        className="bg-card min-h-[100px]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <Upload className="w-4 h-4" /> Upload Deliverable
                      </Label>
                      <Input
                        type="file"
                        onChange={handleFileUpload}
                        disabled={uploading}
                        className="bg-card"
                      />
                      {uploading && <p className="text-xs text-muted-foreground">Uploading...</p>}
                      {selectedRequest.delivery_url && (
                        <button
                          type="button"
                          className="text-xs text-primary underline cursor-pointer"
                          onClick={async () => {
                            const { data } = await supabase.storage
                              .from("deliverables")
                              .createSignedUrl(selectedRequest.delivery_url!, 3600);
                            if (data?.signedUrl) window.open(data.signedUrl, "_blank");
                          }}
                        >
                          Current delivery file
                        </button>
                      )}
                    </div>

                    <Button onClick={handleSave} disabled={saving} variant="hero" className="w-full">
                      {saving ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
