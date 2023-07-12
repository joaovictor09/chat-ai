import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

interface MessageProps {
  role: 'system' | 'user' | 'assistant' | 'function',
  content: string;
}

export function Message({ role, content }: MessageProps) {
  return (
    <div className="flex gap-3 text-slate-600 text-sm mb-4">
      {role === 'user' && (
        <Avatar>
          <AvatarFallback>JV</AvatarFallback>
          <AvatarImage src="https://github.com/joaovictor09.png"/>
        </Avatar>
      )}

      {role === 'assistant' && (
        <Avatar>
          <AvatarFallback>RS</AvatarFallback>
          <AvatarImage src="https://github.com/rocketseat.png"/>
        </Avatar>
      )}

      <p className="leading-relaxed">
        <span className="block font-bold text-slate-700">{role === 'user' ? 'Usuário' : 'AI'}:</span>
        <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} className='prose-sm'>
          {content}
        </ReactMarkdown>
      </p>
    </div>
  )
}