import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { SESSION_COOKIE } from "@/lib/auth"

export async function GET() {
  const cookieStore = await cookies()
  const email = cookieStore.get(SESSION_COOKIE)?.value
  return NextResponse.json({ user: email ? { email } : null })
}
