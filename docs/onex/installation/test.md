---
title: 通过测试，了解 OneX 项目的使用方式和功能
shortTitle: 项目功能测试
date: 2023-03-01
sticky: true
star: true
headerDepth: 5
isOriginal: true
category:
  - 实战营
tag:
  - 实战营
---

::: warning 前置条件
需要 OneX 成功部署。
:::

在我们使用容器化的方式快速部署了 OneX 项目。可以看到 OneX 项目组件很多，功能丰富，为了能够让你在学习 OneX 项目前，对 OneX 的功能有一个充分的了解和体验。本节课，我会带你一步一步通过测试来体验 OneX 项目的功能。

OneX 项目有很多组件，这些组件，我们都可以进行深入细致的测试和体验。这些项目按功能类别，可以分为以下 4 类：
- **核心组件：** Go 项目开发高阶实战课功能型组件，这些组件用来完成 OneX 的核心功能；
- **云原生组件：** 跟 Kubernetes 编程相关的服务组件，这些组件会在 Kubernetes 开发实战课中详细介绍；
- **命令行组件：** Linux 命令行工具，可以很便捷的访问 OneX API Server。例如：kubectl 访问 onex-apiserver。onexctl 访问 onex-usercenter 和 onex-gateway；
- **示例组件：** 功能型组件，用来演示某个功能的具体开发、落地方法。这些组件当前不参与构建 OneX 的核心功能，也许未来会，例如 onex-cacheserver。

![OneX一期部署组件](/images/OneX一期部署组件-水印.png)

上图中，红色字体的组件是需要我们重点掌握的。

本文对每个组件会进行详尽的功能测试，你并不需要全部学习并掌握，但可以作为操作手册，走读学习，未来如果有需要可以再回头查阅，详细学习需要的部分。当然，你也可以根据个人兴趣，选择一些组件的某些功能，进行实操请求，以加深对这些组件或者 OneX 项目的了解。

## 如何测试 OneX 项目？

