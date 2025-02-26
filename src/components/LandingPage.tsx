import { usePrivy } from '@privy-io/react-auth'
import styles from '@/styles/LandingPage.module.css'

function LandingPage() {
  const { login } = usePrivy()

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Heavy Helms</h1>
        
        <div className={styles.description}>
          <p>Welcome to Heavy Helms - an on-chain battle game where strategy meets blockchain!</p>
          
          <div className={styles.features}>
            <h2>Features</h2>
            <ul>
              <li>Modular contract system for expandable game modes</li>
              <li>Decentralized game design for custom game modes</li>
              <li>Customizable characters with unique skins</li>
              <li>Fair gameplay with balanced attributes</li>
              <li>Fully on-chain versioned game engine</li>
              <li>Practice mode and Duel mode with wagering</li>
            </ul>
          </div>
          
          <div className={styles.cta}>
            <button 
              className={styles.loginButton}
              onClick={() => login()}
            >
              Login to Play
            </button>
            <p className={styles.loginInfo}>Connect with your wallet or email to start playing!</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage 