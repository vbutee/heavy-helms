import { forwardRef, useEffect, useLayoutEffect, useRef } from 'react'
import startGame from './config/game-config'
import { EventBus, GameEvents } from './event-bus'
import { GameConfig } from '@/types/game.types'

export interface PhaserGameRef {
  game: Phaser.Game | null
  scene: Phaser.Scene | null
}

interface PhaserGameProps {
  currentActiveScene?: (scene: Phaser.Scene) => void
  player1Id?: string
  player2Id?: string
}

function PhaserGame({ 
  currentActiveScene, 
  player1Id, 
  player2Id 
}: PhaserGameProps, ref: React.ForwardedRef<PhaserGameRef>) {
  const game = useRef<Phaser.Game | null>(null)

  useLayoutEffect(() => {
    if (game.current === null) {
      const gameConfig: GameConfig = {
        player1Id,
        player2Id
      }
      
      game.current = startGame("game-container", gameConfig)

      if (typeof ref === 'function') {
        ref({ game: game.current, scene: null })
      } else if (ref) {
        ref.current = { game: game.current, scene: null }
      }
    }

    return () => {
      if (game.current) {
        game.current.destroy(true)
        game.current = null
      }
    }
  }, [ref, player1Id, player2Id])

  useEffect(() => {
    // Set player IDs in the event bus
    if (player1Id) EventBus.emit(GameEvents.SET_PLAYER1_ID, player1Id)
    if (player2Id) EventBus.emit(GameEvents.SET_PLAYER2_ID, player2Id)

    // Listen for scene ready events
    EventBus.on(GameEvents.CURRENT_SCENE_READY, (scene: Phaser.Scene) => {
      if (currentActiveScene && typeof currentActiveScene === 'function') {
        currentActiveScene(scene)
      }

      if (typeof ref === 'function') {
        ref({ game: game.current, scene })
      } else if (ref) {
        ref.current = { game: game.current, scene }
      }
    })
    
    return () => {
      EventBus.removeListener(GameEvents.CURRENT_SCENE_READY)
    }
  }, [currentActiveScene, ref, player1Id, player2Id])

  return (
    <div id="game-container" className="w-full h-full"></div>
  )
}

export default forwardRef<PhaserGameRef, PhaserGameProps>(PhaserGame) 