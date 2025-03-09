import { PlayerABI } from "@/game/abi/PlayerABI.abi";
import { useReadContract } from "wagmi";
export function useGetPlayer(playerId: number) {
  const { data, isLoading, error } = useReadContract({
    address: process.env.NEXT_PUBLIC_PLAYER_CONTRACT_ADDRESS as `0x${string}`,
    abi: PlayerABI,
    functionName: "getPlayer",
    args: [playerId],
    query: {
      enabled: Boolean(playerId),
    },
    chainId: 84532,
  });
  return { data, isLoading, error };
}
