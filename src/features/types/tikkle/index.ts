export interface ITikkleStore {
  isLoading: boolean;
  originImage: string;
  newImage: string;
}

export interface ITikkleSetStore extends Partial<ITikkleStore> {}

export interface ICreateImage {
  origin_src: string;
}

export interface IUploadImage {
  destination: string;
  filename: string;
  originalname: string;
  path: string;
  size: number;
}
