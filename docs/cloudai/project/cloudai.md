---
date: 2024-01-30
title: 实战营项目总览
icon: cloudai
star: true
order: 1
author: 孔令飞
---

「云原生 AI 实战营」中的项目，足以让你彻底掌握 Go、Go 项目开发、云原生、云原生项目开发、AI 工程开发等技术。这些技术，可以让你在当前及未来的 AI 时代具备强有力的职业竞争力。

+ **「Go 项目」：**
    - 极速入门实战项目：[fastgo](https://github.com/onexstack/fastgo)
    - 中级实战项目：[miniblog](https://github.com/onexstack/miniblog)
    - 高级实战项目：[iam](https://github.com/marmotedu/iam)
    - Go 项目开发脚手架项目：[osbuilder](https://github.com/onexstack/osbuilder)
+ **「云原生项目」：**
    - 企业级 API 网关：Tyk Brother
    - 云原生实战平台（专家级 Go 实战项目）：[OneX](https://github.com/onexstack/onex)
        * 分布式限流项目 onex-ratelimit
        * 工作流：onex-workflow
        * 云原生可观测平台：onex-eye
        * 异步任务执行引擎：onex-nightwatch
        * 分布式缓存服务：onex-cacheserver
+ **「AI 项目」：**
    - LLMOPS 平台：[EasyAI](https://github.com/onexstack/easyai)
    - 机器学习平台：EasyML
    - 智能体平台：EasyAgent

### Go 语言实战项目

####  极速入门实战项目：[fastgo](https://github.com/onexstack/fastgo)

一个包含了 Go 项目开发中，基本功能的实战项目，旨在以最快速的方式，让读者了解到 Go 项目开发中的核心技术，及开发实习方式。整个项目源码一共 1600 多行，可以让你很快的了解 Go 项目开发的核心流程及功能。

####  初中级实战项目：[miniblog](https://github.com/onexstack/miniblog)

miniblog（微博客） 是一个 Go 语言入门项目，用来完成用户注册、博客创建等业务功能。miniblog 入门但不简单：
- **入门：** 适用于刚学习完 Go 基础语法，零项目开发经验的 Go 开发者；
- **不简单：** 本项目来自于一线企业的大型线上项目，项目本身是一个企业级的项目，学习完之后，完全可以用来作为企业级项目的开发脚手架。

miniblog 实现了以下 2 类功能：
- **用户管理：** 支持用户注册、用户登录、获取用户列表、获取用户详情、更新用户信息、修改用户密码等操作；
- **博客管理：** 支持创建博客、获取博客列表、获取博客详情、更新博客内容、删除博客等操作。

本项目适合人群
- 刚学习完 Go 基础语法，想快速学习，以参与公司 Go 语言开发工作的开发者；
- 掌握 Go 基础语法，零 Go 应用开发经验，想通过完整的实战，快速、系统的学习 Go 开发的开发者；
- 有意从事 Go 应用开发，但尚未入门或入门尚浅的开发者；
- 有过 Go 应用开发经验，但想了解某一部分开发方法的开发者。

#### 「限星球用户」专家级实战项目：[OneX](https://github.com/onexstack/onex)
OneX 云原生实战平台是一个 Go 语言 + 云原生实战平台，也是一个企业级的云平台，整个项目遵循最佳实践的思路去构建。

OneX 项目通过提供功能完备、规范、高质量的 Go 源码来实现代码即学习的理念，通过配套的 Go 开发课程，来降低学习难度、扩展学习深度和广度。通过配套的云原生开发社群 [云原生 AI 实战营](https://konglingfei.com/)，来提高云原生技术学习的效果。

OneX 项目实现了企业级应用需要的绝大部分技能点，详细的功能列表见：[功能列表](https://konglingfei.com/onex/intro/feature.html)。OneX 实战项目同时还具有以下特点：
- **功能全：** 课程包含了 Go 开发生涯中几乎用到的所有及实战，包括但不限于以下 4 大技术栈：
  - 软件开发基础技术栈：包含 Linux、Shell 编程、Makefile 编程、Git 等软件开发需要用到的基础技术栈；
  - Go 开发技术栈：Web 编程、各类应用实现（SDK、ETL 数据抽取、认证授权中心、命令行工具、Web 服务、分布式作业、代码检查、代码生成等）、中间件使用、HTTP/HTTPS/GRPC/WebSocket 协议、常用功能设计和开发等；
  - 云原生技术栈：Kubernetes 编程、Docker 实战、Kubernetes 实战、云原生部署实战、声明式编程、不可变基础设施等；
  - 微服务技术栈：分布式日志、监控告警、服务编排、调用链、负载均衡、服务治理、配置中心等。
- **代码质量高：** 整个项目具有很高的代码质量，包括但不限于：编程模式全（命令式编程、声明式编程等）、遵循简洁架构、代码简洁健壮、接口性能高、高可维护性、高可扩展性等；
- **项目规范：** 规范先行。整个实战项目具有目录规范、代码规范、日志规范、错误码规范、文档规范、提交规范、版本规范等规范项；
- **技术生态闭环：** 整个项目用到了 Go 开发中的绝大部分功能点、技术栈和实现方式，完全可以通过一个实战项目闭环学习整个 Go 开发技术栈。

#### 「限星球用户」Go 项目开发脚手架项目：[osbuilder](https://github.com/onexstack/osbuilder)
osbuilder 项目作为 OneX 技术栈的项目开发脚手架，可以自动生成符合 OneX 技术栈开发规范、软件架构、开发风格的高质量 Go 项目。

osbuilder 支持生成多种应用、多种框架的代码，osbuilder 支持以下核心参数：

+ `-t, --type`：支持生成 Web 服务器、异步任务处理服务、命令行工具；
+ `--web-framework`：Web 服务器支持 gin、grpc、grpc-gateway、kitex、hertz、kratos、go-zero 等 Web 框架；
+ `--storage-type`：底层存储支持 Memory、MariaDB、SQLite、PostgreSQL、Etcd、MongoDB、Redis 等；
+  `--deployment-mode`：支持 Systemd、Docker、Kubernetes 等部署模式。

通过不同的可选项， osbuilder 工具会自动生成对应的高质量源码。在自动生成 Web 服务项目类型后，osbuilder 工具还支持给项目添加新的REST资源实现代码。

通过使用 osbuilder 工具自动生成项目源码，可以极大的提高项目开发的效率，并保持项目开发风格的高度一致性，从而降低项目后期的阅读和维护成本。

miniblog 项目，就是用 osbuilder 工具自动生成的：[https://github.com/onexstack/miniblog](https://github.com/onexstack/miniblog)。

该工具目前作为《云原生 AI 实战营》知识星球的专有工具，可供星球内的星友免费使用、升级。工具后期也会不断迭代完善。

osbuilder 工具支持 AI 编程能力，该能力正在开发完善中。

###  云原生实战项目
#### 「限星球用户」企业级 API 网关：Tyk Brother
Tyk Brother 是一个企业级 API 网关，该网关具备了企业需要的绝大部分网关功能，并且经过超大规模生产环境的验证。



Tyk Brother 功能列表如下：
- 监控：请求次数、成功次数、失败次数、最后一次访问时间 （总/ API 级别/秘钥）
- 服务中心：支持 etcd/consul/custom
- 负载均衡
- 请求日志
- API管理：增删改查、Tag、启用/禁用…
- 限流\熔断\降级 限流支持：密钥级别、API级别，多少次/多少秒
- 跨域 支持定制化跨域设置
- IP黑白名单
- 参数校验
- Mock
- Cache Request（GET/LIST，POST/PUT/DELETE Not cache）
- API配置导入/导出(JSON格式)
- 版本控制：path/query/header
- Request/Response修改：添加Header、修改Body、HTTP Method重定向、URL重定向
- 保留主机头
- 超时时间、Request包大小限制
- API健康检查
- 认证：Basic、OAuth.2.0、JWT、OpenID、Open、自定义(plugin)…
- 文档
- Debugging
- HTTPS支持
- API聚合
- Webhook：Notifications and Events
- 配置数据
- 支持用户自定义插件
- Protocols：HTTP、HTTPS、WebSocket
- 自定义域名

网关架构如下：

![API网关架构](/images/API网关架构.png)

#### 「限星球用户」云原生实战平台：OneX

OneX 介绍如上。OneX 云原生实战平台，包含了 Kubernetes 编程中的所有技术实现，例如：Operator 开发、kube-apiserver style 的 APIServer 开发、CRD、client-go 实战、controller 开发及运维等等。

### AI 平台实战项目

AI 平台类实战项目，包含了 LLMOPS 平台、MLOPS 平台、智能体平台。通过这 3 类平台让你全面掌握 AI Infra 相关的开发技术。

#### 1、「限星球用户」LLMOPS 平台：[EasyAI](https://github.com/onexstack/easyai)

EasyAI 项目是一个面向云原生环境的 LLM 连接器，致力于通过简化 LLM 接入和使用的过程，降低业务团队与 AI 技术之间的门槛，从而加速 AI 技术对业务的赋能。

EasyAI 实现了一个功能完备、扩展能力强、代码质量高、易维护的云原生 AI 平台，具有以下 LLMOPS 功能：

![LLMOPS平台功能](/images/LLMOPS平台功能.jpeg)

核心功能包括以下 2 部分：

+ **模型训练：** 数据源、数据集、数据处理、模型仓库、模型训练、模型部署、模型对比等；
+ **模型推理：** 智能体、提示词、工作流、插件、模型效果评估、知识库等。

相比于其他 LLMOPS 平台（例如：[扣子](https://www.coze.cn/)、[Dify](https://cloud.dify.ai/app)、[BetterYea](https://ai.betteryeah.com/application)），EasyAI 通过接入 EasyML 项目实现了模型训练的功能。并且 EasyAI 项目代码质量很高，并且具有很高的扩展能力。

EasyAI 平台中使用到的技术栈包括了 Go 项目开发技术栈、云原生技术栈和 AI 技术栈。通过 EasyAI 项目，开发者可以体系化的加强 Go 项目开发、云原生和 AI 技术的开发能力。

EasyAI 项目软件架构如下：

![EasyAI后端架构](/images/EasyAI后端架构.png)


这里要注意， EasyAI 平台使用的开发技术是 Go 项目开发实战课、Kubernetes 编程实战课中介绍的技术，并加入了 AI 领域的技术。所以，想更好的掌握 EasyAI 项目的开发，最好预先学习上述 2 类体系课。

> **提示：**
>
> LLMOps（Large Language Model Operations）是一个涵盖了大型语言模型（如GPT系列）开发、部署、维护和优化的一整套实践和流程。LLMOps 的目标是确保高效、可扩展和安全地使用这些强大的 AI 模型来构建和运行实际应用程序。它涉及到模型训练、部署、监控、更新、安全性和合规性等方面。

EasyAI 平台初版已经开发完成，课程正在开发中。

#### 2、「限星球用户」机器学习平台：[EasyML](https://github.com/onexstack/easyml)

EasyML 平台及课程目前正在开发中。EasyML 主要用来进行通用的模型训练，包括数据处理及特征准备、模型部署、模型推理、模型训练、超参调优、模型微调、模型训练工作流、模型仓库、AutoML 等能力。

EasyML 平台架构如下：

![EasyML后端架构](/images/EasyML后端架构.svg)

#### 3、「限星球用户」智能体平台：EasyAgent

EasyAgent 是一个智能体平台，主要用来发布 Agent。EasyML 平台训练后的 LLM，通过 EasyAI 平台的再组装（工作流、插件等），成为一个功能更加强大的智能体，该智能体会在 EasyAgent 平台发布并使用。

也可以理解为 EasyAgent 是一个 Agent 市场，里面包含了各种开发、优化后的智能体。

EasyAgent 平台及课程目前正在开发中。
