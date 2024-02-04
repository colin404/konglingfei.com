import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  head: [
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: `/img/icons/favicon-16x16.png`,
      },
    ],
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: `/img/icons/favicon-32x32.png`,
      },
    ],
    ['meta', {name: 'application-name', content: 'jt808'}],
    ['meta', {name: 'theme-color', content: '#3eaf7c'}],
  ],

  locales: {
    "/en/": {
      lang: "en-US",
      title: "Blog Demo",
      description: "A blog demo for vuepress-theme-hope",
    },
    "/": {
      lang: "zh-CN",
      title: "孔令飞的云原生实战营",
      description: "分享Go和云原生相关的技术栈",
    },
  },

  theme,

  pagePatterns: [
    "**/*.md",
    "!.vuepress",
    "!node_modules",
  ],

  markdown: {
    importCode: {
      handleImportPath: (str) =>
      str.replace(
        /^@example-src/,
        path.resolve(__dirname, '../../example-src/')
      ),
    },
  },

  // Enable it with pwa
  // shouldPrefetch: false,
});
