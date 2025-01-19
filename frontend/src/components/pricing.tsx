import { Check } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function Pricing() {
  return (
    <section className="py-20 bg-slate-900" id="pricing">
      <div className="container max-w-4xl mx-auto  px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Choose Your Success Plan
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            Flexible plans designed for every student's needs
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <Card key={plan.name} className={`${plan.featured ? 'border-indigo-600' : ''}`}>
              <CardHeader className="p-6">
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
                <div className="mt-4">
                  <span className="text-3xl font-bold">₹{plan.price}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex">
                      <Check className="h-5 w-5 mr-2 text-indigo-600" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`w-full mt-6 ${plan.featured ? 'bg-indigo-600 hover:bg-indigo-500' : ''}`}
                  variant={plan.featured ? 'default' : 'outline'}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

const plans = [
  {
    name: "Basic",
    description: "For beginners",
    price: "999",
    features: [
      "500 Practice Questions/month",
      "Basic Performance Analytics",
      "Email Support",
    ],
    featured: false,
  },
  {
    name: "Pro",
    description: "For serious aspirants",
    price: "1999",
    features: [
      "Unlimited Practice Questions",
      "Advanced Analytics Dashboard",
      "Personalized Learning Path",
      "Priority Support 24/7",
    ],
    featured: true,
  },
  {
    name: "Premium",
    description: "For toppers",
    price: "2999",
    features: [
      "Everything in Pro",
      "1-on-1 Mentoring Sessions",
      "Mock Interview Practice",
      "Custom Study Materials",
    ],
    featured: false,
  },
]

