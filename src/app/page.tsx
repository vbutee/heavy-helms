"use client";

import { Button } from "@/components/ui/button";
import { usePrivy } from "@privy-io/react-auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import InfoBanner from "@/components/InfoBanner";
// Import types
import type { Character } from "@/types/player.types";

// Sample character data - will be moved to a service later
const characters: Character[] = [
  {
    playerId: "10014",
    name: "Ross of the Glade",
    imageUrl:
      "https://ipfs.io/ipfs/bafkreici37rg5rtnr4vsnjeprl5e7khjy2dse7y3ahwivxbsnde6o2x3sy",
    stance: "defensive",
    weapon: "Sword + Shield",
    armor: "Plate",
    strength: 13,
    constitution: 16,
    size: 16,
    agility: 13,
    stamina: 7,
    luck: 7,
  },
  {
    playerId: "10009",
    name: "Kate of the Ember",
    imageUrl:
      "https://ipfs.io/ipfs/QmaALMyYXwHuwu2EvDrLjkqFK9YigUb6RD9FX7MqVGoDkW",
    stance: "balanced",
    weapon: "Mace + Shield",
    armor: "Chain",
    strength: 14,
    constitution: 12,
    size: 10,
    agility: 14,
    stamina: 14,
    luck: 8,
  },
];

export default function Home() {
  const { ready, authenticated } = usePrivy();
  const router = useRouter();
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null,
  );
  const [opponent, setOpponent] = useState<Character | null>(null);

  // Handle character selection
  const handleCharacterSelect = (character: Character) => {
    setSelectedCharacter(character);

    // Set opponent to the other character
    const otherCharacter = characters.find(
      (c) => c.playerId !== character.playerId,
    );
    if (otherCharacter) {
      setOpponent(otherCharacter);
    }
  };

  // Start game with selected characters
  const startGame = () => {
    if (selectedCharacter && opponent) {
      router.push(
        `/game?player1Id=${selectedCharacter.playerId}&player2Id=${opponent.playerId}`,
      );
    }
  };

  return (
    <div className="min-h-screen w-full overflow-y-auto">{/* Content */}</div>
    // <>
    //   {/* Hero section */}
    //   <section className="relative flex flex-1 items-center justify-center">
    //     <div className="absolute inset-0 bg-black/40" />
    //     <div className="container mx-auto px-4 relative flex justify-center">
    //       <div className="max-w-2xl">
    //         <h1 className="text-5xl md:text-7xl font-bold mb-4">
    //           Enter the Arena
    //         </h1>
    //         <p className="text-xl md:text-2xl mb-8 text-slate-300">
    //           Customize your fighter, master your skills, and battle for glory on the blockchain.
    //         </p>

    //       </div>
    //     </div>
    //   </section>

    //   {/* Main content area */}
    //   <section className="py-20 flex justify-center">
    //     <div className="container mx-auto px-4">
    //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    //         {/* Game modes */}
    //         <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
    //           <h2 className="text-2xl font-bold mb-4">Practice Mode</h2>
    //           <p className="text-slate-300 mb-4">
    //             Hone your skills in a risk-free environment. Perfect your combos and strategies.
    //           </p>
    //           <Button className="w-full">Enter Practice</Button>
    //         </div>

    //         <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
    //           <h2 className="text-2xl font-bold mb-4">Duel Mode</h2>
    //           <p className="text-slate-300 mb-4">
    //             Challenge other players in intense 1v1 battles. Climb the ranks and earn rewards.
    //           </p>
    //           <Button className="w-full">Find Match</Button>
    //         </div>

    //         <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
    //           <h2 className="text-2xl font-bold mb-4">Your NFTs</h2>
    //           <p className="text-slate-300 mb-4">
    //             View and manage your collection of characters and equipment.
    //           </p>
    //           <Button className="w-full">View Collection</Button>
    //         </div>
    //       </div>
    //     </div>
    //   </section>
    // </>
  );
}
