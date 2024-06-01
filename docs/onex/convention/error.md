---
title: 错误信息返回规范
shortTitle: 错误规范
date: 2022-03-01
icon: cuowu
sticky: true
star: true
order: 4
isOriginal: true
category:
  - OneX
tag:
  - OneX
---

[OneX](https://github.com/superproj/onex) 项目使用 github.com/go-kratos/kratos/v2/errors 包来处理错误，github.com/go-kratos/kratos/v2/errors 包的解析及使用请先参考学习：[【D】Kratos errors 源码解析及使用实战](https://feizaonet.feishu.cn/wiki/JHF1wWXSLigp4nkasKDcP4wtnTc) 。

OneX 项目的错误信息遵循一定的规范，本文就来详细介绍下这些错误信息规范。
## OneX 错误信息返回规范
OneX 项目中，组件的错误返回格式如下：

---

```
HTTP/1.1 409 status code 409
Content-Length: 152
Content-Type: application/json
Date: Mon, 18 Sep 2023 23:49:29 GMT
Trace-Id: 754942ead2c206da531d8cc727c215e7

{
  "metadata": {
    "username": "colin"
  },
  "message": "User already exists",
  "reason": "UserAlreadyExists",
  "code": 409
}
```
错误返回中，各字段含义如下：

- code：错误返回对应的 HTTP Status Code。为了方便客户端识别，code应该符合 HTTP 状态码的规范。常用的 HTTP 状态码本文后半部分会介绍；
- reason：错误的原因。因为code是一个整数数值，可读性很差，所以我们通过一个简短、易读、易理解的的reason字段，来帮助调用者快速了解错误的原因。错误原因是可枚举的，相同的错误原因，代表着相同类型的错误。reason内容规范如下：
   - reason字段应该是简短、易读、易理解的英文字符串；
   - reason的格式、命名方式，在项目级别应该是一致的。
- message：错误的具体报错信息，提供给调用者更详细的报错信息。错误信息，会根据具体的报错内容而改变。message 内容规范如下：
   - 统一大写开头，结尾不要加.；
   - 错误信息要简洁，并能准确说明问题；
   - 错误信息应该是 该怎么做 而不是 哪里错了。
- metadata：可扩展的 JSON 对象，提供更多的错误上下文，例如：用户名是colin。metadata在 Go 代码中的类型为 map[string]interface{}，我们可以根据需要自定义需要返回的 key-value 对。这些 key-value 对就是这次错误的上下文；
- HTTP 状态码：为了方便客户端根据 HTTP 状态码快速判断请求是否成功，API 接口在报错时，也根据code值同步设置了 HTTP 状态码；
- Trace-Id：请求 ID，用来唯一标识一次请求。Trace-Id 是一个 32 位的 UUID。
## 常见的 HTTP 状态码
OneX 错误返回格式中的 code 字段是一个 HTTP 状态码。为了方便参考设置，这里介绍下常见的 HTTP 状态码分类及列表。

> 提示：HTTP 状态码的英文为 **HTTP Status Code**。

### HTTP 状态码分类
HTTP 状态码由三个十进制数字组成，第一个十进制数字定义了状态码的类型。响应分为五类：

- 信息响应（100–199）；
- 成功响应（200–299）；
- 重定向（300–399）；
- 客户端错误（400–499）；
- 服务器错误 （500–599）。

具体描述如下：

| **分类** | **分类描述** |
| --- | --- |
| 1XX | 指示信息，表示请求已接收，继续处理 |
| 2XX | 请求成功，表示成功处理了请求的状态代码 |
| 3XX | 请求被重定向，表示要完成请求，需要进一步操作。通常，这些状态代码用来重定向 |
| 4XX | 请求错误，这些状态代码表示请求可能出错，妨碍了服务器的处理，通常是客户端出错，需要客户端做进一步的处理 |
| 5XX | 服务器错误，这些状态代码表示服务器在尝试处理请求时发生内部错误。这些错误可能是服务器本身的错误，而不是客户端的问题 |

### HTTP 状态码列表
| **状态码** | **英文名称** | **描述** |
| --- | --- | --- |
| **指示信息** |  |  |
| 100 | Continue | 继续。客户端应继续其请求 |
| 101 | Switching Protocols | 切换协议。服务器根据客户端的请求切换协议。只能切换到更高级的协议，例如，切换到 HTTP 的新版本协议 |
| **请求成功** |  |  |
| **200** | OK | 请求成功。一般用于 GET 与 POST 请求 |
| 201 | Created | 已创建。成功请求并创建了新的资源 |
| 202 | Accepted | 已接受。已经接受请求，但未处理完成 |
| 203 | Non-Authoritative Information | 非授权信息。请求成功。但返回的 meta 信息不在原始的服务器，而是一个副本 |
| 204 | No Content | 无内容。服务器成功处理，但未返回内容。在未更新网页的情况下，可确保浏览器继续显示当前文档 |
| 205 | Reset Content | 重置内容。服务器处理成功，用户终端（例如：浏览器）应重置文档视图。可通过此返回码清除浏览器的表单域 |
| 206 | Partial Content | 部分内容。服务器成功处理了部分 GET 请求 |
| **请求被重定向** |  |  |
| 300 | Multiple Choices | 多种选择。请求的资源可包括多个位置，相应可返回一个资源特征与地址的列表用于用户终端（例如：浏览器）选择 |
| 301 | Moved Permanently | 永久移动。请求的资源已被永久的移动到新 URI，返回信息会包括新的 URI，浏览器会自动定向到新 URI。今后任何新的请求都应使用新的 URI 代替 |
| 302 | Found | 临时移动。与 301 类似。但资源只是临时被移动。客户端应继续使用原有 URI |
| 303 | See Other | 查看其它地址。与 301 类似。使用 GET 和 POST 请求查看 |
| 304 | Not Modified | 未修改。所请求的资源未修改，服务器返回此状态码时，不会返回任何资源。客户端通常会缓存访问过的资源，通过提供一个头信息指出客户端希望只返回在指定日期之后修改的资源 |
| 305 | Use Proxy | 使用代理。所请求的资源必须通过代理访问 |
| 306 | Unused | 已经被废弃的 HTTP 状态码 |
| 307 | Temporary Redirect | 临时重定向。与 302 类似。使用 GET 请求重定向 |
| **请求错误** |  |  |
| **400** | Bad Request | 客户端请求的语法错误，服务器无法理解 |
| **401** | Unauthorized | 请求要求用户的身份认证 |
| 402 | Payment Required | 保留，将来使用 |
| **403** | Forbidden | 服务器理解请求客户端的请求，但是拒绝执行此请求 |
| **404** | Not Found | 服务器无法根据客户端的请求找到资源（网页）。通过此代码，网站设计人员可设置"您所请求的资源无法找到"的个性页面 |
| 405 | Method Not Allowed | 客户端请求中的方法被禁止 |
| 406 | Not Acceptable | 服务器无法根据客户端请求的内容特性完成请求 |
| 407 | Proxy Authentication Required | 请求要求代理的身份认证，与 401 类似，但请求者应当使用代理进行授权 |
| 408 | Request Time-out | 服务器等待客户端发送的请求时间过长，超时 |
| 409 | Conflict | 服务器完成客户端的 PUT 请求时可能返回此代码，服务器处理请求时发生了冲突 |
| 410 | Gone | 客户端请求的资源已经不存在。410 不同于 404，如果资源以前有现在被永久删除了可使用 410 代码，网站设计人员可通过 301 代码指定资源的新位置 |
| 411 | Length Required | 服务器无法处理客户端发送的不带 Content-Length 的请求信息 |
| 412 | Precondition Failed | 客户端请求信息的先决条件错误 |
| 413 | Request Entity Too Large | 由于请求的实体过大，服务器无法处理，因此拒绝请求。为防止客户端的连续请求，服务器可能会关闭连接。如果只是服务器暂时无法处理，则会包含一个 Retry-After 的响应信息 |
| 414 | Request-URI Too Large | 请求的 URI 过长（URI 通常为网址），服务器无法处理 |
| 415 | Unsupported Media Type | 服务器无法处理请求附带的媒体格式 |
| 416 | Requested range not satisfiable | 客户端请求的范围无效 |
| 417 | Expectation Failed | 服务器无法满足 Expect 的请求头信息 |
| **服务器错误** |  |  |
| **500** | Internal Server Error | 服务器内部错误，无法完成请求 |
| 501 | Not Implemented | 服务器不支持请求的功能，无法完成请求 |
| 502 | Bad Gateway | 作为网关或者代理工作的服务器尝试执行请求时，从远程服务器接收到了一个无效的响应 |
| 503 | Service Unavailable | 由于超载或系统维护，服务器暂时的无法处理客户端的请求。延时的长度可包含在服务器的 Retry-After 头信息中 |
| 504 | Gateway Time-out | 充当网关或代理的服务器，未及时从远端服务器获取请求 |
| 505 | HTTP Version not supported | 服务器不支持请求的 HTTP 协议的版本，无法完成处 |

**黑色字体**表示常用的 HTTP 状态码。
## 错误处理最佳实践
在 Go 语言中，有一些常见的错误规范可以遵循，以提高代码的可读性和可维护性。以下是一些常见的错误规范：

- 使用错误变量名：在声明错误变量时，建议使用 err 作为变量名。这是一种常见的约定，可以使代码更易于阅读和理解。例如：
```go
result, err := someFunction()
if err != nil {
    // 错误处理逻辑
}
```

- 错误检查：在调用可能返回错误的函数后，应该始终检查错误。这可以通过使用 if err != nil 来实现。不要忽略错误，否则可能导致潜在的 bug 或不可预测的行为；
- 错误处理：对于遇到的错误，应该根据实际情况进行适当的处理。这可能包括日志记录、返回错误给调用者、重试操作或其他恢复策略；
- 错误类型断言：在处理多个可能的错误类型时，可以使用类型断言来检查具体的错误类型。这可以通过使用 switch 语句和类型断言来实现。例如：
```go
switch err := err.(type) {
    case *MyError:
    // 处理特定类型的错误
    case *AnotherError:
    // 处理另一个类型的错误
    default:
    // 处理其他类型的错误
}
```

- 错误包装：有时候，在处理错误时，可以使用 fmt.Errorf 函数或其他错误包装函数来添加额外的上下文信息。这可以帮助调试和定位错误的来源。例如：
```go
err = fmt.Errorf("failed to do something: %w", err)
```

这样，当错误被传递给调用者时，可以通过 %w 占位符来保留错误的原始信息。

这些错误规范可以提高代码的可读性、可维护性和错误处理的一致性。但需要根据具体的项目和团队要求，灵活地应用这些规范。
