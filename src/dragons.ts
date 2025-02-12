import * as readlineSync from "readline-sync";

const ENEMIES = ["dragon", "goblin", "troll", "orc"];

interface Character {
  name: string;
  health: number;
  attackPower: number;
  attack(): number;
  heal(): void;
}

abstract class BaseCharacter implements Character {
  name: string;
  health: number;
  attackPower: number;

  constructor(name: string, health: number = 100, attackPower: number = 20) {
    this.name = name;
    this.health = health;
    this.attackPower = Math.floor(Math.random() * attackPower) + 5; // Random attack power between 5 and attackPower plus 5
  }

  attack(): number {
    const damage = Math.floor(Math.random() * this.attackPower) + 1;
    console.log(`${this.name} attacks and deals ${damage} damage!`);
    return damage;
  }

  heal(): void {
    this.health += 20;
    console.log(`${this.name} heals for 20 health!`);
  }

  isAlive(): boolean {
    return this.health > 0;
  }
}

class Player extends BaseCharacter {
  name: string;
  potions: number;

  constructor(name: string = "Dragon Slayer") {
    super(name, 100, 20);
    this.name = name;
    this.potions = 3; // Start with 3 potions
  }

  heal(): void {
    if (this.potions > 0) {
      this.health += 20;
      this.potions--;
      console.log(
        `${this.name} heals for 20 health! Remaining potions: ${this.potions}`
      );
    } else {
      console.log(`${this.name} has no potions left!`);
    }
  }
}

class Enemy extends BaseCharacter {
  constructor(name: string) {
    const health = Math.floor(Math.random() * 50) + 50;
    const attackPower = Math.floor(Math.random() * 15) + 5;
    super(name, health, attackPower);
  }
}

class Dragon extends Enemy {
  constructor() {
    super("Dragon");
    this.health = Math.floor(Math.random() * 50) + 100; // Stronger dragon
  }
}

class Goblin extends Enemy {
  constructor() {
    super("Goblin");
    this.health = Math.floor(Math.random() * 30) + 50; // Weaker goblin
  }
}

class Troll extends Enemy {
  constructor() {
    super("Troll");
    this.health = Math.floor(Math.random() * 40) + 60; // Average troll
  }
}

class Orc extends Enemy {
  constructor() {
    super("Orc");
    this.health = Math.floor(Math.random() * 30) + 30; // Weak orc
  }
}

export default class DragonFightGame {
  private player: Player;
  private enemies: Enemy[];
  private currentEnemy: Enemy | null;

  constructor(playerName: string) {
    this.player = new Player(playerName);
    this.enemies = this.generateEnemies();
    this.currentEnemy = null;
  }

  private generateEnemies(): Enemy[] {
    const enemyList = ENEMIES.map((enemy) => {
      switch (enemy) {
        case "dragon":
          return new Dragon();
        case "goblin":
          return new Goblin();
        case "troll":
          return new Troll();
        case "orc":
          return new Orc();
        default:
          throw new Error("Unknown enemy type");
      }
    });
    return enemyList;
  }

  private chooseEnemy(): Enemy {
    const randomIndex = Math.floor(Math.random() * this.enemies.length);
    return this.enemies[randomIndex];
  }
  private getUserAction(): string {
    const action = readlineSync.keyInSelect(
      ["Attack", "Heal", "Run"],
      "What would you like to do?"
    );
    return ["attack", "heal", "run"][action];
  }
  private attackEnemy(): void {
    if (this.currentEnemy) {
      const damage = this.player.attack();
      this.currentEnemy.health -= damage;
      console.log(
        `${this.currentEnemy.name} has ${this.currentEnemy.health} health left.`
      );
    }
  }
  private healPlayer(): void {
    this.player.heal();
  }
  private runAway(): void {
    console.log(`${this.player.name} runs away from the battle!`);
    this.currentEnemy = null;
  }
  private enemyTurn(): void {
    if (this.currentEnemy && this.currentEnemy.isAlive()) {
      const damage = this.currentEnemy.attack();
      this.player.health -= damage;
      console.log(`${this.player.name} has ${this.player.health} health left.`);
    }
  }
  private checkGameOver(): boolean {
    if (!this.player.isAlive()) {
      console.log(`${this.player.name} has been defeated! Game over.`);
      return true;
    }
    if (this.currentEnemy && !this.currentEnemy.isAlive()) {
      console.log(`${this.currentEnemy.name} has been defeated!`);
      this.currentEnemy = null;
    }
    return false;
  }
  public startGame(): void {
    console.log("🎮 Welcome to the Dragon Fight Game!");
    console.log(`🗡️ You are a brave knight named ${this.player.name}.`);
    console.log("👹 You will face various enemies in battle!");

    while (true) {
      if (!this.currentEnemy) {
        this.currentEnemy = this.chooseEnemy();
        console.log(`A wild ${this.currentEnemy.name} appears!`);
      }

      const action = this.getUserAction();

      switch (action) {
        case "attack":
          this.attackEnemy();
          break;
        case "heal":
          this.healPlayer();
          break;
        case "run":
          this.runAway();
          break;
        default:
          console.log("Invalid action. Please try again.");
          continue;
      }

      if (this.checkGameOver()) {
        break;
      }

      this.enemyTurn();

      if (this.checkGameOver()) {
        break;
      }
    }
  }
}
