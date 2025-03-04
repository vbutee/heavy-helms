// src/components/home/authenticated-view.tsx
"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { Character } from "@/types/player.types";
import { CTAButton } from "../ui/cta-button";
import { useState, useRef, useEffect } from "react";
import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { PlusIcon } from "lucide-react";
import { BattleSection } from "../battle/battle-section";
import { useInView } from "react-intersection-observer";
import { PlayerProvider } from "@/store/player-context";
import { WarriorSelection } from "../character/warrior-selection";

interface AuthenticatedViewProps {
  characters: Character[];
}

export function AuthenticatedView({ characters }: AuthenticatedViewProps) {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null,
  );
  const battleSectionRef = useRef<HTMLElement>(null);
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.1,
  });
  const [hasBattleInView, setHasBattleInView] = useState(false);

  // Update hasBattleInView state when inView changes
  useEffect(() => {
    setHasBattleInView(inView);
  }, [inView]);

  // Function to select a character
  const handleSelectCharacter = (character: Character) => {
    setSelectedCharacter(character);

    // Add a small delay to allow the UI to update before scrolling
    setTimeout(() => {
      scrollToBattleSection();
    }, 300);
  };

  // Function to deselect a character
  const handleDeselectCharacter = () => {
    setSelectedCharacter(null);
  };

  // Function to scroll to battle section
  const scrollToBattleSection = () => {
    battleSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Set up the ref for the battle section
  useEffect(() => {
    if (battleSectionRef.current) {
      inViewRef(battleSectionRef.current);
    }
  }, [inViewRef]);

  return (
    <PlayerProvider initialCharacters={characters}>
      <div className="max-w-7xl mx-auto">
        <WarriorSelection
          selectedCharacter={selectedCharacter}
          onSelectCharacter={handleSelectCharacter}
          onDeselectCharacter={handleDeselectCharacter}
          characters={characters}
        />

        {/* Scroll indicator - only show when a character is selected and battle section is not in view */}
        {selectedCharacter && !hasBattleInView && (
          <ScrollIndicator onClick={scrollToBattleSection} />
        )}

        <BattleSection
          selectedCharacter={selectedCharacter}
          hasBattleInView={hasBattleInView}
          battleSectionRef={battleSectionRef}
        />
      </div>
      <RecentActivity />
    </PlayerProvider>
  );
}

// ======== Character Selection Components ========

interface WarriorSelectionProps {
  characters: Character[];
  selectedCharacter: Character | null;
  onSelectCharacter: (character: Character) => void;
  onDeselectCharacter: () => void;
  battleSectionRef: React.RefObject<HTMLElement>;
}

interface CharacterCardProps {
  character: Character;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
  onDeselect: () => void;
  onViewDetails: () => void;
}

function CharacterCard({
  character,
  index,
  isSelected,
  onSelect,
  onDeselect,
  onViewDetails,
}: CharacterCardProps) {
  const router = useRouter();

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
          <span className="text-xs font-bold text-yellow-400">
            {character.playerId.substring(character.playerId.length - 2)}
          </span>
        </div>
        {isSelected && (
          <div className="absolute top-2 left-2 w-8 h-8 flex items-center justify-center rounded-full bg-yellow-600/80 border border-yellow-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
              role="img"
              aria-label="Selected"
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
      <div className="p-4">
        <h3 className="text-lg font-bold text-yellow-400 mb-1">
          {character.name}
        </h3>
        <div className="flex justify-between text-xs text-stone-300 mb-2">
          <span>{character.weapon}</span>
          <span>{character.armor}</span>
        </div>
        <div className="mt-3 space-y-2">
          {isSelected ? (
            <div className="flex flex-col space-y-2">
              <div className="flex items-center justify-center space-x-1 py-1.5 bg-gradient-to-r from-yellow-600 to-amber-500 rounded text-white font-medium">
                <span>Selected</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                  role="img"
                  aria-label="Checkmark"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full border-yellow-600/30 text-yellow-400/80 hover:bg-yellow-600/10 text-xs"
                onClick={onDeselect}
              >
                Change Selection
              </Button>
            </div>
          ) : (
            <Button
              className="w-full bg-gradient-to-r from-amber-700 to-yellow-600 hover:from-amber-600 hover:to-yellow-500 text-stone-100"
              onClick={onSelect}
            >
              Select
            </Button>
          )}
          <Button
            variant="outline"
            className="w-full border-yellow-600/30 text-yellow-400 hover:bg-yellow-600/10"
            onClick={onViewDetails}
          >
            View Details
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

interface NewCharacterCardProps {
  delay: number;
  onClick: () => void;
  isCreating: boolean;
  txHash: string | null;
}

function NewCharacterCard({
  delay,
  onClick,
  isCreating,
  txHash,
}: NewCharacterCardProps) {
  return (
    <motion.div
      className={`relative rounded-lg overflow-hidden border-2 border-dashed border-yellow-700/40 bg-gradient-to-b from-black/30 to-black/10 flex flex-col justify-center items-center p-5 h-[320px] cursor-pointer transition-colors hover:bg-black/20 hover:border-yellow-700/60 ${
        isCreating ? "pointer-events-none" : ""
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      onClick={isCreating ? undefined : onClick}
    >
      {isCreating ? (
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-t-2 border-yellow-500 animate-spin" />
            <div className="absolute inset-2 rounded-full border-t-2 border-yellow-300 animate-spin-slow" />
          </div>
          <p className="text-yellow-400 font-medium mt-2 text-center">
            {txHash ? "Creating character..." : "Confirming transaction..."}
          </p>
          {txHash && (
            <a
              href={`https://sepolia.basescan.org/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-400 hover:text-blue-300 underline mt-1"
              onClick={(e) => e.stopPropagation()}
            >
              View in explorer
            </a>
          )}
        </div>
      ) : (
        <>
          <div className="rounded-full bg-yellow-800/20 p-3">
            <PlusIcon className="h-10 w-10 text-yellow-600" strokeWidth={1.5} />
          </div>
          <h3 className="mt-4 text-lg font-medium text-yellow-500">
            Create New Character
          </h3>
          <p className="mt-1 text-sm text-center text-zinc-400">
            Create a new character to join the battle.
          </p>
          <div className="mt-4 text-xs text-zinc-500">0.001 ETH</div>
        </>
      )}
    </motion.div>
  );
}

