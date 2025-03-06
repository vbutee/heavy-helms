import { type Address, Hex, createPublicClient, http } from "viem"
import { baseSepolia } from "viem/chains"
import { PlayerNameRegistryABI } from "@/game/abi/PlayerNameRegistryABI.abi"
import { DefaultPlayerSkinNFTABI, PlayerABI } from "@/game/abi"

// Create a single client instance to be reused
const publicClient = createPublicClient({
  chain: baseSepolia,
  transport: http(),
})

// Constants
const playerContractAddress = process.env.NEXT_PUBLIC_PLAYER_CONTRACT_ADDRESS as Address
const playerNameRegistryAddress = process.env.NEXT_PUBLIC_NAME_REGISTRY_ADDRESS as Address

// Types
export interface RawPlayerData {
  attributes: {
    strength: number
    constitution: number
    size: number
    agility: number
    stamina: number
    luck: number
  }
  skin: {
    skinIndex: number
    skinTokenId: number
  }
  firstNameIndex: number
  surnameIndex: number
  wins: number
  losses: number
  kills: number
}

// Contract read functions - one function per contract call
export async function getPlayerIds(walletAddress: Address): Promise<number[]> {
  if (!walletAddress) return []
  
  try {
    const ids = await publicClient.readContract({
      address: playerContractAddress,
      abi: PlayerABI,
      functionName: "getPlayerIds",
      args: [walletAddress],
    })
    
    return ids.map(id => Number(id))
  } catch (error) {
    console.error("Error fetching player IDs:", error)
    return []
  }
}

export async function getPlayerData(playerId: number): Promise<RawPlayerData | null> {
  try {
    const playerData = await publicClient.readContract({
      address: playerContractAddress,
      abi: PlayerABI,
      functionName: "getPlayer",
      args: [playerId],
    })
    
    return playerData as RawPlayerData
  } catch (error) {
    console.error(`Error fetching player ${playerId}:`, error)
    return null
  }
}

export async function getPlayerName(firstNameIndex: number, surnameIndex: number) {
  try {
    const [firstName, surname] = await publicClient.readContract({
      address: playerNameRegistryAddress,
      abi: PlayerNameRegistryABI,
      functionName: "getFullName",
      args: [firstNameIndex, surnameIndex],
    })
    
    return {
      firstName,
      surname,
      fullName: `${firstName} ${surname}`
    }
  } catch (error) {
    console.error("Error fetching player name:", error)
    return { firstName: "Unknown", surname: "Warrior", fullName: "Unknown Warrior" }
  }
}

export async function getSkinAttributes(skinContractAddress: Address, tokenId: number) {
  try {
    const attributes = await publicClient.readContract({
      address: skinContractAddress,
      abi: DefaultPlayerSkinNFTABI,
      functionName: "getSkinAttributes",
      args: [BigInt(tokenId)],
    })
    
    return attributes
  } catch (error) {
    console.error("Error fetching skin attributes:", error)
    return null
  }
}

export async function getSkinsForContract(skinContractAddress: Address, tokenIds: number[]) {
  // Implementation of batch loading for skins
  // Could use multicall here
}