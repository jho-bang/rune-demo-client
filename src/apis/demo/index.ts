import type {
  ICreateImage,
  IDemoItem,
  IDemoList,
  IGetDemoList,
  IUploadImage,
} from "./types";

import { BASE_URL, getCookie, qs } from "../../shared";

export const DemoApis = {
  async getList(query: IGetDemoList = {}): Promise<IDemoList> {
    const res = await fetch(`${BASE_URL}/api/v1/demo?${qs(query)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await res.json();
  },

  async getMyList(query: IGetDemoList = {}): Promise<IDemoList> {
    const res = await fetch(`${BASE_URL}/api/v1/demo/my/list?${qs(query)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await res.json();
  },

  async getById(id: number): Promise<IDemoItem> {
    const res = await fetch(`${BASE_URL}/api/v1/demo/${id}`, {
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
        access_token: getCookie("access_token") || "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return res.json();
  },
};
