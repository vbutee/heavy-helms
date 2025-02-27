'use client'

import { usePrivy } from '@privy-io/react-auth'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'

// Import the App component without SSR
const AppWithoutSSR = dynamic(() => import('@/App'), { ssr: false })

interface ProtectedGameProps {
  player1Id?: string | null
  player2Id?: string | null
}

function ProtectedGame({ player1Id, player2Id }: ProtectedGameProps) {
  const { ready, authenticated, logout } = usePrivy()
  const router = useRouter()

  // Redirect to home if not authenticated
  useEffect(() => {
    if (ready && !authenticated) {
      router.push('/')
    }
  }, [ready, authenticated, router])

  // Show loading state while checking authentication
  if (!ready || !authenticated) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-800 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-amber-400 text-lg">Loading game...</p>
        </div>
      </div>
    )
  }

  // Handle logout
  const handleLogout = async () => {
    await logout()
    router.push('/')
  }

  // Show the game if authenticated
  return (
    <div className="relative w-full h-full">
      <button 
        className="absolute top-4 right-4 z-50 bg-amber-800 hover:bg-amber-700 text-white px-4 py-2 rounded-md transition-colors"
        onClick={handleLogout}
      >
        Logout
      </button>
      <AppWithoutSSR player1Id={player1Id || undefined} player2Id={player2Id || undefined} />
    </div>
  )
}

export default ProtectedGame 