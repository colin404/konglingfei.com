import { appendDatePlugin } from "vuepress-plugin-append-date";
import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",
    //头部引入，这里引入的是 51la 统计
  //head: [["script", { type: "text/javascript", src: "/assets/js/51la.js" }]],
    // HTML 目录
  dest: "./dist",
  // pwa 建议设置为 false
  shouldPrefetch: false,

  head: [
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: `/img/icons/favicon-16x16.png`,
        color: "#5c92d1",
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
    //['meta', {name: 'theme-color', content: '#3eaf7c'}],
    ['meta', {name: 'theme-color', content: '#FF8800'}],
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

    // 插件
  plugins: [
    appendDatePlugin(),
  ],

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