// ======== Battle Selection Components ========

interface BattleSelectionProps {
  selectedCharacter: Character | null;
  hasBattleInView: boolean;
}

const BattleSelection = React.forwardRef<HTMLElement, BattleSelectionProps>(
  ({ selectedCharacter, hasBattleInView }, ref) => {
    const battleTypes = [
      {
        id: "practice",
        icon: "⚔️",
        title: "Practice Arena",
        description:
          "Hone your skills in risk-free battles. Test strategies and fighting styles without consequence.",
        actionLabel: "Enter Practice",
        route: "/practice",
        available: true,
      },
      {
        id: "duel",
        icon: "🏆",
        title: "Duel Challenge",
        description:
          "Challenge warriors across the realm. Victory brings glory and rewards - defeat leaves scars.",
        actionLabel: "Find Opponent",
        route: "/duel",
        available: false,
      },
      {
        id: "tutorial",
        icon: "📜",
        title: "Warrior Training",
        description:
          "Learn the ways of combat through guided instruction. Master the basics of Heavy Helms.",
        actionLabel: "Begin Training",
        route: "/tutorial",
        available: false,
      },
    ];

    return (
      <section
        ref={ref as React.RefObject<HTMLElement>}
        className="mb-12 scroll-mt-4"
      >
        <SectionHeader
          title="Choose Your Battle"
          subtitle="GLORY AWAITS"
          isActive={!!selectedCharacter}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {battleTypes.map((battleType, index) => (
            <BattleCard
              key={battleType.id}
              battleType={battleType}
              selectedCharacter={selectedCharacter}
              hasBattleInView={hasBattleInView}
              animationDelay={0.3 + index * 0.1}
              contentDelay={0.5 + index * 0.1}
              glowDelay={0.4 + index * 0.1}
            />
          ))}
        </div>
      </section>
    );
  },
);

BattleSelection.displayName = "BattleSelection";

interface BattleCardProps {
  battleType: {
    id: string;
    icon: string;
    title: string;
    description: string;
    actionLabel: string;
    route: string;
    available: boolean;
  };
  selectedCharacter: Character | null;
  hasBattleInView: boolean;
  animationDelay: number;
  contentDelay: number;
  glowDelay: number;
}

