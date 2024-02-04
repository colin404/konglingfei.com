---
title: 如何使用 Docker 快速部署 OneX 项目？
shortTitle: 容器化部署
date: 2022-03-01
sticky: true
star: true
isOriginal: true
icon: docker
order: 1
category:
  - 实战营
tag:
  - 实战营
---

为了尽可能多涵盖 Go 项目开发中常用的技术，OneX 项目具有一定的复杂度，这也会带来一定的部署难度。为了降低入手难度，同时让大家学习到软件部署的方法和技术，OneX 项目提供了多种不同的软件部署方式，以满足不同的部署需求。

本节课，我会介绍这些部署方式，并在接下来的几节课中，给你详细介绍具体如何部署 OneX 项目。也希望，你不仅能把 OneX 项目部署成功，而且能从中学习到很多 Linux 下部署软件的方法和技术。

## 高效学习方法之一：带着问题去学习

在开始部署之前，我想先分享一个高效的学习方法：问题驱动型学习方式。

在部署 OneX 项目的过程中，因为部署环境、网络环境、开发水平等差异，会导致在部署过程中，可能会遇到各种各样的问题。这些问题，可能会给你带来一些学习难度，甚至想放弃的念头。那么如何对待这些问题呢？请看一下我的想法。

首先，部署过程中遇到问题是非常正常的一件事，毕竟操作系统环境、网络环境、组件版本都可能存在不同。所以，当遇到问题时，需要你放平心态、以一颗积极的心态去看待这些问题。

其次，部署过程中遇到的问题，其实是非常好的学习入手点。我们可以带着这些问题，在互联网上调研问题可能出现的原因、解决方法，并最终解决这些问题。这个过程就是带着问题去学习，会极大的提高你的学习效率，扩展你的知识面，并且你对知识的理解程度、记忆深度都比正常的阅读型学习要深刻的多。如果，你在部署的过程中，发现项目脚本、代码出现问题，导致部署失败，你也可以积极提交 PR，修复这个Bug。未来找工作时，如果你觉得简历内容太少，想丰富一下，你也许可以加上一句：热爱开源，参与过开源项目的代码贡献等。

所以，如果部署过程中遇到问题，建议先尝试在互联网上查找问题可能出现的原因，并尝试解决问题。最简单的方法，就是将错误信息粘贴到 Google / Baidu 上，寻找具有相同错误的帖子/文章，看下这些帖子/文章中有没有相匹配的解决方法。在查找/解决问题的过程中，我们会学习到很多新的知识，这些知识是对我们解决问题的奖励。

当然，如果你花费了不少时间，仍然没有解决问题，也没必要继续耗费很多时间在这个问题上，这时候你可以在星球上直接向老师提问，寻求老师的帮助，尽快帮你解决学习过程中遇到的卡点。

这里我也准备了一份 [OneX 排障指南](/onex/devel/troubleshooting) 供你参考。

## OneX 项目部署方式介绍

OneX 项目提供了 6 种部署方式，这些部署方式分别适用于不同的场景，并带来不同的收益。不同的部署方式，也会从不同的维度，去丰富你的运维知识、组件部署技能。这些部署方式如下图所示：

![OneX项目部署方式](/images/OneX项目部署方式-水印.png)

Go 项目开发高阶实战课中，会提供 3 种部署 OneX 项目的方式：
- **Docker 快速安装：** 最简单、最便捷的部署方式，可以让你快速部署好 OneX 项目，验证并体验 OneX 项目的功能等；
- **一步步脚本自动部署：** OneX 项目是一个开源项目，你能看到的一切均是开源的，你可以通过阅读自动化部署脚本，了解 OneX 项目部署流程中每一个步骤的具体实现方式。你还可以通过阅读 Shell 脚本，学习 Shell 脚本编程知识。OneX 项目的 Shell 脚本可以作为你的 Shell 编程实战项目，通过魔改部署脚本，锻炼你的 Shell 编程能力；
- **一步步手动部署：** 手动安装的步骤基本上跟脚本自动安装一样。在手动安装教程中，我会带着你，一步一步部署完整个 OneX 项目。在动手部署实操的过程中，我会解读部署指令，并介绍其中的知识和注意点等。

在 Kubernetes 开发实战课中，我会再介绍另外 3 种容器化部署方式。其中，Helm 部署，是生产环境中推荐的部署方式。

::: important
最好基于一个新的 Linux 环境来安装，一方面可以保持操作系统环境的一致性，可以极大减少安装失败的概率。另一方面，执行命令时更加安全。

