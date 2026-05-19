"use client"

import Box from "@mui/material/Box"
import Chip from "@mui/material/Chip"
import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import { Producto } from "@/types"

interface ProductDataGridProps {
  products: Producto[]
  onEdit: (product: Producto) => void
  onDelete: (product: Producto) => void
}

export function ProductDataGrid({ products, onEdit, onDelete }: ProductDataGridProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(value)
  }

  const columns: GridColDef[] = [
    {
      field: "nombre",
      headerName: "Nombre",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "categoria",
      headerName: "Categoría",
      width: 130,
    },
    {
      field: "precio",
      headerName: "Precio",
      width: 130,
      align: "right",
      headerAlign: "right",
      renderCell: (params: GridRenderCellParams) => formatCurrency(params.value),
    },
    {
      field: "stock",
      headerName: "Stock",
      width: 100,
      align: "right",
      headerAlign: "right",
    },
    {
      field: "activo",
      headerName: "Estado",
      width: 120,
      align: "center",
      headerAlign: "center",
      renderCell: (params: GridRenderCellParams) => (
        <Chip
          label={params.value ? "Activo" : "Inactivo"}
          color={params.value ? "success" : "default"}
          size="small"
        />
      ),
    },
    {
      field: "fechaCreacion",
      headerName: "Fecha",
      width: 120,
    },
    {
      field: "acciones",
      headerName: "Acciones",
      width: 120,
      align: "center",
      headerAlign: "center",
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams) => (
        <>
          <Tooltip title="Editar">
            <IconButton
              color="primary"
              size="small"
              onClick={() => onEdit(params.row as Producto)}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar">
            <IconButton
              color="error"
              size="small"
              onClick={() => onDelete(params.row as Producto)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ]

  return (
    <Box sx={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={products}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10, 25]}
        disableRowSelectionOnClick
        sx={{
          bgcolor: "background.paper",
          border: "1px solid",
          borderColor: "divider",
          "& .MuiDataGrid-columnHeaders": {
            bgcolor: "grey.50",
          },
        }}
        localeText={{
          noRowsLabel: "No hay productos registrados",
          MuiTablePagination: {
            labelRowsPerPage: "Filas por página:",
            labelDisplayedRows: ({ from, to, count }) =>
              `${from}-${to} de ${count}`,
          },
        }}
      />
    </Box>
  )
}
