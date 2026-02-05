 import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
 import Header from "@/components/layout/Header";
 import Footer from "@/components/layout/Footer";
 import { Button } from "@/components/ui/button";
 import { Input } from "@/components/ui/input";
 import { Label } from "@/components/ui/label";
 import { Leaf, ArrowRight, Eye, EyeOff } from "lucide-react";
 import { useToast } from "@/hooks/use-toast";
 
 const Login = () => {
   const { toast } = useToast();
  const navigate = useNavigate();
   const [isLogin, setIsLogin] = useState(true);
   const [showPassword, setShowPassword] = useState(false);
   const [isSubmitting, setIsSubmitting] = useState(false);
 
   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
     e.preventDefault();
     setIsSubmitting(true);
     
     // Simulate authentication
     await new Promise(resolve => setTimeout(resolve, 1000));
     
     setIsSubmitting(false);
     toast({
       title: isLogin ? "Welcome back!" : "Account created!",
       description: isLogin 
         ? "You've successfully logged in." 
         : "Your account has been created. You can now submit requests!",
     });
    
    // Redirect to services page after successful login/signup
    navigate("/services");
   };
 
   return (
     <div className="min-h-screen bg-background">
       <Header />
       
       <main className="pt-20 min-h-screen flex items-center">
         <div className="container mx-auto px-4 py-16">
           <div className="max-w-md mx-auto">
             {/* Logo */}
             <div className="text-center mb-8">
               <Link to="/" className="inline-flex items-center gap-2 mb-4">
                 <div className="w-12 h-12 rounded-full bg-gradient-forest flex items-center justify-center shadow-soft">
                   <Leaf className="w-6 h-6 text-primary-foreground" />
                 </div>
               </Link>
               <h1 className="font-serif text-3xl font-bold text-foreground mb-2">
                 {isLogin ? "Welcome Back" : "Create Account"}
               </h1>
               <p className="text-muted-foreground">
                 {isLogin 
                   ? "Log in to manage your requests" 
                   : "Sign up to start your creative project"}
               </p>
             </div>
 
             {/* Form Card */}
             <div className="p-8 rounded-3xl bg-gradient-card border border-border shadow-elevated">
               <form onSubmit={handleSubmit} className="space-y-6">
                 {!isLogin && (
                   <div className="space-y-2">
                     <Label htmlFor="name">Full Name</Label>
                     <Input 
                       id="name" 
                       placeholder="Your full name" 
                       required={!isLogin}
                       className="bg-card"
                     />
                   </div>
                 )}
 
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
 
                 {!isLogin && (
                   <div className="space-y-2">
                     <Label htmlFor="phone">Phone (Optional)</Label>
                     <Input 
                       id="phone" 
                       type="tel" 
                       placeholder="+91 98765 43210" 
                       className="bg-card"
                     />
                   </div>
                 )}
 
                 <div className="space-y-2">
                   <Label htmlFor="password">Password</Label>
                   <div className="relative">
                     <Input 
                       id="password" 
                       type={showPassword ? "text" : "password"} 
                       placeholder="••••••••" 
                       required 
                       className="bg-card pr-10"
                     />
                     <button
                       type="button"
                       onClick={() => setShowPassword(!showPassword)}
                       className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                     >
                       {showPassword ? (
                         <EyeOff className="w-4 h-4" />
                       ) : (
                         <Eye className="w-4 h-4" />
                       )}
                     </button>
                   </div>
                 </div>
 
                 <Button 
                   type="submit" 
                   variant="hero" 
                   size="lg" 
                   className="w-full group"
                   disabled={isSubmitting}
                 >
                   {isSubmitting ? (
                     "Please wait..."
                   ) : (
                     <>
                       {isLogin ? "Log In" : "Create Account"}
                       <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                     </>
                   )}
                 </Button>
               </form>
 
               <div className="mt-6 text-center">
                 <p className="text-muted-foreground">
                   {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                   <button
                     onClick={() => setIsLogin(!isLogin)}
                     className="text-primary font-medium hover:underline"
                   >
                     {isLogin ? "Sign up" : "Log in"}
                   </button>
                 </p>
               </div>
             </div>
 
             {/* Info Box */}
             <div className="mt-6 p-4 rounded-xl bg-secondary/50 text-center">
               <p className="text-sm text-muted-foreground">
                 By signing up, you get access to <strong className="text-foreground">100% free</strong>, 
                 human-crafted creative services with unlimited revisions.
               </p>
             </div>
           </div>
         </div>
       </main>
 
       <Footer />
     </div>
   );
 };
 
 export default Login;