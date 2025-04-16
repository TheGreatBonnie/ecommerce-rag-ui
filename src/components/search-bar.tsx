"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export default function SearchBar() {
  const [query, setQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would trigger a search action
    console.log("Searching for:", query)
  }

  return (
    <form onSubmit={handleSearch} className="relative">
      <Input
        type="text"
        placeholder="I need a waterproof hiking backpack..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full pl-4 pr-12 py-3 rounded-2xl shadow-sm border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <Button type="submit" size="icon" className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-xl">
        <Search className="h-5 w-5" />
      </Button>
    </form>
  )
}
