
import { useEffect, useState } from 'react'
import { Question } from '../types/quiz'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function QuizPage() {

    // !idhar mera logic lagega as i am coding with first principles and will eventually scale with each day

    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(()=>{
        const ws = new WebSocket("ws://localhost:8080");
        ws.onopen = () => {
            console.log("Connected to server from the client");
            // !init the quiz 
            ws.send(JSON.stringify({
                type:"START_QUIZ"
            }))
        }
        ws.onclose = () => {
            console.log("Disconnected from server");
        }
        setSocket(ws);

        return () => {
            ws.close();
        }
    },[])


    const [question, setQuestion] = useState<Question | null>(null);

    useEffect(()=>{
        if(!socket) return;
        socket.onmessage=(event)=>{
            const data = JSON.parse(event.data);
            console.log(data);
            switch(data.type){
                case "QUIZ_STARTED":
                    setQuestion(data.question);
                    break;
                case "NEXT_QUESTION":
                    setQuestion(data.question);
                    break;
                case "PREVIOUS_QUESTION":
                    setQuestion(data.question);
                    break;
                case "END_QUIZ":
                    setQuestion(null);
                    break;
            }
        }
    },[socket])

    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isAnswered,SetisAnswered]=useState<boolean | undefined>(undefined);







  const handleAnswerSelect = (optionId: string) => {
    if (isAnswered) return;
    setSelectedAnswer(optionId);
    SetisAnswered(true);
  }

  const handleNext = (socket:WebSocket) => {

    // !emit the event of next
    socket.send(JSON.stringify({
        type:"NEXT_QUESTION"
    }))

    setSelectedAnswer(null);
    SetisAnswered(undefined);

  }

  const handlePrevious = (socket:WebSocket) => {

    // !emit the event of next
    socket.send(JSON.stringify({
        type:"PREVIOUS_QUESTION"
    }))

    setSelectedAnswer(null);
    SetisAnswered(undefined);

  
  }

//   !i am fucking this up else it is working lit 
  const getOptionStyle = (optionId: string) => {
    console.log('selectedAnswer:', selectedAnswer)
    console.log('optionId:', optionId)
    console.log("isAnswered:",isAnswered);
    if (!isAnswered) return ''
    if (optionId===question?.correctAnswer) return 'bg-green-100 border-green-500 text-green-700'
    if (optionId === selectedAnswer) return 'bg-red-100 border-red-500 text-red-700'
    return 'opacity-50'
  }

  return (
    <div className="min-h-screen bg-[#E5F9F6] p-6 flex flex-col items-center">
      <Card className="w-full max-w-3xl p-8 bg-white/80 backdrop-blur-sm">
        <div className="mb-6 text-center">
          <p className="text-blue-800 mb-2">
            Question
          </p>
          <h2 className="text-2xl font-bold text-blue-900 mb-8">
            {question?.question}
          </h2>
        </div>

        <div className="space-y-4">
          {question?.options.map((option,index:number) => (
            <button
              key={index}
            //!fix this handler
              onClick={() => handleAnswerSelect(index.toString())}
              disabled={isAnswered}
              className={cn(
                "w-full p-4 text-left rounded-lg border-2 transition-all",
                "hover:bg-[#00C7B1] hover:text-white hover:border-transparent",
                "disabled:cursor-not-allowed",
                !isAnswered && "border-gray-200 text-blue-900",
                getOptionStyle(index.toString()) //!fix this handler
              )}
            >
              <span className="font-semibold">{index}.</span> {option.option}
            </button>
          ))}
        </div>
         
        {isAnswered && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-2">Explanation:</h3>
            <p className="text-blue-800">{question?.explanation}</p>
          </div>
        )}

        {/* the below stuffs are the most important as they will be emitting stuffs !! */}

        <div className="mt-8 flex justify-between items-center">

        {/* !need to bring on the disabled feature  */}
          <Button
            variant="outline"
            onClick={()=>{if(socket)handlePrevious(socket)}}
            // disabled={quizState.currentQuestionIndex === 0}
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Previous
          </Button>

          <Button
            variant="default"
            onClick={() => {
              // Handle submit logic here
              console.log('Submitted answers:', selectedAnswer)
            }}
          >
            Submit Answers
          </Button>

          {/* !need to bring on the disabled feature  */}
          <Button
            variant="outline"
            onClick={()=>{if(socket)handleNext(socket)}}
            // disabled={quizState.currentQuestionIndex === questions.length - 1}
          >
            Next <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </Card>
    </div>
  )
}

