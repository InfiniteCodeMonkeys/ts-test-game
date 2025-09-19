import * as readlineSync from "readline-sync";

export default class Board {
  word: string;
  guesses: number;
  wrongGuesses: number;
  maxGuesses: number;
  difficulty: number;
  win: boolean;
  position: number;

  constructor(difficulty = 2) {
    this.word = this.pickRandomWord();
    this.guesses = 0;
    this.wrongGuesses = 0;
    this.difficulty = difficulty;
    this.maxGuesses = this.word.length * difficulty;
    this.win = false;
    this.position = 0;
  }

  private pickRandomWord() {
    const words = ["some", "random", "words", "here"];

    const randomInt = Math.floor;
    return "";
  }

  startGame() {
    while (!this.win || this.guesses !== this.maxGuesses) {
      // take in input

      // increment guesses

      this.guesses++;

      // if input === word[position] {

      // if position === word.length

      // console.log("You've won!")
      // this.win = true

      //  this.position++
      console.log(this.word.slice(0, this.position));
      // } else {

      // this.wrongGuesses++
      // you could do something kind of ugly with a switch case and console logs of ascii art to dray a hangman
      //}
    }
  }
}
