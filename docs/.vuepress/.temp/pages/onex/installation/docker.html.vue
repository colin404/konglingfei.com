<template><div><p>为了尽可能多涵盖 Go 项目开发中常用的技术，OneX 项目具有一定的复杂度，这也会带来一定的部署难度。为了降低入手难度，同时让大家学习到软件部署的方法和技术，OneX 项目提供了多种不同的软件部署方式，以满足不同的部署需求。</p>
<p>本节课，我会介绍这些部署方式，并在接下来的几节课中，给你详细介绍具体如何部署 OneX 项目。也希望，你不仅能把 OneX 项目部署成功，而且能从中学习到很多 Linux 下部署软件的方法和技术。</p>
<h2 id="高效学习方法之一-带着问题去学习" tabindex="-1"><a class="header-anchor" href="#高效学习方法之一-带着问题去学习"><span>高效学习方法之一：带着问题去学习</span></a></h2>
<p>在开始部署之前，我想先分享一个高效的学习方法：问题驱动型学习方式。</p>
<p>在部署 OneX 项目的过程中，因为部署环境、网络环境、开发水平等差异，会导致在部署过程中，可能会遇到各种各样的问题。这些问题，可能会给你带来一些学习难度，甚至想放弃的念头。那么如何对待这些问题呢？请看一下我的想法。</p>
<p>首先，部署过程中遇到问题是非常正常的一件事，毕竟操作系统环境、网络环境、组件版本都可能存在不同。所以，当遇到问题时，需要你放平心态、以一颗积极的心态去看待这些问题。</p>
<p>其次，部署过程中遇到的问题，其实是非常好的学习入手点。我们可以带着这些问题，在互联网上调研问题可能出现的原因、解决方法，并最终解决这些问题。这个过程就是带着问题去学习，会极大的提高你的学习效率，扩展你的知识面，并且你对知识的理解程度、记忆深度都比正常的阅读型学习要深刻的多。如果，你在部署的过程中，发现项目脚本、代码出现问题，导致部署失败，你也可以积极提交 PR，修复这个Bug。未来找工作时，如果你觉得简历内容太少，想丰富一下，你也许可以加上一句：热爱开源，参与过开源项目的代码贡献等。</p>
<p>所以，如果部署过程中遇到问题，建议先尝试在互联网上查找问题可能出现的原因，并尝试解决问题。最简单的方法，就是将错误信息粘贴到 Google / Baidu 上，寻找具有相同错误的帖子/文章，看下这些帖子/文章中有没有相匹配的解决方法。在查找/解决问题的过程中，我们会学习到很多新的知识，这些知识是对我们解决问题的奖励。</p>
<p>当然，如果你花费了不少时间，仍然没有解决问题，也没必要继续耗费很多时间在这个问题上，这时候你可以在星球上直接向老师提问，寻求老师的帮助，尽快帮你解决学习过程中遇到的卡点。</p>
<p>这里我也准备了一份 <a href="/onex/devel/troubleshooting">OneX 排障指南</a> 供你参考。</p>
<h2 id="onex-项目部署方式介绍" tabindex="-1"><a class="header-anchor" href="#onex-项目部署方式介绍"><span>OneX 项目部署方式介绍</span></a></h2>
<p>OneX 项目提供了 6 种部署方式，这些部署方式分别适用于不同的场景，并带来不同的收益。不同的部署方式，也会从不同的维度，去丰富你的运维知识、组件部署技能。这些部署方式如下图所示：</p>
<figure><img src="/images/OneX项目部署方式-水印.png" alt="OneX项目部署方式" tabindex="0" loading="lazy"><figcaption>OneX项目部署方式</figcaption></figure>
<p>Go 项目开发高阶实战课中，会提供 3 种部署 OneX 项目的方式：</p>
<ul>
<li><strong>Docker 快速安装：</strong> 最简单、最便捷的部署方式，可以让你快速部署好 OneX 项目，验证并体验 OneX 项目的功能等；</li>
<li><strong>一步步脚本自动部署：</strong> OneX 项目是一个开源项目，你能看到的一切均是开源的，你可以通过阅读自动化部署脚本，了解 OneX 项目部署流程中每一个步骤的具体实现方式。你还可以通过阅读 Shell 脚本，学习 Shell 脚本编程知识。OneX 项目的 Shell 脚本可以作为你的 Shell 编程实战项目，通过魔改部署脚本，锻炼你的 Shell 编程能力；</li>
<li><strong>一步步手动部署：</strong> 手动安装的步骤基本上跟脚本自动安装一样。在手动安装教程中，我会带着你，一步一步部署完整个 OneX 项目。在动手部署实操的过程中，我会解读部署指令，并介绍其中的知识和注意点等。</li>
</ul>
<p>在 Kubernetes 开发实战课中，我会再介绍另外 3 种容器化部署方式。其中，Helm 部署，是生产环境中推荐的部署方式。</p>
<div class="hint-container important">
<p class="hint-container-title">重要</p>
<p>最好基于一个新的 Linux 环境来安装，一方面可以保持操作系统环境的一致性，可以极大减少安装失败的概率。另一方面，执行命令时更加安全。</p>
<p>如果，你在一个已有的 Linux 环境中安装，并且环境中，已经安装有 etcd、jaeger、kafka、mariadb、mongo、redis 组件，请慎用 uninstall类操作，因为这些操作可能会清空已有的数据。</p>
</div>
<p>Docker 环境安装和配置（On Debian）</p>
<p>要使用容器部署 OneX 项目，我们需要安装并配置一个 Docker 环境，安装配置步骤如下：</p>
<ol>
<li>卸载旧版本；</li>
<li>添加 Docker 官方 GPG 密钥；</li>
<li>将仓库添加到 Apt 源中；</li>
<li>安装 Docker；</li>
</ol>
<p>Docker 安装官方文档：<a href="https://docs.docker.com/engine/install/debian/" target="_blank" rel="noopener noreferrer">Install Docker Engine on Debian<ExternalLinkIcon/></a></p>
<h3 id="_1-卸载旧版本" tabindex="-1"><a class="header-anchor" href="#_1-卸载旧版本"><span>1. 卸载旧版本</span></a></h3>
<p>为了减少安装 Docker 时的脏数据干扰，这里先幂等卸载旧版本：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token keyword">for</span> <span class="token for-or-select variable">pkg</span> <span class="token keyword">in</span> docker.io docker-doc <span class="token function">docker-compose</span> podman-docker containerd runc<span class="token punctuation">;</span> <span class="token keyword">do</span> <span class="token function">sudo</span> <span class="token function">apt-get</span> remove <span class="token variable">$pkg</span><span class="token punctuation">;</span> <span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_2-添加-docker-官方-gpg-密钥" tabindex="-1"><a class="header-anchor" href="#_2-添加-docker-官方-gpg-密钥"><span>2. 添加 Docker 官方 GPG 密钥</span></a></h3>
<p>操作命令如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">sudo</span> <span class="token function">apt-get</span> update
$ <span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> ca-certificates <span class="token function">curl</span> gnupg
<span class="token comment"># 创建一个名为 /etc/apt/keyrings 的新目录，并将其权限设置为 0755</span>
$ <span class="token function">sudo</span> <span class="token function">install</span> <span class="token parameter variable">-m</span> 0755 <span class="token parameter variable">-d</span> /etc/apt/keyrings
$ <span class="token function">curl</span> <span class="token parameter variable">-fsSL</span> https://download.docker.com/linux/debian/gpg <span class="token operator">|</span> <span class="token function">sudo</span> gpg <span class="token parameter variable">--dearmor</span> <span class="token parameter variable">-o</span> /etc/apt/keyrings/docker.gpg
$ <span class="token function">sudo</span> <span class="token function">chmod</span> a+r /etc/apt/keyrings/docker.gpg
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因为国内访问国外网络不稳定，上述操作可能会超时，可以多试几次。</p>
<h3 id="_3-将仓库添加到-apt-源中" tabindex="-1"><a class="header-anchor" href="#_3-将仓库添加到-apt-源中"><span>3. 将仓库添加到 APT 源中</span></a></h3>
<p>操作命令如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token builtin class-name">echo</span> <span class="token punctuation">\</span>
  <span class="token string">"deb [arch=<span class="token variable"><span class="token variable">$(</span>dpkg --print-architecture<span class="token variable">)</span></span> signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian \
  <span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">.</span> /etc/os-release <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">echo</span> <span class="token string">"<span class="token variable">$VERSION_CODENAME</span>"</span><span class="token variable">)</span></span> stable"</span> <span class="token operator">|</span> <span class="token punctuation">\</span>
  <span class="token function">sudo</span> <span class="token function">tee</span> /etc/apt/sources.list.d/docker.list <span class="token operator">></span> /dev/null
