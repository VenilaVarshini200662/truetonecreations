import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Bell, Gift, Sparkles, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const SubscribeSection = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({ title: "Invalid email", description: "Please enter a valid email address.", variant: "destructive" });
      return;
    }

    setLoading(true);
    const { error } = await supabase.from("subscribers").insert({
      email: email.trim(),
      user_id: user?.id ?? null,
    } as any);

    setLoading(false);

    if (error) {
      if (error.code === "23505") {
        toast({ title: "Already subscribed!", description: "This email is already on our list." });
      } else {
        toast({ title: "Error", description: "Something went wrong. Please try again.", variant: "destructive" });
      }
      return;
    }

    setSubscribed(true);
    toast({ title: "Subscribed! 🎉", description: "Welcome aboard! You'll receive updates and exclusive offers." });
  };

  const benefits = [
    { icon: Gift, text: "10% off on every project" },
    { icon: Bell, text: "Early access to new updates & features" },
    { icon: Mail, text: "Exclusive offers & newsletters via email" },
  ];

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-secondary/40 to-primary/5" />
      <div className="absolute top-10 left-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-60 h-60 bg-primary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent/20 text-accent-foreground mb-6 animate-pulse">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-bold uppercase tracking-wide">Subscribers Get 10% Off!</span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Stay Ahead with <span className="text-gradient-forest">Exclusive Updates</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Subscribe to get the latest offers, newsletters, and project updates delivered straight to your inbox — before anyone else.
            </p>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {benefits.map((benefit) => (
              <div
                key={benefit.text}
                className="flex items-center gap-3 p-4 rounded-xl bg-card/80 backdrop-blur border border-border shadow-soft"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="w-5 h-5 text-accent-foreground" />
                </div>
                <span className="text-sm font-medium text-foreground">{benefit.text}</span>
              </div>
            ))}
          </div>

          {/* Subscribe Form */}
          <div className="p-8 md:p-10 rounded-2xl bg-gradient-card border-2 border-accent/30 shadow-elevated">
            {subscribed ? (
              <div className="text-center py-4">
                <CheckCircle className="w-16 h-16 text-accent mx-auto mb-4" />
                <h3 className="font-serif text-2xl font-bold text-foreground mb-2">You're In! 🎉</h3>
                <p className="text-muted-foreground">
                  You'll now receive exclusive updates, offers, and newsletters directly in your inbox.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-12 h-14 text-base bg-background border-border rounded-xl"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  variant="hero"
                  size="xl"
                  disabled={loading}
                  className="h-14 px-8 text-base font-bold whitespace-nowrap"
                >
                  {loading ? "Subscribing..." : "Subscribe & Save 10%"}
                </Button>
              </form>
            )}
            <p className="text-xs text-muted-foreground mt-4 text-center">
              No spam, ever. Unsubscribe anytime. Your privacy matters to us.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubscribeSection;
