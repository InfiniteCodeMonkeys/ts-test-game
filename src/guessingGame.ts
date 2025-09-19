import * as readlineSync from "readline-sync";

export default class NumberGuessingGame {
  private targetNumber: number;
  private attempts: number;
  private difficulty: string;

  constructor(difficulty: string = "moderate") {
    const maxNumber = this.getMaxNumber();
    this.targetNumber = Math.floor(Math.random() * maxNumber);
    this.attempts = 0;
    this.difficulty = difficulty;
  }

  private getMaxNumber(): number {
    switch (this.difficulty) {
      case "easy":
        return 50;
      case "hard":
        return 200;
      default:
        return 100;
    }
  }

  private getUserGuess(): number | null {
    const maxNumber = this.getMaxNumber();
    const input = readlineSync.question(
      `Guess a number between 1 and ${maxNumber} (or type 'exit' to quit): `
    );
    if (input.toLowerCase() === "exit") {
      return null;
    }
    const guess = parseInt(input, 10);
    if (isNaN(guess) || guess < 1 || guess > maxNumber) {
      console.log(`Please enter a valid number between 1 and ${maxNumber}.`);
      return this.getUserGuess();
    }
    return guess;
  }

  public startGame(): void {
    const maxNumber = this.getMaxNumber();
    console.log("🎮 Welcome to the Number Guessing Game!");
    console.log(`🔢 Try to guess the number between 1 and ${maxNumber}.`);

    while (true) {
      const guess = this.getUserGuess();

      if (!guess) {
        console.log("👋 Thanks for playing! Goodbye!");
        break;
      }

      this.attempts++;

      if (guess === this.targetNumber) {
        console.log(
          `🎉 Congratulations! You've guessed the number ${this.targetNumber} in ${this.attempts} attempts!`
        );
        this.targetNumber = Math.floor(Math.random() * maxNumber);
        this.attempts = 0;
      } else if (guess < this.targetNumber) {
        console.log("⬆️ Too low! Try again.");
      } else {
        console.log("⬇️ Too high! Try again.");
      }
    }
  }
}
