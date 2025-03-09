"use client";

import { Button } from "@/components/ui/button";
import type { Character } from "@/types/player.types";
import { motion } from "framer-motion";
import Image from "next/image";

interface CharacterCardProps {
  character: Character;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
  onDeselect: () => void;
  onViewDetails: () => void;
}

export function CharacterCard({
  character,
  index,
  isSelected,
  onSelect,
  onDeselect,
  onViewDetails,
}: CharacterCardProps) {
  return (
    <motion.div
      className={`min-w-[220px] bg-gradient-to-b from-amber-900/20 to-stone-900/40 rounded-lg ${
        isSelected
          ? "border-2 border-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.3)]"
          : "border border-yellow-600/30"
      } overflow-hidden snap-start transition-all duration-300`}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: isSelected ? 1.03 : 1,
      }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{
        scale: isSelected ? 1.03 : 1.02,
        borderColor: isSelected ? "rgba(234,179,8,1)" : "rgba(217,119,6,0.5)",
      }}
    >
      <div className="aspect-square relative bg-gradient-to-b from-stone-800/30 to-stone-900/30 overflow-hidden">
        <Image
          src={
            character.imageUrl ||
            `/assets/characters/warrior_${
              (Number.parseInt(character.playerId) % 5) + 1
            }.png`
          }
          alt={`Character ${character.name}`}
          width={300}
          height={300}
          className="object-cover"
          priority
        />
        <div className="absolute top-3 left-3 bg-black/50 px-2 py-1 rounded text-xs font-semibold backdrop-blur-sm text-yellow-500">
          ID: {character.playerId}
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-medium text-lg text-yellow-500">
          {character.name}
        </h3>
        <div className="mt-1 text-xs space-y-1 text-zinc-400">
          <div className="flex justify-between">
            <span>Strength</span>
            <span className="text-white">{character.strength}</span>
          </div>
          <div className="flex justify-between">
            <span>Agility</span>
            <span className="text-white">{character.agility}</span>
          </div>
          <div className="flex justify-between">
            <span>Stamina</span>
            <span className="text-white">{character.stamina}</span>
          </div>
        </div>

        <div className="mt-4 flex space-x-2">
          {isSelected ? (
            <Button
              variant="outline"
              size="sm"
              className="border-yellow-700/50 hover:border-yellow-700 hover:bg-yellow-900/30 text-yellow-500"
              onClick={onDeselect}
            >
              Deselect
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="border-yellow-700/50 hover:border-yellow-700 hover:bg-yellow-900/30 text-yellow-500"
              onClick={onSelect}
            >
              Select
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            className="border-yellow-700/50 hover:border-yellow-700 hover:bg-yellow-900/30 text-yellow-500"
            onClick={onViewDetails}
          >
            Details
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
