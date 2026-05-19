"use client"

import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardActions from "@mui/material/CardActions"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Chip from "@mui/material/Chip"
import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import InventoryIcon from "@mui/icons-material/Inventory"
import CategoryIcon from "@mui/icons-material/Category"
import { Producto } from "@/types"

interface ProductCardsProps {
  products: Producto[]
  onEdit: (product: Producto) => void
  onDelete: (product: Producto) => void
}

export function ProductCards({ products, onEdit, onDelete }: ProductCardsProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(value)
  }

  if (products.length === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 8 }}>
        <Typography color="text.secondary">No hay productos registrados</Typography>
      </Box>
    )
  }

  return (
    <Grid container spacing={3}>
      {products.map((product) => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={product.id}>
          <Card
            elevation={0}
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              border: "1px solid",
              borderColor: "divider",
              transition: "all 0.2s",
              "&:hover": {
                boxShadow: 4,
              },
            }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                <Typography variant="h6" component="h3" sx={{ fontWeight: 600, flex: 1, mr: 1 }}>
                  {product.nombre}
                </Typography>
                <Chip
                  label={product.activo ? "Activo" : "Inactivo"}
                  color={product.activo ? "success" : "default"}
                  size="small"
                />
              </Box>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 2, minHeight: 40 }}
              >
                {product.descripcion}
              </Typography>

              <Typography
                variant="h5"
                color="primary"
                sx={{ fontWeight: 700, mb: 2 }}
              >
                {formatCurrency(product.precio)}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: "flex", gap: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <CategoryIcon fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    {product.categoria}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <InventoryIcon fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    Stock: {product.stock}
                  </Typography>
                </Box>
              </Box>
            </CardContent>

            <CardActions sx={{ px: 2, pb: 2, pt: 0 }}>
              <Button
                size="small"
                startIcon={<EditIcon />}
                onClick={() => onEdit(product)}
              >
                Editar
              </Button>
              <Button
                size="small"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={() => onDelete(product)}
              >
                Eliminar
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}
