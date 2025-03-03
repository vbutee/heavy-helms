"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import type { ReactNode } from "react";
import { WagmiProvider } from "wagmi";
import { config } from "./config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { base, baseSepolia } from "wagmi/chains";
import { WalletProvider } from "./store/wallet-context";

interface ProvidersProps {
  children: ReactNode;
}

const queryClient = new QueryClient();

function Providers({ children }: ProvidersProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <PrivyProvider
          appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ""}
          config={{
            loginMethods: ["email", "wallet"],
            appearance: {
              theme: "dark",
              accentColor: "#f9c846",
              // logo: "/logo.png",
            },
            embeddedWallets: {
              createOnLogin: "all-users",
            },
            defaultChain: baseSepolia,
            supportedChains: [base, baseSepolia],
          }}
        >
          <WalletProvider>
            {/* Initialize EventBus globally for Phaser games */}
            {children}
          </WalletProvider>
        </PrivyProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default Providers;
