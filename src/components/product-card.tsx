"use client"

import type { Product } from "@/lib/types"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Eye } from "lucide-react"

/**
 * Props for the ProductCard component
 * @property {Product} product - The product to display
 * @property {Function} onAddToCart - Callback function when add to cart button is clicked
 */
interface ProductCardProps {
  product: Product
  onAddToCart: () => void
}

/**
 * ProductCard component
 * Displays a product in a card layout with image, details, and action buttons
 * 
 * @param {ProductCardProps} props - Component props
 * @returns A card component displaying product information with add to cart and view details buttons
 */
export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg rounded-2xl">
      {/* Product image container with responsive sizing */}
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>
      
      {/* Product information section */}
      <CardContent className="p-4">
        {/* Product name with text truncation */}
        <h3 className="font-semibold text-lg mb-1 line-clamp-1">{product.name}</h3>
        {/* Product description with 2-line limit */}
        <p className="text-gray-500 text-sm mb-2 line-clamp-2">{product.description}</p>
        {/* Product price formatted with 2 decimal places */}
        <p className="font-bold text-lg">${product.price.toFixed(2)}</p>
      </CardContent>
      
      {/* Action buttons section */}
      <CardFooter className="p-4 pt-0 flex gap-2">
        {/* Add to cart button */}
        <Button 
          variant="default" 
          className="flex-1 rounded-xl" 
          onClick={onAddToCart}
          aria-label={`Add ${product.name} to cart`}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
        
        {/* View product details button */}
        <Button 
          variant="outline" 
          className="rounded-xl" 
          asChild
          aria-label={`View details for ${product.name}`}
        >
          <Link href={`/products/${product.id}`}>
            <Eye className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
