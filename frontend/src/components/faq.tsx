import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  
  export function FAQ() {
    return (
      <section className="py-20 bg-slate-900" id="faq">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-lg text-gray-300">
              Get answers to common questions about our platform
            </p>
          </div>
  
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible>
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-white">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    )
  }
  
  const faqs = [
    {
      question: "How does the adaptive learning system work?",
      answer: "Our AI-powered system analyzes your performance in real-time and adjusts the difficulty and type of questions based on your learning patterns and progress.",
    },
    {
      question: "What types of exams does the platform support?",
      answer: "We support a wide range of competitive exams including GATE, JEE, UPSC, CAT, and many more. Each exam has specially curated content and question banks.",
    },
    {
      question: "Can I access the platform on multiple devices?",
      answer: "Yes, you can access your account on any device through our web platform. Your progress syncs automatically across all devices.",
    },
    {
      question: "What's included in the premium subscription?",
      answer: "Premium includes unlimited practice questions, 1-on-1 mentoring, mock interviews, custom study materials, and priority support.",
    },
    {
      question: "How often is the content updated?",
      answer: "Our content is updated regularly to reflect the latest exam patterns and syllabus changes. Premium users get immediate access to all updates.",
    },
  ]
  
  