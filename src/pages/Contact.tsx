 import { useState } from "react";
 import Header from "@/components/layout/Header";
 import Footer from "@/components/layout/Footer";
 import { Button } from "@/components/ui/button";
 import { Input } from "@/components/ui/input";
 import { Textarea } from "@/components/ui/textarea";
 import { Label } from "@/components/ui/label";
 import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from "lucide-react";
 import { useToast } from "@/hooks/use-toast";
 
 const Contact = () => {
   const { toast } = useToast();
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [isSubmitted, setIsSubmitted] = useState(false);
 
   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
     e.preventDefault();
     setIsSubmitting(true);
     
     // Simulate form submission
     await new Promise(resolve => setTimeout(resolve, 1000));
     
     setIsSubmitting(false);
     setIsSubmitted(true);
     toast({
       title: "Message sent!",
       description: "I'll get back to you as soon as possible.",
     });
   };
 
   return (
     <div className="min-h-screen bg-background">
       <Header />
       
       <main className="pt-20">
         {/* Hero Section */}
         <section className="py-16 md:py-24 bg-gradient-hero relative overflow-hidden">
           <div className="absolute top-0 right-0 w-96 h-96 bg-sage/30 rounded-full blur-3xl" />
           <div className="container mx-auto px-4 relative z-10">
             <div className="max-w-3xl mx-auto text-center">
               <span className="inline-block px-4 py-1 rounded-full bg-secondary text-sm font-medium text-secondary-foreground mb-4">
                 Get In Touch
               </span>
               <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                 Let's Start a <span className="text-gradient-forest">Conversation</span>
               </h1>
               <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                 Have questions about our services? Want to discuss a project? 
                 I'm here to help!
               </p>
             </div>
           </div>
         </section>
 
         {/* Contact Section */}
         <section className="py-16 md:py-24">
           <div className="container mx-auto px-4">
             <div className="max-w-5xl mx-auto">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                 {/* Contact Info */}
                 <div>
                   <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-6">
                     Contact Information
                   </h2>
                   <p className="text-muted-foreground mb-8">
                     Feel free to reach out through any of these channels. 
                     I typically respond within 24 hours.
                   </p>
 
                   <div className="space-y-6">
                     <a 
                       href="mailto:hello@truetone.com" 
                       className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300 group"
                     >
                       <div className="w-12 h-12 rounded-lg bg-gradient-forest flex items-center justify-center">
                         <Mail className="w-6 h-6 text-primary-foreground" />
                       </div>
                       <div>
                         <p className="font-semibold text-foreground">Email</p>
                         <p className="text-muted-foreground">hello@truetone.com</p>
                       </div>
                     </a>
 
                     <a 
                       href="tel:+919876543210" 
                       className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300 group"
                     >
                       <div className="w-12 h-12 rounded-lg bg-gradient-forest flex items-center justify-center">
                         <Phone className="w-6 h-6 text-primary-foreground" />
                       </div>
                       <div>
                         <p className="font-semibold text-foreground">Phone</p>
                         <p className="text-muted-foreground">+91 98765 43210</p>
                       </div>
                     </a>
 
                     <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border">
                       <div className="w-12 h-12 rounded-lg bg-gradient-forest flex items-center justify-center">
                         <MapPin className="w-6 h-6 text-primary-foreground" />
                       </div>
                       <div>
                         <p className="font-semibold text-foreground">Location</p>
                         <p className="text-muted-foreground">Tamil Nadu, India</p>
                       </div>
                     </div>
 
                     <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border">
                       <div className="w-12 h-12 rounded-lg bg-gradient-forest flex items-center justify-center">
                         <Clock className="w-6 h-6 text-primary-foreground" />
                       </div>
                       <div>
                         <p className="font-semibold text-foreground">Response Time</p>
                         <p className="text-muted-foreground">Usually within 24 hours</p>
                       </div>
                     </div>
                   </div>
                 </div>
 
                 {/* Contact Form */}
                 <div className="p-8 rounded-3xl bg-gradient-card border border-border shadow-elevated">
                   {isSubmitted ? (
                     <div className="text-center py-12">
                       <div className="w-16 h-16 rounded-full bg-gradient-forest flex items-center justify-center mx-auto mb-6">
                         <CheckCircle className="w-8 h-8 text-primary-foreground" />
                       </div>
                       <h3 className="font-serif text-2xl font-bold text-foreground mb-2">
                         Message Sent!
                       </h3>
                       <p className="text-muted-foreground mb-6">
                         Thank you for reaching out. I'll get back to you soon!
                       </p>
                       <Button onClick={() => setIsSubmitted(false)} variant="outline">
                         Send Another Message
                       </Button>
                     </div>
                   ) : (
                     <>
                       <h3 className="font-serif text-xl font-bold text-foreground mb-6">
                         Send a Message
                       </h3>
                       <form onSubmit={handleSubmit} className="space-y-6">
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                           <div className="space-y-2">
                             <Label htmlFor="name">Name</Label>
                             <Input 
                               id="name" 
                               placeholder="Your name" 
                               required 
                               className="bg-card"
                             />
                           </div>
                           <div className="space-y-2">
                             <Label htmlFor="email">Email</Label>
                             <Input 
                               id="email" 
                               type="email" 
                               placeholder="your@email.com" 
                               required 
                               className="bg-card"
                             />
                           </div>
                         </div>
 
                         <div className="space-y-2">
                           <Label htmlFor="subject">Subject</Label>
                           <Input 
                             id="subject" 
                             placeholder="What's this about?" 
                             required 
                             className="bg-card"
                           />
                         </div>
 
                         <div className="space-y-2">
                           <Label htmlFor="message">Message</Label>
                           <Textarea 
                             id="message" 
                             placeholder="Tell me about your project or question..." 
                             required 
                             className="min-h-[150px] bg-card"
                           />
                         </div>
 
                         <Button 
                           type="submit" 
                           variant="hero" 
                           size="lg" 
                           className="w-full"
                           disabled={isSubmitting}
                         >
                           {isSubmitting ? (
                             "Sending..."
                           ) : (
                             <>
                               Send Message
                               <Send className="w-5 h-5" />
                             </>
                           )}
                         </Button>
                       </form>
                     </>
                   )}
                 </div>
               </div>
             </div>
           </div>
         </section>
       </main>
 
       <Footer />
     </div>
   );
 };
 
 export default Contact;