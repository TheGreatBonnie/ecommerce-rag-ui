import type React from "react";
import { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/navigation";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from "@/context/cart-context";
import { CopilotKit } from "@copilotkit/react-core";
import "@copilotkit/react-ui/styles.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ShopSmart - Modern E-commerce",
  description: "A modern e-commerce platform with AI assistance",
  generator: "v0.dev",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* CopilotKit wrapper provides AI capabilities throughout the app */}
        <CopilotKit
          publicApiKey={process.env.NEXT_PUBLIC_CPK_PUBLIC_API_KEY}
          agent="ecommerce_agent">
          {/* ThemeProvider manages light/dark mode for the application */}
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange>
            {/* CartProvider manages the shopping cart state globally */}
            <CartProvider>
              {/* Main navigation bar component */}
              <Navigation />
              {/* Main content area with minimum height calculation to ensure footer positioning */}
              <div className="min-h-[calc(100vh-73px)]">{children}</div>

              {/* Toast notifications component for displaying messages */}
              <Toaster />
            </CartProvider>
          </ThemeProvider>
        </CopilotKit>
      </body>
    </html>
  );
}
