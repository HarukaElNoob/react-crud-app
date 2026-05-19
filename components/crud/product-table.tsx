"use client"

import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import IconButton from "@mui/material/IconButton"
import Chip from "@mui/material/Chip"
import Tooltip from "@mui/material/Tooltip"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import { Producto } from "@/types"

interface ProductTableProps {
  products: Producto[]
  onEdit: (product: Producto) => void
  onDelete: (product: Producto) => void
}

export function ProductTable({ products, onEdit, onDelete }: ProductTableProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(value)
  }

  return (
    <TableContainer component={Paper} elevation={0} sx={{ border: "1px solid", borderColor: "divider" }}>
      <Table sx={{ minWidth: 650 }} aria-label="tabla de productos">
        <TableHead>
          <TableRow sx={{ bgcolor: "grey.50" }}>
            <TableCell sx={{ fontWeight: 600 }}>Nombre</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Categoría</TableCell>
            <TableCell sx={{ fontWeight: 600 }} align="right">Precio</TableCell>
            <TableCell sx={{ fontWeight: 600 }} align="right">Stock</TableCell>
            <TableCell sx={{ fontWeight: 600 }} align="center">Estado</TableCell>
            <TableCell sx={{ fontWeight: 600 }} align="center">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow
              key={product.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              hover
            >
              <TableCell component="th" scope="row">
                {product.nombre}
              </TableCell>
              <TableCell>{product.categoria}</TableCell>
              <TableCell align="right">{formatCurrency(product.precio)}</TableCell>
              <TableCell align="right">{product.stock}</TableCell>
              <TableCell align="center">
                <Chip
                  label={product.activo ? "Activo" : "Inactivo"}
                  color={product.activo ? "success" : "default"}
                  size="small"
                />
              </TableCell>
              <TableCell align="center">
                <Tooltip title="Editar">
                  <IconButton color="primary" onClick={() => onEdit(product)} size="small">
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Eliminar">
                  <IconButton color="error" onClick={() => onDelete(product)} size="small">
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
          {products.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                No hay productos registrados
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
