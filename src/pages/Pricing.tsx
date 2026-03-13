import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check, ArrowRight, Sparkles, Star, Zap, Crown } from "lucide-react";

const pricingTiers = [
  {
    name: "Starter",
    price: "₹100",
    period: "per project",
    description: "For basic, standard content needs",
    icon: Zap,
    features: [
      "Standard content writing",
      "Basic image/video edits",
      "Simple poster designs",
      "1 revision included",
      "Delivery in 2-3 days",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Professional",
    price: "₹300",
    period: "per project",
    description: "For business-critical, high-quality content",
    icon: Star,
    features: [
      "Professional-grade content",
      "Advanced editing & effects",
      "Custom poster designs",
      "3 revisions included",
      "Priority delivery (1-2 days)",
      "Hashtag & SEO optimization",
    ],
    cta: "Choose Professional",
    popular: true,
  },
  {
    name: "Premium",
    price: "₹500+",
    period: "per project",
    description: "For critical, large-scale or urgent projects",
    icon: Crown,
    features: [
      "Premium research-backed content",
      "Full video production & editing",
      "Brand-aligned poster suites",
      "Unlimited revisions",
      "Same-day rush delivery",
      "Dedicated support",
      "Source files included",
    ],
    cta: "Go Premium",
    popular: false,
  },
];

const subscriptionPlans = [
  {
    name: "Free Trial",
    price: "₹0",
    period: "first project",
    description: "Try us out — your first project is completely free. No strings attached.",
    features: [
      "1 free project (any service)",
      "Standard delivery timeline",
      "1 revision included",
    ],
    cta: "Start Free Trial",
    highlight: false,
  },
  {
    name: "Basic Plan",
    price: "₹499",
    period: "per month",
    description: "Great for individuals and small creators who need regular content.",
    features: [
      "5 projects per month",
      "Standard delivery",
      "2 revisions per project",
      "Email support",
    ],
    cta: "Subscribe",
    highlight: false,
  },
  {
    name: "Pro Plan",
    price: "₹999",
    period: "per month",
    description: "Perfect for businesses and teams with ongoing content needs.",
    features: [
      "15 projects per month",
      "Priority delivery",
      "Unlimited revisions",
      "Direct chat support",
      "Hashtag & SEO optimization",
    ],
    cta: "Subscribe",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "₹1,999",
    period: "per month",
    description: "For agencies and large teams needing dedicated support.",
    features: [
      "Unlimited projects",
      "Same-day rush delivery",
      "Unlimited revisions",
      "Dedicated creator assigned",
      "Source files included",
      "Priority support",
    ],
    cta: "Contact Us",
    highlight: false,
  },
];

const Pricing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20">
        {/* Hero */}
        <section className="py-16 md:py-24 bg-gradient-hero relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-sage/30 rounded-full blur-3xl" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block px-4 py-1 rounded-full bg-secondary text-sm font-medium text-secondary-foreground mb-4">
                Pricing
              </span>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Simple, <span className="text-gradient-forest">Transparent Pricing</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Your first project is free. After that, pay based on content complexity 
                or choose a subscription plan for ongoing needs.
              </p>
            </div>
          </div>
        </section>

        {/* Per-Project Pricing */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="inline-block px-4 py-1 rounded-full bg-secondary text-sm font-medium text-secondary-foreground mb-4">
                Pay Per Project
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                Content Pricing by Complexity
              </h2>
              <p className="text-muted-foreground text-lg">
                Charges are based on the complexity and urgency of your project. 
                Standard content starts at ₹100.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {pricingTiers.map((tier) => (
                <div
                  key={tier.name}
                  className={`relative p-8 rounded-2xl border transition-all duration-300 ${
                    tier.popular
                      ? "bg-gradient-card border-primary shadow-elevated scale-[1.02]"
                      : "bg-gradient-card border-border shadow-soft hover:shadow-elevated"
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-accent text-accent-foreground text-xs font-bold">
                      Most Popular
                    </div>
                  )}

                  <div className="w-12 h-12 rounded-xl bg-gradient-forest flex items-center justify-center mb-6">
                    <tier.icon className="w-6 h-6 text-primary-foreground" />
                  </div>

                  <h3 className="font-serif text-xl font-bold text-foreground mb-1">{tier.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{tier.description}</p>

                  <div className="mb-6">
                    <span className="font-serif text-4xl font-bold text-foreground">{tier.price}</span>
                    <span className="text-muted-foreground text-sm ml-1">/{tier.period}</span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-foreground">
                        <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link to="/login">
                    <Button
                      variant={tier.popular ? "hero" : "outline"}
                      className="w-full group"
                    >
                      {tier.cta}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Subscription Plans */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="inline-block px-4 py-1 rounded-full bg-card text-sm font-medium text-foreground mb-4">
                <Sparkles className="w-4 h-4 inline mr-1" />
                Subscription Plans
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                Save More with Monthly Plans
              </h2>
              <p className="text-muted-foreground text-lg">
                For regular content needs, our subscription plans offer the best value.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {subscriptionPlans.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative p-6 rounded-2xl border transition-all duration-300 ${
                    plan.highlight
                      ? "bg-gradient-card border-primary shadow-elevated"
                      : "bg-card border-border shadow-soft hover:shadow-elevated"
                  }`}
                >
                  {plan.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-accent text-accent-foreground text-xs font-bold">
                      Best Value
                    </div>
                  )}

                  <h3 className="font-serif text-lg font-bold text-foreground mb-1">{plan.name}</h3>
                  <div className="mb-2">
                    <span className="font-serif text-3xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground text-sm ml-1">/{plan.period}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-6">{plan.description}</p>

                  <ul className="space-y-2 mb-6">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-foreground">
                        <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link to={plan.name === "Enterprise" ? "/contact" : "/login"}>
                    <Button
                      variant={plan.highlight ? "hero" : "outline"}
                      size="sm"
                      className="w-full"
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Subscriber Discount Banner */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto p-8 rounded-2xl bg-gradient-to-r from-accent/20 via-secondary/50 to-accent/20 border-2 border-accent/30 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/30 text-accent-foreground mb-4">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-bold">Subscriber Exclusive</span>
              </div>
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-3">
                Subscribe & Get 10% Off Every Project!
              </h3>
              <p className="text-muted-foreground text-lg mb-2">
                Subscribers receive exclusive offers, newsletters, and new updates via email — before anyone else.
              </p>
              <p className="text-sm text-muted-foreground">
                Scroll down to subscribe, or visit our homepage to join the list.
              </p>
            </div>
          </div>
        </section>

        {/* Payment Info */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-serif text-3xl font-bold text-foreground mb-4">
                How Payment Works
              </h2>
              <p className="text-muted-foreground text-lg mb-10">
                Your completed project will be available for download only after payment is confirmed. 
                We support multiple payment methods for your convenience.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {["Google Pay", "PayPal", "Paytm", "UPI"].map((method) => (
                  <div
                    key={method}
                    className="p-4 rounded-xl bg-gradient-card border border-border text-center"
                  >
                    <p className="font-medium text-foreground">{method}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-6">
                After you submit a request and your content is ready, you'll receive a payment link. 
                Once payment is confirmed, the download will be unlocked instantly.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Pricing;
