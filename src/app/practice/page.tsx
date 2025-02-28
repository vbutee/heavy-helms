"use client";

import { GameWrapper } from "@/components/game/game-wrapper";
import { Suspense, useEffect, useRef, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useRouter, useSearchParams } from "next/navigation";
import { Armor, Character, Stance, Weapon } from "@/types/player.types";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Button } from "@/components/ui/button";

// Fallback component for when the game fails to load
function GameErrorFallback() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-stone-900/90 p-6 text-center">
      <h2 className="text-2xl font-bold text-yellow-400 mb-4">
        Could not load game
      </h2>
      <p className="text-stone-200 mb-6">
        There was an error loading the game. This could be due to browser
        compatibility issues or missing assets.
      </p>
      <button
        type="button"
        className="bg-gradient-to-r from-amber-700 to-yellow-600 hover:from-amber-600 hover:to-yellow-500 text-stone-100 px-4 py-2 rounded"
        onClick={() => window.location.reload()}
      >
        Try Again
      </button>
    </div>
  );
}

export default function PracticePage() {
  const searchParams = useSearchParams();
  const player1Id = searchParams.get("player1Id") ?? undefined;
  const player2Id = searchParams.get("player2Id") ?? undefined;
  const router = useRouter();

  useEffect(() => {
    // Redirect if no character ID is provided
    if (!player1Id || !player2Id) {
      router.push("/");
      return;
    }
  }, [player1Id, player2Id, router]);

  console.log(player1Id, player2Id);
  return (
    <div className="min-h-screen flex flex-col bg-stone-9000">
      <header className="p-4 flex justify-between items-center bg-stone-800 border-b border-yellow-600/20">
        <h1 className="text-2xl font-bold text-yellow-400">Practice Arena</h1>
        <Button
          variant="outline"
          className="border-yellow-600/30 text-yellow-400 hover:bg-yellow-600/10"
          onClick={() => router.push("/")}
        >
          Exit Practice
        </Button>
      </header>

      <main className="flex-1 p-4 flex flex-col">
        <div className="flex-1 bg-black rounded-lg overflow-hidden border border-yellow-600/20 shadow-lg items-center justify-center flex">
          {/* Game container */}
          <div className="flex items-center justify-center flex-1 z-10">
            <ErrorBoundary FallbackComponent={GameErrorFallback}>
              <Suspense
                fallback={
                  <LoadingSpinner size="large" text="Loading game..." />
                }
              >
                <GameWrapper player1Id={player1Id} player2Id={player2Id} />
              </Suspense>
            </ErrorBoundary>
          </div>
        </div>

        <div className="mt-4 p-4 bg-stone-800/50 rounded-lg border border-yellow-600/10">
          <h2 className="text-lg font-medium text-yellow-400 mb-2">
            Combat Controls
          </h2>
          <p className="text-stone-300 text-sm">
            Press{" "}
            <span className="px-2 py-1 bg-stone-700 rounded text-xs font-mono">
              R
            </span>{" "}
            to restart the combat sequence.
          </p>
        </div>
      </main>
    </div>
  );
  //   return (
  //     <main className="flex min-h-screen flex-col items-center justify-between">
  //       <ErrorBoundary FallbackComponent={GameErrorFallback}>
  //         <Suspense fallback={<div>Loading game...</div>}>
  //           <GameWrapper player1Id={player1Id} player2Id={player2Id} />
  //         </Suspense>
  //       </ErrorBoundary>
  //     </main>
  //   );
}
