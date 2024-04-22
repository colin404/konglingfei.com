---
title: OneX 功能列表
shortTitle: 功能列表
date: 2022-03-01
icon: liebiao
sticky: true
star: true
order: 2
isOriginal: true
category:
  - OneX
tag:
  - OneX
---

# OneX 功能列表

为了方便你能够对 OneX 项目已经或者即将实现的功能有个全面的了解，这里整理了一篇文章，专门用来介绍 OneX 的功能列表。你可以快速浏览一遍，做到心中有数。

OneX 具备了 Go 开发中用到的绝大部分技术栈，包括以下 4 大功能模块：
- 软件开发基础技术栈；
- Go 开发技术栈；
- 云原生技术栈；
- 微服务技术栈。

## OneX 功能列表

:::tip
以下功能绝大部分会在 OneX 一期实现，其他功能会在二期/三期实现。
:::

![OneX功能列表](/images/OneX功能列表.png)

## OneX 项目中使用到的工具列表

这里，我再将 OneX 项目中，用到的工具列举出来，通过这些工具侧面感受下 OneX 项目涉及到的内容。以下工具绝大部分在 OneX 项目中有被使用到，其他未被使用到的工具，这里也列出，以使你了解这些个工具的可能用途。

</br>

工具列表如下：
| 工具 | 功能 |
| :----: | :---- |
|Kubernetes 代码生成工具|<li>client-gen：生成用于与 Kubernetes API 服务器进行通信的客户端代码；</li><li>lister-gen：生成用于从 Kubernetes API 服务器读取对象列表的代码；</li><li>informer-gen：生成用于跟踪 Kubernetes API 服务器中对象变化的代码；</li><li>defaulter-gen：生成用于为 Kubernetes API 对象设置默认值的代码；</li><li>deepcopy-gen：生成用于创建 Kubernetes API 对象的深层副本的代码；</li><li>prerelease-lifecycle-gen：生成用于管理 Kubernetes API 对象的生命周期的代码；</li><li>conversion-gen：生成用于转换 Kubernetes API 对象的代码；</li><li>openapi-gen：生成用于验证 Kubernetes API 对象的 OpenAPI 模式的代码。</li>|
|golangci-lint|静态代码分析工具，支持多种语法检查规则|
|goimports|Go 官方提供的一种工具，它能够为我们自动格式化 Go 语言代码并对所有引入的包进行管理，包括自动增删依赖的包引用、将依赖包按字母序排序并分类|
|wire|依赖注入框架，用于解决 Go 语言中依赖管理的问题|
|mockgen|Go 语言的 Mock 测试工具|
|gsemver|语义化版本控制工具，支持多种版本控制方式|
|git-chglog|根据 Git 提交记录生成 CHANGELOG.md 文件的工具|
|addlicense|自动为项目添加许可证文件的工具|
|kratos|B 站开源的 Go 微服务框架|
|kind|Kubernetes in Docker 工具，用于在本地快速部署 Kubernetes 集群|
|go-apidiff|检查 Go 项目不同版本之间的 API 兼容性|
|gotests|自动生成 Go 代码的测试文件|
|cfssl|TLS/SSL 证书管理工具|
|kustomize|Kubernetes 配置管理工具，用于自定义 Kubernetes 配置文件|
|kafkactl|Kafka 集群管理工具|
|kube-linter|Kubernetes YAML 文件的静态分析工具|
|kubeconform|Kubernetes YAML 文件的验证工具|
|kubectl|Kubernetes 命令行工具|
|helm-docs|自动生成 Helm Chart 文档的工具|
|db2struct|将数据库表结构转换为 Go 语言结构体的工具|
|gentool|GORM Model 自动生成工具|
|air|Go 应用程序的实时重新加载|
|swagger|RESTful API 文档生成工具|
|license|为项目添加许可证文件的工具|
|gothanks|gothanks 会自动为 Go 的官方存储库和您的 go.mod github 依赖项加 GitHub Star，提供一种简单的方式来感谢您使用的模块的维护者和 Go 本身的贡献者|
|kubebuilder|Kubernetes controller 开发框架|
|helm|Kubernetes 应用程序包管理工具|
|kafka|高吞吐量分布式消息队列系统|
|controller-gen|Kubernetes 控制器开发工具|
|go-junit-report|将 Go 语言测试结果转换为 JUnit 格式的工具|
|buf|用于在 Protobuf 文件之间执行 Lint、Build、Diff、Breaking Change 检测的工具|
|protoc-go-inject-tag|为 Protobuf 生成的 Go 结构体添加 JSON 标签的工具|
|gomodifytags|修改 Go 代码结构体字段的标签的工具|
|traefik|反向代理和负载均衡工具|
|gotestsum|一个用于改进 Go 语言测试输出的工具。它可以替代标准的 go test 命令，并以更易于阅读的格式输出测试结果|
|yq|yq 用于在命令行中处理 YAML 文件。它可以用于查询、修改和转换 YAML 文件，提供了一种便捷的方式来处理 YAML 格式的配置文件和数据|
|minikube|Minikube 是一个用于在本地机器上快速搭建和运行单节点 Kubernetes 集群的工具。它可以帮助开发人员在本地环境中进行 Kubernetes 应用程序的开发、测试和调试|
|kustomize|Kustomize 是 Kubernetes 官方提供的一个工具，用于管理和定制 Kubernetes 部署清单（manifests）|
|go-gitlint|一个 Git 钩子（hook）工具，用于在 Git 提交时检查提交信息的格式和规范性|
|mockgen|Mockgen 是 Go 语言中的一个工具，用于自动生成接口的 Mock 实现|
|uplift|自动生成语义化版本号的工具|
