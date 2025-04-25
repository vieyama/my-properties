import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SearchProvider } from "@/contexts/search-context"
import Header from "@/components/header"
import MapWrapper from "@/components/map-wrapper"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Next.js 14 with Supabase Auth",
  description: "A Next.js 14 application with Supabase Magic Link authentication",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SearchProvider>
            <main className="min-h-screen bg-background">{children}</main>
          </SearchProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
