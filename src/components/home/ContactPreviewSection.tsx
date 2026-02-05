 import { Link } from "react-router-dom";
 import { Button } from "@/components/ui/button";
 import { Mail, Phone, MessageCircle, Clock, ArrowRight } from "lucide-react";
 
 const ContactPreviewSection = () => {
   return (
     <section className="py-20 md:py-28 bg-background">
       <div className="container mx-auto px-4">
         <div className="max-w-5xl mx-auto">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
             {/* Left - Content */}
             <div>
               <span className="inline-block px-4 py-1 rounded-full bg-secondary text-sm font-medium text-secondary-foreground mb-4">
                 Get In Touch
               </span>
               <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                 Have Questions?{" "}
                 <span className="text-gradient-forest">Let's Talk!</span>
               </h2>
               <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                 Before you sign up, feel free to reach out with any questions about our services. 
                 I'm here to help you understand how TrueTone Creations can meet your needs.
               </p>
 
               {/* Contact Methods */}
               <div className="space-y-4 mb-8">
                 <a 
                   href="mailto:hello@truetone.com" 
                   className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300 group"
                 >
                   <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                     <Mail className="w-6 h-6 text-primary group-hover:text-primary-foreground" />
                   </div>
                   <div>
                     <p className="font-semibold text-foreground">Email Me</p>
                     <p className="text-sm text-muted-foreground">hello@truetone.com</p>
                   </div>
                 </a>
                 
                 <a 
                   href="tel:+919876543210" 
                   className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300 group"
                 >
                   <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                     <Phone className="w-6 h-6 text-primary group-hover:text-primary-foreground" />
                   </div>
                   <div>
                     <p className="font-semibold text-foreground">Call Me</p>
                     <p className="text-sm text-muted-foreground">+91 98765 43210</p>
                   </div>
                 </a>
               </div>
 
               <Link to="/contact">
                 <Button variant="forest" size="lg" className="group">
                   Contact Page
                   <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                 </Button>
               </Link>
             </div>
 
             {/* Right - Stats/Info */}
             <div className="grid grid-cols-2 gap-4">
               <div className="p-6 rounded-2xl bg-gradient-card border border-border text-center">
                 <Clock className="w-8 h-8 text-primary mx-auto mb-3" />
                 <p className="text-3xl font-serif font-bold text-foreground mb-1">&lt; 24h</p>
                 <p className="text-sm text-muted-foreground">Response Time</p>
               </div>
               
               <div className="p-6 rounded-2xl bg-gradient-card border border-border text-center">
                 <MessageCircle className="w-8 h-8 text-primary mx-auto mb-3" />
                 <p className="text-3xl font-serif font-bold text-foreground mb-1">Direct</p>
                 <p className="text-sm text-muted-foreground">Communication</p>
               </div>
               
               <div className="col-span-2 p-6 rounded-2xl bg-primary text-primary-foreground text-center">
                 <p className="text-4xl font-serif font-bold mb-2">∞</p>
                 <p className="text-lg font-semibold mb-1">Unlimited Revisions</p>
                 <p className="text-sm opacity-80">Until you're completely satisfied</p>
               </div>
             </div>
           </div>
         </div>
       </div>
     </section>
   );
 };
 
 export default ContactPreviewSection;