<template><div><h2 id="项目结构" tabindex="-1"><a class="header-anchor" href="#项目结构"><span>项目结构</span></a></h2>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="token builtin class-name">.</span>
├── build-script    <span class="token comment"># gradle用到的构建脚本和checkstyle配置</span>
├── docs            <span class="token comment"># 文档 (vue-press)</span>
├── gradle
├── jt-808-server-spring-boot-starter       <span class="token comment"># spring-boot-v3 自动配置 (jdk17+)</span>
├── jt-808-server-spring-boot-starter-boot2 <span class="token comment"># spring-boot-v2 自动配置 (jdk11+)</span>
├── jt-808-server-support                   <span class="token comment"># jt-808的实现</span>
├── jt-core                                 <span class="token comment"># 一些公共类(后期可能改名为 jt-common)</span>
├── jt-spring                               <span class="token comment"># 和 spring 集成相关的类(2.x不再依赖,后期可能删除)</span>
└── samples         <span class="token comment"># 示例项目</span>
    ├── jt-808-server-sample-bare           <span class="token comment"># 几乎零配置的示例(spring-boot-2.x)</span>
    ├── jt-808-server-sample-bare-boot3     <span class="token comment"># 几乎零配置的示例(spring-boot-3.x)</span>
    ├── jt-808-server-sample-annotation     <span class="token comment"># 注解相关的示例(spring-boot-2.x)</span>
    ├── jt-808-server-sample-customized     <span class="token comment"># 定制化示例(spring-boot-2.x)</span>
    ├── jt-808-client-sample-debug          <span class="token comment"># 开发时用来Debug的项目,请忽略</span>
    └── jt-808-server-sample-debug          <span class="token comment"># 开发时用来Debug的项目,请忽略</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="软件版本" tabindex="-1"><a class="header-anchor" href="#软件版本"><span>软件版本</span></a></h2>
<div class="hint-container tip">
<p class="hint-container-title">提示</p>
<ul>
<li>JDK : 17+</li>
<li>Netty : 4.7.x</li>
<li>VuePress : 2.0.0-beta.61</li>
<li>Gradle : 7.6</li>
</ul>
</div>
</div></template>


