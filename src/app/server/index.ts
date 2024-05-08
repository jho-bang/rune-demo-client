import { type LayoutData, MetaView, app } from "@rune-ts/server";
import { ClientRouter } from "../routes";
import { demo_apis, user_apis } from "../../apis";
import { getServerCookie, qs, wrapAsyncMiddleware } from "../../shared";
import dotenv from "dotenv";

dotenv.config();

const server = app();

const layoutData: LayoutData = {
  head: {
    title: "튜토리얼-티끌 제거기",
    description: "",
  },
};

server.get(
  ClientRouter[""].toString(),
  wrapAsyncMiddleware(async (req: any, res) => {
    res.locals.layoutData = layoutData;

    const cookie = getServerCookie(req, "access_token");
    if (!cookie) {
      return res.redirect("/login");
    }

    const access_token = cookie.split("=")[1];

    const profile = await user_apis.profile(access_token);

    const { data } = await demo_apis.getList({
      user_id: profile.data.id,
      limit: 20,
      skip: 0,
    });

    const html = new MetaView(
      ClientRouter[""]({
        images: data.map((item) => ({
          ...item,
          is_like: Boolean(Number(item.is_like)),
          liked_cnt: Number(item.liked_cnt || 0),
        })),
        profile,
      }),
      res.locals.layoutData,
    ).toHtml();

    return res.send(html);
  }),
);

server.get(
  ClientRouter["/detail"].toString(),
  wrapAsyncMiddleware(async (req: any, res) => {
    res.locals.layoutData = layoutData;

    const cookie = getServerCookie(req, "access_token");
    if (!cookie) {
      return res.redirect("/login");
    }

    const access_token = cookie.split("=")[1];
    const profile = await user_apis.profile(access_token);

    const id = Number(req.query.id);
    const item = await demo_apis.getById(id);

    const html = new MetaView(
      ClientRouter["/detail"]({
        item,
        profile,
      }),
      res.locals.layoutData,
    ).toHtml();

    return res.send(html);
  }),
);

server.get(ClientRouter["/login"].toString(), (req, res) => {
  res.locals.layoutData = layoutData;

  const html = new MetaView(
    ClientRouter["/login"]({}),
    res.locals.layoutData,
  ).toHtml();

  return res.send(html);
});

server.get("/kakao", (req, res) => {
  const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${process.env.KAKAO_REDIRECT_URL}&response_type=code&scope=profile_image,profile_nickname`;
  res.redirect(kakaoAuthURL);
});

server.get(
  "/kakao/logout",
  wrapAsyncMiddleware(async (req, res) => {
    const cookie = getServerCookie(req, "access_token");
    if (!cookie) {
      return res.redirect("/login");
    }

    const access_token = cookie.split("=")[1];

    await fetch("https://kapi.kakao.com/v1/user/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });

    res.cookie("access_token", "", { maxAge: -1 });
    res.send("OK");
  }),
);

server.get(
  "/kakao/callback",
  wrapAsyncMiddleware(async (req, res) => {
    const code = req.query.code;

    const result = await fetch(
      `https://kauth.kakao.com/oauth/token?${qs({
        grant_type: "authorization_code",
        client_id: process.env.KAKAO_CLIENT_ID,
        client_secret: process.env.KAKAO_CLIENT_SECRET,
        redirect_uri: process.env.KAKAO_REDIRECT_URL,
        code,
      })}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
        },
      },
    );
    const token = await result.json();

    res.cookie("access_token", token.access_token, {
      maxAge: token.expires_in * 1000,
    });

    res.redirect("/");
  }),
);
