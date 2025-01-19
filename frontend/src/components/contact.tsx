import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin } from 'lucide-react'

export function Contact() {
  return (
    <section className="py-20 bg-white" id="contact">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-4">Get in Touch</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Have questions or need support? We're here to help you achieve your exam goals.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-indigo-600" />
                <div>
                  <p className="font-semibold">Email Us</p>
                  <p className="text-muted-foreground">support@exampro.com</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-indigo-600" />
                <div>
                  <p className="font-semibold">Call Us</p>
                  <p className="text-muted-foreground">+91 1800-123-4567</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-3 text-indigo-600" />
                <div>
                  <p className="font-semibold">Visit Us</p>
                  <p className="text-muted-foreground">123 Education Street, Tech Park, Bangalore - 560001</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <form className="space-y-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium mb-2">
                  Full Name
                </label>
                <Input id="fullName" placeholder="John Doe" />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email Address
                </label>
                <Input id="email" type="email" placeholder="john@example.com" />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Subject
                </label>
                <Input id="subject" placeholder="How can we help?" />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <Textarea id="message" placeholder="Your message..." className="h-32" />
              </div>
              
              <Button className="w-full bg-indigo-600 hover:bg-indigo-500">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

