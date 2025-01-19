import { Card, CardContent } from "@/components/ui/card"
import { Quote } from 'lucide-react'

export function Testimonials() {
  return (
    <section className="py-20 bg-white" id="testimonials">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight">
            Student Success Stories
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            See what our students have achieved with our platform
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="border shadow-sm">
              <CardContent className="p-6">
                <Quote className="h-8 w-8 text-indigo-600 mb-4" />
                <p className="mb-4 text-muted-foreground">{testimonial.quote}</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

const testimonials = [
  {
    quote: "This platform completely transformed my preparation strategy. The adaptive questions helped me focus on my weak areas and improve significantly.",
    name: "Rahul Singh",
    title: "GATE 2023 AIR 45",
  },
  {
    quote: "The real-time performance tracking and analytics helped me understand exactly where I stood and what I needed to work on.",
    name: "Priya Patel",
    title: "JEE Advanced 2023 Top 100",
  },
  {
    quote: "The personalized learning path and practice optimization features made my preparation much more efficient and effective.",
    name: "Arun Kumar",
    title: "UPSC CSE 2023 Selected",
  },
]

