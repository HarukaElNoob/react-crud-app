"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import Drawer from "@mui/material/Drawer"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import Box from "@mui/material/Box"
import useMediaQuery from "@mui/material/useMediaQuery"
import { useTheme } from "@mui/material/styles"
import MenuIcon from "@mui/icons-material/Menu"
import HomeIcon from "@mui/icons-material/Home"
import GroupIcon from "@mui/icons-material/Group"
import StorageIcon from "@mui/icons-material/Storage"
import LoginIcon from "@mui/icons-material/Login"
import LogoutIcon from "@mui/icons-material/Logout"
import Divider from "@mui/material/Divider"

const navItems = [
  { label: "Inicio", href: "/", icon: <HomeIcon /> },
  { label: "Equipo", href: "/equipo", icon: <GroupIcon /> },
  { label: "CRUD", href: "/crud", icon: <StorageIcon /> },
]

export function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [user, setUser] = useState<{ email: string } | null>(null)
  const pathname = usePathname()
  const router = useRouter()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  const loadSession = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/session")
      const data = await res.json()
      setUser(data.user)
    } catch {
      setUser(null)
    }
  }, [])

  useEffect(() => {
    loadSession()
  }, [loadSession, pathname])

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    setUser(null)
    router.push("/login")
    router.refresh()
  }

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open)
  }

  return (
    <>
      <AppBar position="sticky" elevation={1} sx={{ bgcolor: "white", color: "text.primary" }}>
        <Toolbar>
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography
            variant="h6"
            component={Link}
            href="/"
            sx={{
              flexGrow: 1,
              textDecoration: "none",
              color: "primary.main",
              fontWeight: 700,
            }}
          >
            Proyecto Web
          </Typography>
          {!isMobile && (
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              {navItems.map((item) => (
                <Button
                  key={item.href}
                  component={Link}
                  href={item.href}
                  startIcon={item.icon}
                  variant={pathname === item.href ? "contained" : "text"}
                  color="primary"
                >
                  {item.label}
                </Button>
              ))}
              {user ? (
                <>
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                    {user.email}
                  </Typography>
                  <Button startIcon={<LogoutIcon />} color="primary" onClick={handleLogout}>
                    Salir
                  </Button>
                </>
              ) : (
                <Button
                  component={Link}
                  href="/login"
                  startIcon={<LoginIcon />}
                  variant={pathname === "/login" ? "contained" : "outlined"}
                  color="primary"
                >
                  Iniciar sesión
                </Button>
              )}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <Box sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}>
            <Typography variant="h6" color="primary" fontWeight={700}>
              Proyecto Web
            </Typography>
          </Box>
          <List>
            {navItems.map((item) => (
              <ListItem key={item.href} disablePadding>
                <ListItemButton
                  component={Link}
                  href={item.href}
                  selected={pathname === item.href}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
            <Divider sx={{ my: 1 }} />
            {user ? (
              <>
                <ListItem disablePadding>
                  <ListItemText
                    primary={user.email}
                    primaryTypographyProps={{ variant: "body2", color: "text.secondary" }}
                    sx={{ px: 2, py: 1 }}
                  />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton onClick={handleLogout}>
                    <ListItemIcon>
                      <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary="Cerrar sesión" />
                  </ListItemButton>
                </ListItem>
              </>
            ) : (
              <ListItem disablePadding>
                <ListItemButton component={Link} href="/login" selected={pathname === "/login"}>
                  <ListItemIcon>
                    <LoginIcon />
                  </ListItemIcon>
                  <ListItemText primary="Iniciar sesión" />
                </ListItemButton>
              </ListItem>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  )
}
