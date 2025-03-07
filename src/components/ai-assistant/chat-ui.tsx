import { BotMessageSquare, Send } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import EmptyChatState from "./empty-chat-state";
import { useState } from "react";
import { sendAIMessage } from "@/src/utils/api/ai";

type Message = {
  role: string,
  content: string
}

export function ChatUI() {
  const [ input, setInput ] = useState<string>('');
  const [ messages, setMessages ] = useState<Message[]>([]);
  const onSendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    setMessages(prev => [...prev, ({
      role: 'user',
      content: input
    })]);
    setInput('')
    event.preventDefault();
    const result = await sendAIMessage({message: input});
    setMessages(prev => [...prev, result.aiResponse]);
  }

  return (
    <div className="flex gap-1 flex-col h-full">
      <div className="flex items-center">
        <BotMessageSquare /><Label className="ml-2" htmlFor="title">Habot</Label>
      </div>
      {
        messages?.length === 0 && <EmptyChatState />
      }
      <div>
        {messages.map((msg: Message, i) => 
          <div key={i}
            className={`flex ${msg.role == 'user' ? 'justify-end' : 'justify-start'} text-sm`}
          >
            <div className={`p-3 mb-3 border-solid rounded-t-lg ${msg.role == 'user' ? 'bg-white text-black rounded-bl-lg' : 'bg-gray-500 rounded-br-lg'}`}>
              {msg.content}
            </div>
          </div>
        )}
        </div>
      <form onSubmit={(e) => onSendMessage(e)} className="relative mt-auto">
        <Input
          value={input}
          id="title"
          type="text"
          name="AI Message"
          placeholder="What needs to be done?"
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key == 'Enter' && onSendMessage(e)}
        />
        <button
        type="submit"
        className="absolute inset-y-0 right-2 flex items-center justify-center text-gray-500 hover:text-gray-700"
      >
          <Send className="h-5 w-5" />
      </button>
      </form>
    </div>
  )
}