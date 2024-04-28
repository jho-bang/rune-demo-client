// base
import { ListView, View, html, on } from "rune-ts";
import { pipe, filter, map, takeWhile, toArray, range } from "@fxts/core";

// store
import { store } from "../../../features/TicTacToe/store";

// events
import { RequestEvent } from "../../../features/TicTacToe/events";

// css
import style from "./style.module.scss";

interface Props {
  value: number;
}

export class SquareView extends View<Props> {
  @on("click")
  private _click(ev: MouseEvent) {
    if (this.isEndGame() || this.isExists(ev)) return;

    this.updateSquares(ev);

    if (this.checkWin() || this.checkDraw()) {
      this.setIsEndGame(true);
      return;
    }

    this.setCurrentPlayer();
    this.dispatchEvent(RequestEvent, { bubbles: true });
  }

  private isEndGame() {
    return store.getStore().isEndGame;
  }

  private setIsEndGame(isEndGame: boolean) {
    store.setStore({ isEndGame });
  }

  private updateSquares(ev: Event) {
    const currentTarget = ev.currentTarget as HTMLElement;
    if (currentTarget) {
      currentTarget.textContent = store.getStore().currentPlayer;
    }

    const squares = pipe(
      document.querySelectorAll(".square"),
      map((v) => v.textContent || ""),
      toArray,
    );

    store.setStore({ squares });
  }

  private setCurrentPlayer() {
    store.setStore({
      currentPlayer:
        store.getStore().currentPlayer === store.getStore().players[0]
          ? store.getStore().players[1]
          : store.getStore().players[0],
    });
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
      alert(`${store.getStore().currentPlayer} 승리`);
      return true;
    }

    return false;
  }

  private isWin() {
    const { currentPlayer, squares } = store.getStore();
    const compareSquare = ([a, b, c]: number[]) =>
      squares[a] === currentPlayer &&
      squares[b] === currentPlayer &&
      squares[c] === currentPlayer;

    const result = pipe(
      store.getStore()["winning_combinations"],
      filter(compareSquare),
      takeWhile((v) => v.length),
      toArray,
    );

    return !!result.length;
  }

  private checkDraw() {
    const squares = store.getStore().squares;
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

  override template({ value }: Props) {
    return html`<div class="${style.square} square" id="square${value}"></div>`;
  }
}

export class SquareListView extends ListView<Props, SquareView> {
  override ItemView = SquareView;
}

export function SquareListViewRender() {
  const listValue = pipe(
    range(0, 9),
    map((v) => ({ value: v })),
    toArray,
  );

  const element = new SquareListView(listValue).render();
  document.querySelector("#board")!.append(element);
}
