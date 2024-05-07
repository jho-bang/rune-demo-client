import type { StorybookConfig } from "@storybook/html-webpack5";
import { createHash } from "node:crypto";

const getLocalIdent = (
  context: any,
  localIdentName: string,
  localName: string,
) => {
  const hash = createHash("md5")
    .update(context.resourcePath)
    .digest("hex")
    .substring(0, 8);

  return `${localName}__${hash}`;
};

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    {
      name: "@storybook/addon-styling-webpack",
      options: {
        rules: [
          {
            test: /\.s[ac]ss$/i,
            use: [
              "style-loader",
              {
                loader: "css-loader",
                options: {
                  modules: {
                    getLocalIdent: getLocalIdent,
                  },
                },
              },
              "sass-loader",
            ],
          },
          {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
          },
        ],
      },
    },
  ],
  framework: {
    name: "@storybook/html-webpack5",
    options: {
      builder: {
        useSWC: true,
      },
    },
  },
  docs: {
    autodocs: "tag",
  },
};
export default config;
