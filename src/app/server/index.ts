import { type LayoutData, MetaView, app } from "@rune-ts/server";
import { ClientRouter } from "../routes";
import { apis } from "../../apis";

const server = app();

server.get(ClientRouter["/tictactoe"].toString(), (req, res) => {
  const layoutData: LayoutData = {
    head: {
      title: "튜토리얼-틱택토",
      description: "",
    },
  };

  const html = new MetaView(
    ClientRouter["/tictactoe"]({}),
    layoutData,
  ).toHtml();

  return res.send(html);
});

server.get(ClientRouter[""].toString(), async (req, res) => {
  const layoutData: LayoutData = {
    head: {
      title: "튜토리얼-티끌 제거기",
      description: "",
    },
  };
  res.locals.layoutData = layoutData;

  const { data } = await apis.getList();

  const html = new MetaView(
    ClientRouter[""]({
      images: data,
    }),
    res.locals.layoutData,
  ).toHtml();

  return res.send(html);
});

server.get(ClientRouter["/detail"].toString(), async (req, res) => {
  const layoutData: LayoutData = {
    head: {
      title: "튜토리얼-티끌 제거기",
      description: "",
    },
  };
  res.locals.layoutData = layoutData;

  const id = Number(req.query.id);
  const item = await apis.getById(id);

  const html = new MetaView(
    ClientRouter["/detail"]({
      item,
    }),
    res.locals.layoutData,
  ).toHtml();

  return res.send(html);
});
