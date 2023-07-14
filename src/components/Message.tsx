import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

interface MessageProps {
  role: 'system' | 'user' | 'assistant' | 'function'
  content: string
}

export function Message({ role, content }: MessageProps) {
  return (
    <div className="flex py-4 last:pb-20 last:mb-40 justify-center max-w-3xl w-full gap-3 text-slate-600 text-sm border-b border-slate-300 last:border-transparent">
      {role === 'user' && (
        <Avatar>
          <AvatarFallback>JV</AvatarFallback>
          <AvatarImage src="https://github.com/joaovictor09.png" />
        </Avatar>
      )}

      {role === 'assistant' && (
        <Avatar>
          <AvatarFallback>RS</AvatarFallback>
          <AvatarImage src="https://github.com/rocketseat.png" />
        </Avatar>
      )}

      <p data-role={role} className="leading-relaxed w-full pb-5">
        <span className="block font-bold text-slate-700">
          {role === 'user' ? 'Usuário' : 'AI'}:
        </span>
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkMath]}
          className="w-full prose text-sm break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
        >
          {content}
        </ReactMarkdown>
      </p>
    </div>
  )
}
