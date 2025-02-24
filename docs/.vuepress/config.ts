import { defineUserConfig } from "vuepress";
import { defineUserConfig } from "vuepress/cli";
import { getDirname, path } from "vuepress/utils";
import { appendDatePlugin } from "vuepress-plugin-append-date";
import { autoCatalogPlugin } from "vuepress-plugin-auto-catalog";
import { gitPlugin } from '@vuepress/plugin-git'
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
    ['meta', {name: 'theme-color', content: '#034fd8'}],
  ],

  locales: {
    "/": {
      lang: "zh-CN",
      title: "云原生 AI 实战星球",
      description: "分享Go、云原生和AI相关的技术栈",
    },
    /*
    "/en/": {
      lang: "en-US",
      title: "Blog Demo",
      description: "A blog demo for vuepress-theme-hope",
    },
     */
  },

  theme,

  // 插件
  plugins: [
    appendDatePlugin(),
    gitPlugin(),
    autoCatalogPlugin(),
  ],

  pagePatterns: [ "**/*.md", "!.vuepress", "!node_modules"],

  markdown: {
    header: {
      // 用到哪一级就提取哪一级
      levels: [2, 3, 4, 5, 6],
    },
    importCode: {
      handleImportPath: (str) =>
      str.replace(
        /^@example-src/,
        path.resolve(__dirname, '../../example-src/')
      ),
    },
  },

  /*
   extendsPage: (page) => {
     // 在 routeMeta 中设置目录信息
    page.routeMeta = {
      // 目录标题
      title: page.title,
      // ... 其他信息
    };
  },
   */

      // Enable it with pwa
      // shouldPrefetch: false,
    });
