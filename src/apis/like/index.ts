import type { ILike } from "./types";

import { BASE_URL, getCookie } from "../../shared";

export const like_apis = {
  async add(body: ILike) {
    const res = await fetch(`${BASE_URL}/api/v1/like/add`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        access_token: getCookie("access_token") || "",
        "Content-Type": "application/json",
      },
    });

    return await res.json();
  },

  async remove(body: ILike) {
    const res = await fetch(`${BASE_URL}/api/v1/like/remove`, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        access_token: getCookie("access_token") || "",
        "Content-Type": "application/json",
      },
    });

    return await res.json();
  },
};
