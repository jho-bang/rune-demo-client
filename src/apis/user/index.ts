import type { IProfile } from "./types";

import { BASE_URL } from "../../shared";

export const user_apis = {
  async profile(access_token: string): Promise<IProfile> {
    const res = await fetch(`${BASE_URL}/api/v1/user/profile`, {
      method: "GET",
      headers: {
        access_token: access_token,
        "Content-Type": "application/json",
      },
    });

    return await res.json();
  },
};