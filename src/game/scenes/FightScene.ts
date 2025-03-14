import { Scene } from "phaser";
import { EventBus } from "../EventBus";
import { createPlayerAnimations } from "../systems/animation-system";
import { loadCombatBytes } from "../utils/combat-loader";

import { DamageNumbers } from "../objects/DamageNumbers";
// These imports need to use the correct TypeScript file paths
// Using placeholder paths until we find the correct ones
import { CombatAnimator } from "../systems/combat/combat-animator";
import { CombatAudioManager } from "../systems/combat/combat-audio-manager";
import { CombatSequenceHandler } from "../systems/combat/combat-sequence-handler";
import { DebugHealthManager } from "../systems/combat/debug-health-manager";
import { HealthManager } from "../systems/combat/health-manager";
import { VictoryHandler } from "../systems/combat/victory-handler";
import { PlayerStatsDisplay } from "../ui/PlayerStatsDisplay";

interface PlayerStats {
  strength: number;
  constitution: number;
  size: number;
  agility: number;
  stamina: number;
  luck: number;
  skinIndex: number;
  skinTokenId: number;
  firstNameIndex: number;
  surnameIndex: number;
  wins: number;
  losses: number;
  kills: number;
  weapon?: string;
  armor?: string;
  stance?: string;
}

interface PlayerData {
  id: string;
  name: string;
  stats: PlayerStats;
  spritesheetUrl: string;
  jsonData: Record<string, unknown>;
}

interface CombatData {
  actions: CombatAction[];
  winner: string;
  condition: string;
  gameEngineVersion: number;
}

interface CombatAction {
  // Define properties based on actual combat actions
  actor: string;
  target: string;
  type: string;
  damage?: number;
  critical?: boolean;
  dodged?: boolean;
  blocked?: boolean;
  countered?: boolean;
  // Add other properties as needed
}

interface TextStyles {
  mainText: Phaser.GameObjects.Text;
  shadowText: Phaser.GameObjects.Text;
  metalGradient: Phaser.GameObjects.Text;
}

interface CombatBytes {
  actions: CombatAction[];
  winner: string;
  condition: string;
  gameEngineVersion: number;
}

interface SceneData {
  player1Id: string;
  player2Id: string;
  player1Data: PlayerData;
  player2Data: PlayerData;
  player1Name: string;
  player2Name: string;
  network: string;
  blockNumber: string;
  txId: string;
  combatBytes: CombatBytes; // Now properly typed
}

export class FightScene extends Scene {
  // Scene data
  private player1Id = "1";
  private player2Id = "2";
  private player1Data?: PlayerData;
  private player2Data?: PlayerData;
  private network = "mainnet";
  private blockNumber = "0";
  private txId = "Practice";
  private combatBytesFromTx?: CombatBytes; // Now properly typed
  private gameMode = "practice";

  // Game objects
  private player?: Phaser.Physics.Arcade.Sprite;
  private player2?: Phaser.Physics.Arcade.Sprite;
  private combatData?: CombatData;
  private countdownText?: Phaser.GameObjects.Text;
  private networkText?: Phaser.GameObjects.Text;
  private txIdText?: Phaser.GameObjects.Text;
  private backgroundMusic?: Phaser.Sound.BaseSound;

  // Scene managers
  private healthManager?: HealthManager | DebugHealthManager;
  private animator?: CombatAnimator;
  private sequenceHandler?: CombatSequenceHandler;
  private damageNumbers?: DamageNumbers;
  private victoryHandler?: VictoryHandler;
  private audioManager?: CombatAudioManager;
  private player1Stats?: PlayerStatsDisplay;
  private player2Stats?: PlayerStatsDisplay;

  // Game state
  private isInitialized = false;
  private isFightSequencePlaying = false;
  private playerStartX = 0;
  private player2StartX = 0;
  private centerX = 0;
  private fKey?: Phaser.Input.Keyboard.Key;
  private rKey?: Phaser.Input.Keyboard.Key;
  private winCondition?: string;
  private winner = false;

  // Combat timing constants
  private SEQUENCE_DELAY = 1500;
  private COUNTER_DELAY = 750;
  private INITIAL_DELAY = 500;
  private USE_DEBUG = false;

