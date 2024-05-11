<template>
  <div class="disseminate">
    <div class="disseminate-item" :key="item.name">
      <img :src="item.icon" :alt="item.name" width="24px" />
      <span class="name">{{ item.name }}</span>
      <div class="disseminate-item-content">
        <h4>
          <div class="sitemap-top-title">{{ navbar.name }}</div>
          <span>
            <RouteLink :target="v.href.startsWith('http') ? '_blank' : ''" class="sitemap-top-link"
              v-for="v of navbar.rightLinks.reverse()" :key="v.text" :to="v.href" :title="v.text">
              {{ v.text }}</RouteLink>
          </span>
        </h4>

        <table class="sitemap-table">
          <tr v-for="item of list" :key="item.title">
            <td nowrap="nowrap">
              <div class="sitemap-col-group">{{ item.title }}</div>
            </td>
            <td class="sitemap-col-item-group">
              <div class="sitemap-col-item" v-for="v of item.items" :key="v.title">
                <RouteLink :to="v.href" :target="v.href.startsWith('http') ? '_blank' : ''" :title="v.title">
                  {{ v.title }}
                  <svg v-if="v.href.startsWith('http')" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" x="0px"
                    y="0px" viewBox="0 0 100 100" width="15" height="15" class="icon outbound">
                    <path fill="currentColor"
                      d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z">
                    </path>
                    <polygon fill="currentColor"
                      points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9">
                    </polygon>
                  </svg>
                </RouteLink>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
const item = {
  name: "站点图",
  icon: "/assets/images/sitemap.png",
}

const navbar = {
  name: '站点导航',
  rightLinks: [
    {
      text: '关于我',
      href: '/intro.md',
    },
  ],
} 

const list = [{
  title: '常用搜索',
  items: [{
    title: '百度',
    href: '/cloudnative/dynamics/changelog.html',
  }, {
    title: 'Google',
    href: 'http://www.google.com/',
  }, {
    title: 'Bing',
    href: 'http://www.bing.com/',
  }, {
    title: 'Github',
    href: 'https://github.com',
  }, {
    title: '搜代码',
    href: 'https://www.programcreek.com/java-api-examples/index.php'
  }]
},
{
  title: '技术社区',
  items: [{
    title: '百度',
    href: 'http://www.baidu.com/',
  }, {
    title: 'Google',
    href: 'http://www.google.com/',
  }, {
    title: 'Bing',
    href: 'http://www.bing.com/',
  }, {
    title: 'Github',
    href: 'https://github.com',
  }, {
    title: '搜代码',
    href: 'https://www.programcreek.com/java-api-examples/index.php'
  }]
},
{
  title: 'PDF 下载',
  items: [{
    title: '百度',
    href: 'http://www.baidu.com/',
  }, {
    title: 'Google',
    href: 'http://www.google.com/',
  }, {
    title: 'Bing',
    href: 'http://www.bing.com/',
  }, {
    title: 'Github',
    href: 'https://github.com',
  }, {
    title: '搜代码',
    href: 'https://www.programcreek.com/java-api-examples/index.php'
  }]
},
{
  title: '面试求职',
  items: [{
    title: '百度',
    href: 'http://www.baidu.com/',
  }, {
    title: 'Google',
    href: 'http://www.google.com/',
  }, {
    title: 'Bing',
    href: 'http://www.bing.com/',
  }, {
    title: 'Github',
    href: 'https://github.com',
  }, {
    title: '搜代码',
    href: 'https://www.programcreek.com/java-api-examples/index.php'
  }]
},
{
  title: 'Java 相关',
  items: [{
    title: '百度',
    href: 'http://www.baidu.com/',
  }, {
    title: 'Google',
    href: 'http://www.google.com/',
  }, {
    title: 'Bing',
    href: 'http://www.bing.com/',
  }, {
    title: 'Github',
    href: 'https://github.com',
  }, {
    title: '搜代码',
    href: 'https://www.programcreek.com/java-api-examples/index.php'
  }]
},
{
  title: 'Spring',
  items: [{
    title: '百度',
    href: 'http://www.baidu.com/',
  }, {
    title: 'Google',
    href: 'http://www.google.com/',
  }, {
    title: 'Bing',
    href: 'http://www.bing.com/',
  }, {
    title: 'Github',
    href: 'https://github.com',
  }, {
    title: '搜代码',
    href: 'https://www.programcreek.com/java-api-examples/index.php'
  }]
},
{
  title: '面向对象',
  items: [{
    title: '百度',
    href: '/cloudnative/dynamics/changelog',
  }, {
    title: 'Google',
    href: 'http://www.google.com/',
  }, {
    title: 'Bing',
    href: 'http://www.bing.com/',
  }, {
    title: 'Github',
    href: 'https://github.com',
  }, {
    title: '搜代码',
    href: 'https://www.programcreek.com/java-api-examples/index.php'
  }]
},
{
  title: '中间件&插件',
  items: [{
    title: '百度',
    href: 'http://www.baidu.com/',
  }, {
    title: 'Google',
    href: 'http://www.google.com/',
  }, {
    title: 'Bing',
    href: 'http://www.bing.com/',
  }, {
    title: 'Github',
    href: 'https://github.com',
  }, {
    title: '搜代码',
    href: 'https://www.programcreek.com/java-api-examples/index.php'
  }]
},
{
  title: 'Netty 4.x',
  items: [{
    title: '百度',
    href: 'http://www.baidu.com/',
  }, {
    title: 'Google',
    href: 'http://www.google.com/',
  }, {
    title: 'Bing',
    href: 'http://www.bing.com/',
  }, {
    title: 'Github',
    href: 'https://github.com',
  }, {
    title: '搜代码',
    href: 'https://www.programcreek.com/java-api-examples/index.php'
  }]
},
{
  title: '字节码编程',
  items: [{
    title: '百度',
    href: 'http://www.baidu.com/',
  }, {
    title: 'Google',
    href: 'http://www.google.com/',
  }, {
    title: 'Bing',
    href: 'http://www.bing.com/',
  }, {
    title: 'Github',
    href: 'https://github.com',
  }, {
    title: '搜代码',
    href: 'https://www.programcreek.com/java-api-examples/index.php'
  }]
},
{
  title: '专栏小册',
  items: [{
    title: '《Netty+JavaFx实战：仿桌面版微信聊天》',
    href: 'http://www.baidu.com/',
  }, {
    title: '《SpringBoot 中间件设计》',
    href: 'http://www.google.com/',
  }, {
    title: '《Lottery 抽奖系统 - 基于领域驱动设计的四层架构实践》',
    href: 'http://www.bing.com/',
  }]
},
{
  title: '知识星球',
  items: [{
    title: '百度',
    href: 'http://www.baidu.com/',
  }, {
    title: 'Google',
    href: 'http://www.google.com/',
  }, {
    title: 'Bing',
    href: 'http://www.bing.com/',
  }, {
    title: 'Github',
    href: 'https://github.com',
  }, {
    title: '搜代码',
    href: 'https://www.programcreek.com/java-api-examples/index.php'
  }]
}]
</script>

