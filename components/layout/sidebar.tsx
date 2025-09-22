"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Home, Cloud, MapPin, TrendingUp, Camera, MessageCircle, Leaf } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Weather", href: "/weather", icon: Cloud },
  { name: "Location", href: "/location", icon: MapPin },
  { name: "Market Analysis", href: "/market", icon: TrendingUp },
  { name: "Crop Tracker", href: "/crop-tracker", icon: Camera },
  { name: "AI Assistant", href: "/chat", icon: MessageCircle },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-64 flex-col bg-card border-r">
      <div className="flex h-16 items-center px-6 border-b">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-primary rounded-lg">
            <Leaf className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold">AgriAdvisor</span>
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link key={item.name} href={item.href}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn("w-full justify-start", isActive && "bg-secondary text-secondary-foreground")}
              >
                <item.icon className="mr-3 h-4 w-4" />
                {item.name}
              </Button>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
