import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  locales: {
    "/en/": {
      lang: "en-US",
      title: "Blog Demo",
      description: "A blog demo for vuepress-theme-hope",
    },
    "/": {
      lang: "zh-CN",
      title: "孔令飞的分享空间",
      description: "分享Go和云原生相关的技术栈",
    },
  },

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
