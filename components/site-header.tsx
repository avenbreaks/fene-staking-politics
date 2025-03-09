import Link from "next/link"
import { Package2 } from "lucide-react"

import { ModeToggle } from "@/components/mode-toggle"
import { NetworkSwitcher } from "@/components/network-switcher"
import { MobileSidebar } from "@/components/mobile-sidebar"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <MobileSidebar />
        <Link href="/" className="flex items-center gap-2 font-semibold mr-auto">
          <Package2 className="h-5 w-5" />
          <span className="hidden sm:inline-block">Fene Staking Dashboard</span>
        </Link>
        <div className="flex items-center gap-2">
          <NetworkSwitcher />
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}

