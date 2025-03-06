import { BotMessageSquare, Send } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import EmptyChatState from "./empty-chat-state";
import { useState } from "react";
import { sendAIMessage } from "@/src/utils/api/ai";

export function ChatUI() {
  const [ input, setInput ] = useState<string>('');
  const onSendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendAIMessage({message: input})
  }

  return (
    <div className="flex gap-1 flex-col h-full">
      <div className="flex items-center">
        <BotMessageSquare /><Label className="ml-2" htmlFor="title">Habot</Label>
      </div>
      <EmptyChatState />
      <form onSubmit={(e) => onSendMessage(e)} className="relative mt-auto">
        <Input
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