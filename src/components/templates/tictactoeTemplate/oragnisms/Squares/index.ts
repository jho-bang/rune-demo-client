// base
import { ListView, View, html, on, CustomEventWithDetail } from "rune-ts";
import { pipe, filter, map, takeWhile, toArray } from "@fxts/core";

// css
import style from "./style.module.scss";

import type { ITicTacToeStore, TPlayers } from "../../../../../types";
import { type ISquareItemProps, SquareView } from "./atoms/SquareItem";

export class RequestEvent extends CustomEventWithDetail<TPlayers> {}

const initialValues: ITicTacToeStore = {
  players: ["X", "O"],
  winning_combinations: [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ],
  squares: [],
  currentPlayer: "X",
  isEndGame: false,
};

export class SquareListView extends ListView<ISquareItemProps, SquareView> {
  override className = style.SquareListView;

  state: ITicTacToeStore = JSON.parse(JSON.stringify(initialValues));

  @on("click", `.${SquareView}`)
  private _click(ev: MouseEvent) {
    if (this.isEndGame() || this.isExists(ev)) return;

    this.updateSquares(ev);

    if (this.checkWin() || this.checkDraw()) {
      this.setIsEndGame(true);
      return;
    }

    this.setCurrentPlayer();

    this.dispatchEvent(RequestEvent, {
      detail: this.state.currentPlayer,
      bubbles: true,
    });
  }

  private isEndGame() {
    return this.state.isEndGame;
  }

  private setIsEndGame(isEndGame: boolean) {
    this.state.isEndGame = isEndGame;
  }

  private updateSquares(ev: Event) {
    const currentTarget = ev.currentTarget as HTMLElement;
    if (currentTarget) {
      currentTarget.textContent = this.state.currentPlayer;
    }

    const squares = pipe(
      document.querySelectorAll(".square"),
      map((v) => v.textContent || ""),
      toArray,
    );

    this.state.squares = squares;
  }

  private setCurrentPlayer() {
    this.state.currentPlayer =
      this.state.currentPlayer === this.state.players[0]
        ? this.state.players[1]
        : this.state.players[0];
  }

  private isExists(ev: MouseEvent) {
    const currentTarget = ev.currentTarget as HTMLElement;
    if (currentTarget) {
      return currentTarget.textContent;
    }
    return false;
  }

  private checkWin() {
    if (this.isWin()) {
      alert(`${this.state.currentPlayer} 승리`);
      return true;
    }

    return false;
  }

  private isWin() {
    const { currentPlayer, squares } = this.state;
    const compareSquare = ([a, b, c]: number[]) =>
      squares[a] === currentPlayer &&
      squares[b] === currentPlayer &&
      squares[c] === currentPlayer;

    const result = pipe(
      this.state.winning_combinations,
      filter(compareSquare),
      takeWhile((v) => v.length),
      toArray,
    );

    return !!result.length;
  }

  private checkDraw() {
    const squares = this.state.squares;
    if (this.isDraw(squares)) {
      alert("무승부");
      return true;
    }

    return false;
  }

  private isDraw(squares: string[]) {
    for (const content of squares) {
      if (content === "") {
        return false;
      }
    }

    return true;
  }

  resetState = () => {
    this.state = JSON.parse(JSON.stringify(initialValues));
  };

  override ItemView = SquareView;
}
