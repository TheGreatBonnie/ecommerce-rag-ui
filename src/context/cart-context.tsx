"use client"

import type React from "react"

import type { Product } from "@/lib/types"
import { createContext, useContext, useEffect, useState } from "react"
import { useToast } from "@/hooks/use-toast"

interface CartItem extends Product {
  quantity: number
}

interface CartContextType {
  cart: CartItem[]
  addToCart: (product: Product, quantity?: number) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getCartTotal: () => number
  getCartCount: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const { toast } = useToast()

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error)
      }
    }
  }, [])

  // Save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id)

      if (existingItem) {
        // Update quantity if item already exists
        const updatedCart = prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item,
        )

        toast({
          title: "Cart updated",
          description: `${product.name} quantity increased to ${existingItem.quantity + quantity}`,
          duration: 3000,
        })

        return updatedCart
      } else {
        // Add new item
        toast({
          title: "Added to cart",
          description: `${product.name} has been added to your cart`,
          duration: 3000,
        })

        return [...prevCart, { ...product, quantity }]
      }
    })
  }

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => {
      const itemToRemove = prevCart.find((item) => item.id === productId)

      if (itemToRemove) {
        toast({
          title: "Removed from cart",
          description: `${itemToRemove.name} has been removed from your cart`,
          duration: 3000,
        })
      }

      return prevCart.filter((item) => item.id !== productId)
    })
  }

  const updateQuantity = (productId: string, quantity: number) => {
    setCart((prevCart) => prevCart.map((item) => (item.id === productId ? { ...item, quantity } : item)))
  }

  const clearCart = () => {
    setCart([])
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart",
      duration: 3000,
    })
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0)
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
