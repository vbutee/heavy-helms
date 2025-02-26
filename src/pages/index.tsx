import Head from "next/head";
import { Inter } from "next/font/google";
import { usePrivy } from '@privy-io/react-auth'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import dynamic from "next/dynamic";

const inter = Inter({ subsets: ["latin"] });

// Import the LandingPage component
const LandingPage = dynamic(() => import("@/components/LandingPage"), { ssr: true });

export default function Home() {
    const { ready, authenticated } = usePrivy()
    const router = useRouter()

    // Redirect to game if already authenticated
    useEffect(() => {
        if (ready && authenticated) {
            router.push('/game')
        }
    }, [ready, authenticated, router])

    return (
        <>
            <Head>
                <title>Heavy Helms</title>
                <meta name="description" content="Heavy Helms - an on-chain battle game where strategy meets blockchain!" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.png" />
            </Head>
            <main className={inter.className}>
                <LandingPage />
            </main>
        </>
    );
}
