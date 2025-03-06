// src/hooks/use-player-data.ts
import { useQuery } from "@tanstack/react-query"
import type { Address } from "viem"
import { useAccount } from "wagmi"
import type { Character, Stance, Armor, Weapon } from "@/types/player.types"
import { 
  getPlayerIds, 
  getPlayerData, 
  getPlayerName, 
  getSkinAttributes
} from "@/lib/contracts/player-contract"
import { useWallets } from "@privy-io/react-auth"

// Utility functions for mapping contract values to domain types
function mapStanceToString(stanceValue: number | string): Stance {
  const stanceMap: Record<number, Stance> = {
    0: "offensive",
    1: "defensive",
    2: "balanced"
  }
  
  const numValue = Number(stanceValue)
  return stanceMap[numValue] || "balanced"
}

function mapWeaponToString(weaponValue: number | string): Weapon {
  const weaponMap: Record<number, Weapon> = {
    0: "Sword + Shield",
    1: "Mace + Shield",
    2: "Rapier + Shield",
    3: "Greatsword",
    4: "Battleaxe",
    5: "Spear",
    6: "Quarterstaff"
  }
  
  const numValue = Number(weaponValue)
  return weaponMap[numValue] || "Sword + Shield"
}

function mapArmorToString(armorValue: number | string): Armor {
  const armorMap: Record<number, Armor> = {
    0: "Cloth",
    1: "Leather",
    2: "Chain",
    3: "Plate"
  }
  
  const numValue = Number(armorValue)
  return armorMap[numValue] || "Cloth"
}

// Individual hooks for different pieces of data
export function usePlayerIds(address?: Address) {
  return useQuery({
    queryKey: ["playerIds", address],
    queryFn: () => getPlayerIds(address as Address),
    enabled: Boolean(address),
  })
}

export function usePlayerData(playerId: number) {
  return useQuery({
    queryKey: ["playerData", playerId],
    queryFn: () => getPlayerData(playerId),
    enabled: playerId > 0,
  })
}

export function usePlayerName(firstNameIndex?: number, surnameIndex?: number) {
  return useQuery({
    queryKey: ["playerName", firstNameIndex, surnameIndex],
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    queryFn: () => getPlayerName(firstNameIndex!, surnameIndex!),
    enabled: Boolean(firstNameIndex !== undefined && surnameIndex !== undefined),
  })
}

// Main hook that combines all data
export function useOwnedPlayers(options: { enabled?: boolean } = {}) {
  const { wallets } = useWallets();
  const address = wallets?.find(
    (wallet) => wallet.connectorType === "embedded",
  )?.address;
  // Step 1: Get player IDs
  const { 
    data: playerIds,
    isLoading: isLoadingIds,
    error: idsError,
  } = usePlayerIds(address as Address)
  
  // Step 2: Get player data for each ID
  const {
    data: players,
    isLoading: isLoadingPlayers,
    error: playersError,
    refetch
  } = useQuery({
    queryKey: ["players", address, playerIds],
    queryFn: async (): Promise<Character[]> => {
      if (!playerIds || !playerIds.length) return []
      
      // Step 2.1: Fetch basic player data for all IDs
      const playerDataPromises = playerIds.map(async (playerId) => {
        const rawData = await getPlayerData(playerId)
        if (!rawData) return null
        
        // Step 2.2: Fetch player name
        const nameData = await getPlayerName(
          rawData.firstNameIndex,
          rawData.surnameIndex
        )
        
        // Step 2.3: Get skin attributes if available
        let stance: Stance = "balanced"
        let weapon: Weapon = "Sword + Shield"
        let armor: Armor = "Cloth"
        let imageUrl = "https://ipfs.io/ipfs/QmaALMyYXwHuwu2EvDrLjkqFK9YigUb6RD9FX7MqVGoDkW"
        
        // Process skin data to extract equipment if available
        if (rawData.skin?.skinIndex) {
          // Here you would fetch skin data if needed
          // For now we'll use defaults
        }
        
        // Step 2.4: Map to Character type
        return {
          playerId: playerId.toString(),
          name: nameData.fullName,
          imageUrl,
          stance,
          weapon,
          armor,
          strength: rawData.attributes.strength,
          constitution: rawData.attributes.constitution,
          size: rawData.attributes.size,
          agility: rawData.attributes.agility,
          stamina: rawData.attributes.stamina,
          luck: rawData.attributes.luck,
        }
      })
      
      // Wait for all promises to resolve and filter out nulls
      const results = await Promise.all(playerDataPromises)
      return results.filter(Boolean) as Character[]
    },
    enabled: Boolean(
      address && 
      playerIds &&
      playerIds.length > 0 &&
      options.enabled !== false
    ),
  })
  
  return {
    players,
    isLoading: isLoadingIds || isLoadingPlayers,
    error: idsError || playersError,
    refetch,
  }
}