  // UI Configurations
  private countdownConfig = {
    fontSize: "120px",
    fontFamily: "Bokor",
    color: "#ffffff",
    stroke: "#000000",
    strokeThickness: 8,
    duration: 750,
    scale: { from: 2, to: 0.5 },
    alpha: { from: 1, to: 0 },
  };

  private titleTextConfig = {
    main: {
      fontFamily: "Bokor",
      fontSize: "140px",
      color: "#ffd700",
      stroke: "#8b0000",
      strokeThickness: 12,
      shadow: {
        offsetX: 2,
        offsetY: 2,
        color: "#000000",
        blur: 5,
        fill: true,
        stroke: true,
      },
    },
    shadow: {
      fontFamily: "Bokor",
      fontSize: "144px",
      color: "#000000",
      alpha: 0.7,
    },
    metallic: {
      fontFamily: "Bokor",
      fontSize: "140px",
      color: "#ffffff",
    },
  };

  constructor() {
    super({ key: "FightScene" });
  }

  init(data: SceneData) {
    // Guard against multiple initializations
    if (this.isInitialized) {
      return;
    }
    this.isInitialized = true;

    this.player1Id = data.player1Id;
    this.player2Id = data.player2Id;
    this.gameMode = data.txId === "Practice" ? "practice" : "duel";
    this.player1Data = data.player1Data;
    this.player2Data = data.player2Data;
    this.combatBytesFromTx = data.combatBytes;
    this.network = data.network;
    this.blockNumber = data.blockNumber;
    this.txId = data.txId;
  }

  preload() {
    // Load any additional assets - most should already be loaded in Preloader

    // Error handling for asset loading
    this.load.on("loaderror", (fileObj: any) => {
      // Handle load error silently
      console.error("Error loading asset:", fileObj);
    });
  }

