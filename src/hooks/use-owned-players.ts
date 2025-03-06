"use client";

import { useQuery } from "@tanstack/react-query";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useReadContract } from "wagmi";
import { PlayerABI } from "@/game/abi/PlayerABI.abi";
import type { Character, Stance, Weapon, Armor } from "@/types/player.types";
import { useWallet } from "./use-wallet";
import { multicall } from "@wagmi/core";
import { config, viemClient } from "@/config";
import { baseSepolia } from "wagmi/chains";
// import { base } from "@wagmi/core";

interface UseOwnedPlayersOptions {
  enabled?: boolean;
}

/**
 * Custom hook that fetches all players owned by the signed-in Privy embedded address
 *
 * @returns An object containing the players owned by the user and the query state
 */
export function useOwnedPlayers(options: UseOwnedPlayersOptions = {}) {
  const { authenticated, user } = usePrivy();
  const { isWrongNetwork } = useWallet();
  const { wallets } = useWallets();

  const walletAddress = wallets?.find(
    (wallet) => wallet.connectorType === "embedded",
  )?.address;
  // Get the player contract address from environment variable
  const playerContractAddress = process.env
    .NEXT_PUBLIC_PLAYER_CONTRACT_ADDRESS as `0x${string}`;

  // Get all player IDs owned by the user
  const {
    data: playerIds,
    isLoading: isLoadingPlayerIds,
    error: playerIdsError,
  } = useReadContract({
    address: playerContractAddress,
    abi: PlayerABI,
    functionName: "getPlayerIds",
    args: walletAddress ? [walletAddress as `0x${string}`] : undefined,
    query: {
      enabled: Boolean(
        authenticated &&
          walletAddress &&
          !isWrongNetwork &&
          options.enabled !== false,
      ),
    },
    chainId: 84532,
  });
  console.log("playerIds", playerIds);
  const {
    data: players,
    isLoading: isLoadingPlayers,
    error: playersError,
    refetch,
  } = useQuery({
    queryKey: ["players", walletAddress, playerIds],
    queryFn: async (): Promise<Character[]> => {
      if (!playerIds || !Array.isArray(playerIds) || playerIds.length === 0) {
        return [];
      }

      // Convert all playerIds to numbers
      const normalizedPlayerIds = playerIds.map((id) => Number(id.toString()));

      // Fetch each player data sequentially or in small batches to maintain ID context
      const playerDataPromises = normalizedPlayerIds.map(async (playerId) => {
        try {
          const playerData = await viemClient.readContract({
            address: playerContractAddress,
            abi: PlayerABI,
            functionName: "getPlayer",
            args: [playerId],
          });

          // Extract equipment data from skin attributes
          let stance = "balanced";
          let weapon = "Sword + Shield";
          let armor = "Cloth";

          // Map player attributes and include the playerId explicitly
          return {
            playerId: playerId.toString(), // Explicitly include the playerId from the context
            name: `${playerData.firstNameIndex} ${playerData.surnameIndex}`, // This needs proper name resolution
            imageUrl: "https://ipfs.io/ipfs/QmaALMyYXwHuwu2EvDrLjkqFK9YigUb6RD9FX7MqVGoDkW", // hardcoded
            stance,
            weapon,
            armor,
            strength: playerData.attributes.strength,
            constitution: playerData.attributes.constitution,
            size: playerData.attributes.size,
            agility: playerData.attributes.agility,
            stamina: playerData.attributes.stamina,
            luck: playerData.attributes.luck,
          };
        } catch (error) {
          console.error(`Error fetching player ${playerId}:`, error);
          throw error;
        }
      });

      // Wait for all player data to be fetched
      const playerData = await Promise.all(playerDataPromises);
      console.log("playerData with IDs", playerData);
      return playerData;
    },
    enabled: Boolean(
      authenticated &&
        playerIds &&
        Array.isArray(playerIds) &&
        playerIds.length > 0 &&
        options.enabled !== false,
    ),
  });

  const isLoading = isLoadingPlayerIds || isLoadingPlayers;
  const error = playerIdsError || playersError;

  // Return the players and query state
  return {
    players: players || [],
    playerIds: playerIds && Array.isArray(playerIds) ? playerIds : [],
    isLoading,
    error,
    refetch,
  };
}

// Helper functions to map equipment enum values to strings
function mapStanceToString(stanceValue: number | string): Stance {
  // Handle numeric values
  if (typeof stanceValue === "number") {
    const stances: Stance[] = ["defensive", "balanced", "offensive"];
    return stances[stanceValue] || "balanced";
  }

  // Handle string values
  const stanceStr = String(stanceValue).toLowerCase();
  if (stanceStr.includes("defensive")) return "defensive";
  if (stanceStr.includes("offensive")) return "offensive";
  return "balanced";
}

function mapWeaponToString(weaponValue: number | string): Weapon {
  // Handle numeric values
  if (typeof weaponValue === "number") {
    const weapons: Record<number, Weapon> = {
      0: "Sword + Shield",
      1: "Mace + Shield",
      2: "Spear",
      3: "Battleaxe",
      4: "Warhammer",
      5: "Quarterstaff",
    };
    return weapons[weaponValue] || "Sword + Shield";
  }

  // Handle string values
  const weaponStr = String(weaponValue).toLowerCase();
  if (weaponStr.includes("sword") && weaponStr.includes("shield"))
    return "Sword + Shield";
  if (weaponStr.includes("mace") && weaponStr.includes("shield"))
    return "Mace + Shield";
  if (weaponStr.includes("spear")) return "Spear";
  if (weaponStr.includes("battleaxe")) return "Battleaxe";
  if (weaponStr.includes("warhammer")) return "Warhammer";
  if (weaponStr.includes("quarterstaff")) return "Quarterstaff";
  return "Sword + Shield";
}

function mapArmorToString(armorValue: number | string): Armor {
  // Handle numeric values
  if (typeof armorValue === "number") {
    const armors: Armor[] = ["Cloth", "Leather", "Chain", "Plate"];
    return armors[armorValue] || "Cloth";
  }

  // Handle string values
  const armorStr = String(armorValue).toLowerCase();
  if (armorStr.includes("cloth")) return "Cloth";
  if (armorStr.includes("leather")) return "Leather";
  if (armorStr.includes("chain")) return "Chain";
  if (armorStr.includes("plate")) return "Plate";
  return "Cloth";
}
