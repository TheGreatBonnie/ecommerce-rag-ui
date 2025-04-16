"use client"

import type { Product } from "@/lib/types"
import ProductCard from "./product-card"
import { useCart } from "@/context/cart-context"

interface ProductGridProps {
  products: Product[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  const { addToCart } = useCart()

  const handleAddToCart = (product: Product) => {
    addToCart(product)
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onAddToCart={() => handleAddToCart(product)} />
      ))}
    </div>
  )
}
