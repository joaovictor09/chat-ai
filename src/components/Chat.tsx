'use client'

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card";
import { Input } from "./ui/input";

import { useChat } from 'ai/react'
import { ScrollArea } from "./ui/scroll-area";
import { Message } from "./Message";

export function Chat(){
  const {messages, input, handleInputChange, handleSubmit, isLoading, stop} = useChat()
  
  return (
    <Card className="w-[440px]">
        <CardHeader>
          <CardTitle>Chat AI</CardTitle>
          <CardDescription>Using Vercel SDK to create a chat bot.</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px] w-full pr-4">
            { messages.map(message => {
              return (
                <Message 
                  key={message.id}
                  content={message.content}
                  role={message.role}
                />
              )
            }) }
          </ScrollArea>
        </CardContent>
        <CardFooter >
          <form className="flex w-full gap-2 relative" onSubmit={handleSubmit}>
            <Button 
              className={`absolute right-1/2 translate-x-1/2 -top-2 -translate-y-full ${!isLoading && 'hidden'}`}
              onClick={stop}
            >
              Stop
            </Button>

            <Input 
              placeholder="How can i help you?"
              value={input} onChange={handleInputChange} 
            />
            
            <Button 
              type="submit" 
              disabled={isLoading}
            >
              Send
            </Button>
          </form>
        </CardFooter>
      </Card>
  )
}