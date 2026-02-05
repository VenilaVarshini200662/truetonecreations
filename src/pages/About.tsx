 import Header from "@/components/layout/Header";
 import Footer from "@/components/layout/Footer";
 import { Button } from "@/components/ui/button";
 import { Link } from "react-router-dom";
 import { Heart, Target, Users, Sparkles, ArrowRight } from "lucide-react";
 
 const About = () => {
   return (
     <div className="min-h-screen bg-background">
       <Header />
       
       <main className="pt-20">
         {/* Hero Section */}
         <section className="py-16 md:py-24 bg-gradient-hero relative overflow-hidden">
           <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
           <div className="container mx-auto px-4 relative z-10">
             <div className="max-w-3xl mx-auto text-center">
               <span className="inline-block px-4 py-1 rounded-full bg-secondary text-sm font-medium text-secondary-foreground mb-4">
                 About TrueTone Creations
               </span>
               <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                 The Story Behind <span className="text-gradient-forest">TrueTone</span>
               </h1>
               <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                 A passion project born from the belief that creative work deserves 
                 a human touch—not AI-generated shortcuts.
               </p>
             </div>
           </div>
         </section>
 
         {/* Mission Section */}
         <section className="py-16 md:py-24">
           <div className="container mx-auto px-4">
             <div className="max-w-4xl mx-auto">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                 <div>
                   <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
                     Why I Started This
                   </h2>
                   <div className="space-y-4 text-muted-foreground leading-relaxed">
                     <p>
                       In a world where AI tools promise instant content, I noticed something 
                       was missing—the human understanding that turns a vague idea into 
                       exactly what you envisioned.
                     </p>
                     <p>
                       AI can generate content quickly, but it often misses the nuance, 
                       context, and personal touch that makes content truly resonate. 
                       That's where TrueTone Creations comes in.
                     </p>
                     <p>
                       I offer my skills completely free because I believe everyone deserves 
                       access to quality creative services. Whether you need content in 
                       English or Tamil, a stunning poster, or perfectly edited media—I'm 
                       here to bring your vision to life.
                     </p>
                   </div>
                 </div>
 
                 <div className="p-8 rounded-3xl bg-gradient-card border border-border shadow-elevated">
                   <div className="space-y-6">
                     <div className="flex items-start gap-4">
                       <div className="w-12 h-12 rounded-xl bg-gradient-forest flex items-center justify-center flex-shrink-0">
                         <Heart className="w-6 h-6 text-primary-foreground" />
                       </div>
                       <div>
                         <h3 className="font-serif text-lg font-bold text-foreground mb-1">
                           Passion-Driven
                         </h3>
                         <p className="text-sm text-muted-foreground">
                           Every project is handled with genuine care and attention to detail.
                         </p>
                       </div>
                     </div>
 
                     <div className="flex items-start gap-4">
                       <div className="w-12 h-12 rounded-xl bg-gradient-forest flex items-center justify-center flex-shrink-0">
                         <Target className="w-6 h-6 text-primary-foreground" />
                       </div>
                       <div>
                         <h3 className="font-serif text-lg font-bold text-foreground mb-1">
                           Precision-Focused
                         </h3>
                         <p className="text-sm text-muted-foreground">
                           I don't stop until your vision is perfectly captured.
                         </p>
                       </div>
                     </div>
 
                     <div className="flex items-start gap-4">
                       <div className="w-12 h-12 rounded-xl bg-gradient-forest flex items-center justify-center flex-shrink-0">
                         <Users className="w-6 h-6 text-primary-foreground" />
                       </div>
                       <div>
                         <h3 className="font-serif text-lg font-bold text-foreground mb-1">
                           Client-First
                         </h3>
                         <p className="text-sm text-muted-foreground">
                           Your satisfaction is my priority. Ask for changes anytime.
                         </p>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </section>
 
         {/* Values Section */}
         <section className="py-16 md:py-24 bg-secondary/30">
           <div className="container mx-auto px-4">
             <div className="max-w-4xl mx-auto">
               <div className="text-center mb-12">
                 <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                   What Sets Me Apart
                 </h2>
                 <p className="text-muted-foreground text-lg">
                   The TrueTone promise that guides every project
                 </p>
               </div>
 
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="p-6 rounded-2xl bg-card border border-border">
                   <Sparkles className="w-10 h-10 text-accent mb-4" />
                   <h3 className="font-serif text-xl font-bold text-foreground mb-2">
                     100% AI-Free
                   </h3>
                   <p className="text-muted-foreground">
                     Every piece of content is created by me personally. No ChatGPT, 
                     no Midjourney, no shortcuts—just genuine human creativity.
                   </p>
                 </div>
 
                 <div className="p-6 rounded-2xl bg-card border border-border">
                   <Heart className="w-10 h-10 text-accent mb-4" />
                   <h3 className="font-serif text-xl font-bold text-foreground mb-2">
                     Always Free
                   </h3>
                   <p className="text-muted-foreground">
                     I believe creative services should be accessible to everyone. 
                     There are no hidden charges or premium tiers.
                   </p>
                 </div>
 
                 <div className="p-6 rounded-2xl bg-card border border-border">
                   <Target className="w-10 h-10 text-accent mb-4" />
                   <h3 className="font-serif text-xl font-bold text-foreground mb-2">
                     Exact Results
                   </h3>
                   <p className="text-muted-foreground">
                     Your vision matters. I work closely with you to deliver 
                     exactly what you need, not a "close enough" approximation.
                   </p>
                 </div>
 
                 <div className="p-6 rounded-2xl bg-card border border-border">
                   <Users className="w-10 h-10 text-accent mb-4" />
                   <h3 className="font-serif text-xl font-bold text-foreground mb-2">
                     Direct Communication
                   </h3>
                   <p className="text-muted-foreground">
                     Work directly with me. No middlemen, no automated responses—
                     just clear, personal communication throughout.
                   </p>
                 </div>
               </div>
             </div>
           </div>
         </section>
 
         {/* CTA Section */}
         <section className="py-16 md:py-24">
           <div className="container mx-auto px-4">
             <div className="max-w-3xl mx-auto text-center">
               <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                 Let's Create Something Amazing
               </h2>
               <p className="text-muted-foreground text-lg mb-8">
                 Ready to experience the TrueTone difference? Start your project today.
               </p>
               <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                 <Link to="/login">
                   <Button variant="hero" size="xl" className="group">
                     Get Started Free
                     <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                   </Button>
                 </Link>
                 <Link to="/contact">
                   <Button variant="outline" size="xl">
                     Contact Me
                   </Button>
                 </Link>
               </div>
             </div>
           </div>
         </section>
       </main>
 
       <Footer />
     </div>
   );
 };
 
 export default About;