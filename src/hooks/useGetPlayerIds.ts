import { PlayerABI } from "@/game/abi/PlayerABI.abi";
import { useReadContract } from "wagmi";

export function useGetPlayerIds(walletAddress: string) {
  const { data, isLoading, error } = useReadContract({
    address: process.env.NEXT_PUBLIC_PLAYER_CONTRACT_ADDRESS as `0x${string}`,
    abi: PlayerABI,
    functionName: "getPlayerIds",
    args: [walletAddress as `0x${string}`],
    query: {
      enabled: Boolean(walletAddress),
    },
    chainId: 84532,
  });
  return { data, isLoading, error };
}
