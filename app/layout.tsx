import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Sidebar } from "@/components/sidebar"
import { Web3Provider } from "@/components/web3-provider"

import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Fene Forge 🔥",
  description: "Manage your Fene staking validators and delegations",

}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Web3Provider>
            <div className="relative flex min-h-screen flex-col">
              <SiteHeader />
              <div className="flex flex-1">
                <aside className="hidden md:block w-64 border-r shrink-0">
                  <Sidebar />
                </aside>
                <main className="flex-1">{children}</main>
              </div>
              <SiteFooter />
            </div>
          </Web3Provider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'