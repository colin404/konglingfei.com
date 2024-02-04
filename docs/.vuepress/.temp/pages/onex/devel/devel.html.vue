<template><div><p>前面，我详细给你介绍了如何部署、测试 OneX 项目，带你打通了整个开发、测试环境及部署流程。本节课，我会给你展示下如何修改 OneX 项目源码，并编译、部署和测试。</p>
<p>为了，能够给你演示整个二次开发场景，这里，假设我们要给 onex-fakeserver 组件的订单接口，加上日志调用代码行，以打印函数调用记录。</p>
<div class="hint-container tip">
<p class="hint-container-title">提示</p>
<p>onex-fakeserver 是一个实验、测试服务，可以用它来测试，集成一些新的功能、特性。</p>
</div>
<h2 id="如何修改源码" tabindex="-1"><a class="header-anchor" href="#如何修改源码"><span>如何修改源码？</span></a></h2>
<p>在项目开发中，修改代码要遵循一些原则，原则有很多，下面是一些高频、重要的原则：</p>
<ul>
<li>遵循现有代码风格：保持代码风格的一致性，遵循团队或项目的代码规范。这包括缩进、命名约定、注释风格等；</li>
<li>不重复造轮子，复用已有实现：修改代码时，要在合理的前提下，尽可能多的复用现有实现。如果没有可直接复用的实现，也可以考虑将一些函数、代码修改的更加通用，再去复用；</li>
<li>小步修改：尽量避免一次性修改过多的代码。尝试以小步骤逐渐修改代码，每次修改都应该是小而可测试的；</li>
<li>避免无关修改： 在修改代码前，充分了解代码的功能和结构，尽量避免对不相关的代码进行修改，以减少不必要的风险；</li>
</ul>
<p>上面，我介绍了一些修改源码的原则。如果你要修改 OneX 源码，下面是一些可操作、重要的修改检查项：</p>
<ol>
<li>修改源码前，请确保完整阅读一遍项目开发规范。为了便于开发者阅读这些规范，建议将规范文档查阅地址，在项目的 <code v-pre>README.md</code> 中注明；</li>
<li>修改源码前， 请借助 <code v-pre>grep</code>、<code v-pre>egrep</code> 等工具，根据关键字，搜索当前项目的已有实现方法、类似方法、日志打印格式、Go 包使用方式、日志或错误描述风格等，尽可能复用这些已有实现。对于改造后可复用的代码，可根据改造成本，选择直接改造后复用或者作为一个待办项，后期进行专项代码优化改造，以减少代码重复度；</li>
<li>每次代码提交前，都要编译涉及到的组件。否则很可能导致推送的代码不可编译，影响其他开发者；</li>
<li>每次发布前，都要运行完整的 CI 流程，例如：代码格式化、代码静态检查、单元测试、源码编译等操作项，确保发布的源码整体可用。</li>
<li>代码修改后，推送前，要再次检查代码，确保新的代码编写风格跟当前项目保持一致，代码简洁、质量高。例如：在推送前，我通常使用 <code v-pre>git diff</code> 工具再次确认修改点是否符合预期。</li>
</ol>
<p>如果想尽最大可能复用已有实现，最好的方法是能先通读整个项目源码，了解现有实现。这样在你开发时，很容易知道有哪些现有代码可复用。</p>
<h2 id="修改完代码后如何编译源码" tabindex="-1"><a class="header-anchor" href="#修改完代码后如何编译源码"><span>修改完代码后如何编译源码？</span></a></h2>
<p>OneX 项目提供了丰富、便捷的代码编译方法，来满足不同场景下代码编译的需求。你可以根据需要选择以下编译方法中的一个。OneX 支持以下 3 大类编译、构建操作：</p>
<ol>
<li>编译 OneX 源码；</li>
<li>构建容器镜像；</li>
<li>推送容器镜像。</li>
</ol>
<p>上述 3 大类操作命令格式保持高度的一致，这可以降低你的记忆负担，提高项目的可维护性。</p>
<h3 id="编译-onex-源码" tabindex="-1"><a class="header-anchor" href="#编译-onex-源码"><span>编译 OneX 源码</span></a></h3>
<ol>
<li>使用 Makefile 规则编译</li>
</ol>
<p>编译命令如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">make</span> build <span class="token assign-left variable">BINS</span><span class="token operator">=</span>onex-usercenter <span class="token comment"># 编译单个：编译 onex-usercenter 组件</span>
$ <span class="token function">make</span> build <span class="token assign-left variable">BINS</span><span class="token operator">=</span><span class="token string">"onex-usercenter onex-gateway"</span> <span class="token comment"># 编译多个：编译 onex-usercenter, onex-gateway 组件</span>
$ <span class="token function">make</span> buid <span class="token comment"># 编译所有：会编译 cmd/ 目录下的所有 main 文件</span>
$ <span class="token function">make</span> build <span class="token assign-left variable">BINS</span><span class="token operator">=</span>onex-usercenter <span class="token assign-left variable">VERSION</span><span class="token operator">=</span>v0.1.0 <span class="token comment"># 编译时，通过指定 VERSION 变量，指定版本</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2">
<li>使用脚本快捷编译</li>
</ol>
<p>使用 Makefile 规则编译源码时，需要手动输入长度不短的命令。工作中，我比较喜欢去思考如何提高工作、开发效率，像这种高频的编译操作，是最需要去提高操作效率的。为此，我开发了一个便捷的脚本 <code v-pre>scripts/mksuger.sh</code> 来更快捷的编译源码。</p>
<p>另外，为了能够最大化的提高编译源码的效率，我还做了以下 2 件事：</p>
<ol>
<li>将 <code v-pre>${ONEX_ROOT}/scripts</code> 加目录入到 Linux 命令查询路径中（PATH环境变量），确保可以直接在命令行中输入<code v-pre>mksuger.sh</code> 使用。在安装 OneX 项目时，已经将 <code v-pre>${ONEX_ROOT}/scripts</code> 添加到了 Linux <code v-pre>PATH</code> 环境变量中。如果没有加入，你可以手动将以下行加入到 <code v-pre>$HOME/.bashrc</code> 中：</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="token builtin class-name">export</span> <span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span><span class="token variable">${ONEX_ROOT}</span>/_output/platforms/linux/amd64:<span class="token variable">${ONEX_ROOT}</span>/scripts:<span class="token environment constant">$PATH</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="2">
<li>给每个组件起统一的简称，例如：<code v-pre>uc</code> 代表 onex-usercenter 组件。组件的简称记录在 <code v-pre>scripts/common.sh</code> 文件中的 <code v-pre>ONEX_ALL_COMPONENTS</code> 变量中。</li>
</ol>
<div class="hint-container tip">
<p class="hint-container-title">提示</p>
<p><code v-pre>mksuger.sh</code>：全程 make suger，make 糖，寓意：makefile 的封装，用来提高 makefile 的操作效率。</p>
</div>
<p>所以，如果你想更快捷的编译源码，可以选择使用以下命令中的一个：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ mksuger.sh uc <span class="token comment"># 等效于 make build BINS=onex-usercenter</span>
$ mksuger.sh uc gw <span class="token comment"># 等效于 make build BINS="onex-usercenter onex-gateway"</span>
$ mksuger.sh <span class="token comment"># 等效于 make buid</span>
$ mksuger.sh uc <span class="token parameter variable">-v</span> v0.1.0 <span class="token comment"># 等效于 make build BINS=onex-usercenter VERSION=v0.1.0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到开发中，最频繁的编译动作被封装成了一个 <code v-pre>mksuger.sh</code> 脚本，只需要执行很短的命令行，便能够更具需要编译组件。这可以极大的提高我们的开发效率和体验。</p>
<p>这里只是提高开发效率的一个示例，在你的日常开发中，建议你通过发现、思考将一些开发工作或者操作，通过脚本或者其他工具来实现自动化，以提高你的开发效率和体验。在 OneX 项目中，你会看到很多，这种提高效率的案例。</p>
<h3 id="构建容器镜像" tabindex="-1"><a class="header-anchor" href="#构建容器镜像"><span>构建容器镜像</span></a></h3>
<p>云原生时代，越来越多的软件采用容器化的方式发布。OneX 作为一个 Go 最佳实践项目，当然也支持容器化。容器化部署，就需要构建镜像，OneX 项目支持不同的构建方式，来满足不同的构建需求。构建容器镜像的使用方式，跟编译源码二进制文件的方式保持一致，也提供 2 种构建方式，并且命令个格式保持一致。</p>
<ol>
<li>使用 Makefile 规则编译</li>
</ol>
<p>构建容器命令如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">make</span> image <span class="token assign-left variable">IMAGES</span><span class="token operator">=</span>onex-usercenter <span class="token comment"># 构建单个：构建 onex-usercenter 容器镜像</span>
$ <span class="token function">make</span> image <span class="token assign-left variable">IMAGES</span><span class="token operator">=</span><span class="token string">"onex-usercenter onex-gateway"</span> <span class="token comment"># 构建多个：构建 onex-usercenter, onex-gateway 容器镜像</span>
$ <span class="token function">make</span> image <span class="token comment"># 构建所有</span>
$ <span class="token function">make</span> image <span class="token assign-left variable">IMAGES</span><span class="token operator">=</span>onex-usercenter <span class="token assign-left variable">VERSION</span><span class="token operator">=</span>v0.1.0 <span class="token comment"># 构建时，通过指定 VERSION 变量，指定镜像版本</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2">
<li>使用脚本快捷编译</li>
</ol>
<p>构建容器命令如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ mksuger.sh uc <span class="token parameter variable">-i</span> <span class="token comment"># 等效于  make image IMAGES=onex-usercenter</span>
$ mksuger.sh uc gw <span class="token parameter variable">-i</span> <span class="token comment"># 等效于 make image IMAGES="onex-usercenter onex-gateway"</span>
$ mksuger.sh <span class="token parameter variable">-i</span> <span class="token comment"># 等效于 make image</span>
$ mksuger.sh uc <span class="token parameter variable">-i</span> <span class="token parameter variable">-v</span> v0.1.0 <span class="token comment"># 等效于 make image IMAGES=onex-usercenter VERSION=v0.1.0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="推送容器镜像" tabindex="-1"><a class="header-anchor" href="#推送容器镜像"><span>推送容器镜像</span></a></h3>
<p>推送容器镜像的操作命令跟构建容器镜像几乎一样，唯一的不同是推送镜像用的 Makefile 规则名是 <code v-pre>push</code>，而构建镜像用的 Makefile 规则名是image。</p>
<ol>
<li>使用 Makefile 规则编译</li>
</ol>
<p>推送容器镜像命令如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">make</span> push <span class="token assign-left variable">IMAGES</span><span class="token operator">=</span>onex-usercenter <span class="token comment"># 构建并推送单个：构建并推送 onex-usercenter 容器镜像</span>
$ <span class="token function">make</span> push <span class="token assign-left variable">IMAGES</span><span class="token operator">=</span><span class="token string">"onex-usercenter onex-gateway"</span> <span class="token comment"># 构建并推送多个：构建并推送 onex-usercenter, onex-gateway 容器镜像</span>
$ <span class="token function">make</span> push <span class="token comment"># 构建并推送所有</span>
$ <span class="token function">make</span> push <span class="token assign-left variable">IMAGES</span><span class="token operator">=</span>onex-usercenter <span class="token assign-left variable">VERSION</span><span class="token operator">=</span>v0.1.0 <span class="token comment"># 构建时，通过指定 VERSION 变量，指定镜像版本</span>
$ <span class="token function">make</span> push <span class="token assign-left variable">IMAGES</span><span class="token operator">=</span>onex-usercenter <span class="token assign-left variable">REGISTRY_PREFIX</span><span class="token operator">=</span>ccr.ccs.tencentyun.com/superproj <span class="token comment"># 指定镜像仓库 push</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>OneX <code v-pre>make push</code> 命令默认 push 的镜像仓库是 <code v-pre>ccr.ccs.tencentyun.com/superproj</code>，你可以通过 <code v-pre>REGISTRY_PREFIX</code> 变量，设置为你自己的镜像仓库。如果你觉得每次指定 <code v-pre>REGISTRY_PREFIX</code> 环境变量麻烦，你可以使用以下命令将 <code v-pre>REGISTRY_PREFIX</code> 配置到 <code v-pre>$HOME/.bashrc</code> 中：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token builtin class-name">echo</span> <span class="token string">"REGISTRY_PREFIX=ccr.ccs.tencentyun.com/superproj"</span> <span class="token operator">>></span> <span class="token environment constant">$HOME</span>/.bashrc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="2">
<li>使用脚本快捷编译</li>
</ol>
<p>推送容器镜像命令如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ mksuger.sh uc <span class="token parameter variable">-p</span> <span class="token comment"># 等效于  make push IMAGES=onex-usercenter</span>
$ mksuger.sh uc gw <span class="token parameter variable">-p</span> <span class="token comment"># 等效于 make push IMAGES="onex-usercenter onex-gateway"</span>
$ mksuger.sh <span class="token parameter variable">-p</span> <span class="token comment"># 等效于 make push</span>
$ mksuger.sh uc <span class="token parameter variable">-p</span> <span class="token parameter variable">-v</span> v0.1.0 <span class="token comment"># 等效于 make push IMAGES=onex-usercenter VERSION=v0.1.0</span>
$ mksuger.sh uc <span class="token parameter variable">-p</span> <span class="token assign-left variable">REGISTRY_PREFIX</span><span class="token operator">=</span>ccr.ccs.tencentyun.com/superproj <span class="token comment"># 指定镜像仓库 push</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我开发过程中，最常用的命令</p>
<p>上面介绍了很多编译、构建的命令，在开发中，我使用最高频的命令是：</p>
<ul>
<li><code v-pre>mksuger.sh uc</code>：编译 onex-usercenter 源码，非容器化部署时使用；</li>
<li><code v-pre>mksuger.sh uc -i</code>：构建 onex-usercenter 镜像，容器化部署时使用；</li>
<li><code v-pre>mksuger.sh</code>：测试所有组件能够成功编译时使用；</li>
<li><code v-pre>make all</code>：格式化、生成源码、代码静态检查、编译、单元测试时使用。一般阶段性提交前，做一次全面的 CI 流程验证。</li>
</ul>
<h2 id="如何本机快速部署验证" tabindex="-1"><a class="header-anchor" href="#如何本机快速部署验证"><span>如何本机快速部署验证</span></a></h2>
<p>上面，我详细介绍了开发过程中常用的操作命令。这些命令可以支持你编译源码、构建或推送容器镜像。当有了这些构建产物之后，我们就可以使用这些产物，来部署相关的组件。</p>
<p>本小节，我来给你介绍如何在不同场景下，使用不同的方法，来部署 OneX 组件。</p>
<h3 id="容器化部署时-如何更新服务" tabindex="-1"><a class="header-anchor" href="#容器化部署时-如何更新服务"><span>容器化部署时，如何更新服务？</span></a></h3>
<p>在我们执行完 <code v-pre>make docker-install</code> 之后，容器中的 OneX 安装目录，会以可读写的方式，被映射到宿主机的同名目录下。例如：容器中 OneX 文件的安装目录为 <code v-pre>/opt/onex</code>，在宿主机上也会有一个 <code v-pre>/opt/onex</code> 目录，里面的文件和容器中的 <code v-pre>/opt/onex</code> 目录其实是相同的。具体实现代码见：<code v-pre>onex::onex::docker::install</code> 函数（位于 <a href="https://github.com/superproj/onex/blob/v0.1.0/scripts/installation/onex.sh#L24" target="_blank" rel="noopener noreferrer">scripts/installation/onex.sh<ExternalLinkIcon/></a> 文件中）：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>  <span class="token function">docker</span> volume create <span class="token parameter variable">--driver</span> <span class="token builtin class-name">local</span> <span class="token parameter variable">-o</span> <span class="token assign-left variable">type</span><span class="token operator">=</span>none <span class="token parameter variable">-o</span> <span class="token assign-left variable">device</span><span class="token operator">=</span><span class="token variable">${ONEX_INSTALL_DIR}</span> <span class="token parameter variable">-o</span> <span class="token assign-left variable">o</span><span class="token operator">=</span>bind onex-volume

  <span class="token builtin class-name">echo</span> <span class="token string">"Create onex using ccr.ccs.tencentyun.com/superproj/onex-allinone-amd64:<span class="token variable">${ONEX_IMAGE_VERSION}</span>"</span>
  <span class="token comment"># 启动 onex 容器</span>
  <span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">--name</span> onex <span class="token punctuation">\</span>
    <span class="token parameter variable">--tmpfs</span> /tmp <span class="token punctuation">\</span>
    <span class="token parameter variable">--tmpfs</span> /run <span class="token punctuation">\</span>
    <span class="token parameter variable">--tmpfs</span> /run/lock <span class="token punctuation">\</span>
    <span class="token parameter variable">-v</span> /sys/fs/cgroup:/sys/fs/cgroup:rw <span class="token punctuation">\</span>
    <span class="token parameter variable">-v</span> onex-volume:<span class="token variable">${ONEX_INSTALL_DIR}</span>:rw <span class="token punctuation">\</span>
    <span class="token punctuation">..</span>. <span class="token punctuation">\</span>
    ccr.ccs.tencentyun.com/superproj/onex-allinone-amd64:<span class="token variable">${ONEX_IMAGE_VERSION}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述 bash 源码中，首先使用 <code v-pre>docker volume create</code> 创建了一个 docker 命名卷，名字为 <code v-pre>onex-volume</code>，并将其绑定到 <code v-pre>${ONEX_INSTALL_DIR}</code> 目录中。</p>
