import { Check } from 'lucide-react'

export function HowItWorks() {
  return (
    <section className="py-20 bg-slate-900" id="how-it-works">
      <div className="max-w-4xl mx-auto container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            Start your journey to exam success in three simple steps
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.title} className="relative">
              <div className="mb-4">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-indigo-600 text-white font-bold">
                  {index + 1}
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">{step.title}</h3>
              <p className="text-gray-300 mb-4">{step.description}</p>
              <ul className="space-y-2">
                {step.features.map((feature) => (
                  <li key={feature} className="flex items-center text-gray-300">
                    <Check className="h-5 w-5 mr-2 text-indigo-400" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const steps = [
  {
    title: "Sign Up & Assessment",
    description: "Create your account and take an initial assessment to determine your current knowledge level",
    features: [
      "Quick registration process",
      "Adaptive assessment",
      "Instant results",
    ],
  },
  {
    title: "Personalized Learning Plan",
    description: "Receive a customized study plan based on your goals and current level",
    features: [
      "AI-generated study path",
      "Flexible scheduling",
      "Topic prioritization",
    ],
  },
  {
    title: "Practice & Improve",
    description: "Start practicing with dynamic questions and track your improvement",
    features: [
      "Real-time feedback",
      "Progress tracking",
      "Performance analytics",
    ],
  },
]

