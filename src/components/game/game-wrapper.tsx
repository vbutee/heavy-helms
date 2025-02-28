"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import PhaserGame with no SSR
const PhaserGame = dynamic(() => import("@/game/PhaserGame"), {
  ssr: false,
});

interface GameWrapperProps {
  player1Id?: string;
  player2Id?: string;
}

export function GameWrapper({ player1Id, player2Id }: GameWrapperProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="w-full h-full">
      <PhaserGame player1Id={player1Id} player2Id={player2Id} />
    </div>
  );
}
