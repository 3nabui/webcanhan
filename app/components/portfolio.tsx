"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = ["all", "Tiktok", "Event", "Personal"]

  const works = [
    {
      id: 1,
      title: "Digital Dreamscape",
      category: "Tiktok",
      image: "/1.jpg",
      year: "2024",
    },
    {
      id: 2,
      title: "Abstract Harmony",
      category: "Event",
      image: "/7.jpg",
      year: "2023",
    },
    {
      id: 3,
      title: "Metal Flow",
      category: "Tiktok",
      image: "/3.jpg",
      year: "2024",
    },
    {
      id: 4,
      title: "Neon Nights",
      category: "Personal",
      image: "/4.jpg",
      year: "2023",
    },
    {
      id: 5,
      title: "Nature's Whisper",
      category: "Tiktok",
      image: "/5.jpg",
      year: "2024",
    },
    {
      id: 6,
      title: "Bronze Echo",
      category: "Event",
      image: "/6.jpg",
      year: "2023",
    },
  ]

  const filteredWorks = works.filter((work) => (selectedCategory === "all" ? true : work.category === selectedCategory))

  return (
    <section id="portfolio" className="bg-black py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-md text-sm capitalize font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? "bg-white text-black shadow-lg"
                  : "bg-transparent border-2 border-white text-white hover:bg-white hover:text-black"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <motion.div layout className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {filteredWorks.map((work) => (
              <motion.div
                key={work.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="overflow-hidden bg-zinc-900">
                  <CardContent className="p-0">
                    <div className="group relative aspect-square overflow-hidden">
                      <img
                        src={work.image || "/placeholder.svg"}
                        alt={work.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <h3 className="text-xl font-semibold text-white">{work.title}</h3>
                        <p className="mt-2 text-sm text-gray-300">{work.year}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
