import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Esperamos la conexión a MongoDB
    const client = await clientPromise;
    // Seleccionamos la base de datos
    const db = client.db();
    
    // Hacemos una prueba simple, por ejemplo un ping
    await db.command({ ping: 1 });

    return NextResponse.json({ 
      success: true, 
      message: "¡Conexión a MongoDB exitosa!" 
    });
  } catch (error) {
    console.error("Error conectando a MongoDB:", error);
    return NextResponse.json(
      { success: false, message: "Fallo la conexión a MongoDB." },
      { status: 500 }
    );
  }
}
