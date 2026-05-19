import { TeamMember, Producto } from "@/types"

export const teamMembers: TeamMember[] = [
  {
    id: "1",
    nombre: "Jorge Enrique Vazquez Cuz",
    matricula: "2021150481095",
    carrera: "Ingeniería en Sistemas Computacionales",
    correo: "2021150481095@tesjo.edu.mx",
    foto: "/placeholder-user.jpg",
    rol: "Desarrollador Full Stack",
    biografia: "Estudiante apasionado por el desarrollo web y las tecnologías modernas. Experiencia en React, Node.js y bases de datos.",
  },
]

export const initialProducts: Producto[] = [
  {
    id: "1",
    nombre: "Laptop HP Pavilion",
    descripcion: "Laptop de alto rendimiento con procesador Intel Core i7, 16GB RAM y 512GB SSD.",
    precio: 15999.99,
    categoria: "Electrónica",
    stock: 25,
    activo: true,
    fechaCreacion: "2024-01-15",
  },
  {
    id: "2",
    nombre: "Mouse Inalámbrico Logitech",
    descripcion: "Mouse ergonómico con conexión Bluetooth y batería de larga duración.",
    precio: 599.99,
    categoria: "Accesorios",
    stock: 100,
    activo: true,
    fechaCreacion: "2024-01-20",
  },
  {
    id: "3",
    nombre: "Teclado Mecánico RGB",
    descripcion: "Teclado mecánico para gaming con switches Cherry MX e iluminación RGB personalizable.",
    precio: 1299.99,
    categoria: "Accesorios",
    stock: 50,
    activo: true,
    fechaCreacion: "2024-02-01",
  },
  {
    id: "4",
    nombre: "Monitor Samsung 27\"",
    descripcion: "Monitor Full HD IPS de 27 pulgadas con panel antirreflejo y ajuste de altura.",
    precio: 4599.99,
    categoria: "Electrónica",
    stock: 15,
    activo: false,
    fechaCreacion: "2024-02-10",
  },
  {
    id: "5",
    nombre: "Audífonos Sony WH-1000XM5",
    descripcion: "Audífonos inalámbricos con cancelación de ruido activa y hasta 30 horas de batería.",
    precio: 6999.99,
    categoria: "Audio",
    stock: 30,
    activo: true,
    fechaCreacion: "2024-02-15",
  },
]
