 import { Link } from "react-router-dom";
 import { Button } from "@/components/ui/button";
 import { ArrowRight, Sparkles, Users, Clock } from "lucide-react";
 
 const HeroSection = () => {
   return (
     <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
       {/* Background decoration */}
       <div className="absolute inset-0 bg-gradient-hero" />
       <div className="absolute top-20 right-0 w-96 h-96 bg-sage/30 rounded-full blur-3xl" />
       <div className="absolute bottom-20 left-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
       
       <div className="container mx-auto px-4 relative z-10">
         <div className="max-w-4xl mx-auto text-center">
           {/* Badge */}
           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border mb-8 animate-fade-in">
             <Sparkles className="w-4 h-4 text-accent" />
             <span className="text-sm font-medium text-secondary-foreground">
               100% Human-Crafted • AI-Free Services
             </span>
           </div>
 
           {/* Main Heading */}
           <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight mb-6 animate-slide-up">
             Turning Visions Into{" "}
             <span className="text-gradient-forest">Exact Results</span>
           </h1>
 
           {/* Subheading */}
           <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up" style={{ animationDelay: "0.1s" }}>
             Professional creative services delivered by humans who understand your vision. 
             No AI guesswork—just precise, personalized content that matches exactly what you need.
           </p>
 
           {/* CTA Buttons */}
           <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up" style={{ animationDelay: "0.2s" }}>
             <Link to="/services">
               <Button variant="hero" size="xl" className="group">
                 Explore Services
                 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
               </Button>
             </Link>
             <Link to="/contact">
               <Button variant="outline" size="xl">
                 Contact Me
               </Button>
             </Link>
           </div>
 
           {/* Trust Indicators */}
           <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: "0.3s" }}>
             <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-card shadow-soft">
               <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                 <Sparkles className="w-6 h-6 text-primary" />
               </div>
               <div className="text-left">
                 <p className="font-semibold text-foreground">100% Free</p>
                 <p className="text-sm text-muted-foreground">No hidden costs</p>
               </div>
             </div>
             
             <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-card shadow-soft">
               <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                 <Users className="w-6 h-6 text-primary" />
               </div>
               <div className="text-left">
                 <p className="font-semibold text-foreground">Human Touch</p>
                 <p className="text-sm text-muted-foreground">No AI involved</p>
               </div>
             </div>
             
             <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-card shadow-soft">
               <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                 <Clock className="w-6 h-6 text-primary" />
               </div>
               <div className="text-left">
                 <p className="font-semibold text-foreground">Quick Delivery</p>
                 <p className="text-sm text-muted-foreground">Hours to days</p>
               </div>
             </div>
           </div>
         </div>
       </div>
     </section>
   );
 };
 
 export default HeroSection;