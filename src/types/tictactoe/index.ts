export type TPlayers = "X" | "O";

export interface ITicTacToeStore {
  players: TPlayers[];
  winning_combinations: number[][];
  squares: string[];
  currentPlayer: TPlayers;
  isEndGame: boolean;
}

export interface ITicTacToeSetStore extends Partial<ITicTacToeStore> {}