<style scoped>
.disseminate {
  position: fixed;
  right: 10px;
  display: flex;
  flex-direction: column;
  z-index: 99;
  bottom: calc(var(--navbar-height) + 100px);
}

.disseminate-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  height: 60px;
  border-bottom: 1px solid #eee;
  position: relative;
}

.disseminate-item-content {
  display: none;
  cursor: auto;
  position: absolute;
  color: #2c3e50;
  bottom: -30px;
  min-height: 500px;
  padding: 0 10px;
  width: 850px;
  background: #fff;
  box-shadow: 1px -2px 10px 7px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  left: unset;
  right: 98%;
  margin-right: 2px;
  margin-left: 0;
  z-index: 1;
}

.disseminate-item-content:hover {
  display: block;
}

.disseminate-item:hover .disseminate-item-content {
  display: block;
}

.name {
  color: grey;
  margin-top: 3px;
  font-size: 11px;
}

.disseminate-item-content h4 {
  margin: 5px 0;
  font-size: 14px;
  text-align: center;
  padding: 3px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #eaecef;
  background: #3370FF;
  color: #fff;
}

.sitemap-top-link {
  color: #fff;
  font-size: 12px;
  float: right;
  padding: 2px 5px;
  text-decoration: underline;
}

.sitemap-top-title {
  flex: 1;
  text-align: center;
}

.sitemap-table {
  margin: 0;
}

.sitemap-table td,
.sitemap-table th {
  border: 1px solid #f6f7f9;
  padding: 5px 5px 0;
  background-color: #fff;
}

.sitemap-col-item {
  float: left;
  margin-right: 5px;
  font-size: 14px;
  margin-bottom: 5px;
  padding: 3px 8px;
  background-color: #fbfbfb;
  border-radius: 2px;
  border: 1px solid #eee;
  text-align: center;
}

.sitemap-col-item-group {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 10px;
  width: 745px;
}

.sitemap-col-group {
  margin-bottom: 5px;
  font-size: 13px;
  font-weight: 700;
  width: 80px;
}

.sitemap-col-item,
.sitemap-col-item a {
  color: #034fd8;
  font-weight: 400;
}

.icon.outbound {
  color: #aaa;
  display: inline-block;
  vertical-align: middle;
  position: relative;
  top: -0.5px;
}

.sitemap-col-item:hover {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
</style>
