import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/onex/": [
    {
      text: '更新日志',
      icon: 'rizhi',
      link: "https://github.com/superproj/onex/blob/master/CHANGELOG.md",
    },
    {
      text: '项目介绍',
      icon: 'jieshao',
      prefix: 'intro/',
      collapsible: false,
      children: [ 'intro', 'feature' ],
    },
    {
      text: '安装指南',
      icon: 'bushulinghuo',
      prefix: 'installation/',
      collapsible: false,
      children: [ 'prepare', 'docker','sbs','test'],
    },
    {
      text: '开发指南',
      icon: 'zhinan3',
      prefix: 'devel/',
      collapsible: false,
      children: [ 
        'devel', 
        'troubleshooting', 
        { text: "API 接口", icon: "api", link: "http://konglingfei.com:65534/docs"},
        'faq',
      ],
    },
    {
      text: '编程规范',
      icon: 'guifan',
      prefix: 'convention/',
      collapsible: false,
      children: [ 
        //'code',
        'rest', 
        'log', 
        'error',
        'commit',
        'version',
        //'event',
      ],
    },
  ],
  "/cloudnative/": "structure",
  "/learn/": "structure",
  "/handbook/": "structure",
  "/posts/": "structure",
});
