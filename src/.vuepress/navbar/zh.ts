import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  //"/demo/",
  {
    text: "云原生实战营",
    prefix: "/cloudnative/",
    icon: "huo",
    children: [
      {
        text: "实战营介绍",
        children: [
          { text: "云原生实战营介绍", icon: "jieshao", link: "introduction" },
        ],
      },
      {
        text: "实战营课程目录",
        icon: "pen-to-square",
        children: [
          { text: "Go 项目开发高阶实战课", icon: "golang", link: "go-catalog" },
          { text: "Kubernetes 开发实战课", icon: "bxl-kubernetes", link: "kubernetes-catalog" },
          { text: "职业发展课", icon: "zhiyefazhantongdao", link: "career-catalog" },
        ],
      }
    ],
  },
  {
    text: "云原生实战项目",
    icon: "xiangmu",
    prefix: "/onex/",
    children: [
      { 
        text: "项目动态", 
        children:[
          { text: "项目动态", icon: "dongtai1",link: "changelog" },
        ],
      },
      { 
        text: "项目介绍", 
        children: [
          { text: "OneX 项目介绍", icon: "jieshao",link: "1" },
          { text: "OneX 功能列表", icon: "danlieliebiao",link: "1" },
        ]
      },
      { text: "安装指南", 
        icon: "bushulinghuo",
        children: [
          { text: "容器部署", icon: "docker",link: "1" },
          { text: "手动部署", icon: "shoudong",link: "1" },
          { text: "功能测试", icon: "gongnengceshi-",link: "1" },
        ],
      },
      {
        text: "其他", 
        icon: "qita",
        children: [
          { text: "常见问题", icon: "changjianwenti", link: "1" },
          { text: "开发指南", icon: "kaifazhinan", link: "1" },
          { text: "API 接口", icon: "api", link: "1" },
        ]
      }
    ]
  },
  {
    text: "技术分享",
    icon: "fenxiang",
    prefix: "/posts/",
    children: [
      { text: "Linux 基础", icon: "linux", link: "1" },
      { text: "容器技术", icon: "docker", link: "1" },
      { text: "Go 语言设计模式", icon: "sheji", link: "1" },
    ]
  },
  //{ text: "博文", icon: "banjiboke", prefix: "/posts/",link: "1"}
  { text: "作者介绍", icon: "zuozhe", link: "/intro.md" },
]);
