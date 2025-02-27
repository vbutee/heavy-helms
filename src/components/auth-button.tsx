'use client'

import { usePrivy } from '@privy-io/react-auth'
import { Button } from './ui/button'

function AuthButton() {
  const { login, logout, authenticated } = usePrivy()

  return authenticated ? (
    <Button
      onClick={() => logout()}
      className="fixed top-4 right-4 z-50 bg-gradient-to-r from-red-600 to-amber-500 text-white px-6 py-3 rounded-xl shadow-lg transform hover:scale-110 transition-all duration-300 font-bold flex items-center space-x-2"
    >
      <span className="animate-pulse">👋</span>
      <span>Logout</span>
    </Button>
  ) : (
    <Button
      onClick={() => login()}
      size="lg"
      className="z-50 bg-gradient-to-r from-amber-500 to-amber-700 text-white px-24 py-3 rounded-xl shadow-lg transform hover:scale-110 transition-all duration-300 font-bold flex justify-center items-center space-x-2"
    >
      {/* <span className="animate-pulse">🔑</span> */}
      Login
    </Button>
  )
}

export default AuthButton 