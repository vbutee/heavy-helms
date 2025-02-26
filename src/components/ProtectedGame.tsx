import { usePrivy } from '@privy-io/react-auth'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import styles from '@/styles/ProtectedGame.module.css'

// Import the App component without SSR
const AppWithoutSSR = dynamic(() => import('@/App'), { ssr: false })

function ProtectedGame() {
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
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading game...</p>
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
    <div className={styles.gameContainer}>
      <button 
        className={styles.logoutButton}
        onClick={handleLogout}
      >
        Logout
      </button>
      <AppWithoutSSR />
    </div>
  )
}

export default ProtectedGame 