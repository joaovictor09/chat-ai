'use client'

import { useChat } from 'ai/react'
import { Message } from './Message'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { ChatInput } from './ChatInput'
import { Message as MessageProps } from 'ai'

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
      className="flex-1 flex flex-col justify-start items-center w-full"
      ref={chatContainerRef}
      style={{ overflowY: 'scroll' }}
      onScroll={handleScroll}
    >
      {children}
    </div>
  )
}

interface ChatProps {
  initialMessages: MessageProps[]
}

export function Chat({ initialMessages }: ChatProps) {
  console.log(initialMessages)

  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } =
    useChat({
      onFinish: async (message) => {
        await fetch('/api/message', {
          method: 'POST',
          body: JSON.stringify({
            content: message.content,
            role: message.role,
          }),
        })
      },
      initialMessages,
    })

  async function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    await fetch('/api/message', {
      method: 'POST',
      body: JSON.stringify({
        content: input,
        role: 'user',
      }),
    })
    handleSubmit(event)
  }

  return (
    messages && (
      <div className="w-full flex flex-1 h-full overflow-y-hidden justify-center">
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
          handleSubmit={handleFormSubmit}
          input={input}
          isLoading={isLoading}
          stop={stop}
        />
      </div>
    )
  )
}
