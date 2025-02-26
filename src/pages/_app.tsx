import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { PrivyProvider } from "@privy-io/react-auth";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ''}
      config={{
        loginMethods: ['email', 'wallet'],
        appearance: {
          theme: 'dark',
          accentColor: '#f9c846',
          logo: '/logo.png',
        },
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
        },
      }}
    >
      <Component {...pageProps} />
    </PrivyProvider>
  );
}
