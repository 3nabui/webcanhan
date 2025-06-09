"use client"

import { motion } from "framer-motion"
import { useRef } from "react"
import { useInView } from "framer-motion"

export default function Gallery() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const images = [
  {
    src: "/drhung.jpeg",
    alt: "Art 1",
    title: "Tiktok Dr Hưng S Beauty",
    link: "https://www.tiktok.com/@bacsihungsbeauty",
  },
  {
    src: "/bsnguyen.jpeg",
    alt: "Art 2",
    title: "Bác sĩ Nguyên da liễu",
    link: "https://www.tiktok.com/@bacsidalieuthaonguyen",
  },
  {
    src: "/bshoa2.jpg",
    alt: "Art 3",
    title: "Dr Minh Hòa S Beauty",
    link: "https://www.tiktok.com/@bsminhhoasbeauty",
  },
  {
    src: "/victor.jpeg",
    alt: "Art 4",
    title: "Victor Làm Marketing",
    link: "https://www.tiktok.com/@victorkhuongnguyen",
  },
]

  return (
    <section id="gallery" className="relative py-20">
      <div ref={ref} className="container mx-auto px-4">
        <motion.h2
          className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-4xl"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          Feature Works
        </motion.h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {images.map((image, index) => (
    <a
      key={index}
      href={image.link}
      target="_blank"
      rel="noopener noreferrer"
    >
      <motion.div
        className="group relative overflow-hidden rounded-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, delay: index * 0.2 }}
      >
        <div className="aspect-[2/3] overflow-hidden">
          <img
            src={image.src || "/placeholder.svg"}
            alt={image.alt}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <h3 className="text-sm font-semibold text-white">{image.title}</h3>
        </div>
      </motion.div>
    </a>
  ))}
</div>

      </div>
    </section>
  )
}
