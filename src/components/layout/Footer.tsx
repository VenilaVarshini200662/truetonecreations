 import { Link } from "react-router-dom";
 import { Leaf, Mail, Phone, MapPin, Heart } from "lucide-react";
 
 const Footer = () => {
   return (
     <footer className="bg-primary text-primary-foreground">
       <div className="container mx-auto px-4 py-12 md:py-16">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
           {/* Brand */}
           <div className="lg:col-span-1">
             <Link to="/" className="flex items-center gap-2 mb-4">
               <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                 <Leaf className="w-5 h-5 text-accent-foreground" />
               </div>
               <div className="flex flex-col">
                 <span className="font-serif text-xl font-bold leading-tight">
                   TrueTone
                 </span>
                 <span className="text-xs opacity-80 -mt-1">Creations</span>
               </div>
             </Link>
             <p className="text-sm opacity-80 leading-relaxed">
               Turning visions into exact results. Human-crafted creative services 
               that deliver exactly what you envision.
             </p>
           </div>
 
           {/* Quick Links */}
           <div>
             <h4 className="font-serif text-lg font-semibold mb-4">Quick Links</h4>
             <ul className="space-y-2">
               <li>
                 <Link to="/" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                   Home
                 </Link>
               </li>
               <li>
                 <Link to="/services" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                   Services
                 </Link>
               </li>
               <li>
                 <Link to="/about" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                   About Us
                 </Link>
               </li>
               <li>
                 <Link to="/contact" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                   Contact
                 </Link>
               </li>
             </ul>
           </div>
 
           {/* Services */}
           <div>
             <h4 className="font-serif text-lg font-semibold mb-4">Our Services</h4>
             <ul className="space-y-2">
               <li>
                 <Link to="/services#content" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                   Content Writing
                 </Link>
               </li>
               <li>
                 <Link to="/services#editing" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                   Video & Image Editing
                 </Link>
               </li>
               <li>
                 <Link to="/services#posters" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                   Poster Making
                 </Link>
               </li>
             </ul>
           </div>
 
           {/* Contact */}
           <div>
             <h4 className="font-serif text-lg font-semibold mb-4">Get In Touch</h4>
             <ul className="space-y-3">
               <li className="flex items-center gap-3">
                 <Mail className="w-4 h-4 opacity-80" />
                 <a href="mailto:hello@truetone.com" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                   hello@truetone.com
                 </a>
               </li>
               <li className="flex items-center gap-3">
                 <Phone className="w-4 h-4 opacity-80" />
                 <a href="tel:+919876543210" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                   +91 98765 43210
                 </a>
               </li>
               <li className="flex items-start gap-3">
                 <MapPin className="w-4 h-4 opacity-80 mt-0.5" />
                 <span className="text-sm opacity-80">
                   Tamil Nadu, India
                 </span>
               </li>
             </ul>
           </div>
         </div>
 
         {/* Bottom Bar */}
         <div className="mt-12 pt-8 border-t border-primary-foreground/20">
           <div className="flex flex-col md:flex-row items-center justify-between gap-4">
             <p className="text-sm opacity-80 flex items-center gap-1">
               Made with <Heart className="w-4 h-4 text-accent fill-accent" /> by TrueTone Creations
             </p>
             <p className="text-sm opacity-80">
               © {new Date().getFullYear()} TrueTone Creations. All rights reserved.
             </p>
           </div>
         </div>
       </div>
     </footer>
   );
 };
 
 export default Footer;