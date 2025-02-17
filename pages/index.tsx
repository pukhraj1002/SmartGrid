"use client"
import "../app/globals.css";
import { useState } from "react"
import Head from "next/head"
import Image from "next/image"
import { Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { devices } from "@/lib/devices"
import ReactCardFlip from "react-card-flip"




export default function Home() {
  const [currentPage, setCurrentPage] = useState(0)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isFlipped, setIsFlipped] = useState(false)

  const nextPage = () => {
    setIsFlipped(true)
    setTimeout(() => {
      setCurrentPage((prev) => (prev + 1) % devices.length)
      setIsFlipped(false)
    }, 300)
  }

  const prevPage = () => {
    setIsFlipped(true)
    setTimeout(() => {
      setCurrentPage((prev) => (prev - 1 + devices.length) % devices.length)
      setIsFlipped(false)
    }, 300)
  }

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? "dark" : ""}`}>
      <Head>
        <title>Smart Grid</title>
        <meta name="description" content="Explore IoT devices in an interactive flip book" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-white dark:bg-gray-900 py-6 px-4 flex justify-between items-center">
        <h1 className="text-4xl font-bold text-purple-600 dark:text-purple-400">SMART GRID : An IOT Flipbook</h1>
        <div className="flex items-center space-x-4">
        <Button asChild variant="outline" size="sm" className="text-purple-600 dark:text-purple-400 border-purple-600 dark:border-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900">
          <a href="https://wokwi.com/" target="_blank" rel="noopener noreferrer">
             Wokwi
          </a>
        </Button>
        <Button asChild variant="outline" size="sm" className="text-purple-600 dark:text-purple-400 border-purple-600 dark:border-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900">
          <a href="https://tinkercad.com/" target="_blank" rel="noopener noreferrer">
             Tinkercad
          </a>
        </Button>
          <Button
            onClick={toggleTheme}
            variant="outline"
            className="text-purple-600 dark:text-purple-400 border-purple-600 dark:border-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900"
          >
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
<aside className="w-64 p-4 bg-gray-100 dark:bg-gray-800 overflow-y-auto scrollbar-hide" style={{ maxHeight: "85vh" }}>
  <h2 className="text-lg font-semibold mb-4 text-purple-600 dark:text-purple-400">Device List</h2>
  <ul className="space-y-2">
    {devices.map((device, index) => (
      <li key={index}>
        <button
          onClick={() => setCurrentPage(index)}
          className={`w-full text-left px-3 py-2 rounded-md transition-colors duration-200 ${
            currentPage === index
              ? "bg-purple-500 text-white"
              : "text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900"
          }`}
        >
          {device.name}
        </button>
      </li>
    ))}
  </ul>
</aside>



        {/* Main content */}
        <main className="flex-1 p-6 bg-white dark:bg-gray-900 transition-colors duration-300 overflow-y-auto">
          <div className="max-w-2xl mx-auto">
            <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
              <Card className="w-full p-6 bg-white dark:bg-gray-800 shadow-xl rounded-lg transition-all duration-300 hover:shadow-2xl">
                <a
                  href={`https://www.arduino.cc/reference/en/libraries/${devices[currentPage].name.toLowerCase()}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer"
                >
                  <div className="aspect-w-16 aspect-h-9 mb-4">
                  <Image
  src={devices[currentPage]?.image || "/placeholder.svg"} // Safely accessing image URL
  alt={devices[currentPage]?.name || "Device Name"} // Safely accessing the device name
  fill // Use 'fill' for responsive sizing
  //style={{ objectFit: "cover" }} // Applying object-fit through 'style'
  className="rounded-lg"
/>


                  </div>
                  <h2 className="text-2xl font-semibold mb-2 text-purple-600 dark:text-purple-400 hover:underline">
                    {devices[currentPage].name}
                  </h2>
                </a>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  <strong>Category:</strong> {devices[currentPage].category}
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  <strong>Purpose:</strong> {devices[currentPage].purpose}
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  <strong>Applications:</strong> {devices[currentPage].applications}
                </p>
              </Card>
              <Card className="w-full p-6 bg-white dark:bg-gray-800 shadow-xl rounded-lg transition-all duration-300 hover:shadow-2xl">
                {/* This is a placeholder card. It should be identical to the first card but with different data. */}
              </Card>
            </ReactCardFlip>

            <div className="flex justify-between mt-4">
              <Button
                onClick={prevPage}
                variant="outline"
                className="transition-colors duration-200 hover:bg-purple-100 dark:hover:bg-purple-900"
              >
                Previous
              </Button>
              <Button
                onClick={nextPage}
                variant="outline"
                className="transition-colors duration-200 hover:bg-purple-100 dark:hover:bg-purple-900"
              >
                Next
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

