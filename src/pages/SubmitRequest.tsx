import { useState, useRef } from "react";
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
import { ArrowRight, PenTool, Video, Image, Upload, X } from "lucide-react";

const serviceOptions = [
  { value: "content_writing", label: "Content Writing", icon: PenTool, desc: "Website content, LinkedIn posts, documentation" },
  { value: "video_image_editing", label: "Video & Image Editing", icon: Video, desc: "Social media edits, thumbnails, hashtag suggestions" },
  { value: "poster_making", label: "Poster Making", icon: Image, desc: "Event posters, flyers, social media graphics" },
] as const;

const MAX_FILES = 5;
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "application/pdf"];

const SubmitRequest = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serviceType, setServiceType] = useState<string>("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    const valid: File[] = [];
    for (const file of selected) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        toast({ title: "Invalid file type", description: `${file.name} is not supported. Use JPG, PNG, WEBP, GIF, or PDF.`, variant: "destructive" });
        continue;
      }
      if (file.size > MAX_FILE_SIZE) {
        toast({ title: "File too large", description: `${file.name} exceeds 10MB limit.`, variant: "destructive" });
        continue;
      }
      valid.push(file);
    }

    const combined = [...files, ...valid].slice(0, MAX_FILES);
    setFiles(combined);

    const newPreviews: string[] = [];
    combined.forEach((f) => {
      if (f.type.startsWith("image/")) {
        newPreviews.push(URL.createObjectURL(f));
      } else {
        newPreviews.push("");
      }
    });
    setPreviews(newPreviews);

    if (e.target) e.target.value = "";
  };

  const removeFile = (index: number) => {
    if (previews[index]) URL.revokeObjectURL(previews[index]);
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadFiles = async (): Promise<string[]> => {
    if (!user || files.length === 0) return [];
    const urls: string[] = [];
    for (const file of files) {
      const sanitizedName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      const path = `${user.id}/${Date.now()}_${sanitizedName}`;
      const { error } = await supabase.storage.from("request-attachments").upload(path, file);
      if (error) {
        toast({ title: "Upload failed", description: `Could not upload ${file.name}.`, variant: "destructive" });
      } else {
        urls.push(path);
      }
    }
    return urls;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !serviceType || !title.trim() || !description.trim()) return;

    setIsSubmitting(true);

    const attachments = await uploadFiles();

    const { error } = await supabase.from("service_requests").insert({
      client_id: user.id,
      service_type: serviceType as "content_writing" | "video_image_editing" | "poster_making",
      title: title.trim(),
      description: description.trim(),
      attachments,
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

                  {/* File Upload Section */}
                  <div className="space-y-3">
                    <Label>Sample Images / References <span className="text-muted-foreground font-normal">(Optional)</span></Label>
                    <p className="text-xs text-muted-foreground">
                      Upload up to {MAX_FILES} sample images or PDFs to help us understand your vision better.
                    </p>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept={ALLOWED_TYPES.join(",")}
                      multiple
                      onChange={handleFilesChange}
                      className="hidden"
                    />

                    {files.length < MAX_FILES && (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full border-2 border-dashed border-border rounded-xl p-6 flex flex-col items-center gap-2 hover:border-primary/50 hover:bg-secondary/30 transition-colors cursor-pointer"
                      >
                        <Upload className="w-8 h-8 text-muted-foreground" />
                        <span className="text-sm font-medium text-muted-foreground">
                          Click to upload or drag & drop
                        </span>
                        <span className="text-xs text-muted-foreground">
                          JPG, PNG, WEBP, GIF, PDF • Max 10MB each
                        </span>
                      </button>
                    )}

                    {files.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3">
                        {files.map((file, i) => (
                          <div key={i} className="relative group rounded-xl overflow-hidden border border-border bg-card">
                            {previews[i] ? (
                              <img src={previews[i]} alt={file.name} className="w-full h-28 object-cover" />
                            ) : (
                              <div className="w-full h-28 flex items-center justify-center bg-secondary/50">
                                <span className="text-xs text-muted-foreground font-medium">PDF</span>
                              </div>
                            )}
                            <div className="p-2">
                              <p className="text-xs text-foreground truncate">{file.name}</p>
                              <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(0)} KB</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeFile(i)}
                              className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
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
                  🌿 Your request will be personally handled with <strong className="text-foreground">unlimited revisions</strong> — no AI shortcuts. 
                  Download available after payment confirmation.
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