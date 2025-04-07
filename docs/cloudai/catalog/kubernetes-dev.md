---
date: 2024-01-30
title: Kubernetes 开发实战课
icon: k8sdevel
star: true
order: 9
author: 孔令飞
---

# Kubernetes 开发实战课

课程目录如下：

|序号|标题|
|:----:|:----|
|001|client-go：client-go 项目介绍|
|002|client-go 客户端：RESTClient 客户端原理及实战|
|003|client-go 客户端：DiscoveryClient 客户端原理及实战|
|004|client-go 客户端：ClientSet 客户端原理及实战|
|005|client-go 客户端：DynamicClient 客户端原理及实战|
|006|client-go 客户端：ScaleClient 客户端原理及实战|
|007|client-go Informer 机制：Informer：Informer 架构设计及原理|
|008|client-go Informer 机制：Informer 创建及启动流程分析|
|009|client-go Informer 机制：Reflector 源码剖析与实战|
|010|client-go Informer 机制：DeltaFIFO 源码剖析与实战|
|011|client-go Informer 机制：Controller 源码剖析|
|012|client-go Informer 机制：Indexer 源码剖析与实战|
|013|client-go 核心功能：WorkQueue 源码剖析与实战|
|014|client-go 核心功能：EventBroadcaster 事件管理器|
|015|client-go 核心功能：乐观锁原理与实战|
|016|client-go 核心功能：client-go 多副本选举功能设计与实战|
|017|client-go 活学活用：如何开发 client-go 风格的 Go SDK？|
|018|client-go 活学活用：client-go 中有哪些开发技巧可供我们学习使用？|
|019|自定义资源：Kubernetes CRD 概念及功能介绍|
|020|自定义资源：自定义资源的创建和定义|
|021|自定义资源：Kubernetes CRD 部署实战|
|022|自定义资源： 自定义资源的高级功能|
|023|自定义资源： 自定义资源的扩展|
|024|自定义资源： 如何自定义资源版本|
|025|自定义资源：结构化 Schema 与 CRD 的未来|
|026|自定义资源： 自定义资源的最佳实践和注意事项|
|027|自定义资源： 自定义资源的社区支持和资源|
|028|代码自动生成：为什么需要代码生成器？|
|029|代码自动生成： 如何调用代码生成器？|
|030|代码自动生成： 如何通过标签控制代码生成器？|
|031|代码自动生成：如何生成 client-go 风格 的 Go SDK？|
|032|代码自动生成：各类代码生成开发与实战|
|033|Kubernetes Webhook 介绍及原理|
|034|如何从0开发一个Webhook|
|035|如何给CRD资源开发一个Webhook|
|036|Controller：Controller 有哪些类型，如何选择合适的 Controller 类型并高效快速的开发？|
|037|Custom Controller：如何开发一个最简单的 Controller？|
|038|Custom Controller：sample-controller 介绍、部署及使用|
|039|Custom Controller：sample-controller 实现详解|
|040|Custom Controller：如何基于 sample-controller 快速开发一个 controller？|
|041|controller-runtime 原理及实战：controller-runtime 原理及实战|
|042|controller-runtime 原理及实战：Manager 模块源码剖析|
|043|controller-runtime 原理及实战：Controller 模块源码剖析|
|044|controller-runtime 原理及实战：Client 模块源码剖析|
|045|controller-runtime 原理及实战：Cache 模块源码剖析|
|046|controller-runtime 原理及实战：WebHook 模块源码剖析|
|047|controller-runtime 原理及实战：Reconciler 模块源码剖析|
|048|controller-runtime 原理及实战：Source 模块源码剖析|
|049|controller-runtime 原理及实战：EventHandler 模块源码剖析|
|050|controller-runtime 原理及实战：Predicate 模块源码剖析|
|051|controller-runtime 原理及实战：controller-runtime 最佳实践|
|052|controller-runtime 原理及实战：kubebuilder 实战及源码解读|
|053|controller-runtime 原理及实战：controller-tools 介绍及实战|
|054|Operator Controller：如何使用 Kuerbuild 快速开发一个 Operator|
|055|Operator Controller：如何部署 Operator？|
|056|Operator Controller：社区有哪些优秀的 Operator，它们分别用在什么场景？|
|057|开源Operator实战：使用 jaeger-operator 重新部署 Jaeger|
|058|聚合 API 服务器：我们为什么需要编写一个 Aggregated APIServer|
|059|聚合 API 服ube-apiserver 聚合架构实现剖析|
|060|聚合 API 服务器：如何部署聚合 API 服务器？|
|061|聚合 API 服务器：如何实现一个准入 Webhook？|
|062|自定义 API 服务器：sample-apiserver 介绍、部署及使用|
|063|自定义 API 服务器：sample-apiserver 实现详解|
|064|自定义 API 服务器：如何基于 sample-apiserver 开发自å义 API 服务器？|
|065|APServer 项目实战：如何基于 sample-apiserver 开发一个不依赖于 Kubernetes 的 APIServer？|
|066|https://blog.gmem.cc/kubernetes-style-apiserver|
|067|APIServer 项目实战：onex-apiserver 架构设计详解|
|068|APIServer 项目实战：onex-apiserver 启动流程分析|
|069|APIServer 项目实战：onex-apiserver 如何完美使用 kubectl 提供的功能|
|070|APIServer 项目实战：如何注册一个新的资源类型（资源添加、注册、Table 功能）？|
|071|APIServer 项目实战：onex-apiserver 如何迁移 Kubernetes 原生的资源？|
|072|APIServer 项目实战：onex-apiserver Admissio Controller 实现解析|
|073|APIServer 项目实战：如何添加一个 Adminssion Webhook？|
|074|APIServer 项目实战：如何添加 Authentication Webhook？|
|075|APIServer 项目实战：如何添加一个 Authorization Webhook？|
|076|APIServer项目实战：认证和授权服务开发|
|077|Controller 项目实战：onex-controller-manager 实现分析|
|078|Controller 项目实战：onex-minerset-controller 实现分析|
|079|Controller 项目实战：onex-miner-controller 实现分析|
|080|Controller 项目实战：onex controller 事件过滤器剖析|
|081|Controller 项ontroller 缓存能力建设|
|082|Controller 项目实战：如何仅依赖 onex-apiserver 生成全局唯一 ID？|
|083|Controller 项目实战：如何提高 Reconcile 吞吐量及如何进行客户端限流？|
|084|Controller 项目实战：如何通过 controller 删除资源？|
|085|Controller 项目实战：Controller 性能测试及分析|
|086|Controller 项目实战：Controller 多副本选举功能实现及部署（两种选举机制）|
|087|Controller 项目实战：如何测试 Controller？|
|088|Controller 项目实战：开发 Controller 时，有哪些坑，如何避免？|
|089|核心能力构建：OneX 配额限制能力建设|
|090|核心能力构建：OneX 安全能力建设|
|091|核心能力构建：OneX 事件能力建设|
|092|核心能力构建：onex-apiserver 性能测试及分析|
|093|: 核心能力构建：onex-apiserver FeatureGate 功能实现|
|094|核心能力构建：如何使用 Kuberentes 的方式来配置 OneX 服务？|
|095|核心能力构建：如何全方位监控你的应用？|
|096|核心能力构建：如何构建一个可快速排障的日志系统？|
|097|容器化部署实战：软件发布流程、环境及多环境处理|
|098|容器化部署实战：Docker 镜像的构建原理和方式|
|099|容器化部署实战：如何编写 Dockerfile 文件？|
|100|容器化部署实战：如何编写 Kubernetes 资源定义文件？														w|
|101|容器化部署实战：服务部署时，如何进行权限管控？|
|102|容器化部署实战：使用 Kuberentes 资源定于文件部署 OneX 项目|
|103|Kustomize 部署实战：Kustomize 基础及使用实战|
|104|Kustomize 部署实战：基于 Kustomize 的应用部署实战|
|105|Helm 部署实战：Helm 基础知识介绍|
|106|Helm 部署实战：Helm 基本操作实战|
|107|Helm 部署实战：使用 Helm 部署 OneX 应用实战|
|108|运维能力构建实战（日志）：如何快速构建 OneX 的日志排障系统？|
|109|运ç´能力构建实战（监控）：如何快速构建 OneX 的监控体系？|
|110|运维能力构建实战（调用链）：如何快速构建 OneX 的调用链体系？|
|111|进入圈子：云原生生态圈介绍|
|112|开源贡献：如何向开源社区贡献代码？|
|113|一份云原生面试准备清单|
|114|云原生高级开发工程师能力评估考试|
|115|下一站：学完 Kubernetes 开发的下一站是哪里？|
