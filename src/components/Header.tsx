import { SignInButton } from './SignInButton'
import { getServerSession } from 'next-auth'
import { SignOutButton } from './SignOutButton'
import { use } from 'react'

export function Header() {
  const session = use(getServerSession())

  console.log(session)

  return (
    <header className="w-full flex justify-center py-5 border-b border-slate-300 shadow-md">
      <div className="max-w-5xl w-full flex justify-between items-center">
        <span>Chat Gepeteco</span>
        {session ? <SignOutButton /> : <SignInButton />}
      </div>
    </header>
  )
}
