---
title: 手把手教你部署 OneX 实战项目，通过动手实践，高效学习软件部署技能
shortTitle: 手动部署
date: 2022-03-01
sticky: true
star: true
article: false
isOriginal: true
icon: shoudong
order: 3
category:
  - 实战营
tag:
  - 实战营
---

本文，我会详细介绍下如何一步一步通过手动操作实践去部署 OneX 系统，一窥项目部署的细节。因为在上一节课，你已经成功部署了 OneX。本节课，你可以根据需要进行选学。

:::tip 建议
建议根据[Go开发环境准备](/onex/installation/prepare.md)准备一套可用的 Go 开发环境。当然，你也可以在已有机器上部署，但可能会遇到些问题，不用担心，问题不多且可解决。
:::

## 一个开发课程，为什么部署和测试需要用四节课来讲？

你可能会问，一个开发课程，为什么会花四节课，来介绍项目是如何部署测试的？之所以要花四节课程来讲项目如何部署和测试，除了因为项目本身具有一定的复杂度之外，更重要的原因是，通过部署实战，可以让你熟悉 Linux 系统的操作、掌握 Linux 常用的命令及 Linux 系统下软件部署的方法技巧等，是很难得的一次带着目标去学习的机会。

因为本课程期望达到的目标是高级 Go 开发工程师的水平，仅仅具备优秀的开发能力其实还达不到高级工程师的能力标准。高级工程师不仅要具备优秀的开发能力，还要具备架构及服务器运维、软件部署等能力。所以，我会借 OneX 项目部署的实践机会，带你熟悉和掌握 Linux 系统下软件部署的常用技能和方法，以此打磨并提高你的 Linux 系统操作、软件部署、Shell 脚本编程等能力。

所以，这不是劝退的四节课，而是我在用心帮助你成长的四节课，否则，我完全可以省事，只提供一种快捷的容器化安装部署方式，但那样，你能学到的安装部署知识会少很多。因为所有操作实现都在容器中，可见性很差。

## OneX 部署前准备工作

::: important 重要提示：
- 最好基于一个新的 Linux 环境来安装，一方面可以保持操作系统环境的一致性，极大减少安装失败的概率；另一方面，执行命令时更加安全。
- 如果，你在一个已有的 Linux 环境中安装，并且环境中，已经安装有 etcd、jaeger、kafka、mariadb、mongo、redis 组件，请慎用 uninstall 类操作，因为这些操作可能会清空已有的数据。
:::

在 Debian 12 上安装软件不需要太多东西。了解基本的 Linux 终端命令就足够了。如果你是个 Linux 新手，你可以学习下基本的 Linux 终端命令，以便你理解接下来的操作。如果，你不想学习也没关系，可以跟着本节课的步骤和介绍一步一步去实操，有问题再去学习或者寻求帮助。

:::tip
OneX 不仅可以在 Debian 下安装，基本上在所有 Linux 发行版中都可以安装。但是，如果您想在 Ubuntu 或其他发行版上安装 OneX，则过程略有不同，欢迎你安装后分享。
:::

在部署 OneX 项目前，需要进行一些准备工作。具体准备内容如下。

### 1. 下载 OneX 源码

OneX 项目源码托管在 GitHub 上，国内网络访问 GitHub 网速会比较慢，经常会出现超时，你可以配置 github.com host 来解决：

```bash
$ sudo echo "140.82.114.4 github.com" >> /etc/hosts
```

代理 IP `140.82.114.4` 可能会失效，你可以网上找其他可用的代理 IP 配置上。

想要安装 OneX 系统，首先需要先下载 OneX 源码。**本课程使用的 OneX 源码分支为 `v0.1.0`**。OneX 源码下载命令如下：

```bash
$ mkdir -p $WORKSPACE/golang/src/github.com/superproj
$ cd $WORKSPACE/golang/src/github.com/superproj
$ git clone https://github.com/superproj/onex
```

### 2. 设置并加载环境变量

OneX 项目在安装时，需要设置组件的绑定地址、端口、用户名、密码、CA、日志等，这些设置均统一通过环境变量进行设置。所以，安装前，我们还需要配置环境变量，来设置安装参数。如果你是在一个全新的 Debian 系统上进行安装，环境变量值使用默认值即可。

环境变量太多时，如何高效管理和维护环境变量？

