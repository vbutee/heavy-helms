import { PlayerABI } from "@/game/abi/PlayerABI.abi";
import { useReadContract } from "wagmi";

export function useGetPlayerName({firstNameIndex, surnameIndex}: {firstNameIndex: number, surnameIndex: number}) {
//   const { data, isLoading, error } = useReadContract({
//     address: process.env.NEXT_PUBLIC_PLAYER_CONTRACT_ADDRESS as `0x${string}`,
//     abi: PlayerABI,
//     functionName: "name",
//     args: [firstNameIndex ?? 0, surnameIndex ?? 0],
//     chainId: 84532,
//   });
//   return { data, isLoading, error };
}   