"use client";

import {
  type ReactNode,
  createContext,
  useContext,
  useState,
  useCallback,
} from "react";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { toast } from "sonner";
import { parseEther, encodeFunctionData } from "viem";
import { PlayerABI } from "@/game/abi/PlayerABI.abi";
import { useWallet } from "@/hooks/use-wallet";
import type { Character } from "@/types/player.types";
import { useQueryClient } from "@tanstack/react-query";

interface PlayerContextType {
  isCreatingCharacter: boolean;
  txHash: string | null;
  createCharacter: () => Promise<void>;
  characters: Character[];
  refreshCharacters: () => Promise<void>;
}

export const PlayerContext = createContext<PlayerContextType>({
  isCreatingCharacter: false,
  txHash: null,
  createCharacter: async () => {},
  characters: [],
  refreshCharacters: async () => {},
});

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
  const [characters, setCharacters] = useState<Character[]>(initialCharacters);

  // Function to refresh the characters list using React Query
  const refreshCharacters = useCallback(async () => {
    // Get the wallet address to construct the proper query key
    const walletAddress = wallets?.find(
      (wallet) => wallet.connectorType === "embedded"
    )?.address;
    
    // Invalidate the players query to trigger a refetch
    await queryClient.invalidateQueries({
      queryKey: ["players", walletAddress],
    });
    
    // Optionally fetch the latest data directly
    const latestData = queryClient.getQueryData<Character[]>(["players", walletAddress]);
    if (latestData) {
      setCharacters(latestData);
    }

    // Return a promise that resolves when the query has been refetched
    return queryClient.refetchQueries({
      queryKey: ["players", walletAddress],
      exact: false,
    });
  }, [queryClient, wallets]);

  // Function to create a new character
  const createCharacter = useCallback(async () => {
    if (!authenticated || !user?.wallet) {
      toast.error("Please connect your wallet first");
      return;
    }

    if (isWrongNetwork) {
      toast("Wrong Network", {
        description: "Please switch to Base Sepolia to create a character",
      });
      await switchToBaseSepolia();
      return;
    }

    try {
      setIsCreatingCharacter(true);
      setTxHash(null);

      // Show initial toast
      toast("Creating character", {
        description: "Preparing transaction...",
      });

      // Get contract address from environment variable
      const playerContractAddress =
        process.env.NEXT_PUBLIC_PLAYER_CONTRACT_ADDRESS;

      if (!playerContractAddress) {
        throw new Error("Player contract address not configured");
      }

      // Prepare transaction data
      const data = encodeFunctionData({
        abi: PlayerABI,
        functionName: "requestCreatePlayer",
        args: [false], // useNameSetB = false (use name set A)
      });

      // Get wallet provider
      if (!wallets || wallets.length === 0) {
        throw new Error("No wallet available");
      }

      const wallet = wallets[0]; // Get the first wallet
      const provider = await wallet.getEthereumProvider();

      // Send transaction using the provider
      const txHash = await provider.request({
        method: "eth_sendTransaction",
        params: [
          {
            to: playerContractAddress,
            from: wallet.address,
            data,
            value: `0x${parseEther("0.001").toString(16)}`, // 0.1 ETH creation fee in hex
          },
        ],
      });

      // Update tx hash
      setTxHash(txHash as string);

      // Show pending toast
      toast("Transaction sent", {
        description: "Waiting for confirmation...",
      });

      // Check for transaction receipt
      let receipt = null;
      let retries = 0;
      const maxRetries = 30; // Try for ~5 minutes

      while (!receipt && retries < maxRetries) {
        try {
          // Wait before checking
          await new Promise((resolve) => setTimeout(resolve, 10000)); // 10 seconds

          // Get transaction receipt
          const receiptResponse = await provider.request({
            method: "eth_getTransactionReceipt",
            params: [txHash],
          });

          if (receiptResponse) {
            receipt = receiptResponse;
          }
        } catch (receiptError) {
          console.error("Error checking receipt:", receiptError);
        }

        retries++;
      }

      if (receipt && receipt.status === "0x1") {
        toast.success("Character created!", {
          description: (
            <div className="mt-2 text-xs">
              <p>Your new character has been created successfully.</p>
              <a
                href={`https://sepolia.basescan.org/tx/${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline mt-1 inline-block"
              >
                View transaction
              </a>
            </div>
          ),
          duration: 5000,
        });

        // Delay to allow time for the contract to emit events and update state
        setTimeout(() => {
          refreshCharacters();
        }, 2000);
      } else {
        throw new Error("Transaction failed");
      }
    } catch (error: unknown) {
      console.error("Error creating character:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.";
      toast.error("Failed to create character", {
        description: errorMessage,
      });
    } finally {
      setIsCreatingCharacter(false);
    }
  }, [
    authenticated,
    user,
    wallets,
    isWrongNetwork,
    switchToBaseSepolia,
    refreshCharacters,
  ]);

  const value = {
    isCreatingCharacter,
    txHash,
    createCharacter,
    characters,
    refreshCharacters,
  };

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
}

// Custom hook to use the player context
export function usePlayer() {
  const context = useContext(PlayerContext);

  if (context === undefined) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }

  return context;
}