<p>接着，在创建onex容器时，将将之前创建的 <code v-pre>onex-volume</code> 挂载到容器内的 <code v-pre>${ONEX_INSTALL_DIR}</code> 目录，并赋予读写权限。</p>
<p>之后，我们便可以通过更新宿主机上的 <code v-pre>/opt/onex</code> 目录下的文件，来更新 OneX 组件的配置和组件二进制文件，并登录到容器使用 <code v-pre>systemctl restart</code> 命令重启对应服务。</p>
<p>通过容器卷挂载，将容器中的目录映射到宿主机，从而更新宿主机文件，来间接更新容器中文件，这种方式可以带来以下好处：</p>
<ul>
<li>提高操作效率：可以不用每次都使用 <code v-pre>docker cp</code> 的方式复制本机的文件到容器中，并且减少登录容器的操作；</li>
<li>不用编译镜像，提高更新效率：容器化部署时，需要使用镜像进行部署，如果每次都编译一个 onex-allinone 镜像，整个镜像构建时间耗时很久。通过这种方式，我们不用重新编译镜像，便可以更新现有镜像中的某个服务二进制文件，从而大大缩短了编译、构建的时间，提高了更新效率；</li>
<li>一致性的操作体验：整个操作流程，跟非容器化部署时是一致的，可以减少分叉理解、记忆的成本，让项目管理变得更加一致。</li>
</ul>
<p>具体步骤和操作命令如下。</p>
<ol>
<li>修改源码和编译源码</li>
</ol>
<p>首先，编辑 <code v-pre>internal/fakeserver/service/order.go</code> 文件，添加每个 API 接口调用的日志打印代码，修改后的代码变更如下图所示：</p>
<figure><img src="/images/修改后代码变更.png" alt="修改后代码变更" tabindex="0" loading="lazy"><figcaption>修改后代码变更</figcaption></figure>
<p>这里，我们修改的源码比较简单，直接参考CreateOrder接口中的日志代码代码即可。</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">vi</span> internal/fakeserver/service/order.go
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>源码修改完成后，便可以执行 <code v-pre>mksuger.sh</code> 命令，来编译 onex-fakeserver 组件，命令如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ mksuger.sh fake
make: Entering directory <span class="token string">'/home/colin/workspace/golang/src/github.com/superproj/onex'</span>
<span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">=</span><span class="token operator">></span> Building binary onex-fakeserver v0.18.0+20240122090426 <span class="token keyword">for</span> linux amd64
make: Leaving directory <span class="token string">'/home/colin/workspace/golang/src/github.com/superproj/onex'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2">
<li>更新源码文件，并重启服务</li>
</ol>
<p>编译完源码之后，便可以将编译后的二进制文件更新到容器中，并重启服务。具体命令如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">sudo</span> <span class="token function">cp</span> <span class="token parameter variable">-f</span> _output/platforms/linux/amd64/onex-fakeserver /opt/onex/bin/ <span class="token comment"># 更新组件，</span>
$ <span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> onex systemctl restart onex-fakeserver <span class="token comment"># 重启服务</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到，整个服务更新流程，非常丝滑快捷。因为 onex-fakeserver 可能正在被使用，所以要加-f强制复制，否则可能会报以下错误：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">sudo</span> <span class="token function">cp</span> _output/platforms/linux/amd64/onex-fakeserver /opt/onex/bin/
cp: cannot create regular <span class="token function">file</span> <span class="token string">'/opt/onex/bin/onex-fakeserver'</span><span class="token builtin class-name">:</span> Text <span class="token function">file</span> busy
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果你想更新 onex-fakeserver 的配置文件，直接编辑 <code v-pre>/opt/onex/etc/onex-fakeserver.yaml</code> 文件即可，并执行以下命令重启服务：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> onex systemctl restart onex-fakeserver <span class="token comment"># 重启服务</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="3">
<li>查看日志</li>
</ol>
<p>如果在容器化安装时，设置的日志输出为 <code v-pre>stdout</code>，那么可以使用以下命令来查看 onex-fakeserver 的日志，进行测试、排障等：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">docker</span> <span class="token builtin class-name">exec</span> onex journalctl <span class="token parameter variable">-u</span> onex-fakeserver
$ <span class="token function">docker</span> <span class="token builtin class-name">exec</span> onex journalctl <span class="token parameter variable">-u</span> onex-fakeserver <span class="token parameter variable">-f</span> <span class="token comment"># 持续跟踪日志文件的输出</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在安装时，你可以通过 <code v-pre>ONEX_LOG_OUTPUT</code> 来统一设置 OneX 组件日志的打印路径，<code v-pre>ONEX_LOG_OUTPUT</code> 可能的取值为：</p>
<ul>
<li><code v-pre>&quot;&quot;</code>：空值，OneX 各组件会将日志输出在其日志文件中，例如：
<ul>
<li>onex-fakeserver 日志文件为 <code v-pre>${ONEX_LOG_DIR}/onex-fakeserver.log</code>（例如：<code v-pre>/opt/onex/log/onex-fakeserver.log</code>）；</li>
<li>onex-usercenter 日志文件为 <code v-pre>${ONEX_LOG_DIR}/onex-usercenter.log</code>（例如：<code v-pre>/opt/onex/log/onex-usercneter.log</code>）；</li>
<li>...</li>
</ul>
</li>
<li><code v-pre>stdout</code>：OneX 各组件会将日志输出到标准输出中。</li>
</ul>
<p>如果设置 <code v-pre>ONEX_LOG_OUTPUT=&quot;&quot;</code>，OneX 各组件会将日志输出在其默认日志文件中， 这时候，我们可以使用以下命名来查看日志：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">cat</span> /opt/onex/log/onex-fakeserver.log
$ <span class="token function">tail</span> <span class="token parameter variable">-f</span> /opt/onex/log/onex-fakeserver.log <span class="token comment"># 持续跟踪日志文件的输出</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4">
<li>测试 onex-fakeserver 服务</li>
</ol>
<p>如何测试服务，你可以通过日志来观察组件的运行是否符合预期。也可以直接调用 Web 服务提供的 API 接口，来看结构是否成功返回，返回结果是否符合预期等。如果需要，你可以根据程序逻辑设计合理的测试方法。</p>
<p>这里，我们来看下如何测试 onex-fakeserver。</p>
<p><strong>方法 1：调用 gRPC API 接口</strong></p>
<p>这里我们使用 <code v-pre>grpcurl</code> 工具来请求 onex-fakeserver 的 gRPC 接口。<code v-pre>grpcurl</code> 工具安装方法如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">make</span> tools.install.grpcurl
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code v-pre>grpcurl</code> 是基于反射，需要在启动服务前添加这样一行代码（见 <a href="https://github.com/superproj/onex/blob/v0.1.0/internal/fakeserver/server.go#L121" target="_blank" rel="noopener noreferrer">internal/fakeserver/server.go#L121<ExternalLinkIcon/></a>）：</p>
<div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre v-pre class="language-go"><code>reflection<span class="token punctuation">.</span><span class="token function">Register</span><span class="token punctuation">(</span>grpcsrv<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>安装完 <code v-pre>grpcurl</code> 工具之后，就可以使用 <code v-pre>grpcurl</code> 来请求 onex-fakeserver 提供的 gRPC 接口进行测试：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 列出所有的 gRPC 服务</span>
$ grpcurl <span class="token parameter variable">-plaintext</span> <span class="token variable">${ONEX_ACCESS_HOST}</span><span class="token builtin class-name">:</span><span class="token variable">${ONEX_FAKESERVER_GRPC_PORT}</span> list
fakeserver.v1.FakeServer
grpc.reflection.v1.ServerReflection
grpc.reflection.v1alpha.ServerReflection
<span class="token comment"># 列出 fakeserver.v1.FakeServer 服务中提供的 gRPC 接口</span>
$ grpcurl <span class="token parameter variable">-plaintext</span> <span class="token variable">${ONEX_ACCESS_HOST}</span><span class="token builtin class-name">:</span><span class="token variable">${ONEX_FAKESERVER_GRPC_PORT}</span> list fakeserver.v1.FakeServer
fakeserver.v1.FakeServer.CreateOrder
fakeserver.v1.FakeServer.DeleteOrder
fakeserver.v1.FakeServer.GetOrder
fakeserver.v1.FakeServer.ListOrder
fakeserver.v1.FakeServer.UpdateOrder
<span class="token comment"># 调用 fakeserver.v1.FakeServer.ListOrder 接口，进行测试</span>
$ grpcurl <span class="token parameter variable">-plaintext</span> <span class="token parameter variable">-d</span> <span class="token string">'{"offset":0, "limit":1}'</span> <span class="token variable">${ONEX_ACCESS_HOST}</span><span class="token builtin class-name">:</span><span class="token variable">${ONEX_FAKESERVER_GRPC_PORT}</span> fakeserver.v1.FakeServer.ListOrder
<span class="token punctuation">{</span>
  <span class="token string">"totalCount"</span><span class="token builtin class-name">:</span> <span class="token string">"500"</span>,
  <span class="token string">"Orders"</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token string">"orderID"</span><span class="token builtin class-name">:</span> <span class="token string">"order-1h6o9c"</span>,
      <span class="token string">"customer"</span><span class="token builtin class-name">:</span> <span class="token string">"Katherine Monahan"</span>,
      <span class="token string">"product"</span><span class="token builtin class-name">:</span> <span class="token string">"Blackcurrant"</span>,
      <span class="token string">"quantity"</span><span class="token builtin class-name">:</span> <span class="token string">"-3031178453138843774"</span>,
      <span class="token string">"createdAt"</span><span class="token builtin class-name">:</span> <span class="token string">"2024-01-22T05:06:18.438286503Z"</span>,
      <span class="token string">"updatedAt"</span><span class="token builtin class-name">:</span> <span class="token string">"2024-01-22T05:06:18.438286582Z"</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>方法 2：调用 HTTP API 接口</strong></p>
<p>执行以下命令来测试：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">curl</span> <span class="token string">"http://<span class="token variable">${ONEX_ACCESS_HOST}</span>:<span class="token variable">${ONEX_FAKESERVER_HTTP_PORT}</span>/v1/orders?offset=0&amp;limit=1"</span>
<span class="token punctuation">{</span><span class="token string">"totalCount"</span><span class="token builtin class-name">:</span><span class="token string">"500"</span>, <span class="token string">"Orders"</span>:<span class="token punctuation">[</span><span class="token punctuation">{</span><span class="token string">"orderID"</span><span class="token builtin class-name">:</span><span class="token string">"order-1h6o9c"</span>, <span class="token string">"customer"</span><span class="token builtin class-name">:</span><span class="token string">"Ana Green"</span>, <span class="token string">"product"</span><span class="token builtin class-name">:</span><span class="token string">"Damson"</span>, <span class="token string">"quantity"</span><span class="token builtin class-name">:</span><span class="token string">"6452211039747092050"</span>, <span class="token string">"createdAt"</span><span class="token builtin class-name">:</span><span class="token string">"2024-01-22T01:07:03.437875013Z"</span>, <span class="token string">"updatedAt"</span><span class="token builtin class-name">:</span><span class="token string">"2024-01-22T01:07:03.437875121Z"</span><span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>/v1/orders</code> 接口成功返回，说明 <code v-pre>/v1/orders</code> 可以成功调通。接下来，你可以做进一步的测试，例如：查看字段值返回是否正确，查看日志是否有异常，或者修改请求输入参数，继续测试并观察。</p>
<p>在日常开发中，因为 HTTP 接口规范、调用方便、JSON 串可读性高，所以，我基本都是用 HTTP 接口来进行测试的。</p>
<p><strong>方法 3：观察 onex-fakeserver 日志输出</strong></p>
<p>打开一个 LInux 终端 A，运行以下命令，持续跟踪 onex-fakeserver 的日志输出：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">docker</span> <span class="token builtin class-name">exec</span> onex journalctl <span class="token parameter variable">-u</span> onex-fakeserver <span class="token parameter variable">-f</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>打开一个新的 Linux 终端 B，运行以下命令，来请求 <code v-pre>/v1/orders</code> 接口：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">curl</span> <span class="token string">"http://<span class="token variable">${ONEX_ACCESS_HOST}</span>:<span class="token variable">${ONEX_FAKESERVER_HTTP_PORT}</span>/v1/orders?offset=0&amp;limit=1"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在 A 终端中，观察到有以下日志输出：</p>
<figure><img src="/images/函数调用日志打印.png" alt="函数调用日志打印" tabindex="0" loading="lazy"><figcaption>函数调用日志打印</figcaption></figure>
<p>说明，<code v-pre>ListOrder</code> 接口中，添加的日志打印代码通过测试。</p>
<h3 id="本机非容器化部署时-如何更新服务" tabindex="-1"><a class="header-anchor" href="#本机非容器化部署时-如何更新服务"><span>本机非容器化部署时，如何更新服务？</span></a></h3>
<p>采用非容器化部署时，更新、测试服务流程和采用容器化部署时几乎保持一致，差异点如下：</p>
<ol>
<li>启动方式：使用非容器化部署时，重启服务的方式如下：</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">sudo</span> systemctl restart onex-fakeserver <span class="token comment"># 本机直接执行</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="2">
<li>查看日志方式：使用非容器化部署时，查看日志的方式如下：</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">tail</span> <span class="token parameter variable">-f</span> /opt/onex/log/onex-fakeserver.log <span class="token comment"># 持续跟踪日志文件的输出</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>可以看到，OneX 项目在开发流程设计上，也尽可能保证了流程一致性。</p>
<h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h2>
<p>在部署好 OneX 项目后，我们就具备了二次魔改 OneX 项目的条件。本节课，给你详细介绍了 OneX 项目不同的编译构建方式，这些编译构建方式在操作风格上完全保持一致，之所以能保持高度的一致，是因为 OneX 项目很规范，并且在脚本、Makefile 设计上也具有很大的灵活性和可扩展性。</p>
<p>在编译和构建好 OneX 组件后，我们就可以部署组件，并进行测试。本节课介绍了不同部署方式下的，组件更新方式和测试方式。</p>
<h2 id="课后练习" tabindex="-1"><a class="header-anchor" href="#课后练习"><span>课后练习</span></a></h2>
<ol>
<li>动手实操：根据本节课的介绍，给 onex-fakeserver API 接口添加调用日志打印代码，编译、部署并测试 l</li>
<li>思考，并开发一种更便捷的方式来更新服务，查看日志</li>
</ol>
<p>在采用容器化部署时，我们使用以下方式，来更新并查看日志：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">sudo</span> <span class="token function">cp</span> _output/platforms/linux/amd64/onex-fakeserver /opt/onex/bin/ <span class="token comment"># 更新组件</span>
$ <span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> onex systemctl restart onex-fakeserver <span class="token comment"># 重启服务</span>
$ <span class="token function">docker</span> <span class="token builtin class-name">exec</span> onex journalctl <span class="token parameter variable">-u</span> onex-fakeserver
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>整个过程需要执行一次 <code v-pre>sudo cp</code>，2 次 <code v-pre>docker exec</code>，请思考一下有没有更便捷的方式，来更新服务，查看日志。如果有，请按源码修改原则，通过创建/更新脚本等方式，来二次开发，使得整个操作更加便捷，并将源码提交到你的个人 OneX 仓库；<br>
3. 请思考下，修改源码还有哪些值得遵循的原则和规范，欢迎圈子内分享。</p>
</div></template>


