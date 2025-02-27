'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { usePrivy } from '@privy-io/react-auth'
import dynamic from 'next/dynamic'

// Import the ProtectedGame component
const ProtectedGame = dynamic(() => import('@/components/game/protected-game'), { ssr: false })

export default function Game() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { ready, authenticated } = usePrivy()
  const [loading, setLoading] = useState(true)
  
  // Get player IDs from query parameters
  const player1Id = searchParams.get('player1Id')
  const player2Id = searchParams.get('player2Id')

  useEffect(() => {
    if (ready) {
      setLoading(false)
      
      // If not authenticated, redirect to home page
      if (!authenticated) {
        router.push('/')
      }
    }
  }, [ready, authenticated, router])

  // Show loading state
  if (loading || !ready) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-amber-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-800 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-amber-800 text-lg">Loading...</p>
        </div>
      </div>
    )
  }

  // If authenticated, show the game
  return (
    <main className="min-h-screen bg-black">
      <ProtectedGame player1Id={player1Id} player2Id={player2Id} />
    </main>
  )
} 