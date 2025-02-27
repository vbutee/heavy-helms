import { Boot } from './scenes/Boot';
import { GameOver } from './scenes/GameOver';
import { Game as MainGame } from './scenes/Game';
import { MainMenu } from './scenes/MainMenu';
import { AUTO, Game } from 'phaser';
import { Preloader } from './scenes/Preloader';
import { EventBus } from './EventBus';

// Game configuration interface
interface GameConfig {
    player1Id?: string;
    player2Id?: string;
}

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    width: 1024,
    height: 768,
    parent: 'game-container',
    backgroundColor: '#028af8',
    scene: [
        Boot,
        Preloader,
        MainMenu,
        MainGame,
        GameOver
    ]
};

const StartGame = (parent: string, gameConfig?: GameConfig) => {
    // Store player IDs in a global registry for access across scenes
    if (gameConfig?.player1Id) {
        EventBus.emit('set-player1-id', gameConfig.player1Id);
    }
    
    if (gameConfig?.player2Id) {
        EventBus.emit('set-player2-id', gameConfig.player2Id);
    }

    return new Game({ ...config, parent });
}

export default StartGame;
