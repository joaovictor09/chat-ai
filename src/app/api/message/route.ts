import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const res = await request.json()
  const session = await getServerSession()

  if (!session) {
    return
  }

  // eslint-disable-next-line
  const email = session.user?.email!

  const message = await prisma.message.create({
    data: {
      role: res.role,
      content: res.content,
      user: {
        connect: {
          email,
        },
      },
    },
  })

  console.log(message)

  return NextResponse.json({ message })
}

export async function GET() {
  const session = await getServerSession()

  const messages = await prisma.message.findMany({
    where: {
      user: {
        email: session?.user?.email,
      },
    },
  })

  console.log(messages)

  return NextResponse.json({ messages })
}