OneX 项目因为组件较多，每个组件的设置也多，这就导致会有大量的环境变量需要设置，其管理和维护就会带来很大的挑战。那么如何维护这些环境变量呢？你可以 通过以下方式来高效管理和维护这些环境变量：
- **环境变量跟组件的配置格式保持一致：** OneX 项目几乎所有组件的配置均使用 viper 包，viper 包可以读取环境变量作为其配置值。viper 包可以将一个 OneX 配置映射为环境变量。

   onex-usercenter 在启动时，使用了 `github.com/superproj/onex/pkg/app` 包来构建其应用框架，`app` 包在构建应用框架时，需要设置一个应用名称，相应的代码见：[app.NewApp("onex-usercenter").Run()](https://github.com/superproj/onex/blob/v0.1.0/cmd/onex-usercenter/main.go#L19)。`app` 包在构建应用程序的时候，使用 viper 包来管理应用程序的配置，并且设置 viper 读取配置时的环境变量格式如下（位于函数 [AddConfigFlag](https://github.com/superproj/onex/blob/v0.1.0/pkg/app/options.go#L44) 中）：

```go
func AddConfigFlag(fs *pflag.FlagSet, name string, watch bool) {
    fs.AddFlag(pflag.Lookup(configFlagName))
    // 启用 viper 的自动环境变量解析功能。这意味着 viper 将自动从环境变量中读取与 viper 变量相对应的值
    viper.AutomaticEnv()
    // 设置环境变量前缀。使用 strings.ReplaceAll 函数将 name 中的连字符替换为下划线，
    // 并使用 strings.ToUpper 将名称转换为大写，然后将其设置为环境变量的前缀
    viper.SetEnvPrefix(strings.ReplaceAll(strings.ToUpper(name), "-", "_"))
    // 设置环境变量键名的替换规则。使用 strings.NewReplacer 函数来指定将点号和连字符替换为下划线
    viper.SetEnvKeyReplacer(strings.NewReplacer(".", "_", "-", "_"))

    ....
}
```

  例如 onex-usercenter 的 YAML 格式的配置如下：

```yaml
http:
  addr: 0.0.0.0:50843 # HTTP 服务监听地址
grpc:
  addr: 0.0.0.0:50090 # gRPC 服务监听地址
```
  `http.addr` 和 `grpc.addr` 两个配置项对应的，环境变量分别为：`ONEX_USERCENTER_HTTP_ADDR` 和 `ONEX_USERCENTER_GRPC_ADDR`。
  在安装 OneX 时，我们设置的环境变量也是 `ONEX_USERCENTER_HTTP_ADDR` 和 `ONEX_USERCENTER_GRPC_ADDR`：
```bash
$ egrep 'ONEX_USERCENTER_HTTP_ADDR|ONEX_USERCENTER_GRPC_ADDR' manifests/env.local
$ export ONEX_USERCENTER_HTTP_ADDR=0.0.0.0:${ONEX_USERCENTER_HTTP_PORT}
$ export ONEX_USERCENTER_GRPC_ADDR=0.0.0.0:${ONEX_USERCENTER_GRPC_PORT}
```
- **使用环境变量文件统一管理和维护：** 面对大量的环境变量，最有效的方式，是使用一个环境变量文件，来统一管理和维护这些环境变量，例如 OneX 的环境变量文件为：[manifests/env.local](https://github.com/superproj/onex/blob/v0.1.0/manifests/env.local)。
- **使用标准化的命名约定：** 我们可以在命令环境变量时遵循一定的格式，能够让我们的环境变量名称，更加统一、规范、可读，从而起到见名知意的作用。环境变量命名时，格式、名称的指代性，要大于环境变量的长度。例如，虽然环境变量 `ONEX_NIGHTWATCH_HEALTH_CHECK_ADDRESS` 很长，但我们看到环境变量名称，里面知道这是 onex-nightwatch 组件的 `health.check-address` 配置项所对应的环境变量。你会发现在设置 `redis.addr`，`log.level` 这类环境变量时，并没有遵循这个命名约定（例如环境变量设置为 `ONEX_REDIS_ADDR` 而非 `ONEX_USERCENTER_REDIS_ADDR`），原因如下：
  - 因为 OneX 多个组件使用了 redis、log 这类通用配置， 为了简化配置项，统一复用了一个环境变量；
  - 规范是一种约定，只要行为能够符合既定的约定，那么这就是一种规范，也能起到简化管理的作用。
- **按类别摆放环境变量：** 我们可以将环境变量按类别、组件进行分类摆放，以便于查找和更新。
- **给环境变量添加详细的注释：** 因为环境变量很多，我们最好给环境变量添加详细的注释，通过注释开发者，立马可以知道这个环境变量的作用。OneX 项目每个环境变量的作用，详见 `manifests/env.local` 中的注释。
- **添加统一前缀规避环境变量名冲突：** 为了避免项目相关的环境变量跟系统中已有的环境变量起变量名冲突，也为了能够通过环境变量名快速识别出其作用域，我们可以给环境变量添加统一的前缀。例如 OneX 项目环境变量统一前缀为ONEX_。
- **使用 Shell 变量扩展，增加灵活性：** 有时候我们不想修改脚本，但想临时设置一个环境变量的值，例如：我们更新了镜像版本，想基于最新的镜像版本，安装 OneX 项目，这时候该怎么做呢？我们可以使用 Shell 变量扩展。例如 `manifests/env.local` 文件中，有以下行：
```bash
# `${ONEX_IMAGE_VERSION:-v0.1.0}` 语法释义如下：
# 当 ONEX_IMAGE_VERSION 变量未定义或为空值时，使用 v0.1.0 作为返回值
export ONEX_IMAGE_VERSION=${ONEX_IMAGE_VERSION:-v0.1.0}
```

  这样，我们只需要在命令行中执行 `export ONEX_IMAGE_VERSION=v0.1.1` 即可修改环境变量文件中的 `ONEX_IMAGE_VERSION` 值为 `v0.1.0`，而不用去修改环境变量文件。

通过这种方式可以极大的提高环境变量设置的灵活性，OneX 项目的环境变量文件，和 Shell 脚本中，大量使用了这种 Shell 变量扩展语法，来提高变量设置的灵活性。

上述方式环境变量设置方式，也是 OneX 项目采取的方式。

#### 设置环境变量文件，并加载环境变量

接下来，我们需要设置环境变量文件，并加载环境变量，命令如下：

```bash
$ cd $GOSRC/github.com/superproj/onex
$ mkdir -p $HOME/.onex
$ cp manifests/env.local $HOME/.onex # 复制后，可以根据需要修改 $HOME/.onex/env.local 中的环境变量
$ export ONEX_ENV_FILE=$HOME/.onex/env.local
$ source ${ONEX_ENV_FILE}
```

### 3. 配置 `$HOME/.bashrc`

为了能够方便访问 onex 项目，我们可以配置一些 alias 和环境变量，至于配置哪些，可以根据自己的需要进行配置。例如，我配置了以下环境变量和 alias 用来快速访问 onex 项目的目录：

```bash
$ tee -a $HOME/.bashrc << 'EOF'
# Alias and environments for onex quick access
export GOSRC="$WORKSPACE/golang/src"
export ONEX_ROOT="$GOSRC/github.com/superproj/onex"
export PATH=${ONEX_ROOT}/_output/platforms/linux/amd64:${ONEX_ROOT}/scripts:$PATH
alias sp="cd $GOSRC/github.com/superproj"
# 键入 `o` 直接进入到 onex 项目根目录
alias o="cd $GOSRC/github.com/superproj/onex"
EOF
```

### 4. 配置域名

在访问 OneX 项目各个组件提供的 API 接口时，为了防止 IP 变更带来的适配，我们最好通过域名来访问 OneX 组件。因为 OneX 项目相关的域名没有注册，还不能在互联网上解析，所以需要配置 hosts，具体的操作如下：

```bash
$ sudo tee -a /etc/hosts << EOF

# host configs for onex project
${ONEX_ACCESS_HOST} onex.usercenter.superproj.com
${ONEX_ACCESS_HOST} onex.gateway.superproj.com
${ONEX_ACCESS_HOST} onex.apiserver.superproj.com
${ONEX_ACCESS_HOST} onex.nightwatch.superproj.com
${ONEX_ACCESS_HOST} onex.pump.superproj.com
EOF
```

### 5. 更新系统

为了确保 Debian 12 系统具有最新的安全补丁和软件，需要更新系统中的软件包版本，运行以下命令来更新：
`sudo apt update`

### 6. 安装依赖

这里，我们还需要安装一些软件包，这些软件包在你安装 OneX 涉及的软件包或者其他软件包时，可能会需要。安装命令如下：

```bash
$ sudo apt install -y dirmngr ca-certificates software-properties-common apt-transport-https 
```

依赖软件包功能介绍：
- `dirmngr` 是一个用于管理网络上的密钥和证书的工具。它可以用来下载、安装和管理 GnuPG 密钥，以及处理证书验证。在 Debian 系统中，`dirmngr` 通常用于支持对 HTTPS 存储库的访问，并确保软件包的完整性和安全性。
- `ca-certificates` 是一组根证书和中间证书，用于验证和加密 HTTPS 连接。它包含了一系列受信任的证书颁发机构（CA）的根证书，用于验证 HTTPS 网站的身份。安装 `ca-certificates` 软件包可以确保系统能够正常验证 HTTPS 连接的证书。
- `software-properties-common` 软件包提供了一些管理软件源的工具和公共文件，包括 `add-apt-repository` 命令，这个命令用于添加 PPA（个人软件包存档）源。通过安装 `software-properties-common`，你可以方便地管理系统的软件源和添加第三方软件源。
- `apt-transport-https` 允许 APT 软件包管理工具通过 HTTPS 协议访问软件源。安装这个软件包可以确保你可以安全地从 HTTPS 存储库中安装软件包，并保持软件包的完整性和安全性。

## 存储组件安装

因为 OneX 系统用到了 MariaDB、Redis、MongoDB、Etcd 等存储组件来存储数据。所以，我们还需要手动安装这些存储组件。具体，我们需要安装和配置以下 4 种存储组件：
1. MariaDB；
2. Redis；
3. Mongo；
4. Etcd。

### MariaDB 安装和配置

首先，我们来看下 MariaDB 如何安装和配置。MariaDB 是 OneX 项目中用来存储 REST 资源的数据库。在项目开发中，需要经常访问 MariaDB 数据库。课程后面会有专门的小节，介绍如何通过编程的方式来访问 MariaDB 中的数据。课程后面也会分享一些 MariaDB 的最佳实践。本小节，我们聚焦在 MariaDB 的安装和配置上。

#### 为什么选择 MariaDB 作为关系型数据库？

OneX 会把 REST 资源的信息存储在关系型数据库中，使用关系型数据库，可以很方便的进行数据查询和存储。关系型数据库我选择了 MariaDB。你可能会问“为啥选择 MariaDB，而不是 MySQL？”. 选择 MariaDB 一方面是因为它是发展最快的 MySQL 分支，相比 MySQL，它加入了很多新的特性，并且它能够完全兼容 MySQL，包括 API 和命令行。另一方面是因为 MariaDB 是开源的，而且迭代速度很快。 

MariaDB 的主要特点如下：
- SQL 支持：MariaDB 完全支持结构化查询语言，这是关系数据库管理的标准语言。 
- ACID 事务：通过原子性、一致性、隔离性和持久性确保数据的可靠性和完整性。 
- 高级数据库操作：从存储过程、触发器和视图到复制和集群，MariaDB 提供了全面的功能套件。
- 搜索和数据安全：全文搜索、空间数据和高级加密等功能使得 MariaDB 多才多艺且安全可靠。

一线大厂中的很多明星产品或项目，也都选择了 MariaDB 作为关系型数据库，使用过程中，也都很丝滑。所以，如果你需要开发一个生产级的应用，底层关系型数据库也建议首选 MariaDB。

#### 一键安装：使用脚本快速安装和卸载 MariaDB

如果你觉得不需要学习或者不想手动安装 MariaDB，你可以直接执行我编写的脚本来一键安装和卸载：

```bash
$ cd ${ONEX_ROOT}
$ ./scripts/installation/mariadb.sh onex::mariadb::sbs::install    # 一键部署
$ ./scripts/installation/mariadb.sh onex::mariadb::sbs::uninstall  # 一键卸载
```

如果你想学习安装细节，可以继续阅读本小节其他内容。

#### MariaDB 安装和配置

1. 配置 MariaDB APT 源

你可以执行以下命令来配置：

```bash
# 从指定的 URL中获取 MariaDB 的发布密钥。这个密钥用于验证 MariaDB 软件包的签名，确保软件包在下载和安装过程中的完整性和安全性
$ sudo apt-key adv --fetch-keys 'https://mariadb.org/mariadb_release_signing_key.asc'
# 配置 MariaDB 安装 APT 源
$ echo "deb [arch=amd64,arm64] https://mirrors.aliyun.com/mariadb/repo/11.2.2/debian/ $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/mariadb-11.2.2.list
# 配置完 APT 源后，需要运行 apt update 更新本地的软件包列表，以确保系统能够获取到最新的软件包信息
$ sudo apt update
```

`lsb_release -cs` 用于获取 Linux 系统当前发行版的代号。例如：

```absh
$ lsb_release -cs
buster
```

`main` 是指软件存储库的主要部分，包含了 Debian 官方支持的自由软件。因此 `$(lsb_release -cs) main` 表示正在使用的软件存储库是针对 Debian 发行版代号为 `buster` 的主要软件存储库。

2. 安装 MariaDB 客户端和 MariaDB 服务端

执行以下命令来安装：

```bash
 # 需要先创建 /var/lib/mysql/ 目录，否则 `systemctl start mariadb` 时可能会报错
$ sudo mkdir -p /var/lib/mysql
$ sudo apt install -y -o Dpkg::Options::="--force-confmiss" --reinstall mariadb-client mariadb-server
```

因为，在卸载 MariaDB 时，我们可能会删除配置文件，这样下一次安装时，默认不会重新安装配置文件，会报配置文件丢失的错误。为了规避这个错误，需要重新安装缺失的配置文件，这可以通过以下 2 个选项来实现：
- `-o Dpkg::Options::="--force-confmiss"`：这个选项指示 `dpkg` 工具在重新安装软件包时忽略任何缺失的配置文件。通常情况下，如果软件包的配置文件丢失，系统会提示用户进行手动处理，但使用这个选项可以强制 `dpkg` 在重新安装时不考虑缺失的配置文件。
- `--reinstall`：这个选项表示要重新安装指定的软件包。

我们可以通过以下命令，来简单快速验证是否安装成功：

```bash
$ mariadb --version
mariadb from 11.2.2-MariaDB, client 15.2 for debian-linux-gnu (x86_64) using readline 5.2
```

在 Linux 系统下，验证一个工具或者软件是否成功安装，最常用、最便捷的方法便是打印目标工具或软件的版本，通常这些版本都会提供`-v/--version/version`选项来打印其版本，例如：

```bash
mariadb --version
etcdctl version
mongosh --version
```

3. 启动 MariaDB，并设置开机启动

执行完 `apt -y install命` 令后，MariaDB 已经处在启动状态，我们可以使用以下命令来验证：

```bash
$ systemctl status mariadb
● mariadb.service - MariaDB 11.2.2 database server
   Loaded: loaded (/lib/systemd/system/mariadb.service; enabled; vendor preset: enabled)
  Drop-In: /etc/systemd/system/mariadb.service.d
           └─migrated-from-my.cnf-settings.conf
   Active: active (running) since Sat 2024-01-20 21:22:47 CST; 4min 24s ago
     Docs: man:mariadbd(8)
           https://mariadb.com/kb/en/library/systemd/
  Process: 3998646 ExecStartPre=/usr/bin/install -m 755 -o mysql -g root -d /var/run/mysqld (code=exited, sta
  Process: 3998648 ExecStartPre=/bin/sh -c systemctl unset-environment _WSREP_START_POSITION (code=exited, st
  Process: 3998652 ExecStartPre=/bin/sh -c [ ! -e /usr/bin/galera_recovery ] && VAR= ||   VAR=`cd /usr/bin/..
  Process: 3998680 ExecStartPost=/bin/sh -c systemctl unset-environment _WSREP_START_POSITION (code=exited, s
  Process: 3998682 ExecStartPost=/etc/mysql/debian-start (code=exited, status=0/SUCCESS)
 Main PID: 3998669 (mariadbd)
   Status: "Taking your SQL requests now..."
    Tasks: 10 (limit: 4915)
   Memory: 78.8M
   CGroup: /system.slice/mariadb.service
           └─3998669 /usr/sbin/mariadbd
```

如果你想重启 Linux 系统后，MariaDB 被自动启动，可以执行以下命令，设置开机启动 MariaDB 服务：

```bash
$ systemctl enable mariadb
```

4. 设置 MariaDB 可以从任何网卡访问

默认情况下，MariaDB 只能从回环网卡（`127.0.0.1`）访问，但在实际开发中， 包括开发环境、测试环境、生产环境，我们通常是通过内网 IP 地址（网卡）来访问。所以，这里还需要设置 MariaDB 的监听网卡。在生产环境中，为了确保访问安全，我们可以将绑定的网卡设置为内网 IP 地址。但是，这里为了方便你访问 MariaDB，减少访问 MariaDB 时出问题的概率，这里直接设置 MariaDB，使其监听在所有网卡上。

设置命令如下：

```bash
$ sudo sed -i 's/^bind-address.*/bind-address = 0.0.0.0/g' /etc/mysql/mariadb.conf.d/50-server.cnf
$ systemctl restart mariadb # 更改完配置后，记得重启 mariadb 服务
```

5. 设置 root 初始密码

MariaDB 安装后，还没有 `root` 用户被创建。后期为了管理 MariaDB，这里我们还需要创建一个 `root` 用户。创建命令如下：

```bash
$ mysqladmin -u${ONEX_MYSQL_ADMIN_USERNAME} password ${ONEX_MYSQL_ADMIN_PASSWORD}
```

:::tip
执行 `mysqladmin` 一定要具有 `root` 权限，否则可能会报： `mysqladmin: connect to server at 'localhost' failed` 错误。
:::

:::important
这里我们设置了 `root` 密码为 `onex(#)666`。这个要记录下来，后面操作 MariaDB 需要用到这个密码。
:::

#### 如何卸载 MariaDB

如果你想卸载 MariaDB，最简单的方法是直接卸载 MariaDB 的软件包，在卸载前，需要先停止 mariadb 服务，命令如下：

```bash
$ sudo systemctl stop mariadb
$ sudo systemctl disable mariadb
$ sudo apt remove -y mariadb-client mariadb-server
```

使用 `apt remove` 删除软件包，并不会删除软件包的配置以及数据目录，如果你想彻底删除 MariaDB，还需要执行以下命令，删除 MariaDB 相关的配置文件和数据目录：

```bash
$ sudo rm -rvf /var/lib/mysql
$ sudo rm -rvf /etc/mysql
$ sudo rm -rvf /usr/share/keyrings/mariadb.gpg
$ sudo rm -vf /etc/apt/sources.list.d/mariadb-11.2.2.list
```

#### MariaDB 常见操作

在项目开发中，经常会执行一些高频的 MariaDB 操作。本小节，就来介绍下，这些操作。

##### Q1：忘记 MariaDB `root` 密码，如何重置？

在我开发项目的过程中，有那么几次忘记了 MariaDB 的 `root` 密码，但 MariaDB 中又有重要数据，不想重新安装，所以，最好的选择便是重置 MariaDB `root` 密码。

在 Linux 上，你可以通过以下步骤重置 MariaDB（MySQL）的 `root` 密码：

1. 首先，停止 MariaDB 服务：

```bash
$ sudo systemctl stop mariadb
```

2. 接下来，以跳过权限检查的方式启动 MariaDB 服务：

```bash
$ sudo mysqld_safe --skip-grant-tables --skip-networking &
```

3. 连接到 MariaDB 服务器：

```bash
$ mysql -u root
```

4. 在 MariaDB 控制台中，使用以下 SQL 命令来修改 `root` 用户的密码：

```sql
MariaDB [mysql]> USE mysql;
MariaDB [mysql]> UPDATE user SET authentication_string = PASSWORD('新密码') WHERE User = 'root';
MariaDB [mysql]> FLUSH PRIVILEGES;
MariaDB [mysql]> exit;
```

5. 请将新密码替换为您想要设置的新密码，例如 `onex(#)666`。

6. 重启 MariaDB 服务：

```bash
$ sudo systemctl restart mariadb
```

现在，您已经成功重置了 MariaDB（MySQL）的 `root` 密码。您可以使用新密码来登录到 MariaDB 控制台。请注意，这些步骤需要在拥有足够权限的用户（比如 `root` 用户）下执行。

##### Q2：如何修改 MariaDB 密码？

你可以执行以下命令来修改：

```bash
$ sudo mysqladmin -uroot -p'旧密码' password '新密码'
```

##### Q3：安全性配置

如果你是在生产环境安装 MariaDB，需要确保 MariaDB 具有很高的安全性。如果你不知道怎么配置，这时候，你可以使用 MariaDB 自带的 `mysql_secure_installation` 脚本，来帮助你配置 MariaDB，使其具有较高的安全性。执行命令如下：

```bash
$ sudo mysql_secure_installation
```

脚本会提示你为 `root` 账户设置密码，删除匿名用户，限制 `root` 用户的远程登录，并删除测试数据库。

```
...
Enter current password for root (enter for none):
...
Set root password? [Y/n] Y
New password: 
Re-enter new password: 
...
Remove anonymous users? [Y/n] Y
...
Disallow root login remotely? [Y/n] Y
...
Remove test database and access to it? [Y/n] Y
...
Reload privilege tables now? [Y/n] Y
...
Thanks for using MariaDB!
```



如果 `Reload privilege tables now?` 选择了 `Y`，脚本将重新加载权限表，确保更改立即生效。上述配置中，建议对所有的问题回答 `Y`（是）。

执行 `mysql_secure_installation` 脚本不仅是最佳实践；它也是在加固你的数据库防范潜在威胁的积极步骤。

### Redis 安装和配置

OneX 项目中有多个组件依赖 Redis，用来做 key-value 存储、分布式锁等，所以，我们还需要安装 Redis。

#### 一键安装：使用脚本快速安装和卸载 Redis

OneX 项目仓库也提供了脚本用来一键安装和卸载 Redis，命令如下：

```bash
$ cd ${ONEX_ROOT}
$ ./scripts/installation/redis.sh onex::redis::sbs::install    # 一键部署
$ ./scripts/installation/redis.sh onex::redis::sbs::uninstall  # 一键卸载
```

#### 安装 Redis 客户端和服务端

安装命令如下：

```bash
# 创建 `/var/lib/redis` 目录，否则 `redis-server` 命令启动时
# 会报：`Can't chdir to '/var/lib/redis': No such file or directory` 错误
$ sudo mkdir -p /var/lib/redis
$ sudo apt install -y -o Dpkg::Options::="--force-confmiss" --reinstall redis-server redis-tools
```

安装之后，可以通过以下命令来检查 redis-server 服务是否正在运行（`running`）：

```bash
$ systemctl status redis-server
● redis-server.service - Advanced key-value store
   Loaded: loaded (/lib/systemd/system/redis-server.service; disabled; vendor preset: enabled)
   Active: active (running) since Sat 2024-01-20 21:37:57 CST; 7s ago
     Docs: http://redis.io/documentation,
           man:redis-server(1)
  Process: 4097240 ExecStart=/usr/bin/redis-server /etc/redis/redis.conf (code=exited, status=0/SUCCESS)
 Main PID: 4097242 (redis-server)
    Tasks: 4 (limit: 4915)
   Memory: 2.1M
   CGroup: /system.slice/redis-server.service
           └─4097242 /usr/bin/redis-server *:36379
```

#### 配置 Redis

安装完 Redis 之后，还需要配置下 Redis，才能够正常使用。配置命令及说明如下：

```bash
# 将 daemonize 由 no 改成 yes，表示允许 Redis 在后台启动
$ sudo sed -i '/^daemonize/{s/no/yes/}' /etc/redis/redis.conf
# 在 `bind 127.0.0.1` 前面添加 `#` 将其注释掉，默认情况下只允许本地连接，注释掉后外网可以连接 Redis
$ sudo sed -i '/^bind .*127.0.0.1/s/^/# /' /etc/redis/redis.conf
# 修改 requirepass 配置，设置 Redis 密码
$ sudo sed -i 's/^# requirepass.*$/requirepass '"${ONEX_REDIS_PASSWORD}"'/' /etc/redis/redis.conf
# 因为我们上面配置了密码登录，需要将 protected-mode 设置为 no，关闭保护模式
$ sudo sed -i '/^protected-mode/{s/yes/no/}' /etc/redis/redis.conf
# 重新启动 Redis
$ sudo systemctl restart redis-server
 # 如果该命令没有报错，说明 Redis 安装成功
$ redis-cli --no-auth-warning -h ${ONEX_REDIS_HOST} -p ${ONEX_REDIS_PORT} -a "${ONEX_REDIS_PASSWORD}" --hotkeys
```

### Mongo 安装和配置

OneX 中授权日志，经过 onex-pump 组件处理后，会被转存到 MongoDB 中，所以我们还需要安装 MongoDB。

#### 一键安装：使用脚本快速安装和卸载 MongoDB

如果你觉得不需要学习或者不想手动安装 MongoDB，你可以直接执行我编写的脚本来一键安装和卸载：

```bash
$ cd ${ONEX_ROOT}
$ ./scripts/installation/mongo.sh onex::mongo::sbs::install    # 一键部署
$ ./scripts/installation/mongo.sh onex::mongo::sbs::uninstall  # 一键卸载
```

如果你想学习安装细节，可以继续阅读本小节其他内容。

##手动安装

手动安装步骤如下：

1. 配置 MongoDB APT 源

APT 源配置命令如下：

```bash
$ apt install -y gnupg
$ wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -
$ echo "deb [arch=amd64,arm64] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
$ wget http://archive.ubuntu.com/ubuntu/pool/main/o/openssl/libssl1.1_1.1.1f-1ubuntu2_amd64.deb -P /tmp/
$ sudo -S -i dpkg -i /tmp/libssl1.1_1.1.1f-1ubuntu2_amd64.deb
$ apt update
```

:::important
这里要安装 `libssl1.1`，否则安装 mongo 时可能会报以下错误：`mongodb-org-mongos : Depends: libssl1.1 (>= 1.1.1) but it is not installable`。Debian 12 新的更新中，也可以默认已经添加了这个包，为了减少安装出错的概率，这里幂等安装下。
:::

2. 安装 MongoDB 包

安装命令如下：

```bash
$ apt -y -o Dpkg::Options::="--force-confmiss" --reinstall install mongodb-org mongodb-org-server
```

3. 安装后配置 MongoDB

安装后的 MongoDB，还需要进行一些设置才能使用， 设置项如下：
1）开启外网访问权限，关闭权限验证；
2）创建管理员账号，设置管理员密码。

具体操作如下。

1) 开启外网访问，关闭权限验证

MongoDB 安装完之后，默认只能通过本地回环网卡访问，为了能够使用内网网卡访问，需要使 MongoDB 在指定的访问网卡上监听。在生产环境中，建议监听在内网网卡上，以提高 MongoDB 的安全。为了，方便你访问 MongoDB，这里直接设置为监听所有网卡。

另外，我们还需要创建管理员账号，用来管理 MongoDB，所以需要先关闭 MongoDB 的认证，这样才能登录 MongoDB，并创建管理员账号，设置密码。

具体操作命令如下：

```bash
# 开启外网访问权限和登录验证（）
$ sudo sed -i '/bindIp/{s/127.0.0.1/0.0.0.0/}' /etc/mongod.conf
$ sudo sed -i '/^#security/a\security:\n  authorization: disabled' /etc/mongod.conf
$ sudo systemctl enable mongod # 设置 mongod 服务开启启动
$ sudo systemctl restart mongod # 修改完配置后，还需要重启，才能生效
$ sudo systemctl status mongod # 查看 mongod 运行状态，如果输出中包含 active (running)字样说明 mongod 成功启动。
```

2) 创建管理员账号，设置管理员密码

之后，便可以通过 `mongosh` 命令登录 MongoDB Shell，并创建管理员账号。我们通过 `use admin` 指令切换到 `admin` 数据库，再通过 `db.auth("用户名"，"用户密码")` 验证用户登陆权限。如果返回 `1` 表示验证成功；如果返回 `0` 表示验证失败，具体的命令如下：

```bash
$ mongosh --quiet "mongodb://${ONEX_MONGO_HOST}:${ONEX_MONGO_PORT}" <<EOF
use admin
db.createUser({user:"${ONEX_MONGO_ADMIN_USERNAME}",pwd:"${ONEX_MONGO_ADMIN_PASSWORD}",roles:["root"]})
db.auth("${ONEX_MONGO_ADMIN_USERNAME}", "${ONEX_MONGO_ADMIN_PASSWORD}")
quit
EOF
```

`db.createUser` 用到了以下 3 个参数：
- `user`： 用户名；
- `pwd`： 用户密码；
- `roles`： 用来设置用户的权限，比如读，读写，写等。

此外，如果想删除用户，可以使用 `db.dropUser("用户名")` 命令来删除。如果你想卸载 MongoDB，可以使用以下命令：


```bash
$ sudo systemctl stop mongod
$ sudo systemctl disable mongod
$ sudo apt remove -y mongodb-org mongodb-org-server
````

如果你想彻底卸载 MongoDB，包括配置和数据，可以执行以下命令：

```bash
$ sudo rm -rvf /var/lib/mongodb
$ sudo rm -vf /etc/apt/sources.list.d/mongodb-org-7.0.list
$ sudo rm -vf /etc/mongod.conf
$ sudo rm -vf /lib/systemd/system/mongod.service
$ sudo rm -vf /tmp/mongodb-*.sock
```

### Etcd 安装和配置

OneX 项目中，Etcd 作为微服务的服务发现中心，onex-apiserver 的数据存储，承担了很重要的角色。这里，我们也需要安装 Etcd 组件。

#### 一键安装：使用脚本快速安装和卸载 Etcd

如果你觉得不需要学习或者不想手动安装 Etcd，你可以直接执行我编写的脚本来一键安装和卸载：

```bash
$ cd ${ONEX_ROOT}
$ ./scripts/installation/etcd.sh onex::etcd::sbs::install    # 一键部署
$ ./scripts/installation/etcd.sh onex::etcd::sbs::uninstall  # 一键卸载
```

如果你想学习安装细节，可以继续阅读本小节其他内容。

#### 手动安装 Etcd

打开 [Etcd Releases](https://github.com/etcd-io/etcd/releases/) 页面，选择需要安装的版本。如果是学习，建议安装最新的稳定版本，原因如下：
- 最新：可以使你在学习阶段，便体验组件最新功能、架构和使用方式等；
- 稳定：对于一个使用者或者新手，可以避免一些不稳定带来的 Bug，为了规避这些 Bug 花费的时间，带来的学习收益并不高。

安装和配置 Etcd 步骤如下：

1. 下载 Etcd

```bash
$ wget https://github.com/etcd-io/etcd/releases/download/v3.5.11/etcd-v3.5.11-linux-amd64.tar.gz
$ tar -xvzf etcd-v3.5.11-linux-amd64.tar.gz -C /tmp/
$ sudo mv /tmp/etcd-v3.5.11-linux-amd64/{etcd,etcdctl,etcdutl} /usr/bin/

```
2. 创建 Etcd 配置文件

```bash
$ sudo mkdir /etc/etcd
$ sudo mkdir -p ${ONEX_LOG_DIR} # 需要创建 ${ONEX_LOG_DIR} 目录，否则 Etcd 启动时会报错
$ sudo tee -a /etc/etcd/config.yaml << EOF
name: onex
data-dir: ${ONEX_INSTALL_DIR}/thirdparty/etcd
advertise-client-urls: http://0.0.0.0:${ONEX_ETCD_CLIENT_PORT}
listen-client-urls: http://0.0.0.0:${ONEX_ETCD_CLIENT_PORT}
initial-advertise-peer-urls: http://0.0.0.0:${ONEX_ETCD_PEER_PORT}
initial-cluster: onex=http://0.0.0.0:${ONEX_ETCD_PEER_PORT}
log-outputs: [${ONEX_LOG_DIR}/etcd.log]
log-level: debug
EOF
```

3. 配置 Etcd 为 systemd 启动

安装和配置完 Etcd 后还要启动 Etcd。我们可以使用以下方式来启动：

```bash
$ nohup /usr/bin/etcd --config-file=/etc/etcd/config.yaml &
```

但是这种方式不好维护：
- Etcd 组件状态查询麻烦，只能通过 `ps -ef | grep etcd`，根据进程是否存在来判断 Etcd 的状态；
- Etcd 重启麻烦，需要先 kill 调 Etcd Job，才能重新执行 `nohup` 启动 Etcd；
- 故障自愈差：如果 Etcd 进程异常退出，这种方式是无法自动拉起 Etcd 进程的。

所以，这里我们最好通过 systemd 来启动 Etcd。要使用 systemd 来管理 Etcd，就要创建一个 systemd unit 文件。我们可以使用自己的 systemd 的知识储备，来手动编写一个 systemd unit。但更推荐的方法是：尝试从 etcd 代码仓库中，查看有没有现成的 systemd unit 文件可用，如果有直接复用（可能需要一点点适配）即可。

因为一般的开源软件，都有比较大的概率会在代码仓库中，存放一些部署模版文件，例如：systemd unit 文件。所以，我们可以尝试在 Etcd 代码仓库中查找，方法如下：

```bash
$ git clone https://github.com/etcd-io/etcd
$ cd etcd
$ find . -iname "*systemd*"
./contrib/systemd
./client/pkg/systemd
```

通过上面的查找，我们不难分辨出 [./contrib/systemd]()目录中保存了 systemd unit 文件。进入 `./contrib/systemd` 目录，发现其模版文件为：[etcd.service](https://github.com/etcd-io/etcd/blob/main/contrib/systemd/etcd.service)。之后，我们便可以修改这个模版文件，并部署 Etcd。

具体启动方法如下：

```bash
$ sudo tee -a /lib/systemd/system/etcd.service <<'EOF'
# Etcd systemd unit template from
# https://github.com/etcd-io/etcd/blob/main/contrib/systemd/etcd.service
[Unit]
Description=etcd key-value store # 指定了单元的描述，即 etcd 键值存储
Documentation=https://github.com/etcd-io/etcd # 提供了指向 etcd 项目文档的链接
After=network-online.target local-fs.target remote-fs.target time-sync.target # 指定了服务的启动顺序
Wants=network-online.target local-fs.target remote-fs.target time-sync.target # 指定了服务的启动依赖

[Service]
Type=notify # 指定了服务的类型。notify 类型表示服务会在准备就绪时发送通知
ExecStart=/usr/bin/etcd --config-file=/etc/etcd/config.yaml # 指定了服务启动时要执行的命令，这里是使用指定的配置文件启动 etcd
Restart=always # 指定了服务的重启行为。always 表示服务会在退出时总是被重启
RestartSec=10s # 指定了重启的间隔时间
LimitNOFILE=40000 # 指定了服务的文件描述符限制，这里设置为 40000

[Install]
WantedBy=multi-user.target # 指定了服务的安装目标，这里表示服务会被添加到 multi-user.target，以便在多用户模式下启动
EOF
```

执行以下命令启动 etcd 服务，并设置为开机启动：

```bash
$ sudo systemctl daemon-reload
$ sudo systemctl enable etcd
$ sudo systemctl start etcd
$ sudo systemctl status etcd
● etcd.service - etcd key-value store
   Loaded: loaded (/lib/systemd/system/etcd.service; enabled; vendor preset: enabled)
   Active: active (running) since Sun 2024-01-21 08:40:55 CST; 44s ago
     Docs: https://github.com/etcd-io/etcd
 Main PID: 2622 (etcd)
    Tasks: 14 (limit: 4915)
   Memory: 8.0M
   CGroup: /system.slice/etcd.service
           └─2622 /usr/bin/etcd --config-file=/etc/etcd/config.yaml
```

可以看到 etcd 服务处在运行中状态。

## 其他中间件安装

除了需要部署 MariaDB、Redis、MongoDB、Etcd 四大存储之外，还需要安装 Jaeger 和 Kafka 中间件：
- Jaeger：实现微服务之间的调用链；
- Kafka：onex-usercenter 作为生产者，会向 kafka 上报授权日志消息，其消费者为 onex-pump。

### 一键安装：一键安装其他中间件

OneX 项目提供了中间件的一键安装脚本，如果你不想手动安装，可以执行此脚本，执行命令如下：

```bash
$ $ cd ${ONEX_ROOT}
$ ./scripts/installation/install.sh onex::install::middleware::sbs::install    # 一键部署
$ ./scripts/installation/install.sh onex::install::middleware::sbs::uninstall  # 一键卸载
```

### Jaeger 安装和配置

因为 Jaeger 的安装相对来说比较复杂，需要安装和部署 Jaeger UI、Jaeger-collector、jaeger-query、jaeger-agent 等组件，再加上 Jaeger 不是本套课程的重点，也不是你找工作面试时有帮助的技能，为了减轻你的学习负担，Jaeger 的手动安装仍然使用容器化安装。为了保持整个安装脚本的规范性和一致性，我仍然提供了 `onex::jaeger::sbs::install`、`onex::jaeger::sbs::uninstall`函数，函数如下：

```bash
# Install the jaeger step by step.
# sbs is the abbreviation for "step by step".
function onex::jaeger::sbs::install()
{
  onex::jaeger::docker::install
  onex::log::info "install jaeger successfully"
}

# Uninstall the jaeger step by step.
function onex::jaeger::sbs::uninstall()
{
  onex::jaeger::docker::uninstall
  onex::log::info "uninstall jaeger successfully"
}
```

你可能会问，为什么不直接使用 `onex::jaeger::docker::install`、`onex::jaeger::docker::uninstall` 来安装，而要包一层 `onex::jaeger::sbs::install`、`onex::jaeger::sbs::uninstall` 函数？是因为，在开发中，整个项目代码的逻辑性、一致性、规范性和可维护性，有时候要大于一些额外的代码编写成本。

具体怎么处理，需要你在开发过程中，根据实际情况自行判断。但在本例中，包装为 `onex::jaeger::sbs::install`、`onex::jaeger::sbs::uninstall` 函数收益要大于额外的十几行代码成本。

### Kafka 安装和配置

安装和配置 Kafka 也有一定的复杂度，同样，因为如何安装和配置 Kafka，对你找工作面试、技术的提升没有什么影响，为了减轻你的学习负担，安装和配置 kafka，仍然使用容器化的方式。OneX 提供了 `onex::kafka::sbs::install`、`onex::kafka::sbs::uninstall` 用来进行"手动"安装和配置，代码如下：

```bash
# Install the kafka step by step.
# sbs is the abbreviation for "step by step".
# Refer to https://kafka.apache.org/documentation/#quickstart
function onex::kafka::sbs::install()
{
  onex::kafka::docker::install
  onex::log::info "install kafka successfully"
}

# Uninstall the kafka step by step.
function onex::kafka::sbs::uninstall()
{
  onex::kafka::docker::uninstall
  onex::log::info "uninstall kafka successfully"
}
```

## OneX 项目组件安装和配置

上面，我们安装了存储组件和其他依赖的中间件组件，接下来，我们就可以部署 OneX 项目的组件了。

### 一键安装：一键 OneX

OneX 项目提供了一键安装脚本，如果你不想手动安装，可以执行此脚本，执行命令如下：

```bash
$ cd ${ONEX_ROOT}
$ ./scripts/installation/onex.sh onex::onex::sbs::install    # 一键部署
$ ./scripts/installation/onex.sh onex::onex::sbs::uninstall  # 一键卸载
```

### OneX 组件手动安装

因为 OneX 项目非常规范，所以 OneX 项目各个组件的安装方法也可以保持高度的一致性，这就使得我们可以使用固定的模版，来安装这些组件，提高安装、部署和维护效率。具体，我们需要安装以下组件（根据安装顺序排列）：
1. onex-usercenter；
2. onex-apiserver；
3. onex-gateway；
4. onex-nightwatch；
5. onex-pump；
6. onex-toyblc；
7. onex-controller-manager；
8. onex-minerset-controller；
9. onex-miner-controller；
10. onex-fakeserver；
11. onex-cacheserver；
12. onexctl；
13. kubectl。

因为 OneX 中各个组件是有依赖关系的，所以最好遵循安装顺序，OneX 项目组件依赖关系如下图所示：

![OneX组件依赖关系](/images/OneX组件依赖关系-水印.png)

以上各组件，按照安装方式可分为：
- 服务端组件；
- 客户端组件。

接下来，我们就来看下如何安装和配置 OneX 的各个组件。

#### OneX 存储组件初始化

onex-usercenter组件依赖一些 MariaDB 数据库表。onex-pump组件依赖于 MongoDB，来转存清洗后的授权日志。所以，我们需要首先初始化这些 MariaDB 和 MongoDB。

##### MariaDB 初始化

初始化步骤如下：

1. 创建具有普通权限的 MariaDB 用户

```bash
$ mariadb -h${ONEX_MYSQL_HOST} -P${ONEX_MYSQL_PORT} -u"${ONEX_MYSQL_ADMIN_USERNAME}" -p"${ONEX_MYSQL_ADMIN_PASSWORD}" << EOF
GRANT ALL PRIVILEGES ON *.* TO ${ONEX_MYSQL_USERNAME}@'%' identified by "${ONEX_MYSQL_PASSWORD}";
FLUSH PRIVILEGES;
EOF
```

各个变量的默认值如下：
- `ONEX_MYSQL_ADMIN_USERNAME`: `root`；
- `ONEX_MYSQL_ADMIN_PASSWORD`: `onex(#)666`；
- `ONEX_MYSQL_USERNAME`: `onex`；
- `ONEX_MYSQL_PASSWORD`: `onex(#)666`。

2. 初始化 MariaDB 表

执行以下命令，创建并初始化 MariaDB 表：

```bash
$ mariadb -h${ONEX_MYSQL_HOST} -P${ONEX_MYSQL_PORT} -u"${ONEX_MYSQL_ADMIN_USERNAME}" -p"${ONEX_MYSQL_ADMIN_PASSWORD}" << 'EOF'
source configs/onex.sql;
use onex;
INSERT INTO `uc_user` VALUES (0,'user-admin','admin',1,'admin',                                              '$2a$10$KeHjeGtHOuUYs6l76fgLSeDdjBgfv7loo89svN6p5r40XItHc/NV2', 'colin404@foxmail.com','181X',now(),now());
EOF
```

上述命令会初始化 OneX 表，并在 `uc_user` 表中创建一个默认的 `admin` 用户，其用户 ID 为 `user-admin`。

##### MongoDB 初始化

因为在安装 MongoDB 时，创建的 `admin` 用户具有 MongoDB 的 `root` 权限，权限过大安全性会降低。为了提高安全性，我们还需要创建一个 onex 普通用户来连接和操作 MongoDB。创建命令如下：

```bash
$ encoded=$(echo -n "${ONEX_MONGO_ADMIN_PASSWORD}"|jq -sRr @uri)
$ mongosh --quiet mongodb://${ONEX_MONGO_ADMIN_USERNAME}:${encoded}@${ONEX_MONGO_URL}/${ONEX_MONGO_DATABASE}?authSource=admin << EOF
db.createUser({user:"${ONEX_MONGO_USERNAME}",pwd:"${ONEX_MONGO_PASSWORD}",roles:["dbOwner"]})
db.auth("${ONEX_MONGO_USERNAME}", "${ONEX_MONGO_PASSWORD}")
quit;
EOF
```

在 MongoDB 连接字符串中，如果密码中包含特殊字符（如`:`、`@`、`/` 等），需要对其进行转义。`#` 的 URL 编码为 `%23`。可以使用 [URL 编码/解码](http://www.jsons.cn/urlencode/) 工具进行转义。也可以使用以下命令来转义：

```bash
encoded=$(echo -n "${ONEX_MONGO_ADMIN_PASSWORD}"|jq -sRr @uri)
```

`mongodb://root:'onex(%23)666'@127.0.0.1:27017/onex?authSource=admin` 各部分含义如下：
- `mongodb://`：指示使用 MongoDB 协议连接；
- `root:'onex(#)666'`：这是用于身份验证的用户名和密码。在这种情况下，用户名是 `onex`，密码是 `onex(#)666`。请注意，密码中的特殊字符#在 URL 中需要进行 URL 编码，因此被替换为 `%23`；
- `127.0.0.1:27017`：这是 MongoDB 服务器的主机和端口。在这种情况下，MongoDB 服务器位于本地主机（即 `127.0.0.1`）的 `27017` 端口上；
- `onex`：这是要连接的数据库的名称。在这种情况下，数据库名称是 `onex`；
- `authSource=onex`：这是指定身份验证数据库的选项。在这种情况下，身份验证数据库也是`onex`；

创建完 `onex` 普通用户后，我们就可以通过 `onex` 用户登录 MongoDB 了：

```bash
$ mongosh --quiet mongodb://onex:'onex(%23)666'@127.0.0.1:27017/onex?authSource=onex
```

#### OneX 安装文件创建

要安装 OneX 中的各个组件，首先需要将这些组件的安装文件、配置文件等构建出来。具体你可以通过以下命令来构建各个构建产物：

```bash
# 设置 Makefile 构建出产物的保存位置，默认为 ${ONEX_ROOT}/_output
$ export OUTPUT_DIR=${LOCAL_OUTPUT_ROOT}
$ make build # 构建服务二进制文件，这一步可能耗时比较久，因为要下载 Go 包
$ make gen.systemd # 生成 Systemd Unit 文件
$ make gen.appconfig # 生成应用配置文件
$ make gen.ca # 生成 CA 证书
$ make gen.kubeconfig # 生成 kubectl admin kubeconfig 文件
```

在执行 `make gen.ca` 生成 CA 文件时，如果机器上没有`cfssl`、`cfssljson`、`cfssl-certinfo` 这些工具，则需要下载安装。因为访问的是外网，网速较慢，可能出现超时下载错误。这个没办法，执行 `make sbs-uninstall` -> `make sbs-install` 重试安装吧。当然，我更建议你阅读安装脚本，魔改安装脚本，使得安装流程可以从失败处开始。

以上 Makefile 规则的具体实现，你可以阅读 Makefile 源码学习。后面课程也会介绍这些 Makefile 规则的具体实现。

#### OneX 服务端组件安装和配置

上面，我们构建出了 OneX 项目各个组件部署需要的文件，这些文件保存在 `${ONEX_ROOT}/_output` 目录下。接下来，我们便可以将这些文件部署在指定的位置并运行。具体操作命令如下：

```bash
$ export OUTPUT_DIR=${LOCAL_OUTPUT_ROOT}
$ OS=$(go env GOOS)
$ ARCH=$(go env GOARCH)
$ sudo mkdir -p ${ONEX_BIN_DIR}
$ sudo cp ${LOCAL_OUTPUT_ROOT}/platforms/${OS}/${ARCH}/* ${ONEX_BIN_DIR}/
$ sudo mkdir -p ${ONEX_CONFIG_DIR}
$ sudo cp ${LOCAL_OUTPUT_ROOT}/appconfig/* ${ONEX_CONFIG_DIR}/
$ sudo cp -r ${LOCAL_OUTPUT_ROOT}/cert ${ONEX_CONFIG_DIR}/
$ sudo cp ${LOCAL_OUTPUT_ROOT}/config ${ONEX_CONFIG_DIR}/
$ sudo cp ${LOCAL_OUTPUT_ROOT}/systemd/* /etc/systemd/system/
$ sudo systemctl daemon-reload
$ services="onex-usercenter onex-apiserver onex-gateway onex-nightwatch onex-pump onex-toyblc onex-controller-manager onex-minerset-controller onex-miner-controller onex-fakeserver onex-cacheserver"
$ for service in ${services}; do sudo systemctl enable ${service}; sudo systemctl restart ${service}; done
```

可以看到 OneX 虽然包含了很多组件，但安装起来还是很便捷的，这是因为项目比较规范，能够将很多内容抽象成为一个模版，并通过脚本进行统一的处理和安装。

#### OneX 客户端组件安装和配置

上面，我们安装了 OneX 服务端组件，接下来就可以安装 OneX 客户端组件了。OneX 的客户端组件是 `onexctl`，但因为访问 onex-apiserver 需要使用 `kubectl`，所以还需要安装 `kubectl`。

1. `kubectl` 安装

安装命令如下：

```bash
$ curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
$ chmod +x kubectl
$ sudo mv kubectl /usr/bin/
$ kubectl version --client --output=yaml # 验证 kubectl 是否安装成功
```

**重点：** 如果你想访问 onex-apiserver，需要设置 `KUBECONFIG` 为 onex-apiserver 的配置文件。可以执行以下命令来设置：

```bash
export KUBECONFIG=/opt/onex/etc/config
```

或者：

```bash
$ kubectl --kubeconfig=/opt/onex/etc/config get minerset -A
```

2. `onexctl` 安装

执行以下命令安装：

```bash
$ cp ${ONEX_BIN_DIR}/onexctl $HOME/bin
$ mkdir -p $HOME/.onex
$ cp ${ONEX_CONFIG_DIR}/onexctl.yaml $HOME/.onex
$ onexctl minerset list
```

## 测试安装是否成功

你可以执行以下命令来测试：

```bash
$ ./scripts/installation/test.sh onex::test::test
```

具体怎么测试每一个 OneX 组件，上一节课有介绍，本节课就不再详细介绍。具体测试细节和实现，你可以可以阅读 `scripts/installation/test.sh`脚本，源码面前无秘密。

## 总结

本节课详细介绍了 OneX 项目具体是如何手动安装的，希望能够通过详细的安装教程，提供一次动手实战的机会，让你掌握 Linux 下存储、中间件、软件等的安装方式。Linux 部署软件，是 Linux 运维最基本的操作，其中还有很多基础知识没有深入介绍，例如：Linux 常用的操作指令、Systemd 的原理和操作、Debian 软件包管理等。后面会通过技术分享的形式，继续补充这部分内容。

本节课中，OneX 项目的手动安装步骤如下：

![OneX项目的手动安装步骤](/images/OneX项目的手动安装步骤-水印.png)

## 课后练习

1. 本课程安装的 MariaDB 版本为 `11.2.2`，请在升级 MariaDB 版本为 `11.3.1`，并重启 onex-usercenter、onex-gateway 组件，确保二者连接新版本的 MariaDB，并重启成功；
2. 请用执行以下命令重新安装 OneX：

```bash
$ make sbs-uninstall
$ make sbs-install
```

如果遇到问题，请试着阅读安装脚本，解决问题，重新安装。
