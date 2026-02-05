 import { Link } from "react-router-dom";
 import { Button } from "@/components/ui/button";
 import { ClipboardList, MessageSquare, Clock, CheckCircle, ArrowRight } from "lucide-react";
 
 const steps = [
   {
     number: "01",
     icon: ClipboardList,
     title: "Describe Your Need",
     description: "Sign up and submit a detailed description of what you're looking for. The more details, the better the result!",
   },
   {
     number: "02",
     icon: MessageSquare,
     title: "Receive Timeline",
     description: "I'll review your request and get back to you with an estimated delivery time based on the complexity.",
   },
   {
     number: "03",
     icon: Clock,
     title: "Work in Progress",
     description: "Your project is carefully crafted with attention to every detail. You'll be notified when it's ready.",
   },
   {
     number: "04",
     icon: CheckCircle,
     title: "Review & Revise",
     description: "Receive your completed work. Need changes? Request corrections until you're 100% satisfied.",
   },
 ];
 
 const HowItWorksSection = () => {
   return (
     <section className="py-20 md:py-28 bg-background relative overflow-hidden">
       {/* Background decoration */}
       <div className="absolute top-1/2 right-0 w-96 h-96 bg-sage/20 rounded-full blur-3xl -translate-y-1/2" />
       
       <div className="container mx-auto px-4 relative z-10">
         {/* Section Header */}
         <div className="text-center max-w-2xl mx-auto mb-16">
           <span className="inline-block px-4 py-1 rounded-full bg-secondary text-sm font-medium text-secondary-foreground mb-4">
             How It Works
           </span>
           <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
             Simple Process,{" "}
             <span className="text-gradient-forest">Perfect Results</span>
           </h2>
           <p className="text-muted-foreground text-lg">
             From request to delivery, here's how we turn your vision into reality.
           </p>
         </div>
 
         {/* Steps */}
         <div className="relative max-w-5xl mx-auto">
           {/* Connection Line */}
           <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full h-0.5 bg-gradient-to-r from-transparent via-border to-transparent hidden lg:block" />
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
             {steps.map((step, index) => (
               <div key={step.number} className="relative text-center group">
                 {/* Step Number */}
                 <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-forest text-primary-foreground font-serif text-xl font-bold mb-6 shadow-elevated group-hover:scale-110 transition-transform duration-300">
                   {step.number}
                 </div>
                 
                 {/* Icon */}
                 <div className="w-14 h-14 mx-auto rounded-xl bg-secondary flex items-center justify-center mb-4">
                   <step.icon className="w-7 h-7 text-primary" />
                 </div>
 
                 {/* Content */}
                 <h3 className="font-serif text-lg font-bold text-foreground mb-2">
                   {step.title}
                 </h3>
                 <p className="text-muted-foreground text-sm leading-relaxed">
                   {step.description}
                 </p>
               </div>
             ))}
           </div>
         </div>
 
         {/* CTA */}
         <div className="text-center mt-16">
           <Link to="/login">
             <Button variant="hero" size="xl" className="group">
               Start Your Project
               <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
             </Button>
           </Link>
         </div>
       </div>
     </section>
   );
 };
 
 export default HowItWorksSection;