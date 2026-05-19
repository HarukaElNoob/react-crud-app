import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"

import { MuiProvider } from "@/components/mui-provider"
import { Navbar } from "@/components/navbar"
import Box from "@mui/material/Box"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Proyecto Web - React & Material UI",
  description: "Sitio web responsivo desarrollado con React y Material UI",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className="font-sans antialiased">
        <MuiProvider>
          <Navbar />
          <Box component="main" sx={{ minHeight: "calc(100vh - 64px)" }}>
            {children}
          </Box>
        </MuiProvider>

      </body>
    </html>
  )
}
