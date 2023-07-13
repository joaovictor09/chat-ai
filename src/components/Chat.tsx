'use client'

import { Button } from './ui/button'
import { Input } from './ui/input'

import { useChat } from 'ai/react'
import { Message } from './Message'
import { useEffect, useRef, useState } from 'react'
import { ChatInput } from './ChatInput'

interface ChatScrollContainerProps {
  children: React.ReactNode
}

export function ChatScrollContainer({ children }: ChatScrollContainerProps) {
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(true)

  useEffect(() => {
    const container = chatContainerRef.current
    if (container && isScrolledToBottom) {
      container.scrollTop = container.scrollHeight
    }
  }, [children, isScrolledToBottom])

  const handleScroll = () => {
    const container = chatContainerRef.current
    if (container) {
      const isAtBottom =
        Math.abs(
          container.scrollTop + container.clientHeight - container.scrollHeight,
        ) <= 1
      setIsScrolledToBottom(isAtBottom)
    }
  }

  return (
    <div
      className="flex-1 justify-center items-center w-full"
      ref={chatContainerRef}
      style={{ overflowY: 'auto' }}
      onScroll={handleScroll}
    >
      {children}
    </div>
  )
}

export function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } =
    useChat()

  return (
    <div className="w-full h-screen flex justify-center">
      <div className="w-full flex flex-col">
        <ChatScrollContainer>
          {messages.map((message) => {
            return (
              <Message
                key={message.id}
                content={message.content}
                role={message.role}
              />
            )
          })}
        </ChatScrollContainer>
      </div>
      {/* <div className="h-20 w-full" /> */}
      <ChatInput
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        input={input}
        isLoading={isLoading}
        stop={stop}
      />
    </div>
  )
}
