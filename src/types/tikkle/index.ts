export interface ITikkleStore {
  isLoading: boolean;
  originImage: string;
  newImage: string;
}

export interface ITikkleSetStore extends Partial<ITikkleStore> {}
