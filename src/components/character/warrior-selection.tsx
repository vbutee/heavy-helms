"use client";

import { CharacterCard } from "./character-card";
import { NewCharacterCard } from "./new-character-card";
import { useRef } from "react";
import type { Character } from "@/types/player.types";
import { useRouter } from "next/navigation";
import { usePlayer } from "@/store/player-context";
import { SectionHeader } from "../ui/section-header";

interface WarriorSelectionProps {
  characters: Character[];
  selectedCharacter: Character | null;
  onSelectCharacter: (character: Character) => void;
  onDeselectCharacter: () => void;
}

export function WarriorSelection({
  characters,
  selectedCharacter,
  onSelectCharacter,
  onDeselectCharacter,
}: WarriorSelectionProps) {
  const router = useRouter();
  const characterListRef = useRef<HTMLDivElement>(null);
  const { createCharacter, isCreatingCharacter, txHash } = usePlayer();

  const handleViewDetails = (character: Character) => {
    router.push(`/character/${character.playerId}`);
  };

  return (
    <section className="mt-8 md:mt-12">
      <SectionHeader
        title="Warriors"
        subtitle="Select your warrior to enter the battles"
      />

      <div
        ref={characterListRef}
        className="flex space-x-4 md:space-x-6 mt-4 overflow-x-auto pb-4 snap-x"
      >
        {characters.map((character, index) => (
          <CharacterCard
            key={character.playerId}
            character={character}
            index={index}
            isSelected={selectedCharacter?.playerId === character.playerId}
            onSelect={() => onSelectCharacter(character)}
            onDeselect={onDeselectCharacter}
            onViewDetails={() => handleViewDetails(character)}
          />
        ))}

        {/* Character Creation Card */}
        <NewCharacterCard
          delay={characters.length}
          onClick={createCharacter}
          isCreating={isCreatingCharacter}
          txHash={txHash}
        />
      </div>
    </section>
  );
}
