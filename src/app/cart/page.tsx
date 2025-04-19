"use client";

/**
 * Shopping Cart Page component
 *
 * Displays all items added to the cart, allows quantity adjustment,
 * item removal, and shows order summary with totals.
 * Also handles empty cart state with a call-to-action.
 */

import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import Image from "next/image";
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function CartPage() {
  // Get cart state and actions from context
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  // State to handle client-side rendering and avoid hydration mismatch
  const [mounted, setMounted] = useState(false);

  /**
   * Handle hydration mismatch between server and client
   * Cart data is stored in localStorage, only available client-side
   */
  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything until after client-side hydration
  if (!mounted) {
    return null;
  }

  // Calculate order totals
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 100 ? 0 : 10; // Free shipping for orders over $100
  const total = subtotal + shipping;

  /**
   * Empty cart view with call-to-action
   * Shown when no items are in the cart
   */
  if (cart.length === 0) {
    return (
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Button asChild>
            <Link href="/products">Browse Products</Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {/* Two-column layout: cart items and order summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart items section - takes 2/3 of the width on large screens */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {/* Table header - only visible on medium screens and up */}
            <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b">
              <div className="col-span-6">
                <span className="font-medium">Product</span>
              </div>
              <div className="col-span-2 text-center">
                <span className="font-medium">Price</span>
              </div>
              <div className="col-span-2 text-center">
                <span className="font-medium">Quantity</span>
              </div>
              <div className="col-span-2 text-right">
                <span className="font-medium">Subtotal</span>
              </div>
            </div>

            {/* Cart items list with responsive layout */}
            {cart.map((item) => (
              <div key={item.id} className="p-4 border-b last:border-b-0">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  {/* Product info with image, name and category */}
                  <div className="col-span-1 md:col-span-6">
                    <div className="flex items-center space-x-4">
                      <div className="relative h-20 w-20 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-500">{item.category}</p>
                        {/* Mobile-only remove button */}
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-sm text-red-500 flex items-center mt-1 md:hidden"
                          aria-label={`Remove ${item.name} from cart`}>
                          <Trash2 className="h-3 w-3 mr-1" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Unit price */}
                  <div className="col-span-1 md:col-span-2 text-left md:text-center">
                    <span className="md:hidden text-sm text-gray-500">
                      Price:{" "}
                    </span>
                    <span>${item.price.toFixed(2)}</span>
                  </div>

                  {/* Quantity adjustment controls */}
                  <div className="col-span-1 md:col-span-2 text-left md:text-center">
                    <div className="flex items-center md:justify-center">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            Math.max(1, item.quantity - 1)
                          )
                        }
                        aria-label={`Decrease quantity of ${item.name}`}>
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span
                        className="mx-3 w-8 text-center"
                        aria-label={`Quantity: ${item.quantity}`}>
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        aria-label={`Increase quantity of ${item.name}`}>
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  {/* Item subtotal and desktop remove button */}
                  <div className="col-span-1 md:col-span-2 flex justify-between md:justify-end items-center">
                    <span className="md:hidden text-sm text-gray-500">
                      Subtotal:{" "}
                    </span>
                    <span className="font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500 ml-4 hidden md:block"
                      aria-label={`Remove ${item.name} from cart`}>
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cart action buttons */}
          <div className="mt-4 flex justify-between">
            <Button variant="outline" asChild>
              <Link href="/products">Continue Shopping</Link>
            </Button>

            <Button
              variant="outline"
              onClick={() => clearCart()}
              aria-label="Clear all items from cart">
              Clear Cart
            </Button>
          </div>
        </div>

        {/* Order summary section - takes 1/3 of the width on large screens */}
        <div className="lg:col-span-1">
          <Card className="rounded-2xl shadow-sm">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

              {/* Order calculations */}
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>
                    {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>

                <Separator />

                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout button */}
              <Button
                className="w-full mt-6 rounded-xl"
                size="lg"
                aria-label="Proceed to checkout">
                Checkout
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <p className="text-xs text-gray-500 mt-4 text-center">
                Secure checkout powered by Stripe
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