  async create(data: SceneData) {
    // Initialize audio manager first, before other setup
    this.audioManager = new CombatAudioManager(this);

    // Initialize combat audio
    await this.audioManager.init();

    // Now safe to play background music
    this.backgroundMusic = this.sound.add("fight-music", {
      loop: true,
      volume: 0.15,
    });
    this.backgroundMusic.play();

    // Start countdown
    this.countdownText = this.add
      .text(this.cameras.main.centerX, this.cameras.main.centerY - 50, "3", {
        fontFamily: "Montserrat",
        fontSize: "64px",
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 6,
      })
      .setOrigin(0.5);

    let count = 3;
    const countdownInterval = setInterval(() => {
      count--;
      if (count > 0) {
        this.countdownText?.setText(count.toString());
      } else {
        clearInterval(countdownInterval);
        this.countdownText?.destroy();
        // Start the fight sequence
        this.startFightSequence();
      }
    }, 1000);

    // 1. Scene Setup - Background Layers
    const layers = [
      { key: "sky", depth: 0, alpha: 0.75 },
      { key: "bg-decor", depth: 1, alpha: 0.75 },
      { key: "middle-decor", depth: 2, alpha: 0.8 },
      { key: "foreground", depth: 3, alpha: 0.65 },
      { key: "ground-01", depth: 4, alpha: 1 },
    ];

    // Clear any existing game objects first
    this.children.removeAll();

    for (const layer of layers) {
      this.add
        .image(0, 0, layer.key)
        .setOrigin(0, 0)
        .setScale(0.5)
        .setDepth(layer.depth)
        .setAlpha(layer.alpha);
    }

    // 2. Player Setup
    const groundY = 600;
    this.player = this.physics.add
      .sprite(125, groundY - 40, `player${this.player1Id}`)
      .setFlipX(false)
      .setOrigin(0.5, 1)
      .setDisplaySize(300, 300)
      .setDepth(5);

    this.player2 = this.physics.add
      .sprite(835, groundY - 40, `player${this.player2Id}`)
      .setFlipX(true)
      .setOrigin(0.5, 1)
      .setDisplaySize(300, 300)
      .setDepth(5);

    // 3. Animation Setup
    if (this.player1Data?.jsonData) {
      const texture1 = this.textures.get(`player${this.player1Id}`);
      if (texture1) {
        texture1.get("__BASE").customData = this.player1Data.jsonData;
      }
    }

    if (this.player2Data?.jsonData) {
      const texture2 = this.textures.get(`player${this.player2Id}`);
      if (texture2) {
        texture2.get("__BASE").customData = this.player2Data.jsonData;
      }
    }

    createPlayerAnimations(this, `player${this.player1Id}`);
    createPlayerAnimations(this, `player${this.player2Id}`, true);

    // 4. Manager Initialization
    this.healthManager = this.USE_DEBUG
      ? // biome-ignore lint/style/noNonNullAssertion: <explanation>
        new DebugHealthManager(this, this.player1Data!, this.player2Data)
      : new HealthManager(this);
    this.healthManager.createBars();
    this.animator = new CombatAnimator(this);
    this.sequenceHandler = new CombatSequenceHandler(this);
    this.damageNumbers = new DamageNumbers(this);
    this.victoryHandler = new VictoryHandler(this);

    // 5. Initial Animations
    this.player.play("idle");
    this.player2.play("idle2");

    // 6. Combat Setup
    try {
      let combatData;
      if (this.combatBytesFromTx) {
        // Use combat data from transaction for duel mode
        combatData = this.combatBytesFromTx;
        if (!combatData || !combatData.actions) {
          throw new Error("Invalid combat data from transaction");
        }
      } else {
        // Load combat data from practice game for practice mode
        combatData = await loadCombatBytes(this.player1Id, this.player2Id);
      }
      this.combatData = combatData;

      // Store initial positions and setup keyboard
      this.playerStartX = this.player.x;
      this.player2StartX = this.player2.x;
      this.centerX = this.cameras.main.centerX;
      this.fKey = this.input.keyboard.addKey("F");
      this.rKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
      this.isFightSequencePlaying = false;
    } catch (error) {
      // Handle error silently
      console.error("Error setting up combat:", error);
    }

    // 7. Event Setup
    this.events.once("fightComplete", () => {
      if (this.combatData && this.player && this.player2) {
        this.victoryHandler?.handleVictory(
          this.combatData.winner,
          this.player,
          this.player2,
        );
      }
    });

    // Add network and block number text in the bottom left (single line)
    this.networkText = this.add
      .text(
        5,
        this.cameras.main.height - 5,
        `Network: ${this.network} | Block#: ${this.blockNumber} | GameEngine: v${Math.floor((this.combatData?.gameEngineVersion || 0) / 100)}.${(this.combatData?.gameEngineVersion || 0) % 100}`,
        {
          fontFamily: "Arial",
          fontSize: "10px",
          color: "#cccccc",
          align: "left",
        },
      )
      .setOrigin(0, 1)
      .setDepth(100);

    // Add transaction ID text in the bottom right
    this.txIdText = this.add
      .text(
        this.cameras.main.width - 5,
        this.cameras.main.height - 5,
        `Transaction: ${this.txId}`,
        {
          fontFamily: "Arial",
          fontSize: "10px",
          color: "#cccccc",
          align: "right",
        },
      )
      .setOrigin(1, 1)
      .setDepth(100);

    // Create player stats displays immediately but don't show them yet
    this.player1Stats = new PlayerStatsDisplay(this, 10, 160, false);
    this.player2Stats = new PlayerStatsDisplay(
      this,
      this.cameras.main.width - 150,
      160,
      true,
    );

    // Update stats but don't show yet
    if (this.player1Data) this.player1Stats.update(this.player1Data);
    if (this.player2Data) this.player2Stats.update(this.player2Data);

    // Inform any listeners that the scene is ready
    EventBus.emit("current-scene-ready", this);
  }

  // Game State Management
  update() {
    if (!this.rKey) return;

    if (Phaser.Input.Keyboard.JustDown(this.rKey)) {
      this.resetFight();
    }

    if (!this.player || !this.player2) return;

    // Dynamic depth adjustment
    if (
      this.player.anims?.currentAnim?.key === "attacking" ||
      this.player.anims?.currentAnim?.key === "blocking"
    ) {
      this.player.setDepth(6);
      this.player2.setDepth(5);
    } else if (
      this.player2.anims?.currentAnim?.key === "attacking2" ||
      this.player2.anims?.currentAnim?.key === "blocking2"
    ) {
      this.player2.setDepth(6);
      this.player.setDepth(5);
    } else {
      this.player.setDepth(5);
      this.player2.setDepth(5);
    }

    if (this.fKey?.isDown && !this.isFightSequencePlaying) {
      this.startFightSequence();
    }
  }

