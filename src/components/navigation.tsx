"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, ShoppingBag, ShoppingCart, User, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useMobile } from "@/hooks/use-mobile"
import { useCart } from "@/context/cart-context"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Products", href: "/products", icon: ShoppingBag },
  { name: "Cart", href: "/cart", icon: ShoppingCart },
  { name: "Profile", href: "/profile", icon: User },
]

export default function Navigation() {
  const pathname = usePathname()
  const isMobile = useMobile()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { getCartCount } = useCart()
  const cartCount = getCartCount()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="bg-white dark:bg-gray-950 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold dark:text-white">
            ShopSmart
          </Link>

          {isMobile ? (
            <>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <Button variant="ghost" size="icon" onClick={toggleMenu} className="md:hidden">
                  {isMenuOpen ? <X /> : <Menu />}
                </Button>
              </div>

              {isMenuOpen && (
                <div className="fixed inset-0 z-50 bg-white dark:bg-gray-950 pt-16">
                  <div className="flex flex-col items-center gap-6 p-4">
                    {navItems.map((item) => {
                      const Icon = item.icon
                      const isCart = item.name === "Cart"
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={cn(
                            "flex items-center gap-2 p-2 rounded-xl transition-colors",
                            pathname === item.href
                              ? "bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-medium"
                              : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
                          )}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <div className="relative">
                            <Icon className="h-5 w-5" />
                            {isCart && cartCount > 0 && (
                              <Badge className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center">
                                {cartCount}
                              </Badge>
                            )}
                          </div>
                          <span>{item.name}</span>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              {navItems.map((item) => {
                const Icon = item.icon
                const isCart = item.name === "Cart"
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-xl transition-colors",
                      pathname === item.href
                        ? "bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-medium"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
                    )}
                  >
                    <div className="relative">
                      <Icon className="h-5 w-5" />
                      {isCart && cartCount > 0 && (
                        <Badge className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center">
                          {cartCount}
                        </Badge>
                      )}
                    </div>
                    <span>{item.name}</span>
                  </Link>
                )
              })}
              <div className="ml-2">
                <ThemeToggle />
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
