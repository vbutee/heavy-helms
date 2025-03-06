// src/store/player-context.tsx
import {
  type ReactNode,
  createContext,
  useContext,
  useState,
  useCallback,
} from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useWallets } from "@privy-io/react-auth";
import { useQueryClient } from "@tanstack/react-query";
import type { Character } from "@/types/player.types";
import { useOwnedPlayers } from "@/hooks/use-player-data";
import { useWallet } from "@/hooks/use-wallet";

interface PlayerContextType {
  isCreatingCharacter: boolean;
  txHash: string | null;
  createCharacter: () => Promise<void>;
  characters: Character[];
  refreshCharacters: () => Promise<void>;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

interface PlayerProviderProps {
  children: ReactNode;
  initialCharacters: Character[];
}

export function PlayerProvider({
  children,
  initialCharacters,
}: PlayerProviderProps) {
  const { authenticated, user } = usePrivy();
  const { wallets } = useWallets();
  const { isWrongNetwork, switchToBaseSepolia } = useWallet();
  const queryClient = useQueryClient();

  const [isCreatingCharacter, setIsCreatingCharacter] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);

  // Use our improved hook to get characters
  const { players = initialCharacters, refetch } = useOwnedPlayers({
    enabled: authenticated && !isWrongNetwork,
  });

  // Function to refresh characters
  const refreshCharacters = useCallback(async () => {
    // Get the wallet address to construct the proper query key
    const walletAddress = wallets?.find(
      (wallet) => wallet.connectorType === "embedded",
    )?.address;

    // Invalidate and refetch in one go
    return queryClient.invalidateQueries({
      queryKey: ["players", walletAddress],
    });
  }, [queryClient, wallets]);

  // Function to create a character
  const createCharacter = useCallback(async () => {
    if (!authenticated) return;
    if (isWrongNetwork) {
      await switchToBaseSepolia();
      return;
    }

    setIsCreatingCharacter(true);
    setTxHash(null);

    try {
      // Implementation of character creation logic
      // ...

      // After successful creation, refresh the character list
      await refreshCharacters();
    } catch (error) {
      console.error("Error creating character:", error);
    } finally {
      setIsCreatingCharacter(false);
    }
  }, [authenticated, isWrongNetwork, switchToBaseSepolia, refreshCharacters]);

  return (
    <PlayerContext.Provider
      value={{
        isCreatingCharacter,
        txHash,
        createCharacter,
        characters: players,
        refreshCharacters,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
}
