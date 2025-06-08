"use client"

import { motion } from "framer-motion"
import { Facebook, Instagram, MessageCircle } from "lucide-react"

export default function Header() {
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-zinc-800"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo/Name */}
          <div className="text-xl font-bold tracking-tighter">JANE DOE</div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#gallery" className="text-gray-400 hover:text-white transition-colors">
              Gallery
            </a>
            <a href="#portfolio" className="text-gray-400 hover:text-white transition-colors">
              Portfolio
            </a>
            <a href="#contact" className="text-gray-400 hover:text-white transition-colors">
              Contact
            </a>
          </nav>

          {/* Social Media Icons */}
          <div className="flex items-center space-x-4">
            <a
              href="https://www.facebook.com/3nanax/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-zinc-800 rounded-full"
              aria-label="Facebook"
            >
              <Facebook size={20} />
            </a>
            <a
              href="https://www.instagram.com/3na.bui/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-zinc-800 rounded-full"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://zalo.me/0827577752"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-zinc-800 rounded-full"
              aria-label="Zalo"
            >
              <MessageCircle size={20} />
            </a>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
