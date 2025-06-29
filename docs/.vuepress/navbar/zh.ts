import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  //"/demo/",
  //{ text: "加入星球", icon: "xingqiu", link: "https://t.zsxq.com/5T0qC"},
  //{ text: "🔥加入星球", icon: "xingqiu", link: "https://t.zsxq.com/5T0qC"},
  {
    text: "实战营课程",
    icon: "cloudnative",
    children: [
      { text: "实战营课程体系总览", icon: "cloudai", link: "/cloudai/catalog/cloudai" },
      {
        text: "Go 语言基础课",
        children: [
          { text: "Go 设计模式 61 讲", icon: "designpattern", link: "https://www.yuque.com/onex/zsxq/gwgk5rhl5coycax0#BXkG" },
        ],
      },
      {
        text: "Go 项目开发实战课",
        children: [
          { text: "Go 项目开发方法论课", icon: "methodology", link: "https://www.yuque.com/onex/zsxq/gwgk5rhl5coycax0#bkwx" },
          { text: "Go 项目开发极速入门课", icon: "newbie", link: "https://www.yuque.com/onex/zsxq/gwgk5rhl5coycax0#Pob3" },
          { text: "Go 项目开发中级实战课", icon: "middle", link: "https://www.yuque.com/onex/zsxq/gwgk5rhl5coycax0#7tYG" },
          { text: "Go 项目开发高级实战课", icon: "advanced", link: "https://www.yuque.com/onex/zsxq/gwgk5rhl5coycax0#tCdy" },
          { text: "Go 项目开发专家级实战课", icon: "expert", link: "https://www.yuque.com/onex/zsxq/gwgk5rhl5coycax0#nWfi" },
        ],
      },
      {
        text: "Kubernetes 编程实战课",
        children: [
          { text: "Kubernetes 集群部署课", icon: "bushu1", link: "https://www.yuque.com/onex/zsxq/gwgk5rhl5coycax0#ODFg" },
          { text: "Kubernetes 源码剖析课", icon: "kubernetes", link: "https://www.yuque.com/onex/zsxq/gwgk5rhl5coycax0#TEhx" },
          { text: "Kubernetes 开发实战课", icon: "k8sdevel", link: "https://www.yuque.com/onex/zsxq/gwgk5rhl5coycax0#GYrv" },
        ],
      },
      {
        text: "AI 工程开发实战课",
        children: [
          { text: "LLMOPS 开发实战课", icon: "llmops", link: "https://www.yuque.com/onex/zsxq/gwgk5rhl5coycax0#mR1F" },
          { text: "Kubernetes 调度器开发实战课", icon: "scheduler", link: "https://www.yuque.com/onex/zsxq/gwgk5rhl5coycax0#ITin" },
          { text: "机器学习平台开发实战课", icon: "mlops", link: "https://www.yuque.com/onex/zsxq/gwgk5rhl5coycax0#4xCu" },
        ],
      },
      {
        text: "程序员职业发展课",
        children: [
          { text: "云原生AI高薪就业课", icon: "diamond", link: "https://www.yuque.com/onex/zsxq/gwgk5rhl5coycax0#fXtV" },
          //{ text: "程序员职业发展课", icon: "zhiyefazhan", link: "/career/career.md" },
          //{ text: "程序员面试指南", icon: "mianshi", link: "/career/interview.md" },
        ],
      },
      {
        text: "实战营成长进阶指南",
        children: [
          { text: "如何进阶云原生高级开发", icon: "jinjie", link: "/cloudnative/advanced/advanced.md" },
          { text: "如何学习实战营课程", icon: "shuben", link: "/cloudnative/advanced/how.md" },
        ],
      },
    ],
  },
  {
    text: "实战营项目",
    icon: "cloudnative",
    children: [
      { text: "实战营项目总览", icon: "cloudai", link: "/cloudai/project/cloudai" },
      {
        text: "Go 项目",
        children: [
          { text: "极速入门实战项目 fastgo", icon: "chuji", link: "https://github.com/onexstack/fastgo" },
          { text: "中级实战项目 miniblog", icon: "middle", link: "https://github.com/onexstack/miniblog" },
          { text: "高级级实战项目 iam", icon: "advanced", link: "https://github.com/marmotedu/iam" },
          { text: "专家级实战项目 onex", icon: "expert", link: "https://github.com/onexstack/onex" },
        ],
      },
      {
        text: "云原生项目",
        children: [
          { text: "企业级 API 网关", icon: "apigateway", link: "cloudai/project/apigateway.md" },
          { text: "云原生实战平台 onex", icon: "onex", link: "https://github.com/onexstack/onex" },
        ],
      },
      {
        text: "AI 项目",
        children: [
          { text: "LLMOPS 平台 easyai", icon: "llmops", link: "/cloudai/project/easyai.md" },
          { text: "机器学习平台 easyml", icon: "mlops", link: "/cloudai/project/easyml.md" },
          { text: "智能体平台 easyagent", icon: "agent", link: "/cloudai/project/easyagent.md" },
        ],
      },
      {
        text: "工具项目",
        children: [
          { text: "Go 项目开发脚手架 osbuilder", icon: "gongju", link: "https://github.com/onexstack/osbuilder" },
        ],
      }
    ]
  },
  { text: "实战营更新动态", icon: "rizhi", link: "https://feizaonet.feishu.cn/wiki/ZlXnwV3hGijYHlkUpEgcOSurnbf"},
  {
    text: "OneX 平台",
    icon: "onex",
    prefix: "/onex/",
    children: [
      { 
        text: "项目动态", 
        children:[
          { text: "更新动态", icon: "rizhi",link: "https://github.com/superproj/onex/blob/master/CHANGELOG.md" },
        ],
      },
      { 
        text: "项目介绍", 
        prefix: "intro/",
        children: [
          { text: "项目介绍", icon: "circle-info", link: "intro" },
          { text: "功能列表", icon: "liebiao", link: "feature" },
        ]
      },
      { text: "安装指南", 
        icon: "bushulinghuo",
        prefix: "installation/",
        children: [
          { text: "环境准备", icon: "zhunbei",link: "prepare" },
          { text: "容器部署", icon: "docker",link: "docker" },
          { text: "手动部署", icon: "shoudong",link: "sbs" },
          { text: "功能测试", icon: "ceshi",link: "test" },
        ],
      },
      {
        text: "开发指南", 
        prefix: "/onex/devel/",
        children: [
          { text: "开发指南", icon: "zhinan", link: "devel" },
          { text: "排障指南", icon: "paizhang", link: "troubleshooting" },
          { text: "API 接口", icon: "api", link: "https://app.swaggerhub.com/apis-docs/COLIN404/onex/v0.1.0" },
          { text: "常见问题", icon: "wenti", link: "faq" },
        ]
      },
    ]
  },
  /*
  {
    text: "OneX 编程规范",
    icon: "guifan",
    prefix: "/onex/convention/",
    children: [
      //{ text: "编码规范", icon: "daima", link: "code" },
      { text: "接口规范", icon: "api", link: "rest" },
      { text: "日志规范", icon: "rizhi", link: "log" },
      { text: "错误规范", icon: "cuowu", link: "error" },
      { text: "提交规范", icon: "git", link: "commit" },
      { text: "版本号规范", icon: "banbenhao", link: "version" },
      //{ text: "Event 规范", icon: "shijian", link: "event" },
      //{ text: "Linux 命令", icon: "guifan", link: "books" },
      //{ text: "资源分享", icon: "luxian", link: "link" },
    ],
  },
  */
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
  //{ text: "评论", icon: "pinglun", link: "/posts/comment" },
  //{ text: "B 站视频", icon: "bizhan", link: "/posts" },
  /*
  {
    text: "开发手册",
    icon: "shouce",
    prefix: "handbook/",
    children: [
      { text: "Go编码规范", icon: "guifan", link: "conventions" },
      { text: "开发工具集", icon: "gongju", link: "tools" },
      { text: "Vim操作命令", icon: "vim", link: "vim" },
      //{ text: "Linux 命令", icon: "guifan", link: "books" },
      //{ text: "资源分享", icon: "luxian", link: "link" },
    ],
  },
  */
  //{ text: "面试", icon: "mianshi", link: "/posts" },
  {
    text: "微信文章",
    icon: "weixin", 
    link: "https://feizaonet.feishu.cn/wiki/GkS4wk0i0iNQIqkqYCIcXG6Pnnb",
  },
  //{
    //text: "学习资源",
    //icon: "xuexiziyuan",
    //prefix: "learn/",
    //children: [
      //{ text: "Go 学习路线", icon: "go", link: "https://roadmap.sh/golang"},
      //{ text: "云原生学习路线", icon: "luxian", link: "roadmap" },
      //{ text: "学习资源推荐", icon: "tuijian", link: "books" },
      //{ text: "资源分享", icon: "luxian", link: "link" },
    //],
  //},
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
    text: "作者介绍",
    icon: "zuozhe",
    link: "https://feizaonet.feishu.cn/wiki/Y6iFwekZKibF3dkNyzuc2BKjn0f",
    /*
    children: [
      { text: "作者介绍", icon: "circle-info", link: "/intro" },
      { text: "关注作者", icon: "guanzhu", link: "/posts" },
    ]
    */
  },
  { text: "加入星球",
    icon: 'cloudai', 
    link: 'https://t.zsxq.com/5T0qC',
  },
]);
