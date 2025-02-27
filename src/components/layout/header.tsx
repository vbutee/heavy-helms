import { Button } from "@/components/ui/button"
import AuthButton from '@/components/auth-button'

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-sm border-b border-slate-800">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-white">Heavy Helms</h1>
          </div>
          
          <nav className="flex items-center gap-4">

            <AuthButton />
          </nav>
        </div>
      </div>
    </header>
  )
} 