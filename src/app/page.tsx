"use client";

import { Button } from "@/components/ui/button";
import { usePrivy } from "@privy-io/react-auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import InfoBanner from "@/components/InfoBanner";
// Import types
import type { Character } from "@/types/player.types";
import { CharacterGallery } from "@/components/home/character-gallery";
import { CommunityStats } from "@/components/home/community-stats";
import { GameIntroduction } from "@/components/home/game-introduction";
import { AuthenticatedView } from "@/components/home/authenticated-view";

// Sample character data - will be moved to a service later
const characters: Character[] = [
  {
    playerId: "10009",
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
    playerId: "10008",
    name: "Kate of the Ember",
    imageUrl:
      "https://ipfs.io/ipfs/QmaALMyYXwHuwu2EvDrLjkqFK9YigUb6RD9FX7MqVGoDkW",
    stance: "balanced",
    weapon: "Quarterstaff",
    armor: "Cloth",
    strength: 16,
    constitution: 12,
    size: 9,
    agility: 10,
    stamina: 16,
    luck: 9,
  },
  {
    playerId: "10007",
    name: "Diego Frostcaller",
    imageUrl:
      "https://ipfs.io/ipfs/QmZqrNGPB2ck2ECdhKZEFaJyVM1YtNDLrhmWN5CxvZTqr5",
    stance: "offensive",
    weapon: "Battleaxe",
    armor: "Leather",
    strength: 16,
    constitution: 11,
    size: 13,
    agility: 9,
    stamina: 10,
    luck: 13,
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
    <div className="min-h-screen w-full overflow-y-auto">
      {authenticated ? (
        <AuthenticatedView characters={characters} />
      ) : (
        // Non-authenticated view
        <>
          <CharacterGallery characters={characters} />
          <GameIntroduction />
          <CommunityStats />
        </>
      )}
    </div>
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
