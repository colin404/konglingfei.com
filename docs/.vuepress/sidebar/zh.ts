import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/onex/": [
    {
      text: '更新日志',
      icon: 'rizhi',
      link: "https://www.yuque.com/konglingfei-vzag4/cloud/kllub8qaclnuu8i3",
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
  "/cloudai/catalog/": [
    {
      text: '更新日志',
      icon: 'rizhi',
      link: "https://www.yuque.com/konglingfei-vzag4/cloud/kllub8qaclnuu8i3",
    },
    {
      text: 'Go 语言基础课',
      icon: 'go',
      collapsible: false,
      children: [ 'design-pattern' ],
    },
    {
      text: 'Go 项目开发实战课',
      icon: 'xiangmu',
      collapsible: false,
      children: [ 'methodology', 'fastgo', 'intermediate', 'advanced', 'expert'],
    },
    {
      text: 'Kubernetes 编程实战课',
      icon: 'kubernetes',
      collapsible: false,
      children: [ 
        'kubernetes-installation', 
        'kubernetes-source',
        'kubernetes-dev',
      ],
    },
    {
      text: 'AI 工程开发实战课',
      icon: 'AI',
      collapsible: false,
      children: [ 
        'llmops',
        'kubernetes-scheduler',
        'mlops',
      ],
    },
  ],
  "/learn/": "structure",
  "/handbook/": "structure",
  "/posts/": "structure",
  "/cloudai/project/": [
    {
      text: 'Go 项目',
      icon: 'go',
      collapsible: false,
      children: [ 
        { text: "极速入门实战项目", icon: "jisu", link: "https://github.com/onexstack/fastgo"},
        { text: "中级实战项目", icon: "middle", link: "https://github.com/onexstack/miniblog"},
        { text: "高级实战项目", icon: "advanced", link: "https://github.com/marmotedu/iam"},
        { text: "专家级实战项目", icon: "expert", link: "https://github.com/onexstack/onex"},
      ],
    },
    {
      text: '云原生项目',
      icon: 'kubernetes',
      collapsible: false,
      children: [ 
        'apigateway', 
        { text: "云原生实战平台", icon: "onex", link: "https://github.com/onexstack/onex"},
      ],
    },
    {
      text: 'AI 项目',
      icon: 'AI',
      collapsible: false,
      children: [ 
        'easyai',
        'easyml',
        'easyagent',
      ],
    },
    {
      text: '工具项目',
      icon: 'gongju',
      collapsible: false,
      children: [ 
        { text: "Go 项目开发脚手架", icon: "", link: "https://github.com/onexstack/osbuilder"},
      ],
    },
  ],
});
