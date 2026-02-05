 import { Link } from "react-router-dom";
 import { Button } from "@/components/ui/button";
 import { ArrowRight, Sparkles } from "lucide-react";
 
 const CTASection = () => {
   return (
     <section className="py-20 md:py-28 bg-secondary/30">
       <div className="container mx-auto px-4">
         <div className="max-w-4xl mx-auto text-center p-8 md:p-12 rounded-3xl bg-gradient-card border border-border shadow-elevated relative overflow-hidden">
           {/* Background decoration */}
           <div className="absolute top-0 right-0 w-40 h-40 bg-accent/10 rounded-full blur-2xl" />
           <div className="absolute bottom-0 left-0 w-32 h-32 bg-sage/30 rounded-full blur-2xl" />
           
           <div className="relative z-10">
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent-foreground mb-6">
               <Sparkles className="w-4 h-4" />
               <span className="text-sm font-medium">Ready to Start?</span>
             </div>
             
             <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
               Transform Your Vision Into Reality
             </h2>
             <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
               Join others who trust TrueTone Creations for human-crafted, AI-free creative services. 
               It's completely free—start your project today!
             </p>
 
             <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
               <Link to="/login">
                 <Button variant="hero" size="xl" className="group">
                   Get Started Free
                   <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                 </Button>
               </Link>
               <Link to="/services">
                 <Button variant="outline" size="xl">
                   Explore Services
                 </Button>
               </Link>
             </div>
           </div>
         </div>
       </div>
     </section>
   );
 };
 
 export default CTASection;