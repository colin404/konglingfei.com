<template><div><h1 id="onex-常见故障及解决办法" tabindex="-1"><a class="header-anchor" href="#onex-常见故障及解决办法"><span>OneX 常见故障及解决办法</span></a></h1>
<h2 id="q-遇到xxx-permission-denied这类的错误。" tabindex="-1"><a class="header-anchor" href="#q-遇到xxx-permission-denied这类的错误。"><span>Q：遇到xxx: permission denied这类的错误。</span></a></h2>
<p>出现这种错误，是因为你没有权限执行当前的操作。解决方法是排查自己是否有权限执行当前操作。如果没有权限，需要你切换到有权限的用户，或者放弃执行当前操作。</p>
<p>为了说明问题，这里我举一个错误例子，并给出排查思路。例子的错误日志如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>going@VM-8-9-centos /<span class="token punctuation">]</span>$ go get <span class="token parameter variable">-u</span> github.com/golang/protobuf/protoc-gen-go
go: could not create module cache: <span class="token function">mkdir</span> /golang: permission denied
<span class="token punctuation">[</span>going@VM-8-9-centos /<span class="token punctuation">]</span>$ <span class="token function">sudo</span> go get <span class="token parameter variable">-u</span> github.com/golang/protobuf/protoc-gen-go
sudo: go: <span class="token builtin class-name">command</span> not found
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述错误中， 一共报了两个错误，分别是<code v-pre>mkdir /golang: permission denied</code>和<code v-pre>sudo: go: command not found</code>。我们先来看<code v-pre>mkdir /golang: permission denied</code>错误。</p>
<p>通过命令行提示符<code v-pre>$</code>可以知道，当前登陆用户是普通用户；通过报错<code v-pre>mkdir /golang: permission denied</code>可以知道<code v-pre>go get -u github.com/golang/protobuf/protoc-gen-go</code>命令底层执行了<code v-pre>mkdir /golang</code>，因为普通用户没有写 <code v-pre>/</code> 目录的权限，所以会报权限错误。解决方法是切换到用户的目录下，执行<code v-pre>go get -u</code>命令。</p>
<p>我们再来看下<code v-pre>sudo: go: command not found</code>错误。<code v-pre>sudo</code>命令会将命令执行的环境切换到<code v-pre>root</code>用户，<code v-pre>root</code>用户显然是没有安装go命令的，所以会导致<code v-pre>command not found</code>错误。解决方式是去掉 <code v-pre>sudo</code>，直接执行 <code v-pre>$ go get -u xxx</code>。</p>
<h2 id="q-报-no-such-file-or-directory、-command-not-found、permission-denied-错误。" tabindex="-1"><a class="header-anchor" href="#q-报-no-such-file-or-directory、-command-not-found、permission-denied-错误。"><span>Q：报 <code v-pre>No such file or directory</code>、 <code v-pre>command not found</code>、<code v-pre>permission denied</code> 错误。</span></a></h2>
<p>遇到这类错误，要根据提示排查和解决问题。</p>
<ul>
<li><code v-pre>No such file or directory</code>：确认文件是否存在，不存在的原因是什么。</li>
<li><code v-pre>command not found</code>：确认命令是否存在，如果不存在，可以重新安装命令。</li>
<li><code v-pre>permission denied</code>：确认是否有操作权限，如果没有，要切换到有权限的用户或者目录。</li>
</ul>
<h2 id="q-报-failed-to-parse-input-unexpected-end-of-json-input-generate-node-cert" tabindex="-1"><a class="header-anchor" href="#q-报-failed-to-parse-input-unexpected-end-of-json-input-generate-node-cert"><span>Q：报 <code v-pre>Failed to parse input: unexpected end of JSON input .*  generate-node-cert(...). *</code></span></a></h2>
<p>该问题大概率是因为在使用 <code v-pre>cfssl</code> 工具生成证书的时候报的错，版本不匹配导致的。建议大家重新安装 <code v-pre>v1.6.1</code> 版本的 <code v-pre>cfssl</code> 工具。</p>
<p>因为国内墙的原因，使用脚本可能会安装超时，可以手动安装。安装方法如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> <span class="token environment constant">$HOME</span>/bin/
$ <span class="token function">wget</span> https://github.com/cloudflare/cfssl/releases/download/v1.6.1/cfssl_1.6.1_linux_amd64 <span class="token parameter variable">-O</span> <span class="token environment constant">$HOME</span>/bin/cfssl
$ <span class="token function">wget</span> https://github.com/cloudflare/cfssl/releases/download/v1.6.1/cfssljson_1.6.1_linux_amd64 <span class="token parameter variable">-O</span> <span class="token environment constant">$HOME</span>/bin/cfssljson
$ <span class="token function">wget</span> https://github.com/cloudflare/cfssl/releases/download/v1.6.1/cfssl-certinfo_1.6.1_linux_amd64 <span class="token parameter variable">-O</span> <span class="token environment constant">$HOME</span>/bin/cfssl-certinfo
$ <span class="token function">chmod</span> +x <span class="token environment constant">$HOME</span>/bin/<span class="token punctuation">{</span>cfssl,cfssljson,cfssl-certinfo<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="q-安装-vim-ide-时报-vim-go-error-installing-golang-org-x-tools-cmd-guru-master-go-golang-org-x-tools-cmd-guru-master" tabindex="-1"><a class="header-anchor" href="#q-安装-vim-ide-时报-vim-go-error-installing-golang-org-x-tools-cmd-guru-master-go-golang-org-x-tools-cmd-guru-master"><span>Q：安装 Vim IDE 时报 <code v-pre>vim-go: Error installing golang.org/x/tools/cmd/guru@master: go: golang.org/x/tools/cmd/guru@master ....</code></span></a></h2>
<p>可以手动安装 <code v-pre>guru</code> 工具，安装命令如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>$ go <span class="token function">install</span> golang.org/x/tools/cmd/guru@latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div></template>


