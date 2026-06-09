"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Alert from "@mui/material/Alert"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import CircularProgress from "@mui/material/CircularProgress"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"

export default function LoginPage() {
  const router = useRouter()
  const [tab, setTab] = useState(0) // 0 = login, 1 = registro
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const isRegister = tab === 1

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const endpoint = isRegister ? "/api/auth/register" : "/api/auth/login"
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Ocurrió un error")
        return
      }

      router.push("/")
      router.refresh()
    } catch {
      setError("No se pudo conectar con el servidor")
    } finally {
      setLoading(false)
    }
  }

  const handleTabChange = (_: React.SyntheticEvent, value: number) => {
    setTab(value)
    setError("")
  }

  return (
    <Box
      sx={{
        bgcolor: "background.default",
        minHeight: "100%",
        display: "flex",
        alignItems: "center",
        py: { xs: 6, md: 10 },
      }}
    >
      <Container maxWidth="xs">
        <Card elevation={3} sx={{ borderRadius: 3 }}>
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Box sx={{ textAlign: "center", mb: 3 }}>
              <Box
                sx={{
                  display: "inline-flex",
                  p: 1.5,
                  borderRadius: "50%",
                  bgcolor: "primary.main",
                  color: "white",
                  mb: 2,
                }}
              >
                <LockOutlinedIcon />
              </Box>
              <Typography variant="h5" component="h1" fontWeight={700}>
                {isRegister ? "Crear cuenta" : "Iniciar sesión"}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                {isRegister
                  ? "Regístrate para acceder al sistema"
                  : "Ingresa tus credenciales para continuar"}
              </Typography>
            </Box>

            <Tabs value={tab} onChange={handleTabChange} variant="fullWidth" sx={{ mb: 3 }}>
              <Tab label="Iniciar sesión" />
              <Tab label="Registrarse" />
            </Tabs>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} noValidate>
              <TextField
                label="Email"
                type="email"
                fullWidth
                required
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
              <TextField
                label="Contraseña"
                type="password"
                fullWidth
                required
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete={isRegister ? "new-password" : "current-password"}
                helperText={isRegister ? "Mínimo 6 caracteres" : undefined}
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                disabled={loading}
                sx={{ mt: 3, py: 1.25 }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : isRegister ? (
                  "Crear cuenta"
                ) : (
                  "Iniciar sesión"
                )}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  )
}
