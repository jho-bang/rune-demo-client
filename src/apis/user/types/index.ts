export interface IProfile {
  data: {
    id: number;
    username: string;
    thumbnail_url: string;
    created: Date;
    sns: string;
    sns_id: string;
  };
  message: string;
}