$ <span class="token function">sudo</span> <span class="token function">apt-get</span> update <span class="token comment"># 别忘了执行这一步。可以确保系统能够识别并安装来自 Docker 软件源的软件包</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述指令会将 Docker 的软件源添加到Debian系统的软件源列表中，并进行更新。</p>
<h3 id="_4-安装-docker" tabindex="-1"><a class="header-anchor" href="#_4-安装-docker"><span>4. 安装 Docker</span></a></h3>
<p>安装命令如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> <span class="token parameter variable">-y</span> docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上述命令，安装了多个 Docker 软件包，这些软件包作用如下：</p>
<ul>
<li><code v-pre>docker-ce</code>：Docker 社区版，即 Docker 的核心程序；</li>
<li><code v-pre>docker-ce-cli</code>：Docker 的命令行工具；</li>
<li><code v-pre>containerd.io</code>：Docker 的容器运行时；</li>
<li><code v-pre>docker-buildx-plugin</code>：Docker 多平台构建插件；</li>
<li><code v-pre>docker-compose-plugin</code>：Docker 的容器编排工具。</li>
</ul>
<p>安装成功之后，默认 docker 已经处在运行中状态，可以执行<code v-pre>systemctl status docker</code>命令查看 Docker 运行状态：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ systemctl status <span class="token function">docker</span>
● docker.service - Docker Application Container Engine
     Loaded: loaded <span class="token punctuation">(</span>/lib/systemd/system/docker.service<span class="token punctuation">;</span> enabled<span class="token punctuation">;</span> preset: enabled<span class="token punctuation">)</span>
     Active: active <span class="token punctuation">(</span>running<span class="token punctuation">)</span> since Tue <span class="token number">2024</span>-01-16 <span class="token number">17</span>:27:43 CST<span class="token punctuation">;</span> 1min 56s ago
