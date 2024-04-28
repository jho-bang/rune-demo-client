export type TPlayers = 'X' | 'O';

export interface IStore {
  players: TPlayers[];
  winning_combinations: number[][];
  squares: string[];
  currentPlayer: TPlayers;
  isEndGame: boolean;
}

export interface ISetStore extends Partial<IStore> {}
