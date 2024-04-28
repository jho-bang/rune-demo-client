import { type LayoutData, MetaView, app } from "@rune-ts/server";
import { ClientRouter } from "../routes";

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

server.get(ClientRouter["/tikkle"].toString(), (req, res) => {
  const layoutData: LayoutData = {
    head: {
      title: "튜토리얼-티끌 제거기",
      description: "",
    },
    body: {
      scripts: [
        {
          src: "https://unpkg.com/masonry-layout@4/dist/masonry.pkgd.min.js",
        },
      ],
    },
  };
  res.locals.layoutData = layoutData;

  const html = new MetaView(
    ClientRouter["/tikkle"]({}),
    res.locals.layoutData,
  ).toHtml();

  return res.send(html);
});
