"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
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

const navItems = [
  { label: "Inicio", href: "/", icon: <HomeIcon /> },
  { label: "Equipo", href: "/equipo", icon: <GroupIcon /> },
  { label: "CRUD", href: "/crud", icon: <StorageIcon /> },
]

export function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const pathname = usePathname()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

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
            <Box sx={{ display: "flex", gap: 1 }}>
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
          </List>
        </Box>
      </Drawer>
    </>
  )
}
