import * as readlineSync from "readline-sync";

export default class TicTacToe {
  size: number;
  waysToWin: number;
  board: string[];

  constructor(size = 3) {
    this.size = size;
    this.waysToWin = size * 2 + 2;
    this.board = [];
  }

  private checkForWin() {}

  private move() {}

  game() {
    while (true) {}
  }
}
