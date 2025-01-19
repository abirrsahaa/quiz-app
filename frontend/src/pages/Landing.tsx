import { Hero } from "@/components/hero"
import { Navbar } from "@/components/navbar"
import { Features } from "@/components/features"
import { HowItWorks } from "@/components/how-it-works"
import { Pricing } from "@/components/pricing"
import { Testimonials } from "@/components/testimonials"
import { FAQ } from "@/components/faq"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      {/* <Pricing /> */}
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </>
  )
}
