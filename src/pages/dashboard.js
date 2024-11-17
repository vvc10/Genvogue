'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, ChevronDown, Grid, Layout, Search, Settings, Shirt, ShoppingBag, User, Moon, Sun, Menu } from 'lucide-react'
import { Button } from "../app/components/ui/button"
import { Input } from "../app/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "../app/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../app/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../app/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../app/components/ui/card"
import { Progress } from "../app/components/ui/progress"
import { useRouter } from 'next/navigation'
import Loader from '../app/components/Loader'
import { Canvas } from '@react-three/fiber'
import { useLoader } from '@react-three/fiber'
import { OrbitControls, Environment, Html, PerspectiveCamera } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../app/components/ui/dialog"



export default function MerchDesignerDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedMerch, setSelectedMerch] = useState(null);

  const [loading, setLoading] = useState(true) // Added loading state
  const router = useRouter()

  const merchTypes = ['T-Shirts', 'Hoodies', 'Mugs', 'Caps', 'Tote Bags']
  const merchDesigns = [
    { id: 1, name: 'T-shirt', type: 'T-shirt', image: '/assets/merch_cover/tshirt.png', model: '/assets/3d/t_shirt.glb' },
    { id: 2, name: 'Hoodie', type: 'Hoodie', image: '/assets/merch_cover/hoodie.webp', model: '/assets/3d/hoodie.glb' },
    { id: 3, name: 'Mug', type: 'Mug', image: '/assets/merch_cover/cup_1.png', model: '/assets/3d/cup.glb' },
    { id: 4, name: 'Cap', type: 'Cap', image: '/assets/merch_cover/cap.png', model: '/assets/3d/cap.glb' },
  ];
  const DesignCard = ({ design, onClick }) => {

    return (
      <Card
        key={design.id}
        onClick={onClick}
        className="overflow-hidden cursor-pointer transition-transform bg-gray-200 dark:bg-gray-800 dark:border-gray-700 hover:scale-105 shadow-md hover:shadow-lg"
      >
        <CardHeader className="p-0 h-[250px] w-full bg-gray-200">

          <img
            src={design.image}
            alt={design.name}
            className="h-48 w-full object-cover filter drop-shadow-2xl"
          />
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle>{design.name}</CardTitle>
          <CardDescription className="text-gray-500 dark:text-gray-400">{design.type}</CardDescription>
        </CardContent>
      </Card>
    );
  };


  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode
      document.documentElement.classList.toggle('dark', newMode)
      return newMode
    })
  }

  useEffect(() => {
    // Simulate loading delay (replace with actual data fetching if needed)
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleNavigate = (designType) => {
    setLoading(true); // Show loader
    router.push({
      pathname: '/designboard',
      query: { merchType: designType }
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
        <div className="loader"><Loader />Loading...</div> {/* Custom Loader (you can style it or replace it with a component) */}
      </div>
    )
  }

  return (
    <div
      className={`flex h-screen transition-colors duration-300 ease-in-out ${darkMode ? 'bg-gradient-to-br from-gray-900 to-gray-800 bg-opacity-50 text-white' : 'bg-gray-100 text-gray-800'
        }`}>


      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 left-0 z-50 w-64 bg-gray-100 p-6 shadow-lg dark:bg-gray-900 dark:text-white lg:relative lg:translate-x-0"
          >
            <h2 className="mb-6 text-xl font-semibold">Merch Types</h2>
            <nav>
              {merchTypes.map((type) => (
                <Button
                  key={type}
                  variant="ghost"
                  className="mb-2 w-full justify-start text-gray-700 dark:text-gray-300 hover:text-green-400"
                >
                  <Shirt className="mr-3 h-5 w-5" />
                  {type}
                </Button>
              ))}
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>

      <main className="flex-1 overflow-y-auto transition-colors duration-300 ease-in-out bg-gray-100 dark:bg-gray-900 dark:text-white">
        {/* Header */}
        <header className="sticky top-0 z-10 flex items-center justify-between bg-white p-4 shadow-sm dark:bg-gray-800 dark:shadow-lg dark:border-b dark:border-gray-700">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="mr-2 lg:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu className="h-6 w-6 text-gray-600 dark:text-gray-400" />
            </Button>
            <h1 className="text-[17px] font-bold">GenVogue</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Input
              type="search"
              placeholder="Search designs..."
              className="hidden md:block bg-gray-200 dark:bg-gray-700 dark:text-white"
            />
            <Button variant="ghost" size="icon" className="text-gray-600 dark:text-gray-400">
              <Bell className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full border border-gray-300 dark:border-gray-600">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" alt="@johndoe" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white text-black dark:bg-gray-800">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
              {darkMode ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-gray-500" />}
            </Button>
          </div>
        </header>

        {/* Quick Access Links */}
        <nav className="sticky top-16 z-10 flex items-center justify-between bg-white p-4 shadow-sm dark:bg-gray-800 dark:shadow-lg dark:border-b dark:border-gray-700">
          <div className="flex space-x-1 gap-0">
            <Button variant="link" className="text-gray-600  dark:text-gray-300 hover:text-green-700">Merches</Button>
            <Button variant="link" className="text-gray-600 dark:text-gray-300 hover:text-green-700">Your Designs</Button>
            <Button variant="link" className="text-gray-600 dark:text-gray-300 hover:text-green-700">Store</Button>
          </div>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-green-700 text-white hover:bg-green-600 dark:bg-teal-500 dark:hover:bg-teal-600"
          >
            Start Designing
          </Button>
        </nav>

        {/* Design Showcase Area */}
        <section className="p-6">
          <h2 className="mb-4 text-xl font-semibold mx-auto">What you wanna design today?</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {merchDesigns.map((design) => (
              <DesignCard
                key={design.id}
                design={design}
                onClick={() => handleNavigate(design.type)}
              />
            ))}
          </div>
        </section>


        {/* Additional sections omitted for brevity */}
      </main>

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-md bg-white text-black">
          <DialogHeader>
            <DialogTitle>Choose a Merch Type</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 my-4">
            {merchDesigns.map((merch) => (
              <Button
                key={merch.type}
                onClick={() => setSelectedMerch(merch.type)}
                className={`flex items-center justify-center p-3 border rounded-lg 
                  ${selectedMerch === merch.type ? 'bg-green-200 dark:bg-green-800' : 'border-gray-300 dark:border-gray-700 hover:bg-green-100 dark:hover:bg-green-800'}`}
              >
                {merch.icon}
                {merch.type}
              </Button>
            ))}
          </div>
          <DialogFooter>
            {selectedMerch && (
              <DialogFooter className='items-center'>
                <Button
                  onClick={() => handleNavigate(selectedMerch)}
                  // onClick={() => console.log(`Starting design for ${selectedMerch}`)}
                  className="bg-green-700 text-white hover:bg-green-600"
                >
                  Start Design
                </Button>
              </DialogFooter>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
