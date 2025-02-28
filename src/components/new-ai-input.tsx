import { BotMessageSquare, Send } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export function AIInput() {
  return (
    <div className="space-y-2">
      <div className="flex items-center">
        <BotMessageSquare /><Label className="ml-2" htmlFor="title">Habot</Label>
      </div>
      <div className="relative">
        <Input id="title" type="email" value='' name="email"  placeholder="What needs to be done?" />
        <button
        type="submit"
        className="absolute inset-y-0 right-2 flex items-center justify-center text-gray-500 hover:text-gray-700"
      >
        <Send className="h-5 w-5" />
      </button>
      </div>
    </div>
  )
}