export interface IStore {
  isLoading: boolean;
  originImage: string;
  newImage: string;
}

export interface ISetStore extends Partial<IStore> {}

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
