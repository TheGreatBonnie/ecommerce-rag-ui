import ProductGrid from "@/components/product-grid"
import { products } from "@/lib/mock-data"
import { Suspense } from "react"
import ProductsFilter from "@/components/products-filter"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Products | ShopSmart",
  description: "Browse our collection of high-quality products",
}

export default function ProductsPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">All Products</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <ProductsFilter />
        </div>

        <div className="lg:col-span-3">
          <Suspense fallback={<div>Loading products...</div>}>
            <ProductGrid products={products} />
          </Suspense>
        </div>
      </div>
    </main>
  )
}
