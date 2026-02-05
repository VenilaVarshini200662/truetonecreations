 import { Link } from "react-router-dom";
 import { Button } from "@/components/ui/button";
 import { PenTool, Video, Image, ArrowRight, Check } from "lucide-react";
 
 const services = [
   {
     id: "content",
     icon: PenTool,
     title: "Content Writing",
     description: "Professional content for technical websites, businesses, and LinkedIn posts. Available in English and Tamil.",
     features: [
       "Technical website content",
       "Business documentation",
       "LinkedIn posts & articles",
       "Bilingual: English & Tamil",
     ],
   },
   {
     id: "editing",
     icon: Video,
     title: "Video & Image Editing",
     description: "Social media-ready edits with optimized hashtags and captions that drive engagement.",
     features: [
       "Professional video editing",
       "Image enhancement & retouching",
       "Best hashtag suggestions",
       "Platform-optimized formats",
     ],
   },
   {
     id: "posters",
     icon: Image,
     title: "Poster Making",
     description: "Eye-catching posters for events, promotions, and special occasions that capture attention.",
     features: [
       "Event posters & banners",
       "Promotional materials",
       "Custom designs",
       "Print & digital formats",
     ],
   },
 ];
 
 const ServicesSection = () => {
   return (
     <section id="services" className="py-20 md:py-28 bg-background relative">
       {/* Background decoration */}
       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
       
       <div className="container mx-auto px-4">
         {/* Section Header */}
         <div className="text-center max-w-2xl mx-auto mb-16">
           <span className="inline-block px-4 py-1 rounded-full bg-secondary text-sm font-medium text-secondary-foreground mb-4">
             Our Services
           </span>
           <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
             Creative Services Tailored for{" "}
             <span className="text-gradient-forest">Your Success</span>
           </h2>
           <p className="text-muted-foreground text-lg">
             Every project is crafted with personal attention to match your exact requirements. 
             Request changes anytime until you're completely satisfied.
           </p>
         </div>
 
         {/* Services Grid */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {services.map((service, index) => (
             <div
               key={service.id}
               className="group relative p-8 rounded-2xl bg-gradient-card border border-border hover:border-primary/30 shadow-soft hover:shadow-elevated transition-all duration-500"
               style={{ animationDelay: `${index * 0.1}s` }}
             >
               {/* Icon */}
               <div className="w-14 h-14 rounded-xl bg-gradient-forest flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                 <service.icon className="w-7 h-7 text-primary-foreground" />
               </div>
 
               {/* Content */}
               <h3 className="font-serif text-xl font-bold text-foreground mb-3">
                 {service.title}
               </h3>
               <p className="text-muted-foreground mb-6 leading-relaxed">
                 {service.description}
               </p>
 
               {/* Features */}
               <ul className="space-y-2 mb-8">
                 {service.features.map((feature) => (
                   <li key={feature} className="flex items-center gap-2 text-sm text-foreground">
                     <Check className="w-4 h-4 text-accent flex-shrink-0" />
                     {feature}
                   </li>
                 ))}
               </ul>
 
               {/* CTA */}
               <Link to="/login" className="inline-flex items-center gap-2 text-primary font-medium group/link">
                 Request This Service
                 <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
               </Link>
             </div>
           ))}
         </div>
 
         {/* Bottom CTA */}
         <div className="text-center mt-16">
           <Link to="/services">
             <Button variant="forest" size="lg">
               View All Services
               <ArrowRight className="w-5 h-5" />
             </Button>
           </Link>
         </div>
       </div>
     </section>
   );
 };
 
 export default ServicesSection;