  // Combat Sequence Methods
  startFightSequence() {
    if (this.isFightSequencePlaying || !this.player || !this.player2) {
      // Handle error silently
      return;
    }
    this.isFightSequencePlaying = true;

    this.startCountdown().then(() => {
      if (!this.player || !this.player2) return;

      // Initial run to center
      this.animator?.playAnimation(this.player, "running");
      this.animator?.playAnimation(this.player2, "running", true);

      // Move players to center and show stats during the run
      this.tweens.add({
        targets: this.player,
        x: this.centerX - 75,
        duration: 1000,
        onStart: () => {
          this.time.delayedCall(300, () => {
            this.player1Stats?.show();
          });
        },
        onComplete: () => {
          this.animator?.playAnimation(this.player, "idle");
        },
      });

      this.tweens.add({
        targets: this.player2,
        x: this.centerX + 75,
        duration: 1000,
        onStart: () => {
          this.time.delayedCall(300, () => {
            this.player2Stats?.show();
          });
        },
        onComplete: () => {
          this.animator?.playAnimation(this.player2, "idle", true);
          if (this.combatData?.actions) {
            this.time.delayedCall(500, () => {
              this.playCombatSequence(0);
            });
          }
        },
      });
    });
  }

  playCombatSequence(actionIndex: number) {
    if (!this.combatData?.actions) return;

    const action = this.combatData.actions[actionIndex];
    const isLastAction = actionIndex === this.combatData.actions.length - 1;

    // Set win condition and winner for the last action
    if (isLastAction) {
      this.winCondition = this.combatData.condition;
      this.winner = this.combatData.winner === this.player1Id;
    }

    this.sequenceHandler?.handleSequence(action, isLastAction);

    this.events.once("sequenceComplete", (isLast: boolean) => {
      if (!isLast) {
        this.time.delayedCall(this.SEQUENCE_DELAY, () => {
          this.playCombatSequence(actionIndex + 1);
        });
      }
    });
  }

  resetFight() {
    if (!this.player || !this.player2) return;

    this.isFightSequencePlaying = false;

    // Reset players to initial positions
    this.player.x = this.playerStartX;
    this.player2.x = this.player2StartX;

    // Reset animations
    this.animator?.playAnimation(this.player, "idle");
    this.animator?.playAnimation(this.player2, "idle", true);

    // Clear any ongoing tweens
    this.tweens.killAll();

    // Start a new sequence
    this.time.delayedCall(500, () => {
      this.startFightSequence();
    });
  }

  // UI Helper Methods
  startCountdown(): Promise<void> {
    return new Promise((resolve) => {
      const numbers = ["3", "2", "1", "Fight!"];
      let index = 0;

      const showNumber = () => {
        if (index >= numbers.length) {
          resolve();
          return;
        }

        const number = numbers[index];
        const scale = number === "Fight!" ? 1.25 : 2;
        const texts = this.createStyledText(
          this.cameras.main.centerX,
          this.cameras.main.centerY,
          number,
          scale,
        );

        // Set initial state
        for (const text of [
          texts.shadowText,
          texts.mainText,
          texts.metalGradient,
        ]) {
          text.setAlpha(0);
          text.setDepth(100);
        }

        if (number === "Fight!") {
          // Special animation for "Fight!"
          this.tweens.add({
            targets: [texts.shadowText, texts.mainText, texts.metalGradient],
            alpha: {
              from: 0,
              to: (target: any) =>
                target === texts.metalGradient
                  ? 0.3
                  : target === texts.shadowText
                    ? 0.7
                    : 1,
            },
            scale: {
              from: scale * 1.5,
              to: scale,
            },
            duration: 500,
            ease: "Back.out",
            onComplete: () => {
              this.time.delayedCall(750, () => {
                this.tweens.add({
                  targets: [
                    texts.shadowText,
                    texts.mainText,
                    texts.metalGradient,
                  ],
                  alpha: 0,
                  scale: scale * 0.8,
                  duration: 500,
                  ease: "Power2",
                  onComplete: () => {
                    texts.shadowText.destroy();
                    texts.mainText.destroy();
                    texts.metalGradient.destroy();
                    index++;
                    showNumber();
                  },
                });
              });
            },
          });
        } else {
          // Numbers animation
          this.tweens.add({
            targets: [texts.shadowText, texts.mainText, texts.metalGradient],
            alpha: {
              from: 0,
              to: (target: any) =>
                target === texts.metalGradient
                  ? 0.3
                  : target === texts.shadowText
                    ? 0.7
                    : 1,
            },
            scale: {
              from: scale * 1.5,
              to: scale * 0.5,
            },
            duration: this.countdownConfig.duration,
            ease: "Power2",
            onComplete: () => {
              texts.shadowText.destroy();
              texts.mainText.destroy();
              texts.metalGradient.destroy();
              index++;
              showNumber();
            },
          });
        }
      };

      showNumber();
    });
  }