OneX 项目中包含很多组件，这些组件既有命令行工具，又有 HTTP 服务，还有 gRPC 服务。还有一些异步任务服务。不同类型的服务，测试的方法也不同。以下是针对每种服务类型的测试方法：
- **HTTP 服务：** 可以使用 cURL 命令或 HTTP 客户端工具，例如使用 [Postman](https://www.postman.com/)、[Insomnia](https://insomnia.rest/) 等 API 客户端工具发送 HTTP 请求，进行测试；
- **gRPC 服务：** gRPC 服务不像 HTTP 服务那样，有很多好用的工具可以用来测试。但仍然可以找到一些不错的测试工具。例如可以使用 `grpcurl` 在 Linux 命令行下测试 gRPC 接口，使用 Postman、Insomnia 客户端工具来发送 gRPC 请求；
- **命令行工具：** Linux 命令行执行该命令行工具；
- **异步任务服务：** 通过日志、功能是否被正确执行等来判断，这些组件是否正常工作。

在 Linux 系统下，因为不适合运行 Postman、Insomnia 这类优秀的带 GUI 的 API 接口测试工具，所以基本上都是 HTTP 使用 cURL 工具，gRPC 使用 grpcurl 工具来发送请求。但是在 Windows 或 MacOS 上，我们可以安装并使用 Postman、Insomnia 这类优秀的 API 接口测试工具，来高效的进行 API 接口测试。2 种方法对比如下：
1. Linux cURL/grpcurl：使用 Linux 系统提供的 `curl` / `grpcurl` 工具进行测试。优点是可以直接在 Linux 系统上发送 HTTP/gRPC 请求进行测试，并能借助于 Shell 脚本实现测试自动化。缺点是调试麻烦，API 接口管理不方便。
2. API 接口测试工具：例如 Postman、Insomnia 等。这类工具提供强大的调试、管理功能，非常适合日常开发调试使用。

为了高效的测试 OneX 项目提供的 API 接口，通常在实际开发中我会使用桌面版的 API 接口测试工具。然而，在本节课中，我将使用 cURL 命令来演示如何测试 OneX 项目的 API 接口功能，以便更全面、直观的给你展示 API 接口的请求参数和方法。

OneX 项目 Postman API 接口见：https://www.postman.com/gold-crater-394532/workspace/onex/overview。

## 核心组件功能测试

核心组件承载了 OneX 项目的核心功能，这些组件包括：
1. onex-usercenter; 
2. onex-gateway; 
3. onex-nightwatch; 
4. onex-pump; 
5. onex-toyblc; 

为了给你演示如何高效的测试 onex-usercenter 组件的 API 接口，我会介绍如何使用 Postman 进行授权接口的测试。onex-usercenter 的其他功能和其他组件，我会介绍如何使用 cURL 命令来进行 API 接口的测试。

Postman 和 Insomnia 都是非常优秀的桌面版的 API 接口测试工具，二者我选择了 Postman 工具。

### onex-usercenter 测试（Postman 测试）

本小节，我先给你演示下如何使用 Postman 测试 onex-usercenter 组件的 `/v1/auth` 接口。后面的测试就统一使用 `curl` 命令来测试。

如果你的操作系统是 Windows 或 MacOS，可以选择使用 Postman 工具来测试 API 接口。以下是使用 Postman 工具测试 API 接口的步骤：
1. 安装 Postman；
2. 配置 hosts；
3. 使用 Postman 测试 `/v1/auth` 接口。

#### 步骤 1：安装 Postman

访问 [Postman](https://www.postman.com/downloads/) 下载 Postman 安装程序，双击后根据提示安装即可。Windows 系统可访问 https://dl.pstmn.io/download/latest/win64 安装下载。

#### 步骤 2：配置 hosts

你可以手动编辑 `C:\Windows\System32\drivers\etc\hosts`（Windows）或 `/etc/hosts`（MacOS），来配置 hosts。但更推荐使用 [SwitchHosts](https://switchhosts.vercel.app/zh) 工具来配置和管理 hosts。SwitchHosts 是一款非常易用、功能强大的 hosts 修改工具。下载安装之后，配置 SwitchHosts，方法如下：

点击左上角 **+** 号，新建一个 Hosts 类型为**本地**的 hosts，Hosts 标题设置以为 **onex**，内容如下：

```
10.37.83.200 onex.usercenter.superproj.com
10.37.83.200 onex.gateway.superproj.com
10.37.83.200 onex.apiserver.superproj.com
```

其中 `10.37.83.200` 是 OneX 组件的可访问 IP 地址。

#### 步骤 3：使用 Postman 测试 `/v1/auth` 接口

1. 创建 `OneX` workspace

点击左上角的 `Workspaces` -> `Create Workspace` 按钮，新建一个名为 `OneX` Workspace。创建时 **Explore our templates** 选项中，可以选择 **API development**。

创建完之后，`OneX` Workspace 的 Collections 中会有一些 Demo API 接口，你可以使用 `Ctrl + D` 快捷键 Duplicate 这些 API 接口，改成自己将要测试的接口。

2. 创建 collections

Postman 支持 collections 和 folder，OneX 项目下也有多个 Web 服务，每个 Web 服务又有多个资源，每个资源又包含多个 API 接口。为了能够使用 Postman 高效便捷的管理这些 API 接口，OneX 项目 API 接口和 Postman collections、folder 映射关系如下：

![OneX Postman Collection 映射](/images/OneX_Postman_Collection_映射-水印.png)

OneX 项目的所有 API 接口都位于 OneX Workspace 中，这样你在测试 OneX 项目 API 接口时，就不用在不同的 Workspace 中来回切换。切换 Workspace 的体验和成本相对较高；

OneX 项目包含了多个 Web 服务，为了便于管理，每个服务一个 collection。每个服务下又有多个资源，为了便于统一管理资源，每个资源一个 folder，folder 中包含了该资源的所有待测 API 接口。

所以，这里我们需要创建 `onex-usercenter` collection 和 `Auth` 资源目录，并在目录中创建 Auth 资源支持的 API 接口。

3. 配置 Workspace 级别环境变量

要访问 OneX API 接口，需要指定访问地址，因为访问地址和端口可能会变动，我们可以将访问地址配置成环境变量，这样其他地方直接使用固定的环境变量名即可，如果地址有变动，直接修改环境变量的值，所有引用的地方不需要再修改。

点击 **Environments** 选项卡，点击左上角的 **+** 号，创建一个 Development 环境，并设置以下环境变量：

```
onex.usercenter.superproj.com=onex.usercenter.superproj.com:50843
onex.gateway.superproj.com=onex.gateway.superproj.com:51843
onex.apiserver.superproj.com=onex.apiserver.superproj.com:52443
```
设置界面如下图所示：

![Postman环境变量](/images/Postman环境变量.png)


环境变量表单值如下：

| Variable | Type | Initial value | Current Value |
| :----: | :----: | :----: | :----|
|onex.usercenter.superproj.com|default|onex.usercenter.superproj.com:50843|onex.usercenter.superproj.com:50843|
|onex.gateway.superproj.com|default|onex.gateway.superproj.com:51843|onex.gateway.superproj.com:51843|
|language|default|en|en|
|token|default|||

4. 测试 onex-usercenter组件，auth 资源相关接口

##### 1）创建用户

创建用户的 RESTful API 接口为 [POST /v1/users](https://www.postman.com/gold-crater-394532/workspace/onex/request/1225481-6cf290da-96aa-4c6b-8358-866387f130b4?ctx=documentation)（打开链接，查看 Postman API 接口设置）。

![CreateUser接口](/images/CreateUser接口.png)


需要注意的设置项如下：
1. 在执行请求前，需要选择 `Development` 环境；
2. 需要设置以下请求头：
  1. `Content-Type: application/json`；
  2. `Accept-Language: {{language}}`。

HTTP 请求设置如下：
- 请求 Body：

```json
{
    "username": "colin",
    "password": "onex(#)666",
    "nickname": "colin",
    "realName": "孔令飞",
    "email": "colin404@foxmail.com",
    "phone": "1812884xxxx"
}
```
- 请求方法：`POST`；
- 请求路径：`{{onex.usercenter.superproj.com}}/v1/users`。

设置好后，点击 **Send** 发送创建 `colin` 用户请求。如果 Postman 返回 Body 为 `{}`，说明创建用户成功。

##### 2）登录用户

创建用户之后，我们就可以登录用户，获取 RefreshToken 和 AccessToken，并使用 RefreshToken 和 AccessToken 访问系统。

用户登录的 RESTful API 接口为 [POST /v1/auth/login](https://www.postman.com/gold-crater-394532/workspace/onex/request/1225481-4db7f306-3f16-4908-858d-8cbec9eaf6a2?ctx=documentation)。

![Login接口](/images/Login接口.png)

HTTP 请求设置如下：
- 请求 Body：

```json
{
    "username": "colin",
    "password": "onex(#)666"
}
```
- 请求方法：`POST`；
- 请求路径：`{{onex.usercenter.superproj.com}}/v1/auth/login`。

设置好后，点击 **Send** 发送登录用户请求。Postman 返回 Body 如下：

```json
{
    "refreshToken": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJvbmV4LXVzZXJjZW50ZXIiLCJzdWIiOiJ1c2VyLW1nbXB2ciIsImV4cCI6MTcwNTU1NzA4NCwibmJmIjoxNzA1NDcwNjg0LCJpYXQiOjE3MDU0NzA2ODR9.mlH17GCgGBtbNjbep__HZna7Oz3cTpYtsQNEx7g4kJ3_u9-zS3ASmfmpF3CU5bpvQcCSiULjwV5MQC58LkLosA",
    "accessToken": "eyJhbGciOiJIUzUxMiIsImtpZCI6IjI1ZWQ5OTg1LTAyMTUtNDA0Ni1iYjY3LTkwMDIyNjZhMGQwNyIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJvbmV4LXVzZXJjZW50ZXIiLCJzdWIiOiJ1c2VyLW1nbXB2ciIsImV4cCI6MTcwNTQ3Nzg4NCwibmJmIjoxNzA1NDcwNjg0LCJpYXQiOjE3MDU0NzA2ODR9.x6fDgvPK-xSHyHoMv0K-PuoZtvZpHo3QGfdGTRkIGEll2V9AdmJEgtWyNXB4w7cJHxb4i_CL2U31XDEjvuhVXA",
    "type": "Bearer",
    "expiresAt": "1705477884"
}
```

之后，我们就可以使用 `refreshToken` 和 `accessToke` 访问 OneX 系统。

这里，我们可以将 `refreshToken` 保存在 `Development` 环境中的 `token` 环境变量中，这样其他接口可以直接使用 `token` 环境变量来设置 Token 认证信息。

##### 3）请求认证

请求认证的 RESTful API 接口为 [POST /v1/auth/authenticate](https://www.postman.com/gold-crater-394532/workspace/onex/request/1225481-4d9aa1e2-7f59-45a2-bfb3-627ba8bf264f?ctx=documentation)。

![Authenticate接口](/images/Authenticate接口.png)

HTTP 请求设置如下：
- 请求 Body：

```json
{
    "token": "eyJhbGciOiJIUzUxMiIsImtpZCI6IjI1ZWQ5OTg1LTAyMTUtNDA0Ni1iYjY3LTkwMDIyNjZhMGQwNyIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJvbmV4LXVzZXJjZW50ZXIiLCJzdWIiOiJ1c2VyLW1nbXB2ciIsImV4cCI6MTcwNTQ3Nzg4NCwibmJmIjoxNzA1NDcwNjg0LCJpYXQiOjE3MDU0NzA2ODR9.x6fDgvPK-xSHyHoMv0K-PuoZtvZpHo3QGfdGTRkIGEll2V9AdmJEgtWyNXB4w7cJHxb4i_CL2U31XDEjvuhVXA"
}
```
  - `token` 为`POST /v1/auth/login` 接口返回 Body 中的 `accessToken` 字段。
- 请求方法：`POST`；
- 请求路径：`{{onex.usercenter.superproj.com}}/v1/auth/authenticate`。

设置好后，点击 **Send** 发送登录用户请求。Postman 返回 Body 如下：

```json
{
    "userID": "user-mgmpvr"
}
```

- `userID` 为 `colin` 用户的唯一用户 ID 标识。

##### 4）请求授权

请求授权的 RESTful API 接口为 [POST /v1/auth/authorize](https://www.postman.com/gold-crater-394532/workspace/onex/request/1225481-27e4b6cf-fb78-48c5-97da-9a7f7623447a?ctx=documentation)。

![Authorize接口](/images/Authorize接口.png)

HTTP 请求设置如下：
- 请求 Body：

```json
{
    "sub": "colin",
    "obj": "testminer",
    "act": "delete"
}
```
  - `sub`：访问主体；
  - `obj`：访问的资源对象；
  - `act`：对访问资源对象的操作。
- 请求方法：`POST`；
- 请求路径：`{{onex.usercenter.superproj.com}}/v1/auth/authorize`。

设置好后，点击 **Send** 发送登录用户请求。Postman 返回 Body 如下：

```json
{
    "allowed": true
}
```
- `allowed` 为 `true` 说明请求资源授权通过，为 `false` 说明请求资源授权不通过。

##### 5）认证授权

认证授权的 RESTful API 接口为 [POST /v1/auth/auth](https://www.postman.com/gold-crater-394532/workspace/onex/request/1225481-fdbc0571-221a-431e-bb2c-b070361004a9?ctx=documentation)。

![Auth接口](/images/Auth接口.png)

HTTP 请求设置如下：
- 请求 Body：

```json
{
    "token": "eyJhbGciOiJIUzUxMiIsImtpZCI6IjI1ZWQ5OTg1LTAyMTUtNDA0Ni1iYjY3LTkwMDIyNjZhMGQwNyIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJvbmV4LXVzZXJjZW50ZXIiLCJzdWIiOiJ1c2VyLW1nbXB2ciIsImV4cCI6MTcwNTQ3Nzg4NCwibmJmIjoxNzA1NDcwNjg0LCJpYXQiOjE3MDU0NzA2ODR9.x6fDgvPK-xSHyHoMv0K-PuoZtvZpHo3QGfdGTRkIGEll2V9AdmJEgtWyNXB4w7cJHxb4i_CL2U31XDEjvuhVXA",
    "obj": "testminer",
    "act": "delete"
}
```
  - `token`：`POST /v1/auth/login` 接口返回的 `accessToken` 字段；
  - `obj`：访问的资源对象；
  - `act`：对访问资源对象的操作。
- 请求方法：`POST`；
- 请求路径：`{{onex.usercenter.superproj.com}}/v1/auth/auth`。

设置好后，点击 **Send** 发送登录用户请求。Postman 返回 Body 如下：

```json
{
    "userID": "user-mgmpvr",
    "allowed": true
}
```
- `allowed` 为 `true` 说明请求资源授权通过，为 `false` 说明请求资源授权不通过；
- `userID` 为 `colin` 用户的后端唯一 ID 标识。

##### 6）刷新 Token

刷新 Token 的 RESTful API 接口为 [POST /v1/auth/refresh-token](https://www.postman.com/gold-crater-394532/workspace/onex/request/1225481-17eb1cbd-bc24-450d-b3f9-4509a9cffd4e?ctx=documentation)。

![RefreshToken接口](/images/RefreshToken接口.png)

需要注意的设置项如下：

1. 需要设置以下请求头：
  1. `Authorization: Bearer {{token}}`; 
  
HTTP 请求设置如下：
- 请求 Body：
```json
{}
```
- 请求方法：`POST`；
- 请求路径：`{{onex.usercenter.superproj.com}}/v1/auth/refresh-token`。

设置好后，点击 **Send** 发送登录用户请求。Postman 返回 Body 如下：
```json
{
    "refreshToken": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJvbmV4LXVzZXJjZW50ZXIiLCJzdWIiOiJ1c2VyLW1nbXB2ciIsImV4cCI6MTcwNTU2MTgxNSwibmJmIjoxNzA1NDc1NDE1LCJpYXQiOjE3MDU0NzU0MTV9.1MS6CSS_jTkqovD6iul4ibOZ1Kh-jUx_ZZAh18RiKRRHErGbmkIqkJ0kdqhlu9REa8H43-1iiBJpoWJUrs7JSg",
    "accessToken": "eyJhbGciOiJIUzUxMiIsImtpZCI6IjI1ZWQ5OTg1LTAyMTUtNDA0Ni1iYjY3LTkwMDIyNjZhMGQwNyIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJvbmV4LXVzZXJjZW50ZXIiLCJzdWIiOiJ1c2VyLW1nbXB2ciIsImV4cCI6MTcwNTQ4MjYxNSwibmJmIjoxNzA1NDc1NDE1LCJpYXQiOjE3MDU0NzU0MTV9.7QIBZ0u_T9Vo5RfEYZ6Kv1FloQaalznOQy1BofXx2Q9HXnoIcXIRLD-ADtHtpV53LFSeyGyebGPjXZ8c6BRXcQ",
    "type": "Bearer",
    "expiresAt": "1705482615"
}
```
- `allowed` 为 `true` 说明请求资源授权通过，为 `false` 说明请求资源授权不通过；
- `userID` 为 `colin` 用户的后端唯一 ID 标识。

需要注意：因为我们刷新了 Token，所以需要将新的 `refreshToken` 值设置到 `Development` 环境的 `token` 环境变量中。

##### 7）用户登出

用户登出的 RESTful API 接口为 [POST /v1/auth/logout](https://www.postman.com/gold-crater-394532/workspace/onex/request/1225481-23a0dff3-2507-4ba9-b8b7-b25adceb9860?ctx=documentation)。

![Logout接口](/images/Logout接口.png)

需要注意的设置项如下：

1. 需要设置以下请求头：
  1. `Authorization: Bearer {{token}}`;
  
HTTP 请求设置如下：
- 请求 Body：
```json
{}
```
- 请求方法：`POST`；
- 请求路径：`{{onex.usercenter.superproj.com}}/v1/auth/logout`。

设置好后，点击 **Send** 发送登录用户请求。Postman 返回 Body 如下：
```json
{}
```

### onex-usercenter 测试（Linux `curl` 命令）

上面，我给你演示了如何使用 Postman 测试 onex-usercenter 的 `/v1/auth` 接口。本小节，我再给你展示下如何在 Linux 系统下使用 `curl` 命令测试 onx-usercenter 的其他接口。

因为使用 `curl` 命令，能够给你展示所有的请求参数和请求结果，所以之后测试都会使用 `curl` 命令来测试。在你实际的开发中，你可以选择使用 Postman。

在之前的课程中，我们配置了 Linux hosts 文件，如果还没配置，可以执行以下命令来配置：

```bash
$ sudo tee -a /etc/hosts <<'EOF'

# host configs for onex project
127.0.0.1 onex.usercenter.superproj.com
127.0.0.1 onex.gateway.superproj.com
127.0.0.1 onex.apiserver.superproj.com
EOF
```

#### 1）用户：创建用户

执行以下命令创建用户：

```bash
$ curl http://onex.usercenter.superproj.com:50843/v1/users -H'Content-Type: application/json' -d'{"username":"colin","password":"onex(#)666","nickname":"colin","realName":"孔令飞","email":"colin404@foxmail.com","phone":"1812884xxxx"}'
{}
```

登录用户，并设置 `token` 环境变量，后面的请求需要使用该 `token`，以通过 onex-usercenter 的请求认证。`token` 设置命令如下：

```bash
$ token=$(curl -s -XPOST -H'Content-Type: application/json' http://onex.usercenter.superproj.com:50843/v1/auth/login -d'{"username":"colin","password":"onex(#)666"}'|jq -r .refreshToken)
```

#### 2）用户：列出用户

执行以下命令列出用户：

```bash
$ curl 'http://onex.usercenter.superproj.com:50843/v1/users?offset=0&limit=10' -H"Authorization: Bearer ${token}"
{"code":400,"reason":"InvalidParameter","message":"Only `admin` user can perform list operations","metadata":{}}
```

上述请求会报 `Only admin user can perform list operations` 错误，这是符合预期的。因为，出于安全考虑，只有 `admin` 用户才有权限获取 OneX 平台中的用户列表。

这里，我们可以使用 `admin` 用户登录 onex-userceneter 并使用 `admin` 用户的 `refreshToken` 来访问 `GET /v1/users` 接口，命令如下：

```bash
$ admin_token=$(curl -s -XPOST -H'Content-Type: application/json' http://onex.usercenter.superproj.com:50843/v1/auth/login -d'{"username":"admin","password":"onex(#)666"}'|jq -r .refreshToken)
$ curl 'http://onex.usercenter.superproj.com:50843/v1/users?offset=0&limit=10' -H"Authorization: Bearer ${admin_token}"
{"totalCount":"2","Users":[{"userID":"user-4ti5t9","username":"colin","nickname":"colin","password":"******","email":"colin404@foxmail.com","phone":"1812884xxxx","secrets":"1","createdAt":"2024-01-17T00:36:57Z","updatedAt":"2024-01-17T08:36:57Z"},{"userID":"user-admin","username":"admin","nickname":"admin","password":"******","email":"colin404@foxmail.com","phone":"181X","secrets":"0","createdAt":"2024-01-16T21:32:27Z","updatedAt":"2024-01-16T21:32:27Z"}]}
```

#### 3）用户：获取用户详情

执行以下命令，获取用户详情：

```bash
$ curl http://onex.usercenter.superproj.com:50843/v1/users/colin -H"Authorization: Bearer ${token}"
{"userID":"user-4ti5t9","username":"colin","nickname":"colin","password":"******","email":"colin404@foxmail.com","phone":"1812884xxxx","secrets":"0","createdAt":"2024-01-17T00:36:57Z","updatedAt":"2024-01-17T08:36:57Z"}
```

#### 4）用户：更新用户信息

请求 `PUT /v1/users/colin` 接口，修改邮箱地址为 `colin_modified@foxmail.com`，命令如下：

```bash
$ curl -XPUT http://onex.usercenter.superproj.com:50843/v1/users/colin -H"Authorization: Bearer ${token}" -H'Content-Type: application/json' -d'{"email": "colin_modified@foxmail.com"}'
```

请求 `GET /v1/users/colin` 接口，获取用户详情，确认邮箱地址是否被成功修改，命令如下：

```bash
$ curl http://onex.usercenter.superproj.com:50843/v1/users/colin -H"Authorization: Bearer ${token}"
{"userID":"user-4ti5t9","username":"colin","nickname":"colin","password":"******","email":"colin_modified@foxmail.com","phone":"1812884xxxx","secrets":"0","createdAt":"2024-01-17T00:36:57Z","updatedAt":"2024-01-17T09:20:18Z"}
```

可以看到邮箱地址已经被成功修改为 `colin_modified@foxmail.com`。

#### 5）用户：修改用户密码

执行以下命令修改密码：

```bash
$ curl -XPUT http://onex.usercenter.superproj.com:50843/v1/users/colin/update-password -H"Authorization: Bearer ${token}" -H'Content-Type: application/json' -d'{"oldPassword":"onex(#)666","newPassword":"onex(#)888"}'
```

注意修改密码后，需要登出用户，使之前使用的 `token` 过期，并使用新的密码，再次登录系统，并设置 `token`，命令如下：

```bash
$ curl -XPOST -H"Authorization: Bearer ${token}" -H'Content-Type: application/json' http://onex.usercenter.superproj.com:50843/v1/auth/logout
$ token=$(curl -s -XPOST -H'Content-Type: application/json' http://onex.usercenter.superproj.com:50843/v1/auth/login -d'{"username":"colin","password":"onex(#)888"}'|jq -r .refreshToken)
```

#### 6）用户：删除用户

删除用户接口是个幂等操作，接口请求命令如下：

```bash
$ curl -XDELETE http://onex.usercenter.superproj.com:50843/v1/users/colin -H"Authorization: Bearer ${token}"
```

#### 7）密钥：创建密钥

要测试密钥，我们需要先创建一个用户，并登录 onex-usercenter，命令如下：

```bash
$ curl http://onex.usercenter.superproj.com:50843/v1/users -H'Content-Type: application/json' -d'{"username":"colin","password":"onex(#)666","nickname":"colin","realName":"孔令飞","email":"colin404@foxmail.com","phone":"1812884xxxx"}'
$ token=$(curl -s -XPOST -H'Content-Type: application/json' http://onex.usercenter.superproj.com:50843/v1/auth/login -d'{"username":"colin","password":"onex(#)666"}'|jq -r .refreshToken)
```
登录后，将 `refreshToken` 保存在 `token` 环境变量中，方便后续访问。

创建密钥命令如下：

```bash
$ curl -XPOST http://onex.usercenter.superproj.com:50843/v1/secrets -H"Authorization: Bearer ${token}" -H'Content-Type: application/json' -d'{"name":"secret0","expires":0,"description":"tester secret"}'
{}
```

#### 8）密钥：列出密钥

```bash
$ curl http://onex.usercenter.superproj.com:50843/v1/secrets -H"Authorization: Bearer ${token}"
{"totalCount":"2","Secrets":[{"userID":"user-k7ejrq","name":"secret0","secretID":"5c5163b8-a8e9-4ca0-b682-dce215f45d8b","secretKey":"f5fff34d-9aec-4c70-8902-e2b44d2454b5","expires":"0","status":1,"description":"tester secret","createdAt":"2024-01-17T01:44:26Z","updatedAt":"2024-01-17T01:44:26Z"},{"userID":"user-k7ejrq","name":"generated","secretID":"23a0939c-5b18-4055-95db-b64885dc301b","secretKey":"0e039821-1b24-4c3b-8c11-8cab7b7f318a","expires":"0","status":1,"description":"automatically generated when user is created","createdAt":"2024-01-17T01:41:58Z","updatedAt":"2024-01-17T01:41:58Z"}]}
```

#### 9）密钥：获取密钥详情

```bash
$ curl http://onex.usercenter.superproj.com:50843/v1/secrets/secret0 -H"Authorization: Bearer ${token}"
{"userID":"user-k7ejrq","name":"secret0","secretID":"5c5163b8-a8e9-4ca0-b682-dce215f45d8b","secretKey":"f5fff34d-9aec-4c70-8902-e2b44d2454b5","expires":"0","status":1,"description":"tester secret","createdAt":"2024-01-17T01:44:26Z","updatedAt":"2024-01-17T01:44:26Z"}
````

#### 10）密钥：更新密钥信息

```bash
$ curl -XPUT http://onex.usercenter.superproj.com:50843/v1/secrets/secret0 -H"Authorization: Bearer ${token}" -H'Content-Type: application/json' -d'{"expires":4072326717,"description":"tester secret(modified)"}'
```

再次获取密钥详情，查看密钥描述是否被成功修改：

```bash
$ curl http://onex.usercenter.superproj.com:50843/v1/secrets/secret0 -H"Authorization: Bearer ${token}"
```

可以看到密钥描述，被成功修改为 `tester secret(modified)`。

#### 11）密钥：删除密钥

删除密钥接口是个幂等操作，接口请求命令如下：

```bash
$ curl -XDELETE http://onex.usercenter.superproj.com:50843/v1/secrets/secret0 -H"Authorization: Bearer ${token}"
```

### 测试 onex-gateway 组件

要测试 onex-gateway 组件，我们需要先创建一个用户，并登录 onex-usercenter，命令如下：

```bash
# 如果用户已存在，则跳过创建用户步骤即可
$ user_id=$(curl -s http://onex.usercenter.superproj.com:50843/v1/users -H'Content-Type: application/json' -d'{"username":"colin","password":"onex(#)666","nickname":"colin","realName":"孔令飞","email":"colin404@foxmail.com","phone":"1812884xxxx"}' | jq -r .userID)
$ token=$(curl -s -XPOST -H'Content-Type: application/json' http://onex.usercenter.superproj.com:50843/v1/auth/login -d'{"username":"colin","password":"onex(#)666"}'|jq -r .accessToken)
```

登录后，将 `accessToken` 保存在 `token` 环境变量中，方便后续访问。注意，这里需要使用 `accessToken` 访问 onex-gateway 组件，onex-gateway 在收到请求后，会透传 `accessToken` 给 onex-usercenter 组件，进行认证和鉴权。如果成功才允许操作。

创建矿机池和矿机，还需要创建一个 `genesis` 创世区块链，创建命令如下：

```bash
$ export KUBECONFIG=${ONEX_ADMIN_KUBECONFIG}
$ kubectl create -f ${ONEX_ROOT}/manifests/sample/onex/chain.yaml
```

#### 1）矿机池：创建矿机池

创建矿机池命令如下：

```bash
$ idempotent_token=$(curl -s http://onex.gateway.superproj.com:51843/v1/idempotents -H"Authorization: Bearer ${token}" | jq -r .token)
$ curl -XPOST http://onex.gateway.superproj.com:51843/v1/minersets -H"X-Idempotent-ID: ${idempotent_token}" -H"Authorization: Bearer ${token}" -H'Content-Type: application/json' -d'{"apiVersion":"apps.onex.io/v1beta1","kind":"MinerSet","metadata":{"name":"minerset0"},"spec":{"deletePolicy":"Random","displayName":"test-minerset","replicas":2,"template":{"spec":{"chainName":"genesis","minerType":"M1.MEDIUM2"}}}}'
```

可以使用 `kubectl` 命令检查 MinerSet 资源是否成功创建：

```bash
$ kubectl -n ${user_id} get minerset
NAME          READY   CURRENT   AVAILABLE   AGE
minerset0   0/2     0         0           106s
$ kubectl -n ${user_id} get miner # 可以看到矿机也被成功创建，并且处在 Running 状态
NAME                STATUS    AGE
minerset0-2pfrt   Running   7s
minerset0-lcnfs   Running   7s
```

可以看到 MinerSet 资源被成功创建。

#### 2）矿机池：矿机池列表

获取矿机池列表命令如下：

```bash
$ curl 'http://onex.gateway.superproj.com:51843/v1/minersets?offset=0&limit=10' -H"Authorization: Bearer ${token}"
{"totalCount":"1", "MinerSets":[{"name":"minerset0", "replicas":2, "displayName":"test-minerset", "deletePolicy":"Random", "MinerTemplate":null, "createdAt":"2024-01-17T05:08:19Z", "updatedAt":"2024-01-17T13:32:06Z"}]}
```

#### 3）矿机池：获取矿机池详细信息

获取矿机池详细信息命令如下：

```bash
$ curl 'http://onex.gateway.superproj.com:51843/v1/minersets/minerset0' -H"Authorization: Bearer ${token}"
{"metadata":{"name":"minerset0","namespace":"user-k7ejrq","uid":"dc14f3d4-08c7-43e6-8963-05351d585ff1","resourceVersion":"315","generation":1,"creationTimestamp":"2024-01-17T13:08:19Z","labels":{"apps.onex.io/chain-name":"genesis"},"managedFields":[{"manager":"onex-gateway","operation":"Update","apiVersion":"apps.onex.io/v1beta1","time":"2024-01-17T13:08:19Z","fieldsType":"FieldsV1","fieldsV1":{"f:spec":{"f:deletePolicy":{},"f:displayName":{},"f:replicas":{},"f:template":{"f:spec":{"f:chainName":{},"f:minerType":{}}}}}},{"manager":"onex-minerset-controller","operation":"Update","apiVersion":"apps.onex.io/v1beta1","time":"2024-01-17T13:27:21Z","fieldsType":"FieldsV1","fieldsV1":{"f:metadata":{"f:labels":{".":{},"f:apps.onex.io/chain-name":{}}}}},{"manager":"onex-minerset-controller","operation":"Update","apiVersion":"apps.onex.io/v1beta1","time":"2024-01-17T13:32:06Z","fieldsType":"FieldsV1","fieldsV1":{"f:status":{"f:availableReplicas":{},"f:fullyLabeledReplicas":{},"f:observedGeneration":{},"f:readyReplicas":{},"f:replicas":{}}},"subresource":"status"}]},"spec":{"replicas":2,"selector":{},"template":{"metadata":{},"spec":{"metadata":{},"minerType":"M1.MEDIUM2","chainName":"genesis"}},"displayName":"test-minerset","deletePolicy":"Random"},"status":{"replicas":2,"fullyLabeledReplicas":2,"readyReplicas":2,"availableReplicas":2,"observedGeneration":1,"conditions":[{"type":"Ready","status":"True","severity":"","lastTransitionTime":"2024-01-17T13:32:06Z"},{"type":"MinersCreated","status":"True","severity":"","lastTransitionTime":"2024-01-17T13:27:21Z"},{"type":"Resized","status":"True","severity":"","lastTransitionTime":"2024-01-17T13:32:06Z"}]}}
```

#### 4）矿机池：更新矿机池

更新矿机池命令如下：

```bash
$ curl -XPUT 'http://onex.gateway.superproj.com:51843/v1/minersets' -H"Authorization: Bearer ${token}" -H'Content-Type: application/json' -d'{"metadata":{"name":"minerset0"},"spec":{"replicas":2,"template":{"spec":{"minerType":"M1.MEDIUM2","chainName":"genesis"}},"displayName":"test-minerset-modified"}}'
```

使用 `kubectl` 命令查看 `minerset0` MinerSet 资源的 `displayName` 字段是否被成功更新：

```bash
$ kubectl -n ${user_id} get ms minerset0 -oyaml | grep displayName
  displayName: test-minerset-modified
```
`displayName` 字段被成功更新为 `test-minerset-modified`，说明接口正常工作。

#### 5）矿机池：扩缩容矿机池

扩缩容矿机池命令如下：

```bash
$ curl -XPUT 'http://onex.gateway.superproj.com:51843/v1/minersets/minerset0/scale' -H"Authorization: Bearer ${token}" -H'Content-Type: application/json' -d'{"replicas":3}'
```

使用 `kubectl` 来查看 `minerset0` 矿机池是否成功被扩容成 `3` 个副本：

```bash
$ kubectl -n ${user_id} get mi|grep minerset0
minerset0-2pfrt   Running   15m
minerset0-lcnfs   Running   15m
minerset0-z4ckw   Running   14s
```

可以看到，`minerset0` 矿机池，扩容成功。

#### 8）矿机池：删除矿机池

删除矿机池命令如下：

```bash
$ curl -XDELETE http://onex.gateway.superproj.com:51843/v1/minersets/minerset0 -H"Authorization: Bearer ${token}"
```

使用 `kubectl` 来查看 `minerset0` 矿机池是否被成功删除，命令如下：

```bash
$ kubectl -n ${user_id} get minerset
No resources found in user-k7ejrq namespace.
$ kubectl -n ${user_id} get miner
No resources found in user-k7ejrq namespace.
```

可以看到矿机池和池子中的矿机均被成功删除。

#### 9）矿机：创建矿机

OneX 项目支持单独创建一个游离的矿机（游离的矿机：不属于任何矿机池）。接下来，我们来看下如何通过 onex-gateway 来操作矿机。

创建游离的矿机命令如下：

```bash
$ idempotent_token=$(curl -s http://onex.gateway.superproj.com:51843/v1/idempotents -H"Authorization: Bearer ${token}" | jq -r .token)
$ curl -XPOST http://onex.gateway.superproj.com:51843/v1/miners -H"X-Idempotent-ID: ${idempotent_token}" -H"Authorization: Bearer ${token}" -H'Content-Type: application/json' -d'{"metadata":{"name":"miner0"},"spec":{"chainName":"genesis","minerType":"M1.MEDIUM2"},"apiVersion":"apps.onex.io/v1beta1","kind":"Miner"}'
```

检查矿机是否被成功创建：

```bash
$ kubectl -n ${user_id} get miner | grep miner0
miner0   Running   28s
```

可以看到，矿机被成功创建。

#### 10）矿机：矿机列表

获取矿机列表命令如下：

```bash
$ curl 'http://onex.gateway.superproj.com:51843/v1/miners?offset=0&limit=10' -H"Authorization: Bearer ${token}"
{"totalCount":"1", "Miners":[{"name":"miner0", "displayName":"", "minerType":"M1.MEDIUM2", "chainName":"genesis", "dataDir":"", "status":"", "createdAt":"2024-01-17T06:22:13Z", "updatedAt":"2024-01-17T14:22:13Z"}]}
```

#### 11）矿机：获取矿机详情

获取矿机详情命令如下：

```bash
$ curl 'http://onex.gateway.superproj.com:51843/v1/miners/miner0' -H"Authorization: Bearer ${token}"
{"metadata":{"name":"miner0","generateName":"mi-","namespace":"user-k7ejrq","uid":"997e6b0a-873e-42ff-838d-64eff645d347","resourceVersion":"357","generation":1,"creationTimestamp":"2024-01-17T14:22:13Z","annotations":{"apps.onex.io/memoryMb":"2Gi","apps.onex.io/vCPU":"200m"},"finalizers":["miner.onex.io/finalizer"],"managedFields":[{"manager":"onex-gateway","operation":"Update","apiVersion":"apps.onex.io/v1beta1","time":"2024-01-17T14:22:13Z","fieldsType":"FieldsV1","fieldsV1":{"f:metadata":{"f:generateName":{}},"f:spec":{"f:chainName":{},"f:minerType":{}}}},{"manager":"onex-miner-controller","operation":"Update","apiVersion":"apps.onex.io/v1beta1","time":"2024-01-17T14:22:13Z","fieldsType":"FieldsV1","fieldsV1":{"f:metadata":{"f:annotations":{".":{},"f:apps.onex.io/memoryMb":{},"f:apps.onex.io/vCPU":{}},"f:finalizers":{".":{},"v:\"miner.onex.io/finalizer\"":{}}}}},{"manager":"onex-miner-controller","operation":"Update","apiVersion":"apps.onex.io/v1beta1","time":"2024-01-17T14:22:13Z","fieldsType":"FieldsV1","fieldsV1":{"f:status":{"f:lastUpdated":{},"f:observedGeneration":{},"f:phase":{},"f:podRef":{}}},"subresource":"status"}]},"spec":{"metadata":{},"minerType":"M1.MEDIUM2","chainName":"genesis"},"status":{"podRef":{"kind":"Pod","namespace":"user-k7ejrq","name":"miner0","uid":"d914060f-ae73-47c0-b205-5bd425c66d70","apiVersion":"v1"},"lastUpdated":"2024-01-17T14:22:13Z","phase":"Running","observedGeneration":1,"conditions":[{"type":"PodHealthy","status":"True","severity":"","lastTransitionTime":"2024-01-17T14:22:13Z"}]}}
```

#### 12）矿机：更新矿机信息

更新矿机信息命令如下：

```bash
$ curl -XPUT 'http://onex.gateway.superproj.com:51843/v1/miners' -H"Authorization: Bearer ${token}" -H'Content-Type: application/json' -d'{"metadata":{"name":"miner0"},"spec":{"chainName":"genesis","minerType":"M1.MEDIUM2","displayName":"test-for-gateway"},"apiVersion":"apps.onex.io/v1beta1","kind":"Miner"}'
```

检查 `miner0` Miner 是否被成功更新：

```bash
$ kubectl -n ${user_id} get miner miner0 -oyaml|grep displayName
  displayName: test-for-gateway
```

可以看到 Miner 资源被成功更新。

#### 13）矿机：删除矿机

删除矿机命令如下：

```bash
$ curl -XDELETE http://onex.gateway.superproj.com:51843/v1/miners/miner0 -H"Authorization: Bearer ${token}"
```

检查资源是否被成功删除：

```bash
$ kubectl -n ${user_id} get miner miner0
Error from server (NotFound): miners.apps.onex.io "miner0" not found
```

可以看到，资源被成功删除。

### 测试 onex-nightwatch 组件

onex-nightwatch 是 OneX 平台的异步任务调度引擎，你可以根据需要便捷的注册你需要的异步任务。当前 onex-nightwatch 中只注册了一个异步任务处理逻辑：删除过期的密钥。如果密钥过期，onex-nightwatch 不会立即删除，而是要等过期 7 天后才删除。

所以，我们可以创建一个 7 天前已经过期的密钥，30s 后查看该密钥是否被删除，来测试 onex-nightwatch 是否正常工作。

1. 创建一个 7 天前已经过期的密钥

要创建密钥，我们需要先创建一个用户，并登录 onex-usercenter，命令如下：

```bash
$ curl http://onex.usercenter.superproj.com:50843/v1/users -H'Content-Type: application/json' -d'{"username":"colin","password":"onex(#)666","nickname":"colin","realName":"孔令飞","email":"colin404@foxmail.com","phone":"1812884xxxx"}'
$ token=$(curl -s -XPOST -H'Content-Type: application/json' http://onex.usercenter.superproj.com:50843/v1/auth/login -d'{"username":"colin","password":"onex(#)666"}'|jq -r .refreshToken)
```

登录后，将 `refreshToken` 保存在 `token` 环境变量中，方便后续访问。

创建密钥命令如下：

```bash
$ curl -XPOST http://onex.usercenter.superproj.com:50843/v1/secrets -H"Authorization: Bearer ${token}" -H'Content-Type: application/json' -d'{"name":"secret0","expires":'$(date -d "8 days ago" +%s)',"description":"tester secret"}'
date -d "8 days ago" +%s 创建了一个比当前时间早 8 天的，Unix 格式的时间。
```

`30s` 后，查看 onex-nightwatch 日志，确认过期的密钥被成功删除：

```bash
$ egrep 'Successfully deleted secret from database.*secret0' ${ONEX_NIGHTWATCH_LOG_OUTPUT}
$ egrep 'Successfully deleted secret from database.*secret0' /opt/onex/log/onex-nightwatch.log 
2024-01-18 09:23:35.007        INFO        secretsclean/watcher.go:41        Successfully deleted secret from database   {"userID": "user-44ci8j", "name": "secret0"}
```

如果 `${ONEX_NIGHTWATCH_LOG_OUTPUT}` 中能找到删除 `secret0` 密钥的日志，说明 onex-nightwatch 被成功部署。

`${ONEX_NIGHTWATCH_LOG_OUTPUT}` 变量指定了 onex-nightwatch 组件日志的记录文件，如果 `${ONEX_NIGHTWATCH_LOG_OUTPUT}` 被设置为 `stdout`，说明日志输出到了标准输出，你需要从标准输出中查找日志。

如果你是通过容器化的部署方式，可以登录容器执行以下命令来查找：

```bash
$ docker exec onex journalctl -u onex-nightwatch | egrep 'Successfully deleted secret from database.*secret0'
```

### 测试 onex-pump 组件

onex-pump 组件会从 Kafka 中消费授权日志，并转存到 MongoDB 中。所以，我们只需要产生一条授权数据，并检查 MongoDB 中是否有这条授权日志即可。

1. 检查 kafka 中是否有授权消息产生

为了方便测试，我们使用 `kafkactl` 来读取 kafka 中的消息。首先要安装 `kafkactl` 命令：

```bash
$ make -C ${ONEX_ROOT} tools.install.kafkactl
```

配置 kafkactl：
```bash
$ source ${ONEX_ROOT}/manifests/env.local
$ mkdir -p $HOME/.config/kafkactl
$ cat <<EOF > $HOME/.config/kafkactl/config.yml
contexts:
  default:
    brokers:
    - ${ONEX_KAFKA_HOST}:${ONEX_KAFKA_PORT}
EOF
```

消费 `audit` topic 中的消息：

```bash
$ kafkactl consume audit
```

打开一个新的 Linux 终端，执行以下命令，来产生一条授权日志：

```bash
$ curl -XPOST http://onex.usercenter.superproj.com:50843/v1/auth/authorize -H'Content-Type: application/json' -d'{"sub":"colin","obj":"tester","act":"delete"}'
```

查看 `kafkactl consume audit` 命令所在的 Linux 终端是否消费到数据：

![kafkactl consume audit 命令输出](/images/kafkactl_consume_audit命令输出.png)


可以看到成功消费到授权数据，说明 onex-usercenter 可以成功向 kafka 上报授权数据。

2. 检查 MongoDB 中，是否有清洗后的授权日志


执行以下命令来测试：

```bash
$ encoded=$(echo -n "${ONEX_MONGO_ADMIN_PASSWORD}"|jq -sRr @uri)
$ mongosh --quiet mongodb://${ONEX_MONGO_ADMIN_USERNAME}:${encoded}@${ONEX_MONGO_URL}/${ONEX_MONGO_DATABASE}?authSource=admin
onex> db.audit.find()
[
  {
    _id: ObjectId('65a8f1d3a90670925fdb1737'),
    topic: 'audit',
    partition: 0,
    offset: Long('3'),
    highwatermark: Long('4'),
    key: null,
    value: Binary.createFromBase64('MjAyNC0wMS0xOCAxNzozOTozMSB7Im1hdGNoZXIiOiJnKHJfc3ViLCBwX3N1YikgXHUwMDI2XHUwMDI2IHJfb2JqID09IHBfb2JqIFx1MDAyNlx1MDAyNiByX2FjdCA9PSBwX2FjdCB8fCByX3N1YiA9PSBcInJvb3RcIiIsInJlcXVlc3QiOlsiY29saW4iLCJ0ZXN0ZXIiLCJkZWxldGUiXSwicmVzdWx0Ijp0cnVlLCJ0aW1lc3RhbXAiOjE3MDU1NzA3NzB9', 0),
    headers: null,
    time: ISODate('2024-01-18T09:39:31.236Z')
  }
]
onex>
```

如果执行 `db.audit.find()`，能查询到授权日志的 Mongo 记录，说明 onex-pump 部署成功。

执行以下命令，可以解压日志清洗后的内容：

```bash
$ echo 'MjAyNC0wMS0xOCAxNzozOTozMSB7Im1hdGNoZXIiOiJnKHJfc3ViLCBwX3N1YikgXHUwMDI2XHUwMDI2IHJfb2JqID09IHBfb2JqIFx1MDAyNlx1MDAyNiByX2FjdCA9PSBwX2FjdCB8fCByX3N1YiA9PSBcInJvb3RcIiIsInJlcXVlc3QiOlsiY29saW4iLCJ0ZXN0ZXIiLCJkZWxldGUiXSwicmVzdWx0Ijp0cnVlLCJ0aW1lc3RhbXAiOjE3MDU1NzA3NzB9'|base64 -d
2024-01-18 17:39:31 {"matcher":"g(r_sub, p_sub) \u0026\u0026 r_obj == p_obj \u0026\u0026 r_act == p_act || r_sub == \"root\"","request":["colin","tester","delete"],"result":true,"timestamp":1705570770}
```

这里，我们在每一条授权日志前面加了一个时间戳 `2024-01-18 17:39:31`。

### 测试 onex-toyblc 组件

我们可以请求 `/v1/blocks` 来查看当前私有链中的区块详情：

```bash
$ curl -uonex:'onex(#)666' http://${ONEX_ACCESS_HOST}:${ONEX_TOYBLC_HTTP_PORT}/v1/blocks
[{"index":0,"previousHash":"0","timestamp":1465154705,"data":"genesis block","hash":"816534932c2b7154836da6afc367695e6337db8a921823784c14378abed4f7d7","address":"0x210d9eD12CEA87E33a98AA7Bcb4359eABA9e800e"}]
```

还可以请求 `/v1/peers` 来查看当前区块链中的节点：

```bash
$ curl -uonex:'onex(#)666' http://${ONEX_ACCESS_HOST}:${ONEX_TOYBLC_HTTP_PORT}/v1/peers
["127.0.0.1:58404","localhost:6001"]
```

如果 `/v1/blocks` 和 `/v1/peers` 接口都请求成功，说明 onex-toyblc 成功部署。

## 云原生组件测试

在测试云原生组件的过程中需要通过 `kubectl` 工具访问 onex-apiserver，所以这里需要先设置 kubeconfig 文件，设置命令如下：

```bash
$ export KUBECONFIG=${ONEX_ADMIN_KUBECONFIG}
```

### 测试 kubectl、onex-apiserver 组件

这里将 `kubectl` 和 onex-apiserver 的测试放在一起，是因为要通过 `kubectl` 命令行工具访问 onex-apiserver。测试命令如下：

```bash
$ kubectl api-resources | grep apps.onex.io
chains       ch           apps.onex.io/v1beta1     true         Chain
miners       mi           apps.onex.io/v1beta1     true         Miner
minersets    ms           apps.onex.io/v1beta1     true         MinerSet
```

如果，能够成功从 onex-apiserver 中获取到 `apps.onex.io/v1beta1` `APIVERSION`，说明 onex-apiserver 成功启动。

### 测试 onex-minerset-controller 组件

onex-minerset-controller 用来创建一个矿机池。onex-apiserver 中的 MinerSet 资源用来定义一个矿机池，其定义如下：

```yaml
apiVersion: apps.onex.io/v1beta1
kind: MinerSet
metadata:
  name: test
  namespace: user-admin
spec:
  deletePolicy: Random
  displayName: testminerset
  replicas: 2
  template:
    spec:
      chainName: genesis
      minerType: M1.MEDIUM2
```

可以看到，MinerSet 依赖于一个 Chain。Chain 代表一个私有链。所以，我们需要先创建一个私有链 Chain，创建命令如下：

```bash
$ kubectl create -f ${ONEX_ROOT}/manifests/sample/onex/chain.yaml
$ kubectl -n user-admin get chain
NAME      AGE
genesis   18s
```

可以成功 Get 到 chain 资源，说明 Chain 被成功创建。

接着，使用以下命令创建一个 MinerSet：

```bash
$ kubectl create -f ${ONEX_ROOT}/manifests/sample/onex/minerset.yaml
$ kubectl -n user-admin get minerset
NAME   READY   CURRENT   AVAILABLE   AGE
test   2/2     2         2           16s
```

可以成功 Get 到 minerset 资源，说明 MinerSet 被成功创建。

onex-minerset-controller 在 Watch 到新的 MinerSet 资源被创建后，会根据 MinerSet 的资源定义，创建 Miner 资源。`${ONEX_ROOT}/manifests/sample/onex/minerset.yaml` 文件定义了一个 MinerSet 资源，定义如下：

```yaml
apiVersion: apps.onex.io/v1beta1
kind: MinerSet
metadata:
  name: test
  namespace: user-admin
spec:
  deletePolicy: Random
  displayName: testminerset
  replicas: 2
  template:
    spec:
      chainName: genesis
      minerType: M1.MEDIUM2
```

根据 MinerSet 的资源声明，我们需要创建 `2` 个 Miner 资源（`spec.replicas: 2`），并且 `2` 个 Miner 的配置模版为：
```yaml
  template:
    spec:
      chainName: genesis
      minerType: M1.MEDIUM2
```

我们可以使用以下命令来查看 Miner 资源是否被成功创建：

```bash
$ kubectl -n user-admin get miner | grep test
test-69v8k   Running   6m6s
test-9hzfw   Running   6m6s
```

可以看到 `2` 个 Miner 资源被成功创建。这里需要注意，onex-apiserver 会根据 MinerSet 资源的名字自动生成 Miner 资源的名字，如果 MinerSet 资源名字是 `test`，那么由其创建的 Miner 资源名字为格式为 `test-xxxxx`。

另外，我们还可以使用 `kubectl scale` 命令来扩缩容矿机池。扩缩容命令如下：

```bash
$ kubectl scale --replicas=3 minerset test
```

### 测试 onex-miner-controller 组件

onex-miner-controller 会监控 Miner 资源类型，当发现有新的 Miner 资源被创建后，会真正的创建出一个矿机（其实就是一个 K8S Pod）。为了简化你部署的复杂度，onex-miner-controller 支持 Dry Run 模式，在 Dry Run 模式下，不会去请求 Kubernetes 接口创建一个真正的 Pod，而是会直接设置 Miner 状态为 `Running`，也就是说 Dry Run 模式可以解除onex-miner-controller对 Kubernetes 集群的依赖。

`${ONEX_CONFIG_DIR}/onex-miner-controller.yaml` 配置文件中的 `dryRun` 配置项用来打开/关闭 onex-miner-controller 的 Dry Run 模式：`true` 打开，`false` 关闭。

### 测试 onex-controller-manager 组件

onex-controller-manager包含了多个 controller：
- `resource-clean-controller`：用来定期将 Chain、MinerSet、Miner 资源从 onex-apiserver 中同步到 MySQL 中，确保数据的强一致性；
- `chain-controller`：会 Watch onex-apiserver，当发现有新的 Chain资源被创建时，会创建一个私有创世链；
- `garbage-controller-manager`：GC 服务，定期删除需要 GC 的资源。

接下来，我会一一测试这些 controller 的功能。

#### ChainSync Controller

ChainSync Controller 用来将 onex-apiserver 中的 chain 资源同步到 `api_chain` 表中。我们可以通过查询数据库，来看数据是否被同步来测试。测试命令如下：

```bash
$ mysql -h${ONEX_MYSQL_HOST} -P${ONEX_MYSQL_PORT} -u"${ONEX_MYSQL_ADMIN_USERNAME}" -p"${ONEX_MYSQL_ADMIN_PASSWORD}"
MariaDB [(none)]> use onex;
MariaDB [onex]> select namespace,name from api_chain;
+------------+---------+
| namespace  | name    |
+------------+---------+
| user-admin | genesis |
+------------+---------+
1 row in set (0.001 sec)
```

`api_chain` 表中，有数据，说明 ChainSync Controller 成功将 onex-apiserver 中的 chain 资源同步到 `api_chain` 表中。

#### MinerSetSync Controller

MinerSetSync Controller 用来将 onex-apiserver 中的 minerset 资源同步到 `api_minerset` 表中。我们可以通过查询数据库，来看数据是否被同步来测试。测试命令如下：

```bash
$ mysql -h${ONEX_MYSQL_HOST} -P${ONEX_MYSQL_PORT} -u"${ONEX_MYSQL_ADMIN_USERNAME}" -p"${ONEX_MYSQL_ADMIN_PASSWORD}"
MariaDB [(none)]> use onex;
MariaDB [onex]> select namespace,name from api_minerset;
+------------+------+
| namespace  | name |
+------------+------+
| user-admin | test |
+------------+------+
1 row in set (0.001 sec)
```
`api_minerset` 表中，有数据，说明 MinerSetSync Controller 成功将 onex-apiserver 中的 minerset 资源同步到 `api_minerset` 表中。

#### MinerSync Controller

MinerSync Controller 用来将 onex-apiserver 中的 miner 资源同步到 `api_miner` 表中。我们可以通过查询数据库，来看数据是否被同步来测试。测试命令如下：

```bash
$ mysql -h${ONEX_MYSQL_HOST} -P${ONEX_MYSQL_PORT} -u"${ONEX_MYSQL_ADMIN_USERNAME}" -p"${ONEX_MYSQL_ADMIN_PASSWORD}"
MariaDB [(none)]> use onex;
MariaDB [onex]> select namespace,name from api_miner;
+------------+------------+
| namespace  | name       |
+------------+------------+
| user-admin | genesis    |
| user-admin | test-69v8k |
| user-admin | test-9hzfw |
+------------+------------+
3 rows in set (0.001 sec)
```

`api_miner` 表中，有数据，说明 MinerSetSync Controller 成功将 onex-apiserver 中的 miner 资源同步到 `api_miner` 表中。


#### Chain Controller 

Chain Controller 会 Watch Chain 资源，当发现有新的 Chain 资源被创建后，会根据 Chain 资源的定义创建出对应的创世区块链节点（一个名为 `genesis` 的 Miner 资源）。

我们可以使用 `kubectl` 命令，来查看该创世区块链节点的创建状态，命令如下：

```bash
$ kubectl -n user-admin get ch
NAME      AGE
genesis   23m
```

`genesis` 资源被成功创建，说明 Chain Controller 正常工作。

#### GC Controller

GC Controller 用来执行垃圾回收任务。我们可以通过删除`genesis` Chain，并观察其关联的 MinerSet、Miner 有没有被 GC 掉，来测试 GC Controller。测试命令如下：

```bash
$ kubectl -n user-admin delete ch genesis # ch 是 chain 的 alias
chain.apps.onex.io "genesis" deleted
$ kubectl -n user-admin get ms # ms 是 minerset 的 alias
No resources found in user-admin namespace.
$ kubectl -n user-admin get mi # mi 是 miner 的 alias
No resources found in user-admin namespace.
```

可以看到，`genesis` Chain 被删除后，其关联的 MinerSet、Miner 资源都被删除了，说明 GC Controller 正常工作。

### onexctl 功能测试

测试命令如下：

```bash
$ kubectl create -f ${ONEX_ROOT}/manifests/sample/onex/minerset.yaml
$ onexctl --config ${ONEX_CONFIG_DIR}/onexctl.yaml minerset list
NAME   REPLICAS   DISPLAYNAME    CREATED              
test  2         testminerset  2024-01-17 03:43:38  
```

## 总结

我们可以通过测试，来体验和学习 OneX 项目提供的各类功能。这有助于我们全面了解 OneX 实战项目。本节课，分别给你展示了如何使用 Postman 和curl命令行工具，来测试 OneX 各个组件的功能。通过详细测试，OneX 中的每一个组件，来给你介绍了每一个组件的功能和使用方式。

OneX 项目的 Postman API 接口可以参考：https://www.postman.com/gold-crater-394532/workspace/onex/overview。

OneX 项目的 RESTful API 接口请访问：[OneX API 接口](http://konglingfei.com:65534/docs)。

## 课后练习

1. 请分别设计并测试 onex-fakeserver、onex-cacheserver是否被成功安装；
2. 请参考用户创建 RESTful API 接口：`POST /v1/users`，使用 `grpcurl` 工具来测试下创建用户的 API 接口 CreateUser。
3. 思考下，为什么需要将 onex-apiserver 中的 Chain、Miner、MinerSet 资源同步到 MySQL 中？
