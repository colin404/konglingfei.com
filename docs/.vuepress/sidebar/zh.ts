import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/onex/": [
    {
      text: "如何使用",
      icon: "laptop-code",
      prefix: "intro/",
      children: "structure",
      collapsible: true,
    },
    {
      text: "安装",
      icon: "book",
      prefix: "install/",
      children: "structure",
      collapsible: true,
    },
    {
      text: "幻灯片",
      icon: "person-chalkboard",
      link: "https://plugin-md-enhance.vuejs.press/zh/guide/content/revealjs/demo.html",
    },
  ],
  "/cloudnative/": [
    "intro",
  ]
});
