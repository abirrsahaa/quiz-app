import React from 'react';
import { Quote } from 'lucide-react';

const quotes = [
  {
    text: "The expert in anything was once a beginner.",
    author: "Helen Hayes"
  },
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill"
  },
  {
    text: "The beautiful thing about learning is that no one can take it away from you.",
    author: "B.B. King"
  }
];

export default function MotivationalQuote() {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white shadow-sm">
      <div className="flex items-start gap-4">
        <Quote size={24} className="text-white opacity-80" />
        <div>
          <p className="text-lg font-medium mb-2">{randomQuote.text}</p>
          <p className="text-sm opacity-80">- {randomQuote.author}</p>
        </div>
      </div>
    </div>
  );
}