如果，你在一个已有的 Linux 环境中安装，并且环境中，已经安装有 etcd、jaeger、kafka、mariadb、mongo、redis 组件，请慎用 uninstall类操作，因为这些操作可能会清空已有的数据。
:::

Docker 环境安装和配置（On Debian）

要使用容器部署 OneX 项目，我们需要安装并配置一个 Docker 环境，安装配置步骤如下：
1. 卸载旧版本；
2. 添加 Docker 官方 GPG 密钥；
3. 将仓库添加到 Apt 源中；
4. 安装 Docker；

Docker 安装官方文档：[Install Docker Engine on Debian](https://docs.docker.com/engine/install/debian/)

### 1. 卸载旧版本

为了减少安装 Docker 时的脏数据干扰，这里先幂等卸载旧版本：
```bash
$ for pkg in docker.io docker-doc docker-compose podman-docker containerd runc; do sudo apt-get remove $pkg; done
```

### 2. 添加 Docker 官方 GPG 密钥

操作命令如下：

```bash
$ sudo apt-get update
$ sudo apt-get install ca-certificates curl gnupg
# 创建一个名为 /etc/apt/keyrings 的新目录，并将其权限设置为 0755
$ sudo install -m 0755 -d /etc/apt/keyrings
$ curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
$ sudo chmod a+r /etc/apt/keyrings/docker.gpg
```

因为国内访问国外网络不稳定，上述操作可能会超时，可以多试几次。

### 3. 将仓库添加到 APT 源中

操作命令如下：

```bash
$ echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
$ sudo apt-get update # 别忘了执行这一步。可以确保系统能够识别并安装来自 Docker 软件源的软件包
```

上述指令会将 Docker 的软件源添加到Debian系统的软件源列表中，并进行更新。

### 4. 安装 Docker

安装命令如下：

```bash
$ sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

上述命令，安装了多个 Docker 软件包，这些软件包作用如下：
- `docker-ce`：Docker 社区版，即 Docker 的核心程序；
- `docker-ce-cli`：Docker 的命令行工具；
- `containerd.io`：Docker 的容器运行时；
- `docker-buildx-plugin`：Docker 多平台构建插件；
- `docker-compose-plugin`：Docker 的容器编排工具。

安装成功之后，默认 docker 已经处在运行中状态，可以执行`systemctl status docker`命令查看 Docker 运行状态：

```bash
$ systemctl status docker
● docker.service - Docker Application Container Engine
     Loaded: loaded (/lib/systemd/system/docker.service; enabled; preset: enabled)
     Active: active (running) since Tue 2024-01-16 17:27:43 CST; 1min 56s ago
TriggeredBy: ● docker.socket
       Docs: https://docs.docker.com
   Main PID: 2993878 (dockerd)
      Tasks: 10
     Memory: 38.3M
        CPU: 316ms
     CGroup: /system.slice/docker.service
             └─2993878 /usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock
```

docker 的配置文件是 `/etc/docker/daemon.json`，该文件位于 Docker 配置目录下，通常是 `/etc/docker/`目录。如果该文件不存在，可以手动创建一个或者你可以直接使用以下配置，覆盖已有的配置：

```bash
$ sudo tee /etc/docker/daemon.json << EOF
{
    "exec-opts": ["native.cgroupdriver=systemd"],
    "insecure-registries": [],
    "live-restore": true,
    "bip": "172.16.0.1/24",
    "storage-driver": "overlay2",
    "registry-mirrors": ["https://registry.docker-cn.com"],
    "data-root": "/data/lib/docker",
    "log-driver": "json-file",
    "dns": [],
    "default-runtime": "runc",
    "log-opts": {
      "max-size": "100m",
      "max-file": "10"
  }
}
EOF
```

配置参数说明如下：
- `exec-opts`：用于配置 Docker 执行时的选项。`native.cgroupdriver=systemd` 指定使用系统的 systemd cgroup 驱动程序。Cgroup 控制组（Control Groups）是一种内核功能，可以限制一组进程的系统资源。
- `insecure-registries`：用于配置不安全的镜像仓库地址。本例中该值为空数组，说明未指定任何不安全的镜像仓库地址。
- `live-restore`：是否恢复容器状态以支持服务的不间断更新，在这个例子中，该值为 `true` 表示启用容器状态恢复。
- `bip`：配置 Docker 容器网络地址的 IP 范围。本例中该值为 `172.16.0.1/24` 表示使用 `172.16.0.0/24` 子网进行 Docker 容器通信。
- `storage-driver`：用于指定使用的存储驱动。本例中该值为 `overlay2` 指定使用 OverlayFS2 存储驱动。
- `registry-mirrors`：用于配置 Docker 镜像加速器地址。本例中该值为 `["https://registry.docker-cn.com"]`，表示使用 `https://registry.docker-cn.com` 作为 Docker 镜像加速器地址。
- `data-root`：配置 Docker 的数据存放路径。本例中该值为 `/data/lib/docker`。如果你的 `/` 目录存储空间满足不了需求，需要设置 `data-root` 为更大的目录。这里建议，一开始就设置为一个存储空间大的目录。
- `dns`：配置选项用于设置容器的 DNS 服务器。
- `default-runtime`：配置选项用于设置默认的运行时。
- `log-driver`：配置 Docker 日志驱动程序。本例中该值为 `json-file`，表示使用 json 格式记录 Docker 日志。
- `log-opts`：配置 Docker 日志选项。该字段是一个 JSON 对象，包括 ：
  - `max-size`：用于限制 Docker 日志文件的最大大小。本例中该值为 `100m`，表示 Docker 日志文件的大小不能大于 `100M`。可以使用 `b`、`k`、`m`、`g` 后缀来指定单位（字节、千字节、兆字节、吉字节）。
  - `max-file`：用于限制 Docker 日志文件的数量。在本例中，该值为 `10`，表示 Docker 只会保留最后 `10` 个日志文件。

配置完成后，记得重启 docker：

```bash
$ sudo systemctl restart docker
```

#### 测试 docker 是否安装成功。

这里，我们可以运行一个 hello world 容器，来查看 Docker 是否成功安装，启动命令如下：

```bash
$ sudo docker run hello-world
Unable to find image 'hello-world:latest' locally
latest: Pulling from library/hello-world
b8dfde127a29: Pull complete
Digest: sha256:0fe98d7debd9049c50b597ef1f85b7c1e8cc81f59c8d623fcb2250e8bec85b38
Status: Downloaded newer image for hello-world:latest
...
Hello from Docker!
This message shows that your installation appears to be working correctly.
....
```

`docker run hello-world` 命令会下载 hello-world 镜像，并启动容器，打印安装成功提示信息后退出。

#### Docker 安装后配置

安装成功后，我们还需要做一些其他配置。主要有两个，一个是配置 docker，使其可通过 non-root 用户使用；另一个是配置 docker 开机启动。

1. 使用 non-root 用户操作 docker。

我们在 Linux 系统上操作，为了安全，需要以普通用户的身份登录系统并执行操作。所以，我们需要配置 docker，使它可以被 non-root 用户使用。具体配置方法如下：

```bash
$ sudo -i groupadd docker # 创建 `docker` 用户组
$ sudo -i usermod -aG docker $USER # 将当前用户添加到 `docker` 用户组下
$ newgrp docker # 重新加载组成员身份
$ docker run hello-world # 确认能够以普通用户使用 docker
```

如果在执行 `sudo groupadd docker` 时报 `groupadd: group 'docker' already exists` 错误，说明 docker 组已经存在了，可以忽略这个报错。

如果你在将用户添加到 docker 组之前，使用 `sudo` 运行过 docker 命令，你可能会看到以下错误：

```bash
WARNING: Error loading config file: /home/user/.docker/config.json -
stat /home/user/.docker/config.json: permission denied
```

这个错误，我们可以通过删除 `~/.docker/` 目录来解决，或者通过以下命令更改 `~/.docker/` 目录的所有者和权限：

```bash
$ sudo chown "$USER":"$USER" /home/"$USER"/.docker -R
$ sudo chmod g+rwx "$HOME/.docker" -R
```

2. 配置 docker 开机启动。

我们如果重启 Linux 机器，肯定不想再重启一次 Docker，我们希望 Docker 能够一直处在运行中状态。所以，我们还需要将 Docker 配置为开启启动，配置命令如下：

```bash
$ sudo systemctl enable docker.service # 设置 docker 开机启动
$ sudo systemctl enable containerd.service # 设置 containerd 开机启动
```

### 5. 排障

在安装过程中，你可能会遇到一些错误，下面是一些常见问题的修复方法。

#### 执行 systemctl restart docker 报错

如果执行 `systemctl restart docker` 报以下错误：

```
Jul 14 19:59:05 n37-083-200 dockerd[3113175]: time="2023-07-14T19:59:05.068736291+08:00" level=info msg="Starting up"
Jul 14 19:59:05 n37-083-200 dockerd[3113175]: time="2023-07-14T19:59:05.084662580+08:00" level=info msg="[graphdriver] trying configured driver: overlay2"
Jul 14 19:59:05 n37-083-200 dockerd[3113175]: time="2023-07-14T19:59:05.289191881+08:00" level=info msg="Loading containers: start."
Jul 14 19:59:05 n37-083-200 dockerd[3113175]: time="2023-07-14T19:59:05.481750463+08:00" level=error msg="Resolver Start failed for container ad2c52cd91071f0a5b8391d4593995820062eae33aabf371770a5ed12e3f0d3e, \"setting up IP table rules failed:  (iptables failed: iptables --wait -t nat -N DOCKER_OUTPUT: iptables v1.8.2 (nf_tables): Chain already exists\\n (exit status 1))\""
Jul 14 19:59:05 n37-083-200 dockerd[3113175]: time="2023-07-14T19:59:05.485829617+08:00" level=error msg="Resolver Start failed for container bf6e1c5625ced7b95216f2169d3eeaff0b4f4d0b6a4e61ae9ed9e4b5e03f4e3c, \"setting up IP table rules failed:  (iptables failed: iptables --wait -t nat -N DOCKER_OUTPUT: iptables v1.8.2 (nf_tables): Chain already exists\\n (exit status 1))\""
Jul 14 19:59:05 n37-083-200 dockerd[3113175]: time="2023-07-14T19:59:05.486454874+08:00" level=info msg="there are running containers, updated network configuration will not take affect"
Jul 14 19:59:05 n37-083-200 dockerd[3113175]: panic: runtime error: invalid memory address or nil pointer dereference
Jul 14 19:59:05 n37-083-200 dockerd[3113175]: [signal SIGSEGV: segmentation violation code=0x1 addr=0x30 pc=0x55f5f3462000]
Jul 14 19:59:05 n37-083-200 dockerd[3113175]: goroutine 286 [running]:
Jul 14 19:59:05 n37-083-200 dockerd[3113175]: github.com/docker/docker/daemon.(*Daemon).prepareMountPoints(0xc000986410?, 0xc000ac2000)
Jul 14 19:59:05 n37-083-200 dockerd[3113175]:         /go/src/github.com/docker/docker/daemon/mounts.go:24 +0x1c0
Jul 14 19:59:05 n37-083-200 dockerd[3113175]: github.com/docker/docker/daemon.(*Daemon).restore.func7(0xc000ac2000)
Jul 14 19:59:05 n37-083-200 dockerd[3113175]:         /go/src/github.com/docker/docker/daemon/daemon.go:602 +0x79
Jul 14 19:59:05 n37-083-200 dockerd[3113175]: created by github.com/docker/docker/daemon.(*Daemon).restore
Jul 14 19:59:05 n37-083-200 dockerd[3113175]:         /go/src/github.com/docker/docker/daemon/daemon.go:599 +0xd7b
Jul 14 19:59:05 n37-083-200 systemd[1]: docker.service: Main process exited, code=exited, status=2/INVALIDARGUMENT
Jul 14 19:59:05 n37-083-200 systemd[1]: docker.service: Failed with result 'exit-code'.
```

可以通过以下方式来解决：
1. 通过 `kill -9 xxx` 杀死所有的 containerd 进程。
2. 重启 containerd 服务：`systemctl restart containerd`
3. 重启 docker 服务：`systemctl restart docker`

## OneX  项目容器化部署

上面我们部署好了 Go 开发环境和 Docker 环境，接下来，就可以使用 docker 一键部署整个 OneX 项目。

### 1. 下载 OneX 源码

OneX 项目源码托管在 GitHub 上，国内网络访问 GitHub 网速会比较慢，经常会出现超时，你可以配置 github.com host 来解决：

```bash
$ sudo tee -a /etc/hosts << EOF
140.82.114.4 github.com
EOF
```

代理 IP `140.82.114.4` 可能会失效，你可以网上找其他可用的代理 IP 配置上。

想要安装 OneX 系统，首先需要先下载 OneX 源码。本课程使用的 **OneX 源码分支为 v0.1.0**。OneX 源码下载命令如下：

```bash
$ mkdir -p $WORKSPACE/golang/src/github.com/superproj
$ cd $WORKSPACE/golang/src/github.com/superproj
$ git clone https://github.com/superproj/onex
```

### 2. 初始化工作区

本课程使用的 Go 版本为 `go1.21.5`，`go1.21.5` 支持多模块工作区，所以这里也需要初始化工作区。初始化命令如下：

```bash
$ cd $WORKSPACE/golang/src/github.com/superproj
$ go work init
$ go env GOWORK # 执行此命令，查看 go.work 工作区文件路径
/home/going/workspace/golang/src/github.com/superproj/go.work
$ go work use ./onex/
```

### 3. 一键部署 OneX 服务

安装部署 onex 服务分为以下几步。

1. 安装配置文件、启动二进制文件。安装命令如下：

```bash
$ cd $WORKSPACE/golang/src/github.com/superproj/onex
$ make docker-install # 会下载 ccr.ccs.tencentyun.com/superproj/onex-allinone-amd64:v0.1.0 镜像，并启动
```

上述命令会按顺序依次执行以下安装操作：
1. 安装不要的软件包，并配置 `/etc/hosts`（具体可以查看 `/etc/hosts` 新增内容）；
2. 依次安装存储组件：mariadb、redis、mongo、etcd；
3. 依次安装其他中间件：jaeger、kafka；
4. 安装 OneX 前准备工作：
  1. 配置 `$HOME/.bashrc`；
  2. 初始化 MariaDB 数据库，创建 onex 数据库；
  3. 初始化 MongoDB，创建 onex 用户；
5. 下载 `ccr.ccs.tencentyun.com/superproj/onex-allinone-amd64:v0.1.0` 镜像，并创建onex容器。在onex容器中，会依次启动以下 OneX 服务：onex-usercenter、onex-apiserver、onex-gateway、onex-nightwatch、onex-pump、onex-toyblc、onex-controller-manager、onex-minerset-controller、onex-miner-controller、onex-fakeserver、onex-cacheserver；

上述服务是按照彼此间的依赖顺序启动的，服务依赖关系如下：

![OneX组件依赖关系](/images/OneX组件依赖关系-水印.png)

6. 全面测试 OneX 中各个组件的功能。

如果命令的最后，输出以下文本，说明 OneX 系统被成功部署：


:::tip
如果你想基于当前源码，构建 docker 镜像并安装，可以执行以下命令来安装：
```bash
$ INSTALL_WITH_FRESH_IMAGE=1 make docker-install
```
:::

如果，因为网络超时等原因，导致安装失败，可以先执行以下命令，卸载再安装：

```bash
$ make docker-uninstall # 先 uninstall，防止配置、组件等影响下一次安装
$ make docker-install
```

### 4. 测试项目是否部署成功

`make docker-install` 命令最后会调用 `${ONEX_ROOT}/scripts/installation/test.sh onex::test::test` 命令来测试 OneX 系统功能是否正常。

你可以手动执行以下命令来测试：

```bash
$ cd ${ONEX_ROOT}
$ source manifests/env.local
$ ./scripts/installation/test.sh onex::test::test
```

如果 `./scripts/installation/test.sh onex::test::test` 命令输出的最后出现 `all test passed!` 字符串，说明 OneX 项目成功部署并测试通过，如下图所示：

![部署成功截图](/images/部署成功截图.png)

### 5. 启动 Swagger API 文档

此外，你还可以通过 swagger 命令来启动一个在线的 Swagger API 文档，命令如下：

```bash
$ make tools.install.swagger
$ make serve-swagger
2024/01/16 22:42:12 serving docs at http://localhost:65534/docs
```

之后，你可以通过 `http://localhost:65534/docs` 来访问 Swagger API 文档：

![SwaggerAPI文档](/images/SwaggerAPI文档.png)

## 总结

在开始学习 OneX 项目前，你需要先部署好 OneX 系统，给自己准备好一个开发、部署环境。OneX 提供几乎所有的安装方式：Docker快速安装、脚本自动安装、手动部署等。旨在通过不同的安装方法，让你通过动手操作，学习如何在 Linux 下部署软件。

本节课，安装 OneX 最便捷的方法是容器化安装，命令如下：

```bash
$ make docker-install
```

## 课后练习

1. 执行以下命令，再次安装一遍 OneX：

```bash
$ make docker-uninstall
$ make docker-install
```

2. 阅读 Makefile `docker-install`、`docker-uninstall` 规则的实现，学习 OneX 的安装流程和实现。
