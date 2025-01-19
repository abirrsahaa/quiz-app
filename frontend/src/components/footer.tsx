import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-300">
      <div className="max-w-4xl mx-auto container px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <h3 className="font-bold text-white mb-4">ExamPro</h3>
            <p className="text-sm">
              Empowering students to achieve their dreams through adaptive learning and AI-powered practice.
            </p>
            <div className="flex space-x-4 mt-4">
              <Link to="#" className="hover:text-white">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link to="#" className="hover:text-white">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link to="#" className="hover:text-white">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="#features">Features</Link></li>
              <li><Link to="#how-it-works">How It Works</Link></li>
              <li><Link to="#pricing">Pricing</Link></li>
              <li><Link to="#success-stories">Success Stories</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="#faq">FAQ</Link></li>
              <li><Link to="#contact">Contact Us</Link></li>
              <li><Link to="#privacy">Privacy Policy</Link></li>
              <li><Link to="#terms">Terms of Service</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">Stay Updated</h4>
            <p className="text-sm mb-4">
              Subscribe to our newsletter for tips and updates
            </p>
            <div className="flex gap-2">
              <Input 
                placeholder="Enter your email" 
                className="bg-slate-800 border-slate-700"
              />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-800 mt-12 pt-8 text-sm text-center">
          <p>© 2024 ExamPro. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link to="#privacy">Privacy Policy</Link>
            <Link to="#terms">Terms of Service</Link>
            <Link to="#cookies">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}