"use client"

import Link from "next/link"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import GroupIcon from "@mui/icons-material/Group"
import StorageIcon from "@mui/icons-material/Storage"
import CodeIcon from "@mui/icons-material/Code"
import DevicesIcon from "@mui/icons-material/Devices"

const features = [
  {
    icon: <CodeIcon sx={{ fontSize: 48, color: "primary.main" }} />,
    title: "React & Material UI",
    description: "Desarrollado con las mejores prácticas de React y el sistema de diseño Material UI.",
  },
  {
    icon: <DevicesIcon sx={{ fontSize: 48, color: "primary.main" }} />,
    title: "Diseño Responsivo",
    description: "Interfaz adaptable a cualquier dispositivo: móvil, tablet y escritorio.",
  },
  {
    icon: <GroupIcon sx={{ fontSize: 48, color: "primary.main" }} />,
    title: "Equipo de Trabajo",
    description: "Conoce a los integrantes del equipo y sus roles en el proyecto.",
  },
  {
    icon: <StorageIcon sx={{ fontSize: 48, color: "primary.main" }} />,
    title: "Sistema CRUD",
    description: "Gestión completa de datos con operaciones Crear, Leer, Actualizar y Eliminar.",
  },
]

export default function HomePage() {
  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100%" }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
          color: "white",
          py: { xs: 8, md: 12 },
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: 700,
                mb: 2,
                fontSize: { xs: "2rem", md: "3.5rem" },
              }}
            >
              Proyecto Web Responsivo
            </Typography>
            <Typography
              variant="h5"
              sx={{
                mb: 4,
                opacity: 0.9,
                maxWidth: 600,
                mx: "auto",
                fontSize: { xs: "1rem", md: "1.5rem" },
              }}
            >
              Desarrollado con React y Material UI aplicando buenas prácticas de
              desarrollo frontend
            </Typography>
            <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
              <Button
                component={Link}
                href="/equipo"
                variant="contained"
                size="large"
                sx={{
                  bgcolor: "white",
                  color: "primary.main",
                  "&:hover": { bgcolor: "grey.100" },
                }}
                startIcon={<GroupIcon />}
              >
                Ver Equipo
              </Button>
              <Button
                component={Link}
                href="/crud"
                variant="outlined"
                size="large"
                sx={{
                  borderColor: "white",
                  color: "white",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.1)", borderColor: "white" },
                }}
                startIcon={<StorageIcon />}
              >
                Sistema CRUD
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Typography
          variant="h4"
          component="h2"
          sx={{ textAlign: "center", fontWeight: 600, mb: 6 }}
        >
          Características del Proyecto
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  textAlign: "center",
                  p: 2,
                  border: "1px solid",
                  borderColor: "divider",
                  transition: "all 0.2s",
                  "&:hover": {
                    boxShadow: 4,
                    transform: "translateY(-4px)",
                  },
                }}
              >
                <CardContent>
                  <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                  <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 1 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          py: 4,
          borderTop: 1,
          borderColor: "divider",
          textAlign: "center",
        }}
      >
        <Container>
          <Typography variant="body2" color="text.secondary">
            Proyecto desarrollado para evaluación de desarrollo frontend
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            React + Material UI + Next.js
          </Typography>
        </Container>
      </Box>
    </Box>
  )
}
