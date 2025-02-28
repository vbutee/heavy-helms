// src/components/home/authenticated-view.tsx
"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { Character } from "@/types/player.types";
import { CTAButton } from "../ui/cta-button";

interface AuthenticatedViewProps {
  characters: Character[];
}

export function AuthenticatedView({ characters }: AuthenticatedViewProps) {
  const router = useRouter();

  return (
    <div className="max-w-7xl mx-auto">
      {/* Character Selection Section */}
      <section className="mb-12">
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600 uppercase tracking-widest mb-1">
              Your Warriors
            </h2>
            <div className="flex items-center justify-center mb-3">
              <div className="h-[1px] w-12 bg-yellow-600/40" />
              <div className="mx-4">
                <span className="text-yellow-400/90 text-sm font-medium tracking-widest">
                  CHOOSE YOUR CHAMPION
                </span>
              </div>
              <div className="h-[1px] w-12 bg-yellow-600/40" />
            </div>
          </motion.div>
        </div>

        {/* Character Carousel */}
        <div className="relative overflow-hidden">
          <div className="flex gap-6 px-4 overflow-x-auto pb-4 snap-x">
            {characters.map((character, index) => (
              <motion.div
                key={character.playerId}
                className="min-w-[220px] bg-gradient-to-b from-amber-900/20 to-stone-900/40 rounded-lg border border-yellow-600/30 overflow-hidden snap-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, borderColor: "rgba(217, 119, 6, 0.5)" }}
              >
                <div className="aspect-square relative bg-gradient-to-b from-stone-800/30 to-stone-900/30 overflow-hidden">
                  <div className="absolute inset-0 p-1">
                    <div className="relative h-full w-full overflow-hidden rounded">
                      <Image
                        src={character.imageUrl}
                        alt={character.name}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 220px"
                        priority={index < 2}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 via-transparent to-transparent" />
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full bg-amber-900/60 border border-yellow-600/40">
                    <span className="text-xs font-bold text-yellow-400">{character.playerId.substring(character.playerId.length - 2)}</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-yellow-400 mb-1">
                    {character.name}
                  </h3>
                  <div className="flex justify-between text-xs text-stone-300 mb-2">
                    <span>{character.weapon}</span>
                    <span>{character.armor}</span>
                  </div>
                  <div className="mt-3">
                    <Button
                      className="w-full bg-gradient-to-r from-amber-700 to-yellow-600 hover:from-amber-600 hover:to-yellow-500 text-stone-100"
                      onClick={() =>
                        router.push(`/character/${character.playerId}`)
                      }
                    >
                      Select
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Add New Character Card */}
            <motion.div
              className="min-w-[220px] h-[300px] bg-gradient-to-b from-stone-800/20 to-stone-900/40 rounded-lg border border-yellow-600/10 overflow-hidden snap-start flex flex-col items-center justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: characters.length * 0.1 }}
              whileHover={{
                scale: 1.02,
                borderColor: "rgba(217, 119, 6, 0.3)",
              }}
            >
              <div className="w-20 h-20 rounded-full border-2 border-dashed border-yellow-600/30 flex items-center justify-center mb-4">
                <span className="text-3xl text-yellow-600/70">+</span>
              </div>
              <p className="text-stone-300 mb-4">Create New Warrior</p>
              <Button
                variant="outline"
                className="border-yellow-600/30 text-yellow-400 hover:bg-yellow-600/10"
                onClick={() => router.push("/character/create")}
              >
                Forge Legend
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Game Modes Section */}
      <section className="mb-12">
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600 uppercase tracking-widest mb-1">
              Choose Your Battle
            </h2>
            <div className="flex items-center justify-center mb-3">
              <div className="h-[1px] w-12 bg-yellow-600/40" />
              <div className="mx-4">
                <span className="text-yellow-400/90 text-sm font-medium tracking-widest">
                  GLORY AWAITS
                </span>
              </div>
              <div className="h-[1px] w-12 bg-yellow-600/40" />
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Practice Mode */}
          <motion.div
            className="bg-gradient-to-b from-amber-900/10 to-stone-900/40 rounded-lg border border-yellow-600/20 p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.02, borderColor: "rgba(217, 119, 6, 0.4)" }}
          >
            <div className="text-4xl mb-4">⚔️</div>
            <h3 className="text-2xl font-bold text-yellow-400 mb-2">
              Practice Arena
            </h3>
            <p className="text-stone-300 mb-6">
              Hone your skills in risk-free battles. Test strategies and
              fighting styles without consequence.
            </p>
            <CTAButton
              title="Enter Practice"
              onClick={() => router.push("/practice")}
              size="default"
            />
          </motion.div>

          {/* Duel Mode */}
          <motion.div
            className="bg-gradient-to-b from-amber-900/10 to-stone-900/40 rounded-lg border border-yellow-600/20 p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.02, borderColor: "rgba(217, 119, 6, 0.4)" }}
          >
            <div className="text-4xl mb-4">🏆</div>
            <h3 className="text-2xl font-bold text-yellow-400 mb-2">
              Duel Challenge
            </h3>
            <p className="text-stone-300 mb-6">
              Challenge warriors across the realm. Victory brings glory and
              rewards - defeat leaves scars.
            </p>
            <CTAButton
              title="Find Opponent"
              onClick={() => router.push("/duel")}
              size="default"
            />
          </motion.div>

          {/* Tutorial Mode */}
          <motion.div
            className="bg-gradient-to-b from-amber-900/10 to-stone-900/40 rounded-lg border border-yellow-600/20 p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            whileHover={{ scale: 1.02, borderColor: "rgba(217, 119, 6, 0.4)" }}
          >
            <div className="text-4xl mb-4">📜</div>
            <h3 className="text-2xl font-bold text-yellow-400 mb-2">
              Warrior Training
            </h3>
            <p className="text-stone-300 mb-6">
              Learn the ways of combat through guided instruction. Master the
              basics of Heavy Helms.
            </p>
            <CTAButton
              title="Begin Training"
              onClick={() => router.push("/tutorial")}
              size="default"
            />
          </motion.div>
        </div>
      </section>

      {/* Recent Activity Section */}
      <section className="mb-8">
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600 uppercase tracking-widest mb-1">
              Battle Chronicles
            </h2>
            <div className="flex items-center justify-center mb-3">
              <div className="h-[1px] w-12 bg-yellow-600/40" />
              <div className="mx-4">
                <span className="text-yellow-400/90 text-sm font-medium tracking-widest">
                  YOUR SAGA
                </span>
              </div>
              <div className="h-[1px] w-12 bg-yellow-600/40" />
            </div>
          </motion.div>
        </div>

        {/* Activity Feed - Placeholder for now */}
        <motion.div
          className="bg-gradient-to-b from-amber-900/5 to-stone-900/30 rounded-lg border border-yellow-600/10 p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-stone-200">
              Recent Battles
            </h3>
            <Button
              variant="ghost"
              className="text-yellow-500 hover:text-yellow-400"
            >
              View All
            </Button>
          </div>

          <div className="space-y-4">
            {/* Placeholder activities - would be dynamically generated */}
            <div className="p-4 border-b border-stone-700/50">
              <div className="flex justify-between mb-1">
                <span className="text-yellow-400 font-medium">
                  Victory in Duel
                </span>
                <span className="text-stone-400 text-sm">2 hours ago</span>
              </div>
              <p className="text-stone-300 text-sm">
                Your warrior Ross of the Glade defeated Diego Frostcaller
              </p>
            </div>

            <div className="p-4 border-b border-stone-700/50">
              <div className="flex justify-between mb-1">
                <span className="text-red-400 font-medium">Defeat in Duel</span>
                <span className="text-stone-400 text-sm">Yesterday</span>
              </div>
              <p className="text-stone-300 text-sm">
                Your warrior Ross of the Glade was defeated by Kate of the Ember
              </p>
            </div>

            <div className="p-4">
              <div className="flex justify-between mb-1">
                <span className="text-yellow-400 font-medium">
                  Practice Complete
                </span>
                <span className="text-stone-400 text-sm">2 days ago</span>
              </div>
              <p className="text-stone-300 text-sm">
                Completed 5 practice matches with Ross of the Glade
              </p>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
