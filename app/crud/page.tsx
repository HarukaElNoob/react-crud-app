"use client"

import { useState } from "react"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Button from "@mui/material/Button"
import Fab from "@mui/material/Fab"
import AddIcon from "@mui/icons-material/Add"
import TableViewIcon from "@mui/icons-material/TableView"
import ViewModuleIcon from "@mui/icons-material/ViewModule"
import GridOnIcon from "@mui/icons-material/GridOn"
import { initialProducts } from "@/data/mock-data"
import { Producto } from "@/types"
import { ProductTable } from "@/components/crud/product-table"
import { ProductCards } from "@/components/crud/product-cards"
import { ProductDataGrid } from "@/components/crud/product-data-grid"
import { ProductFormDialog } from "@/components/crud/product-form-dialog"
import { DeleteConfirmDialog } from "@/components/crud/delete-confirm-dialog"

export default function CrudPage() {
  const [products, setProducts] = useState<Producto[]>(initialProducts)
  const [viewMode, setViewMode] = useState(0)
  const [formOpen, setFormOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Producto | null>(null)
  const [deletingProduct, setDeletingProduct] = useState<Producto | null>(null)

  const handleViewChange = (_: React.SyntheticEvent, newValue: number) => {
    setViewMode(newValue)
  }

  const handleCreate = () => {
    setEditingProduct(null)
    setFormOpen(true)
  }

  const handleEdit = (product: Producto) => {
    setEditingProduct(product)
    setFormOpen(true)
  }

  const handleDeleteClick = (product: Producto) => {
    setDeletingProduct(product)
    setDeleteOpen(true)
  }

  const handleFormSubmit = (data: Omit<Producto, "id" | "fechaCreacion">) => {
    if (editingProduct) {
      // Update
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id ? { ...p, ...data } : p
        )
      )
    } else {
      // Create
      const newProduct: Producto = {
        ...data,
        id: Date.now().toString(),
        fechaCreacion: new Date().toISOString().split("T")[0],
      }
      setProducts((prev) => [...prev, newProduct])
    }
    setFormOpen(false)
    setEditingProduct(null)
  }

  const handleConfirmDelete = () => {
    if (deletingProduct) {
      setProducts((prev) => prev.filter((p) => p.id !== deletingProduct.id))
    }
    setDeleteOpen(false)
    setDeletingProduct(null)
  }

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100%", py: { xs: 4, md: 6 } }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "center" },
            gap: 2,
            mb: 4,
          }}
        >
          <Box>
            <Typography variant="h3" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
              Sistema CRUD
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Gestión de productos con operaciones Crear, Leer, Actualizar y Eliminar
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleCreate}
            size="large"
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            Nuevo Producto
          </Button>
        </Box>

        {/* View Tabs */}
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            mb: 3,
            bgcolor: "background.paper",
            borderRadius: 1,
          }}
        >
          <Tabs
            value={viewMode}
            onChange={handleViewChange}
            variant="fullWidth"
            aria-label="Vista de productos"
          >
            <Tab icon={<TableViewIcon />} label="Tabla" iconPosition="start" />
            <Tab icon={<ViewModuleIcon />} label="Cards" iconPosition="start" />
            <Tab icon={<GridOnIcon />} label="DataGrid" iconPosition="start" />
          </Tabs>
        </Box>

        {/* Product Views */}
        {viewMode === 0 && (
          <ProductTable
            products={products}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
          />
        )}
        {viewMode === 1 && (
          <ProductCards
            products={products}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
          />
        )}
        {viewMode === 2 && (
          <ProductDataGrid
            products={products}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
          />
        )}

        {/* FAB for mobile */}
        <Fab
          color="primary"
          aria-label="add"
          onClick={handleCreate}
          sx={{
            position: "fixed",
            bottom: 24,
            right: 24,
            display: { xs: "flex", md: "none" },
          }}
        >
          <AddIcon />
        </Fab>

        {/* Dialogs */}
        <ProductFormDialog
          open={formOpen}
          onClose={() => {
            setFormOpen(false)
            setEditingProduct(null)
          }}
          onSubmit={handleFormSubmit}
          product={editingProduct}
        />

        <DeleteConfirmDialog
          open={deleteOpen}
          onClose={() => {
            setDeleteOpen(false)
            setDeletingProduct(null)
          }}
          onConfirm={handleConfirmDelete}
          productName={deletingProduct?.nombre || ""}
        />
      </Container>
    </Box>
  )
}
