import { Lightbulb, LineChart, Brain, Layout, BarChart, Clock } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"

export function Features() {
  return (
    <section className="py-20 bg-white" id="features">
      <div className="max-w-4xl mx-auto container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight">
            Powerful Features for Exam Success
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Everything you need to excel in your competitive exams
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="border shadow-sm">
              <CardContent className="p-6">
                <div className="mb-4 bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center">
                  <feature.icon className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

const features = [
  {
    title: "Infinite Quiz Generation",
    description: "Never run out of practice questions with our AI-powered question generator",
    icon: Lightbulb,
  },
  {
    title: "Real-time Performance Tracking",
    description: "Monitor your progress with detailed analytics and performance metrics",
    icon: LineChart,
  },
  {
    title: "Memory Optimization",
    description: "Smart spaced repetition system to enhance long-term retention",
    icon: Brain,
  },
  {
    title: "Personalized Learning Paths",
    description: "Customized study plans based on your performance and goals",
    icon: Layout,
  },
  {
    title: "Performance Analytics",
    description: "Comprehensive dashboards with detailed insights and progress reports",
    icon: BarChart,
  },
  {
    title: "Smart Time Management",
    description: "Efficient scheduling and time-tracking tools for optimal study sessions",
    icon: Clock,
  },
]

