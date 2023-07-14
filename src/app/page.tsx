import { Chat } from '@/components/Chat'
import { Header } from '@/components/Header'

async function getMessages() {
  const response = await fetch('http://localhost:3000/api/message', {
    method: 'GET',
    cache: 'no-cache',
  })

  const { messages } = await response.json()

  return messages
}

export default async function Home() {
  const messages = await getMessages()

  return (
    <div className="relative flex flex-col h-screen bg-slate-50 items-center justify-center">
      <Header />
      <Chat initialMessages={messages} />
    </div>
  )
}
