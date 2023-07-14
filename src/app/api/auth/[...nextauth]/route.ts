import NextAuth, { AuthOptions } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'

import type { Adapter } from 'next-auth/adapters'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import { randomUUID, randomBytes } from 'crypto'

const prisma = new PrismaClient()

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GitHubProvider({
      clientId: 'cd6be016d8e7e2ce02db',
      clientSecret: 'eada273b8a9c0c38227f8e06d20d753cc5196a6f',
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
    generateSessionToken: () => {
      return randomUUID?.() ?? randomBytes(32).toString('hex')
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
// eslint-ignore-next-line