TriggeredBy: ● docker.socket
       Docs: https://docs.docker.com
   Main PID: <span class="token number">2993878</span> <span class="token punctuation">(</span>dockerd<span class="token punctuation">)</span>
      Tasks: <span class="token number">10</span>
     Memory: <span class="token number">38</span>.3M
        CPU: 316ms
     CGroup: /system.slice/docker.service
             └─2993878 /usr/bin/dockerd <span class="token parameter variable">-H</span> fd:// <span class="token parameter variable">--containerd</span><span class="token operator">=</span>/run/containerd/containerd.sock
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>docker 的配置文件是 <code v-pre>/etc/docker/daemon.json</code>，该文件位于 Docker 配置目录下，通常是 <code v-pre>/etc/docker/</code>目录。如果该文件不存在，可以手动创建一个或者你可以直接使用以下配置，覆盖已有的配置：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">sudo</span> <span class="token function">tee</span> /etc/docker/daemon.json <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
{
    "exec-opts": ["native.cgroupdriver=systemd"],
    "insecure-registries": [],
    "live-restore": true,
    "bip": "172.16.0.1/24",
    "storage-driver": "overlay2",
    "registry-mirrors": ["https://registry.docker-cn.com"],
    "data-root": "/data/lib/docker",
    "log-driver": "json-file",
    "dns": [],
    "default-runtime": "runc",
    "log-opts": {
      "max-size": "100m",
      "max-file": "10"
  }
}
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置参数说明如下：</p>
<ul>
<li><code v-pre>exec-opts</code>：用于配置 Docker 执行时的选项。<code v-pre>native.cgroupdriver=systemd</code> 指定使用系统的 systemd cgroup 驱动程序。Cgroup 控制组（Control Groups）是一种内核功能，可以限制一组进程的系统资源。</li>
<li><code v-pre>insecure-registries</code>：用于配置不安全的镜像仓库地址。本例中该值为空数组，说明未指定任何不安全的镜像仓库地址。</li>
<li><code v-pre>live-restore</code>：是否恢复容器状态以支持服务的不间断更新，在这个例子中，该值为 <code v-pre>true</code> 表示启用容器状态恢复。</li>
<li><code v-pre>bip</code>：配置 Docker 容器网络地址的 IP 范围。本例中该值为 <code v-pre>172.16.0.1/24</code> 表示使用 <code v-pre>172.16.0.0/24</code> 子网进行 Docker 容器通信。</li>
<li><code v-pre>storage-driver</code>：用于指定使用的存储驱动。本例中该值为 <code v-pre>overlay2</code> 指定使用 OverlayFS2 存储驱动。</li>
<li><code v-pre>registry-mirrors</code>：用于配置 Docker 镜像加速器地址。本例中该值为 <code v-pre>[&quot;https://registry.docker-cn.com&quot;]</code>，表示使用 <code v-pre>https://registry.docker-cn.com</code> 作为 Docker 镜像加速器地址。</li>
<li><code v-pre>data-root</code>：配置 Docker 的数据存放路径。本例中该值为 <code v-pre>/data/lib/docker</code>。如果你的 <code v-pre>/</code> 目录存储空间满足不了需求，需要设置 <code v-pre>data-root</code> 为更大的目录。这里建议，一开始就设置为一个存储空间大的目录。</li>
<li><code v-pre>dns</code>：配置选项用于设置容器的 DNS 服务器。</li>
<li><code v-pre>default-runtime</code>：配置选项用于设置默认的运行时。</li>
<li><code v-pre>log-driver</code>：配置 Docker 日志驱动程序。本例中该值为 <code v-pre>json-file</code>，表示使用 json 格式记录 Docker 日志。</li>
<li><code v-pre>log-opts</code>：配置 Docker 日志选项。该字段是一个 JSON 对象，包括 ：
<ul>
<li><code v-pre>max-size</code>：用于限制 Docker 日志文件的最大大小。本例中该值为 <code v-pre>100m</code>，表示 Docker 日志文件的大小不能大于 <code v-pre>100M</code>。可以使用 <code v-pre>b</code>、<code v-pre>k</code>、<code v-pre>m</code>、<code v-pre>g</code> 后缀来指定单位（字节、千字节、兆字节、吉字节）。</li>
<li><code v-pre>max-file</code>：用于限制 Docker 日志文件的数量。在本例中，该值为 <code v-pre>10</code>，表示 Docker 只会保留最后 <code v-pre>10</code> 个日志文件。</li>
</ul>
</li>
</ul>
<p>配置完成后，记得重启 docker：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">sudo</span> systemctl restart <span class="token function">docker</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="测试-docker-是否安装成功。" tabindex="-1"><a class="header-anchor" href="#测试-docker-是否安装成功。"><span>测试 docker 是否安装成功。</span></a></h4>
<p>这里，我们可以运行一个 hello world 容器，来查看 Docker 是否成功安装，启动命令如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">sudo</span> <span class="token function">docker</span> run hello-world
Unable to <span class="token function">find</span> image <span class="token string">'hello-world:latest'</span> locally
latest: Pulling from library/hello-world
b8dfde127a29: Pull complete
Digest: sha256:0fe98d7debd9049c50b597ef1f85b7c1e8cc81f59c8d623fcb2250e8bec85b38
Status: Downloaded newer image <span class="token keyword">for</span> hello-world:latest
<span class="token punctuation">..</span>.
Hello from Docker<span class="token operator">!</span>
This message shows that your installation appears to be working correctly.
<span class="token punctuation">..</span><span class="token punctuation">..</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>docker run hello-world</code> 命令会下载 hello-world 镜像，并启动容器，打印安装成功提示信息后退出。</p>
<h4 id="docker-安装后配置" tabindex="-1"><a class="header-anchor" href="#docker-安装后配置"><span>Docker 安装后配置</span></a></h4>
<p>安装成功后，我们还需要做一些其他配置。主要有两个，一个是配置 docker，使其可通过 non-root 用户使用；另一个是配置 docker 开机启动。</p>
<ol>
<li>使用 non-root 用户操作 docker。</li>
</ol>
<p>我们在 Linux 系统上操作，为了安全，需要以普通用户的身份登录系统并执行操作。所以，我们需要配置 docker，使它可以被 non-root 用户使用。具体配置方法如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">sudo</span> <span class="token parameter variable">-i</span> <span class="token function">groupadd</span> <span class="token function">docker</span> <span class="token comment"># 创建 `docker` 用户组</span>
$ <span class="token function">sudo</span> <span class="token parameter variable">-i</span> <span class="token function">usermod</span> <span class="token parameter variable">-aG</span> <span class="token function">docker</span> <span class="token environment constant">$USER</span> <span class="token comment"># 将当前用户添加到 `docker` 用户组下</span>
$ newgrp <span class="token function">docker</span> <span class="token comment"># 重新加载组成员身份</span>
$ <span class="token function">docker</span> run hello-world <span class="token comment"># 确认能够以普通用户使用 docker</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果在执行 <code v-pre>sudo groupadd docker</code> 时报 <code v-pre>groupadd: group 'docker' already exists</code> 错误，说明 docker 组已经存在了，可以忽略这个报错。</p>
<p>如果你在将用户添加到 docker 组之前，使用 <code v-pre>sudo</code> 运行过 docker 命令，你可能会看到以下错误：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>WARNING: Error loading config file: /home/user/.docker/config.json -
<span class="token function">stat</span> /home/user/.docker/config.json: permission denied
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这个错误，我们可以通过删除 <code v-pre>~/.docker/</code> 目录来解决，或者通过以下命令更改 <code v-pre>~/.docker/</code> 目录的所有者和权限：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">sudo</span> <span class="token function">chown</span> <span class="token string">"<span class="token environment constant">$USER</span>"</span><span class="token builtin class-name">:</span><span class="token string">"<span class="token environment constant">$USER</span>"</span> /home/<span class="token string">"<span class="token environment constant">$USER</span>"</span>/.docker <span class="token parameter variable">-R</span>
$ <span class="token function">sudo</span> <span class="token function">chmod</span> g+rwx <span class="token string">"<span class="token environment constant">$HOME</span>/.docker"</span> <span class="token parameter variable">-R</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2">
<li>配置 docker 开机启动。</li>
</ol>
<p>我们如果重启 Linux 机器，肯定不想再重启一次 Docker，我们希望 Docker 能够一直处在运行中状态。所以，我们还需要将 Docker 配置为开启启动，配置命令如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">sudo</span> systemctl <span class="token builtin class-name">enable</span> docker.service <span class="token comment"># 设置 docker 开机启动</span>
$ <span class="token function">sudo</span> systemctl <span class="token builtin class-name">enable</span> containerd.service <span class="token comment"># 设置 containerd 开机启动</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-排障" tabindex="-1"><a class="header-anchor" href="#_5-排障"><span>5. 排障</span></a></h3>
<p>在安装过程中，你可能会遇到一些错误，下面是一些常见问题的修复方法。</p>
<h4 id="执行-systemctl-restart-docker-报错" tabindex="-1"><a class="header-anchor" href="#执行-systemctl-restart-docker-报错"><span>执行 systemctl restart docker 报错</span></a></h4>
<p>如果执行 <code v-pre>systemctl restart docker</code> 报以下错误：</p>
<div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre v-pre class="language-text"><code>Jul 14 19:59:05 n37-083-200 dockerd[3113175]: time="2023-07-14T19:59:05.068736291+08:00" level=info msg="Starting up"
Jul 14 19:59:05 n37-083-200 dockerd[3113175]: time="2023-07-14T19:59:05.084662580+08:00" level=info msg="[graphdriver] trying configured driver: overlay2"
Jul 14 19:59:05 n37-083-200 dockerd[3113175]: time="2023-07-14T19:59:05.289191881+08:00" level=info msg="Loading containers: start."
Jul 14 19:59:05 n37-083-200 dockerd[3113175]: time="2023-07-14T19:59:05.481750463+08:00" level=error msg="Resolver Start failed for container ad2c52cd91071f0a5b8391d4593995820062eae33aabf371770a5ed12e3f0d3e, \"setting up IP table rules failed:  (iptables failed: iptables --wait -t nat -N DOCKER_OUTPUT: iptables v1.8.2 (nf_tables): Chain already exists\\n (exit status 1))\""
Jul 14 19:59:05 n37-083-200 dockerd[3113175]: time="2023-07-14T19:59:05.485829617+08:00" level=error msg="Resolver Start failed for container bf6e1c5625ced7b95216f2169d3eeaff0b4f4d0b6a4e61ae9ed9e4b5e03f4e3c, \"setting up IP table rules failed:  (iptables failed: iptables --wait -t nat -N DOCKER_OUTPUT: iptables v1.8.2 (nf_tables): Chain already exists\\n (exit status 1))\""
Jul 14 19:59:05 n37-083-200 dockerd[3113175]: time="2023-07-14T19:59:05.486454874+08:00" level=info msg="there are running containers, updated network configuration will not take affect"
Jul 14 19:59:05 n37-083-200 dockerd[3113175]: panic: runtime error: invalid memory address or nil pointer dereference
Jul 14 19:59:05 n37-083-200 dockerd[3113175]: [signal SIGSEGV: segmentation violation code=0x1 addr=0x30 pc=0x55f5f3462000]
Jul 14 19:59:05 n37-083-200 dockerd[3113175]: goroutine 286 [running]:
Jul 14 19:59:05 n37-083-200 dockerd[3113175]: github.com/docker/docker/daemon.(*Daemon).prepareMountPoints(0xc000986410?, 0xc000ac2000)
Jul 14 19:59:05 n37-083-200 dockerd[3113175]:         /go/src/github.com/docker/docker/daemon/mounts.go:24 +0x1c0
Jul 14 19:59:05 n37-083-200 dockerd[3113175]: github.com/docker/docker/daemon.(*Daemon).restore.func7(0xc000ac2000)
Jul 14 19:59:05 n37-083-200 dockerd[3113175]:         /go/src/github.com/docker/docker/daemon/daemon.go:602 +0x79
Jul 14 19:59:05 n37-083-200 dockerd[3113175]: created by github.com/docker/docker/daemon.(*Daemon).restore
Jul 14 19:59:05 n37-083-200 dockerd[3113175]:         /go/src/github.com/docker/docker/daemon/daemon.go:599 +0xd7b
Jul 14 19:59:05 n37-083-200 systemd[1]: docker.service: Main process exited, code=exited, status=2/INVALIDARGUMENT
Jul 14 19:59:05 n37-083-200 systemd[1]: docker.service: Failed with result 'exit-code'.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以通过以下方式来解决：</p>
<ol>
<li>通过 <code v-pre>kill -9 xxx</code> 杀死所有的 containerd 进程。</li>
<li>重启 containerd 服务：<code v-pre>systemctl restart containerd</code></li>
<li>重启 docker 服务：<code v-pre>systemctl restart docker</code></li>
</ol>
<h2 id="onex-项目容器化部署" tabindex="-1"><a class="header-anchor" href="#onex-项目容器化部署"><span>OneX  项目容器化部署</span></a></h2>
<p>上面我们部署好了 Go 开发环境和 Docker 环境，接下来，就可以使用 docker 一键部署整个 OneX 项目。</p>
<h3 id="_1-下载-onex-源码" tabindex="-1"><a class="header-anchor" href="#_1-下载-onex-源码"><span>1. 下载 OneX 源码</span></a></h3>
<p>OneX 项目源码托管在 GitHub 上，国内网络访问 GitHub 网速会比较慢，经常会出现超时，你可以配置 <a href="http://github.com" target="_blank" rel="noopener noreferrer">github.com<ExternalLinkIcon/></a> host 来解决：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">sudo</span> <span class="token function">tee</span> <span class="token parameter variable">-a</span> /etc/hosts <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
140.82.114.4 github.com
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>代理 IP <code v-pre>140.82.114.4</code> 可能会失效，你可以网上找其他可用的代理 IP 配置上。</p>
<p>想要安装 OneX 系统，首先需要先下载 OneX 源码。本课程使用的 <strong>OneX 源码分支为 v0.1.0</strong>。OneX 源码下载命令如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> <span class="token variable">$WORKSPACE</span>/golang/src/github.com/superproj
$ <span class="token builtin class-name">cd</span> <span class="token variable">$WORKSPACE</span>/golang/src/github.com/superproj
$ <span class="token function">git</span> clone https://github.com/superproj/onex
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-初始化工作区" tabindex="-1"><a class="header-anchor" href="#_2-初始化工作区"><span>2. 初始化工作区</span></a></h3>
<p>本课程使用的 Go 版本为 <code v-pre>go1.21.5</code>，<code v-pre>go1.21.5</code> 支持多模块工作区，所以这里也需要初始化工作区。初始化命令如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token builtin class-name">cd</span> <span class="token variable">$WORKSPACE</span>/golang/src/github.com/superproj
$ go work init
$ go <span class="token function">env</span> GOWORK <span class="token comment"># 执行此命令，查看 go.work 工作区文件路径</span>
/home/going/workspace/golang/src/github.com/superproj/go.work
$ go work use ./onex/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-一键部署-onex-服务" tabindex="-1"><a class="header-anchor" href="#_3-一键部署-onex-服务"><span>3. 一键部署 OneX 服务</span></a></h3>
<p>安装部署 onex 服务分为以下几步。</p>
<ol>
<li>安装配置文件、启动二进制文件。安装命令如下：</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token builtin class-name">cd</span> <span class="token variable">$WORKSPACE</span>/golang/src/github.com/superproj/onex
$ <span class="token function">make</span> docker-install <span class="token comment"># 会下载 ccr.ccs.tencentyun.com/superproj/onex-allinone-amd64:v0.1.0 镜像，并启动</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上述命令会按顺序依次执行以下安装操作：</p>
<ol>
<li>安装不要的软件包，并配置 <code v-pre>/etc/hosts</code>（具体可以查看 <code v-pre>/etc/hosts</code> 新增内容）；</li>
<li>依次安装存储组件：mariadb、redis、mongo、etcd；</li>
<li>依次安装其他中间件：jaeger、kafka；</li>
<li>安装 OneX 前准备工作：</li>
<li>配置 <code v-pre>$HOME/.bashrc</code>；</li>
<li>初始化 MariaDB 数据库，创建 onex 数据库；</li>
<li>初始化 MongoDB，创建 onex 用户；</li>
<li>下载 <code v-pre>ccr.ccs.tencentyun.com/superproj/onex-allinone-amd64:v0.1.0</code> 镜像，并创建onex容器。在onex容器中，会依次启动以下 OneX 服务：onex-usercenter、onex-apiserver、onex-gateway、onex-nightwatch、onex-pump、onex-toyblc、onex-controller-manager、onex-minerset-controller、onex-miner-controller、onex-fakeserver、onex-cacheserver；</li>
</ol>
<p>上述服务是按照彼此间的依赖顺序启动的，服务依赖关系如下：</p>
<figure><img src="/images/OneX组件依赖关系-水印.png" alt="OneX组件依赖关系" tabindex="0" loading="lazy"><figcaption>OneX组件依赖关系</figcaption></figure>
<ol start="6">
<li>全面测试 OneX 中各个组件的功能。</li>
</ol>
<p>如果命令的最后，输出以下文本，说明 OneX 系统被成功部署：</p>
<div class="hint-container tip">
<p class="hint-container-title">提示</p>
<p>如果你想基于当前源码，构建 docker 镜像并安装，可以执行以下命令来安装：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token assign-left variable">INSTALL_WITH_FRESH_IMAGE</span><span class="token operator">=</span><span class="token number">1</span> <span class="token function">make</span> docker-install
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div>
<p>如果，因为网络超时等原因，导致安装失败，可以先执行以下命令，卸载再安装：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">make</span> docker-uninstall <span class="token comment"># 先 uninstall，防止配置、组件等影响下一次安装</span>
$ <span class="token function">make</span> docker-install
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-测试项目是否部署成功" tabindex="-1"><a class="header-anchor" href="#_4-测试项目是否部署成功"><span>4. 测试项目是否部署成功</span></a></h3>
<p><code v-pre>make docker-install</code> 命令最后会调用 <code v-pre>${ONEX_ROOT}/scripts/installation/test.sh onex::test::test</code> 命令来测试 OneX 系统功能是否正常。</p>
<p>你可以手动执行以下命令来测试：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token builtin class-name">cd</span> <span class="token variable">${ONEX_ROOT}</span>
$ <span class="token builtin class-name">source</span> manifests/env.local
$ ./scripts/installation/test.sh onex::test::test
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果 <code v-pre>./scripts/installation/test.sh onex::test::test</code> 命令输出的最后出现 <code v-pre>all test passed!</code> 字符串，说明 OneX 项目成功部署并测试通过，如下图所示：</p>
<figure><img src="/images/部署成功截图.png" alt="部署成功截图" tabindex="0" loading="lazy"><figcaption>部署成功截图</figcaption></figure>
<h3 id="_5-启动-swagger-api-文档" tabindex="-1"><a class="header-anchor" href="#_5-启动-swagger-api-文档"><span>5. 启动 Swagger API 文档</span></a></h3>
<p>此外，你还可以通过 swagger 命令来启动一个在线的 Swagger API 文档，命令如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">make</span> tools.install.swagger
$ <span class="token function">make</span> serve-swagger
<span class="token number">2024</span>/01/16 <span class="token number">22</span>:42:12 serving docs at http://localhost:65534/docs
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>之后，你可以通过 <code v-pre>http://localhost:65534/docs</code> 来访问 Swagger API 文档：</p>
<figure><img src="/images/SwaggerAPI文档.png" alt="SwaggerAPI文档" tabindex="0" loading="lazy"><figcaption>SwaggerAPI文档</figcaption></figure>
<h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h2>
<p>在开始学习 OneX 项目前，你需要先部署好 OneX 系统，给自己准备好一个开发、部署环境。OneX 提供几乎所有的安装方式：Docker快速安装、脚本自动安装、手动部署等。旨在通过不同的安装方法，让你通过动手操作，学习如何在 Linux 下部署软件。</p>
<p>本节课，安装 OneX 最便捷的方法是容器化安装，命令如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">make</span> docker-install
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="课后练习" tabindex="-1"><a class="header-anchor" href="#课后练习"><span>课后练习</span></a></h2>
<ol>
<li>执行以下命令，再次安装一遍 OneX：</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">make</span> docker-uninstall
$ <span class="token function">make</span> docker-install
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2">
<li>阅读 Makefile <code v-pre>docker-install</code>、<code v-pre>docker-uninstall</code> 规则的实现，学习 OneX 的安装流程和实现。</li>
</ol>
</div></template>


