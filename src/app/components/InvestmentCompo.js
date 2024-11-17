'use client'

import { useState, useEffect } from 'react'
import { Bell, ChevronDown, Download, Home, Search, Share2, User } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card"
import { ScrollArea } from "@/app/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"

export default function TitanInvestmentApp() {
  const [activeTab, setActiveTab] = useState("all")
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const products = [
    { id: 1, name: "Tata Alto K10", price: 800, cycle: "2 days", dailyProfit: 1122.24, image: "/placeholder.svg" },
    { id: 2, name: "Tata Kia Seltos", price: 350, cycle: "9 days", dailyProfit: 233.28, image: "/placeholder.svg" },
    { id: 3, name: "Tata Altroz", price: 1800, cycle: "15 days", dailyProfit: 720.00, image: "/placeholder.svg" },
    { id: 4, name: "Tata Venue", price: 3500, cycle: "60 days", dailyProfit: 1262.40, image: "/placeholder.svg" },
    { id: 5, name: "Tata Jeep Compass", price: 5800, cycle: "12 days", dailyProfit: 6240.00, image: "/placeholder.svg" },
    { id: 6, name: "Tata Creta N Line", price: 9000, cycle: "60 days", dailyProfit: 4039.20, image: "/placeholder.svg" },
    { id: 7, name: "Tata XL6", price: 17000, cycle: "60 days", dailyProfit: 7336.80, image: "/placeholder.svg" },
    { id: 8, name: "Tata MG Windsor EV", price: 50000, cycle: "60 days", dailyProfit: 26544.00, image: "/placeholder.svg" },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-700 via-pink-500 to-red-500 text-white">
      <header className="sticky top-0 z-10 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg shadow-lg p-4 transition-all duration-300" style={{ backgroundColor: `rgba(255, 255, 255, ${Math.min(0.1 + scrollY / 1000, 0.5)})` }}>
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Avatar className="border-2 border-white">
              <AvatarImage src="/placeholder.svg" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-pink-500">Titan Investments</h1>
              <p className="text-sm text-gray-200">Welcome back, User</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button size="icon" variant="ghost" className="text-white hover:bg-white hover:bg-opacity-20">
              <Bell className="h-5 w-5" />
            </Button>
            <Button size="icon" variant="ghost" className="text-white hover:bg-white hover:bg-opacity-20">
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-hidden">
        <div className="container mx-auto p-4 h-full flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-white">Investment Products</h2>
            <Button variant="outline" className="bg-white bg-opacity-20 text-white border-white border-opacity-50 hover:bg-opacity-30 transition-all duration-300">
              Filter
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <TabsList className="bg-white bg-opacity-20 rounded-full p-1">
              <TabsTrigger value="all" className="rounded-full text-white data-[state=active]:bg-white data-[state=active]:text-purple-700">All Products</TabsTrigger>
              <TabsTrigger value="popular" className="rounded-full text-white data-[state=active]:bg-white data-[state=active]:text-purple-700">Popular</TabsTrigger>
              <TabsTrigger value="new" className="rounded-full text-white data-[state=active]:bg-white data-[state=active]:text-purple-700">New</TabsTrigger>
            </TabsList>
            <TabsContent value={activeTab} className="flex-1 mt-6">
              <ScrollArea className="h-[calc(100vh-250px)]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <Card key={product.id} className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg border-white border-opacity-20 text-white overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                      <CardHeader>
                        <CardTitle className="text-xl font-semibold">{product.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="relative overflow-hidden rounded-md mb-4">
                          <img src={product.image} alt={product.name} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Price: ₹{product.price}</span>
                          <span>Cycle: {product.cycle}</span>
                        </div>
                        <div className="mt-2 text-sm">
                          <span>Daily Profit: ₹{product.dailyProfit.toFixed(2)}</span>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full bg-white text-purple-700 hover:bg-opacity-90 transition-all duration-300">Invest Now</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <footer className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg shadow-lg p-4">
        <nav className="container mx-auto flex justify-around">
          <Button variant="ghost" size="icon" className="text-white hover:bg-white hover:bg-opacity-20 transition-all duration-300">
            <Home className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white hover:bg-opacity-20 transition-all duration-300">
            <Share2 className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white hover:bg-opacity-20 transition-all duration-300">
            <Download className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white hover:bg-opacity-20 transition-all duration-300">
            <User className="h-5 w-5" />
          </Button>
        </nav>
      </footer>
    </div>
  )
}
















'use client'

import { useState, useEffect } from 'react'
import { Bell, ChevronDown, Download, Home, Search, Share2, User } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card"
import { ScrollArea } from "@/app/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"

export default function TitanInvestmentApp() {
  const [activeTab, setActiveTab] = useState("all")
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const products = [
    { id: 1, name: "Tata Alto K10", price: 800, cycle: "2 days", dailyProfit: 1122.24, image: "/placeholder.svg" },
    { id: 2, name: "Tata Kia Seltos", price: 350, cycle: "9 days", dailyProfit: 233.28, image: "/placeholder.svg" },
    { id: 3, name: "Tata Altroz", price: 1800, cycle: "15 days", dailyProfit: 720.00, image: "/placeholder.svg" },
    { id: 4, name: "Tata Venue", price: 3500, cycle: "60 days", dailyProfit: 1262.40, image: "/placeholder.svg" },
    { id: 5, name: "Tata Jeep Compass", price: 5800, cycle: "12 days", dailyProfit: 6240.00, image: "/placeholder.svg" },
    { id: 6, name: "Tata Creta N Line", price: 9000, cycle: "60 days", dailyProfit: 4039.20, image: "/placeholder.svg" },
    { id: 7, name: "Tata XL6", price: 17000, cycle: "60 days", dailyProfit: 7336.80, image: "/placeholder.svg" },
    { id: 8, name: "Tata MG Windsor EV", price: 50000, cycle: "60 days", dailyProfit: 26544.00, image: "/placeholder.svg" },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-700 via-pink-500 to-red-500 text-white">
      <header className="sticky top-0 z-10 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg shadow-lg p-4 transition-all duration-300" style={{ backgroundColor: `rgba(255, 255, 255, ${Math.min(0.1 + scrollY / 1000, 0.5)})` }}>
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Avatar className="border-2 border-white">
              <AvatarImage src="/placeholder.svg" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-pink-500">Titan Investments</h1>
              <p className="text-sm text-gray-200">Welcome back, User</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button size="icon" variant="ghost" className="text-white hover:bg-white hover:bg-opacity-20">
              <Bell className="h-5 w-5" />
            </Button>
            <Button size="icon" variant="ghost" className="text-white hover:bg-white hover:bg-opacity-20">
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-hidden">
        <div className="container mx-auto p-4 h-full flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-white">Investment Products</h2>
            <Button variant="outline" className="bg-white bg-opacity-20 text-white border-white border-opacity-50 hover:bg-opacity-30 transition-all duration-300">
              Filter
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <TabsList className="bg-white bg-opacity-20 rounded-full p-1">
              <TabsTrigger value="all" className="rounded-full text-white data-[state=active]:bg-white data-[state=active]:text-purple-700">All Products</TabsTrigger>
              <TabsTrigger value="popular" className="rounded-full text-white data-[state=active]:bg-white data-[state=active]:text-purple-700">Popular</TabsTrigger>
              <TabsTrigger value="new" className="rounded-full text-white data-[state=active]:bg-white data-[state=active]:text-purple-700">New</TabsTrigger>
            </TabsList>
            <TabsContent value={activeTab} className="flex-1 mt-6">
              <ScrollArea className="h-[calc(100vh-250px)]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <Card key={product.id} className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg border-white border-opacity-20 text-white overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                      <CardHeader>
                        <CardTitle className="text-xl font-semibold">{product.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="relative overflow-hidden rounded-md mb-4 group">
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={500} // Adjust width based on expected size
                            height={192} // Adjust height based on expected size
                            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
                        </div>

                        <div className="flex justify-between text-sm">
                          <span>Price: ₹{product.price}</span>
                          <span>Cycle: {product.cycle}</span>
                        </div>
                        <div className="mt-2 text-sm">
                          <span>Daily Profit: ₹{product.dailyProfit.toFixed(2)}</span>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full bg-white text-purple-700 hover:bg-opacity-90 transition-all duration-300">Invest Now</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <footer className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg shadow-lg p-4">
        <nav className="container mx-auto flex justify-around">
          <Button variant="ghost" size="icon" className="text-white hover:bg-white hover:bg-opacity-20 transition-all duration-300">
            <Home className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white hover:bg-opacity-20 transition-all duration-300">
            <Share2 className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white hover:bg-opacity-20 transition-all duration-300">
            <Download className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white hover:bg-opacity-20 transition-all duration-300">
            <User className="h-5 w-5" />
          </Button>
        </nav>
      </footer>
    </div>
  )
}













