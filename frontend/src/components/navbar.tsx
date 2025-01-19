import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-4xl mx-auto flex h-14 items-center">
        <div className="mr-4 flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">AceMemory</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center space-x-6 text-sm font-medium">
          <Link to="#features">Features</Link>
          <Link to="#how-it-works">How It Works</Link>
          <Link to="#testimonials">Testimonials</Link>
          <Link to="#pricing">Pricing</Link>
          <Link to="#contact">Contact</Link>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" asChild>
            <Link to="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link to="/sign-up">Sign Up</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}