---
title: 学习路线及资料下载
shortTitle: 学习路线
date: 2022-03-01
icon: luxian
sticky: true
star: true
order: 1
isOriginal: true
category:
  - learn
tag:
  - learn
---

# 学习路线及资料下载

在 [如何进阶为 Go + 云原生高级开发工程师？](/cloudnative/advanced/advanced.md)中，我详细介绍了如何学习，可以使自己快速进阶为 Go + 云原生高级开发。这里我再快速总结下学习路线，并提供路线中涉及到的学习资料供你下载。

## 学习路线

本着只看优秀课程、不重复学习、学习思路清晰、快速进阶的原则，我整理了以下进阶路线：
![Go+云原生高级开发工程师学习路线](/images/Go+云原生高级开发工程师学习路线-水印.png)

整个学习路线按顺序分为以下 4 个阶段（ 4 个阶段虽然具有先后进阶顺序，但其实可以并行学习）：
1. **学习技术基础：** 这一阶段是基础学习阶段，主要学习一些基础知识。这些知识更多偏向于对技术进行功能、架构、原理的介绍，并不会介绍开发实战。这一阶段，需要掌握以下 4 类技术栈：软件开发基础技术栈、中间件技术栈、Go 语言技术栈、云原生技术栈；
2. **学习优秀的开发实战课：** 因为我们的目标是成为一个 Go + 云原生高级开发工程师，所以还需要学习相应的开发实战课。开发实战课主要包含：Go 语言开发实战课、Kubernetes 开发实战课；
3. **阅读学习、优秀开源项目源码：** 另外，我们还可以阅读一些优秀的开源项目，来提高自己的开发能力；
4. **进行真实的企业开发实战：** 最后，我们需要通过真正的企业开发实战，来验证、巩固、提高我们的开发能力。

## 学习资料推荐

经典学习资料按阶段推荐如下。其中阶段 2、阶段 3 你均可以在孔令飞的云原生实战营闭环学习。

### 阶段 1

- 软件开发基础技术栈
  - Linux 基础：[《循序渐进 Linux（第 2 版）》](https://book.douban.com/subject/26758194/)
  - Makefile 基础：《Makefile 编程》
  - Shell 基础：[《实战 Linux Shell 编程与服务器管理》](https://book.douban.com/subject/4722707/)、[《Shell 脚本专家指南》](https://book.douban.com/subject/4935288/)；
  - SQL 基础：[《精通 SQL 结构化查询语言详解》](https://book.douban.com/subject/2022427/)
- 中间件技术栈
  - MySQL 基础：[《MySQL 必知必会》](https://book.douban.com/subject/3354490/)；
  - Redis 基础：[《Redis 设计与实现》](https://book.douban.com/subject/25900156/)；
  - Kafka 基础：[《Kafka 权威指南》](https://book.douban.com/subject/27665114/)。
- Go 语言技术栈
  - Go 语言编程基础：[《Go 程序设计语言》](https://book.douban.com/subject/27044219/)、[《Go 语言编程》](https://book.douban.com/subject/11577300/)。
- 云原生技术栈
  - 虚拟化基础：[《系统虚拟化: 原理与实现》](https://book.douban.com/subject/3619896/)、[《KVM 虚拟化技术: 实战与原理解析》](https://book.douban.com/subject/25743939/)；
  - 微服务：[《微服务设计》](https://book.douban.com/subject/26772677/)；
  - Docker 基础：[《Docker 技术入门与实战（第 3 版）》](https://book.douban.com/subject/30329430/)、[《Docker 容器与容器云（第 2 版）》](https://book.douban.com/subject/26894736/)；
  - Kubernetes 基础：[《Kubernetes 权威指南：从 Docker 到 Kubernetes 实践全接触（第 5 版）》](https://book.douban.com/subject/35458432/)。
  - 云原生基础：
    - [《云原生架构：从技术演进到最佳实践》](https://book.douban.com/subject/35637708/)；
    - [《阿里云云原生架构实践》](https://book.douban.com/subject/35469552/)。

上面有些同类技术栈，资料会推荐 2 本及以上，你可以根据学习精力，选择阅读第一本，或者全部都学习。

### 阶段 2

- Go 语言开发实战课：孔令飞的云原生实战营中包含的 [Go 项目开发高阶实战课](/cloudnative/catalog/go.md)；
- Kubernetes 开发实战课：孔令飞的云原生实战营中包含的 [Kubernetes 开发实战课](/cloudnative/catalog/kubernetes.md)；

阶段 2 当前并没有优质的免费开发实战课。有一本 [《Kubernetes 编程》](https://book.douban.com/subject/35498478/)图书，不过国内没有电子版教材可用。建议，直接学习星球中的 Kubernetes 开发实战课，内容更全，是一个真正的开发实战课。

### 阶段 3

- [OneX](https://github.com/superproj/onex)：非常优秀的 Go + 云原生实战项目；
- [Gin](https://github.com/gin-gonic/gin)：非常受欢迎的 Go Web 框架；
- [Kubernetes](https://github.com/kubernetes/kubernetes)：容器编排项目，云时代的操作系统。

为了减轻你的学习负担，快速进阶，这里建议只阅读 OneX 项目的源码即可。OneX 项目配套有实战体系课和学习星球，可以减轻你的源码阅读难度，提高源码阅读效率。

### 阶段 4

阶段 4 是学以致用阶段，这个阶段主角是你。你可以思考工作中哪些项目可以基于 OneX 项目魔改开发，哪些项目可以采用声明式 API 编程实现，并使用所学技能完成企业项目的开发。既夯实了你的学习效果，又在工作上有非常优质的产出。

## 资料下载

- 阶段 1：涉及的资料可以扫码关注我的公众号，回复【资料】，获取下载链接；
<img src="/images/contact/微信公众号-8cm.jpg" alt="fenxiang" style="width:200px; height:auto;">
- 阶段 2：你可以加入 [孔令飞的云原生实战营](https://t.zsxq.com/BDCy2) 知识星球获得；
- 阶段 3：都是开源项目直接 GitHub 克隆源码学习；
- 阶段 4：你就是资料。
