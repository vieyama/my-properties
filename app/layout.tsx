import { Inter } from "next/font/google"
import { SearchProvider } from "@/contexts/search-context"
import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "My Property",
  description: "A Next.js 14 application with Supabase Magic Link authentication"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <SearchProvider>
            <main className="min-h-screen bg-background">{children}</main>
          </SearchProvider>
      </body>
    </html>
  )
}
