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

export interface IDemoItemLikes {
  like_id: number;
  created: Date;
  user_info: {
    user_id: number;
    username: string;
    thumbnail_url: string;
  };
}

export interface IDemoItem {
  id: number;
  origin_src: string;
  created: Date;
  updated?: Date;
  liked_cnt: number;
  is_liked: boolean;
  likes: IDemoItemLikes[];
}

export interface IGetDemoList {
  user_id?: number;
  limit?: number;
  skip?: number;
}
