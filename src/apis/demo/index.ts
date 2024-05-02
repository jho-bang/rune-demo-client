import type {
  ICreateImage,
  IDemoList,
  IGetDemoList,
  IUploadImage,
} from "./types";

import { BASE_URL } from "../../shared";

export const apis = {
  async getList(query: IGetDemoList = {}): Promise<IDemoList[]> {
    const queryStr = Object.entries(query)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

    const res = await fetch(`${BASE_URL}/api/v1/demo?${queryStr}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { data } = await res.json();
    return data;
  },

  async upload(formData: File): Promise<IUploadImage> {
    const form = new FormData();
    form.append("my_file", formData);
    const res = await fetch(`${BASE_URL}/api/v1/demo/upload`, {
      method: "POST",
      body: form,
    });

    const { data } = await res.json();

    return data;
  },

  async insert(body: ICreateImage) {
    const res = await fetch(`${BASE_URL}/api/v1/demo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return res.json();
  },
};
