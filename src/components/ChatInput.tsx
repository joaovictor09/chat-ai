import { ChangeEvent, FormEvent, KeyboardEvent, useRef, useState } from 'react'
import { Button } from './ui/button'
import { ChatRequestOptions } from 'ai'
import { Textarea } from './ui/textarea'

interface ChatInputProps {
  handleSubmit: (
    e: FormEvent<HTMLFormElement>,
    chatRequestOptions?: ChatRequestOptions | undefined,
  ) => void
  isLoading: boolean
  input: string
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => void
  stop: () => void
}

export function ChatInput({
  handleSubmit,
  input,
  isLoading,
  handleInputChange,
  stop,
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [textareaHeight, setTextareaHeight] = useState<number | undefined>(
    undefined,
  )

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSubmit(event)
    }
  }

  const handleTextareaResize = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      const newHeight = Math.min(textarea.scrollHeight - 14, 200)
      setTextareaHeight(newHeight)
      textarea.style.height = `${newHeight}px`
    }
  }

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    handleTextareaResize()
    handleInputChange(event)
  }

  function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    handleSubmit(e)
  }

  return (
    <div className="w-full flex justify-center absolute px-5 lg:px-0 pb-5 bottom-0 left-1/2 -translate-x-1/2 bg-gradient-to-b from-transparent to-slate-400">
      <form
        className="relative flex w-full gap-2 max-w-3xl"
        onSubmit={handleFormSubmit}
      >
        <Button
          className={`absolute right-1/2 translate-x-1/2 -top-2 -translate-y-full ${
            !isLoading && 'hidden'
          }`}
          onClick={stop}
        >
          Stop
        </Button>

        {/* <Textarea
          placeholder="How can i help you?"
          value={input}
          className="bg-white resize-none"
          onChange={handleInputChange}
        /> */}

        <Textarea
          className="flex-grow outline-none resize-none mr-2 bg-white"
          style={{ height: textareaHeight ? `${textareaHeight}px` : '40px' }}
          placeholder="Digite sua mensagem"
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          ref={textareaRef}
        />

        <Button type="submit" disabled={isLoading}>
          Send
        </Button>
      </form>
    </div>
  )
}
