<template><div><div class="hint-container warning">
<p class="hint-container-title">前置条件</p>
<p>需要 OneX 成功部署。</p>
</div>
<p>在我们使用容器化的方式快速部署了 OneX 项目。可以看到 OneX 项目组件很多，功能丰富，为了能够让你在学习 OneX 项目前，对 OneX 的功能有一个充分的了解和体验。本节课，我会带你一步一步通过测试来体验 OneX 项目的功能。</p>
<p>OneX 项目有很多组件，这些组件，我们都可以进行深入细致的测试和体验。这些项目按功能类别，可以分为以下 4 类：</p>
<ul>
<li><strong>核心组件：</strong> Go 项目开发高阶实战课功能型组件，这些组件用来完成 OneX 的核心功能；</li>
<li><strong>云原生组件：</strong> 跟 Kubernetes 编程相关的服务组件，这些组件会在 Kubernetes 开发实战课中详细介绍；</li>
<li><strong>命令行组件：</strong> Linux 命令行工具，可以很便捷的访问 OneX API Server。例如：kubectl 访问 onex-apiserver。onexctl 访问 onex-usercenter 和 onex-gateway；</li>
<li><strong>示例组件：</strong> 功能型组件，用来演示某个功能的具体开发、落地方法。这些组件当前不参与构建 OneX 的核心功能，也许未来会，例如 onex-cacheserver。</li>
</ul>
<figure><img src="/images/OneX一期部署组件-水印.png" alt="OneX一期部署组件" tabindex="0" loading="lazy"><figcaption>OneX一期部署组件</figcaption></figure>
<p>上图中，红色字体的组件是需要我们重点掌握的。</p>
<p>本文对每个组件会进行详尽的功能测试，你并不需要全部学习并掌握，但可以作为操作手册，走读学习，未来如果有需要可以再回头查阅，详细学习需要的部分。当然，你也可以根据个人兴趣，选择一些组件的某些功能，进行实操请求，以加深对这些组件或者 OneX 项目的了解。</p>
<h2 id="如何测试-onex-项目" tabindex="-1"><a class="header-anchor" href="#如何测试-onex-项目"><span>如何测试 OneX 项目？</span></a></h2>
<p>OneX 项目中包含很多组件，这些组件既有命令行工具，又有 HTTP 服务，还有 gRPC 服务。还有一些异步任务服务。不同类型的服务，测试的方法也不同。以下是针对每种服务类型的测试方法：</p>
<ul>
<li><strong>HTTP 服务：</strong> 可以使用 cURL 命令或 HTTP 客户端工具，例如使用 <a href="https://www.postman.com/" target="_blank" rel="noopener noreferrer">Postman<ExternalLinkIcon/></a>、<a href="https://insomnia.rest/" target="_blank" rel="noopener noreferrer">Insomnia<ExternalLinkIcon/></a> 等 API 客户端工具发送 HTTP 请求，进行测试；</li>
<li><strong>gRPC 服务：</strong> gRPC 服务不像 HTTP 服务那样，有很多好用的工具可以用来测试。但仍然可以找到一些不错的测试工具。例如可以使用 <code v-pre>grpcurl</code> 在 Linux 命令行下测试 gRPC 接口，使用 Postman、Insomnia 客户端工具来发送 gRPC 请求；</li>
<li><strong>命令行工具：</strong> Linux 命令行执行该命令行工具；</li>
<li><strong>异步任务服务：</strong> 通过日志、功能是否被正确执行等来判断，这些组件是否正常工作。</li>
</ul>
<p>在 Linux 系统下，因为不适合运行 Postman、Insomnia 这类优秀的带 GUI 的 API 接口测试工具，所以基本上都是 HTTP 使用 cURL 工具，gRPC 使用 grpcurl 工具来发送请求。但是在 Windows 或 MacOS 上，我们可以安装并使用 Postman、Insomnia 这类优秀的 API 接口测试工具，来高效的进行 API 接口测试。2 种方法对比如下：</p>
<ol>
<li>Linux cURL/grpcurl：使用 Linux 系统提供的 <code v-pre>curl</code> / <code v-pre>grpcurl</code> 工具进行测试。优点是可以直接在 Linux 系统上发送 HTTP/gRPC 请求进行测试，并能借助于 Shell 脚本实现测试自动化。缺点是调试麻烦，API 接口管理不方便。</li>
<li>API 接口测试工具：例如 Postman、Insomnia 等。这类工具提供强大的调试、管理功能，非常适合日常开发调试使用。</li>
</ol>
<p>为了高效的测试 OneX 项目提供的 API 接口，通常在实际开发中我会使用桌面版的 API 接口测试工具。然而，在本节课中，我将使用 cURL 命令来演示如何测试 OneX 项目的 API 接口功能，以便更全面、直观的给你展示 API 接口的请求参数和方法。</p>
<p>OneX 项目 Postman API 接口见：<a href="https://www.postman.com/gold-crater-394532/workspace/onex/overview%E3%80%82" target="_blank" rel="noopener noreferrer">https://www.postman.com/gold-crater-394532/workspace/onex/overview。<ExternalLinkIcon/></a></p>
<h2 id="核心组件功能测试" tabindex="-1"><a class="header-anchor" href="#核心组件功能测试"><span>核心组件功能测试</span></a></h2>
<p>核心组件承载了 OneX 项目的核心功能，这些组件包括：</p>
<ol>
<li>onex-usercenter;</li>
<li>onex-gateway;</li>
<li>onex-nightwatch;</li>
<li>onex-pump;</li>
<li>onex-toyblc;</li>
</ol>
<p>为了给你演示如何高效的测试 onex-usercenter 组件的 API 接口，我会介绍如何使用 Postman 进行授权接口的测试。onex-usercenter 的其他功能和其他组件，我会介绍如何使用 cURL 命令来进行 API 接口的测试。</p>
<p>Postman 和 Insomnia 都是非常优秀的桌面版的 API 接口测试工具，二者我选择了 Postman 工具。</p>
<h3 id="onex-usercenter-测试-postman-测试" tabindex="-1"><a class="header-anchor" href="#onex-usercenter-测试-postman-测试"><span>onex-usercenter 测试（Postman 测试）</span></a></h3>
<p>本小节，我先给你演示下如何使用 Postman 测试 onex-usercenter 组件的 <code v-pre>/v1/auth</code> 接口。后面的测试就统一使用 <code v-pre>curl</code> 命令来测试。</p>
<p>如果你的操作系统是 Windows 或 MacOS，可以选择使用 Postman 工具来测试 API 接口。以下是使用 Postman 工具测试 API 接口的步骤：</p>
<ol>
<li>安装 Postman；</li>
<li>配置 hosts；</li>
<li>使用 Postman 测试 <code v-pre>/v1/auth</code> 接口。</li>
</ol>
<h4 id="步骤-1-安装-postman" tabindex="-1"><a class="header-anchor" href="#步骤-1-安装-postman"><span>步骤 1：安装 Postman</span></a></h4>
<p>访问 <a href="https://www.postman.com/downloads/" target="_blank" rel="noopener noreferrer">Postman<ExternalLinkIcon/></a> 下载 Postman 安装程序，双击后根据提示安装即可。Windows 系统可访问 <a href="https://dl.pstmn.io/download/latest/win64" target="_blank" rel="noopener noreferrer">https://dl.pstmn.io/download/latest/win64<ExternalLinkIcon/></a> 安装下载。</p>
<h4 id="步骤-2-配置-hosts" tabindex="-1"><a class="header-anchor" href="#步骤-2-配置-hosts"><span>步骤 2：配置 hosts</span></a></h4>
<p>你可以手动编辑 <code v-pre>C:\Windows\System32\drivers\etc\hosts</code>（Windows）或 <code v-pre>/etc/hosts</code>（MacOS），来配置 hosts。但更推荐使用 <a href="https://switchhosts.vercel.app/zh" target="_blank" rel="noopener noreferrer">SwitchHosts<ExternalLinkIcon/></a> 工具来配置和管理 hosts。SwitchHosts 是一款非常易用、功能强大的 hosts 修改工具。下载安装之后，配置 SwitchHosts，方法如下：</p>
<p>点击左上角 <strong>+</strong> 号，新建一个 Hosts 类型为<strong>本地</strong>的 hosts，Hosts 标题设置以为 <strong>onex</strong>，内容如下：</p>
<div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre v-pre class="language-text"><code>10.37.83.200 onex.usercenter.superproj.com
10.37.83.200 onex.gateway.superproj.com
10.37.83.200 onex.apiserver.superproj.com
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中 <code v-pre>10.37.83.200</code> 是 OneX 组件的可访问 IP 地址。</p>
<h4 id="步骤-3-使用-postman-测试-v1-auth-接口" tabindex="-1"><a class="header-anchor" href="#步骤-3-使用-postman-测试-v1-auth-接口"><span>步骤 3：使用 Postman 测试 <code v-pre>/v1/auth</code> 接口</span></a></h4>
<ol>
<li>创建 <code v-pre>OneX</code> workspace</li>
</ol>
<p>点击左上角的 <code v-pre>Workspaces</code> -&gt; <code v-pre>Create Workspace</code> 按钮，新建一个名为 <code v-pre>OneX</code> Workspace。创建时 <strong>Explore our templates</strong> 选项中，可以选择 <strong>API development</strong>。</p>
<p>创建完之后，<code v-pre>OneX</code> Workspace 的 Collections 中会有一些 Demo API 接口，你可以使用 <code v-pre>Ctrl + D</code> 快捷键 Duplicate 这些 API 接口，改成自己将要测试的接口。</p>
<ol start="2">
<li>创建 collections</li>
</ol>
<p>Postman 支持 collections 和 folder，OneX 项目下也有多个 Web 服务，每个 Web 服务又有多个资源，每个资源又包含多个 API 接口。为了能够使用 Postman 高效便捷的管理这些 API 接口，OneX 项目 API 接口和 Postman collections、folder 映射关系如下：</p>
<figure><img src="/images/OneX_Postman_Collection_映射-水印.png" alt="OneX Postman Collection 映射" tabindex="0" loading="lazy"><figcaption>OneX Postman Collection 映射</figcaption></figure>
<p>OneX 项目的所有 API 接口都位于 OneX Workspace 中，这样你在测试 OneX 项目 API 接口时，就不用在不同的 Workspace 中来回切换。切换 Workspace 的体验和成本相对较高；</p>
<p>OneX 项目包含了多个 Web 服务，为了便于管理，每个服务一个 collection。每个服务下又有多个资源，为了便于统一管理资源，每个资源一个 folder，folder 中包含了该资源的所有待测 API 接口。</p>
<p>所以，这里我们需要创建 <code v-pre>onex-usercenter</code> collection 和 <code v-pre>Auth</code> 资源目录，并在目录中创建 Auth 资源支持的 API 接口。</p>
<ol start="3">
<li>配置 Workspace 级别环境变量</li>
</ol>
<p>要访问 OneX API 接口，需要指定访问地址，因为访问地址和端口可能会变动，我们可以将访问地址配置成环境变量，这样其他地方直接使用固定的环境变量名即可，如果地址有变动，直接修改环境变量的值，所有引用的地方不需要再修改。</p>
<p>点击 <strong>Environments</strong> 选项卡，点击左上角的 <strong>+</strong> 号，创建一个 Development 环境，并设置以下环境变量：</p>
<div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre v-pre class="language-text"><code>onex.usercenter.superproj.com=onex.usercenter.superproj.com:50843
onex.gateway.superproj.com=onex.gateway.superproj.com:51843
onex.apiserver.superproj.com=onex.apiserver.superproj.com:52443
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>设置界面如下图所示：</p>
<figure><img src="/images/Postman环境变量.png" alt="Postman环境变量" tabindex="0" loading="lazy"><figcaption>Postman环境变量</figcaption></figure>
<p>环境变量表单值如下：</p>
<table>
<thead>
<tr>
<th style="text-align:center">Variable</th>
<th style="text-align:center">Type</th>
<th style="text-align:center">Initial value</th>
<th style="text-align:left">Current Value</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center"><a href="http://onex.usercenter.superproj.com" target="_blank" rel="noopener noreferrer">onex.usercenter.superproj.com<ExternalLinkIcon/></a></td>
<td style="text-align:center">default</td>
<td style="text-align:center"><a href="http://onex.usercenter.superproj.com:50843" target="_blank" rel="noopener noreferrer">onex.usercenter.superproj.com:50843<ExternalLinkIcon/></a></td>
<td style="text-align:left"><a href="http://onex.usercenter.superproj.com:50843" target="_blank" rel="noopener noreferrer">onex.usercenter.superproj.com:50843<ExternalLinkIcon/></a></td>
</tr>
<tr>
<td style="text-align:center"><a href="http://onex.gateway.superproj.com" target="_blank" rel="noopener noreferrer">onex.gateway.superproj.com<ExternalLinkIcon/></a></td>
<td style="text-align:center">default</td>
<td style="text-align:center"><a href="http://onex.gateway.superproj.com:51843" target="_blank" rel="noopener noreferrer">onex.gateway.superproj.com:51843<ExternalLinkIcon/></a></td>
<td style="text-align:left"><a href="http://onex.gateway.superproj.com:51843" target="_blank" rel="noopener noreferrer">onex.gateway.superproj.com:51843<ExternalLinkIcon/></a></td>
</tr>
<tr>
<td style="text-align:center">language</td>
<td style="text-align:center">default</td>
<td style="text-align:center">en</td>
<td style="text-align:left">en</td>
</tr>
<tr>
<td style="text-align:center">token</td>
<td style="text-align:center">default</td>
<td style="text-align:center"></td>
<td style="text-align:left"></td>
</tr>
</tbody>
</table>
<ol start="4">
<li>测试 onex-usercenter组件，auth 资源相关接口</li>
</ol>
<h5 id="_1-创建用户" tabindex="-1"><a class="header-anchor" href="#_1-创建用户"><span>1）创建用户</span></a></h5>
<p>创建用户的 RESTful API 接口为 <a href="https://www.postman.com/gold-crater-394532/workspace/onex/request/1225481-6cf290da-96aa-4c6b-8358-866387f130b4?ctx=documentation" target="_blank" rel="noopener noreferrer">POST /v1/users<ExternalLinkIcon/></a>（打开链接，查看 Postman API 接口设置）。</p>
<figure><img src="/images/CreateUser接口.png" alt="CreateUser接口" tabindex="0" loading="lazy"><figcaption>CreateUser接口</figcaption></figure>
<p>需要注意的设置项如下：</p>
<ol>
<li>在执行请求前，需要选择 <code v-pre>Development</code> 环境；</li>
<li>需要设置以下请求头：</li>
<li><code v-pre>Content-Type: application/json</code>；</li>
<li><code v-pre>Accept-Language: {{language}}</code>。</li>
</ol>
<p>HTTP 请求设置如下：</p>
<ul>
<li>请求 Body：</li>
</ul>
<div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">"username"</span><span class="token operator">:</span> <span class="token string">"colin"</span><span class="token punctuation">,</span>
    <span class="token property">"password"</span><span class="token operator">:</span> <span class="token string">"onex(#)666"</span><span class="token punctuation">,</span>
    <span class="token property">"nickname"</span><span class="token operator">:</span> <span class="token string">"colin"</span><span class="token punctuation">,</span>
    <span class="token property">"realName"</span><span class="token operator">:</span> <span class="token string">"孔令飞"</span><span class="token punctuation">,</span>
    <span class="token property">"email"</span><span class="token operator">:</span> <span class="token string">"colin404@foxmail.com"</span><span class="token punctuation">,</span>
    <span class="token property">"phone"</span><span class="token operator">:</span> <span class="token string">"1812884xxxx"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>请求方法：<code v-pre>POST</code>；</li>
