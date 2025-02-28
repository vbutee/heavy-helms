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
    <section className="relative py-20">
      {/* Dark overlay with textured base */}
      <div className="absolute inset-0 bg-stone-900/75" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-r from-amber-700/20 via-yellow-600/40 to-amber-700/20" />
      <div className="absolute bottom-0 left-0 w-full h-4 bg-gradient-to-r from-amber-700/20 via-yellow-600/40 to-amber-700/20" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Decorative shield icon */}
        {/* <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-yellow-600/30 rotate-45 flex items-center justify-center">
            <div className="w-12 h-12 bg-stone-900 rotate-[-45deg] flex items-center justify-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="w-8 h-8 text-yellow-400/80"
                aria-hidden="true"
                role="img"
                aria-label="Shield Icon"
              >
                <path d="M12.378 1.602a.75.75 0 00-.756 0L3 6.632l9 5.25 9-5.25-8.622-5.03zM21.75 7.93l-9 5.25v9l8.628-5.032a.75.75 0 00.372-.648V7.93zM11.25 22.18v-9l-9-5.25v8.57a.75.75 0 00.372.648l8.628 5.033z" />
              </svg>
            </div>
          </div>
        </div> */}
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600 uppercase tracking-widest mb-2">
              Forge Your Legend
            </h2>
            <div className="flex items-center justify-center mb-6">
              <div className="h-[1px] w-16 bg-yellow-600/40" />
              <div className="mx-4">
                <span className="text-yellow-400/90 text-sm font-medium tracking-widest">WARRIORS AWAIT</span>
              </div>
              <div className="h-[1px] w-16 bg-yellow-600/40" />
            </div>
            <p className="text-stone-200 text-lg max-w-2xl mx-auto leading-relaxed">
              Ancient warriors, seasoned by battle and blessed by forgotten gods, stand ready for your command. 
              Each champion carries centuries of martial wisdom and arcane might. 
              Choose wisely, for your destiny in the Heavy Helms arena is bound to theirs.
            </p>
          </motion.div>
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
        <div className="mt-20 text-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <button
              type="button"
              className="bg-gradient-to-b from-amber-700/40 to-stone-900/80 backdrop-blur-sm px-10 py-5 rounded border border-yellow-600/30 shadow-lg group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/0 via-yellow-400/20 to-yellow-600/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <span className="text-yellow-400/90 text-lg font-bold uppercase tracking-widest group-hover:text-yellow-300 relative z-10">
                Claim Your Destiny
              </span>
            </button>
          </motion.div>
          <p className="text-stone-400 text-sm mt-4 italic">Connect wallet to enter the arena</p>
        </div>
      </div>
    </section>
  );
}
