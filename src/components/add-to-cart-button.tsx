"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import type { Product } from "@/lib/types";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";

/**
 * Props for the AddToCartButton component
 * @property {Product} product - The product to be added to cart
 * @property {string} className - Optional CSS class names to apply to the button
 */
interface AddToCartButtonProps {
  product: Product;
  className?: string;
}

/**
 * AddToCartButton component
 * Provides a quantity selector and button to add products to the cart
 *
 * @param {AddToCartButtonProps} props - Component props
 * @returns A quantity selector and add to cart button component
 */
export default function AddToCartButton({
  product,
  className = "",
}: AddToCartButtonProps) {
  // Get addToCart function from cart context
  const { addToCart } = useCart();
  // State to track the selected quantity
  const [quantity, setQuantity] = useState(1);

  /**
   * Handler for adding the product to cart
   * Adds the product with the selected quantity and resets quantity to 1
   */
  const handleAddToCart = () => {
    addToCart(product, quantity);
    setQuantity(1);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      {/* Quantity selector with increment/decrement buttons */}
      <div className="flex border rounded-xl overflow-hidden">
        <button
          className="px-4 py-2 bg-gray-50 hover:bg-gray-100 transition-colors"
          onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
          aria-label="Decrease quantity">
          -
        </button>
        <div
          className="px-6 py-2 flex items-center justify-center min-w-[60px]"
          aria-label="Current quantity">
          {quantity}
        </div>
        <button
          className="px-4 py-2 bg-gray-50 hover:bg-gray-100 transition-colors"
          onClick={() => setQuantity((prev) => prev + 1)}
          aria-label="Increase quantity">
          +
        </button>
      </div>

      {/* Add to cart button - disabled when product is out of stock */}
      <Button
        className={`rounded-xl ${className}`}
        onClick={handleAddToCart}
        disabled={!product.inStock}
        aria-label={product.inStock ? "Add to Cart" : "Out of Stock"}>
        <ShoppingCart className="mr-2 h-4 w-4" />
        {product.inStock ? "Add to Cart" : "Out of Stock"}
      </Button>
    </div>
  );
}
