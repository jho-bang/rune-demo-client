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

export interface IDemoList {
  id: number;
  origin_src: string;
  created: Date;
  updated?: Date;
}

export interface IGetDemoList {
  limit?: number;
  skip?: number;
}
