import { config } from "@/config";
import { PlayerABI } from "@/game/abi";
import { useQuery } from "@tanstack/react-query";
import { multicall } from "@wagmi/core";
import { useReadContract } from "wagmi";

export function useGetSkinInfo({ skinIndecies }: { skinIndecies: number[] }) {
  //   const { data, isLoading, error } = useReadContract({
  //     address: process.env.NEXT_PUBLIC_PLAYER_CONTRACT_ADDRESS as `0x${string}`,
  //     abi: PlayerABI,
  //     functionName: "getCurrentSkin",
  //     args: [playerIds],
  //     chainId: 84532,
  //   });
  const skinDataCalls = skinIndecies.map((skinIndex) => ({
    address: process.env.NEXT_PUBLIC_PLAYER_CONTRACT_ADDRESS as `0x${string}`,
    abi: PlayerABI,
    functionName: "getCurrentSkin",
    args: [skinIndex],
    chainId: 84532,
  }));

  const { data, isLoading, error } = useQuery({
    queryKey: ["skinData", skinIndecies],
    queryFn: () => multicall(config, { contracts: skinDataCalls }),
  });

  return { data, isLoading, error };
}
