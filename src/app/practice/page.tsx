"use client"

import { GameWrapper } from '@/components/game/game-wrapper'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useSearchParams } from 'next/navigation'

// Fallback component for when the game fails to load
function GameErrorFallback() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-stone-900/90 p-6 text-center">
      <h2 className="text-2xl font-bold text-yellow-400 mb-4">
        Could not load game
      </h2>
      <p className="text-stone-200 mb-6">
        There was an error loading the game. This could be due to browser
        compatibility issues or missing assets.
      </p>
      <button
        type="button"
        className="bg-gradient-to-r from-amber-700 to-yellow-600 hover:from-amber-600 hover:to-yellow-500 text-stone-100 px-4 py-2 rounded"
        onClick={() => window.location.reload()}
      >
        Try Again
      </button>
    </div>
  )
}

export default function PracticePage() {
  const searchParams = useSearchParams()
  const player1Id = searchParams.get('player1Id') ?? undefined
  const player2Id = searchParams.get('player2Id') ?? undefined
  console.log(player1Id, player2Id)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <ErrorBoundary FallbackComponent={GameErrorFallback}>
        <Suspense fallback={<div>Loading game...</div>}>
          <GameWrapper player1Id={player1Id} player2Id={player2Id} />
        </Suspense>
      </ErrorBoundary>
    </main>
  )
}