function BattleCard({
  battleType,
  selectedCharacter,
  hasBattleInView,
  animationDelay,
  contentDelay,
  glowDelay,
}: BattleCardProps) {
  const router = useRouter();

  const handleAction = () => {
    if (!battleType.available) {
      alert("This battle mode is coming soon!");
      return;
    }

    if (selectedCharacter) {
      router.push(
        `${battleType.route}?player1Id=${selectedCharacter.playerId}&player2Id=2`,
      );
    } else {
      alert("Please select a character first");
    }
  };

  return (
    <motion.div
      className={`bg-gradient-to-b from-amber-900/10 to-stone-900/40 rounded-lg border ${
        selectedCharacter ? "border-yellow-600/40" : "border-yellow-600/20"
      } p-6 relative overflow-hidden`}
      initial={{
        opacity: selectedCharacter ? 0 : 0.5,
        y: selectedCharacter ? 40 : 0,
        scale: selectedCharacter ? 0.97 : 1,
      }}
      animate={{
        opacity: selectedCharacter ? 1 : 0.5,
        y: 0,
        scale: 1,
        transition: {
          duration: 0.5,
          delay: animationDelay,
          ease: "easeOut",
        },
      }}
      whileHover={
        selectedCharacter && battleType.available
          ? { scale: 1.02, borderColor: "rgba(217, 119, 6, 0.4)" }
          : {}
      }
    >
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{
          opacity: hasBattleInView ? 1 : selectedCharacter ? 0.7 : 0.5,
          y: hasBattleInView ? 0 : 10,
          transition: { delay: contentDelay, duration: 0.3 },
        }}
      >
        <div className="text-4xl mb-4">{battleType.icon}</div>
        <h3
          className={`text-2xl font-bold mb-2 transition-all duration-500 ${
            hasBattleInView ? "text-yellow-400" : "text-yellow-400/70"
          }`}
        >
          {battleType.title}
        </h3>
        <p
          className={`mb-6 transition-all duration-500 ${
            hasBattleInView ? "text-stone-300" : "text-stone-400/70"
          }`}
        >
          {battleType.description}
        </p>
        {battleType.available ? (
          <CTAButton
            title={battleType.actionLabel}
            onClick={handleAction}
            size="default"
          />
        ) : (
          <div className="opacity-90 hover:opacity-100 transition-opacity">
            <CTAButton
              title="Coming Soon"
              onClick={handleAction}
              size="default"
            />
          </div>
        )}
      </motion.div>
      {!selectedCharacter && (
        <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center rounded-lg">
          <div className="text-center p-4">
            <span className="text-yellow-400/80 block mb-2">
              Select a character first
            </span>
            <ChevronUp className="h-6 w-6 text-yellow-400/60 mx-auto animate-bounce" />
          </div>
        </div>
      )}
      {!battleType.available && selectedCharacter && (
        <div className="absolute inset-0 bg-stone-900/50 backdrop-blur-[1px] flex items-center justify-center rounded-lg z-20">
          <div className="text-center p-4 max-w-[80%]">
            <div className="inline-block px-3 py-1 bg-yellow-600/70 text-white rounded-full font-semibold mb-3 tracking-wider text-sm">
              COMING SOON
            </div>
            <p className="text-stone-200 text-sm">
              This battle mode is under development and will be available in a
              future update.
            </p>
          </div>
        </div>
      )}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-amber-600/10 to-yellow-600/5"
        initial={{ opacity: 0 }}
        animate={{
          opacity: hasBattleInView ? 0.3 : 0,
          transition: { duration: 0.5, delay: glowDelay },
        }}
      />
    </motion.div>
  );
}

// ======== Recent Activity Component ========

function RecentActivity() {
  return (
    <section className="mb-8">
      <SectionHeader title="Battle Chronicles" subtitle="YOUR SAGA" />
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
  );
}

// ======== Shared Components ========

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  isActive?: boolean;
}

function SectionHeader({
  title,
  subtitle,
  isActive = true,
}: SectionHeaderProps) {
  return (
    <div className="text-center mb-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h2
          className={`text-3xl font-bold tracking-widest mb-1 transition-all duration-500 ${
            isActive
              ? "text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600 uppercase"
              : "text-yellow-500/50 uppercase"
          }`}
        >
          {title}
        </h2>
        <div className="flex items-center justify-center mb-3">
          <div
            className={`h-[1px] w-12 transition-all duration-700 ${
              isActive ? "bg-yellow-600/40" : "bg-yellow-600/10"
            }`}
          />
          <div className="mx-4">
            <span
              className={`text-sm font-medium tracking-widest transition-all duration-700 ${
                isActive ? "text-yellow-400/90" : "text-yellow-400/40"
              }`}
            >
              {subtitle}
            </span>
          </div>
          <div
            className={`h-[1px] w-12 transition-all duration-700 ${
              isActive ? "bg-yellow-600/40" : "bg-yellow-600/10"
            }`}
          />
        </div>
      </motion.div>
    </div>
  );
}

// The ScrollIndicator component - can stay here since it's specific to this view
interface ScrollIndicatorProps {
  onClick: () => void;
}

function ScrollIndicator({ onClick }: ScrollIndicatorProps) {
  return (
    <motion.div
      className="fixed bottom-8 left-0 right-0 z-50 flex justify-center items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      <motion.button
        className="bg-yellow-500/10 backdrop-blur-sm border border-yellow-500/20 text-yellow-500 px-4 py-2 rounded-full flex items-center gap-2 hover:bg-yellow-500/20 transition-all"
        onClick={onClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        View Battle Options <ChevronDown className="h-4 w-4" />
      </motion.button>
    </motion.div>
  );
}
