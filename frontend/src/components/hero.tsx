import { Button } from "@/components/ui/button"
import { PlayCircle } from 'lucide-react'
import { Link } from "react-router-dom"


export function Hero() {
  return (
    <div className="relative bg-slate-900 py-20 text-center">
      <div className="container max-w-4xl mx-auto px-4">
        <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-6xl">
          Master Your Competitive Exams with AI-Powered Learning
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-300">
          Adaptive learning platform that generates infinite practice questions and personalizes your learning journey
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          
        <Link to="/dashboard">
      <Button size="lg" className="bg-indigo-600 hover:bg-indigo-500">
        Start Free Trial
      </Button>
    </Link>
    <Link to="/quiz">
          <Button size="lg" variant="outline" className="text-black">
            <PlayCircle className="mr-2 h-5 w-5" />
            Watch Demo
          </Button>
          </Link>
        </div>
        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="text-center">
              <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
              <p className="mt-2 text-sm text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const features = [
  {
    title: "Infinite Practice",
    description: "Never run out of unique practice questions",
  },
  {
    title: "Real-time Tracking",
    description: "Monitor your progress as you learn",
  },
  {
    title: "Smart Analytics",
    description: "AI-powered performance insights",
  },
]

