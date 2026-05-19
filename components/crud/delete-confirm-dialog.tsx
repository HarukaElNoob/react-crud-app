"use client"

import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogActions from "@mui/material/DialogActions"
import Button from "@mui/material/Button"
import WarningIcon from "@mui/icons-material/Warning"
import Box from "@mui/material/Box"

interface DeleteConfirmDialogProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  productName: string
}

export function DeleteConfirmDialog({
  open,
  onClose,
  onConfirm,
  productName,
}: DeleteConfirmDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Box
          sx={{
            bgcolor: "error.light",
            color: "error.contrastText",
            borderRadius: "50%",
            p: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <WarningIcon />
        </Box>
        Confirmar Eliminación
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          ¿Estás seguro de que deseas eliminar el producto{" "}
          <strong>{productName}</strong>? Esta acción no se puede deshacer.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} color="inherit">
          Cancelar
        </Button>
        <Button onClick={onConfirm} variant="contained" color="error">
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  )
}