  createStyledText(x: number, y: number, text: string, scale = 1): TextStyles {
    const shadowText = this.add
      .text(x + 4, y, text, this.titleTextConfig.shadow)
      .setOrigin(0.5)
      .setScale(scale);

    const mainText = this.add
      .text(x, y, text, this.titleTextConfig.main)
      .setOrigin(0.5)
      .setScale(scale);

    const metalGradient = this.add
      .text(x, y, text, this.titleTextConfig.metallic)
      .setOrigin(0.5)
      .setAlpha(0.3)
      .setScale(scale);

    return { shadowText, mainText, metalGradient };
  }

  startVictorySequence(
    winner: Phaser.Physics.Arcade.Sprite,
    playerType: string,
  ) {
    const isPlayer2 = playerType === "player2";
    const suffix = isPlayer2 ? "2" : "";
    const originalX = winner.x;

    const walkDistance = 300;
    const walkDuration = 3000;
    const finalPosition = isPlayer2
      ? originalX + walkDistance
      : originalX - walkDistance;
    const halfwayPoint = isPlayer2
      ? originalX + walkDistance / 2
      : originalX - walkDistance / 2;

    this.time.delayedCall(1000, () => {
      winner.setFlipX(!isPlayer2);

      // Use the existing walking animation configuration
      this.animator?.playAnimation(winner, "walking", isPlayer2);

      const sequence = [
        {
          targets: winner,
          x: halfwayPoint,
          duration: walkDuration / 2,
          ease: "Linear",
        },
        {
          targets: winner,
          x: halfwayPoint,
          duration: 800,
          onStart: () => {
            this.animator?.playAnimation(winner, "dodging", isPlayer2);
          },
          onComplete: () => {
            // Resume walking animation using existing configuration
            this.animator?.playAnimation(winner, "walking", isPlayer2);
          },
        },
        {
          targets: winner,
          x: finalPosition,
          duration: walkDuration / 2,
          ease: "Linear",
          onComplete: () => {
            this.animator?.playAnimation(winner, "idle", isPlayer2);
            this.time.delayedCall(500, () => {
              this.playTauntSequence(winner, suffix);
            });
          },
        },
      ];

      this.tweens.chain({
        tweens: sequence,
      });
    });
  }

  // Simplified taunt sequence
  playTauntSequence(
    winner: Phaser.Physics.Arcade.Sprite,
    suffix: string,
    count = 0,
  ) {
    if (count >= 3) {
      this.animator?.playAnimation(winner, "idle", suffix === "2");
      return;
    }

    this.animator?.playAnimation(winner, "taunting", suffix === "2");
    winner.once("animationcomplete", () => {
      this.animator?.playAnimation(winner, "idle", suffix === "2");
      this.time.delayedCall(800, () => {
        this.playTauntSequence(winner, suffix, count + 1);
      });
    });
  }

  shutdown() {
    if (this.backgroundMusic) {
      this.backgroundMusic.stop();
    }

    // Reset initialization flag
    this.isInitialized = false;

    // Clean up any running animations, tweens, etc.
    this.tweens.killAll();
    this.time.removeAllEvents();
    this.sound.removeAll();

    // Clear all game objects
    this.children.removeAll();

    // Reset any class properties
    this.audioManager = undefined;
    this.animator = undefined;
    this.sequenceHandler = undefined;
    this.healthManager = undefined;
    this.damageNumbers = undefined;
    this.victoryHandler = undefined;
  }
}
