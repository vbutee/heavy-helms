// src/components/home/character-gallery.tsx
"use client";
import { motion } from "framer-motion";
import CharacterCard from "../CharacterCard";
import type { Character } from "@/types/player.types";

interface CharacterGalleryProps {
  characters: Character[];
}

export function CharacterGallery({ characters }: CharacterGalleryProps) {
  return (
    <section className="relative py-16">
      {/* Dark overlay with stone base - matching footer background */}
      <div className="absolute inset-0 bg-stone-900/75" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-yellow-400/80 uppercase tracking-widest mb-4">
            Choose Your Champion
          </h2>
          <p className="text-stone-200 text-lg max-w-2xl mx-auto">
            Discover unique warriors with distinct fighting styles, weapons, and
            abilities. Each character brings their own strengths to the
            battlefield.
          </p>
        </div>

        {/* Character Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {characters.map((character, index) => (
            <motion.div
              key={character.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="transform transition-transform hover:scale-[1.02]"
            >
              <CharacterCard
                name={character.name}
                imageUrl={character.imageUrl}
                stance={character.stance}
                weapon={character.weapon}
                armor={character.armor}
                strength={character.strength}
                constitution={character.constitution}
                size={character.size}
                agility={character.agility}
                stamina={character.stamina}
                luck={character.luck}
                onSelect={() => {}}
              />
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <button
            type="button"
            className="bg-gradient-to-b from-stone-800/60 to-stone-900/60 backdrop-blur-sm px-8 py-4 rounded border border-stone-600/30 shadow-lg transform transition-all duration-200 hover:scale-105 group"
          >
            <span className="text-yellow-400/80 text-lg font-bold uppercase tracking-widest group-hover:text-yellow-300">
              Connect Wallet to Start Playing
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
