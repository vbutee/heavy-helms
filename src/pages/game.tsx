import Head from 'next/head'
import dynamic from 'next/dynamic'

// Import the ProtectedGame component without SSR
const ProtectedGameWithoutSSR = dynamic(
  () => import('@/components/ProtectedGame'),
  { ssr: false }
)

export default function Game() {
  return (
    <>
      <Head>
        <title>Heavy Helms - Game</title>
        <meta name="description" content="Play Heavy Helms - an on-chain battle game where strategy meets blockchain!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <ProtectedGameWithoutSSR />
    </>
  )
} 