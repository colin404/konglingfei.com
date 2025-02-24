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

EasyAI 项目是一个面向云原生环境的 LLM 连接器，致力于通过简化 LLM 接入和使用的过程，降低业务团队与 AI 技术之间的门槛，从而加速 AI 技术对业务的赋能。

EasyAI 实现了一个功能完备、扩展能力强、代码质量高、易维护的云原生 AI 平台，具有以下 LLMOPS 功能：

![](/images/easyai功能图.jpg)

核心功能包括以下 2 部分：

+ **模型训练：** 数据源、数据集、数据处理、模型仓库、模型训练、模型部署、模型对比等；
+ **模型推理：** 智能体、提示词、工作流、插件、模型效果评估、知识库等。

相比于其他 LLMOPS 平台（例如：[扣子](https://www.coze.cn/)、[Dify](https://cloud.dify.ai/app)、[BetterYea](https://ai.betteryeah.com/application)），EasyAI 通过接入 EasyML 项目实现了模型训练的功能。并且 EasyAI 项目代码质量很高，并且具有很高的扩展能力。

EasyAI 平台中使用到的技术栈包括了 Go 项目开发技术栈、云原生技术栈和 AI 技术栈。通过 EasyAI 项目，开发者可以体系化的加强 Go 项目开发、云原生和 AI 技术的开发能力。

EasyAI 项目软件架构如下：

![](/images/easyai架构提.png)

这里要注意， EasyAI 平台使用的开发技术是 Go 项目开发实战课、Kubernetes 编程实战课中介绍的技术，并加入了 AI 领域的技术。所以，想更好的掌握 EasyAI 项目的开发，最好预先学习上述 2 类体系课。

> <font style="color:rgb(20, 29, 46);background-color:rgb(254, 255, 255);">提示：</font>
>
> <font style="color:rgb(20, 29, 46);background-color:rgb(254, 255, 255);">LLMOps（Large Language Model Operations）是一个涵盖了大型语言模型（如GPT系列）开发、部署、维护和优化的一整套实践和流程。LLMOps 的目标是确保高效、可扩展和安全地使用这些强大的 AI 模型来构建和运行实际应用程序。它涉及到模型训练、部署、监控、更新、安全性和合规性等方面。</font>
>

<font style="color:rgb(20, 29, 46);background-color:rgb(254, 255, 255);"></font>

EasyAI 平台初版已经开发完成，课程正在开发中。
