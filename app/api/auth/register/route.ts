import { NextResponse } from "next/server"
import { getUsersCollection, hashPassword, SESSION_COOKIE } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email y contraseña son obligatorios" }, { status: 400 })
    }
    if (typeof password !== "string" || password.length < 6) {
      return NextResponse.json({ error: "La contraseña debe tener al menos 6 caracteres" }, { status: 400 })
    }

    const normalizedEmail = String(email).trim().toLowerCase()
    const users = await getUsersCollection()

    const existing = await users.findOne({ email: normalizedEmail })
    if (existing) {
      return NextResponse.json({ error: "Ya existe una cuenta con este email" }, { status: 409 })
    }

    await users.insertOne({
      email: normalizedEmail,
      passwordHash: hashPassword(password),
      createdAt: new Date(),
    })

    const response = NextResponse.json({ email: normalizedEmail }, { status: 201 })
    response.cookies.set(SESSION_COOKIE, normalizedEmail, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 días
    })
    return response
  } catch (error) {
    console.error("[v0] Error en registro:", error)
    return NextResponse.json({ error: "Error al crear la cuenta" }, { status: 500 })
  }
}
