// base
import { pipe, each, filter } from "@fxts/core";

// type
import type {
  ITicTacToeStore,
  ITicTacToeSetStore,
  TPlayers,
} from "../../types";

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

class TicTacToeStore {
  players: TPlayers[];
  winning_combinations: number[][];
  squares: string[];
  currentPlayer: TPlayers;
  isEndGame: boolean;

  constructor({
    players,
    winning_combinations,
    squares,
    currentPlayer,
    isEndGame,
  }: ITicTacToeStore) {
    this.players = players;
    this.winning_combinations = winning_combinations;
    this.squares = squares;
    this.currentPlayer = currentPlayer;
    this.isEndGame = isEndGame;
  }

  getStore(): ITicTacToeStore {
    return {
      players: this.players,
      winning_combinations: this.winning_combinations,
      squares: this.squares,
      currentPlayer: this.currentPlayer,
      isEndGame: this.isEndGame,
    };
  }

  setStore(data: ITicTacToeSetStore) {
    pipe(
      Object.entries(data),
      filter(([key, value]) => typeof value === "boolean" || value),
      each(([key, value]) => (this[key] = value)),
    );
  }

  resetStore() {
    this.setStore(initialValues);
  }
}

export const ticTacToeStore = new TicTacToeStore(initialValues);