<li>请求路径：<code v-pre>{{onex.usercenter.superproj.com}}/v1/users</code>。</li>
</ul>
<p>设置好后，点击 <strong>Send</strong> 发送创建 <code v-pre>colin</code> 用户请求。如果 Postman 返回 Body 为 <code v-pre>{}</code>，说明创建用户成功。</p>
<h5 id="_2-登录用户" tabindex="-1"><a class="header-anchor" href="#_2-登录用户"><span>2）登录用户</span></a></h5>
<p>创建用户之后，我们就可以登录用户，获取 RefreshToken 和 AccessToken，并使用 RefreshToken 和 AccessToken 访问系统。</p>
<p>用户登录的 RESTful API 接口为 <a href="https://www.postman.com/gold-crater-394532/workspace/onex/request/1225481-4db7f306-3f16-4908-858d-8cbec9eaf6a2?ctx=documentation" target="_blank" rel="noopener noreferrer">POST /v1/auth/login<ExternalLinkIcon/></a>。</p>
<figure><img src="/images/Login接口.png" alt="Login接口" tabindex="0" loading="lazy"><figcaption>Login接口</figcaption></figure>
<p>HTTP 请求设置如下：</p>
<ul>
<li>请求 Body：</li>
</ul>
<div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">"username"</span><span class="token operator">:</span> <span class="token string">"colin"</span><span class="token punctuation">,</span>
    <span class="token property">"password"</span><span class="token operator">:</span> <span class="token string">"onex(#)666"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>请求方法：<code v-pre>POST</code>；</li>
<li>请求路径：<code v-pre>{{onex.usercenter.superproj.com}}/v1/auth/login</code>。</li>
</ul>
<p>设置好后，点击 <strong>Send</strong> 发送登录用户请求。Postman 返回 Body 如下：</p>
<div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">"refreshToken"</span><span class="token operator">:</span> <span class="token string">"eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJvbmV4LXVzZXJjZW50ZXIiLCJzdWIiOiJ1c2VyLW1nbXB2ciIsImV4cCI6MTcwNTU1NzA4NCwibmJmIjoxNzA1NDcwNjg0LCJpYXQiOjE3MDU0NzA2ODR9.mlH17GCgGBtbNjbep__HZna7Oz3cTpYtsQNEx7g4kJ3_u9-zS3ASmfmpF3CU5bpvQcCSiULjwV5MQC58LkLosA"</span><span class="token punctuation">,</span>
    <span class="token property">"accessToken"</span><span class="token operator">:</span> <span class="token string">"eyJhbGciOiJIUzUxMiIsImtpZCI6IjI1ZWQ5OTg1LTAyMTUtNDA0Ni1iYjY3LTkwMDIyNjZhMGQwNyIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJvbmV4LXVzZXJjZW50ZXIiLCJzdWIiOiJ1c2VyLW1nbXB2ciIsImV4cCI6MTcwNTQ3Nzg4NCwibmJmIjoxNzA1NDcwNjg0LCJpYXQiOjE3MDU0NzA2ODR9.x6fDgvPK-xSHyHoMv0K-PuoZtvZpHo3QGfdGTRkIGEll2V9AdmJEgtWyNXB4w7cJHxb4i_CL2U31XDEjvuhVXA"</span><span class="token punctuation">,</span>
    <span class="token property">"type"</span><span class="token operator">:</span> <span class="token string">"Bearer"</span><span class="token punctuation">,</span>
    <span class="token property">"expiresAt"</span><span class="token operator">:</span> <span class="token string">"1705477884"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>之后，我们就可以使用 <code v-pre>refreshToken</code> 和 <code v-pre>accessToke</code> 访问 OneX 系统。</p>
<p>这里，我们可以将 <code v-pre>refreshToken</code> 保存在 <code v-pre>Development</code> 环境中的 <code v-pre>token</code> 环境变量中，这样其他接口可以直接使用 <code v-pre>token</code> 环境变量来设置 Token 认证信息。</p>
<h5 id="_3-请求认证" tabindex="-1"><a class="header-anchor" href="#_3-请求认证"><span>3）请求认证</span></a></h5>
<p>请求认证的 RESTful API 接口为 <a href="https://www.postman.com/gold-crater-394532/workspace/onex/request/1225481-4d9aa1e2-7f59-45a2-bfb3-627ba8bf264f?ctx=documentation" target="_blank" rel="noopener noreferrer">POST /v1/auth/authenticate<ExternalLinkIcon/></a>。</p>
<figure><img src="/images/Authenticate接口.png" alt="Authenticate接口" tabindex="0" loading="lazy"><figcaption>Authenticate接口</figcaption></figure>
<p>HTTP 请求设置如下：</p>
<ul>
<li>请求 Body：</li>
</ul>
<div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">"token"</span><span class="token operator">:</span> <span class="token string">"eyJhbGciOiJIUzUxMiIsImtpZCI6IjI1ZWQ5OTg1LTAyMTUtNDA0Ni1iYjY3LTkwMDIyNjZhMGQwNyIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJvbmV4LXVzZXJjZW50ZXIiLCJzdWIiOiJ1c2VyLW1nbXB2ciIsImV4cCI6MTcwNTQ3Nzg4NCwibmJmIjoxNzA1NDcwNjg0LCJpYXQiOjE3MDU0NzA2ODR9.x6fDgvPK-xSHyHoMv0K-PuoZtvZpHo3QGfdGTRkIGEll2V9AdmJEgtWyNXB4w7cJHxb4i_CL2U31XDEjvuhVXA"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><code v-pre>token</code> 为<code v-pre>POST /v1/auth/login</code> 接口返回 Body 中的 <code v-pre>accessToken</code> 字段。</li>
<li>请求方法：<code v-pre>POST</code>；</li>
<li>请求路径：<code v-pre>{{onex.usercenter.superproj.com}}/v1/auth/authenticate</code>。</li>
</ul>
<p>设置好后，点击 <strong>Send</strong> 发送登录用户请求。Postman 返回 Body 如下：</p>
<div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">"userID"</span><span class="token operator">:</span> <span class="token string">"user-mgmpvr"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><code v-pre>userID</code> 为 <code v-pre>colin</code> 用户的唯一用户 ID 标识。</li>
</ul>
<h5 id="_4-请求授权" tabindex="-1"><a class="header-anchor" href="#_4-请求授权"><span>4）请求授权</span></a></h5>
<p>请求授权的 RESTful API 接口为 <a href="https://www.postman.com/gold-crater-394532/workspace/onex/request/1225481-27e4b6cf-fb78-48c5-97da-9a7f7623447a?ctx=documentation" target="_blank" rel="noopener noreferrer">POST /v1/auth/authorize<ExternalLinkIcon/></a>。</p>
<figure><img src="/images/Authorize接口.png" alt="Authorize接口" tabindex="0" loading="lazy"><figcaption>Authorize接口</figcaption></figure>
<p>HTTP 请求设置如下：</p>
<ul>
<li>请求 Body：</li>
</ul>
<div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">"sub"</span><span class="token operator">:</span> <span class="token string">"colin"</span><span class="token punctuation">,</span>
    <span class="token property">"obj"</span><span class="token operator">:</span> <span class="token string">"testminer"</span><span class="token punctuation">,</span>
    <span class="token property">"act"</span><span class="token operator">:</span> <span class="token string">"delete"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><code v-pre>sub</code>：访问主体；</li>
<li><code v-pre>obj</code>：访问的资源对象；</li>
<li><code v-pre>act</code>：对访问资源对象的操作。</li>
<li>请求方法：<code v-pre>POST</code>；</li>
<li>请求路径：<code v-pre>{{onex.usercenter.superproj.com}}/v1/auth/authorize</code>。</li>
</ul>
<p>设置好后，点击 <strong>Send</strong> 发送登录用户请求。Postman 返回 Body 如下：</p>
<div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">"allowed"</span><span class="token operator">:</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><code v-pre>allowed</code> 为 <code v-pre>true</code> 说明请求资源授权通过，为 <code v-pre>false</code> 说明请求资源授权不通过。</li>
</ul>
<h5 id="_5-认证授权" tabindex="-1"><a class="header-anchor" href="#_5-认证授权"><span>5）认证授权</span></a></h5>
<p>认证授权的 RESTful API 接口为 <a href="https://www.postman.com/gold-crater-394532/workspace/onex/request/1225481-fdbc0571-221a-431e-bb2c-b070361004a9?ctx=documentation" target="_blank" rel="noopener noreferrer">POST /v1/auth/auth<ExternalLinkIcon/></a>。</p>
<figure><img src="/images/Auth接口.png" alt="Auth接口" tabindex="0" loading="lazy"><figcaption>Auth接口</figcaption></figure>
<p>HTTP 请求设置如下：</p>
<ul>
<li>请求 Body：</li>
</ul>
<div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">"token"</span><span class="token operator">:</span> <span class="token string">"eyJhbGciOiJIUzUxMiIsImtpZCI6IjI1ZWQ5OTg1LTAyMTUtNDA0Ni1iYjY3LTkwMDIyNjZhMGQwNyIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJvbmV4LXVzZXJjZW50ZXIiLCJzdWIiOiJ1c2VyLW1nbXB2ciIsImV4cCI6MTcwNTQ3Nzg4NCwibmJmIjoxNzA1NDcwNjg0LCJpYXQiOjE3MDU0NzA2ODR9.x6fDgvPK-xSHyHoMv0K-PuoZtvZpHo3QGfdGTRkIGEll2V9AdmJEgtWyNXB4w7cJHxb4i_CL2U31XDEjvuhVXA"</span><span class="token punctuation">,</span>
    <span class="token property">"obj"</span><span class="token operator">:</span> <span class="token string">"testminer"</span><span class="token punctuation">,</span>
    <span class="token property">"act"</span><span class="token operator">:</span> <span class="token string">"delete"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><code v-pre>token</code>：<code v-pre>POST /v1/auth/login</code> 接口返回的 <code v-pre>accessToken</code> 字段；</li>
<li><code v-pre>obj</code>：访问的资源对象；</li>
<li><code v-pre>act</code>：对访问资源对象的操作。</li>
<li>请求方法：<code v-pre>POST</code>；</li>
<li>请求路径：<code v-pre>{{onex.usercenter.superproj.com}}/v1/auth/auth</code>。</li>
</ul>
<p>设置好后，点击 <strong>Send</strong> 发送登录用户请求。Postman 返回 Body 如下：</p>
<div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">"userID"</span><span class="token operator">:</span> <span class="token string">"user-mgmpvr"</span><span class="token punctuation">,</span>
    <span class="token property">"allowed"</span><span class="token operator">:</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><code v-pre>allowed</code> 为 <code v-pre>true</code> 说明请求资源授权通过，为 <code v-pre>false</code> 说明请求资源授权不通过；</li>
<li><code v-pre>userID</code> 为 <code v-pre>colin</code> 用户的后端唯一 ID 标识。</li>
</ul>
<h5 id="_6-刷新-token" tabindex="-1"><a class="header-anchor" href="#_6-刷新-token"><span>6）刷新 Token</span></a></h5>
<p>刷新 Token 的 RESTful API 接口为 <a href="https://www.postman.com/gold-crater-394532/workspace/onex/request/1225481-17eb1cbd-bc24-450d-b3f9-4509a9cffd4e?ctx=documentation" target="_blank" rel="noopener noreferrer">POST /v1/auth/refresh-token<ExternalLinkIcon/></a>。</p>
<figure><img src="/images/RefreshToken接口.png" alt="RefreshToken接口" tabindex="0" loading="lazy"><figcaption>RefreshToken接口</figcaption></figure>
<p>需要注意的设置项如下：</p>
<ol>
<li>需要设置以下请求头：</li>
<li><code v-pre>Authorization: Bearer {{token}}</code>;</li>
</ol>
<p>HTTP 请求设置如下：</p>
<ul>
<li>请求 Body：</li>
</ul>
<div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>请求方法：<code v-pre>POST</code>；</li>
<li>请求路径：<code v-pre>{{onex.usercenter.superproj.com}}/v1/auth/refresh-token</code>。</li>
</ul>
<p>设置好后，点击 <strong>Send</strong> 发送登录用户请求。Postman 返回 Body 如下：</p>
<div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">"refreshToken"</span><span class="token operator">:</span> <span class="token string">"eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJvbmV4LXVzZXJjZW50ZXIiLCJzdWIiOiJ1c2VyLW1nbXB2ciIsImV4cCI6MTcwNTU2MTgxNSwibmJmIjoxNzA1NDc1NDE1LCJpYXQiOjE3MDU0NzU0MTV9.1MS6CSS_jTkqovD6iul4ibOZ1Kh-jUx_ZZAh18RiKRRHErGbmkIqkJ0kdqhlu9REa8H43-1iiBJpoWJUrs7JSg"</span><span class="token punctuation">,</span>
    <span class="token property">"accessToken"</span><span class="token operator">:</span> <span class="token string">"eyJhbGciOiJIUzUxMiIsImtpZCI6IjI1ZWQ5OTg1LTAyMTUtNDA0Ni1iYjY3LTkwMDIyNjZhMGQwNyIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJvbmV4LXVzZXJjZW50ZXIiLCJzdWIiOiJ1c2VyLW1nbXB2ciIsImV4cCI6MTcwNTQ4MjYxNSwibmJmIjoxNzA1NDc1NDE1LCJpYXQiOjE3MDU0NzU0MTV9.7QIBZ0u_T9Vo5RfEYZ6Kv1FloQaalznOQy1BofXx2Q9HXnoIcXIRLD-ADtHtpV53LFSeyGyebGPjXZ8c6BRXcQ"</span><span class="token punctuation">,</span>
    <span class="token property">"type"</span><span class="token operator">:</span> <span class="token string">"Bearer"</span><span class="token punctuation">,</span>
    <span class="token property">"expiresAt"</span><span class="token operator">:</span> <span class="token string">"1705482615"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><code v-pre>allowed</code> 为 <code v-pre>true</code> 说明请求资源授权通过，为 <code v-pre>false</code> 说明请求资源授权不通过；</li>
