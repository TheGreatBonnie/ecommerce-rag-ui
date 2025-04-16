import { products } from "@/lib/mock-data"
import { notFound } from "next/navigation"
import Image from "next/image"
import { Star } from "lucide-react"
import AddToCartButton from "@/components/add-to-cart-button"
import type { Metadata } from "next"

interface ProductPageProps {
  params: {
    id: string
  }
}

async function getProduct(id: string) {
  return products.find((p) => p.id === id)
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(params.id)

  if (!product) {
    return {
      title: "Product Not Found | ShopSmart",
    }
  }

  return {
    title: `${product.name} | ShopSmart`,
    description: product.description,
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.id)

  if (!product) {
    notFound()
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-md">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        <div className="flex flex-col">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                />
              ))}
            </div>
            <span className="ml-2 text-gray-600">{product.rating.toFixed(1)}</span>
          </div>

          <p className="text-2xl font-bold mb-4">${product.price.toFixed(2)}</p>

          <p className="text-gray-600 mb-6">{product.description}</p>

          <div className="flex items-center mb-6">
            <div
              className={`px-3 py-1 rounded-full text-sm font-medium ${product.inStock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
            >
              {product.inStock ? "In Stock" : "Out of Stock"}
            </div>
            <div className="ml-4 px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-sm font-medium">
              {product.category}
            </div>
          </div>

          <AddToCartButton product={product} className="w-full md:w-auto mb-4" />

          <div className="mt-8 border-t pt-6">
            <h2 className="text-xl font-semibold mb-4">Product Details</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Premium quality materials</li>
              <li>Designed for durability and comfort</li>
              <li>30-day money-back guarantee</li>
              <li>Free shipping on orders over $50</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}
