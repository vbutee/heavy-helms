import type { GameConfig } from "@/types/game.types";
import { AUTO, Game, type Types } from "phaser";
import { Boot } from "../scenes/boot";
import { Game as MainGame } from "../scenes/game";
import { GameOver } from "../scenes/game-over";
import { MainMenu } from "../scenes/main-menu";
import { Preloader } from "../scenes/preloader";

// Phaser game configuration
const phaserConfig: Types.Core.GameConfig = {
  type: AUTO,
  width: 1024,
  height: 768,
  parent: "game-container",
  backgroundColor: "#028af8",
  scene: [Boot, Preloader, MainMenu, MainGame, GameOver],
};

// Function to start the game
function startGame(parent: string, gameConfig?: GameConfig): Game {
  return new Game({ ...phaserConfig, parent });
}

export default startGame;
