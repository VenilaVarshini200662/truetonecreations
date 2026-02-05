 import { Star, Quote } from "lucide-react";
 
 const testimonials = [
   {
     name: "Priya Sharma",
     role: "Business Owner",
     content: "TrueTone Creations delivered exactly what I envisioned for my LinkedIn profile. The human touch really makes a difference—they understood the nuances that AI simply can't grasp.",
     rating: 5,
   },
   {
     name: "Karthik Rajan",
     role: "Event Organizer",
     content: "The poster design for our college fest was incredible! They incorporated our feedback perfectly and delivered ahead of schedule. Truly professional service.",
     rating: 5,
   },
   {
     name: "Anitha Venkat",
     role: "Content Creator",
     content: "Getting my videos edited with the right hashtag suggestions helped boost my social media engagement significantly. The bilingual support was a bonus!",
     rating: 5,
   },
 ];
 
 const TestimonialsSection = () => {
   return (
     <section className="py-20 md:py-28 bg-primary text-primary-foreground relative overflow-hidden">
       {/* Background decoration */}
       <div className="absolute top-0 left-0 w-64 h-64 bg-forest-light/20 rounded-full blur-3xl" />
       <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
       
       <div className="container mx-auto px-4 relative z-10">
         {/* Section Header */}
         <div className="text-center max-w-2xl mx-auto mb-16">
           <span className="inline-block px-4 py-1 rounded-full bg-forest-light/20 text-sm font-medium mb-4">
             Testimonials
           </span>
           <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
             What Our Clients Say
           </h2>
           <p className="opacity-80 text-lg">
             Real feedback from people who experienced the TrueTone difference.
           </p>
         </div>
 
         {/* Testimonials Grid */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
           {testimonials.map((testimonial, index) => (
             <div
               key={testimonial.name}
               className="relative p-8 rounded-2xl bg-forest-light/10 backdrop-blur-sm border border-primary-foreground/10 hover:border-primary-foreground/20 transition-all duration-300"
             >
               {/* Quote Icon */}
               <Quote className="w-10 h-10 text-accent mb-6 opacity-50" />
 
               {/* Content */}
               <p className="text-primary-foreground/90 leading-relaxed mb-6">
                 "{testimonial.content}"
               </p>
 
               {/* Rating */}
               <div className="flex gap-1 mb-4">
                 {Array.from({ length: testimonial.rating }).map((_, i) => (
                   <Star key={i} className="w-4 h-4 text-accent fill-accent" />
                 ))}
               </div>
 
               {/* Author */}
               <div>
                 <p className="font-semibold">{testimonial.name}</p>
                 <p className="text-sm opacity-70">{testimonial.role}</p>
               </div>
             </div>
           ))}
         </div>
       </div>
     </section>
   );
 };
 
 export default TestimonialsSection;