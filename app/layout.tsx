import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: "ReCriar - Arte Sustentável com Tampinhas",
  description:
    "Projeto ReCriar: Transformamos tampinhas de garrafa em belos mosaicos sustentáveis. Arte única, consciência ambiental.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="font-sans">
        {children}
        <Toaster />
      </body>
    </html>
  )
}
