"use client"

import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Avatar from "@mui/material/Avatar"
import Chip from "@mui/material/Chip"
import Divider from "@mui/material/Divider"
import EmailIcon from "@mui/icons-material/Email"
import BadgeIcon from "@mui/icons-material/Badge"
import SchoolIcon from "@mui/icons-material/School"
import { teamMembers } from "@/data/mock-data"

export default function EquipoPage() {
  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100%", py: { xs: 4, md: 6 } }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{ fontWeight: 700, mb: 2, color: "text.primary" }}
          >
            Equipo de Trabajo
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: 600, mx: "auto" }}
          >
            Conoce a los integrantes del equipo que hicieron posible este proyecto
          </Typography>
        </Box>

        {/* Team Members Grid */}
        <Grid container spacing={4}>
          {teamMembers.map((member) => (
            <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={member.id}>
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  border: "1px solid",
                  borderColor: "divider",
                  transition: "all 0.3s",
                  "&:hover": {
                    boxShadow: 6,
                    transform: "translateY(-8px)",
                  },
                }}
              >
                <CardContent sx={{ textAlign: "center", p: 3 }}>
                  {/* Avatar */}
                  <Avatar
                    src={member.foto}
                    alt={member.nombre}
                    sx={{
                      width: 120,
                      height: 120,
                      mx: "auto",
                      mb: 2,
                      border: "4px solid",
                      borderColor: "primary.main",
                    }}
                  />

                  {/* Name */}
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    {member.nombre}
                  </Typography>

                  {/* Role Chip */}
                  <Chip
                    label={member.rol}
                    color="primary"
                    size="small"
                    sx={{ mb: 2 }}
                  />

                  <Divider sx={{ my: 2 }} />

                  {/* Info */}
                  <Box sx={{ textAlign: "left" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
                      <BadgeIcon fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">
                        <strong>Matrícula:</strong> {member.matricula}
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
                      <SchoolIcon fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.4 }}>
                        {member.carrera}
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                      <EmailIcon fontSize="small" color="action" />
                      <Typography
                        variant="body2"
                        color="primary"
                        component="a"
                        href={`mailto:${member.correo}`}
                        sx={{
                          textDecoration: "none",
                          wordBreak: "break-all",
                          "&:hover": { textDecoration: "underline" },
                        }}
                      >
                        {member.correo}
                      </Typography>
                    </Box>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  {/* Biography */}
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontStyle: "italic", lineHeight: 1.6 }}
                  >
                    {member.biografia}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}
