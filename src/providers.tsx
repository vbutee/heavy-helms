"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import type { ReactNode } from "react";

interface ProvidersProps {
  children: ReactNode;
}

function Providers({ children }: ProvidersProps) {
  return (
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
          createOnLogin: "users-without-wallets",
        },
      }}
    >
      {/* Initialize EventBus globally for Phaser games */}
      {children}
    </PrivyProvider>
  );
}

export default Providers;
