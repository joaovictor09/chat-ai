'use client'

import { signIn } from 'next-auth/react'

import { Button } from './ui/button'

export function SignInButton() {
  return <Button onClick={() => signIn('github')}>SignIn with Github</Button>
}
