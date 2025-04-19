"use client";

/**
 * ProductGrid component
 * Displays a responsive grid of product cards
 * Uses the cart context to add products to the cart
 */

import type { Product } from "@/lib/types";
import ProductCard from "./product-card";
import { useCart } from "@/context/cart-context";

/**
 * Props for the ProductGrid component
 * @property {Product[]} products - Array of products to display in the grid
 */
interface ProductGridProps {
  products: Product[];
}

/**
 * Renders a responsive grid of product cards
 * Handles adding products to the cart when a card's Add to Cart button is clicked
 *
 * @param {ProductGridProps} props - Component props
 * @returns A responsive grid of product cards
 */
export default function ProductGrid({ products }: ProductGridProps) {
  // Get addToCart function from the cart context
  const { addToCart } = useCart();

  /**
   * Handler for adding a product to the cart
   * Called when the Add to Cart button is clicked on a product card
   *
   * @param {Product} product - The product to add to the cart
   */
  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {/* Map over product array to generate product cards */}
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={() => handleAddToCart(product)}
        />
      ))}
    </div>
  );
}
