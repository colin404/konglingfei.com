import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  //"/demo/",
  {
    text: "云原生实战营",
    prefix: "/cloudnative/",
    icon: "xingqiu2",
    children: [
      /*
      { 
        text: "加入实战营", 
          icon: "zuozhe", 
          children: [
            { text: "购买", icon: "golang", link: "go" },
          ]
      },
      */
      {
        text: "云原生实战营介绍",
        prefix: "intro/",
        children: [
          { text: "实战营目标", icon: "circle-info", link: "target" },
          { text: "云原生实战营介绍", icon: "circle-info", link: "intro" },
        ],
      },
      {
        text: "实战营课程目录",
        prefix: "catalog/",
        children: [
          { text: "Go 项目开发高阶实战课", icon: "go", link: "go" },
          { text: "Kubernetes 开发实战课", icon: "kubernetes", link: "kubernetes" },
          { text: "职业发展课", icon: "zhiyefazhan", link: "career" },
        ],
      },
      {
        text: "实战营成长进阶",
        prefix: "advanced/",
        children: [
          { text: "如何进阶云原生高级开发", icon: "jinjie", link: "advanced" },
          { text: "如何学习实战营课程", icon: "shuben", link: "learn" },
        ],
      },
    ],
  },
  {
    text: "云原生实战平台",
    icon: "xiangmu",
    prefix: "/onex/",
    children: [
      { 
        text: "项目动态", 
        children:[
          { text: "项目动态", icon: "gonggao",link: "https://github.com/superproj/onex/blob/master/CHANGELOG.md" },
        ],
      },
      { 
        text: "项目介绍", 
        prefix: "intro/",
        children: [
          { text: "OneX 项目介绍", icon: "jieshao3", link: "intro" },
          { text: "OneX 功能列表", icon: "liebiao", link: "feature" },
        ]
      },
      { text: "安装指南", 
        icon: "bushulinghuo",
        prefix: "installation/",
        children: [
          { text: "容器部署", icon: "docker",link: "docker" },
          { text: "手动部署", icon: "shoudong",link: "sbs" },
          { text: "功能测试", icon: "ceshi",link: "test" },
        ],
      },
      {
        text: "开发指南", 
        prefix: "devel/",
        children: [
          { text: "开发指南", icon: "zhinan", link: "devel" },
          { text: "排障指南", icon: "paizhang", link: "troubleshooting" },
          { text: "API 接口", icon: "api", link: "http://konglingfei.com:65534/docs" },
          { text: "常见问题", icon: "wenti", link: "faq" },
        ]
      },
    ]
  },
  { text: "购买加入", icon: "jiaru", prefix: "/posts/",link: "1"},
  /*
  { 
    text: "购买加入", 
    icon: "jiaru", 
    prefix: "/posts/",
    children: [
      { text: "训练营", icon: "jiaru", prefix: "/posts/",link: "1"},
      { text: "培训班", icon: "jiaru", prefix: "/posts/",link: "1"},
      { text: "企业内训", icon: "jiaru", prefix: "/posts/",link: "1"},
    ],
  },
  */
  /*
  {
    text: "支线课程",
    icon: "fenxiang",
    prefix: "/posts/",
    children: [
      {
        text: "编程基础",
        icon: "fenxiang",
        children: [
          { text: "Linux 基础", icon: "linux", link: "1" },
          { text: "Shell编程基础", icon: "shell", link: "1" },
          { text: "Git 入门课程", icon: "git", link: "1" },
          { text: "Makefile编程基础", icon: "makefile", link: "1" },
          { text: "MySQL入门与实战", icon: "mysql", link: "1" },
          { text: "Redis入门与实战", icon: "redis", link: "1" },
        ],
      },
      {
        text: "  Go语言基础",
        icon: "fenxiang",
        children: [
          { text: "Go语言基础语法", icon: "go", link: "1" },
          { text: "Go语言设计模式", icon: "sheji", link: "1" },
          { text: "Go常用面试算法", icon: "suanfa", link: "1" },
          { text: "Go包开发实战", icon: "package", link: "1" },
        ],
      },
      {
        text: "云原生基础",
        icon: "fenxiang",
        children: [
          { text: "Docker入门与实战", icon: "docker", link: "1" },
          { text: "Kubernetes入门与实战", icon: "kubernetes", link: "1" },
          { text: "Etcd 入门与实战", icon: "etcd", link: "1" },
          { text: "DevOps与CI/CD", icon: "devops", link: "1" },
        ],
      },
    ]
  },
  {
    text: "支线课程",
    icon: "fenxiang",
    prefix: "/posts/",
    children: [
      {
        text: "  Go语言基础",
        icon: "fenxiang",
        children: [
          //{ text: "Go语言基础语法", icon: "go", link: "1" },
          //{ text: "Go语言设计模式", icon: "sheji", link: "1" },
          { text: "Go常用面试算法", icon: "suanfa", link: "1" },
          //{ text: "Go包开发实战", icon: "package", link: "1" },
        ],
      },
    ]
  },
  */
  { text: "评论", icon: "pinglun", link: "/posts/comment" },
  //{ text: "B 站视频", icon: "bizhan", link: "/posts" },
  {
    text: "学习资源",
    icon: "xuexiziyuan",
    prefix: "learn/",
    children: [
      { text: "学习路线", icon: "luxian", link: "roadmap" },
      { text: "资源下载", icon: "xiazai", link: "books" },
      //{ text: "资源分享", icon: "luxian", link: "link" },
    ],
  },
  //{ text: "面试", icon: "mianshi", link: "/posts" },
  { 
    text: "公众号文章", 
    icon: "fenxiang", 
    link: "/weichat/README.md",
  },
  //{ text: "婚恋交友", icon: "fenxiang", link: "/posts" },
  /*
  {
    text: "加入社群",
    icon: "weixinshequn",
    link: "/default/concatGroup",
  },
    {
    text: '索引',
    icon: 'jiansuo',
    children: [
      { text: '全部', icon: 'list', link: '/article' },
      { text: '分类', icon: 'category', link: '/category' },
      { text: '标签', icon: 'tag', link: '/tag' },
      { text: '时间轴', icon: 'time', link: '/timeline' },
    ],
  },
  */
  {
    text: "关于作者",
    icon: "zuozhe",
    children: [
      { text: "作者介绍", icon: "circle-info", link: "/intro" },
      { text: "关注作者", icon: "guanzhu", link: "/posts" },
    ]
  },
]);
