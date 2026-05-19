"use client"

import { useEffect, useState } from "react"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogContent from "@mui/material/DialogContent"
import DialogActions from "@mui/material/DialogActions"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import InputLabel from "@mui/material/InputLabel"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import Switch from "@mui/material/Switch"
import Grid from "@mui/material/Grid"
import InputAdornment from "@mui/material/InputAdornment"
import { Producto } from "@/types"

interface ProductFormDialogProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: Omit<Producto, "id" | "fechaCreacion">) => void
  product: Producto | null
}

const categorias = ["Electrónica", "Accesorios", "Audio", "Software", "Redes"]

const initialFormData = {
  nombre: "",
  descripcion: "",
  precio: 0,
  categoria: "",
  stock: 0,
  activo: true,
}

interface FormErrors {
  nombre?: string
  descripcion?: string
  precio?: string
  categoria?: string
  stock?: string
}

export function ProductFormDialog({
  open,
  onClose,
  onSubmit,
  product,
}: ProductFormDialogProps) {
  const [formData, setFormData] = useState(initialFormData)
  const [errors, setErrors] = useState<FormErrors>({})

  useEffect(() => {
    if (product) {
      setFormData({
        nombre: product.nombre,
        descripcion: product.descripcion,
        precio: product.precio,
        categoria: product.categoria,
        stock: product.stock,
        activo: product.activo,
      })
    } else {
      setFormData(initialFormData)
    }
    setErrors({})
  }, [product, open])

  const validate = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es requerido"
    } else if (formData.nombre.length < 3) {
      newErrors.nombre = "El nombre debe tener al menos 3 caracteres"
    }

    if (!formData.descripcion.trim()) {
      newErrors.descripcion = "La descripción es requerida"
    } else if (formData.descripcion.length < 10) {
      newErrors.descripcion = "La descripción debe tener al menos 10 caracteres"
    }

    if (formData.precio <= 0) {
      newErrors.precio = "El precio debe ser mayor a 0"
    }

    if (!formData.categoria) {
      newErrors.categoria = "Seleccione una categoría"
    }

    if (formData.stock < 0) {
      newErrors.stock = "El stock no puede ser negativo"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      onSubmit(formData)
    }
  }

  const handleChange = (field: keyof typeof formData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { value: unknown } }
  ) => {
    const value = e.target.value
    setFormData((prev) => ({
      ...prev,
      [field]: field === "precio" || field === "stock" ? Number(value) : value,
    }))
    // Clear error when user types
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle sx={{ fontWeight: 600 }}>
          {product ? "Editar Producto" : "Nuevo Producto"}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2} sx={{ mt: 0.5 }}>
            <Grid size={12}>
              <TextField
                label="Nombre del producto"
                fullWidth
                value={formData.nombre}
                onChange={handleChange("nombre")}
                error={!!errors.nombre}
                helperText={errors.nombre}
                required
              />
            </Grid>

            <Grid size={12}>
              <TextField
                label="Descripción"
                fullWidth
                multiline
                rows={3}
                value={formData.descripcion}
                onChange={handleChange("descripcion")}
                error={!!errors.descripcion}
                helperText={errors.descripcion}
                required
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Precio"
                fullWidth
                type="number"
                value={formData.precio}
                onChange={handleChange("precio")}
                error={!!errors.precio}
                helperText={errors.precio}
                slotProps={{
                  input: {
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  },
                  htmlInput: {
                    min: 0,
                    step: 0.01,
                  },
                }}
                required
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Stock"
                fullWidth
                type="number"
                value={formData.stock}
                onChange={handleChange("stock")}
                error={!!errors.stock}
                helperText={errors.stock}
                slotProps={{
                  htmlInput: {
                    min: 0,
                  },
                }}
                required
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth error={!!errors.categoria} required>
                <InputLabel>Categoría</InputLabel>
                <Select
                  value={formData.categoria}
                  label="Categoría"
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, categoria: e.target.value }))
                    if (errors.categoria) {
                      setErrors((prev) => ({ ...prev, categoria: undefined }))
                    }
                  }}
                >
                  {categorias.map((cat) => (
                    <MenuItem key={cat} value={cat}>
                      {cat}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.activo}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, activo: e.target.checked }))
                    }
                    color="primary"
                  />
                }
                label="Producto activo"
                sx={{ mt: 1 }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={onClose} color="inherit">
            Cancelar
          </Button>
          <Button type="submit" variant="contained">
            {product ? "Guardar Cambios" : "Crear Producto"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
