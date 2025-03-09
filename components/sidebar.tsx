"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Settings, Coins, History, LayoutDashboard, UserCircle2, Wallet, ArrowLeftRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface SidebarNavProps extends React.HTMLAttributes<HTMLDivElement> {}

interface NavItem {
  title: string
  href: string
  icon: React.ElementType
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Validators",
    href: "/validators",
    icon: UserCircle2,
  },
  {
    title: "Stake",
    href: "/stake",
    icon: Wallet,
  },
  {
    title: "Unstake",
    href: "/unstake",
    icon: ArrowLeftRight,
  },
  {
    title: "History",
    href: "/history",
    icon: History,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Token Generator",
    href: "/token-generator",
    icon: Coins,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
]

export function Sidebar({ className, ...props }: SidebarNavProps) {
  const pathname = usePathname()

  return (
    <div className={cn("pb-12 w-full", className)} {...props}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Fene Staking</h2>
          <div className="space-y-1">
            {navItems.map((item) => (
              <Button
                key={item.href}
                variant={pathname === item.href ? "secondary" : "ghost"}
                size="sm"
                className={cn(
                  "w-full justify-start",
                  pathname === item.href ? "bg-primary/10 hover:bg-primary/20" : "hover:bg-primary/5",
                )}
                asChild
              >
                <Link href={item.href} className="flex items-center gap-3">
                  <item.icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{item.title}</span>
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

