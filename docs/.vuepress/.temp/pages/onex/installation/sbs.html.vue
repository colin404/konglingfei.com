<template><div><p>本文，我会详细介绍下如何一步一步通过手动操作实践去部署 OneX 系统，一窥项目部署的细节。因为在上一节课，你已经成功部署了 OneX。本节课，你可以根据需要进行选学。</p>
<div class="hint-container tip">
<p class="hint-container-title">建议</p>
<p>建议根据<RouteLink to="/onex/installation/prepare.html">Go开发环境准备</RouteLink>准备一套可用的 Go 开发环境。当然，你也可以在已有机器上部署，但可能会遇到些问题，不用担心，问题不多且可解决。</p>
</div>
<h2 id="一个开发课程-为什么部署和测试需要用四节课来讲" tabindex="-1"><a class="header-anchor" href="#一个开发课程-为什么部署和测试需要用四节课来讲"><span>一个开发课程，为什么部署和测试需要用四节课来讲？</span></a></h2>
<p>你可能会问，一个开发课程，为什么会花四节课，来介绍项目是如何部署测试的？之所以要花四节课程来讲项目如何部署和测试，除了因为项目本身具有一定的复杂度之外，更重要的原因是，通过部署实战，可以让你熟悉 Linux 系统的操作、掌握 Linux 常用的命令及 Linux 系统下软件部署的方法技巧等，是很难得的一次带着目标去学习的机会。</p>
<p>因为本课程期望达到的目标是高级 Go 开发工程师的水平，仅仅具备优秀的开发能力其实还达不到高级工程师的能力标准。高级工程师不仅要具备优秀的开发能力，还要具备架构及服务器运维、软件部署等能力。所以，我会借 OneX 项目部署的实践机会，带你熟悉和掌握 Linux 系统下软件部署的常用技能和方法，以此打磨并提高你的 Linux 系统操作、软件部署、Shell 脚本编程等能力。</p>
<p>所以，这不是劝退的四节课，而是我在用心帮助你成长的四节课，否则，我完全可以省事，只提供一种快捷的容器化安装部署方式，但那样，你能学到的安装部署知识会少很多。因为所有操作实现都在容器中，可见性很差。</p>
<h2 id="onex-部署前准备工作" tabindex="-1"><a class="header-anchor" href="#onex-部署前准备工作"><span>OneX 部署前准备工作</span></a></h2>
<div class="hint-container important">
<p class="hint-container-title">重要提示：</p>
<ul>
<li>最好基于一个新的 Linux 环境来安装，一方面可以保持操作系统环境的一致性，极大减少安装失败的概率；另一方面，执行命令时更加安全。</li>
<li>如果，你在一个已有的 Linux 环境中安装，并且环境中，已经安装有 etcd、jaeger、kafka、mariadb、mongo、redis 组件，请慎用 uninstall 类操作，因为这些操作可能会清空已有的数据。</li>
</ul>
</div>
<p>在 Debian 12 上安装软件不需要太多东西。了解基本的 Linux 终端命令就足够了。如果你是个 Linux 新手，你可以学习下基本的 Linux 终端命令，以便你理解接下来的操作。如果，你不想学习也没关系，可以跟着本节课的步骤和介绍一步一步去实操，有问题再去学习或者寻求帮助。</p>
<div class="hint-container tip">
<p class="hint-container-title">提示</p>
<p>OneX 不仅可以在 Debian 下安装，基本上在所有 Linux 发行版中都可以安装。但是，如果您想在 Ubuntu 或其他发行版上安装 OneX，则过程略有不同，欢迎你安装后分享。</p>
</div>
<p>在部署 OneX 项目前，需要进行一些准备工作。具体准备内容如下。</p>
<h3 id="_1-下载-onex-源码" tabindex="-1"><a class="header-anchor" href="#_1-下载-onex-源码"><span>1. 下载 OneX 源码</span></a></h3>
<p>OneX 项目源码托管在 GitHub 上，国内网络访问 GitHub 网速会比较慢，经常会出现超时，你可以配置 <a href="http://github.com" target="_blank" rel="noopener noreferrer">github.com<ExternalLinkIcon/></a> host 来解决：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">sudo</span> <span class="token builtin class-name">echo</span> <span class="token string">"140.82.114.4 github.com"</span> <span class="token operator">>></span> /etc/hosts
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>代理 IP <code v-pre>140.82.114.4</code> 可能会失效，你可以网上找其他可用的代理 IP 配置上。</p>
<p>想要安装 OneX 系统，首先需要先下载 OneX 源码。<strong>本课程使用的 OneX 源码分支为 <code v-pre>v0.1.0</code></strong>。OneX 源码下载命令如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> <span class="token variable">$WORKSPACE</span>/golang/src/github.com/superproj
$ <span class="token builtin class-name">cd</span> <span class="token variable">$WORKSPACE</span>/golang/src/github.com/superproj
$ <span class="token function">git</span> clone https://github.com/superproj/onex
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-设置并加载环境变量" tabindex="-1"><a class="header-anchor" href="#_2-设置并加载环境变量"><span>2. 设置并加载环境变量</span></a></h3>
<p>OneX 项目在安装时，需要设置组件的绑定地址、端口、用户名、密码、CA、日志等，这些设置均统一通过环境变量进行设置。所以，安装前，我们还需要配置环境变量，来设置安装参数。如果你是在一个全新的 Debian 系统上进行安装，环境变量值使用默认值即可。</p>
<p>环境变量太多时，如何高效管理和维护环境变量？</p>
<p>OneX 项目因为组件较多，每个组件的设置也多，这就导致会有大量的环境变量需要设置，其管理和维护就会带来很大的挑战。那么如何维护这些环境变量呢？你可以 通过以下方式来高效管理和维护这些环境变量：</p>
<ul>
<li>
<p><strong>环境变量跟组件的配置格式保持一致：</strong> OneX 项目几乎所有组件的配置均使用 viper 包，viper 包可以读取环境变量作为其配置值。viper 包可以将一个 OneX 配置映射为环境变量。</p>
<p>onex-usercenter 在启动时，使用了 <code v-pre>github.com/superproj/onex/pkg/app</code> 包来构建其应用框架，<code v-pre>app</code> 包在构建应用框架时，需要设置一个应用名称，相应的代码见：<a href="https://github.com/superproj/onex/blob/v0.1.0/cmd/onex-usercenter/main.go#L19" target="_blank" rel="noopener noreferrer">app.NewApp(&quot;onex-usercenter&quot;).Run()<ExternalLinkIcon/></a>。<code v-pre>app</code> 包在构建应用程序的时候，使用 viper 包来管理应用程序的配置，并且设置 viper 读取配置时的环境变量格式如下（位于函数 <a href="https://github.com/superproj/onex/blob/v0.1.0/pkg/app/options.go#L44" target="_blank" rel="noopener noreferrer">AddConfigFlag<ExternalLinkIcon/></a> 中）：</p>
</li>
</ul>
<div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">AddConfigFlag</span><span class="token punctuation">(</span>fs <span class="token operator">*</span>pflag<span class="token punctuation">.</span>FlagSet<span class="token punctuation">,</span> name <span class="token builtin">string</span><span class="token punctuation">,</span> watch <span class="token builtin">bool</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    fs<span class="token punctuation">.</span><span class="token function">AddFlag</span><span class="token punctuation">(</span>pflag<span class="token punctuation">.</span><span class="token function">Lookup</span><span class="token punctuation">(</span>configFlagName<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token comment">// 启用 viper 的自动环境变量解析功能。这意味着 viper 将自动从环境变量中读取与 viper 变量相对应的值</span>
    viper<span class="token punctuation">.</span><span class="token function">AutomaticEnv</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token comment">// 设置环境变量前缀。使用 strings.ReplaceAll 函数将 name 中的连字符替换为下划线，</span>
    <span class="token comment">// 并使用 strings.ToUpper 将名称转换为大写，然后将其设置为环境变量的前缀</span>
    viper<span class="token punctuation">.</span><span class="token function">SetEnvPrefix</span><span class="token punctuation">(</span>strings<span class="token punctuation">.</span><span class="token function">ReplaceAll</span><span class="token punctuation">(</span>strings<span class="token punctuation">.</span><span class="token function">ToUpper</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">"-"</span><span class="token punctuation">,</span> <span class="token string">"_"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token comment">// 设置环境变量键名的替换规则。使用 strings.NewReplacer 函数来指定将点号和连字符替换为下划线</span>
    viper<span class="token punctuation">.</span><span class="token function">SetEnvKeyReplacer</span><span class="token punctuation">(</span>strings<span class="token punctuation">.</span><span class="token function">NewReplacer</span><span class="token punctuation">(</span><span class="token string">"."</span><span class="token punctuation">,</span> <span class="token string">"_"</span><span class="token punctuation">,</span> <span class="token string">"-"</span><span class="token punctuation">,</span> <span class="token string">"_"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

    <span class="token operator">...</span><span class="token punctuation">.</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>例如 onex-usercenter 的 YAML 格式的配置如下：</p>
<div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">http</span><span class="token punctuation">:</span>
  <span class="token key atrule">addr</span><span class="token punctuation">:</span> 0.0.0.0<span class="token punctuation">:</span><span class="token number">50843</span> <span class="token comment"># HTTP 服务监听地址</span>
<span class="token key atrule">grpc</span><span class="token punctuation">:</span>
  <span class="token key atrule">addr</span><span class="token punctuation">:</span> 0.0.0.0<span class="token punctuation">:</span><span class="token number">50090</span> <span class="token comment"># gRPC 服务监听地址</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>http.addr</code> 和 <code v-pre>grpc.addr</code> 两个配置项对应的，环境变量分别为：<code v-pre>ONEX_USERCENTER_HTTP_ADDR</code> 和 <code v-pre>ONEX_USERCENTER_GRPC_ADDR</code>。<br>
在安装 OneX 时，我们设置的环境变量也是 <code v-pre>ONEX_USERCENTER_HTTP_ADDR</code> 和 <code v-pre>ONEX_USERCENTER_GRPC_ADDR</code>：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">egrep</span> <span class="token string">'ONEX_USERCENTER_HTTP_ADDR|ONEX_USERCENTER_GRPC_ADDR'</span> manifests/env.local
$ <span class="token builtin class-name">export</span> <span class="token assign-left variable">ONEX_USERCENTER_HTTP_ADDR</span><span class="token operator">=</span><span class="token number">0.0</span>.0.0:<span class="token variable">${ONEX_USERCENTER_HTTP_PORT}</span>
$ <span class="token builtin class-name">export</span> <span class="token assign-left variable">ONEX_USERCENTER_GRPC_ADDR</span><span class="token operator">=</span><span class="token number">0.0</span>.0.0:<span class="token variable">${ONEX_USERCENTER_GRPC_PORT}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><strong>使用环境变量文件统一管理和维护：</strong> 面对大量的环境变量，最有效的方式，是使用一个环境变量文件，来统一管理和维护这些环境变量，例如 OneX 的环境变量文件为：<a href="https://github.com/superproj/onex/blob/v0.1.0/manifests/env.local" target="_blank" rel="noopener noreferrer">manifests/env.local<ExternalLinkIcon/></a>。</li>
<li><strong>使用标准化的命名约定：</strong> 我们可以在命令环境变量时遵循一定的格式，能够让我们的环境变量名称，更加统一、规范、可读，从而起到见名知意的作用。环境变量命名时，格式、名称的指代性，要大于环境变量的长度。例如，虽然环境变量 <code v-pre>ONEX_NIGHTWATCH_HEALTH_CHECK_ADDRESS</code> 很长，但我们看到环境变量名称，里面知道这是 onex-nightwatch 组件的 <code v-pre>health.check-address</code> 配置项所对应的环境变量。你会发现在设置 <code v-pre>redis.addr</code>，<code v-pre>log.level</code> 这类环境变量时，并没有遵循这个命名约定（例如环境变量设置为 <code v-pre>ONEX_REDIS_ADDR</code> 而非 <code v-pre>ONEX_USERCENTER_REDIS_ADDR</code>），原因如下：
<ul>
<li>因为 OneX 多个组件使用了 redis、log 这类通用配置， 为了简化配置项，统一复用了一个环境变量；</li>
<li>规范是一种约定，只要行为能够符合既定的约定，那么这就是一种规范，也能起到简化管理的作用。</li>
</ul>
</li>
<li><strong>按类别摆放环境变量：</strong> 我们可以将环境变量按类别、组件进行分类摆放，以便于查找和更新。</li>
<li><strong>给环境变量添加详细的注释：</strong> 因为环境变量很多，我们最好给环境变量添加详细的注释，通过注释开发者，立马可以知道这个环境变量的作用。OneX 项目每个环境变量的作用，详见 <code v-pre>manifests/env.local</code> 中的注释。</li>
<li><strong>添加统一前缀规避环境变量名冲突：</strong> 为了避免项目相关的环境变量跟系统中已有的环境变量起变量名冲突，也为了能够通过环境变量名快速识别出其作用域，我们可以给环境变量添加统一的前缀。例如 OneX 项目环境变量统一前缀为ONEX_。</li>
<li><strong>使用 Shell 变量扩展，增加灵活性：</strong> 有时候我们不想修改脚本，但想临时设置一个环境变量的值，例如：我们更新了镜像版本，想基于最新的镜像版本，安装 OneX 项目，这时候该怎么做呢？我们可以使用 Shell 变量扩展。例如 <code v-pre>manifests/env.local</code> 文件中，有以下行：</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="token comment"># `${ONEX_IMAGE_VERSION:-v0.1.0}` 语法释义如下：</span>
<span class="token comment"># 当 ONEX_IMAGE_VERSION 变量未定义或为空值时，使用 v0.1.0 作为返回值</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">ONEX_IMAGE_VERSION</span><span class="token operator">=</span><span class="token variable">${ONEX_IMAGE_VERSION<span class="token operator">:-</span>v0.1.0}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样，我们只需要在命令行中执行 <code v-pre>export ONEX_IMAGE_VERSION=v0.1.1</code> 即可修改环境变量文件中的 <code v-pre>ONEX_IMAGE_VERSION</code> 值为 <code v-pre>v0.1.0</code>，而不用去修改环境变量文件。</p>
<p>通过这种方式可以极大的提高环境变量设置的灵活性，OneX 项目的环境变量文件，和 Shell 脚本中，大量使用了这种 Shell 变量扩展语法，来提高变量设置的灵活性。</p>
<p>上述方式环境变量设置方式，也是 OneX 项目采取的方式。</p>
<h4 id="设置环境变量文件-并加载环境变量" tabindex="-1"><a class="header-anchor" href="#设置环境变量文件-并加载环境变量"><span>设置环境变量文件，并加载环境变量</span></a></h4>
<p>接下来，我们需要设置环境变量文件，并加载环境变量，命令如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token builtin class-name">cd</span> <span class="token variable">$GOSRC</span>/github.com/superproj/onex
$ <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> <span class="token environment constant">$HOME</span>/.onex
$ <span class="token function">cp</span> manifests/env.local <span class="token environment constant">$HOME</span>/.onex <span class="token comment"># 复制后，可以根据需要修改 $HOME/.onex/env.local 中的环境变量</span>
$ <span class="token builtin class-name">export</span> <span class="token assign-left variable">ONEX_ENV_FILE</span><span class="token operator">=</span><span class="token environment constant">$HOME</span>/.onex/env.local
$ <span class="token builtin class-name">source</span> <span class="token variable">${ONEX_ENV_FILE}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-配置-home-bashrc" tabindex="-1"><a class="header-anchor" href="#_3-配置-home-bashrc"><span>3. 配置 <code v-pre>$HOME/.bashrc</code></span></a></h3>
<p>为了能够方便访问 onex 项目，我们可以配置一些 alias 和环境变量，至于配置哪些，可以根据自己的需要进行配置。例如，我配置了以下环境变量和 alias 用来快速访问 onex 项目的目录：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">tee</span> <span class="token parameter variable">-a</span> <span class="token environment constant">$HOME</span>/.bashrc <span class="token operator">&lt;&lt;</span> <span class="token string">'EOF'
# Alias and environments for onex quick access
export GOSRC="$WORKSPACE/golang/src"
export ONEX_ROOT="$GOSRC/github.com/superproj/onex"
export PATH=${ONEX_ROOT}/_output/platforms/linux/amd64:${ONEX_ROOT}/scripts:$PATH
alias sp="cd $GOSRC/github.com/superproj"
# 键入 `o` 直接进入到 onex 项目根目录
alias o="cd $GOSRC/github.com/superproj/onex"
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-配置域名" tabindex="-1"><a class="header-anchor" href="#_4-配置域名"><span>4. 配置域名</span></a></h3>
<p>在访问 OneX 项目各个组件提供的 API 接口时，为了防止 IP 变更带来的适配，我们最好通过域名来访问 OneX 组件。因为 OneX 项目相关的域名没有注册，还不能在互联网上解析，所以需要配置 hosts，具体的操作如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">sudo</span> <span class="token function">tee</span> <span class="token parameter variable">-a</span> /etc/hosts <span class="token operator">&lt;&lt;</span> <span class="token string">EOF

# host configs for onex project
<span class="token variable">${ONEX_ACCESS_HOST}</span> onex.usercenter.superproj.com
<span class="token variable">${ONEX_ACCESS_HOST}</span> onex.gateway.superproj.com
<span class="token variable">${ONEX_ACCESS_HOST}</span> onex.apiserver.superproj.com
<span class="token variable">${ONEX_ACCESS_HOST}</span> onex.nightwatch.superproj.com
<span class="token variable">${ONEX_ACCESS_HOST}</span> onex.pump.superproj.com
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-更新系统" tabindex="-1"><a class="header-anchor" href="#_5-更新系统"><span>5. 更新系统</span></a></h3>
<p>为了确保 Debian 12 系统具有最新的安全补丁和软件，需要更新系统中的软件包版本，运行以下命令来更新：<br>
<code v-pre>sudo apt update</code></p>
<h3 id="_6-安装依赖" tabindex="-1"><a class="header-anchor" href="#_6-安装依赖"><span>6. 安装依赖</span></a></h3>
<p>这里，我们还需要安装一些软件包，这些软件包在你安装 OneX 涉及的软件包或者其他软件包时，可能会需要。安装命令如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> <span class="token parameter variable">-y</span> dirmngr ca-certificates software-properties-common apt-transport-https 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>依赖软件包功能介绍：</p>
<ul>
<li><code v-pre>dirmngr</code> 是一个用于管理网络上的密钥和证书的工具。它可以用来下载、安装和管理 GnuPG 密钥，以及处理证书验证。在 Debian 系统中，<code v-pre>dirmngr</code> 通常用于支持对 HTTPS 存储库的访问，并确保软件包的完整性和安全性。</li>
<li><code v-pre>ca-certificates</code> 是一组根证书和中间证书，用于验证和加密 HTTPS 连接。它包含了一系列受信任的证书颁发机构（CA）的根证书，用于验证 HTTPS 网站的身份。安装 <code v-pre>ca-certificates</code> 软件包可以确保系统能够正常验证 HTTPS 连接的证书。</li>
<li><code v-pre>software-properties-common</code> 软件包提供了一些管理软件源的工具和公共文件，包括 <code v-pre>add-apt-repository</code> 命令，这个命令用于添加 PPA（个人软件包存档）源。通过安装 <code v-pre>software-properties-common</code>，你可以方便地管理系统的软件源和添加第三方软件源。</li>
<li><code v-pre>apt-transport-https</code> 允许 APT 软件包管理工具通过 HTTPS 协议访问软件源。安装这个软件包可以确保你可以安全地从 HTTPS 存储库中安装软件包，并保持软件包的完整性和安全性。</li>
</ul>
<h2 id="存储组件安装" tabindex="-1"><a class="header-anchor" href="#存储组件安装"><span>存储组件安装</span></a></h2>
<p>因为 OneX 系统用到了 MariaDB、Redis、MongoDB、Etcd 等存储组件来存储数据。所以，我们还需要手动安装这些存储组件。具体，我们需要安装和配置以下 4 种存储组件：</p>
<ol>
<li>MariaDB；</li>
<li>Redis；</li>
<li>Mongo；</li>
<li>Etcd。</li>
</ol>
<h3 id="mariadb-安装和配置" tabindex="-1"><a class="header-anchor" href="#mariadb-安装和配置"><span>MariaDB 安装和配置</span></a></h3>
<p>首先，我们来看下 MariaDB 如何安装和配置。MariaDB 是 OneX 项目中用来存储 REST 资源的数据库。在项目开发中，需要经常访问 MariaDB 数据库。课程后面会有专门的小节，介绍如何通过编程的方式来访问 MariaDB 中的数据。课程后面也会分享一些 MariaDB 的最佳实践。本小节，我们聚焦在 MariaDB 的安装和配置上。</p>
<h4 id="为什么选择-mariadb-作为关系型数据库" tabindex="-1"><a class="header-anchor" href="#为什么选择-mariadb-作为关系型数据库"><span>为什么选择 MariaDB 作为关系型数据库？</span></a></h4>
<p>OneX 会把 REST 资源的信息存储在关系型数据库中，使用关系型数据库，可以很方便的进行数据查询和存储。关系型数据库我选择了 MariaDB。你可能会问“为啥选择 MariaDB，而不是 MySQL？”. 选择 MariaDB 一方面是因为它是发展最快的 MySQL 分支，相比 MySQL，它加入了很多新的特性，并且它能够完全兼容 MySQL，包括 API 和命令行。另一方面是因为 MariaDB 是开源的，而且迭代速度很快。</p>
<p>MariaDB 的主要特点如下：</p>
<ul>
<li>SQL 支持：MariaDB 完全支持结构化查询语言，这是关系数据库管理的标准语言。</li>
<li>ACID 事务：通过原子性、一致性、隔离性和持久性确保数据的可靠性和完整性。</li>
<li>高级数据库操作：从存储过程、触发器和视图到复制和集群，MariaDB 提供了全面的功能套件。</li>
<li>搜索和数据安全：全文搜索、空间数据和高级加密等功能使得 MariaDB 多才多艺且安全可靠。</li>
</ul>
<p>一线大厂中的很多明星产品或项目，也都选择了 MariaDB 作为关系型数据库，使用过程中，也都很丝滑。所以，如果你需要开发一个生产级的应用，底层关系型数据库也建议首选 MariaDB。</p>
<h4 id="一键安装-使用脚本快速安装和卸载-mariadb" tabindex="-1"><a class="header-anchor" href="#一键安装-使用脚本快速安装和卸载-mariadb"><span>一键安装：使用脚本快速安装和卸载 MariaDB</span></a></h4>
<p>如果你觉得不需要学习或者不想手动安装 MariaDB，你可以直接执行我编写的脚本来一键安装和卸载：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token builtin class-name">cd</span> <span class="token variable">${ONEX_ROOT}</span>
$ ./scripts/installation/mariadb.sh onex::mariadb::sbs::install    <span class="token comment"># 一键部署</span>
$ ./scripts/installation/mariadb.sh onex::mariadb::sbs::uninstall  <span class="token comment"># 一键卸载</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果你想学习安装细节，可以继续阅读本小节其他内容。</p>
<h4 id="mariadb-安装和配置-1" tabindex="-1"><a class="header-anchor" href="#mariadb-安装和配置-1"><span>MariaDB 安装和配置</span></a></h4>
<ol>
<li>配置 MariaDB APT 源</li>
</ol>
<p>你可以执行以下命令来配置：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 从指定的 URL中获取 MariaDB 的发布密钥。这个密钥用于验证 MariaDB 软件包的签名，确保软件包在下载和安装过程中的完整性和安全性</span>
$ <span class="token function">sudo</span> apt-key adv --fetch-keys <span class="token string">'https://mariadb.org/mariadb_release_signing_key.asc'</span>
<span class="token comment"># 配置 MariaDB 安装 APT 源</span>
$ <span class="token builtin class-name">echo</span> <span class="token string">"deb [arch=amd64,arm64] https://mirrors.aliyun.com/mariadb/repo/11.2.2/debian/ <span class="token variable"><span class="token variable">$(</span>lsb_release <span class="token parameter variable">-cs</span><span class="token variable">)</span></span> main"</span> <span class="token operator">|</span> <span class="token function">sudo</span> <span class="token function">tee</span> /etc/apt/sources.list.d/mariadb-11.2.2.list
<span class="token comment"># 配置完 APT 源后，需要运行 apt update 更新本地的软件包列表，以确保系统能够获取到最新的软件包信息</span>
$ <span class="token function">sudo</span> <span class="token function">apt</span> update
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>lsb_release -cs</code> 用于获取 Linux 系统当前发行版的代号。例如：</p>
<div class="language-absh line-numbers-mode" data-ext="absh" data-title="absh"><pre v-pre class="language-absh"><code>$ lsb_release -cs
buster
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>main</code> 是指软件存储库的主要部分，包含了 Debian 官方支持的自由软件。因此 <code v-pre>$(lsb_release -cs) main</code> 表示正在使用的软件存储库是针对 Debian 发行版代号为 <code v-pre>buster</code> 的主要软件存储库。</p>
<ol start="2">
<li>安装 MariaDB 客户端和 MariaDB 服务端</li>
</ol>
<p>执行以下命令来安装：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code> <span class="token comment"># 需要先创建 /var/lib/mysql/ 目录，否则 `systemctl start mariadb` 时可能会报错</span>
$ <span class="token function">sudo</span> <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /var/lib/mysql
$ <span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> <span class="token parameter variable">-y</span> <span class="token parameter variable">-o</span> Dpkg::Options::<span class="token operator">=</span><span class="token string">"--force-confmiss"</span> <span class="token parameter variable">--reinstall</span> mariadb-client mariadb-server
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因为，在卸载 MariaDB 时，我们可能会删除配置文件，这样下一次安装时，默认不会重新安装配置文件，会报配置文件丢失的错误。为了规避这个错误，需要重新安装缺失的配置文件，这可以通过以下 2 个选项来实现：</p>
<ul>
<li><code v-pre>-o Dpkg::Options::=&quot;--force-confmiss&quot;</code>：这个选项指示 <code v-pre>dpkg</code> 工具在重新安装软件包时忽略任何缺失的配置文件。通常情况下，如果软件包的配置文件丢失，系统会提示用户进行手动处理，但使用这个选项可以强制 <code v-pre>dpkg</code> 在重新安装时不考虑缺失的配置文件。</li>
<li><code v-pre>--reinstall</code>：这个选项表示要重新安装指定的软件包。</li>
</ul>
<p>我们可以通过以下命令，来简单快速验证是否安装成功：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ mariadb <span class="token parameter variable">--version</span>
mariadb from <span class="token number">11.2</span>.2-MariaDB, client <span class="token number">15.2</span> <span class="token keyword">for</span> debian-linux-gnu <span class="token punctuation">(</span>x86_64<span class="token punctuation">)</span> using readline <span class="token number">5.2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在 Linux 系统下，验证一个工具或者软件是否成功安装，最常用、最便捷的方法便是打印目标工具或软件的版本，通常这些版本都会提供<code v-pre>-v/--version/version</code>选项来打印其版本，例如：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>mariadb <span class="token parameter variable">--version</span>
etcdctl version
mongosh <span class="token parameter variable">--version</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3">
<li>启动 MariaDB，并设置开机启动</li>
</ol>
<p>执行完 <code v-pre>apt -y install命</code> 令后，MariaDB 已经处在启动状态，我们可以使用以下命令来验证：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ systemctl status mariadb
● mariadb.service - MariaDB <span class="token number">11.2</span>.2 database server
   Loaded: loaded <span class="token punctuation">(</span>/lib/systemd/system/mariadb.service<span class="token punctuation">;</span> enabled<span class="token punctuation">;</span> vendor preset: enabled<span class="token punctuation">)</span>
  Drop-In: /etc/systemd/system/mariadb.service.d
           └─migrated-from-my.cnf-settings.conf
   Active: active <span class="token punctuation">(</span>running<span class="token punctuation">)</span> since Sat <span class="token number">2024</span>-01-20 <span class="token number">21</span>:22:47 CST<span class="token punctuation">;</span> 4min 24s ago
     Docs: man:mariadbd<span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">)</span>
           https://mariadb.com/kb/en/library/systemd/
  Process: <span class="token number">3998646</span> <span class="token assign-left variable">ExecStartPre</span><span class="token operator">=</span>/usr/bin/install <span class="token parameter variable">-m</span> <span class="token number">755</span> <span class="token parameter variable">-o</span> mysql <span class="token parameter variable">-g</span> root <span class="token parameter variable">-d</span> /var/run/mysqld <span class="token punctuation">(</span>code<span class="token operator">=</span>exited, sta
  Process: <span class="token number">3998648</span> <span class="token assign-left variable">ExecStartPre</span><span class="token operator">=</span>/bin/sh <span class="token parameter variable">-c</span> systemctl unset-environment _WSREP_START_POSITION <span class="token punctuation">(</span>code<span class="token operator">=</span>exited, st
  Process: <span class="token number">3998652</span> <span class="token assign-left variable">ExecStartPre</span><span class="token operator">=</span>/bin/sh <span class="token parameter variable">-c</span> <span class="token punctuation">[</span> <span class="token operator">!</span> <span class="token parameter variable">-e</span> /usr/bin/galera_recovery <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token assign-left variable">VAR</span><span class="token operator">=</span> <span class="token operator">||</span>   <span class="token assign-left variable">VAR</span><span class="token operator">=</span>`cd /usr/bin/<span class="token punctuation">..</span>
  Process: <span class="token number">3998680</span> <span class="token assign-left variable">ExecStartPost</span><span class="token operator">=</span>/bin/sh <span class="token parameter variable">-c</span> systemctl unset-environment _WSREP_START_POSITION <span class="token punctuation">(</span>code<span class="token operator">=</span>exited, s
  Process: <span class="token number">3998682</span> <span class="token assign-left variable">ExecStartPost</span><span class="token operator">=</span>/etc/mysql/debian-start <span class="token punctuation">(</span>code<span class="token operator">=</span>exited, <span class="token assign-left variable">status</span><span class="token operator">=</span><span class="token number">0</span>/SUCCESS<span class="token punctuation">)</span>
 Main PID: <span class="token number">3998669</span> <span class="token punctuation">(</span>mariadbd<span class="token punctuation">)</span>
   Status: <span class="token string">"Taking your SQL requests now..."</span>
    Tasks: <span class="token number">10</span> <span class="token punctuation">(</span>limit: <span class="token number">4915</span><span class="token punctuation">)</span>
   Memory: <span class="token number">78</span>.8M
   CGroup: /system.slice/mariadb.service
           └─3998669 /usr/sbin/mariadbd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果你想重启 Linux 系统后，MariaDB 被自动启动，可以执行以下命令，设置开机启动 MariaDB 服务：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ systemctl <span class="token builtin class-name">enable</span> mariadb
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="4">
<li>设置 MariaDB 可以从任何网卡访问</li>
</ol>
<p>默认情况下，MariaDB 只能从回环网卡（<code v-pre>127.0.0.1</code>）访问，但在实际开发中， 包括开发环境、测试环境、生产环境，我们通常是通过内网 IP 地址（网卡）来访问。所以，这里还需要设置 MariaDB 的监听网卡。在生产环境中，为了确保访问安全，我们可以将绑定的网卡设置为内网 IP 地址。但是，这里为了方便你访问 MariaDB，减少访问 MariaDB 时出问题的概率，这里直接设置 MariaDB，使其监听在所有网卡上。</p>
<p>设置命令如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">sudo</span> <span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">'s/^bind-address.*/bind-address = 0.0.0.0/g'</span> /etc/mysql/mariadb.conf.d/50-server.cnf
$ systemctl restart mariadb <span class="token comment"># 更改完配置后，记得重启 mariadb 服务</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ol start="5">
<li>设置 root 初始密码</li>
</ol>
<p>MariaDB 安装后，还没有 <code v-pre>root</code> 用户被创建。后期为了管理 MariaDB，这里我们还需要创建一个 <code v-pre>root</code> 用户。创建命令如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ mysqladmin -u<span class="token variable">${ONEX_MYSQL_ADMIN_USERNAME}</span> password <span class="token variable">${ONEX_MYSQL_ADMIN_PASSWORD}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="hint-container tip">
<p class="hint-container-title">提示</p>
<p>执行 <code v-pre>mysqladmin</code> 一定要具有 <code v-pre>root</code> 权限，否则可能会报： <code v-pre>mysqladmin: connect to server at 'localhost' failed</code> 错误。</p>
</div>
<div class="hint-container important">
<p class="hint-container-title">重要</p>
<p>这里我们设置了 <code v-pre>root</code> 密码为 <code v-pre>onex(#)666</code>。这个要记录下来，后面操作 MariaDB 需要用到这个密码。</p>
</div>
<h4 id="如何卸载-mariadb" tabindex="-1"><a class="header-anchor" href="#如何卸载-mariadb"><span>如何卸载 MariaDB</span></a></h4>
<p>如果你想卸载 MariaDB，最简单的方法是直接卸载 MariaDB 的软件包，在卸载前，需要先停止 mariadb 服务，命令如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">sudo</span> systemctl stop mariadb
$ <span class="token function">sudo</span> systemctl disable mariadb
$ <span class="token function">sudo</span> <span class="token function">apt</span> remove <span class="token parameter variable">-y</span> mariadb-client mariadb-server
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用 <code v-pre>apt remove</code> 删除软件包，并不会删除软件包的配置以及数据目录，如果你想彻底删除 MariaDB，还需要执行以下命令，删除 MariaDB 相关的配置文件和数据目录：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">sudo</span> <span class="token function">rm</span> <span class="token parameter variable">-rvf</span> /var/lib/mysql
$ <span class="token function">sudo</span> <span class="token function">rm</span> <span class="token parameter variable">-rvf</span> /etc/mysql
$ <span class="token function">sudo</span> <span class="token function">rm</span> <span class="token parameter variable">-rvf</span> /usr/share/keyrings/mariadb.gpg
$ <span class="token function">sudo</span> <span class="token function">rm</span> <span class="token parameter variable">-vf</span> /etc/apt/sources.list.d/mariadb-11.2.2.list
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="mariadb-常见操作" tabindex="-1"><a class="header-anchor" href="#mariadb-常见操作"><span>MariaDB 常见操作</span></a></h4>
<p>在项目开发中，经常会执行一些高频的 MariaDB 操作。本小节，就来介绍下，这些操作。</p>
<h5 id="q1-忘记-mariadb-root-密码-如何重置" tabindex="-1"><a class="header-anchor" href="#q1-忘记-mariadb-root-密码-如何重置"><span>Q1：忘记 MariaDB <code v-pre>root</code> 密码，如何重置？</span></a></h5>
<p>在我开发项目的过程中，有那么几次忘记了 MariaDB 的 <code v-pre>root</code> 密码，但 MariaDB 中又有重要数据，不想重新安装，所以，最好的选择便是重置 MariaDB <code v-pre>root</code> 密码。</p>
<p>在 Linux 上，你可以通过以下步骤重置 MariaDB（MySQL）的 <code v-pre>root</code> 密码：</p>
<ol>
<li>首先，停止 MariaDB 服务：</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">sudo</span> systemctl stop mariadb
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="2">
<li>接下来，以跳过权限检查的方式启动 MariaDB 服务：</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">sudo</span> mysqld_safe --skip-grant-tables --skip-networking <span class="token operator">&amp;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="3">
<li>连接到 MariaDB 服务器：</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ mysql <span class="token parameter variable">-u</span> root
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="4">
<li>在 MariaDB 控制台中，使用以下 SQL 命令来修改 <code v-pre>root</code> 用户的密码：</li>
</ol>
<div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><pre v-pre class="language-sql"><code>MariaDB <span class="token punctuation">[</span>mysql<span class="token punctuation">]</span><span class="token operator">></span> <span class="token keyword">USE</span> mysql<span class="token punctuation">;</span>
MariaDB <span class="token punctuation">[</span>mysql<span class="token punctuation">]</span><span class="token operator">></span> <span class="token keyword">UPDATE</span> <span class="token keyword">user</span> <span class="token keyword">SET</span> authentication_string <span class="token operator">=</span> PASSWORD<span class="token punctuation">(</span><span class="token string">'新密码'</span><span class="token punctuation">)</span> <span class="token keyword">WHERE</span> <span class="token keyword">User</span> <span class="token operator">=</span> <span class="token string">'root'</span><span class="token punctuation">;</span>
MariaDB <span class="token punctuation">[</span>mysql<span class="token punctuation">]</span><span class="token operator">></span> FLUSH <span class="token keyword">PRIVILEGES</span><span class="token punctuation">;</span>
MariaDB <span class="token punctuation">[</span>mysql<span class="token punctuation">]</span><span class="token operator">></span> <span class="token keyword">exit</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="5">
<li>
<p>请将新密码替换为您想要设置的新密码，例如 <code v-pre>onex(#)666</code>。</p>
</li>
<li>
<p>重启 MariaDB 服务：</p>
</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">sudo</span> systemctl restart mariadb
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在，您已经成功重置了 MariaDB（MySQL）的 <code v-pre>root</code> 密码。您可以使用新密码来登录到 MariaDB 控制台。请注意，这些步骤需要在拥有足够权限的用户（比如 <code v-pre>root</code> 用户）下执行。</p>
<h5 id="q2-如何修改-mariadb-密码" tabindex="-1"><a class="header-anchor" href="#q2-如何修改-mariadb-密码"><span>Q2：如何修改 MariaDB 密码？</span></a></h5>
<p>你可以执行以下命令来修改：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">sudo</span> mysqladmin <span class="token parameter variable">-uroot</span> -p<span class="token string">'旧密码'</span> password <span class="token string">'新密码'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h5 id="q3-安全性配置" tabindex="-1"><a class="header-anchor" href="#q3-安全性配置"><span>Q3：安全性配置</span></a></h5>
<p>如果你是在生产环境安装 MariaDB，需要确保 MariaDB 具有很高的安全性。如果你不知道怎么配置，这时候，你可以使用 MariaDB 自带的 <code v-pre>mysql_secure_installation</code> 脚本，来帮助你配置 MariaDB，使其具有较高的安全性。执行命令如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">sudo</span> mysql_secure_installation
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>脚本会提示你为 <code v-pre>root</code> 账户设置密码，删除匿名用户，限制 <code v-pre>root</code> 用户的远程登录，并删除测试数据库。</p>
<div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre v-pre class="language-text"><code>...
Enter current password for root (enter for none):
...
Set root password? [Y/n] Y
New password: 
Re-enter new password: 
...
Remove anonymous users? [Y/n] Y
...
Disallow root login remotely? [Y/n] Y
...
Remove test database and access to it? [Y/n] Y
...
Reload privilege tables now? [Y/n] Y
...
Thanks for using MariaDB!
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果 <code v-pre>Reload privilege tables now?</code> 选择了 <code v-pre>Y</code>，脚本将重新加载权限表，确保更改立即生效。上述配置中，建议对所有的问题回答 <code v-pre>Y</code>（是）。</p>
<p>执行 <code v-pre>mysql_secure_installation</code> 脚本不仅是最佳实践；它也是在加固你的数据库防范潜在威胁的积极步骤。</p>
<h3 id="redis-安装和配置" tabindex="-1"><a class="header-anchor" href="#redis-安装和配置"><span>Redis 安装和配置</span></a></h3>
<p>OneX 项目中有多个组件依赖 Redis，用来做 key-value 存储、分布式锁等，所以，我们还需要安装 Redis。</p>
<h4 id="一键安装-使用脚本快速安装和卸载-redis" tabindex="-1"><a class="header-anchor" href="#一键安装-使用脚本快速安装和卸载-redis"><span>一键安装：使用脚本快速安装和卸载 Redis</span></a></h4>
<p>OneX 项目仓库也提供了脚本用来一键安装和卸载 Redis，命令如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token builtin class-name">cd</span> <span class="token variable">${ONEX_ROOT}</span>
$ ./scripts/installation/redis.sh onex::redis::sbs::install    <span class="token comment"># 一键部署</span>
$ ./scripts/installation/redis.sh onex::redis::sbs::uninstall  <span class="token comment"># 一键卸载</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="安装-redis-客户端和服务端" tabindex="-1"><a class="header-anchor" href="#安装-redis-客户端和服务端"><span>安装 Redis 客户端和服务端</span></a></h4>
<p>安装命令如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 创建 `/var/lib/redis` 目录，否则 `redis-server` 命令启动时</span>
<span class="token comment"># 会报：`Can't chdir to '/var/lib/redis': No such file or directory` 错误</span>
$ <span class="token function">sudo</span> <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /var/lib/redis
$ <span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> <span class="token parameter variable">-y</span> <span class="token parameter variable">-o</span> Dpkg::Options::<span class="token operator">=</span><span class="token string">"--force-confmiss"</span> <span class="token parameter variable">--reinstall</span> redis-server redis-tools
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>安装之后，可以通过以下命令来检查 redis-server 服务是否正在运行（<code v-pre>running</code>）：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ systemctl status redis-server
● redis-server.service - Advanced key-value store
   Loaded: loaded <span class="token punctuation">(</span>/lib/systemd/system/redis-server.service<span class="token punctuation">;</span> disabled<span class="token punctuation">;</span> vendor preset: enabled<span class="token punctuation">)</span>
   Active: active <span class="token punctuation">(</span>running<span class="token punctuation">)</span> since Sat <span class="token number">2024</span>-01-20 <span class="token number">21</span>:37:57 CST<span class="token punctuation">;</span> 7s ago
     Docs: http://redis.io/documentation,
           man:redis-server<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
  Process: <span class="token number">4097240</span> <span class="token assign-left variable">ExecStart</span><span class="token operator">=</span>/usr/bin/redis-server /etc/redis/redis.conf <span class="token punctuation">(</span>code<span class="token operator">=</span>exited, <span class="token assign-left variable">status</span><span class="token operator">=</span><span class="token number">0</span>/SUCCESS<span class="token punctuation">)</span>
 Main PID: <span class="token number">4097242</span> <span class="token punctuation">(</span>redis-server<span class="token punctuation">)</span>
    Tasks: <span class="token number">4</span> <span class="token punctuation">(</span>limit: <span class="token number">4915</span><span class="token punctuation">)</span>
   Memory: <span class="token number">2</span>.1M
   CGroup: /system.slice/redis-server.service
           └─4097242 /usr/bin/redis-server *:36379
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="配置-redis" tabindex="-1"><a class="header-anchor" href="#配置-redis"><span>配置 Redis</span></a></h4>
<p>安装完 Redis 之后，还需要配置下 Redis，才能够正常使用。配置命令及说明如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 将 daemonize 由 no 改成 yes，表示允许 Redis 在后台启动</span>
$ <span class="token function">sudo</span> <span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">'/^daemonize/{s/no/yes/}'</span> /etc/redis/redis.conf
<span class="token comment"># 在 `bind 127.0.0.1` 前面添加 `#` 将其注释掉，默认情况下只允许本地连接，注释掉后外网可以连接 Redis</span>
$ <span class="token function">sudo</span> <span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">'/^bind .*127.0.0.1/s/^/# /'</span> /etc/redis/redis.conf
<span class="token comment"># 修改 requirepass 配置，设置 Redis 密码</span>
$ <span class="token function">sudo</span> <span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">'s/^# requirepass.*$/requirepass '</span>"<span class="token variable">${ONEX_REDIS_PASSWORD}</span><span class="token string">"'/' /etc/redis/redis.conf
# 因为我们上面配置了密码登录，需要将 protected-mode 设置为 no，关闭保护模式
$ sudo sed -i '/^protected-mode/{s/yes/no/}' /etc/redis/redis.conf
# 重新启动 Redis
$ sudo systemctl restart redis-server
 # 如果该命令没有报错，说明 Redis 安装成功
$ redis-cli --no-auth-warning -h <span class="token variable">${ONEX_REDIS_HOST}</span> -p <span class="token variable">${ONEX_REDIS_PORT}</span> -a "</span><span class="token variable">${ONEX_REDIS_PASSWORD}</span>" <span class="token parameter variable">--hotkeys</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="mongo-安装和配置" tabindex="-1"><a class="header-anchor" href="#mongo-安装和配置"><span>Mongo 安装和配置</span></a></h3>
<p>OneX 中授权日志，经过 onex-pump 组件处理后，会被转存到 MongoDB 中，所以我们还需要安装 MongoDB。</p>
<h4 id="一键安装-使用脚本快速安装和卸载-mongodb" tabindex="-1"><a class="header-anchor" href="#一键安装-使用脚本快速安装和卸载-mongodb"><span>一键安装：使用脚本快速安装和卸载 MongoDB</span></a></h4>
<p>如果你觉得不需要学习或者不想手动安装 MongoDB，你可以直接执行我编写的脚本来一键安装和卸载：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token builtin class-name">cd</span> <span class="token variable">${ONEX_ROOT}</span>
$ ./scripts/installation/mongo.sh onex::mongo::sbs::install    <span class="token comment"># 一键部署</span>
$ ./scripts/installation/mongo.sh onex::mongo::sbs::uninstall  <span class="token comment"># 一键卸载</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果你想学习安装细节，可以继续阅读本小节其他内容。</p>
<p>##手动安装</p>
<p>手动安装步骤如下：</p>
<ol>
<li>配置 MongoDB APT 源</li>
</ol>
<p>APT 源配置命令如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">apt</span> <span class="token function">install</span> <span class="token parameter variable">-y</span> gnupg
$ <span class="token function">wget</span> <span class="token parameter variable">-qO</span> - https://www.mongodb.org/static/pgp/server-7.0.asc <span class="token operator">|</span> <span class="token function">sudo</span> apt-key <span class="token function">add</span> -
$ <span class="token builtin class-name">echo</span> <span class="token string">"deb [arch=amd64,arm64] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/7.0 multiverse"</span> <span class="token operator">|</span> <span class="token function">sudo</span> <span class="token function">tee</span> /etc/apt/sources.list.d/mongodb-org-7.0.list
$ <span class="token function">wget</span> http://archive.ubuntu.com/ubuntu/pool/main/o/openssl/libssl1.1_1.1.1f-1ubuntu2_amd64.deb <span class="token parameter variable">-P</span> /tmp/
$ <span class="token function">sudo</span> <span class="token parameter variable">-S</span> <span class="token parameter variable">-i</span> dpkg <span class="token parameter variable">-i</span> /tmp/libssl1.1_1.1.1f-1ubuntu2_amd64.deb
$ <span class="token function">apt</span> update
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container important">
<p class="hint-container-title">重要</p>
<p>这里要安装 <code v-pre>libssl1.1</code>，否则安装 mongo 时可能会报以下错误：<code v-pre>mongodb-org-mongos : Depends: libssl1.1 (&gt;= 1.1.1) but it is not installable</code>。Debian 12 新的更新中，也可以默认已经添加了这个包，为了减少安装出错的概率，这里幂等安装下。</p>
</div>
<ol start="2">
<li>安装 MongoDB 包</li>
</ol>
<p>安装命令如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">apt</span> <span class="token parameter variable">-y</span> <span class="token parameter variable">-o</span> Dpkg::Options::<span class="token operator">=</span><span class="token string">"--force-confmiss"</span> <span class="token parameter variable">--reinstall</span> <span class="token function">install</span> mongodb-org mongodb-org-server
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="3">
<li>安装后配置 MongoDB</li>
</ol>
<p>安装后的 MongoDB，还需要进行一些设置才能使用， 设置项如下：<br>
1）开启外网访问权限，关闭权限验证；<br>
2）创建管理员账号，设置管理员密码。</p>
<p>具体操作如下。</p>
<ol>
<li>开启外网访问，关闭权限验证</li>
</ol>
<p>MongoDB 安装完之后，默认只能通过本地回环网卡访问，为了能够使用内网网卡访问，需要使 MongoDB 在指定的访问网卡上监听。在生产环境中，建议监听在内网网卡上，以提高 MongoDB 的安全。为了，方便你访问 MongoDB，这里直接设置为监听所有网卡。</p>
<p>另外，我们还需要创建管理员账号，用来管理 MongoDB，所以需要先关闭 MongoDB 的认证，这样才能登录 MongoDB，并创建管理员账号，设置密码。</p>
<p>具体操作命令如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 开启外网访问权限和登录验证（）</span>
$ <span class="token function">sudo</span> <span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">'/bindIp/{s/127.0.0.1/0.0.0.0/}'</span> /etc/mongod.conf
$ <span class="token function">sudo</span> <span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">'/^#security/a\security:\n  authorization: disabled'</span> /etc/mongod.conf
$ <span class="token function">sudo</span> systemctl <span class="token builtin class-name">enable</span> mongod <span class="token comment"># 设置 mongod 服务开启启动</span>
$ <span class="token function">sudo</span> systemctl restart mongod <span class="token comment"># 修改完配置后，还需要重启，才能生效</span>
$ <span class="token function">sudo</span> systemctl status mongod <span class="token comment"># 查看 mongod 运行状态，如果输出中包含 active (running)字样说明 mongod 成功启动。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2">
<li>创建管理员账号，设置管理员密码</li>
</ol>
<p>之后，便可以通过 <code v-pre>mongosh</code> 命令登录 MongoDB Shell，并创建管理员账号。我们通过 <code v-pre>use admin</code> 指令切换到 <code v-pre>admin</code> 数据库，再通过 <code v-pre>db.auth(&quot;用户名&quot;，&quot;用户密码&quot;)</code> 验证用户登陆权限。如果返回 <code v-pre>1</code> 表示验证成功；如果返回 <code v-pre>0</code> 表示验证失败，具体的命令如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ mongosh <span class="token parameter variable">--quiet</span> <span class="token string">"mongodb://<span class="token variable">${ONEX_MONGO_HOST}</span>:<span class="token variable">${ONEX_MONGO_PORT}</span>"</span> <span class="token operator">&lt;&lt;</span><span class="token string">EOF
use admin
db.createUser({user:"<span class="token variable">${ONEX_MONGO_ADMIN_USERNAME}</span>",pwd:"<span class="token variable">${ONEX_MONGO_ADMIN_PASSWORD}</span>",roles:["root"]})
db.auth("<span class="token variable">${ONEX_MONGO_ADMIN_USERNAME}</span>", "<span class="token variable">${ONEX_MONGO_ADMIN_PASSWORD}</span>")
quit
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>db.createUser</code> 用到了以下 3 个参数：</p>
<ul>
<li><code v-pre>user</code>： 用户名；</li>
<li><code v-pre>pwd</code>： 用户密码；</li>
<li><code v-pre>roles</code>： 用来设置用户的权限，比如读，读写，写等。</li>
</ul>
<p>此外，如果想删除用户，可以使用 <code v-pre>db.dropUser(&quot;用户名&quot;)</code> 命令来删除。如果你想卸载 MongoDB，可以使用以下命令：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">sudo</span> systemctl stop mongod
$ <span class="token function">sudo</span> systemctl disable mongod
$ <span class="token function">sudo</span> <span class="token function">apt</span> remove <span class="token parameter variable">-y</span> mongodb-org mongodb-org-server
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果你想彻底卸载 MongoDB，包括配置和数据，可以执行以下命令：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">sudo</span> <span class="token function">rm</span> <span class="token parameter variable">-rvf</span> /var/lib/mongodb
$ <span class="token function">sudo</span> <span class="token function">rm</span> <span class="token parameter variable">-vf</span> /etc/apt/sources.list.d/mongodb-org-7.0.list
$ <span class="token function">sudo</span> <span class="token function">rm</span> <span class="token parameter variable">-vf</span> /etc/mongod.conf
$ <span class="token function">sudo</span> <span class="token function">rm</span> <span class="token parameter variable">-vf</span> /lib/systemd/system/mongod.service
$ <span class="token function">sudo</span> <span class="token function">rm</span> <span class="token parameter variable">-vf</span> /tmp/mongodb-*.sock
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="etcd-安装和配置" tabindex="-1"><a class="header-anchor" href="#etcd-安装和配置"><span>Etcd 安装和配置</span></a></h3>
<p>OneX 项目中，Etcd 作为微服务的服务发现中心，onex-apiserver 的数据存储，承担了很重要的角色。这里，我们也需要安装 Etcd 组件。</p>
<h4 id="一键安装-使用脚本快速安装和卸载-etcd" tabindex="-1"><a class="header-anchor" href="#一键安装-使用脚本快速安装和卸载-etcd"><span>一键安装：使用脚本快速安装和卸载 Etcd</span></a></h4>
<p>如果你觉得不需要学习或者不想手动安装 Etcd，你可以直接执行我编写的脚本来一键安装和卸载：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token builtin class-name">cd</span> <span class="token variable">${ONEX_ROOT}</span>
$ ./scripts/installation/etcd.sh onex::etcd::sbs::install    <span class="token comment"># 一键部署</span>
$ ./scripts/installation/etcd.sh onex::etcd::sbs::uninstall  <span class="token comment"># 一键卸载</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果你想学习安装细节，可以继续阅读本小节其他内容。</p>
<h4 id="手动安装-etcd" tabindex="-1"><a class="header-anchor" href="#手动安装-etcd"><span>手动安装 Etcd</span></a></h4>
<p>打开 <a href="https://github.com/etcd-io/etcd/releases/" target="_blank" rel="noopener noreferrer">Etcd Releases<ExternalLinkIcon/></a> 页面，选择需要安装的版本。如果是学习，建议安装最新的稳定版本，原因如下：</p>
<ul>
<li>最新：可以使你在学习阶段，便体验组件最新功能、架构和使用方式等；</li>
<li>稳定：对于一个使用者或者新手，可以避免一些不稳定带来的 Bug，为了规避这些 Bug 花费的时间，带来的学习收益并不高。</li>
</ul>
<p>安装和配置 Etcd 步骤如下：</p>
<ol>
<li>下载 Etcd</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">wget</span> https://github.com/etcd-io/etcd/releases/download/v3.5.11/etcd-v3.5.11-linux-amd64.tar.gz
$ <span class="token function">tar</span> <span class="token parameter variable">-xvzf</span> etcd-v3.5.11-linux-amd64.tar.gz <span class="token parameter variable">-C</span> /tmp/
$ <span class="token function">sudo</span> <span class="token function">mv</span> /tmp/etcd-v3.5.11-linux-amd64/<span class="token punctuation">{</span>etcd,etcdctl,etcdutl<span class="token punctuation">}</span> /usr/bin/

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2">
<li>创建 Etcd 配置文件</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">sudo</span> <span class="token function">mkdir</span> /etc/etcd
$ <span class="token function">sudo</span> <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> <span class="token variable">${ONEX_LOG_DIR}</span> <span class="token comment"># 需要创建 ${ONEX_LOG_DIR} 目录，否则 Etcd 启动时会报错</span>
$ <span class="token function">sudo</span> <span class="token function">tee</span> <span class="token parameter variable">-a</span> /etc/etcd/config.yaml <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
name: onex
data-dir: <span class="token variable">${ONEX_INSTALL_DIR}</span>/thirdparty/etcd
advertise-client-urls: http://0.0.0.0:<span class="token variable">${ONEX_ETCD_CLIENT_PORT}</span>
listen-client-urls: http://0.0.0.0:<span class="token variable">${ONEX_ETCD_CLIENT_PORT}</span>
initial-advertise-peer-urls: http://0.0.0.0:<span class="token variable">${ONEX_ETCD_PEER_PORT}</span>
initial-cluster: onex=http://0.0.0.0:<span class="token variable">${ONEX_ETCD_PEER_PORT}</span>
log-outputs: [<span class="token variable">${ONEX_LOG_DIR}</span>/etcd.log]
log-level: debug
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3">
<li>配置 Etcd 为 systemd 启动</li>
</ol>
<p>安装和配置完 Etcd 后还要启动 Etcd。我们可以使用以下方式来启动：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">nohup</span> /usr/bin/etcd --config-file<span class="token operator">=</span>/etc/etcd/config.yaml <span class="token operator">&amp;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>但是这种方式不好维护：</p>
<ul>
<li>Etcd 组件状态查询麻烦，只能通过 <code v-pre>ps -ef | grep etcd</code>，根据进程是否存在来判断 Etcd 的状态；</li>
<li>Etcd 重启麻烦，需要先 kill 调 Etcd Job，才能重新执行 <code v-pre>nohup</code> 启动 Etcd；</li>
<li>故障自愈差：如果 Etcd 进程异常退出，这种方式是无法自动拉起 Etcd 进程的。</li>
</ul>
<p>所以，这里我们最好通过 systemd 来启动 Etcd。要使用 systemd 来管理 Etcd，就要创建一个 systemd unit 文件。我们可以使用自己的 systemd 的知识储备，来手动编写一个 systemd unit。但更推荐的方法是：尝试从 etcd 代码仓库中，查看有没有现成的 systemd unit 文件可用，如果有直接复用（可能需要一点点适配）即可。</p>
<p>因为一般的开源软件，都有比较大的概率会在代码仓库中，存放一些部署模版文件，例如：systemd unit 文件。所以，我们可以尝试在 Etcd 代码仓库中查找，方法如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">git</span> clone https://github.com/etcd-io/etcd
$ <span class="token builtin class-name">cd</span> etcd
$ <span class="token function">find</span> <span class="token builtin class-name">.</span> <span class="token parameter variable">-iname</span> <span class="token string">"*systemd*"</span>
./contrib/systemd
./client/pkg/systemd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过上面的查找，我们不难分辨出 <a href="">./contrib/systemd</a>目录中保存了 systemd unit 文件。进入 <code v-pre>./contrib/systemd</code> 目录，发现其模版文件为：<a href="https://github.com/etcd-io/etcd/blob/main/contrib/systemd/etcd.service" target="_blank" rel="noopener noreferrer">etcd.service<ExternalLinkIcon/></a>。之后，我们便可以修改这个模版文件，并部署 Etcd。</p>
<p>具体启动方法如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">sudo</span> <span class="token function">tee</span> <span class="token parameter variable">-a</span> /lib/systemd/system/etcd.service <span class="token operator">&lt;&lt;</span><span class="token string">'EOF'
# Etcd systemd unit template from
# https://github.com/etcd-io/etcd/blob/main/contrib/systemd/etcd.service
[Unit]
Description=etcd key-value store # 指定了单元的描述，即 etcd 键值存储
Documentation=https://github.com/etcd-io/etcd # 提供了指向 etcd 项目文档的链接
After=network-online.target local-fs.target remote-fs.target time-sync.target # 指定了服务的启动顺序
Wants=network-online.target local-fs.target remote-fs.target time-sync.target # 指定了服务的启动依赖

[Service]
Type=notify # 指定了服务的类型。notify 类型表示服务会在准备就绪时发送通知
ExecStart=/usr/bin/etcd --config-file=/etc/etcd/config.yaml # 指定了服务启动时要执行的命令，这里是使用指定的配置文件启动 etcd
Restart=always # 指定了服务的重启行为。always 表示服务会在退出时总是被重启
RestartSec=10s # 指定了重启的间隔时间
LimitNOFILE=40000 # 指定了服务的文件描述符限制，这里设置为 40000

[Install]
WantedBy=multi-user.target # 指定了服务的安装目标，这里表示服务会被添加到 multi-user.target，以便在多用户模式下启动
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行以下命令启动 etcd 服务，并设置为开机启动：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">sudo</span> systemctl daemon-reload
$ <span class="token function">sudo</span> systemctl <span class="token builtin class-name">enable</span> etcd
$ <span class="token function">sudo</span> systemctl start etcd
$ <span class="token function">sudo</span> systemctl status etcd
● etcd.service - etcd key-value store
   Loaded: loaded <span class="token punctuation">(</span>/lib/systemd/system/etcd.service<span class="token punctuation">;</span> enabled<span class="token punctuation">;</span> vendor preset: enabled<span class="token punctuation">)</span>
   Active: active <span class="token punctuation">(</span>running<span class="token punctuation">)</span> since Sun <span class="token number">2024</span>-01-21 08:40:55 CST<span class="token punctuation">;</span> 44s ago
     Docs: https://github.com/etcd-io/etcd
 Main PID: <span class="token number">2622</span> <span class="token punctuation">(</span>etcd<span class="token punctuation">)</span>
    Tasks: <span class="token number">14</span> <span class="token punctuation">(</span>limit: <span class="token number">4915</span><span class="token punctuation">)</span>
   Memory: <span class="token number">8</span>.0M
   CGroup: /system.slice/etcd.service
           └─2622 /usr/bin/etcd --config-file<span class="token operator">=</span>/etc/etcd/config.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到 etcd 服务处在运行中状态。</p>
<h2 id="其他中间件安装" tabindex="-1"><a class="header-anchor" href="#其他中间件安装"><span>其他中间件安装</span></a></h2>
<p>除了需要部署 MariaDB、Redis、MongoDB、Etcd 四大存储之外，还需要安装 Jaeger 和 Kafka 中间件：</p>
<ul>
<li>Jaeger：实现微服务之间的调用链；</li>
<li>Kafka：onex-usercenter 作为生产者，会向 kafka 上报授权日志消息，其消费者为 onex-pump。</li>
</ul>
<h3 id="一键安装-一键安装其他中间件" tabindex="-1"><a class="header-anchor" href="#一键安装-一键安装其他中间件"><span>一键安装：一键安装其他中间件</span></a></h3>
<p>OneX 项目提供了中间件的一键安装脚本，如果你不想手动安装，可以执行此脚本，执行命令如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ $ <span class="token builtin class-name">cd</span> <span class="token variable">${ONEX_ROOT}</span>
$ ./scripts/installation/install.sh onex::install::middleware::sbs::install    <span class="token comment"># 一键部署</span>
$ ./scripts/installation/install.sh onex::install::middleware::sbs::uninstall  <span class="token comment"># 一键卸载</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="jaeger-安装和配置" tabindex="-1"><a class="header-anchor" href="#jaeger-安装和配置"><span>Jaeger 安装和配置</span></a></h3>
<p>因为 Jaeger 的安装相对来说比较复杂，需要安装和部署 Jaeger UI、Jaeger-collector、jaeger-query、jaeger-agent 等组件，再加上 Jaeger 不是本套课程的重点，也不是你找工作面试时有帮助的技能，为了减轻你的学习负担，Jaeger 的手动安装仍然使用容器化安装。为了保持整个安装脚本的规范性和一致性，我仍然提供了 <code v-pre>onex::jaeger::sbs::install</code>、<code v-pre>onex::jaeger::sbs::uninstall</code>函数，函数如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="token comment"># Install the jaeger step by step.</span>
<span class="token comment"># sbs is the abbreviation for "step by step".</span>
<span class="token keyword">function</span> onex::jaeger::sbs::<span class="token function-name function">install</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
  onex::jaeger::docker::install
  onex::log::info <span class="token string">"install jaeger successfully"</span>
<span class="token punctuation">}</span>

<span class="token comment"># Uninstall the jaeger step by step.</span>
<span class="token keyword">function</span> onex::jaeger::sbs::<span class="token function-name function">uninstall</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
  onex::jaeger::docker::uninstall
  onex::log::info <span class="token string">"uninstall jaeger successfully"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>你可能会问，为什么不直接使用 <code v-pre>onex::jaeger::docker::install</code>、<code v-pre>onex::jaeger::docker::uninstall</code> 来安装，而要包一层 <code v-pre>onex::jaeger::sbs::install</code>、<code v-pre>onex::jaeger::sbs::uninstall</code> 函数？是因为，在开发中，整个项目代码的逻辑性、一致性、规范性和可维护性，有时候要大于一些额外的代码编写成本。</p>
<p>具体怎么处理，需要你在开发过程中，根据实际情况自行判断。但在本例中，包装为 <code v-pre>onex::jaeger::sbs::install</code>、<code v-pre>onex::jaeger::sbs::uninstall</code> 函数收益要大于额外的十几行代码成本。</p>
<h3 id="kafka-安装和配置" tabindex="-1"><a class="header-anchor" href="#kafka-安装和配置"><span>Kafka 安装和配置</span></a></h3>
<p>安装和配置 Kafka 也有一定的复杂度，同样，因为如何安装和配置 Kafka，对你找工作面试、技术的提升没有什么影响，为了减轻你的学习负担，安装和配置 kafka，仍然使用容器化的方式。OneX 提供了 <code v-pre>onex::kafka::sbs::install</code>、<code v-pre>onex::kafka::sbs::uninstall</code> 用来进行&quot;手动&quot;安装和配置，代码如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="token comment"># Install the kafka step by step.</span>
<span class="token comment"># sbs is the abbreviation for "step by step".</span>
<span class="token comment"># Refer to https://kafka.apache.org/documentation/#quickstart</span>
<span class="token keyword">function</span> onex::kafka::sbs::<span class="token function-name function">install</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
  onex::kafka::docker::install
  onex::log::info <span class="token string">"install kafka successfully"</span>
<span class="token punctuation">}</span>

<span class="token comment"># Uninstall the kafka step by step.</span>
<span class="token keyword">function</span> onex::kafka::sbs::<span class="token function-name function">uninstall</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
  onex::kafka::docker::uninstall
  onex::log::info <span class="token string">"uninstall kafka successfully"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="onex-项目组件安装和配置" tabindex="-1"><a class="header-anchor" href="#onex-项目组件安装和配置"><span>OneX 项目组件安装和配置</span></a></h2>
<p>上面，我们安装了存储组件和其他依赖的中间件组件，接下来，我们就可以部署 OneX 项目的组件了。</p>
<h3 id="一键安装-一键-onex" tabindex="-1"><a class="header-anchor" href="#一键安装-一键-onex"><span>一键安装：一键 OneX</span></a></h3>
<p>OneX 项目提供了一键安装脚本，如果你不想手动安装，可以执行此脚本，执行命令如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token builtin class-name">cd</span> <span class="token variable">${ONEX_ROOT}</span>
$ ./scripts/installation/onex.sh onex::onex::sbs::install    <span class="token comment"># 一键部署</span>
$ ./scripts/installation/onex.sh onex::onex::sbs::uninstall  <span class="token comment"># 一键卸载</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="onex-组件手动安装" tabindex="-1"><a class="header-anchor" href="#onex-组件手动安装"><span>OneX 组件手动安装</span></a></h3>
<p>因为 OneX 项目非常规范，所以 OneX 项目各个组件的安装方法也可以保持高度的一致性，这就使得我们可以使用固定的模版，来安装这些组件，提高安装、部署和维护效率。具体，我们需要安装以下组件（根据安装顺序排列）：</p>
<ol>
<li>onex-usercenter；</li>
<li>onex-apiserver；</li>
<li>onex-gateway；</li>
<li>onex-nightwatch；</li>
<li>onex-pump；</li>
<li>onex-toyblc；</li>
<li>onex-controller-manager；</li>
<li>onex-minerset-controller；</li>
<li>onex-miner-controller；</li>
<li>onex-fakeserver；</li>
<li>onex-cacheserver；</li>
<li>onexctl；</li>
<li>kubectl。</li>
</ol>
<p>因为 OneX 中各个组件是有依赖关系的，所以最好遵循安装顺序，OneX 项目组件依赖关系如下图所示：</p>
<figure><img src="/images/OneX组件依赖关系-水印.png" alt="OneX组件依赖关系" tabindex="0" loading="lazy"><figcaption>OneX组件依赖关系</figcaption></figure>
<p>以上各组件，按照安装方式可分为：</p>
<ul>
<li>服务端组件；</li>
<li>客户端组件。</li>
</ul>
<p>接下来，我们就来看下如何安装和配置 OneX 的各个组件。</p>
<h4 id="onex-存储组件初始化" tabindex="-1"><a class="header-anchor" href="#onex-存储组件初始化"><span>OneX 存储组件初始化</span></a></h4>
<p>onex-usercenter组件依赖一些 MariaDB 数据库表。onex-pump组件依赖于 MongoDB，来转存清洗后的授权日志。所以，我们需要首先初始化这些 MariaDB 和 MongoDB。</p>
<h5 id="mariadb-初始化" tabindex="-1"><a class="header-anchor" href="#mariadb-初始化"><span>MariaDB 初始化</span></a></h5>
<p>初始化步骤如下：</p>
<ol>
<li>创建具有普通权限的 MariaDB 用户</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ mariadb -h<span class="token variable">${ONEX_MYSQL_HOST}</span> -P<span class="token variable">${ONEX_MYSQL_PORT}</span> -u<span class="token string">"<span class="token variable">${ONEX_MYSQL_ADMIN_USERNAME}</span>"</span> -p<span class="token string">"<span class="token variable">${ONEX_MYSQL_ADMIN_PASSWORD}</span>"</span> <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
GRANT ALL PRIVILEGES ON *.* TO <span class="token variable">${ONEX_MYSQL_USERNAME}</span>@'%' identified by "<span class="token variable">${ONEX_MYSQL_PASSWORD}</span>";
FLUSH PRIVILEGES;
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>各个变量的默认值如下：</p>
<ul>
<li><code v-pre>ONEX_MYSQL_ADMIN_USERNAME</code>: <code v-pre>root</code>；</li>
<li><code v-pre>ONEX_MYSQL_ADMIN_PASSWORD</code>: <code v-pre>onex(#)666</code>；</li>
<li><code v-pre>ONEX_MYSQL_USERNAME</code>: <code v-pre>onex</code>；</li>
<li><code v-pre>ONEX_MYSQL_PASSWORD</code>: <code v-pre>onex(#)666</code>。</li>
</ul>
<ol start="2">
<li>初始化 MariaDB 表</li>
</ol>
<p>执行以下命令，创建并初始化 MariaDB 表：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ mariadb -h<span class="token variable">${ONEX_MYSQL_HOST}</span> -P<span class="token variable">${ONEX_MYSQL_PORT}</span> -u<span class="token string">"<span class="token variable">${ONEX_MYSQL_ADMIN_USERNAME}</span>"</span> -p<span class="token string">"<span class="token variable">${ONEX_MYSQL_ADMIN_PASSWORD}</span>"</span> <span class="token operator">&lt;&lt;</span> <span class="token string">'EOF'
source configs/onex.sql;
use onex;
INSERT INTO `uc_user` VALUES (0,'user-admin','admin',1,'admin',                                              '$2a$10$KeHjeGtHOuUYs6l76fgLSeDdjBgfv7loo89svN6p5r40XItHc/NV2', 'colin404@foxmail.com','181X',now(),now());
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述命令会初始化 OneX 表，并在 <code v-pre>uc_user</code> 表中创建一个默认的 <code v-pre>admin</code> 用户，其用户 ID 为 <code v-pre>user-admin</code>。</p>
<h5 id="mongodb-初始化" tabindex="-1"><a class="header-anchor" href="#mongodb-初始化"><span>MongoDB 初始化</span></a></h5>
<p>因为在安装 MongoDB 时，创建的 <code v-pre>admin</code> 用户具有 MongoDB 的 <code v-pre>root</code> 权限，权限过大安全性会降低。为了提高安全性，我们还需要创建一个 onex 普通用户来连接和操作 MongoDB。创建命令如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token assign-left variable">encoded</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">echo</span> <span class="token parameter variable">-n</span> <span class="token string">"<span class="token variable">${ONEX_MONGO_ADMIN_PASSWORD}</span>"</span><span class="token operator">|</span>jq <span class="token parameter variable">-sRr</span> @uri<span class="token variable">)</span></span>
$ mongosh <span class="token parameter variable">--quiet</span> mongodb://<span class="token variable">${ONEX_MONGO_ADMIN_USERNAME}</span><span class="token builtin class-name">:</span><span class="token variable">${encoded}</span>@<span class="token variable">${ONEX_MONGO_URL}</span>/<span class="token variable">${ONEX_MONGO_DATABASE}</span>?authSource<span class="token operator">=</span>admin <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
db.createUser({user:"<span class="token variable">${ONEX_MONGO_USERNAME}</span>",pwd:"<span class="token variable">${ONEX_MONGO_PASSWORD}</span>",roles:["dbOwner"]})
db.auth("<span class="token variable">${ONEX_MONGO_USERNAME}</span>", "<span class="token variable">${ONEX_MONGO_PASSWORD}</span>")
quit;
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 MongoDB 连接字符串中，如果密码中包含特殊字符（如<code v-pre>:</code>、<code v-pre>@</code>、<code v-pre>/</code> 等），需要对其进行转义。<code v-pre>#</code> 的 URL 编码为 <code v-pre>%23</code>。可以使用 <a href="http://www.jsons.cn/urlencode/" target="_blank" rel="noopener noreferrer">URL 编码/解码<ExternalLinkIcon/></a> 工具进行转义。也可以使用以下命令来转义：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="token assign-left variable">encoded</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">echo</span> <span class="token parameter variable">-n</span> <span class="token string">"<span class="token variable">${ONEX_MONGO_ADMIN_PASSWORD}</span>"</span><span class="token operator">|</span>jq <span class="token parameter variable">-sRr</span> @uri<span class="token variable">)</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code v-pre>mongodb://root:'onex(%23)666'@127.0.0.1:27017/onex?authSource=admin</code> 各部分含义如下：</p>
<ul>
<li><code v-pre>mongodb://</code>：指示使用 MongoDB 协议连接；</li>
<li><code v-pre>root:'onex(#)666'</code>：这是用于身份验证的用户名和密码。在这种情况下，用户名是 <code v-pre>onex</code>，密码是 <code v-pre>onex(#)666</code>。请注意，密码中的特殊字符#在 URL 中需要进行 URL 编码，因此被替换为 <code v-pre>%23</code>；</li>
<li><code v-pre>127.0.0.1:27017</code>：这是 MongoDB 服务器的主机和端口。在这种情况下，MongoDB 服务器位于本地主机（即 <code v-pre>127.0.0.1</code>）的 <code v-pre>27017</code> 端口上；</li>
<li><code v-pre>onex</code>：这是要连接的数据库的名称。在这种情况下，数据库名称是 <code v-pre>onex</code>；</li>
<li><code v-pre>authSource=onex</code>：这是指定身份验证数据库的选项。在这种情况下，身份验证数据库也是<code v-pre>onex</code>；</li>
</ul>
<p>创建完 <code v-pre>onex</code> 普通用户后，我们就可以通过 <code v-pre>onex</code> 用户登录 MongoDB 了：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ mongosh <span class="token parameter variable">--quiet</span> mongodb://onex:<span class="token string">'onex(%23)666'</span>@127.0.0.1:27017/onex?authSource<span class="token operator">=</span>onex
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="onex-安装文件创建" tabindex="-1"><a class="header-anchor" href="#onex-安装文件创建"><span>OneX 安装文件创建</span></a></h4>
<p>要安装 OneX 中的各个组件，首先需要将这些组件的安装文件、配置文件等构建出来。具体你可以通过以下命令来构建各个构建产物：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 设置 Makefile 构建出产物的保存位置，默认为 ${ONEX_ROOT}/_output</span>
$ <span class="token builtin class-name">export</span> <span class="token assign-left variable">OUTPUT_DIR</span><span class="token operator">=</span><span class="token variable">${LOCAL_OUTPUT_ROOT}</span>
$ <span class="token function">make</span> build <span class="token comment"># 构建服务二进制文件，这一步可能耗时比较久，因为要下载 Go 包</span>
$ <span class="token function">make</span> gen.systemd <span class="token comment"># 生成 Systemd Unit 文件</span>
$ <span class="token function">make</span> gen.appconfig <span class="token comment"># 生成应用配置文件</span>
$ <span class="token function">make</span> gen.ca <span class="token comment"># 生成 CA 证书</span>
$ <span class="token function">make</span> gen.kubeconfig <span class="token comment"># 生成 kubectl admin kubeconfig 文件</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在执行 <code v-pre>make gen.ca</code> 生成 CA 文件时，如果机器上没有<code v-pre>cfssl</code>、<code v-pre>cfssljson</code>、<code v-pre>cfssl-certinfo</code> 这些工具，则需要下载安装。因为访问的是外网，网速较慢，可能出现超时下载错误。这个没办法，执行 <code v-pre>make sbs-uninstall</code> -&gt; <code v-pre>make sbs-install</code> 重试安装吧。当然，我更建议你阅读安装脚本，魔改安装脚本，使得安装流程可以从失败处开始。</p>
<p>以上 Makefile 规则的具体实现，你可以阅读 Makefile 源码学习。后面课程也会介绍这些 Makefile 规则的具体实现。</p>
<h4 id="onex-服务端组件安装和配置" tabindex="-1"><a class="header-anchor" href="#onex-服务端组件安装和配置"><span>OneX 服务端组件安装和配置</span></a></h4>
<p>上面，我们构建出了 OneX 项目各个组件部署需要的文件，这些文件保存在 <code v-pre>${ONEX_ROOT}/_output</code> 目录下。接下来，我们便可以将这些文件部署在指定的位置并运行。具体操作命令如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token builtin class-name">export</span> <span class="token assign-left variable">OUTPUT_DIR</span><span class="token operator">=</span><span class="token variable">${LOCAL_OUTPUT_ROOT}</span>
$ <span class="token assign-left variable">OS</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span>go <span class="token function">env</span> GOOS<span class="token variable">)</span></span>
$ <span class="token assign-left variable">ARCH</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span>go <span class="token function">env</span> GOARCH<span class="token variable">)</span></span>
$ <span class="token function">sudo</span> <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> <span class="token variable">${ONEX_BIN_DIR}</span>
$ <span class="token function">sudo</span> <span class="token function">cp</span> <span class="token variable">${LOCAL_OUTPUT_ROOT}</span>/platforms/<span class="token variable">${OS}</span>/<span class="token variable">${ARCH}</span>/* <span class="token variable">${ONEX_BIN_DIR}</span>/
$ <span class="token function">sudo</span> <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> <span class="token variable">${ONEX_CONFIG_DIR}</span>
$ <span class="token function">sudo</span> <span class="token function">cp</span> <span class="token variable">${LOCAL_OUTPUT_ROOT}</span>/appconfig/* <span class="token variable">${ONEX_CONFIG_DIR}</span>/
$ <span class="token function">sudo</span> <span class="token function">cp</span> <span class="token parameter variable">-r</span> <span class="token variable">${LOCAL_OUTPUT_ROOT}</span>/cert <span class="token variable">${ONEX_CONFIG_DIR}</span>/
$ <span class="token function">sudo</span> <span class="token function">cp</span> <span class="token variable">${LOCAL_OUTPUT_ROOT}</span>/config <span class="token variable">${ONEX_CONFIG_DIR}</span>/
$ <span class="token function">sudo</span> <span class="token function">cp</span> <span class="token variable">${LOCAL_OUTPUT_ROOT}</span>/systemd/* /etc/systemd/system/
$ <span class="token function">sudo</span> systemctl daemon-reload
$ <span class="token assign-left variable">services</span><span class="token operator">=</span><span class="token string">"onex-usercenter onex-apiserver onex-gateway onex-nightwatch onex-pump onex-toyblc onex-controller-manager onex-minerset-controller onex-miner-controller onex-fakeserver onex-cacheserver"</span>
$ <span class="token keyword">for</span> <span class="token for-or-select variable">service</span> <span class="token keyword">in</span> <span class="token variable">${services}</span><span class="token punctuation">;</span> <span class="token keyword">do</span> <span class="token function">sudo</span> systemctl <span class="token builtin class-name">enable</span> <span class="token variable">${service}</span><span class="token punctuation">;</span> <span class="token function">sudo</span> systemctl restart <span class="token variable">${service}</span><span class="token punctuation">;</span> <span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到 OneX 虽然包含了很多组件，但安装起来还是很便捷的，这是因为项目比较规范，能够将很多内容抽象成为一个模版，并通过脚本进行统一的处理和安装。</p>
<h4 id="onex-客户端组件安装和配置" tabindex="-1"><a class="header-anchor" href="#onex-客户端组件安装和配置"><span>OneX 客户端组件安装和配置</span></a></h4>
<p>上面，我们安装了 OneX 服务端组件，接下来就可以安装 OneX 客户端组件了。OneX 的客户端组件是 <code v-pre>onexctl</code>，但因为访问 onex-apiserver 需要使用 <code v-pre>kubectl</code>，所以还需要安装 <code v-pre>kubectl</code>。</p>
<ol>
<li><code v-pre>kubectl</code> 安装</li>
</ol>
<p>安装命令如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">curl</span> <span class="token parameter variable">-LO</span> <span class="token string">"https://dl.k8s.io/release/<span class="token variable"><span class="token variable">$(</span><span class="token function">curl</span> <span class="token parameter variable">-L</span> <span class="token parameter variable">-s</span> https://dl.k8s.io/release/stable.txt<span class="token variable">)</span></span>/bin/linux/amd64/kubectl"</span>
$ <span class="token function">chmod</span> +x kubectl
$ <span class="token function">sudo</span> <span class="token function">mv</span> kubectl /usr/bin/
$ kubectl version <span class="token parameter variable">--client</span> <span class="token parameter variable">--output</span><span class="token operator">=</span>yaml <span class="token comment"># 验证 kubectl 是否安装成功</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2">
<li><code v-pre>onexctl</code> 安装</li>
</ol>
<p>执行以下命令安装：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">cp</span> <span class="token variable">${ONEX_BIN_DIR}</span>/onexctl <span class="token environment constant">$HOME</span>/bin
$ <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> <span class="token environment constant">$HOME</span>/.onex
$ <span class="token function">cp</span> <span class="token variable">${ONEX_CONFIG_DIR}</span>/onexctl.yaml <span class="token environment constant">$HOME</span>/.onex
$ onexctl minerset list
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="测试安装是否成功" tabindex="-1"><a class="header-anchor" href="#测试安装是否成功"><span>测试安装是否成功</span></a></h2>
<p>你可以执行以下命令来测试：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ ./scripts/installation/test.sh onex::test::test
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>具体怎么测试每一个 OneX 组件，上一节课有介绍，本节课就不再详细介绍。具体测试细节和实现，你可以可以阅读 <code v-pre>scripts/installation/test.sh</code>脚本，源码面前无秘密。</p>
<h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h2>
<p>本节课详细介绍了 OneX 项目具体是如何手动安装的，希望能够通过详细的安装教程，提供一次动手实战的机会，让你掌握 Linux 下存储、中间件、软件等的安装方式。Linux 部署软件，是 Linux 运维最基本的操作，其中还有很多基础知识没有深入介绍，例如：Linux 常用的操作指令、Systemd 的原理和操作、Debian 软件包管理等。后面会通过技术分享的形式，继续补充这部分内容。</p>
<p>本节课中，OneX 项目的手动安装步骤如下：</p>
<figure><img src="/images/OneX项目的手动安装步骤-水印.png" alt="OneX项目的手动安装步骤" tabindex="0" loading="lazy"><figcaption>OneX项目的手动安装步骤</figcaption></figure>
<h2 id="课后练习" tabindex="-1"><a class="header-anchor" href="#课后练习"><span>课后练习</span></a></h2>
<ol>
<li>本课程安装的 MariaDB 版本为 <code v-pre>11.2.2</code>，请在升级 MariaDB 版本为 <code v-pre>11.3.1</code>，并重启 onex-usercenter、onex-gateway 组件，确保二者连接新版本的 MariaDB，并重启成功；</li>
<li>请用执行以下命令重新安装 OneX：</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">make</span> sbs-uninstall
$ <span class="token function">make</span> sbs-install
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果遇到问题，请试着阅读安装脚本，解决问题，重新安装。</p>
</div></template>


