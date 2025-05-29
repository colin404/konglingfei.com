---
date: 2024-01-30
title: LLMOPS 平台
icon: llmops
star: true
order: 2
author: 孔令飞
---

# LLMOPS 平台：[EasyAI](https://github.com/onexstack/easyai)

> 提示：项目当前基本功能已经开发完成。

EasyAI 是一个 LLM 连接器，旨在通过简化接入和使用过程，降低业务团队与 AI 技术之间的门槛，从而加速 AI 赋能业务的进程。

**EasyAI 一句话介绍：** 简化 LLM 接入，助力业务 AI 化。

## EasyAI LLMOPS 平台功能

EasyAI 包括了 LLMOPS 平台的几乎所有核心功能，具体如下：

![](https://picgo-1254073058.cos.ap-guangzhou.myqcloud.com/1730455385169-56840406-1898-479d-a021-b2643035d76a.jpeg)

## EasyAI 后端架构

![](https://picgo-1254073058.cos.ap-guangzhou.myqcloud.com/1743731256352-2d0e16c7-5516-41df-88e1-30d3482824c2.webp)

EasyAI 后端根据场景同时使用了声明式编程范式和命令式编程范式。其中，eai-gateway 采用了命令式编程。eay-apiserver + eay-controller-manager 采用了声明式编程。所有的请求，都通过 tyk-brother 企业级网关统一接入。所有的流量都会请求到 eai-gateway 组件中。eai-gateway 组件会将声明式 API 接口，原样转发给 eay-apiserver 组件。命令式 API 接口则在 eai-gateway 组件中进行处理。

**组件介绍：**

+ 客户端：EasyAI 几乎支持所有的客户端类型。例如：
    - eaictl：命令行客户端；
    - SDK：支持 Go SDK；
    - 前端：支持前端访问；
    - API：支持 API 调用；
+ tyk-brother：企业级的 API 网关，实现以下核心功能：
    - 认证、鉴权；
        * 认证采用基于 Dex 的 OIDC 认证；
    - API 接口限流、熔断、降级；
    - API 调用观测；
    - 支持 HTTP、RPC 双协议；
    - 支持服务注册；
    - ...
+ eai-gateway：统一业务接入层。实现以下资源的 CURD：
    - 数据的 CURD：
        * 数据文件；
        * 模型文件；
        * 知识库文档；
    - 会话；
    - 智能体；
    - 提示词；
+ eai-apiserver：声明式 API 服务器。支持各类 K8S 资源；
+ eai-controller-mananger：K8S 资源的控制器。声明式方式调谐 K8S 资源状态；
+ eai-nightwatch：统一、标准的异步任务执行引擎。（功能对比 K8S 的 Job、CronJob，但比 K8S 的 job controller、cronjob controller 更加轻量、易用）
+  eai-ratelimit：资源限流服务，支持各类自定义资源的限流。支持插件化添加各类限流策略；  
+ eai-agent：智能体平台，将由 EasyAI 调试好的 Agent 发布到智能体平台，供用户使用；
+ EasyML：标准的机器学习平台，支持 LLM 生产的全流程，例如：数据处理、特征提取、模型训练、模型部署、模型推理、模型观测、GPU 资源调度等；
+ OneX 声明式应用基座：基于声明式编程的任务处理，例如：模型对比、效果对比等。

## EasyAI 应用软件架构

EasyAI 采用 OneX 技术栈的软件架构（云原生 AI 实战营中的其他 Web 类型项目也都采用了以下 3 层简洁架构）：

![](https://picgo-1254073058.cos.ap-guangzhou.myqcloud.com/1730298256230-72cc942a-3993-453a-8396-e4214f8ae036.png)

整个软件架构一共分为以下三层：

+ **Handler 层：** 负责 API 接口请求的参数解析、参数校验、业务逻辑处理分发、参数返回逻辑。在 Handler 层中，还有 Default 和 Validation 模块，分别用来给请求参数设置默认值，并校验请求参数的合法性；
+ **Biz 层：** 包括了具体的业务逻辑实现。Biz 层根据 REST 资源类型分为不同的模块，内部可模块间交叉调用。在 Biz 层还有 Conversion 模块，用来进行结构体类型转换；
+ **Store 层：** 数据访问层（包括访问数据库或第三方微服务），用来跟数据库/微服务交互执行数据的 CURD 操作。该层做了进一步的抽象，抽象出了通用的 Store 层，Generic Store 之上 REST 资源的数据存储操作，均可继承 Generic Store 的方法实现，而不需要自行再实现一套。

上图所示的简洁架构，还具有以下特点：

+ 简洁架构提供了清晰的分层结构，各层功能明确，职责分明；
+ 通过接口解耦每一层，从而实现代码的可测性、独立性和扩展性；
+ 代码依赖由上向下（图中的有向箭头表示依赖规则），单向单层依赖，提供了清晰的依赖关系，使代码易于理解和维护。

## EasyAI Agent 应用架构

**提示：** 这里的应用架构指的是，平台中智能体应用类型的架构设计，而非软件架构设计。

LLMOPS 平台的应用架构，直接影响了平台中应用的种类、扩展难度和扩展速度。所以，在一开始，就应该设计好一个可维护、易扩展的应用架构。

EasyAI 项目采用的应用架构如下：

![](https://picgo-1254073058.cos.ap-guangzhou.myqcloud.com/1743674824158-6fef5c5f-20fe-451a-a320-3111fe0fe271.jpeg)

在 EasyAI 项目中，应用架构的基石是工作流。基于工作流组合 EasyAI 平台的各个原子能力，对上提供各种类型的智能体应用。

## EasyAI 部署方式

![](https://picgo-1254073058.cos.ap-guangzhou.myqcloud.com/1730354744078-2bdf7daf-5902-4e5b-a5b6-624e5532c81f.jpeg)

EasyAI 支持 3 种部署方式，完全满足企业的各种部署场景：

+ 裸机部署：直接将 EasyAI 部署在虚拟机/物理机上（不依赖 Kubernetes 集群）；
+ 云原生部署：使用 Helm 工具一键将 EasyAI 部署在 Kubernetes 集群中（依赖 Kubernetes 集群）；
+ 声明式应用基座：使用 Helm 工具，一键将 EasyAI 部署在声明式应用基座中（不依赖 Kubernetes 集群）。

## EasyAI 数据设计

EasyAI 平台中集成了完整的模型训练能力。模型训练、知识库、数据处理等都需要对数据进行各类操作。在真实的企业场景中，不同业务有不同的数据来源需求，数据处理需求。所以，需要设计一个可扩展、可复用的数据模型。平台中，所有跟数据相关的功能，都使用相同的数据模型，以此降低平台的数据维护复杂度、提高数据引用的效率。

EasyAI 平台数据模型如下所示：

![](https://picgo-1254073058.cos.ap-guangzhou.myqcloud.com/1743673981641-1d7897bc-3f30-49d1-b4a4-35a01ed86e6e.jpeg)

## EasyAI Kubernetes 资源

以下是 EasyAI 项目中包含的 Kubernetes 资源比如：

+ agents：智能体；
+ prompts：提示词；
+ applications：应用（工作流）；
+ llms：大模型；
+ datasets：数据集；
+ datasources：数据源；
+ versioneddatasets：版本化数据集；
+ embedders：向量大模型；
+ knowledgebases：知识库（RAG）；
+ models：模型；
+ vectorstores：向量数据库；
+ ...

## 云原生开发业务会带来什么样的火花？

+ **标准化：** 所有的 API 接口均符合标准的 REST 规范。包括请求路径、请求方法、请求消息体、请求返回等。均跟 Kuberentes 的标准 API 完全一致。标准化可以带来很多好处，例如：
    - 代码实现框架化；
    - 开发方式工具化；
    - 提高代码生成率；
    - 功能插件化。
+ **代码复用性：** 只需要添加 CRD 资源即可，路由构建、数据存储、查询条件等功能，均复用 Kuberentes 的通用组件库能力；
+ **扩展性：** Kuberentes 能够被企业大量使用的核心原因之一是其具有非常高的扩展性。采用 K8S 开发方式，应用自带高扩展性，而且扩展非常容易。EasyAI 项目的扩展点如下：
    - 模型：可通过创建不同的 LLM 资源扩展需要的模型；
    - Embedding 模型：可通过创建不同的 Embedding 模型；
    - 向量数据库扩展：可扩展不同的向量数据库；
    - 数据源扩展：可通过创建不同的 datasource 扩展数据源。比如支持 minio、postgresql 等；
    - 知识库扩展：可以自由组合以下扩展类别.
        * 知识库文档来源扩展；
        * 重排序策略扩展；
        * 数据来源；
        * 向量数据库；
        * 向量模型；
    - 聚合扩展：
        * LLM 聚合器可以聚合不同类型的 Agent、RAG、Prompt；
        * RAG 聚合器可以聚合不同的知识库、重排策略；
+ **高效运维：** eaictl 命令，带给你跟 Kuberentes kubectl 完全一致的运维体验。eaictl 其实就是 kubectl 命令，只不过连接的是 eai-apiserver；
+ **业务愈能力：** 借助于声明式编程范式，业务天然自带自愈能力。

上述这些新的功能特性给业务带来的最终价值为：

+ 提高项目迭代速度：通过提高代码开发效率、降低代码维护成本来提高项目迭代速度；
+ 提高项目稳定性：通过清晰的代码架构、构建方式等提高项目稳定性；

> 提示：声明式编程适用于一些是要维持状态的任务场景。例如：根据资源属性，计算资源状态的场景。具体例如：模型对比、模型训练。

![](https://picgo-1254073058.cos.ap-guangzhou.myqcloud.com/1743667574566-759d23f8-1026-4be4-b8f0-21896e88fe1c.png)
