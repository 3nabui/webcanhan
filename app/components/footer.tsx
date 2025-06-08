export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-black py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} All rights reserved.</p>
          <div className="flex gap-6">
            <a href="https://www.instagram.com/3na.bui/" className="text-gray-400 hover:text-white">
              Instagram
            </a>
            <a href="https://www.facebook.com/3nanax/" className="text-gray-400 hover:text-white">
              Facebook
            </a>
            <a href="https://zalo.me/0827577752" className="text-gray-400 hover:text-white">
              Zalo
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
