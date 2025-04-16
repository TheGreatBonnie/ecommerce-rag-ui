"use client"

import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import type { Product } from "@/lib/types"
import { ShoppingCart } from "lucide-react"
import { useState } from "react"

interface AddToCartButtonProps {
  product: Product
  className?: string
}

export default function AddToCartButton({ product, className = "" }: AddToCartButtonProps) {
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = () => {
    addToCart(product, quantity)
    setQuantity(1)
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex border rounded-xl overflow-hidden">
        <button
          className="px-4 py-2 bg-gray-50 hover:bg-gray-100 transition-colors"
          onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
        >
          -
        </button>
        <div className="px-6 py-2 flex items-center justify-center min-w-[60px]">{quantity}</div>
        <button
          className="px-4 py-2 bg-gray-50 hover:bg-gray-100 transition-colors"
          onClick={() => setQuantity((prev) => prev + 1)}
        >
          +
        </button>
      </div>

      <Button className={`rounded-xl ${className}`} onClick={handleAddToCart} disabled={!product.inStock}>
        <ShoppingCart className="mr-2 h-4 w-4" />
        {product.inStock ? "Add to Cart" : "Out of Stock"}
      </Button>
    </div>
  )
}
