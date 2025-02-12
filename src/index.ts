import * as readlineSync from "readline-sync";
import NumberGuessingGame from "./guessingGame";
import DragonFightGame from "./dragons";
const input = readlineSync.question(
  `Which game would you like to play? (or type 'exit' to quit): `
);

switch (input.toLowerCase()) {
  case "guessing":
    const guessingGame = new NumberGuessingGame("easy");

    guessingGame.startGame();

    break;
  case "dragons":
    const input = readlineSync.question(
      `What is your name, brave knight? (or type 'exit' to quit): `
    );
    if (input.toLowerCase() === "exit") {
      console.log("👋 Thanks for playing! Goodbye!");
      process.exit(0);
    }

    const dragonGame = new DragonFightGame(input);

    dragonGame.startGame();

    break;
  case "exit":
    console.log("👋 Thanks for playing! Goodbye!");
    process.exit(0);
  default:
    console.log("Please enter a valid game name.");
    break;
}
