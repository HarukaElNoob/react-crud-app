import { randomBytes, scryptSync, timingSafeEqual } from "crypto"
import clientPromise from "@/lib/mongodb"
import type { Collection } from "mongodb"

export interface UserDoc {
  email: string
  passwordHash: string
  createdAt: Date
}

// Nombre de la cookie de sesión simple
export const SESSION_COOKIE = "session_user"

export async function getUsersCollection(): Promise<Collection<UserDoc>> {
  const client = await clientPromise
  const db = client.db("app")
  return db.collection<UserDoc>("users")
}

// Genera un hash seguro de la contraseña usando scrypt + salt aleatorio
export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex")
  const derived = scryptSync(password, salt, 64).toString("hex")
  return `${salt}:${derived}`
}

// Compara una contraseña con su hash almacenado de forma segura
export function verifyPassword(password: string, stored: string): boolean {
  const [salt, key] = stored.split(":")
  if (!salt || !key) return false
  const derived = scryptSync(password, salt, 64)
  const keyBuffer = Buffer.from(key, "hex")
  if (keyBuffer.length !== derived.length) return false
  return timingSafeEqual(keyBuffer, derived)
}
