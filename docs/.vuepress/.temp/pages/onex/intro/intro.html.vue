<template><div><h1 id="onex-一个功能全、扩展强、代码质量高、源自一线大厂的企业级-go-云原生实战项目" tabindex="-1"><a class="header-anchor" href="#onex-一个功能全、扩展强、代码质量高、源自一线大厂的企业级-go-云原生实战项目"><span>OneX，一个功能全、扩展强、代码质量高、源自一线大厂的企业级 GO+云原生实战项目</span></a></h1>
<p>云原生实战营最核心的一个学习内容或价值，便是实战营的实战项目：OneX 云原生实战平台（以后统称 OneX）。OneX 为了能够承载更多的知识点，设计的比较复杂，上手可能有一定难度，但是越有难度的东西，带给你的提升越大，简单的东西网上随处可见。为了降低你的学习难度，这里会从一个上帝视角对 OneX 进行介绍。</p>
<h2 id="onex-云原生实战平台" tabindex="-1"><a class="header-anchor" href="#onex-云原生实战平台"><span>OneX 云原生实战平台</span></a></h2>
<p><a href="https://github.com/superproj/onex" target="_blank" rel="noopener noreferrer">OneX<ExternalLinkIcon/></a> 云原生实战平台是一个 Go 语言 + 云原生实战平台，也是一个企业级的云平台，具备超越一线大厂企业级应用的能力。该平台通过提供功能完备、规范、高质量的 Go 源码来实现代码即学习的理念，通过配套的 Go 开发课程，来降低学习难度，扩展学习深度和广度。通过专有的云原生开发社群：<a href="/onex/intro/intro">孔令飞的云原生实战营</a>，来提高云原生技术学习的积极性和效果。</p>
<div class="hint-container tip">
<p class="hint-container-title">为什么起名 OneX？</p>
<p>OneX 寓意该实战项目具有功能全、扩展性高等特点。未来 OneX 会继续集成进很多跟 Go、云原生相关的功能。因为 OneX 在项目设计的时候，就考虑到了未来功能和架构的扩展，所以 OneX 未来可以无缝、丝滑的扩展很多新的功能。</p>
</div>
<br/>
<p>OneX GitHub 地址为：<a href="https://github.com/superproj/onex" target="_blank" rel="noopener noreferrer">https://github.com/superproj/onex<ExternalLinkIcon/></a> <strong>建议大家先 Star，以便及时获取 OneX 的更新</strong>。对于一个优秀的开源项目，在学习过程中，顺手 Star 是一个好的习惯。当你需要再学习或者参考时，可以在你的 Star 列表中找到该项目。否则，你只能通过记忆找到这个项目。</p>
<br/>
<p>OneX 项目的设计，足以承载企业开发时，用到的绝大部分技能点。OneX 一期有 12w+ 行代码，具体代码统计如下图所示：</p>
<figure><img src="/images/OneX源码统计.png" alt="OneX一期源码统计" tabindex="0" loading="lazy"><figcaption>OneX一期源码统计</figcaption></figure>
<p>OneX 项目详细的功能列表见：<a href="https://konglingfei.com/onex/intro/feature.html" target="_blank" rel="noopener noreferrer">OneX 项目功能列表<ExternalLinkIcon/></a>。</p>
<h2 id="onex-实战项目特点" tabindex="-1"><a class="header-anchor" href="#onex-实战项目特点"><span>OneX 实战项目特点</span></a></h2>
<p>OneX 实战项目具有以下特点：</p>
<ul>
<li><strong>功能全：</strong> 课程包含了 Go 开发生涯中几乎用到的所有及实战，包括但不限于以下 4 大技术栈：
<ul>
<li>软件开发基础技术栈：包含 Linux、Shell 编程、Makefile 编程、Git 等软件开发需要用到的基础技术栈；</li>
<li>Go 开发技术栈：Web 编程、各类应用实现（SDK、ETL 数据抽取、认证授权中心、命令行工具、Web 服务、分布式作业、代码检查、代码生成等）、中间件使用、HTTP/HTTPS/GRPC/WebSocket 协议、常用功能设计和开发等；</li>
<li>云原生技术栈（微服务独立）：Kubernetes 编程、Docker 实战、Kubernetes 实战、云原生部署实战、声明式编程、不可变基础设施等；</li>
<li>微服务技术栈：分布式日志、监控告警、服务编排、调用链、负载均衡、服务治理、配置中心等。</li>
</ul>
</li>
<li><strong>项目规范：</strong> 规范先行。整个实战项目具有目录规范、代码规范、日志规范、错误码规范、文档规范、提交规范、版本规范等规范项；</li>
<li><strong>技术生态闭环：</strong> 整个项目用到了 Go 开发中的绝大部分功能点、技术栈和实现方式，完全可以通过一个实战项目闭环学习整个 Go 开发技术栈。</li>
</ul>
<h2 id="onex-实战项目功能概述" tabindex="-1"><a class="header-anchor" href="#onex-实战项目功能概述"><span>OneX 实战项目功能概述</span></a></h2>
<p>OneX 也是一个矿机云平台，在该平台中你可以注册用户，创建私有链，并购买矿机进行区块链挖矿。购买矿机时需要指定矿机的副本数，OneX 平台会使用声明式编程范式，确保始终有期望副本数的矿机处在健康状态，并执行挖矿任务。</p>
<p>挖矿所得的虚拟货币（OX 币），会进入你的私人钱包。购买矿机需要支付 OX 币，注册用户时会赠送 1000 OX 币，之后你可以通过挖矿赚取 OX 币，从而购买更多的矿机和服务。每个用户购买的矿机数量有限制，可以通过白名单提高矿机配额（注意：OneX 项目一期暂未实现付费和配额管理功能）。</p>
<p>OneX 也提供一些付费功能（二期实现），例如：</p>
<ul>
<li>矿机健康探测及自动恢复：该功能会自动探测矿机状态，并根据预设策略进行状态修复；</li>
<li>AIOps 服务：通过聊天的方式，来管理矿机池，例如：扩缩容、修改配置、查看健康指标等；</li>
</ul>
<p>此外， OneX 还是一个微型的 Kubernetes 平台。学习好 OneX，等同于学习了部分 Kubernetes 源码（kube-apiserver、kube-controller-manager）。部署 OneX 平台，就等于部署了一套微型 Kubernetes。</p>
<h2 id="onex-实战项目一期架构" tabindex="-1"><a class="header-anchor" href="#onex-实战项目一期架构"><span>OneX 实战项目一期架构</span></a></h2>
<p>这里，我们再来看下 OneX 的实现架构。OneX 架构图如下：</p>
<figure><img src="/images/OneX架构图-水印.png" alt="OneX一期架构图" tabindex="0" loading="lazy"><figcaption>OneX一期架构图</figcaption></figure>
<div class="hint-container info">
<p class="hint-container-title">提示</p>
<p>架构图中，浅黄色部分是一个微型的 K8S 实现。用 OneX 开发业务代码，其实就是将 K8S 代码和架构迁移到业务中。</p>
</div>
<p><strong>OneX 平台使用流程如下：</strong></p>
<ol>
<li>用户登录：用户通过前端登录 OneX 平台，前端会调用 onex-usercenter提供的 RESTful API 接口登录系统，登录成功（用户名：密码验证成功），后端返回 Token，前端之后通过该 Token 跟后端交互。用户可以在控制台创建一个密钥对，用来访问 onex-gateway组件；</li>
<li>创建矿机池：用户使用步骤 1 中，创建的密钥对，生成 JWT Token，来访问 onex-gateway组件创建矿机池，onex-gateway会根据请求信息，访问 onex-usercenter进行认证和授权，onex-usercenter会将授权记录保存在 Kafka 中。认证授权通过后，onex-gateway 会请求 onex-apiserver 创建 MinerSet 资源。onex-apiserver会将资源对象的参数保存到 Etcd 存储中；</li>
<li>矿机池调和：onex-minerset-controller Watch onex-apiserver，当发现有新的MinerSet被创建后，会根据MinerSet.Spec参数，创建Miner资源，Miner资源的创建个数跟 MinerSet.Spec.Replicas设置的副本数保持一致。</li>
<li>矿机调和：onex-miner-controller Watch onex-apiserver，当发现有新的Miner资源被创建时，会根据Miner.Spec参数，会使用 Kuberentes client-go 调用 kube-apiserver，创建 Pod 资源（一个 Pod 其实，就是一个矿机）；</li>
<li>启动区块链节点：onex-miner-controller创建 Pod 时，会指定 Pod 的镜像和启动参数，镜像中包含一个onex-toyblc服务，该服务会启动一个区块链节点，并跟其他区块链节点进行通信，彼此发现；</li>
<li>异步同步：onex-controller-manager中的sync-controller会 Watch onex-apiserver并将，Chain、MinerSet、Miner资源同步到 MySQL 数据库中。为什么要进行同步？是因为当onex-apiserver中资源太多时，使用 client-go 访问onex-apiserver延时会很高，所以提前将这些资源同步到 MySQL 中，onex-gateway通过 MySQL 来访问创建的资源，从而降低接口延时；</li>
<li>异步处理：</li>
<li>onex-pump会消费 Kafka 中的授权日志，经过解析、处理后保存到 MongoDB 中，onex-oss-center会查询 MongoDB 中的授权日志，来展示授权记录；</li>
<li>onex-nightwatch是一个分布式异步任务处理服务，会异步执行注册的任务，例如，定期清理过期的密钥对等。</li>
<li>onex-controller-manager Controller 功能介绍：onex-controller-manager是一个 Controller 聚合服务，里面包含了多个 Controller，用来完成不同的功能：</li>
<li>resource-clean-controller，用来定期将Chain、MinerSet、Miner资源从onex-apiserver中同步到 MySQL 中，确保数据的强一致性；</li>
<li>chain-controller会 Watch onex-apiserver，当发现有新的 Chain资源被创建时，会创建一个私有创世链；</li>
<li>garbage-controller-manager：GC 服务，定期删除需要 GC 的资源。</li>
</ol>
<p>OneX 平台提供了多种途径用来访问后端组件，这些访问方式可以极大的提高开发/运维人员的开发/操作效率：</p>
<ul>
<li>kubectl：像访问 kube-apiserver一样，访问 onex-apiserver，使用方式完全保持一致；</li>
<li>client-go：onex-apiserver的 Go 语言客户端，类似于 kubernetes 的 client-go，用来高效的访问onex-apiserver；</li>
<li>Go SDK：onex-gateway的 gRPC 或 RESTful API 客户端，用来方便的访问 onex-gateway；</li>
<li>onexctl：使用命令行工具访问onex-gateway，onexctl底层调用的是 onex-gateway的 Go SDK；</li>
<li>前端：前端控制台，可视化访问 OneX 平台。</li>
</ul>
<h2 id="onex-组件功能介绍" tabindex="-1"><a class="header-anchor" href="#onex-组件功能介绍"><span>OneX 组件功能介绍</span></a></h2>
<p>上面，我们介绍了 OneX 的架构和功能流程，里面涉及到了很多组件。本小节，我来介绍下这些组件的功能。组件列表如下：</p>
<div class="hint-container tip">
<p class="hint-container-title">提示</p>
<p>提示：黑色字体是 OneX 项目新开发组件。</p>
</div>
<table>
<thead>
<tr>
<th style="text-align:center">组件名</th>
<th style="text-align:center">功能介绍</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">kubectl</td>
<td style="text-align:center">Kubernetes 命令行工具。访问 onex-apiserver 执行 OneX 内置资源的 CURD、Watch 等操作</td>
</tr>
<tr>
<td style="text-align:center">client-go</td>
<td style="text-align:center">onex-apiserver 的 Go SDK</td>
</tr>
<tr>
<td style="text-align:center">Go SDK</td>
<td style="text-align:center">onex-gateway Go 语言 SDK</td>
</tr>
<tr>
<td style="text-align:center">onexctl</td>
<td style="text-align:center">OneX 平台的命令行工具。执行各类运营指令，简化运维，方便实现运维自动化</td>
</tr>
<tr>
<td style="text-align:center">前端（未实现）</td>
<td style="text-align:center">OneX 平台前端页面</td>
</tr>
<tr>
<td style="text-align:center">onex-gateway</td>
<td style="text-align:center">OneX 管控流组件，平台后端统一入口组件。提供 HTTP/HTTPS/GRPC API 接口完成各类功能</td>
</tr>
<tr>
<td style="text-align:center">onex-usercenter</td>
<td style="text-align:center">用户中心。用来进行所有微服务的认证、授权、费用中心</td>
</tr>
<tr>
<td style="text-align:center">onex-apiserver</td>
<td style="text-align:center">kube-apiserver 风格的 apiserver。提供标准的 RESTful API 接口，用来对 Chain、MinerSet、Miner、Event、ConfigMap、Namespace、Secret、Lease 等资源进行 CURD、Watch</td>
</tr>
<tr>
<td style="text-align:center">onex-nightwatch</td>
<td style="text-align:center">分布式异步任务处理服务。作为 OneX 平台的异步任务处理引擎，执行各类异步任务</td>
</tr>
<tr>
<td style="text-align:center">onex-pump</td>
<td style="text-align:center">ETL 数据抽取服务。用来消费 Kafka 中的授权日志，处理后保存到 Mongo 中，供运营中心查询展示</td>
</tr>
<tr>
<td style="text-align:center">onex-oss-center（未实现）</td>
<td style="text-align:center">运营中心。展示各类运营数据，执行各类运营操作，例如修改配额</td>
</tr>
<tr>
<td style="text-align:center">onex-controller-manager</td>
<td style="text-align:center">OneX 项目的 Controller 聚合器。里面聚合了多种 Controller，用来完成不同的业务逻辑</td>
</tr>
<tr>
<td style="text-align:center">onex-minerset-controller</td>
<td style="text-align:center">MinerSet 控制器。解析 MinerSet Spec，根据 Spec 创建符合声明的 Miner</td>
</tr>
<tr>
<td style="text-align:center">onex-miner-controller</td>
<td style="text-align:center">Miner 控制器。解析 Miner Spe，根据 Spec 创建 Blockchain Pod，也即矿机</td>
</tr>
<tr>
<td style="text-align:center">onex-toyblc</td>
<td style="text-align:center">区块链节点初始化器。用来启动一个私有区块链节点</td>
</tr>
<tr>
<td style="text-align:center">Etcd</td>
<td style="text-align:center">onex-apiserver 后端存储、微服务服务发现</td>
</tr>
<tr>
<td style="text-align:center">Redis</td>
<td style="text-align:center">实现 Redis 分布式锁、保存授权日志、Key-Value 缓存、二级缓存</td>
</tr>
<tr>
<td style="text-align:center">MySQL</td>
<td style="text-align:center">持久化存储 aOneX 平台的各类数据。一期具有的表有：chain、miner、minerset、secret、user 等</td>
</tr>
<tr>
<td style="text-align:center">Kafka</td>
<td style="text-align:center">用来保存 onex-usercenter 产生的授权日志，供 onex-pump 消费</td>
</tr>
<tr>
<td style="text-align:center">Mongo</td>
<td style="text-align:center">用来保存清洗后端授权日志数据</td>
</tr>
<tr>
<td style="text-align:center">Infrastructure Cluster</td>
<td style="text-align:center">OneX 组件部署所在的 Kubernetes 集群</td>
</tr>
<tr>
<td style="text-align:center">Blockchain Cluster</td>
<td style="text-align:center">矿机（Pod）所在的 Kubernetes 集群</td>
</tr>
<tr>
<td style="text-align:center">onex-fakeserver</td>
<td style="text-align:center">一个 Demo 模版服务，非线上组件，用来进行功能开发、测试、验证等</td>
</tr>
<tr>
<td style="text-align:center">onex-cacheserver</td>
<td style="text-align:center">OneX 分布式缓存服务。已实现，未使用</td>
</tr>
</tbody>
</table>
<p>上述 OneX 项目各个组件是有依赖顺序的，依赖关系如下：</p>
<h2 id="onex-未来功能规划" tabindex="-1"><a class="header-anchor" href="#onex-未来功能规划"><span>OneX 未来功能规划</span></a></h2>
<p>除了上面介绍的功能外，OneX 未来还会集成更多的企业核心功能，这些功能罗列如下：</p>
<table>
<thead>
<tr>
<th style="text-align:center">阶段</th>
<th style="text-align:center">版本号</th>
<th style="text-align:center">预计上线时间</th>
<th style="text-align:left">功能列表</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">一期</td>
<td style="text-align:center">v1.x.x</td>
<td style="text-align:center">2024.04.05</td>
<td style="text-align:left">实现绝大部分 OneX 核心功能、云原生开发、微服务技术栈</td>
</tr>
<tr>
<td style="text-align:center">二期</td>
<td style="text-align:center">v2.x.x</td>
<td style="text-align:center">2025.04.05</td>
<td style="text-align:left">实现集群运维、集群可观测性（云探）、基于事件的监控告警、监控告警、日志等</td>
</tr>
<tr>
<td style="text-align:center">三期</td>
<td style="text-align:center">v3.x.x</td>
<td style="text-align:center">2026.04.05</td>
<td style="text-align:left">实现以下功能：<li>OneX 脚手架工具</li><li>OneX 费用中心</li><li>Miner 健康探测</li><li>分布式 ID</li><li>配置管理</li><li>...</li></td>
</tr>
<tr>
<td style="text-align:center">四期</td>
<td style="text-align:center">v4.x.x</td>
<td style="text-align:center">2027.04.05</td>
<td style="text-align:left">企业级 API 网关、AIOps、ChatGPT、AI 聊天室等</td>
</tr>
<tr>
<td style="text-align:center">五期</td>
<td style="text-align:center">v5.x.x</td>
<td style="text-align:center">...</td>
<td style="text-align:left">自定义 K8S 调度器、K8S 资源管理、FinOps、在离线混布、多集群管理、多集群调度等</td>
</tr>
<tr>
<td style="text-align:center">六期</td>
<td style="text-align:center">v6.x.x</td>
<td style="text-align:center">...</td>
<td style="text-align:left">Rust、企业级的区块链（Go 版）、企业级的区块链（Rust 重构版）</td>
</tr>
</tbody>
</table>
<p>OneX 项目在一开始就规划好了未来的功能演进，所以 OneX 项目从一期，便具有很高的可扩展性。</p>
<ul>
<li>一期当前已经实现；</li>
<li>二期会在 2025 年实现；</li>
<li>三期会在 2026年实现；</li>
<li>四期、五期、六期会视情况实现。</li>
</ul>
</div></template>


