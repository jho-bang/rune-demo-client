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
  data: IDemoItem[];
}

export interface IDemoItem {
  id: number;
  origin_src: string;
  created: Date;
  updated?: Date;
}

export interface IGetDemoList {
  sns_id?: number;
  limit?: number;
  skip?: number;
}

export interface IProfile {
  data: {
    id: number;
    properties: {
      nickname: string;
      profile_image: string;
      thumbnail_image: string;
    };
    message: string;
  };
}
