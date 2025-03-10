import { hopeTheme } from "vuepress-theme-hope";
import { searchProPlugin } from "vuepress-plugin-search-pro";
import { enNavbar, zhNavbar } from "./navbar/index.js";
import { enSidebar, zhSidebar } from "./sidebar/index.js";
import { MR_HOPE_AVATAR } from "./logo.js";

export default hopeTheme({
  // 导航栏中Logo的链接，404页面的返回首页链接
  home: '/',
  // 全屏按钮
  fullscreen: true,
  //navbarAutoHide: 'mobile', // "always" | "mobile" | "none"
  // 在深色模式，浅色模式和自动之间切换 (默认)
  darkmode: "switch",
  hostname: "http://konglingfei.com",
  themeColor: true,
  copyright: "Copyright © 2024 孔令飞",

  author: {
    name: "孔令飞",
    email: "colin404@foxmail.com",
    url: "https://konglingfei.com",
  },

  // 阿里妈妈图标的前缀
  iconPrefix: "iconfont icon-",
  // Iconfont 精选图标 和 阿里妈妈的互斥
  // iconAssets: "iconfont",
  //iconAssets: "fontawesome-with-brands",
  iconAssets: "//at.alicdn.com/t/c/font_4425847_puz15c7kbm.css",
  breadcrumbIcon: false, // 是否在路径导航显示图标
  // 纯净模式，会禁用一些花哨的动画以及一些色彩
  pure: false, 
  print: false, // 是否在桌面模式下显示打印按钮

  logo: "/cloudnative-blue.svg",

  repo: "https://github.com/superproj/onex",
  // 项目仓库标签
  repoLabel: "GitHub仓库",
  repoDisplay: true,
  // 面包屑导航
  breadcrumb: true,
  // 文档源文件的仓库 URL
  docsRepo:"https://github.com/superproj/konglingfei.com",
  // 文档源文件的仓库分支
  docsBranch: "master",
  // lastUpdated，在职状态，暂时不开启
  lastUpdated: false,
  // 编辑此页
  editLink: false,
  headerDepth: 5,
  pageview: true,
  // 文章信息，可以填入数组，数组的顺序是各条目显示的顺序
  //pageInfo: ["Author", "Original", "Date", "Category", "Tag", "Word", "ReadingTime", "PageView"],
  pageInfo: ["Author", "Original", "Word", "ReadingTime", "PageView", "Date", "Category", "Tag"],
  footer: '<a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank">备案号: 粤ICP备2024181276号</a >',
  displayFooter: false,

  docsDir: "docs",

  blog: {
    // 圆角
    roundAvatar: true,
    medias: {
      Wechat: "https://example.com",
      GitHub: "https://example.com",
      //CSDN: "https://blog.csdn.net/qing_gee",
      BiliBili: "https://example.com",
      Lark: "https://example.com",
      QQ: "https://example.com",
      Weibo: "https://example.com",
      Zhihu: "https://example.com",
    },
  },

  locales: {
    // Chinese locale config
    "/": {
      // navbar
      navbar: zhNavbar,

      // sidebar
      sidebar: zhSidebar,

      blog: {
        description: "喜欢学习、热爱分享",
        intro: "/intro/intro",
      },

      // page meta
      metaLocales: {
        editLink: "编辑此页",
      },
    },
    /*
    "/en/": {
    // navbar
      navbar: enNavbar,

    // sidebar
      sidebar: enSidebar,

      footer: "Default footer",

      displayFooter: true,

      blog: {
        description: "A FrontEnd programmer",
        intro: "/en/intro.html",
      },

      metaLocales: {
        editLink: "Edit this page on GitHub",
      },
    },
     */
  },

  encrypt: {
    config: {
      "/en/demo/encrypt.html": ["1234"],
      "/demo/encrypt.html": ["1234"],
    },
  },
  // 提示文字
  encryptLocales: {
    placeholder: "微信搜‘令飞编程密码’获取口令",

    /**
     * Passwrod error hint
     */
    errorHint: "哈哈，别调戏人家啦，按规则来嘛",
  },

  // enable it to preview all changes in time
  // hotReload: true,

  navTitle: "云原生 AI 实战星球",
  // 默认值: { start: ["Brand"], center: ["Links"], end: ["Language", "Repo", "Outlook", "Search"] }
  navbarLayout:{ 
    start: ["Brand"], 
    center: ["Links"], 
    //end: ["Language", "WeChatLink", "QQLink", "Repo","Outlook", "Search"],
    end: ["Language", "Repo","Outlook", "Search"],
  },
  /*
  navbarLayout: {
    start: ["Brand"],
    center: ["Links"],
    end: ["WeChat", "Outlook", "Language","Repo", "Search"],
  },
  */
  plugins: {
    // 启用站点地图
    sitemap: true,
    // 启用博客
    blog: false,
    catalog : true,
    // 启用水印
    watermark: true,
    // 启用 SEO 优化
    seo: true,

    // 该插件会监听页面滚动事件。
    // 当页面滚动至某个 标题锚点 后，如果存在对应的 标题链接 ，那么该插件会将路由 Hash 更改为该 标题锚点 。
    activeHeaderLinks: true,
    // 搜索插件
    searchPro:{
      indexContent: true,
      locales: {
        "/": {
          cancel: "取消",
          placeholder: "搜索",
          search: "搜索",
          searching: "搜索中",
          select: "选择",
          navigate: "切换",
          exit: "关闭",
          history: "搜索历史",
          emptyHistory: "无搜索历史",
          emptyResult: "没有找到结果",
          loading: "正在加载搜索索引...",
        },
      },
    },

    // install @waline/client before enabling it
    // WARNING: This is a test server for demo only.
    // You should create and use your own comment service in production.
    comment: {
      comment: false,
      provider: "Giscus",
      repo: "colin404/for-giscus",
      //repoId:"R_kgDOLLPxvA",
      category:"Announcements",
      categoryId:"DIC_kwDOLLPxvM4CcyUN",
      lazyLoading: true,

      // Waline 配置
      //provider: "Waline",
      serverURL: "http://for-waline-hmgxmrutp-colin404s-projects.vercel.app",
      //serverURL: "https://waline-comment.vuejs.press",
      //serverURL: "https://comment.mister-hope.com",
      login: "force",
      wordLimit: 1000,
      pageSize: 20,
      reaction: true,
      metaIcon: true,

      //provider: "Twikoo",
      envId: "onex-4gf2qdbfb7925439",
      repoId: "ap-guangzhou",

      copyright: false,
    },

    components: {
      components: ["Badge", "VPCard", "BiliBili"],
      rootComponents: {
        /*
        notice: [
          { type: 'text', content: '👇公众号👇---👇 微信群 👇' },
          {
            path: "/",
            title: "🔥 限时优惠",
            content: "知识星球上新 8 折优惠中 👉 <a href=https://t.zsxq.com/BDCy2>点击加入</a> ",
            actions: [
              {
                text: "👉 扫码加入",
                link: "/contact/wechat-8cm.jpg",
                type: "default",
              },
            ],
              {
                text: "交流群",
                link: "https://img.cdn.sugarat.top/mdImg/MTYxNTAxODc2NTIxMA==615018765210",
                //type: "primary",
              },
              {
                text: "下资料",
                link: "https://img.cdn.sugarat.top/mdImg/MTYxNTAxODc2NTIxMA==615018765210",
                //{ text: "Default Action" },
                //
              }
            ],
            showOnce: false,
            key: "2024.1.4",
        //confirm: true,
        //fullscreen: true,
          },
          {
            path: "/en",
            title: "Coming in <b>2024.1.1</b>",
            content:
            '<ul><li>Custom toolbar</li></ul><div class="addthis_inline_follow_toolbox"></div>',
            actions: [
              {
                text: "Learn more→",
                link: "/en/guide/history.html#_2024-1-2",
                type: "primary",
              },
            ],
            showOnce: true,
            key: "2024.1.1",
          },
        ],
         */
      },
    },

    // all features are enabled for demo, only preserve features you need here
    mdEnhance: {
      alert: true,
      // 自定义对齐
      align: true,
      attrs: true,
      chart: true,
      codetabs: true,
      component: true,
      echarts: true,
      // 你的 Markdown 行为与 GitHub 保持一致
      gfm: true,
      demo: true,
      // 启用图片懒加载
      imgLazyload: true,
      // 启用图片标记
      imgMark: true,
      // 启用图片大小
      imgSize: true,
      // 启用图片标题
      figure: true,
      include: true,
      mark: true,
      katex: true,
      // 流程图
      mermaid: true,
      hint: true,
      // 支持任务列表
      tasklist: true,
      flowchart: true,
      playground: {
        presets: ["ts", "vue", "unocss"],
      },
      revealJs: {
        plugins: ["highlight", "math", "search", "notes", "zoom"],
        themes: ["auto", "beige", "black", "blood", "league", "moon", "night", "serif", "simple", "sky",  "solarized", "white"],
      },
      stylize: [
        {
          matcher: "Recommended",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommended",
              };
          },
        },
      ],
      sub: true,
      sup: true,
      // 添加选项卡支持
      tabs: true,
      vPre: true,
      copyCode: {fancy: false,},
      vuePlayground: true,

      // install chart.js before enabling it
      // chart: true,

      // insert component easily

      // install echarts before enabling it
      // echarts: true,

      // install flowchart.ts before enabling it
      // flowchart: true,

      // gfm requires mathjax-full to provide tex support
      // gfm: true,

      // install katex before enabling it
      // katex: true,

      // install mathjax-full before enabling it
      // mathjax: true,

      // install mermaid before enabling it
      // mermaid: true,

      // playground: {
      //   presets: ["ts", "vue"],
      // },

      // install reveal.js before enabling it
      // revealJs: {
      //   plugins: ["highlight", "math", "search", "notes", "zoom"],
      // },

      // install @vue/repl before enabling it
      // vuePlayground: true,

      // install sandpack-vue3 before enabling it
      // sandpack: true,
    },

    // pwa
    pwa: {
      favicon: "/favicon.ico",
      cacheHTML: true,
      cachePic: true,
      appendBase: true,
      apple: {
        icon: "/assets/icon/apple-icon-152.png",
        statusBarColor: "black",
      },
      msTile: {
        image: "/assets/icon/ms-icon-144.png",
        color: "#ffffff",
      },
      manifest: {
        name: "孔令飞的个人博客",
        short_name: "孔令飞的个人博客",
        description: "孔令飞的个人博客",
        theme_color: "#034fd8",
        icons: [
          {
            src: "/assets/icon/chrome-mask-512.png",
            sizes: "512x512",
            purpose: "maskable",
            type: "image/png",
          },
          {
            src: "/assets/icon/chrome-mask-192.png",
            sizes: "192x192",
            purpose: "maskable",
            type: "image/png",
          },
          {
            src: "/assets/icon/chrome-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/assets/icon/chrome-192.png",
            sizes: "192x192",
            type: "image/png",
          },
        ],
        shortcuts: [
          {
            name: "Demo",
            short_name: "Demo",
            url: "/demo/",
            icons: [
              {
                src: "/assets/icon/guide-maskable.png",
                sizes: "192x192",
                purpose: "maskable",
                type: "image/png",
              },
            ],
          },
        ],
      },
    },
  },
});
