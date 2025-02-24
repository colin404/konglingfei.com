---
date: 2024-01-30
title: 企业级 API 网关
icon: apigateway
star: true
order: 1
author: 孔令飞
---

# 企业级 API 网关：Tyk Brother

> 提示：项目正在开发中，GitHub 暂未开源。

Tyk Brother 是一个企业级 API 网关，该网关具备了企业需要的绝大部分网关功能，并且经过超大规模生产环境的验证。

Tyk Brother 功能列表如下：
+ <font style="color:black;">监控：请求次数、成功次数、失败次数、最后一次访问时间 （总</font><font style="color:black;">/ API </font><font style="color:black;">级别</font><font style="color:black;">/</font><font style="color:black;">秘钥）</font>
+ <font style="color:black;">服务中心：</font><font style="color:black;">etcd</font><font style="color:black;">/consul/custom</font>
+ <font style="color:black;">负载均衡</font>
+ <font style="color:black;">请求日志</font>
+ <font style="color:black;">API</font><font style="color:black;">管理：增删改查、</font><font style="color:black;">Tag</font><font style="color:black;">、启用</font><font style="color:black;">/</font><font style="color:black;">禁用</font><font style="color:black;">…</font>
+ <font style="color:black;">限流</font><font style="color:black;">\</font><font style="color:black;">熔断</font><font style="color:black;">\</font><font style="color:black;">降级 </font><font style="color:#00b050;">限流支持：密钥级别、</font><font style="color:#00b050;">API</font><font style="color:#00b050;">级别，</font><font style="color:#c55a11;">多少次</font><font style="color:#c55a11;">/</font><font style="color:#c55a11;">多少秒</font>
+ <font style="color:black;">跨域 </font><font style="color:#00b050;">支持定制化跨域设置</font>
+ <font style="color:black;">IP</font><font style="color:black;">黑白名单</font>
+ <font style="color:black;">参数校验</font>
+ <font style="color:black;">MOCK</font>
+ <font style="color:black;">Cache Request</font><font style="color:red;">（</font><font style="color:red;">GET/LIST</font><font style="color:red;">，</font><font style="color:red;">POST/PUT/DELETE Not cache</font><font style="color:red;">）</font>
+ <font style="color:black;">API</font><font style="color:black;">配置导入</font><font style="color:black;">/</font><font style="color:black;">导出</font><font style="color:black;">(JSON</font><font style="color:black;">格式</font><font style="color:black;">)</font>
+ <font style="color:black;">版本控制：</font><font style="color:black;">path/query/header</font>
+ <font style="color:black;">Request/Response修改：添加Header、修改Body、HTTP Method重定向、URL重定向</font>
+ <font style="color:black;">保留主机头</font>
+ <font style="color:black;">超时时间、Request包大小限制</font>
+ <font style="color:black;">API</font><font style="color:black;">健康检查</font>
+ <font style="color:black;">认证：</font><font style="color:black;">Basic</font><font style="color:black;">、</font><font style="color:black;">OAuth.2.0</font><font style="color:black;">、</font><font style="color:black;">JWT</font><font style="color:black;">、</font><font style="color:black;">OpenID</font><font style="color:black;">、</font><font style="color:black;">Open</font><font style="color:black;">、自定义</font><font style="color:black;">(plugin)…</font>
+ <font style="color:black;">文档</font>
+ <font style="color:black;">DEBUGGING</font>
+ <font style="color:black;">HTTPS</font><font style="color:black;">支持</font>
+ <font style="color:black;">API</font><font style="color:black;">聚合</font>
+ <font style="color:black;">Webhook</font><font style="color:black;">：</font><font style="color:black;">Notifications and Events</font>
+ <font style="color:black;">配置数据</font>
+ <font style="color:black;">支持用户自定义插件</font>
+ <font style="color:black;">Protocols</font><font style="color:black;">：</font><font style="color:black;">HTTP</font><font style="color:black;">、</font><font style="color:black;">HTTPS</font><font style="color:black;">、</font><font style="color:black;">WebSocket</font>
+ <font style="color:black;">自定义域名</font>

网关架构如下：

![](/images/API网关架构.png)
