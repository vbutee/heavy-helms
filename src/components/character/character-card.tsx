import type { Character } from "@/types/player.types";
import { Bokor } from "next/font/google";
import Image from "next/image";
import React from "react";

const bokor = Bokor({
  weight: "400",
  subsets: ["latin"],
});

interface CharacterCardProps {
  character: Character;
  isSelected?: boolean;
  onSelect: () => void;
}

function CharacterCard({
  character,
  isSelected = false,
  onSelect,
}: CharacterCardProps) {
  const {
    name,
    imageUrl,
    stance,
    weapon,
    armor,
    strength,
    constitution,
    size,
    agility,
    stamina,
    luck,
  } = character;

  // Define stance styles
  const stanceStyles = {
    offensive: "text-red-400",
    defensive: "text-green-400",
    balanced: "text-blue-400",
  };

  // Define weapon icons (using unicode symbols)
  const getWeaponIcon = (weapon: string) => {
    if (weapon.includes("Sword")) return "⚔️";
    if (weapon.includes("Mace")) return "🔨";
    if (weapon.includes("Greatsword")) return "🗡️";
    if (weapon.includes("Battleaxe")) return "🪓";
    if (weapon.includes("Quarterstaff")) return "🥢";
    if (weapon.includes("Spear")) return "🔱";
    return "⚔️";
  };

  // Define armor icons
  const getArmorIcon = (armor: string) => {
    if (armor === "Plate") return "🛡️";
    if (armor === "Chain") return "⛓️";
    if (armor === "Leather") return "🧥";
    if (armor === "Cloth") return "👕";
    return "🛡️";
  };

  return (
    <div
      className={`relative rounded-lg overflow-hidden transition-all duration-300 cursor-pointer ${
        isSelected
          ? "ring-4 ring-amber-500 shadow-lg transform scale-105"
          : "hover:shadow-md hover:scale-102"
      }`}
      onClick={onSelect}
    >
      <div className="bg-gradient-to-b from-amber-800 to-amber-950 text-white">
        {/* Character Image */}
        <div className="relative h-64 overflow-hidden">
          <Image
            src={imageUrl}
            alt={name}
            fill
            style={{ objectFit: "cover" }}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-amber-950 to-transparent opacity-70"></div>
        </div>

        {/* Character Info */}
        <div className="p-4">
          <h3 className={`${bokor.className} text-2xl mb-2 text-amber-300`}>
            {name}
          </h3>

          <div className="flex justify-between mb-4">
            <div>
              <span
                className={`inline-block px-3 py-1 rounded-full bg-amber-950 ${stanceStyles[stance]}`}
              >
                {stance.charAt(0).toUpperCase() + stance.slice(1)}
              </span>
            </div>
            <div className="flex space-x-2">
              <span
                title={weapon}
                className="inline-block px-2 py-1 bg-amber-900 rounded-md"
              >
                {getWeaponIcon(weapon)} {weapon}
              </span>
              <span
                title={armor}
                className="inline-block px-2 py-1 bg-amber-900 rounded-md"
              >
                {getArmorIcon(armor)} {armor}
              </span>
            </div>
          </div>

          {/* Attributes */}
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-amber-400">STR:</span>
              <span>{strength}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-amber-400">CON:</span>
              <span>{constitution}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-amber-400">SIZE:</span>
              <span>{size}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-amber-400">AGI:</span>
              <span>{agility}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-amber-400">STAM:</span>
              <span>{stamina}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-amber-400">LUCK:</span>
              <span>{luck}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Selected indicator */}
      {isSelected && (
        <div className="absolute top-2 right-2 bg-amber-500 text-amber-950 rounded-full p-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      )}
    </div>
  );
}

export default CharacterCard;
