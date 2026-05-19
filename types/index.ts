export interface TeamMember {
  id: string
  nombre: string
  matricula: string
  carrera: string
  correo: string
  foto: string
  rol: string
  biografia: string
}

export interface Producto {
  id: string
  nombre: string
  descripcion: string
  precio: number
  categoria: string
  stock: number
  activo: boolean
  fechaCreacion: string
}
