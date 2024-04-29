import type { ICreateImage, IDemoList, IUploadImage } from "./types";

const BASE_URL = `http://localhost:5002`;

export const apis = {
  async getList(): Promise<IDemoList[]> {
    const res = await fetch(`${BASE_URL}/api/v1/demo`, {
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
