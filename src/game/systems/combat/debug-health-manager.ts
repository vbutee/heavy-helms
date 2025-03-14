import type { Scene } from "phaser";

interface PlayerStats {
  maxHealth: number;
  maxEndurance: number;
}

interface Player {
  stats: PlayerStats;
}

interface BarConfig {
  width: number;
  staminaWidth: number;
  height: number;
  staminaHeight: number;
  padding: number;
  y: number;
  p1x: number;
  p2x: number;
}

interface PlayerBars {
  health: number;
  maxHealth: number;
  stamina: number;
  maxStamina: number;
}

interface TweenObjects {
  p1Health: Phaser.Tweens.Tween | null;
  p2Health: Phaser.Tweens.Tween | null;
  p1Stamina: Phaser.Tweens.Tween | null;
  p2Stamina: Phaser.Tweens.Tween | null;
  duration: number;
}

export class DebugHealthManager {
  private scene: Scene;
  private player1: Player;
  private player2: Player;
  private p1MaxHealth: number;
  private p2MaxHealth: number;
  private p1CurrentHealth: number;
  private p2CurrentHealth: number;
  private p1MaxEndurance: number;
  private p2MaxEndurance: number;
  private p1CurrentEndurance: number;
  private p2CurrentEndurance: number;
  private barConfig: BarConfig;
  private p1Bars: PlayerBars;
  private p2Bars: PlayerBars;
  private debugGraphics: Phaser.GameObjects.Graphics | null;
  private tweens: TweenObjects;
  private healthText: Phaser.GameObjects.Text[] = [];

  constructor(scene: Scene, player1: Player, player2: Player) {
    this.scene = scene;
    this.player1 = player1;
    this.player2 = player2;
    this.p1MaxHealth = player1.stats.maxHealth;
    this.p2MaxHealth = player2.stats.maxHealth;
    this.p1CurrentHealth = this.p1MaxHealth;
    this.p2CurrentHealth = this.p2MaxHealth;
    this.p1MaxEndurance = player1.stats.maxEndurance;
    this.p2MaxEndurance = player2.stats.maxEndurance;
    this.p1CurrentEndurance = this.p1MaxEndurance;
    this.p2CurrentEndurance = this.p2MaxEndurance;
    this.barConfig = {
      width: 400,
      staminaWidth: 300,
      height: 30,
      staminaHeight: 20,
      padding: 2,
      y: 20,
      p1x: scene.cameras.main.centerX - 420,
      p2x: scene.cameras.main.centerX + 20,
    };

    this.p1Bars = {
      health: 0,
      maxHealth: 0,
      stamina: 0,
      maxStamina: 0,
    };

    this.p2Bars = {
      health: 0,
      maxHealth: 0,
      stamina: 0,
      maxStamina: 0,
    };

    this.debugGraphics = null;

    // Add tweening properties
    this.tweens = {
      p1Health: null,
      p2Health: null,
      p1Stamina: null,
      p2Stamina: null,
      duration: 500, // Duration of health/stamina change animation
    };
    this.setupHealthBars();
  }

  setupHealthBars(): void {
    // Create debug graphics object with high depth
    this.debugGraphics = this.scene.add.graphics();
    this.debugGraphics.setDepth(100); // Set high depth to render above background

    // Store initial values
    this.p1Bars = {
      health: this.p1MaxHealth,
      maxHealth: this.p1MaxHealth,
      stamina: this.p1MaxEndurance,
      maxStamina: this.p1MaxEndurance,
    };

    this.p2Bars = {
      health: this.p2MaxHealth,
      maxHealth: this.p2MaxHealth,
      stamina: this.p2MaxEndurance,
      maxStamina: this.p2MaxEndurance,
    };

    // Draw initial bars
    this.updateBars(
      this.p1MaxHealth,
      this.p2MaxHealth,
      this.p1MaxEndurance,
      this.p2MaxEndurance,
    );
  }

  updateBars(
    p1Health: number,
    p2Health: number,
    p1Stamina: number,
    p2Stamina: number,
  ): void {
    // Store target values
    const targetValues = {
      p1Health,
      p2Health,
      p1Stamina,
      p2Stamina,
    };

    // Stop any existing tweens
    if (this.tweens.p1Health) this.tweens.p1Health.stop();
    if (this.tweens.p2Health) this.tweens.p2Health.stop();
    if (this.tweens.p1Stamina) this.tweens.p1Stamina.stop();
    if (this.tweens.p2Stamina) this.tweens.p2Stamina.stop();

    // Create tweens for smooth transitions
    this.tweens.p1Health = this.scene.tweens.add({
      targets: this.p1Bars,
      health: targetValues.p1Health,
      duration: this.tweens.duration,
      ease: "Power2",
      onUpdate: () => this.drawFillBars(),
    });

    this.tweens.p2Health = this.scene.tweens.add({
      targets: this.p2Bars,
      health: targetValues.p2Health,
      duration: this.tweens.duration,
      ease: "Power2",
      onUpdate: () => this.drawFillBars(),
    });

    this.tweens.p1Stamina = this.scene.tweens.add({
      targets: this.p1Bars,
      stamina: targetValues.p1Stamina,
      duration: this.tweens.duration,
      ease: "Power2",
      onUpdate: () => this.drawFillBars(),
    });

    this.tweens.p2Stamina = this.scene.tweens.add({
      targets: this.p2Bars,
      stamina: targetValues.p2Stamina,
      duration: this.tweens.duration,
      ease: "Power2",
      onUpdate: () => this.drawFillBars(),
    });
  }

