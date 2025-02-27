export function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="w-full px-4 py-12 justify-around flex flex-col mx-12">
        <div className="flex justify-between">
          <div>
            <h3 className="text-white font-semibold mb-4">Documentation</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-slate-400 hover:text-white transition">
                  Getting Started
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white transition">
                  Game Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white transition">
                  API Reference
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Community</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-slate-400 hover:text-white transition">
                  Discord
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white transition">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white transition">
                  Blog
                </a>
              </li>
            </ul>
          </div>
          
          <div className="">
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-slate-400 hover:text-white transition">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white transition">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-slate-800 text-center text-slate-400">
          <p>&copy; {new Date().getFullYear()} Heavy Helms. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
} 