<li><code v-pre>userID</code> 为 <code v-pre>colin</code> 用户的后端唯一 ID 标识。</li>
</ul>
<p>需要注意：因为我们刷新了 Token，所以需要将新的 <code v-pre>refreshToken</code> 值设置到 <code v-pre>Development</code> 环境的 <code v-pre>token</code> 环境变量中。</p>
<h5 id="_7-用户登出" tabindex="-1"><a class="header-anchor" href="#_7-用户登出"><span>7）用户登出</span></a></h5>
<p>用户登出的 RESTful API 接口为 <a href="https://www.postman.com/gold-crater-394532/workspace/onex/request/1225481-23a0dff3-2507-4ba9-b8b7-b25adceb9860?ctx=documentation" target="_blank" rel="noopener noreferrer">POST /v1/auth/logout<ExternalLinkIcon/></a>。</p>
<figure><img src="/images/Logout接口.png" alt="Logout接口" tabindex="0" loading="lazy"><figcaption>Logout接口</figcaption></figure>
<p>需要注意的设置项如下：</p>
<ol>
<li>需要设置以下请求头：</li>
<li><code v-pre>Authorization: Bearer {{token}}</code>;</li>
</ol>
<p>HTTP 请求设置如下：</p>
<ul>
<li>请求 Body：</li>
</ul>
<div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>请求方法：<code v-pre>POST</code>；</li>
<li>请求路径：<code v-pre>{{onex.usercenter.superproj.com}}/v1/auth/logout</code>。</li>
</ul>
<p>设置好后，点击 <strong>Send</strong> 发送登录用户请求。Postman 返回 Body 如下：</p>
<div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="onex-usercenter-测试-linux-curl-命令" tabindex="-1"><a class="header-anchor" href="#onex-usercenter-测试-linux-curl-命令"><span>onex-usercenter 测试（Linux <code v-pre>curl</code> 命令）</span></a></h3>
<p>上面，我给你演示了如何使用 Postman 测试 onex-usercenter 的 <code v-pre>/v1/auth</code> 接口。本小节，我再给你展示下如何在 Linux 系统下使用 <code v-pre>curl</code> 命令测试 onx-usercenter 的其他接口。</p>
<p>因为使用 <code v-pre>curl</code> 命令，能够给你展示所有的请求参数和请求结果，所以之后测试都会使用 <code v-pre>curl</code> 命令来测试。在你实际的开发中，你可以选择使用 Postman。</p>
<p>在之前的课程中，我们配置了 Linux hosts 文件，如果还没配置，可以执行以下命令来配置：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">sudo</span> <span class="token function">tee</span> <span class="token parameter variable">-a</span> /etc/hosts <span class="token operator">&lt;&lt;</span><span class="token string">'EOF'

