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

/**
 * Navigation items configuration
 * Each item defines a name, URL path, and icon component
 */
const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Products", href: "/products", icon: ShoppingBag },
  { name: "Cart", href: "/cart", icon: ShoppingCart },
  { name: "Profile", href: "/profile", icon: User },
]

/**
 * Navigation component
 * Provides responsive navigation with mobile and desktop layouts
 * Includes theme toggle and cart count indicator
 * 
 * @returns A responsive navigation bar component
 */
export default function Navigation() {
  // Get current pathname for highlighting active navigation item
  const pathname = usePathname()
  // Check if the current viewport is mobile
  const isMobile = useMobile()
  // State to track if the mobile menu is open
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  // Get cart count from cart context
  const { getCartCount } = useCart()
  const cartCount = getCartCount()

  /**
   * Toggle the mobile menu open/closed state
   */
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="bg-white dark:bg-gray-950 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Site logo/brand name */}
          <Link href="/" className="text-2xl font-bold dark:text-white">
            ShopSmart
          </Link>

          {/* Conditional rendering based on viewport size */}
          {isMobile ? (
            <>
              {/* Mobile navigation controls */}
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={toggleMenu} 
                  className="md:hidden"
                  aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                  aria-expanded={isMenuOpen}
                >
                  {isMenuOpen ? <X /> : <Menu />}
                </Button>
              </div>

              {/* Mobile navigation overlay - shown when menu is open */}
              {isMenuOpen && (
                <div className="fixed inset-0 z-50 bg-white dark:bg-gray-950 pt-16">
                  <div className="flex flex-col items-center gap-6 p-4">
                    {/* Map over navigation items */}
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
                          aria-current={pathname === item.href ? "page" : undefined}
                        >
                          <div className="relative">
                            <Icon className="h-5 w-5" aria-hidden="true" />
                            {/* Show badge with cart count if item is cart and count > 0 */}
                            {isCart && cartCount > 0 && (
                              <Badge 
                                className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center"
                                aria-label={`${cartCount} items in cart`}
                              >
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
            /* Desktop navigation links */
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
                    aria-current={pathname === item.href ? "page" : undefined}
                  >
                    <div className="relative">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                      {/* Show badge with cart count if item is cart and count > 0 */}
                      {isCart && cartCount > 0 && (
                        <Badge 
                          className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center"
                          aria-label={`${cartCount} items in cart`}
                        >
                          {cartCount}
                        </Badge>
                      )}
                    </div>
                    <span>{item.name}</span>
                  </Link>
                )
              })}
              {/* Theme toggle button */}
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
