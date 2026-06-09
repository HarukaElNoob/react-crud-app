import { NextResponse } from "next/server"
import { getUsersCollection, verifyPassword, SESSION_COOKIE } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email y contraseña son obligatorios" }, { status: 400 })
    }

    const normalizedEmail = String(email).trim().toLowerCase()
    const users = await getUsersCollection()

    const user = await users.findOne({ email: normalizedEmail })
    if (!user || !verifyPassword(password, user.passwordHash)) {
      return NextResponse.json({ error: "Credenciales incorrectas" }, { status: 401 })
    }

    const response = NextResponse.json({ email: normalizedEmail })
    response.cookies.set(SESSION_COOKIE, normalizedEmail, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 días
    })
    return response
  } catch (error) {
    console.error("[v0] Error en login:", error)
    return NextResponse.json({ error: "Error al iniciar sesión" }, { status: 500 })
  }
}