# host configs for onex project
127.0.0.1 onex.usercenter.superproj.com
127.0.0.1 onex.gateway.superproj.com
127.0.0.1 onex.apiserver.superproj.com
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-用户-创建用户" tabindex="-1"><a class="header-anchor" href="#_1-用户-创建用户"><span>1）用户：创建用户</span></a></h4>
<p>执行以下命令创建用户：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">curl</span> http://onex.usercenter.superproj.com:50843/v1/users -H<span class="token string">'Content-Type: application/json'</span> -d<span class="token string">'{"username":"colin","password":"onex(#)666","nickname":"colin","realName":"孔令飞","email":"colin404@foxmail.com","phone":"1812884xxxx"}'</span>
<span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>登录用户，并设置 <code v-pre>token</code> 环境变量，后面的请求需要使用该 <code v-pre>token</code>，以通过 onex-usercenter 的请求认证。<code v-pre>token</code> 设置命令如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token assign-left variable">token</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">curl</span> <span class="token parameter variable">-s</span> <span class="token parameter variable">-XPOST</span> -H<span class="token string">'Content-Type: application/json'</span> http://onex.usercenter.superproj.com:50843/v1/auth/login -d<span class="token string">'{"username":"colin","password":"onex(#)666"}'</span><span class="token operator">|</span>jq <span class="token parameter variable">-r</span> .refreshToken<span class="token variable">)</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_2-用户-列出用户" tabindex="-1"><a class="header-anchor" href="#_2-用户-列出用户"><span>2）用户：列出用户</span></a></h4>
<p>执行以下命令列出用户：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">curl</span> <span class="token string">'http://onex.usercenter.superproj.com:50843/v1/users?offset=0&amp;limit=10'</span> <span class="token parameter variable">-H</span><span class="token string">"Authorization: Bearer <span class="token variable">${token}</span>"</span>
<span class="token punctuation">{</span><span class="token string">"code"</span>:400,<span class="token string">"reason"</span><span class="token builtin class-name">:</span><span class="token string">"InvalidParameter"</span>,<span class="token string">"message"</span><span class="token builtin class-name">:</span><span class="token string">"Only <span class="token variable"><span class="token variable">`</span>admin<span class="token variable">`</span></span> user can perform list operations"</span>,<span class="token string">"metadata"</span>:<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上述请求会报 <code v-pre>Only admin user can perform list operations</code> 错误，这是符合预期的。因为，出于安全考虑，只有 <code v-pre>admin</code> 用户才有权限获取 OneX 平台中的用户列表。</p>
<p>这里，我们可以使用 <code v-pre>admin</code> 用户登录 onex-userceneter 并使用 <code v-pre>admin</code> 用户的 <code v-pre>refreshToken</code> 来访问 <code v-pre>GET /v1/users</code> 接口，命令如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token assign-left variable">admin_token</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">curl</span> <span class="token parameter variable">-s</span> <span class="token parameter variable">-XPOST</span> -H<span class="token string">'Content-Type: application/json'</span> http://onex.usercenter.superproj.com:50843/v1/auth/login -d<span class="token string">'{"username":"admin","password":"onex(#)666"}'</span><span class="token operator">|</span>jq <span class="token parameter variable">-r</span> .refreshToken<span class="token variable">)</span></span>
$ <span class="token function">curl</span> <span class="token string">'http://onex.usercenter.superproj.com:50843/v1/users?offset=0&amp;limit=10'</span> <span class="token parameter variable">-H</span><span class="token string">"Authorization: Bearer <span class="token variable">${admin_token}</span>"</span>
<span class="token punctuation">{</span><span class="token string">"totalCount"</span><span class="token builtin class-name">:</span><span class="token string">"2"</span>,<span class="token string">"Users"</span>:<span class="token punctuation">[</span><span class="token punctuation">{</span><span class="token string">"userID"</span><span class="token builtin class-name">:</span><span class="token string">"user-4ti5t9"</span>,<span class="token string">"username"</span><span class="token builtin class-name">:</span><span class="token string">"colin"</span>,<span class="token string">"nickname"</span><span class="token builtin class-name">:</span><span class="token string">"colin"</span>,<span class="token string">"password"</span><span class="token builtin class-name">:</span><span class="token string">"******"</span>,<span class="token string">"email"</span><span class="token builtin class-name">:</span><span class="token string">"colin404@foxmail.com"</span>,<span class="token string">"phone"</span><span class="token builtin class-name">:</span><span class="token string">"1812884xxxx"</span>,<span class="token string">"secrets"</span><span class="token builtin class-name">:</span><span class="token string">"1"</span>,<span class="token string">"createdAt"</span><span class="token builtin class-name">:</span><span class="token string">"2024-01-17T00:36:57Z"</span>,<span class="token string">"updatedAt"</span><span class="token builtin class-name">:</span><span class="token string">"2024-01-17T08:36:57Z"</span><span class="token punctuation">}</span>,<span class="token punctuation">{</span><span class="token string">"userID"</span><span class="token builtin class-name">:</span><span class="token string">"user-admin"</span>,<span class="token string">"username"</span><span class="token builtin class-name">:</span><span class="token string">"admin"</span>,<span class="token string">"nickname"</span><span class="token builtin class-name">:</span><span class="token string">"admin"</span>,<span class="token string">"password"</span><span class="token builtin class-name">:</span><span class="token string">"******"</span>,<span class="token string">"email"</span><span class="token builtin class-name">:</span><span class="token string">"colin404@foxmail.com"</span>,<span class="token string">"phone"</span><span class="token builtin class-name">:</span><span class="token string">"181X"</span>,<span class="token string">"secrets"</span><span class="token builtin class-name">:</span><span class="token string">"0"</span>,<span class="token string">"createdAt"</span><span class="token builtin class-name">:</span><span class="token string">"2024-01-16T21:32:27Z"</span>,<span class="token string">"updatedAt"</span><span class="token builtin class-name">:</span><span class="token string">"2024-01-16T21:32:27Z"</span><span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-用户-获取用户详情" tabindex="-1"><a class="header-anchor" href="#_3-用户-获取用户详情"><span>3）用户：获取用户详情</span></a></h4>
<p>执行以下命令，获取用户详情：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">curl</span> http://onex.usercenter.superproj.com:50843/v1/users/colin -H<span class="token string">"Authorization: Bearer <span class="token variable">${token}</span>"</span>
<span class="token punctuation">{</span><span class="token string">"userID"</span><span class="token builtin class-name">:</span><span class="token string">"user-4ti5t9"</span>,<span class="token string">"username"</span><span class="token builtin class-name">:</span><span class="token string">"colin"</span>,<span class="token string">"nickname"</span><span class="token builtin class-name">:</span><span class="token string">"colin"</span>,<span class="token string">"password"</span><span class="token builtin class-name">:</span><span class="token string">"******"</span>,<span class="token string">"email"</span><span class="token builtin class-name">:</span><span class="token string">"colin404@foxmail.com"</span>,<span class="token string">"phone"</span><span class="token builtin class-name">:</span><span class="token string">"1812884xxxx"</span>,<span class="token string">"secrets"</span><span class="token builtin class-name">:</span><span class="token string">"0"</span>,<span class="token string">"createdAt"</span><span class="token builtin class-name">:</span><span class="token string">"2024-01-17T00:36:57Z"</span>,<span class="token string">"updatedAt"</span><span class="token builtin class-name">:</span><span class="token string">"2024-01-17T08:36:57Z"</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_4-用户-更新用户信息" tabindex="-1"><a class="header-anchor" href="#_4-用户-更新用户信息"><span>4）用户：更新用户信息</span></a></h4>
<p>请求 <code v-pre>PUT /v1/users/colin</code> 接口，修改邮箱地址为 <code v-pre>colin_modified@foxmail.com</code>，命令如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">curl</span> <span class="token parameter variable">-XPUT</span> http://onex.usercenter.superproj.com:50843/v1/users/colin -H<span class="token string">"Authorization: Bearer <span class="token variable">${token}</span>"</span> -H<span class="token string">'Content-Type: application/json'</span> -d<span class="token string">'{"email": "colin_modified@foxmail.com"}'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>请求 <code v-pre>GET /v1/users/colin</code> 接口，获取用户详情，确认邮箱地址是否被成功修改，命令如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">curl</span> http://onex.usercenter.superproj.com:50843/v1/users/colin -H<span class="token string">"Authorization: Bearer <span class="token variable">${token}</span>"</span>
<span class="token punctuation">{</span><span class="token string">"userID"</span><span class="token builtin class-name">:</span><span class="token string">"user-4ti5t9"</span>,<span class="token string">"username"</span><span class="token builtin class-name">:</span><span class="token string">"colin"</span>,<span class="token string">"nickname"</span><span class="token builtin class-name">:</span><span class="token string">"colin"</span>,<span class="token string">"password"</span><span class="token builtin class-name">:</span><span class="token string">"******"</span>,<span class="token string">"email"</span><span class="token builtin class-name">:</span><span class="token string">"colin_modified@foxmail.com"</span>,<span class="token string">"phone"</span><span class="token builtin class-name">:</span><span class="token string">"1812884xxxx"</span>,<span class="token string">"secrets"</span><span class="token builtin class-name">:</span><span class="token string">"0"</span>,<span class="token string">"createdAt"</span><span class="token builtin class-name">:</span><span class="token string">"2024-01-17T00:36:57Z"</span>,<span class="token string">"updatedAt"</span><span class="token builtin class-name">:</span><span class="token string">"2024-01-17T09:20:18Z"</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到邮箱地址已经被成功修改为 <code v-pre>colin_modified@foxmail.com</code>。</p>
<h4 id="_5-用户-修改用户密码" tabindex="-1"><a class="header-anchor" href="#_5-用户-修改用户密码"><span>5）用户：修改用户密码</span></a></h4>
<p>执行以下命令修改密码：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">curl</span> <span class="token parameter variable">-XPUT</span> http://onex.usercenter.superproj.com:50843/v1/users/colin/update-password -H<span class="token string">"Authorization: Bearer <span class="token variable">${token}</span>"</span> -H<span class="token string">'Content-Type: application/json'</span> -d<span class="token string">'{"oldPassword":"onex(#)666","newPassword":"onex(#)888"}'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>注意修改密码后，需要登出用户，使之前使用的 <code v-pre>token</code> 过期，并使用新的密码，再次登录系统，并设置 <code v-pre>token</code>，命令如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">curl</span> <span class="token parameter variable">-XPOST</span> -H<span class="token string">"Authorization: Bearer <span class="token variable">${token}</span>"</span> -H<span class="token string">'Content-Type: application/json'</span> http://onex.usercenter.superproj.com:50843/v1/auth/logout
$ <span class="token assign-left variable">token</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">curl</span> <span class="token parameter variable">-s</span> <span class="token parameter variable">-XPOST</span> -H<span class="token string">'Content-Type: application/json'</span> http://onex.usercenter.superproj.com:50843/v1/auth/login -d<span class="token string">'{"username":"colin","password":"onex(#)888"}'</span><span class="token operator">|</span>jq <span class="token parameter variable">-r</span> .refreshToken<span class="token variable">)</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_6-用户-删除用户" tabindex="-1"><a class="header-anchor" href="#_6-用户-删除用户"><span>6）用户：删除用户</span></a></h4>
<p>删除用户接口是个幂等操作，接口请求命令如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">curl</span> <span class="token parameter variable">-XDELETE</span> http://onex.usercenter.superproj.com:50843/v1/users/colin -H<span class="token string">"Authorization: Bearer <span class="token variable">${token}</span>"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_7-密钥-创建密钥" tabindex="-1"><a class="header-anchor" href="#_7-密钥-创建密钥"><span>7）密钥：创建密钥</span></a></h4>
<p>要测试密钥，我们需要先创建一个用户，并登录 onex-usercenter，命令如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">curl</span> http://onex.usercenter.superproj.com:50843/v1/users -H<span class="token string">'Content-Type: application/json'</span> -d<span class="token string">'{"username":"colin","password":"onex(#)666","nickname":"colin","realName":"孔令飞","email":"colin404@foxmail.com","phone":"1812884xxxx"}'</span>
$ <span class="token assign-left variable">token</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">curl</span> <span class="token parameter variable">-s</span> <span class="token parameter variable">-XPOST</span> -H<span class="token string">'Content-Type: application/json'</span> http://onex.usercenter.superproj.com:50843/v1/auth/login -d<span class="token string">'{"username":"colin","password":"onex(#)666"}'</span><span class="token operator">|</span>jq <span class="token parameter variable">-r</span> .refreshToken<span class="token variable">)</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>登录后，将 <code v-pre>refreshToken</code> 保存在 <code v-pre>token</code> 环境变量中，方便后续访问。</p>
<p>创建密钥命令如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">curl</span> <span class="token parameter variable">-XPOST</span> http://onex.usercenter.superproj.com:50843/v1/secrets -H<span class="token string">"Authorization: Bearer <span class="token variable">${token}</span>"</span> -H<span class="token string">'Content-Type: application/json'</span> -d<span class="token string">'{"name":"secret0","expires":0,"description":"tester secret"}'</span>
<span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_8-密钥-列出密钥" tabindex="-1"><a class="header-anchor" href="#_8-密钥-列出密钥"><span>8）密钥：列出密钥</span></a></h4>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">curl</span> http://onex.usercenter.superproj.com:50843/v1/secrets -H<span class="token string">"Authorization: Bearer <span class="token variable">${token}</span>"</span>
<span class="token punctuation">{</span><span class="token string">"totalCount"</span><span class="token builtin class-name">:</span><span class="token string">"2"</span>,<span class="token string">"Secrets"</span>:<span class="token punctuation">[</span><span class="token punctuation">{</span><span class="token string">"userID"</span><span class="token builtin class-name">:</span><span class="token string">"user-k7ejrq"</span>,<span class="token string">"name"</span><span class="token builtin class-name">:</span><span class="token string">"secret0"</span>,<span class="token string">"secretID"</span><span class="token builtin class-name">:</span><span class="token string">"5c5163b8-a8e9-4ca0-b682-dce215f45d8b"</span>,<span class="token string">"secretKey"</span><span class="token builtin class-name">:</span><span class="token string">"f5fff34d-9aec-4c70-8902-e2b44d2454b5"</span>,<span class="token string">"expires"</span><span class="token builtin class-name">:</span><span class="token string">"0"</span>,<span class="token string">"status"</span>:1,<span class="token string">"description"</span><span class="token builtin class-name">:</span><span class="token string">"tester secret"</span>,<span class="token string">"createdAt"</span><span class="token builtin class-name">:</span><span class="token string">"2024-01-17T01:44:26Z"</span>,<span class="token string">"updatedAt"</span><span class="token builtin class-name">:</span><span class="token string">"2024-01-17T01:44:26Z"</span><span class="token punctuation">}</span>,<span class="token punctuation">{</span><span class="token string">"userID"</span><span class="token builtin class-name">:</span><span class="token string">"user-k7ejrq"</span>,<span class="token string">"name"</span><span class="token builtin class-name">:</span><span class="token string">"generated"</span>,<span class="token string">"secretID"</span><span class="token builtin class-name">:</span><span class="token string">"23a0939c-5b18-4055-95db-b64885dc301b"</span>,<span class="token string">"secretKey"</span><span class="token builtin class-name">:</span><span class="token string">"0e039821-1b24-4c3b-8c11-8cab7b7f318a"</span>,<span class="token string">"expires"</span><span class="token builtin class-name">:</span><span class="token string">"0"</span>,<span class="token string">"status"</span>:1,<span class="token string">"description"</span><span class="token builtin class-name">:</span><span class="token string">"automatically generated when user is created"</span>,<span class="token string">"createdAt"</span><span class="token builtin class-name">:</span><span class="token string">"2024-01-17T01:41:58Z"</span>,<span class="token string">"updatedAt"</span><span class="token builtin class-name">:</span><span class="token string">"2024-01-17T01:41:58Z"</span><span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_9-密钥-获取密钥详情" tabindex="-1"><a class="header-anchor" href="#_9-密钥-获取密钥详情"><span>9）密钥：获取密钥详情</span></a></h4>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">curl</span> http://onex.usercenter.superproj.com:50843/v1/secrets/secret0 -H<span class="token string">"Authorization: Bearer <span class="token variable">${token}</span>"</span>
<span class="token punctuation">{</span><span class="token string">"userID"</span><span class="token builtin class-name">:</span><span class="token string">"user-k7ejrq"</span>,<span class="token string">"name"</span><span class="token builtin class-name">:</span><span class="token string">"secret0"</span>,<span class="token string">"secretID"</span><span class="token builtin class-name">:</span><span class="token string">"5c5163b8-a8e9-4ca0-b682-dce215f45d8b"</span>,<span class="token string">"secretKey"</span><span class="token builtin class-name">:</span><span class="token string">"f5fff34d-9aec-4c70-8902-e2b44d2454b5"</span>,<span class="token string">"expires"</span><span class="token builtin class-name">:</span><span class="token string">"0"</span>,<span class="token string">"status"</span>:1,<span class="token string">"description"</span><span class="token builtin class-name">:</span><span class="token string">"tester secret"</span>,<span class="token string">"createdAt"</span><span class="token builtin class-name">:</span><span class="token string">"2024-01-17T01:44:26Z"</span>,<span class="token string">"updatedAt"</span><span class="token builtin class-name">:</span><span class="token string">"2024-01-17T01:44:26Z"</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_10-密钥-更新密钥信息" tabindex="-1"><a class="header-anchor" href="#_10-密钥-更新密钥信息"><span>10）密钥：更新密钥信息</span></a></h4>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">curl</span> <span class="token parameter variable">-XPUT</span> http://onex.usercenter.superproj.com:50843/v1/secrets/secret0 -H<span class="token string">"Authorization: Bearer <span class="token variable">${token}</span>"</span> -H<span class="token string">'Content-Type: application/json'</span> -d<span class="token string">'{"expires":4072326717,"description":"tester secret(modified)"}'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>再次获取密钥详情，查看密钥描述是否被成功修改：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">curl</span> http://onex.usercenter.superproj.com:50843/v1/secrets/secret0 -H<span class="token string">"Authorization: Bearer <span class="token variable">${token}</span>"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>可以看到密钥描述，被成功修改为 <code v-pre>tester secret(modified)</code>。</p>
<h4 id="_11-密钥-删除密钥" tabindex="-1"><a class="header-anchor" href="#_11-密钥-删除密钥"><span>11）密钥：删除密钥</span></a></h4>
<p>删除密钥接口是个幂等操作，接口请求命令如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">curl</span> <span class="token parameter variable">-XDELETE</span> http://onex.usercenter.superproj.com:50843/v1/secrets/secret0 -H<span class="token string">"Authorization: Bearer <span class="token variable">${token}</span>"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="测试-onex-gateway-组件" tabindex="-1"><a class="header-anchor" href="#测试-onex-gateway-组件"><span>测试 onex-gateway 组件</span></a></h3>
<p>要测试 onex-gateway 组件，我们需要先创建一个用户，并登录 onex-usercenter，命令如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 如果用户已存在，则跳过创建用户步骤即可</span>
$ <span class="token assign-left variable">user_id</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">curl</span> <span class="token parameter variable">-s</span> http://onex.usercenter.superproj.com:50843/v1/users -H<span class="token string">'Content-Type: application/json'</span> -d<span class="token string">'{"username":"colin","password":"onex(#)666","nickname":"colin","realName":"孔令飞","email":"colin404@foxmail.com","phone":"1812884xxxx"}'</span> <span class="token operator">|</span> jq <span class="token parameter variable">-r</span> .userID<span class="token variable">)</span></span>
$ <span class="token assign-left variable">token</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">curl</span> <span class="token parameter variable">-s</span> <span class="token parameter variable">-XPOST</span> -H<span class="token string">'Content-Type: application/json'</span> http://onex.usercenter.superproj.com:50843/v1/auth/login -d<span class="token string">'{"username":"colin","password":"onex(#)666"}'</span><span class="token operator">|</span>jq <span class="token parameter variable">-r</span> .accessToken<span class="token variable">)</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>登录后，将 <code v-pre>accessToken</code> 保存在 <code v-pre>token</code> 环境变量中，方便后续访问。注意，这里需要使用 <code v-pre>accessToken</code> 访问 onex-gateway 组件，onex-gateway 在收到请求后，会透传 <code v-pre>accessToken</code> 给 onex-usercenter 组件，进行认证和鉴权。如果成功才允许操作。</p>
<p>创建矿机池和矿机，还需要创建一个 <code v-pre>genesis</code> 创世区块链，创建命令如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token builtin class-name">export</span> <span class="token assign-left variable">KUBECONFIG</span><span class="token operator">=</span><span class="token variable">${ONEX_ADMIN_KUBECONFIG}</span>
$ kubectl create <span class="token parameter variable">-f</span> <span class="token variable">${ONEX_ROOT}</span>/manifests/sample/onex/chain.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-矿机池-创建矿机池" tabindex="-1"><a class="header-anchor" href="#_1-矿机池-创建矿机池"><span>1）矿机池：创建矿机池</span></a></h4>
<p>创建矿机池命令如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token assign-left variable">idempotent_token</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">curl</span> <span class="token parameter variable">-s</span> http://onex.gateway.superproj.com:51843/v1/idempotents -H<span class="token string">"Authorization: Bearer <span class="token variable">${token}</span>"</span> <span class="token operator">|</span> jq <span class="token parameter variable">-r</span> .token<span class="token variable">)</span></span>
$ <span class="token function">curl</span> <span class="token parameter variable">-XPOST</span> http://onex.gateway.superproj.com:51843/v1/minersets -H<span class="token string">"X-Idempotent-ID: <span class="token variable">${idempotent_token}</span>"</span> -H<span class="token string">"Authorization: Bearer <span class="token variable">${token}</span>"</span> -H<span class="token string">'Content-Type: application/json'</span> -d<span class="token string">'{"apiVersion":"apps.onex.io/v1beta1","kind":"MinerSet","metadata":{"name":"minerset0"},"spec":{"deletePolicy":"Random","displayName":"test-minerset","replicas":2,"template":{"spec":{"chainName":"genesis","minerType":"M1.MEDIUM2"}}}}'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>可以使用 <code v-pre>kubectl</code> 命令检查 MinerSet 资源是否成功创建：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ kubectl <span class="token parameter variable">-n</span> <span class="token variable">${user_id}</span> get minerset
NAME          READY   CURRENT   AVAILABLE   AGE
minerset0   <span class="token number">0</span>/2     <span class="token number">0</span>         <span class="token number">0</span>           106s
$ kubectl <span class="token parameter variable">-n</span> <span class="token variable">${user_id}</span> get miner <span class="token comment"># 可以看到矿机也被成功创建，并且处在 Running 状态</span>
NAME                STATUS    AGE
minerset0-2pfrt   Running   7s
minerset0-lcnfs   Running   7s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到 MinerSet 资源被成功创建。</p>
<h4 id="_2-矿机池-矿机池列表" tabindex="-1"><a class="header-anchor" href="#_2-矿机池-矿机池列表"><span>2）矿机池：矿机池列表</span></a></h4>
<p>获取矿机池列表命令如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">curl</span> <span class="token string">'http://onex.gateway.superproj.com:51843/v1/minersets?offset=0&amp;limit=10'</span> <span class="token parameter variable">-H</span><span class="token string">"Authorization: Bearer <span class="token variable">${token}</span>"</span>
<span class="token punctuation">{</span><span class="token string">"totalCount"</span><span class="token builtin class-name">:</span><span class="token string">"1"</span>, <span class="token string">"MinerSets"</span>:<span class="token punctuation">[</span><span class="token punctuation">{</span><span class="token string">"name"</span><span class="token builtin class-name">:</span><span class="token string">"minerset0"</span>, <span class="token string">"replicas"</span>:2, <span class="token string">"displayName"</span><span class="token builtin class-name">:</span><span class="token string">"test-minerset"</span>, <span class="token string">"deletePolicy"</span><span class="token builtin class-name">:</span><span class="token string">"Random"</span>, <span class="token string">"MinerTemplate"</span>:null, <span class="token string">"createdAt"</span><span class="token builtin class-name">:</span><span class="token string">"2024-01-17T05:08:19Z"</span>, <span class="token string">"updatedAt"</span><span class="token builtin class-name">:</span><span class="token string">"2024-01-17T13:32:06Z"</span><span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-矿机池-获取矿机池详细信息" tabindex="-1"><a class="header-anchor" href="#_3-矿机池-获取矿机池详细信息"><span>3）矿机池：获取矿机池详细信息</span></a></h4>
<p>获取矿机池详细信息命令如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">curl</span> <span class="token string">'http://onex.gateway.superproj.com:51843/v1/minersets/minerset0'</span> -H<span class="token string">"Authorization: Bearer <span class="token variable">${token}</span>"</span>
<span class="token punctuation">{</span><span class="token string">"metadata"</span>:<span class="token punctuation">{</span><span class="token string">"name"</span><span class="token builtin class-name">:</span><span class="token string">"minerset0"</span>,<span class="token string">"namespace"</span><span class="token builtin class-name">:</span><span class="token string">"user-k7ejrq"</span>,<span class="token string">"uid"</span><span class="token builtin class-name">:</span><span class="token string">"dc14f3d4-08c7-43e6-8963-05351d585ff1"</span>,<span class="token string">"resourceVersion"</span><span class="token builtin class-name">:</span><span class="token string">"315"</span>,<span class="token string">"generation"</span>:1,<span class="token string">"creationTimestamp"</span><span class="token builtin class-name">:</span><span class="token string">"2024-01-17T13:08:19Z"</span>,<span class="token string">"labels"</span>:<span class="token punctuation">{</span><span class="token string">"apps.onex.io/chain-name"</span><span class="token builtin class-name">:</span><span class="token string">"genesis"</span><span class="token punctuation">}</span>,<span class="token string">"managedFields"</span>:<span class="token punctuation">[</span><span class="token punctuation">{</span><span class="token string">"manager"</span><span class="token builtin class-name">:</span><span class="token string">"onex-gateway"</span>,<span class="token string">"operation"</span><span class="token builtin class-name">:</span><span class="token string">"Update"</span>,<span class="token string">"apiVersion"</span><span class="token builtin class-name">:</span><span class="token string">"apps.onex.io/v1beta1"</span>,<span class="token string">"time"</span><span class="token builtin class-name">:</span><span class="token string">"2024-01-17T13:08:19Z"</span>,<span class="token string">"fieldsType"</span><span class="token builtin class-name">:</span><span class="token string">"FieldsV1"</span>,<span class="token string">"fieldsV1"</span>:<span class="token punctuation">{</span><span class="token string">"f:spec"</span>:<span class="token punctuation">{</span><span class="token string">"f:deletePolicy"</span>:<span class="token punctuation">{</span><span class="token punctuation">}</span>,<span class="token string">"f:displayName"</span>:<span class="token punctuation">{</span><span class="token punctuation">}</span>,<span class="token string">"f:replicas"</span>:<span class="token punctuation">{</span><span class="token punctuation">}</span>,<span class="token string">"f:template"</span>:<span class="token punctuation">{</span><span class="token string">"f:spec"</span>:<span class="token punctuation">{</span><span class="token string">"f:chainName"</span>:<span class="token punctuation">{</span><span class="token punctuation">}</span>,<span class="token string">"f:minerType"</span>:<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">}</span>,<span class="token punctuation">{</span><span class="token string">"manager"</span><span class="token builtin class-name">:</span><span class="token string">"onex-minerset-controller"</span>,<span class="token string">"operation"</span><span class="token builtin class-name">:</span><span class="token string">"Update"</span>,<span class="token string">"apiVersion"</span><span class="token builtin class-name">:</span><span class="token string">"apps.onex.io/v1beta1"</span>,<span class="token string">"time"</span><span class="token builtin class-name">:</span><span class="token string">"2024-01-17T13:27:21Z"</span>,<span class="token string">"fieldsType"</span><span class="token builtin class-name">:</span><span class="token string">"FieldsV1"</span>,<span class="token string">"fieldsV1"</span>:<span class="token punctuation">{</span><span class="token string">"f:metadata"</span>:<span class="token punctuation">{</span><span class="token string">"f:labels"</span>:<span class="token punctuation">{</span><span class="token string">"."</span>:<span class="token punctuation">{</span><span class="token punctuation">}</span>,<span class="token string">"f:apps.onex.io/chain-name"</span>:<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">}</span>,<span class="token punctuation">{</span><span class="token string">"manager"</span><span class="token builtin class-name">:</span><span class="token string">"onex-minerset-controller"</span>,<span class="token string">"operation"</span><span class="token builtin class-name">:</span><span class="token string">"Update"</span>,<span class="token string">"apiVersion"</span><span class="token builtin class-name">:</span><span class="token string">"apps.onex.io/v1beta1"</span>,<span class="token string">"time"</span><span class="token builtin class-name">:</span><span class="token string">"2024-01-17T13:32:06Z"</span>,<span class="token string">"fieldsType"</span><span class="token builtin class-name">:</span><span class="token string">"FieldsV1"</span>,<span class="token string">"fieldsV1"</span>:<span class="token punctuation">{</span><span class="token string">"f:status"</span>:<span class="token punctuation">{</span><span class="token string">"f:availableReplicas"</span>:<span class="token punctuation">{</span><span class="token punctuation">}</span>,<span class="token string">"f:fullyLabeledReplicas"</span>:<span class="token punctuation">{</span><span class="token punctuation">}</span>,<span class="token string">"f:observedGeneration"</span>:<span class="token punctuation">{</span><span class="token punctuation">}</span>,<span class="token string">"f:readyReplicas"</span>:<span class="token punctuation">{</span><span class="token punctuation">}</span>,<span class="token string">"f:replicas"</span>:<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">}</span>,<span class="token string">"subresource"</span><span class="token builtin class-name">:</span><span class="token string">"status"</span><span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">}</span>,<span class="token string">"spec"</span>:<span class="token punctuation">{</span><span class="token string">"replicas"</span>:2,<span class="token string">"selector"</span>:<span class="token punctuation">{</span><span class="token punctuation">}</span>,<span class="token string">"template"</span>:<span class="token punctuation">{</span><span class="token string">"metadata"</span>:<span class="token punctuation">{</span><span class="token punctuation">}</span>,<span class="token string">"spec"</span>:<span class="token punctuation">{</span><span class="token string">"metadata"</span>:<span class="token punctuation">{</span><span class="token punctuation">}</span>,<span class="token string">"minerType"</span><span class="token builtin class-name">:</span><span class="token string">"M1.MEDIUM2"</span>,<span class="token string">"chainName"</span><span class="token builtin class-name">:</span><span class="token string">"genesis"</span><span class="token punctuation">}</span><span class="token punctuation">}</span>,<span class="token string">"displayName"</span><span class="token builtin class-name">:</span><span class="token string">"test-minerset"</span>,<span class="token string">"deletePolicy"</span><span class="token builtin class-name">:</span><span class="token string">"Random"</span><span class="token punctuation">}</span>,<span class="token string">"status"</span>:<span class="token punctuation">{</span><span class="token string">"replicas"</span>:2,<span class="token string">"fullyLabeledReplicas"</span>:2,<span class="token string">"readyReplicas"</span>:2,<span class="token string">"availableReplicas"</span>:2,<span class="token string">"observedGeneration"</span>:1,<span class="token string">"conditions"</span>:<span class="token punctuation">[</span><span class="token punctuation">{</span><span class="token string">"type"</span><span class="token builtin class-name">:</span><span class="token string">"Ready"</span>,<span class="token string">"status"</span><span class="token builtin class-name">:</span><span class="token string">"True"</span>,<span class="token string">"severity"</span><span class="token builtin class-name">:</span><span class="token string">""</span>,<span class="token string">"lastTransitionTime"</span><span class="token builtin class-name">:</span><span class="token string">"2024-01-17T13:32:06Z"</span><span class="token punctuation">}</span>,<span class="token punctuation">{</span><span class="token string">"type"</span><span class="token builtin class-name">:</span><span class="token string">"MinersCreated"</span>,<span class="token string">"status"</span><span class="token builtin class-name">:</span><span class="token string">"True"</span>,<span class="token string">"severity"</span><span class="token builtin class-name">:</span><span class="token string">""</span>,<span class="token string">"lastTransitionTime"</span><span class="token builtin class-name">:</span><span class="token string">"2024-01-17T13:27:21Z"</span><span class="token punctuation">}</span>,<span class="token punctuation">{</span><span class="token string">"type"</span><span class="token builtin class-name">:</span><span class="token string">"Resized"</span>,<span class="token string">"status"</span><span class="token builtin class-name">:</span><span class="token string">"True"</span>,<span class="token string">"severity"</span><span class="token builtin class-name">:</span><span class="token string">""</span>,<span class="token string">"lastTransitionTime"</span><span class="token builtin class-name">:</span><span class="token string">"2024-01-17T13:32:06Z"</span><span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_4-矿机池-更新矿机池" tabindex="-1"><a class="header-anchor" href="#_4-矿机池-更新矿机池"><span>4）矿机池：更新矿机池</span></a></h4>
<p>更新矿机池命令如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">curl</span> <span class="token parameter variable">-XPUT</span> <span class="token string">'http://onex.gateway.superproj.com:51843/v1/minersets'</span> -H<span class="token string">"Authorization: Bearer <span class="token variable">${token}</span>"</span> -H<span class="token string">'Content-Type: application/json'</span> -d<span class="token string">'{"metadata":{"name":"minerset0"},"spec":{"replicas":2,"template":{"spec":{"minerType":"M1.MEDIUM2","chainName":"genesis"}},"displayName":"test-minerset-modified"}}'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>使用 <code v-pre>kubectl</code> 命令查看 <code v-pre>minerset0</code> MinerSet 资源的 <code v-pre>displayName</code> 字段是否被成功更新：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ kubectl <span class="token parameter variable">-n</span> <span class="token variable">${user_id}</span> get ms minerset0 <span class="token parameter variable">-oyaml</span> <span class="token operator">|</span> <span class="token function">grep</span> displayName
  displayName: test-minerset-modified
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>displayName</code> 字段被成功更新为 <code v-pre>test-minerset-modified</code>，说明接口正常工作。</p>
<h4 id="_5-矿机池-扩缩容矿机池" tabindex="-1"><a class="header-anchor" href="#_5-矿机池-扩缩容矿机池"><span>5）矿机池：扩缩容矿机池</span></a></h4>
<p>扩缩容矿机池命令如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">curl</span> <span class="token parameter variable">-XPUT</span> <span class="token string">'http://onex.gateway.superproj.com:51843/v1/minersets/minerset0/scale'</span> -H<span class="token string">"Authorization: Bearer <span class="token variable">${token}</span>"</span> -H<span class="token string">'Content-Type: application/json'</span> -d<span class="token string">'{"replicas":3}'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>使用 <code v-pre>kubectl</code> 来查看 <code v-pre>minerset0</code> 矿机池是否成功被扩容成 <code v-pre>3</code> 个副本：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ kubectl <span class="token parameter variable">-n</span> <span class="token variable">${user_id}</span> get mi<span class="token operator">|</span><span class="token function">grep</span> minerset0
minerset0-2pfrt   Running   15m
minerset0-lcnfs   Running   15m
minerset0-z4ckw   Running   14s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到，<code v-pre>minerset0</code> 矿机池，扩容成功。</p>
<h4 id="_8-矿机池-删除矿机池" tabindex="-1"><a class="header-anchor" href="#_8-矿机池-删除矿机池"><span>8）矿机池：删除矿机池</span></a></h4>
<p>删除矿机池命令如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">curl</span> <span class="token parameter variable">-XDELETE</span> http://onex.gateway.superproj.com:51843/v1/minersets/minerset0 -H<span class="token string">"Authorization: Bearer <span class="token variable">${token}</span>"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>使用 <code v-pre>kubectl</code> 来查看 <code v-pre>minerset0</code> 矿机池是否被成功删除，命令如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ kubectl <span class="token parameter variable">-n</span> <span class="token variable">${user_id}</span> get minerset
No resources found <span class="token keyword">in</span> user-k7ejrq namespace.
$ kubectl <span class="token parameter variable">-n</span> <span class="token variable">${user_id}</span> get miner
No resources found <span class="token keyword">in</span> user-k7ejrq namespace.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到矿机池和池子中的矿机均被成功删除。</p>
<h4 id="_9-矿机-创建矿机" tabindex="-1"><a class="header-anchor" href="#_9-矿机-创建矿机"><span>9）矿机：创建矿机</span></a></h4>
<p>OneX 项目支持单独创建一个游离的矿机（游离的矿机：不属于任何矿机池）。接下来，我们来看下如何通过 onex-gateway 来操作矿机。</p>
<p>创建游离的矿机命令如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token assign-left variable">idempotent_token</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">curl</span> <span class="token parameter variable">-s</span> http://onex.gateway.superproj.com:51843/v1/idempotents -H<span class="token string">"Authorization: Bearer <span class="token variable">${token}</span>"</span> <span class="token operator">|</span> jq <span class="token parameter variable">-r</span> .token<span class="token variable">)</span></span>
$ <span class="token function">curl</span> <span class="token parameter variable">-XPOST</span> http://onex.gateway.superproj.com:51843/v1/miners -H<span class="token string">"X-Idempotent-ID: <span class="token variable">${idempotent_token}</span>"</span> -H<span class="token string">"Authorization: Bearer <span class="token variable">${token}</span>"</span> -H<span class="token string">'Content-Type: application/json'</span> -d<span class="token string">'{"metadata":{"name":"miner0"},"spec":{"chainName":"genesis","minerType":"M1.MEDIUM2"},"apiVersion":"apps.onex.io/v1beta1","kind":"Miner"}'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>检查矿机是否被成功创建：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ kubectl <span class="token parameter variable">-n</span> <span class="token variable">${user_id}</span> get miner <span class="token operator">|</span> <span class="token function">grep</span> miner0
miner0   Running   28s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到，矿机被成功创建。</p>
<h4 id="_10-矿机-矿机列表" tabindex="-1"><a class="header-anchor" href="#_10-矿机-矿机列表"><span>10）矿机：矿机列表</span></a></h4>
<p>获取矿机列表命令如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">curl</span> <span class="token string">'http://onex.gateway.superproj.com:51843/v1/miners?offset=0&amp;limit=10'</span> <span class="token parameter variable">-H</span><span class="token string">"Authorization: Bearer <span class="token variable">${token}</span>"</span>
<span class="token punctuation">{</span><span class="token string">"totalCount"</span><span class="token builtin class-name">:</span><span class="token string">"1"</span>, <span class="token string">"Miners"</span>:<span class="token punctuation">[</span><span class="token punctuation">{</span><span class="token string">"name"</span><span class="token builtin class-name">:</span><span class="token string">"miner0"</span>, <span class="token string">"displayName"</span><span class="token builtin class-name">:</span><span class="token string">""</span>, <span class="token string">"minerType"</span><span class="token builtin class-name">:</span><span class="token string">"M1.MEDIUM2"</span>, <span class="token string">"chainName"</span><span class="token builtin class-name">:</span><span class="token string">"genesis"</span>, <span class="token string">"dataDir"</span><span class="token builtin class-name">:</span><span class="token string">""</span>, <span class="token string">"status"</span><span class="token builtin class-name">:</span><span class="token string">""</span>, <span class="token string">"createdAt"</span><span class="token builtin class-name">:</span><span class="token string">"2024-01-17T06:22:13Z"</span>, <span class="token string">"updatedAt"</span><span class="token builtin class-name">:</span><span class="token string">"2024-01-17T14:22:13Z"</span><span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_11-矿机-获取矿机详情" tabindex="-1"><a class="header-anchor" href="#_11-矿机-获取矿机详情"><span>11）矿机：获取矿机详情</span></a></h4>
<p>获取矿机详情命令如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">curl</span> <span class="token string">'http://onex.gateway.superproj.com:51843/v1/miners/miner0'</span> -H<span class="token string">"Authorization: Bearer <span class="token variable">${token}</span>"</span>
<span class="token punctuation">{</span><span class="token string">"metadata"</span>:<span class="token punctuation">{</span><span class="token string">"name"</span><span class="token builtin class-name">:</span><span class="token string">"miner0"</span>,<span class="token string">"generateName"</span><span class="token builtin class-name">:</span><span class="token string">"mi-"</span>,<span class="token string">"namespace"</span><span class="token builtin class-name">:</span><span class="token string">"user-k7ejrq"</span>,<span class="token string">"uid"</span><span class="token builtin class-name">:</span><span class="token string">"997e6b0a-873e-42ff-838d-64eff645d347"</span>,<span class="token string">"resourceVersion"</span><span class="token builtin class-name">:</span><span class="token string">"357"</span>,<span class="token string">"generation"</span>:1,<span class="token string">"creationTimestamp"</span><span class="token builtin class-name">:</span><span class="token string">"2024-01-17T14:22:13Z"</span>,<span class="token string">"annotations"</span>:<span class="token punctuation">{</span><span class="token string">"apps.onex.io/memoryMb"</span><span class="token builtin class-name">:</span><span class="token string">"2Gi"</span>,<span class="token string">"apps.onex.io/vCPU"</span><span class="token builtin class-name">:</span><span class="token string">"200m"</span><span class="token punctuation">}</span>,<span class="token string">"finalizers"</span>:<span class="token punctuation">[</span><span class="token string">"miner.onex.io/finalizer"</span><span class="token punctuation">]</span>,<span class="token string">"managedFields"</span>:<span class="token punctuation">[</span><span class="token punctuation">{</span><span class="token string">"manager"</span><span class="token builtin class-name">:</span><span class="token string">"onex-gateway"</span>,<span class="token string">"operation"</span><span class="token builtin class-name">:</span><span class="token string">"Update"</span>,<span class="token string">"apiVersion"</span><span class="token builtin class-name">:</span><span class="token string">"apps.onex.io/v1beta1"</span>,<span class="token string">"time"</span><span class="token builtin class-name">:</span><span class="token string">"2024-01-17T14:22:13Z"</span>,<span class="token string">"fieldsType"</span><span class="token builtin class-name">:</span><span class="token string">"FieldsV1"</span>,<span class="token string">"fieldsV1"</span>:<span class="token punctuation">{</span><span class="token string">"f:metadata"</span>:<span class="token punctuation">{</span><span class="token string">"f:generateName"</span>:<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">}</span>,<span class="token string">"f:spec"</span>:<span class="token punctuation">{</span><span class="token string">"f:chainName"</span>:<span class="token punctuation">{</span><span class="token punctuation">}</span>,<span class="token string">"f:minerType"</span>:<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">}</span>,<span class="token punctuation">{</span><span class="token string">"manager"</span><span class="token builtin class-name">:</span><span class="token string">"onex-miner-controller"</span>,<span class="token string">"operation"</span><span class="token builtin class-name">:</span><span class="token string">"Update"</span>,<span class="token string">"apiVersion"</span><span class="token builtin class-name">:</span><span class="token string">"apps.onex.io/v1beta1"</span>,<span class="token string">"time"</span><span class="token builtin class-name">:</span><span class="token string">"2024-01-17T14:22:13Z"</span>,<span class="token string">"fieldsType"</span><span class="token builtin class-name">:</span><span class="token string">"FieldsV1"</span>,<span class="token string">"fieldsV1"</span>:<span class="token punctuation">{</span><span class="token string">"f:metadata"</span>:<span class="token punctuation">{</span><span class="token string">"f:annotations"</span>:<span class="token punctuation">{</span><span class="token string">"."</span>:<span class="token punctuation">{</span><span class="token punctuation">}</span>,<span class="token string">"f:apps.onex.io/memoryMb"</span>:<span class="token punctuation">{</span><span class="token punctuation">}</span>,<span class="token string">"f:apps.onex.io/vCPU"</span>:<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">}</span>,<span class="token string">"f:finalizers"</span>:<span class="token punctuation">{</span><span class="token string">"."</span>:<span class="token punctuation">{</span><span class="token punctuation">}</span>,<span class="token string">"v:<span class="token entity" title="\&quot;">\"</span>miner.onex.io/finalizer<span class="token entity" title="\&quot;">\"</span>"</span>:<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">}</span>,<span class="token punctuation">{</span><span class="token string">"manager"</span><span class="token builtin class-name">:</span><span class="token string">"onex-miner-controller"</span>,<span class="token string">"operation"</span><span class="token builtin class-name">:</span><span class="token string">"Update"</span>,<span class="token string">"apiVersion"</span><span class="token builtin class-name">:</span><span class="token string">"apps.onex.io/v1beta1"</span>,<span class="token string">"time"</span><span class="token builtin class-name">:</span><span class="token string">"2024-01-17T14:22:13Z"</span>,<span class="token string">"fieldsType"</span><span class="token builtin class-name">:</span><span class="token string">"FieldsV1"</span>,<span class="token string">"fieldsV1"</span>:<span class="token punctuation">{</span><span class="token string">"f:status"</span>:<span class="token punctuation">{</span><span class="token string">"f:lastUpdated"</span>:<span class="token punctuation">{</span><span class="token punctuation">}</span>,<span class="token string">"f:observedGeneration"</span>:<span class="token punctuation">{</span><span class="token punctuation">}</span>,<span class="token string">"f:phase"</span>:<span class="token punctuation">{</span><span class="token punctuation">}</span>,<span class="token string">"f:podRef"</span>:<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">}</span>,<span class="token string">"subresource"</span><span class="token builtin class-name">:</span><span class="token string">"status"</span><span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">}</span>,<span class="token string">"spec"</span>:<span class="token punctuation">{</span><span class="token string">"metadata"</span>:<span class="token punctuation">{</span><span class="token punctuation">}</span>,<span class="token string">"minerType"</span><span class="token builtin class-name">:</span><span class="token string">"M1.MEDIUM2"</span>,<span class="token string">"chainName"</span><span class="token builtin class-name">:</span><span class="token string">"genesis"</span><span class="token punctuation">}</span>,<span class="token string">"status"</span>:<span class="token punctuation">{</span><span class="token string">"podRef"</span>:<span class="token punctuation">{</span><span class="token string">"kind"</span><span class="token builtin class-name">:</span><span class="token string">"Pod"</span>,<span class="token string">"namespace"</span><span class="token builtin class-name">:</span><span class="token string">"user-k7ejrq"</span>,<span class="token string">"name"</span><span class="token builtin class-name">:</span><span class="token string">"miner0"</span>,<span class="token string">"uid"</span><span class="token builtin class-name">:</span><span class="token string">"d914060f-ae73-47c0-b205-5bd425c66d70"</span>,<span class="token string">"apiVersion"</span><span class="token builtin class-name">:</span><span class="token string">"v1"</span><span class="token punctuation">}</span>,<span class="token string">"lastUpdated"</span><span class="token builtin class-name">:</span><span class="token string">"2024-01-17T14:22:13Z"</span>,<span class="token string">"phase"</span><span class="token builtin class-name">:</span><span class="token string">"Running"</span>,<span class="token string">"observedGeneration"</span>:1,<span class="token string">"conditions"</span>:<span class="token punctuation">[</span><span class="token punctuation">{</span><span class="token string">"type"</span><span class="token builtin class-name">:</span><span class="token string">"PodHealthy"</span>,<span class="token string">"status"</span><span class="token builtin class-name">:</span><span class="token string">"True"</span>,<span class="token string">"severity"</span><span class="token builtin class-name">:</span><span class="token string">""</span>,<span class="token string">"lastTransitionTime"</span><span class="token builtin class-name">:</span><span class="token string">"2024-01-17T14:22:13Z"</span><span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_12-矿机-更新矿机信息" tabindex="-1"><a class="header-anchor" href="#_12-矿机-更新矿机信息"><span>12）矿机：更新矿机信息</span></a></h4>
<p>更新矿机信息命令如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">curl</span> <span class="token parameter variable">-XPUT</span> <span class="token string">'http://onex.gateway.superproj.com:51843/v1/miners'</span> -H<span class="token string">"Authorization: Bearer <span class="token variable">${token}</span>"</span> -H<span class="token string">'Content-Type: application/json'</span> -d<span class="token string">'{"metadata":{"name":"miner0"},"spec":{"chainName":"genesis","minerType":"M1.MEDIUM2","displayName":"test-for-gateway"},"apiVersion":"apps.onex.io/v1beta1","kind":"Miner"}'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>检查 <code v-pre>miner0</code> Miner 是否被成功更新：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ kubectl <span class="token parameter variable">-n</span> <span class="token variable">${user_id}</span> get miner miner0 -oyaml<span class="token operator">|</span><span class="token function">grep</span> displayName
  displayName: test-for-gateway
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到 Miner 资源被成功更新。</p>
<h4 id="_13-矿机-删除矿机" tabindex="-1"><a class="header-anchor" href="#_13-矿机-删除矿机"><span>13）矿机：删除矿机</span></a></h4>
<p>删除矿机命令如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">curl</span> <span class="token parameter variable">-XDELETE</span> http://onex.gateway.superproj.com:51843/v1/miners/miner0 -H<span class="token string">"Authorization: Bearer <span class="token variable">${token}</span>"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>检查资源是否被成功删除：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ kubectl <span class="token parameter variable">-n</span> <span class="token variable">${user_id}</span> get miner miner0
Error from server <span class="token punctuation">(</span>NotFound<span class="token punctuation">)</span>: miners.apps.onex.io <span class="token string">"miner0"</span> not found
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到，资源被成功删除。</p>
<h3 id="测试-onex-nightwatch-组件" tabindex="-1"><a class="header-anchor" href="#测试-onex-nightwatch-组件"><span>测试 onex-nightwatch 组件</span></a></h3>
<p>onex-nightwatch 是 OneX 平台的异步任务调度引擎，你可以根据需要便捷的注册你需要的异步任务。当前 onex-nightwatch 中只注册了一个异步任务处理逻辑：删除过期的密钥。如果密钥过期，onex-nightwatch 不会立即删除，而是要等过期 7 天后才删除。</p>
<p>所以，我们可以创建一个 7 天前已经过期的密钥，30s 后查看该密钥是否被删除，来测试 onex-nightwatch 是否正常工作。</p>
<ol>
<li>创建一个 7 天前已经过期的密钥</li>
</ol>
<p>要创建密钥，我们需要先创建一个用户，并登录 onex-usercenter，命令如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">curl</span> http://onex.usercenter.superproj.com:50843/v1/users -H<span class="token string">'Content-Type: application/json'</span> -d<span class="token string">'{"username":"colin","password":"onex(#)666","nickname":"colin","realName":"孔令飞","email":"colin404@foxmail.com","phone":"1812884xxxx"}'</span>
$ <span class="token assign-left variable">token</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">curl</span> <span class="token parameter variable">-s</span> <span class="token parameter variable">-XPOST</span> -H<span class="token string">'Content-Type: application/json'</span> http://onex.usercenter.superproj.com:50843/v1/auth/login -d<span class="token string">'{"username":"colin","password":"onex(#)666"}'</span><span class="token operator">|</span>jq <span class="token parameter variable">-r</span> .refreshToken<span class="token variable">)</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>登录后，将 <code v-pre>refreshToken</code> 保存在 <code v-pre>token</code> 环境变量中，方便后续访问。</p>
<p>创建密钥命令如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">curl</span> <span class="token parameter variable">-XPOST</span> http://onex.usercenter.superproj.com:50843/v1/secrets -H<span class="token string">"Authorization: Bearer <span class="token variable">${token}</span>"</span> -H<span class="token string">'Content-Type: application/json'</span> -d<span class="token string">'{"name":"secret0","expires":'</span><span class="token variable"><span class="token variable">$(</span><span class="token function">date</span> <span class="token parameter variable">-d</span> <span class="token string">"8 days ago"</span> +%s<span class="token variable">)</span></span><span class="token string">',"description":"tester secret"}'</span>
<span class="token function">date</span> <span class="token parameter variable">-d</span> <span class="token string">"8 days ago"</span> +%s 创建了一个比当前时间早 <span class="token number">8</span> 天的，Unix 格式的时间。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>30s</code> 后，查看 onex-nightwatch 日志，确认过期的密钥被成功删除：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">egrep</span> <span class="token string">'Successfully deleted secret from database.*secret0'</span> <span class="token variable">${ONEX_NIGHTWATCH_LOG_OUTPUT}</span>
$ <span class="token function">egrep</span> <span class="token string">'Successfully deleted secret from database.*secret0'</span> /opt/onex/log/onex-nightwatch.log 
<span class="token number">2024</span>-01-18 09:23:35.007        INFO        secretsclean/watcher.go:41        Successfully deleted secret from database   <span class="token punctuation">{</span><span class="token string">"userID"</span><span class="token builtin class-name">:</span> <span class="token string">"user-44ci8j"</span>, <span class="token string">"name"</span><span class="token builtin class-name">:</span> <span class="token string">"secret0"</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果 <code v-pre>${ONEX_NIGHTWATCH_LOG_OUTPUT}</code> 中能找到删除 <code v-pre>secret0</code> 密钥的日志，说明 onex-nightwatch 被成功部署。</p>
<p><code v-pre>${ONEX_NIGHTWATCH_LOG_OUTPUT}</code> 变量指定了 onex-nightwatch 组件日志的记录文件，如果 <code v-pre>${ONEX_NIGHTWATCH_LOG_OUTPUT}</code> 被设置为 <code v-pre>stdout</code>，说明日志输出到了标准输出，你需要从标准输出中查找日志。</p>
<p>如果你是通过容器化的部署方式，可以登录容器执行以下命令来查找：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">docker</span> <span class="token builtin class-name">exec</span> onex journalctl <span class="token parameter variable">-u</span> onex-nightwatch <span class="token operator">|</span> <span class="token function">egrep</span> <span class="token string">'Successfully deleted secret from database.*secret0'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="测试-onex-pump-组件" tabindex="-1"><a class="header-anchor" href="#测试-onex-pump-组件"><span>测试 onex-pump 组件</span></a></h3>
<p>onex-pump 组件会从 Kafka 中消费授权日志，并转存到 MongoDB 中。所以，我们只需要产生一条授权数据，并检查 MongoDB 中是否有这条授权日志即可。</p>
<ol>
<li>检查 kafka 中是否有授权消息产生</li>
</ol>
<p>为了方便测试，我们使用 <code v-pre>kafkactl</code> 来读取 kafka 中的消息。首先要安装 <code v-pre>kafkactl</code> 命令：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">make</span> <span class="token parameter variable">-C</span> <span class="token variable">${ONEX_ROOT}</span> tools.install.kafkactl
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>配置 kafkactl：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token builtin class-name">source</span> <span class="token variable">${ONEX_ROOT}</span>/manifests/env.local
$ <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> <span class="token environment constant">$HOME</span>/.config/kafkactl
$ <span class="token function">cat</span> <span class="token operator">&lt;&lt;</span><span class="token string">EOF<span class="token bash punctuation"> <span class="token operator">></span> <span class="token environment constant">$HOME</span>/.config/kafkactl/config.yml</span>
contexts:
  default:
    brokers:
    - <span class="token variable">${ONEX_KAFKA_HOST}</span>:<span class="token variable">${ONEX_KAFKA_PORT}</span>
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>消费 <code v-pre>audit</code> topic 中的消息：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ kafkactl consume audit
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>打开一个新的 Linux 终端，执行以下命令，来产生一条授权日志：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">curl</span> <span class="token parameter variable">-XPOST</span> http://onex.usercenter.superproj.com:50843/v1/auth/authorize -H<span class="token string">'Content-Type: application/json'</span> -d<span class="token string">'{"sub":"colin","obj":"tester","act":"delete"}'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>查看 <code v-pre>kafkactl consume audit</code> 命令所在的 Linux 终端是否消费到数据：</p>
<figure><img src="/images/kafkactl_consume_audit命令输出.png" alt="kafkactl consume audit 命令输出" tabindex="0" loading="lazy"><figcaption>kafkactl consume audit 命令输出</figcaption></figure>
<p>可以看到成功消费到授权数据，说明 onex-usercenter 可以成功向 kafka 上报授权数据。</p>
<ol start="2">
<li>检查 MongoDB 中，是否有清洗后的授权日志</li>
</ol>
<p>执行以下命令来测试：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token assign-left variable">encoded</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">echo</span> <span class="token parameter variable">-n</span> <span class="token string">"<span class="token variable">${ONEX_MONGO_ADMIN_PASSWORD}</span>"</span><span class="token operator">|</span>jq <span class="token parameter variable">-sRr</span> @uri<span class="token variable">)</span></span>
$ mongosh <span class="token parameter variable">--quiet</span> mongodb://<span class="token variable">${ONEX_MONGO_ADMIN_USERNAME}</span><span class="token builtin class-name">:</span><span class="token variable">${encoded}</span>@<span class="token variable">${ONEX_MONGO_URL}</span>/<span class="token variable">${ONEX_MONGO_DATABASE}</span>?authSource<span class="token operator">=</span>admin
onex<span class="token operator">></span> db.audit.find<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">[</span>
  <span class="token punctuation">{</span>
    _id: ObjectId<span class="token punctuation">(</span><span class="token string">'65a8f1d3a90670925fdb1737'</span><span class="token punctuation">)</span>,
    topic: <span class="token string">'audit'</span>,
    partition: <span class="token number">0</span>,
    offset: Long<span class="token punctuation">(</span><span class="token string">'3'</span><span class="token punctuation">)</span>,
    highwatermark: Long<span class="token punctuation">(</span><span class="token string">'4'</span><span class="token punctuation">)</span>,
    key: null,
    value: Binary.createFromBase64<span class="token punctuation">(</span><span class="token string">'MjAyNC0wMS0xOCAxNzozOTozMSB7Im1hdGNoZXIiOiJnKHJfc3ViLCBwX3N1YikgXHUwMDI2XHUwMDI2IHJfb2JqID09IHBfb2JqIFx1MDAyNlx1MDAyNiByX2FjdCA9PSBwX2FjdCB8fCByX3N1YiA9PSBcInJvb3RcIiIsInJlcXVlc3QiOlsiY29saW4iLCJ0ZXN0ZXIiLCJkZWxldGUiXSwicmVzdWx0Ijp0cnVlLCJ0aW1lc3RhbXAiOjE3MDU1NzA3NzB9'</span>, <span class="token number">0</span><span class="token punctuation">)</span>,
    headers: null,
    time: ISODate<span class="token punctuation">(</span><span class="token string">'2024-01-18T09:39:31.236Z'</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">]</span>
onex<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果执行 <code v-pre>db.audit.find()</code>，能查询到授权日志的 Mongo 记录，说明 onex-pump 部署成功。</p>
<p>执行以下命令，可以解压日志清洗后的内容：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token builtin class-name">echo</span> <span class="token string">'MjAyNC0wMS0xOCAxNzozOTozMSB7Im1hdGNoZXIiOiJnKHJfc3ViLCBwX3N1YikgXHUwMDI2XHUwMDI2IHJfb2JqID09IHBfb2JqIFx1MDAyNlx1MDAyNiByX2FjdCA9PSBwX2FjdCB8fCByX3N1YiA9PSBcInJvb3RcIiIsInJlcXVlc3QiOlsiY29saW4iLCJ0ZXN0ZXIiLCJkZWxldGUiXSwicmVzdWx0Ijp0cnVlLCJ0aW1lc3RhbXAiOjE3MDU1NzA3NzB9'</span><span class="token operator">|</span>base64 <span class="token parameter variable">-d</span>
<span class="token number">2024</span>-01-18 <span class="token number">17</span>:39:31 <span class="token punctuation">{</span><span class="token string">"matcher"</span><span class="token builtin class-name">:</span><span class="token string">"g(r_sub, p_sub) <span class="token entity" title="\u0026">\u0026</span><span class="token entity" title="\u0026">\u0026</span> r_obj == p_obj <span class="token entity" title="\u0026">\u0026</span><span class="token entity" title="\u0026">\u0026</span> r_act == p_act || r_sub == <span class="token entity" title="\&quot;">\"</span>root<span class="token entity" title="\&quot;">\"</span>"</span>,<span class="token string">"request"</span>:<span class="token punctuation">[</span><span class="token string">"colin"</span>,<span class="token string">"tester"</span>,<span class="token string">"delete"</span><span class="token punctuation">]</span>,<span class="token string">"result"</span>:true,<span class="token string">"timestamp"</span>:1705570770<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这里，我们在每一条授权日志前面加了一个时间戳 <code v-pre>2024-01-18 17:39:31</code>。</p>
<h3 id="测试-onex-toyblc-组件" tabindex="-1"><a class="header-anchor" href="#测试-onex-toyblc-组件"><span>测试 onex-toyblc 组件</span></a></h3>
<p>我们可以请求 <code v-pre>/v1/blocks</code> 来查看当前私有链中的区块详情：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">curl</span> -uonex:<span class="token string">'onex(#)666'</span> http://<span class="token variable">${ONEX_ACCESS_HOST}</span><span class="token builtin class-name">:</span><span class="token variable">${ONEX_TOYBLC_HTTP_PORT}</span>/v1/blocks
<span class="token punctuation">[</span><span class="token punctuation">{</span><span class="token string">"index"</span>:0,<span class="token string">"previousHash"</span><span class="token builtin class-name">:</span><span class="token string">"0"</span>,<span class="token string">"timestamp"</span>:1465154705,<span class="token string">"data"</span><span class="token builtin class-name">:</span><span class="token string">"genesis block"</span>,<span class="token string">"hash"</span><span class="token builtin class-name">:</span><span class="token string">"816534932c2b7154836da6afc367695e6337db8a921823784c14378abed4f7d7"</span>,<span class="token string">"address"</span><span class="token builtin class-name">:</span><span class="token string">"0x210d9eD12CEA87E33a98AA7Bcb4359eABA9e800e"</span><span class="token punctuation">}</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>还可以请求 <code v-pre>/v1/peers</code> 来查看当前区块链中的节点：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">curl</span> -uonex:<span class="token string">'onex(#)666'</span> http://<span class="token variable">${ONEX_ACCESS_HOST}</span><span class="token builtin class-name">:</span><span class="token variable">${ONEX_TOYBLC_HTTP_PORT}</span>/v1/peers
<span class="token punctuation">[</span><span class="token string">"127.0.0.1:58404"</span>,<span class="token string">"localhost:6001"</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果 <code v-pre>/v1/blocks</code> 和 <code v-pre>/v1/peers</code> 接口都请求成功，说明 onex-toyblc 成功部署。</p>
<h2 id="云原生组件测试" tabindex="-1"><a class="header-anchor" href="#云原生组件测试"><span>云原生组件测试</span></a></h2>
<p>在测试云原生组件的过程中需要通过 <code v-pre>kubectl</code> 工具访问 onex-apiserver，所以这里需要先设置 kubeconfig 文件，设置命令如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token builtin class-name">export</span> <span class="token assign-left variable">KUBECONFIG</span><span class="token operator">=</span><span class="token variable">${ONEX_ADMIN_KUBECONFIG}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="测试-kubectl、onex-apiserver-组件" tabindex="-1"><a class="header-anchor" href="#测试-kubectl、onex-apiserver-组件"><span>测试 kubectl、onex-apiserver 组件</span></a></h3>
<p>这里将 <code v-pre>kubectl</code> 和 onex-apiserver 的测试放在一起，是因为要通过 <code v-pre>kubectl</code> 命令行工具访问 onex-apiserver。测试命令如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ kubectl api-resources <span class="token operator">|</span> <span class="token function">grep</span> apps.onex.io
chains       ch           apps.onex.io/v1beta1     <span class="token boolean">true</span>         Chain
miners       mi           apps.onex.io/v1beta1     <span class="token boolean">true</span>         Miner
minersets    ms           apps.onex.io/v1beta1     <span class="token boolean">true</span>         MinerSet
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果，能够成功从 onex-apiserver 中获取到 <code v-pre>apps.onex.io/v1beta1</code> <code v-pre>APIVERSION</code>，说明 onex-apiserver 成功启动。</p>
<h3 id="测试-onex-minerset-controller-组件" tabindex="-1"><a class="header-anchor" href="#测试-onex-minerset-controller-组件"><span>测试 onex-minerset-controller 组件</span></a></h3>
<p>onex-minerset-controller 用来创建一个矿机池。onex-apiserver 中的 MinerSet 资源用来定义一个矿机池，其定义如下：</p>
<div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps.onex.io/v1beta1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> MinerSet
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> test
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> user<span class="token punctuation">-</span>admin
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">deletePolicy</span><span class="token punctuation">:</span> Random
  <span class="token key atrule">displayName</span><span class="token punctuation">:</span> testminerset
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">2</span>
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">chainName</span><span class="token punctuation">:</span> genesis
      <span class="token key atrule">minerType</span><span class="token punctuation">:</span> M1.MEDIUM2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到，MinerSet 依赖于一个 Chain。Chain 代表一个私有链。所以，我们需要先创建一个私有链 Chain，创建命令如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ kubectl create <span class="token parameter variable">-f</span> <span class="token variable">${ONEX_ROOT}</span>/manifests/sample/onex/chain.yaml
$ kubectl <span class="token parameter variable">-n</span> user-admin get chain
NAME      AGE
genesis   18s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以成功 Get 到 chain 资源，说明 Chain 被成功创建。</p>
<p>接着，使用以下命令创建一个 MinerSet：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ kubectl create <span class="token parameter variable">-f</span> <span class="token variable">${ONEX_ROOT}</span>/manifests/sample/onex/minerset.yaml
$ kubectl <span class="token parameter variable">-n</span> user-admin get minerset
NAME   READY   CURRENT   AVAILABLE   AGE
<span class="token builtin class-name">test</span>   <span class="token number">2</span>/2     <span class="token number">2</span>         <span class="token number">2</span>           16s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以成功 Get 到 minerset 资源，说明 MinerSet 被成功创建。</p>
<p>onex-minerset-controller 在 Watch 到新的 MinerSet 资源被创建后，会根据 MinerSet 的资源定义，创建 Miner 资源。<code v-pre>${ONEX_ROOT}/manifests/sample/onex/minerset.yaml</code> 文件定义了一个 MinerSet 资源，定义如下：</p>
<div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps.onex.io/v1beta1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> MinerSet
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> test
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> user<span class="token punctuation">-</span>admin
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">deletePolicy</span><span class="token punctuation">:</span> Random
  <span class="token key atrule">displayName</span><span class="token punctuation">:</span> testminerset
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">2</span>
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">chainName</span><span class="token punctuation">:</span> genesis
      <span class="token key atrule">minerType</span><span class="token punctuation">:</span> M1.MEDIUM2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>根据 MinerSet 的资源声明，我们需要创建 <code v-pre>2</code> 个 Miner 资源（<code v-pre>spec.replicas: 2</code>），并且 <code v-pre>2</code> 个 Miner 的配置模版为：</p>
<div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre v-pre class="language-yaml"><code>  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">chainName</span><span class="token punctuation">:</span> genesis
      <span class="token key atrule">minerType</span><span class="token punctuation">:</span> M1.MEDIUM2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以使用以下命令来查看 Miner 资源是否被成功创建：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ kubectl <span class="token parameter variable">-n</span> user-admin get miner <span class="token operator">|</span> <span class="token function">grep</span> <span class="token builtin class-name">test</span>
test-69v8k   Running   6m6s
test-9hzfw   Running   6m6s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到 <code v-pre>2</code> 个 Miner 资源被成功创建。这里需要注意，onex-apiserver 会根据 MinerSet 资源的名字自动生成 Miner 资源的名字，如果 MinerSet 资源名字是 <code v-pre>test</code>，那么由其创建的 Miner 资源名字为格式为 <code v-pre>test-xxxxx</code>。</p>
<p>另外，我们还可以使用 <code v-pre>kubectl scale</code> 命令来扩缩容矿机池。扩缩容命令如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ kubectl scale <span class="token parameter variable">--replicas</span><span class="token operator">=</span><span class="token number">3</span> minerset <span class="token builtin class-name">test</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="测试-onex-miner-controller-组件" tabindex="-1"><a class="header-anchor" href="#测试-onex-miner-controller-组件"><span>测试 onex-miner-controller 组件</span></a></h3>
<p>onex-miner-controller 会监控 Miner 资源类型，当发现有新的 Miner 资源被创建后，会真正的创建出一个矿机（其实就是一个 K8S Pod）。为了简化你部署的复杂度，onex-miner-controller 支持 Dry Run 模式，在 Dry Run 模式下，不会去请求 Kubernetes 接口创建一个真正的 Pod，而是会直接设置 Miner 状态为 <code v-pre>Running</code>，也就是说 Dry Run 模式可以解除onex-miner-controller对 Kubernetes 集群的依赖。</p>
<p><code v-pre>${ONEX_CONFIG_DIR}/onex-miner-controller.yaml</code> 配置文件中的 <code v-pre>dryRun</code> 配置项用来打开/关闭 onex-miner-controller 的 Dry Run 模式：<code v-pre>true</code> 打开，<code v-pre>false</code> 关闭。</p>
<h3 id="测试-onex-controller-manager-组件" tabindex="-1"><a class="header-anchor" href="#测试-onex-controller-manager-组件"><span>测试 onex-controller-manager 组件</span></a></h3>
<p>onex-controller-manager包含了多个 controller：</p>
<ul>
<li><code v-pre>resource-clean-controller</code>：用来定期将 Chain、MinerSet、Miner 资源从 onex-apiserver 中同步到 MySQL 中，确保数据的强一致性；</li>
<li><code v-pre>chain-controller</code>：会 Watch onex-apiserver，当发现有新的 Chain资源被创建时，会创建一个私有创世链；</li>
<li><code v-pre>garbage-controller-manager</code>：GC 服务，定期删除需要 GC 的资源。</li>
</ul>
<p>接下来，我会一一测试这些 controller 的功能。</p>
<h4 id="chainsync-controller" tabindex="-1"><a class="header-anchor" href="#chainsync-controller"><span>ChainSync Controller</span></a></h4>
<p>ChainSync Controller 用来将 onex-apiserver 中的 chain 资源同步到 <code v-pre>api_chain</code> 表中。我们可以通过查询数据库，来看数据是否被同步来测试。测试命令如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ mysql -h<span class="token variable">${ONEX_MYSQL_HOST}</span> -P<span class="token variable">${ONEX_MYSQL_PORT}</span> -u<span class="token string">"<span class="token variable">${ONEX_MYSQL_ADMIN_USERNAME}</span>"</span> -p<span class="token string">"<span class="token variable">${ONEX_MYSQL_ADMIN_PASSWORD}</span>"</span>
MariaDB <span class="token punctuation">[</span><span class="token punctuation">(</span>none<span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token operator">></span> use onex<span class="token punctuation">;</span>
MariaDB <span class="token punctuation">[</span>onex<span class="token punctuation">]</span><span class="token operator">></span> <span class="token keyword">select</span> namespace,name from api_chain<span class="token punctuation">;</span>
+------------+---------+
<span class="token operator">|</span> namespace  <span class="token operator">|</span> name    <span class="token operator">|</span>
+------------+---------+
<span class="token operator">|</span> user-admin <span class="token operator">|</span> genesis <span class="token operator">|</span>
+------------+---------+
<span class="token number">1</span> row <span class="token keyword">in</span> <span class="token builtin class-name">set</span> <span class="token punctuation">(</span><span class="token number">0.001</span> sec<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>api_chain</code> 表中，有数据，说明 ChainSync Controller 成功将 onex-apiserver 中的 chain 资源同步到 <code v-pre>api_chain</code> 表中。</p>
<h4 id="minersetsync-controller" tabindex="-1"><a class="header-anchor" href="#minersetsync-controller"><span>MinerSetSync Controller</span></a></h4>
<p>MinerSetSync Controller 用来将 onex-apiserver 中的 minerset 资源同步到 <code v-pre>api_minerset</code> 表中。我们可以通过查询数据库，来看数据是否被同步来测试。测试命令如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ mysql -h<span class="token variable">${ONEX_MYSQL_HOST}</span> -P<span class="token variable">${ONEX_MYSQL_PORT}</span> -u<span class="token string">"<span class="token variable">${ONEX_MYSQL_ADMIN_USERNAME}</span>"</span> -p<span class="token string">"<span class="token variable">${ONEX_MYSQL_ADMIN_PASSWORD}</span>"</span>
MariaDB <span class="token punctuation">[</span><span class="token punctuation">(</span>none<span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token operator">></span> use onex<span class="token punctuation">;</span>
MariaDB <span class="token punctuation">[</span>onex<span class="token punctuation">]</span><span class="token operator">></span> <span class="token keyword">select</span> namespace,name from api_minerset<span class="token punctuation">;</span>
+------------+------+
<span class="token operator">|</span> namespace  <span class="token operator">|</span> name <span class="token operator">|</span>
+------------+------+
<span class="token operator">|</span> user-admin <span class="token operator">|</span> <span class="token builtin class-name">test</span> <span class="token operator">|</span>
+------------+------+
<span class="token number">1</span> row <span class="token keyword">in</span> <span class="token builtin class-name">set</span> <span class="token punctuation">(</span><span class="token number">0.001</span> sec<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>api_minerset</code> 表中，有数据，说明 MinerSetSync Controller 成功将 onex-apiserver 中的 minerset 资源同步到 <code v-pre>api_minerset</code> 表中。</p>
<h4 id="minersync-controller" tabindex="-1"><a class="header-anchor" href="#minersync-controller"><span>MinerSync Controller</span></a></h4>
<p>MinerSync Controller 用来将 onex-apiserver 中的 miner 资源同步到 <code v-pre>api_miner</code> 表中。我们可以通过查询数据库，来看数据是否被同步来测试。测试命令如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ mysql -h<span class="token variable">${ONEX_MYSQL_HOST}</span> -P<span class="token variable">${ONEX_MYSQL_PORT}</span> -u<span class="token string">"<span class="token variable">${ONEX_MYSQL_ADMIN_USERNAME}</span>"</span> -p<span class="token string">"<span class="token variable">${ONEX_MYSQL_ADMIN_PASSWORD}</span>"</span>
MariaDB <span class="token punctuation">[</span><span class="token punctuation">(</span>none<span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token operator">></span> use onex<span class="token punctuation">;</span>
MariaDB <span class="token punctuation">[</span>onex<span class="token punctuation">]</span><span class="token operator">></span> <span class="token keyword">select</span> namespace,name from api_miner<span class="token punctuation">;</span>
+------------+------------+
<span class="token operator">|</span> namespace  <span class="token operator">|</span> name       <span class="token operator">|</span>
+------------+------------+
<span class="token operator">|</span> user-admin <span class="token operator">|</span> genesis    <span class="token operator">|</span>
<span class="token operator">|</span> user-admin <span class="token operator">|</span> test-69v8k <span class="token operator">|</span>
<span class="token operator">|</span> user-admin <span class="token operator">|</span> test-9hzfw <span class="token operator">|</span>
+------------+------------+
<span class="token number">3</span> rows <span class="token keyword">in</span> <span class="token builtin class-name">set</span> <span class="token punctuation">(</span><span class="token number">0.001</span> sec<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>api_miner</code> 表中，有数据，说明 MinerSetSync Controller 成功将 onex-apiserver 中的 miner 资源同步到 <code v-pre>api_miner</code> 表中。</p>
<h4 id="chain-controller" tabindex="-1"><a class="header-anchor" href="#chain-controller"><span>Chain Controller</span></a></h4>
<p>Chain Controller 会 Watch Chain 资源，当发现有新的 Chain 资源被创建后，会根据 Chain 资源的定义创建出对应的创世区块链节点（一个名为 <code v-pre>genesis</code> 的 Miner 资源）。</p>
<p>我们可以使用 <code v-pre>kubectl</code> 命令，来查看该创世区块链节点的创建状态，命令如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ kubectl <span class="token parameter variable">-n</span> user-admin get ch
NAME      AGE
genesis   23m
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>genesis</code> 资源被成功创建，说明 Chain Controller 正常工作。</p>
<h4 id="gc-controller" tabindex="-1"><a class="header-anchor" href="#gc-controller"><span>GC Controller</span></a></h4>
<p>GC Controller 用来执行垃圾回收任务。我们可以通过删除<code v-pre>genesis</code> Chain，并观察其关联的 MinerSet、Miner 有没有被 GC 掉，来测试 GC Controller。测试命令如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ kubectl <span class="token parameter variable">-n</span> user-admin delete ch genesis <span class="token comment"># ch 是 chain 的 alias</span>
chain.apps.onex.io <span class="token string">"genesis"</span> deleted
$ kubectl <span class="token parameter variable">-n</span> user-admin get ms <span class="token comment"># ms 是 minerset 的 alias</span>
No resources found <span class="token keyword">in</span> user-admin namespace.
$ kubectl <span class="token parameter variable">-n</span> user-admin get mi <span class="token comment"># mi 是 miner 的 alias</span>
No resources found <span class="token keyword">in</span> user-admin namespace.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到，<code v-pre>genesis</code> Chain 被删除后，其关联的 MinerSet、Miner 资源都被删除了，说明 GC Controller 正常工作。</p>
<h3 id="onexctl-功能测试" tabindex="-1"><a class="header-anchor" href="#onexctl-功能测试"><span>onexctl 功能测试</span></a></h3>
<p>测试命令如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ kubectl create <span class="token parameter variable">-f</span> <span class="token variable">${ONEX_ROOT}</span>/manifests/sample/onex/minerset.yaml
$ onexctl <span class="token parameter variable">--config</span> <span class="token variable">${ONEX_CONFIG_DIR}</span>/onexctl.yaml minerset list
NAME   REPLICAS   DISPLAYNAME    CREATED              
<span class="token builtin class-name">test</span>  <span class="token number">2</span>         testminerset  <span class="token number">2024</span>-01-17 03:43:38  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h2>
<p>我们可以通过测试，来体验和学习 OneX 项目提供的各类功能。这有助于我们全面了解 OneX 实战项目。本节课，分别给你展示了如何使用 Postman 和curl命令行工具，来测试 OneX 各个组件的功能。通过详细测试，OneX 中的每一个组件，来给你介绍了每一个组件的功能和使用方式。</p>
<p>OneX 项目的 Postman API 接口可以参考：<a href="https://www.postman.com/gold-crater-394532/workspace/onex/overview%E3%80%82" target="_blank" rel="noopener noreferrer">https://www.postman.com/gold-crater-394532/workspace/onex/overview。<ExternalLinkIcon/></a></p>
<p>OneX 项目的 RESTful API 接口请访问：<a href="https://konglingfei.com:65534/docs" target="_blank" rel="noopener noreferrer">OneX API 接口<ExternalLinkIcon/></a>。</p>
<h2 id="课后练习" tabindex="-1"><a class="header-anchor" href="#课后练习"><span>课后练习</span></a></h2>
<ol>
<li>请分别设计并测试 onex-fakeserver、onex-cacheserver是否被成功安装；</li>
<li>请参考用户创建 RESTful API 接口：<code v-pre>POST /v1/users</code>，使用 <code v-pre>grpcurl</code> 工具来测试下创建用户的 API 接口 CreateUser。</li>
<li>思考下，为什么需要将 onex-apiserver 中的 Chain、Miner、MinerSet 资源同步到 MySQL 中？</li>
</ol>
</div></template>


