import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight, PenTool, Video, Image } from "lucide-react";

const serviceOptions = [
  { value: "content_writing", label: "Content Writing", icon: PenTool, desc: "Website content, LinkedIn posts, documentation" },
  { value: "video_image_editing", label: "Video & Image Editing", icon: Video, desc: "Social media edits, thumbnails, hashtag suggestions" },
  { value: "poster_making", label: "Poster Making", icon: Image, desc: "Event posters, flyers, social media graphics" },
] as const;

const SubmitRequest = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serviceType, setServiceType] = useState<string>("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !serviceType || !title.trim() || !description.trim()) return;

    setIsSubmitting(true);
    const { error } = await supabase.from("service_requests").insert({
      client_id: user.id,
      service_type: serviceType as "content_writing" | "video_image_editing" | "poster_making",
      title: title.trim(),
      description: description.trim(),
    });

    setIsSubmitting(false);

    if (error) {
      toast({ title: "Error", description: "Failed to submit request. Please try again.", variant: "destructive" });
      return;
    }

    toast({ title: "Request Submitted!", description: "You'll receive a response with the timeline shortly." });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-10">
                <span className="inline-block px-4 py-1 rounded-full bg-secondary text-sm font-medium text-secondary-foreground mb-4">
                  New Request
                </span>
                <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">
                  Submit Your <span className="text-gradient-forest">Service Request</span>
                </h1>
                <p className="text-muted-foreground text-lg">
                  Describe what you need and I'll get back to you with a timeline.
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-gradient-card border border-border shadow-elevated">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="service-type">Service Type</Label>
                    <Select value={serviceType} onValueChange={setServiceType} required>
                      <SelectTrigger className="bg-card">
                        <SelectValue placeholder="Select a service..." />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceOptions.map((s) => (
                          <SelectItem key={s.value} value={s.value}>
                            <div className="flex items-center gap-2">
                              <s.icon className="w-4 h-4" />
                              <span>{s.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {serviceType && (
                      <p className="text-xs text-muted-foreground">
                        {serviceOptions.find((s) => s.value === serviceType)?.desc}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="title">Request Title</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. LinkedIn post for product launch"
                      required
                      className="bg-card"
                      maxLength={200}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Detailed Description</Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe exactly what you need — the more detail, the better the result. Include any references, tone preferences, target audience, etc."
                      required
                      className="bg-card min-h-[160px]"
                      maxLength={5000}
                    />
                    <p className="text-xs text-muted-foreground text-right">
                      {description.length}/5000
                    </p>
                  </div>

                  <Button
                    type="submit"
                    variant="hero"
                    size="lg"
                    className="w-full group"
                    disabled={isSubmitting || !serviceType || !title.trim() || !description.trim()}
                  >
                    {isSubmitting ? "Submitting..." : (
                      <>
                        Submit Request
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </form>
              </div>

              <div className="mt-6 p-4 rounded-xl bg-secondary/50 text-center">
                <p className="text-sm text-muted-foreground">
                  🌿 This is <strong className="text-foreground">100% free</strong> with unlimited revisions. 
                  Your request will be personally handled — no AI shortcuts.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SubmitRequest;
