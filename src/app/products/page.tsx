/**
 * This file defines the Products page of the e-commerce application
 * It displays a filterable grid of all available products
 */

import ProductGrid from "@/components/product-grid";
import { products } from "@/lib/mock-data";
import { Suspense } from "react";
import ProductsFilter from "@/components/products-filter";
import type { Metadata } from "next";

/**
 * Static metadata for the Products page
 * Improves SEO by providing title and description for search engines
 */
export const metadata: Metadata = {
  title: "Products | ShopSmart",
  description: "Browse our collection of high-quality products",
};

/**
 * ProductsPage component
 * Layout includes a sidebar filter panel and main product grid
 *
 * @returns The products page with filters and product grid
 */
export default function ProductsPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">All Products</h1>

      {/* Two-column layout: filters sidebar and product grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filter sidebar - takes up 1/4 of page width on large screens */}
        <div className="lg:col-span-1">
          <ProductsFilter />
        </div>

        {/* Product grid - takes up 3/4 of page width on large screens */}
        <div className="lg:col-span-3">
          {/* Suspense boundary allows for streaming rendering and loading states */}
          <Suspense fallback={<div>Loading products...</div>}>
            <ProductGrid products={products} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
