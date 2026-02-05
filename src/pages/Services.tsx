 import Header from "@/components/layout/Header";
 import Footer from "@/components/layout/Footer";
 import { Button } from "@/components/ui/button";
 import { Link } from "react-router-dom";
 import { PenTool, Video, Image, Check, ArrowRight, Star, Globe, Clock, RefreshCw } from "lucide-react";
 
 const services = [
   {
     id: "content",
     icon: PenTool,
     title: "Content Writing",
     subtitle: "Words That Connect & Convert",
     description: "Professional content writing services for technical websites, business documentation, and LinkedIn posts. Available in both English and Tamil to reach your target audience effectively.",
     features: [
       "Technical website content & documentation",
       "Business proposals & reports",
       "LinkedIn posts, articles & profiles",
       "Blog posts & SEO content",
       "Email templates & newsletters",
       "Bilingual content (English & Tamil)",
     ],
     highlights: [
       { icon: Globe, text: "Bilingual: English & Tamil" },
       { icon: Clock, text: "Delivery: 1-3 days" },
       { icon: RefreshCw, text: "Unlimited revisions" },
     ],
   },
   {
     id: "editing",
     icon: Video,
     title: "Video & Image Editing",
     subtitle: "Make Your Content Stand Out",
     description: "Transform your raw footage and images into scroll-stopping social media content. Get optimized edits with the best hashtag and caption suggestions to maximize engagement.",
     features: [
       "Professional video editing & trimming",
       "Image enhancement & retouching",
       "Thumbnail creation for YouTube",
       "Instagram Reels & Stories optimization",
       "Best hashtag suggestions for reach",
       "Platform-specific format exports",
     ],
     highlights: [
       { icon: Star, text: "Hashtag optimization" },
       { icon: Clock, text: "Delivery: 1-2 days" },
       { icon: RefreshCw, text: "Unlimited revisions" },
     ],
   },
   {
     id: "posters",
     icon: Image,
     title: "Poster Making",
     subtitle: "Designs That Capture Attention",
     description: "Eye-catching poster designs for events, promotions, and special occasions. From college fests to business launches, get designs that leave a lasting impression.",
     features: [
       "Event posters & banners",
       "Promotional flyers & brochures",
       "Social media graphics",
       "Invitation cards & announcements",
       "Custom illustrations & infographics",
       "Print-ready & digital formats",
     ],
     highlights: [
       { icon: Image, text: "Print & digital formats" },
       { icon: Clock, text: "Delivery: Same day to 2 days" },
       { icon: RefreshCw, text: "Unlimited revisions" },
     ],
   },
 ];
 
 const Services = () => {
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
                 Our Services
               </span>
               <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                 Creative Services, <span className="text-gradient-forest">Human Touch</span>
               </h1>
               <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                 Every project is crafted with personal attention. No AI shortcuts—just precise, 
                 personalized content that matches exactly what you envision.
               </p>
             </div>
           </div>
         </section>
 
         {/* Services List */}
         <section className="py-16 md:py-24">
           <div className="container mx-auto px-4">
             <div className="space-y-20">
               {services.map((service, index) => (
                 <div
                   key={service.id}
                   id={service.id}
                   className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                     index % 2 === 1 ? "lg:flex-row-reverse" : ""
                   }`}
                 >
                   {/* Content */}
                   <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                     <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary mb-4">
                       <service.icon className="w-4 h-4 text-primary" />
                       <span className="text-sm font-medium text-secondary-foreground">
                         {service.subtitle}
                       </span>
                     </div>
                     
                     <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                       {service.title}
                     </h2>
                     
                     <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                       {service.description}
                     </p>
 
                     {/* Features List */}
                     <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                       {service.features.map((feature) => (
                         <li key={feature} className="flex items-start gap-2 text-foreground">
                           <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                           <span className="text-sm">{feature}</span>
                         </li>
                       ))}
                     </ul>
 
                     {/* CTA */}
                     <Link to="/login">
                       <Button variant="hero" size="lg" className="group">
                         Request This Service
                         <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                       </Button>
                     </Link>
                   </div>
 
                   {/* Visual/Highlights Card */}
                   <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                     <div className="p-8 rounded-3xl bg-gradient-card border border-border shadow-elevated">
                       <div className="w-20 h-20 rounded-2xl bg-gradient-forest flex items-center justify-center mb-8 shadow-soft">
                         <service.icon className="w-10 h-10 text-primary-foreground" />
                       </div>
 
                       <div className="space-y-4">
                         {service.highlights.map((highlight) => (
                           <div
                             key={highlight.text}
                             className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border"
                           >
                             <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                               <highlight.icon className="w-5 h-5 text-primary" />
                             </div>
                             <span className="font-medium text-foreground">{highlight.text}</span>
                           </div>
                         ))}
                       </div>
 
                       <div className="mt-8 p-4 rounded-xl bg-primary text-primary-foreground text-center">
                         <p className="text-2xl font-serif font-bold">100% FREE</p>
                         <p className="text-sm opacity-80">No hidden charges</p>
                       </div>
                     </div>
                   </div>
                 </div>
               ))}
             </div>
           </div>
         </section>
 
         {/* CTA Section */}
         <section className="py-16 md:py-24 bg-primary text-primary-foreground">
           <div className="container mx-auto px-4">
             <div className="max-w-3xl mx-auto text-center">
               <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
                 Ready to Get Started?
               </h2>
               <p className="text-lg opacity-80 mb-8">
                 Sign up now and submit your first project. It's completely free!
               </p>
               <Link to="/login">
                 <Button variant="hero" size="xl" className="group">
                   Get Started Free
                   <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                 </Button>
               </Link>
             </div>
           </div>
         </section>
       </main>
 
       <Footer />
     </div>
   );
 };
 
 export default Services;