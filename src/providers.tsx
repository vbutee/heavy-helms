"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { base, baseSepolia } from "viem/chains";
import { WalletProvider } from "./store/wallet-context";
import { PlayerProvider } from "./store/player-context";

interface ProvidersProps {
  children: ReactNode;
}

const queryClient = new QueryClient();

function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <PrivyProvider
        appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ""}
        config={{
          loginMethods: ["email", "wallet", "farcaster", "twitter"],
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
          <PlayerProvider initialCharacters={[]}>
            {/* Initialize EventBus globally for Phaser games */}
            {children}
          </PlayerProvider>
        </WalletProvider>
      </PrivyProvider>
    </QueryClientProvider>
  );
}

export default Providers;
