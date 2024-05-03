// base
import { ListView, View, html, on, CustomEventWithDetail } from "rune-ts";
import { pipe, filter, map, takeWhile, toArray } from "@fxts/core";

// css
import style from "./style.module.scss";
import type { TPlayers } from "../../../../../../../types";

export class RequestEvent extends CustomEventWithDetail<TPlayers> {}

export interface ISquareItemProps {
  value: number;
}

export class SquareView extends View<ISquareItemProps> {
  override template({ value }: ISquareItemProps) {
    return html`<div class="${style.square} square" id="square${value}"></div>`;
  }
}
