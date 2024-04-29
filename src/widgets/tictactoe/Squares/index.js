var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
            ? (desc = Object.getOwnPropertyDescriptor(target, key))
            : desc,
      d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
// base
import { ListView, View, html, on } from "rune-ts";
import { pipe, filter, map, takeWhile, toArray, range } from "@fxts/core";
// store
import { store } from "../../../features/TicTacToe/store/index.js";
// events
import { RequestEvent } from "../../../features/TicTacToe/events/index.js";
// css
import style from "./style.module.scss";
export class SquareView extends View {
  _click(ev) {
    if (this.isEndGame() || this.isExists(ev)) return;
    this.updateSquares(ev);
    if (this.checkWin() || this.checkDraw()) {
      this.setIsEndGame(true);
      return;
    }
    this.setCurrentPlayer();
    this.dispatchEvent(RequestEvent, { bubbles: true });
  }
  isEndGame() {
    return store.getStore().isEndGame;
  }
  setIsEndGame(isEndGame) {
    store.setStore({ isEndGame });
  }
  updateSquares(ev) {
    const currentTarget = ev.currentTarget;
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
  setCurrentPlayer() {
    store.setStore({
      currentPlayer:
        store.getStore().currentPlayer === store.getStore().players[0]
          ? store.getStore().players[1]
          : store.getStore().players[0],
    });
  }
  isExists(ev) {
    const currentTarget = ev.currentTarget;
    if (currentTarget) {
      return currentTarget.textContent;
    }
    return false;
  }
  checkWin() {
    if (this.isWin()) {
      alert(`${store.getStore().currentPlayer} 승리`);
      return true;
    }
    return false;
  }
  isWin() {
    const { currentPlayer, squares } = store.getStore();
    const compareSquare = ([a, b, c]) =>
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
  checkDraw() {
    const squares = store.getStore().squares;
    if (this.isDraw(squares)) {
      alert("무승부");
      return true;
    }
    return false;
  }
  isDraw(squares) {
    for (const content of squares) {
      if (content === "") {
        return false;
      }
    }
    return true;
  }
  template({ value }) {
    return html`<div class="${style.square} square" id="square${value}"></div>`;
  }
}
__decorate([on("click")], SquareView.prototype, "_click", null);
export class SquareListView extends ListView {
  ItemView = SquareView;
}
export function SquareListViewRender() {
  const listValue = pipe(
    range(0, 9),
    map((v) => ({ value: v })),
    toArray,
  );
  const element = new SquareListView(listValue).render();
  document.querySelector("#board").append(element);
}