  drawBackgrounds(): void {
    if (!this.debugGraphics) return;

    // Set alpha to 1 for full opacity
    this.debugGraphics.alpha = 1;

    // Dark gray background
    this.debugGraphics.fillStyle(0x333333, 1);

    // Add white border
    this.debugGraphics.lineStyle(2, 0xffffff, 1);

    // Draw backgrounds with borders
    const backgrounds = [
      // P1 Health background
      [
        this.barConfig.p1x,
        this.barConfig.y,
        this.barConfig.width,
        this.barConfig.height,
      ],
      // P1 Stamina background
      [
        this.barConfig.p1x,
        this.barConfig.y + this.barConfig.height + 5,
        this.barConfig.width,
        this.barConfig.staminaHeight,
      ],
      // P2 Health background
      [
        this.barConfig.p2x,
        this.barConfig.y,
        this.barConfig.width,
        this.barConfig.height,
      ],
      // P2 Stamina background
      [
        this.barConfig.p2x,
        this.barConfig.y + this.barConfig.height + 5,
        this.barConfig.width,
        this.barConfig.staminaHeight,
      ],
    ];

    for (const [x, y, width, height] of backgrounds) {
      this.debugGraphics.fillRect(x, y, width, height);
      this.debugGraphics.strokeRect(x, y, width, height);
    }
  }

  drawFillBars(): void {
    if (!this.debugGraphics) return;

    // Clear previous graphics
    this.debugGraphics.clear();

    // Draw backgrounds first
    this.drawBackgrounds();

    // P1 Health (red) - drain left to right
    this.debugGraphics.fillStyle(0xff0000, 1);
    const p1HealthWidth =
      (this.p1Bars.health / this.p1Bars.maxHealth) * this.barConfig.width;
    this.debugGraphics.fillRect(
      this.barConfig.p1x + (this.barConfig.width - p1HealthWidth), // Start from right
      this.barConfig.y,
      p1HealthWidth, // Extend left
      this.barConfig.height,
    );

    // P1 Stamina (yellow) - drain left to right
    this.debugGraphics.fillStyle(0xffff00, 1);
    const p1StaminaWidth =
      (this.p1Bars.stamina / this.p1Bars.maxStamina) * this.barConfig.width;
    this.debugGraphics.fillRect(
      this.barConfig.p1x + (this.barConfig.width - p1StaminaWidth), // Start from right
      this.barConfig.y + this.barConfig.height + 5,
      p1StaminaWidth, // Extend left
      this.barConfig.staminaHeight,
    );

    // P2 Health (red) - drain right to left
    this.debugGraphics.fillStyle(0xff0000, 1);
    const p2HealthWidth =
      (this.p2Bars.health / this.p2Bars.maxHealth) * this.barConfig.width;
    this.debugGraphics.fillRect(
      this.barConfig.p2x, // Start from left
      this.barConfig.y,
      p2HealthWidth,
      this.barConfig.height,
    );

    // P2 Stamina (yellow) - drain right to left
    this.debugGraphics.fillStyle(0xffff00, 1);
    const p2StaminaWidth =
      (this.p2Bars.stamina / this.p2Bars.maxStamina) * this.barConfig.width;
    this.debugGraphics.fillRect(
      this.barConfig.p2x, // Start from left
      this.barConfig.y + this.barConfig.height + 5,
      p2StaminaWidth,
      this.barConfig.staminaHeight,
    );

    // Simplified text display
    const textConfig = {
      color: "#FFFFFF",
      fontSize: "16px",
    };

    // Remove any existing text
    if (this.healthText.length > 0) {
      for (const text of this.healthText) {
        text.destroy();
      }
    }
    this.healthText = [];

    // Add new text with proper alignment
    this.healthText = [
      this.scene.add
        .text(
          this.barConfig.p1x + this.barConfig.width, // Right align
          this.barConfig.y - 20,
          "Player 1",
          textConfig,
        )
        .setOrigin(1, 0) // Right align
        .setDepth(100),

      this.scene.add
        .text(
          this.barConfig.p2x, // Left align
          this.barConfig.y - 20,
          "Player 2",
          textConfig,
        )
        .setOrigin(0, 0) // Left align
        .setDepth(100),
    ];
  }

  // Add methods needed by FightScene
  createBars(): void {
    // This method is needed to maintain compatibility with HealthManager
    this.drawFillBars();
  }
}
