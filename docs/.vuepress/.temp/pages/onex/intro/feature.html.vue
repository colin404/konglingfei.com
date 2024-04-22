<template><div><h1 id="onex-功能列表" tabindex="-1"><a class="header-anchor" href="#onex-功能列表"><span>OneX 功能列表</span></a></h1>
<p>为了方便你能够对 OneX 项目已经或者即将实现的功能有个全面的了解，这里整理了一篇文章，专门用来介绍 OneX 的功能列表。你可以快速浏览一遍，做到心中有数。</p>
<p>OneX 具备了 Go 开发中用到的绝大部分技术栈，包括以下 4 大功能模块：</p>
<ul>
<li>软件开发基础技术栈；</li>
<li>Go 开发技术栈；</li>
<li>云原生技术栈；</li>
<li>微服务技术栈。</li>
</ul>
<h2 id="onex-功能列表-1" tabindex="-1"><a class="header-anchor" href="#onex-功能列表-1"><span>OneX 功能列表</span></a></h2>
<div class="hint-container tip">
<p class="hint-container-title">提示</p>
<p>以下功能绝大部分会在 OneX 一期实现，其他功能会在二期/三期实现。</p>
</div>
<figure><img src="/images/OneX功能列表.png" alt="OneX功能列表" tabindex="0" loading="lazy"><figcaption>OneX功能列表</figcaption></figure>
<h2 id="onex-项目中使用到的工具列表" tabindex="-1"><a class="header-anchor" href="#onex-项目中使用到的工具列表"><span>OneX 项目中使用到的工具列表</span></a></h2>
<p>这里，我再将 OneX 项目中，用到的工具列举出来，通过这些工具侧面感受下 OneX 项目涉及到的内容。以下工具绝大部分在 OneX 项目中有被使用到，其他未被使用到的工具，这里也列出，以使你了解这些个工具的可能用途。</p>
</br>
<p>工具列表如下：</p>
<table>
<thead>
<tr>
<th style="text-align:center">工具</th>
<th style="text-align:left">功能</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">Kubernetes 代码生成工具</td>
<td style="text-align:left"><li>client-gen：生成用于与 Kubernetes API 服务器进行通信的客户端代码；</li><li>lister-gen：生成用于从 Kubernetes API 服务器读取对象列表的代码；</li><li>informer-gen：生成用于跟踪 Kubernetes API 服务器中对象变化的代码；</li><li>defaulter-gen：生成用于为 Kubernetes API 对象设置默认值的代码；</li><li>deepcopy-gen：生成用于创建 Kubernetes API 对象的深层副本的代码；</li><li>prerelease-lifecycle-gen：生成用于管理 Kubernetes API 对象的生命周期的代码；</li><li>conversion-gen：生成用于转换 Kubernetes API 对象的代码；</li><li>openapi-gen：生成用于验证 Kubernetes API 对象的 OpenAPI 模式的代码。</li></td>
</tr>
<tr>
<td style="text-align:center">golangci-lint</td>
<td style="text-align:left">静态代码分析工具，支持多种语法检查规则</td>
</tr>
<tr>
<td style="text-align:center">goimports</td>
<td style="text-align:left">Go 官方提供的一种工具，它能够为我们自动格式化 Go 语言代码并对所有引入的包进行管理，包括自动增删依赖的包引用、将依赖包按字母序排序并分类</td>
</tr>
<tr>
<td style="text-align:center">wire</td>
<td style="text-align:left">依赖注入框架，用于解决 Go 语言中依赖管理的问题</td>
</tr>
<tr>
<td style="text-align:center">mockgen</td>
<td style="text-align:left">Go 语言的 Mock 测试工具</td>
</tr>
<tr>
<td style="text-align:center">gsemver</td>
<td style="text-align:left">语义化版本控制工具，支持多种版本控制方式</td>
</tr>
<tr>
<td style="text-align:center">git-chglog</td>
<td style="text-align:left">根据 Git 提交记录生成 <a href="http://CHANGELOG.md" target="_blank" rel="noopener noreferrer">CHANGELOG.md<ExternalLinkIcon/></a> 文件的工具</td>
</tr>
<tr>
<td style="text-align:center">addlicense</td>
<td style="text-align:left">自动为项目添加许可证文件的工具</td>
</tr>
<tr>
<td style="text-align:center">kratos</td>
<td style="text-align:left">B 站开源的 Go 微服务框架</td>
</tr>
<tr>
<td style="text-align:center">kind</td>
<td style="text-align:left">Kubernetes in Docker 工具，用于在本地快速部署 Kubernetes 集群</td>
</tr>
<tr>
<td style="text-align:center">go-apidiff</td>
<td style="text-align:left">检查 Go 项目不同版本之间的 API 兼容性</td>
</tr>
<tr>
<td style="text-align:center">gotests</td>
<td style="text-align:left">自动生成 Go 代码的测试文件</td>
</tr>
<tr>
<td style="text-align:center">cfssl</td>
<td style="text-align:left">TLS/SSL 证书管理工具</td>
</tr>
<tr>
<td style="text-align:center">kustomize</td>
<td style="text-align:left">Kubernetes 配置管理工具，用于自定义 Kubernetes 配置文件</td>
</tr>
<tr>
<td style="text-align:center">kafkactl</td>
<td style="text-align:left">Kafka 集群管理工具</td>
</tr>
<tr>
<td style="text-align:center">kube-linter</td>
<td style="text-align:left">Kubernetes YAML 文件的静态分析工具</td>
</tr>
<tr>
<td style="text-align:center">kubeconform</td>
<td style="text-align:left">Kubernetes YAML 文件的验证工具</td>
</tr>
<tr>
<td style="text-align:center">kubectl</td>
<td style="text-align:left">Kubernetes 命令行工具</td>
</tr>
<tr>
<td style="text-align:center">helm-docs</td>
<td style="text-align:left">自动生成 Helm Chart 文档的工具</td>
</tr>
<tr>
<td style="text-align:center">db2struct</td>
<td style="text-align:left">将数据库表结构转换为 Go 语言结构体的工具</td>
</tr>
<tr>
<td style="text-align:center">gentool</td>
<td style="text-align:left">GORM Model 自动生成工具</td>
</tr>
<tr>
<td style="text-align:center">air</td>
<td style="text-align:left">Go 应用程序的实时重新加载</td>
</tr>
<tr>
<td style="text-align:center">swagger</td>
<td style="text-align:left">RESTful API 文档生成工具</td>
</tr>
<tr>
<td style="text-align:center">license</td>
<td style="text-align:left">为项目添加许可证文件的工具</td>
</tr>
<tr>
<td style="text-align:center">gothanks</td>
<td style="text-align:left">gothanks 会自动为 Go 的官方存储库和您的 go.mod github 依赖项加 GitHub Star，提供一种简单的方式来感谢您使用的模块的维护者和 Go 本身的贡献者</td>
</tr>
<tr>
<td style="text-align:center">kubebuilder</td>
<td style="text-align:left">Kubernetes controller 开发框架</td>
</tr>
<tr>
<td style="text-align:center">helm</td>
<td style="text-align:left">Kubernetes 应用程序包管理工具</td>
</tr>
<tr>
<td style="text-align:center">kafka</td>
<td style="text-align:left">高吞吐量分布式消息队列系统</td>
</tr>
<tr>
<td style="text-align:center">controller-gen</td>
<td style="text-align:left">Kubernetes 控制器开发工具</td>
</tr>
<tr>
<td style="text-align:center">go-junit-report</td>
<td style="text-align:left">将 Go 语言测试结果转换为 JUnit 格式的工具</td>
</tr>
<tr>
<td style="text-align:center">buf</td>
<td style="text-align:left">用于在 Protobuf 文件之间执行 Lint、Build、Diff、Breaking Change 检测的工具</td>
</tr>
<tr>
<td style="text-align:center">protoc-go-inject-tag</td>
<td style="text-align:left">为 Protobuf 生成的 Go 结构体添加 JSON 标签的工具</td>
</tr>
<tr>
<td style="text-align:center">gomodifytags</td>
<td style="text-align:left">修改 Go 代码结构体字段的标签的工具</td>
</tr>
<tr>
<td style="text-align:center">traefik</td>
<td style="text-align:left">反向代理和负载均衡工具</td>
</tr>
<tr>
<td style="text-align:center">gotestsum</td>
<td style="text-align:left">一个用于改进 Go 语言测试输出的工具。它可以替代标准的 go test 命令，并以更易于阅读的格式输出测试结果</td>
</tr>
<tr>
<td style="text-align:center">yq</td>
<td style="text-align:left">yq 用于在命令行中处理 YAML 文件。它可以用于查询、修改和转换 YAML 文件，提供了一种便捷的方式来处理 YAML 格式的配置文件和数据</td>
</tr>
<tr>
<td style="text-align:center">minikube</td>
<td style="text-align:left">Minikube 是一个用于在本地机器上快速搭建和运行单节点 Kubernetes 集群的工具。它可以帮助开发人员在本地环境中进行 Kubernetes 应用程序的开发、测试和调试</td>
</tr>
<tr>
<td style="text-align:center">kustomize</td>
<td style="text-align:left">Kustomize 是 Kubernetes 官方提供的一个工具，用于管理和定制 Kubernetes 部署清单（manifests）</td>
</tr>
<tr>
<td style="text-align:center">go-gitlint</td>
<td style="text-align:left">一个 Git 钩子（hook）工具，用于在 Git 提交时检查提交信息的格式和规范性</td>
</tr>
<tr>
<td style="text-align:center">mockgen</td>
<td style="text-align:left">Mockgen 是 Go 语言中的一个工具，用于自动生成接口的 Mock 实现</td>
</tr>
<tr>
<td style="text-align:center">uplift</td>
<td style="text-align:left">自动生成语义化版本号的工具</td>
</tr>
</tbody>
</table>
</div></template>


