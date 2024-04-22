---
title: 如何快速准备一个易用的 Go 开发环境？
shortTitle: Go开发环境准备
date: 2022-04-05
sticky: true
star: true
isOriginal: true
icon: zhunbei
order: 1
category:
  - 实战营
tag:
  - 实战营
---

OneX 项目为了能够承载更多的开发技术，设计的相对复杂，这也直接提现在了安装的复杂性上。为了确保你能够顺利的安装 OneX，这里建议你参考本文，从零配置一个 Go 开发环境。当然，如果你是在已有的环境上安装，问题也不大，可能会有一些失败的步骤，但不多且可自行解决。

首先，这里首先分享下，学习一个开源项目最高效的学习步骤：
1. 阅读 README，掌握项目的部署方式、功能列表、使用方式等；
2. 克隆源码，本地编译构建，并启动服务，测试自己关注的功能点；
3. 阅读（走读/精读）源码，根据需要修改源码，实现期望的效果，并重新编译测试。

上述步骤 2、3，需要你有一个适配项目开发语言的开发环境，对于 Go 项目来说，需要你有一个 Go 开发环境。为了最大化提高 Go 项目开发效率，开发环境需要是易用且高效的。

本文，我来介绍下，如何快速配置一个易用的开发环境。

## 为什么学习开源项目，要先从部署开始？

因为 OneX 部署分为了 4 节课，这里解释下为什么要详细介绍 OneX 项目的部署。

如果你想深入的学习一个开源项目，在阅读源码前，最好先部署好这个项目。先部署项目具有以下好处：
1. **帮助理解：** 对于新的技术，如果能运行起来，我们就可以通过操作和编写代码了解它如何工作，从而理解技术的工作原理和实现方式；
2. **掌握实践技能：** 搭建一个新的技术环境，需要学会一些具体的运维技能，例如 Linux 基本操作、Linux 常用的命令行工具、服务部署方法等。这些知识和内容，都是未来你必备的核心技能；
3. **测试和调试：** 搭建技术环境一般需要一定程度的调试和排错，这样不仅可以帮助我们带着一个全新的环境快速排错，并且培养了排错技能；
4. **自定义和优化环境：** 每个项目都有自己的要求，而搭建自己的环境更加贴合成长和研发目标，可以为你带来更好的开发体验，提升效率和能力。

总之，搭建一个新的技术环境可以加快我们熟悉这项技术的节奏，同时更好地理解技术原理与应用，这对于我们的学习、开发和实践都很有帮助。

## 如何快速准备好一个 Go 开发环境？

因为本课程是基于 Linux 进行开发、部署的，为了避免环境差异带来的问题，建议你也基于 Linux 系统进行部署。Go 的优势之一，是跨平台，所以如果你有 Mac、Windows 操作系统，理论上也可以顺利部署。只不过，你要自己根据理解进行部署。欢迎大家在评论区分享这些平台的部署教程。

如果你刚接触 Linux，建议你最好使用 Linux 进行开发部署，因为在使用 Linux 的同时，也是在学习 Linux，并且是带着需求去学习、实战，学习效率更高。

我们可以通过以下 3 步，来快速从 0 到 1 准备好一个 Go 开发环境：
1. Linux 服务器申请和配置；
2. Go 语言开发环境安装和配置；
3. Go 开发 IDE 安装和配置。

## Linux 服务器申请和配置

本项目基于 Linux 服务器进行开发、部署，所以首先你需要准备一台 Linux 服务器。OneX 项目选择的 Linux 发行版为 [Debian 12](https://mirrors.163.com/debian-cd/12.4.0)，原因如下：
- 稳定性：Debian 以其稳定性而闻名。它的发布周期较长，软件包经过了较长时间的测试和稳定性验证。这使得它成为许多服务器环境的首选，尤其是对于需要长期支持和可靠性的生产环境；
- 社区支持：Debian 有一个庞大的社区支持，这意味着可以很容易地找到关于 Debian 的文档、教程和支持；
- 软件包管理：Debian 使用 APT（Advanced Package Tool）作为其软件包管理工具，它提供了一个强大且易于使用的系统来安装、更新和管理软件包；
- 安全性：Debian 项目对安全性有很高的关注，定期发布安全更新，并提供了一个专门的安全团队来处理漏洞和安全问题；
- 软件包数量和多样性：Debian 软件仓库中包含了大量的软件包，涵盖了各种用途和需求，这使得它成为一个非常灵活的选择。

另外，几乎所有的云厂商都支持 Debian 发行版，选择 Debian 未来在跨云迁移时，不会存在任何问题。Debian 在很多一线企业内部，也是标准的公司级操作系统，例如字节跳动默认的 Linux 发行版，就是用了 Debian。

综上，我选择最新的稳定版本 Debian 12 作为我的开发、测试、部署 Linux 发行版。

> 重点：因为 OneX 项目安装需要用到很多 Linux 工具，这些工具的使用方式会受 Linux 发行版的影响，虽然绝大部分命令在不同 Linux 发行版的行为是一致的，但为了尽可能提高你安装的成功率，减少安装过程遇到的错误，这里还是建议你的 Linux 发行版跟本课程使用的发行版，保持一致，也即选择 Debian 12 Linux 发行版。

### 准备 Linux 服务器

:::tip 再次提示
如果选择非 Debian 操作系统，部署阶段，可能会遇到一些问题，需要你优先根据错误信息网上搜寻解决方案，解决这些问题。如果是 Linux 发行版，安装过程中会有一些报错，但不会很多。如果你想部署起来成功率最高、最快捷，建议直接选择 Debian 12 发行版。
:::

你有多种方法准备一个 Linux 服务器，最简单、省钱的方法是购买一台 Linux 云服务器，比如登录腾讯云官网，购买一台轻量应用服务器，购买链接为 [腾讯云轻量应用服务器](https://buy.cloud.tencent.com/lighthouse?blueprintType=PURE_OS&blueprintOfficialId=lhbp-qnuz61zs&regionId=8&zone=ap-beijing-3&bundleId=bundle_starter_mc_med2_01&loginSet=AUTO)。购买时，你可以根据预算及需要选择配置，但要注意操作系统镜像需要是 Debian 12（选择路径：基于操作系统镜像 -> Debian -> Debian 12.0）。

购买完成之后，在轻量服务器列表页面，能够看到所购买的轻量服务器及其公网 IP 地址（带 (公) 后缀的 IP 地址），通过公网 IP 地址登录服务器，如下图所示：
![轻量应用服务器列表](/images/轻量应用服务器列表.png)

这里分享下我日常的开发环境：
- 我工作机用的是 Windows：因为 Windows 上有很多可以提高工作效率的工具，例如：Ditto、EveryThing、TotalCommand、Autohotkey、FastStone 等；
- 开发机用的是腾讯云 CVM （2 核 4G）：之所以用云服务器作为开发机，是因为只要有网络，我就可以通过 Xshell 登录到开发机上，进行开发。不需要再进行复杂的开发环境配置，而且开发机上已经保存了开发需要的代码。另外，基于 Linux 进行开发，我也能够使用 Linux 上的各种工具，提高开发效率，例如：`find`、`grep`、`bash` 脚本、`sed`、`awk` 等。我的开发环境和公司应用软件部署环境保持一致，也能够使我不需要进行环境差异性适配，例如：操作方式不一致、软件编译环境不一致等，带来的额外学习成本和排障工作。

### 使用 `root` 用户登录并配置 Linux 服务器

你可以使用 `root` 用户、`root` 密码、Linux 服务器 IP 地址，并通过 [Xshell](https://www.netsarang.com/en/xshell-download/) 等终端工具登录 Linux 服务器。登录 Linux 服务器后，你需要先对 Linux 服务器进行一些简单的配置，具体步骤如下。

1. 使用 `root` 用户登录 Linux 系统，确认 Linux 发行版符合预期

你可以使用以下命令，来检查 Linux 发行版是否是 Debian 12：

```bash
# cat /etc/os-release
PRETTY_NAME="Debian GNU/Linux 12 (bookworm)"
NAME="Debian GNU/Linux" # 操作系统的名称
VERSION_ID="12" # 操作系统的版本号
VERSION="12 (bookworm)" # 操作系统的版本号和代号
VERSION_CODENAME=bookworm # 操作系统版本的代号
ID=debian # 操作系统的ID
HOME_URL="https://www.debian.org/" # 操作系统官方网站的链接
SUPPORT_URL="https://www.debian.org/support" # 操作系统支持的链接
BUG_REPORT_URL="https://bugs.debian.org/" # 报告操作系统错误的链接
```

如果上述输出中 `NAME` 值为 `Debian GNU/Linux`、`VERSION_ID` 值为 `12`，则说明当前 Linux 发行版为 Debian 12。


当然你使用 `lsb_release -a` 命令，也可以查看 Linux 发行版：

```bash
# lsb_release -a
No LSB modules are available.
Distributor ID:        Debian
Description:        Debian GNU/Linux 12 (bookworm)
Release:        12
Codename:        bookworm
```

2. 在 `root` 用户下，创建普通用户。

创建普通用户方法如下：
```bash
# useradd -m -d /home/going -s /bin/bash going # 创建 going 用户，并指定用户根目录为  /home/going，登录 shell 为 /bin/bash
# passwd going # 设置 going 用户的登录密码
New password:
Retype new password:
passwd: password updated successfully
```

:::tip
执行 `useradd going` 命令创建的用户默认没有用户根目录，并且默认 Shell 不易用。所以我们要指定 `-d` 和 `-s` 选项来创建用户根目录和设置登录 Shell。
:::

创建完普通用户之后，我们就可以使用普通用户 `going` 登录系统，并执行各类操作，使用普通用户操作 Linux，因为权限有限，可以可以最大限度确保 Linux 服务器的安全。

:::tip
强烈建议使用普通用户进行日常代码开发，因为你永远无法 100% 保证自己不会执行 `rm -rf / *` 这类操作，你的研发生涯，哪怕只有那么 1 ～ 2 次此类操作，也绝对你够你糟心一段时间的。
:::

3. 添加 sudoers。

在 **步骤 2** 中，我们创建了一个普通用户 `going`，有时候普通用户也需要执行一些需要 root 权限的操作，例如使用 `apt` 安装一个软件包，这时候最好的办法是将普通用户添加到 sudoers 中，这样普通用户就可以通过 `sudo` 命令来暂时获取 root 权限。具体来说，你可以执行以下命令将 `going` 用户添加到 sudoers 中：

```bash
# sed -i '/^[a-z]* ALL=(ALL) NOPASSWD: ALL/a\going ALL=(ALL) NOPASSWD: ALL' /etc/sudoers
```

之后，你会发现 `/etc/sudoers` 文件中，新增了以下一行：

```bash
going ALL=(ALL) NOPASSWD: ALL
```

在 Linux 系统中，`/etc/sudoers` 文件用于配置 `sudo`（superuser do）命令的授权规则。`sudo` 命令允许普通用户以超级用户（`root`）的权限执行特定的命令，而不需要直接使用 `root` 账户登录。文件中每一行都是一个 sudo 配置，其格式如下：
```
用户/组 主机=([用户]:[用户组]) [是否需要密码验证:] 命令1,[是否需要密码验证:]:命令2,...
```

格式解释如下：
- `用户/组`：表示需要提升权限的用户/组，前面加%表示组，不加表示用户；
- `主机`：表示用户在哪台主机登录时可以使用该条 `sudo`，配置时参数为主机名，`ALL` 表示任意主机；
- `[用户]`：表示提升到该用户的权限，`ALL` 表示任意用户
- `[用户组]`：表示提升到该用户组的权限，`ALL` 表示任意用户组
- `([用户]:[用户组])`：该项可以省略，省略时相当于（`root:root`）
- `[是否需要密码验证:]`：注意这个密码是当前用户密码。该项省略时表示需要密码，如无需验证，添加参数 `NOPASSWD`；
- `命令1`：表示需要 `sudo` 的命令，需要写全命令的绝对路。`ALL` 表示所有命令。

所以 `going ALL=(ALL) NOPASSWD: ALL` 规则表示：允许用户 `going` 在任何主机上以任何用户的身份执行任何命令时都不需要输入密码，即可获得 sudo 权限。之后，我们就可以使用 `sudo -i` 直接切换到 `root` 用户，或者在 `going` 用户下执行 `sudo apt install -y jq` 来安装软件包。

### 使用普通用户登录并配置 Linux 服务器

刚刚我们创建了 `going` 普通用户，接下来，我们就可以使用 `going` 用户登录并配置 Linux 服务器，具体步骤如下。

1. 登录 Linux 系统。

假设我们使用 `going` 用户作为实战用户，使用 Xshell/SecureCRT 等工具登录 Linux 系统。这里我更推荐 Xshell，功能强大、易用。

2. 配置 `$HOME/.bashrc` 文件。

我们登录新服务器后的第一步就是配置 `$HOME/.bashrc` 文件，以使 Linux 登录 Shell 更加易用，例如：配置 `LANG` 解决中文乱码；配置 `PS1` 可以使命令行提示符显示更简洁。配置后的内容如下：

```bash
# .bashrc

# Source global definitions
if [ -f /etc/bashrc ]; then
    . /etc/bashrc
fi

# Alias definitions.
# You may want to put all your additions into a separate file like
# ~/.bash_aliases, instead of adding them here directly.
# See /usr/share/doc/bash-doc/examples in the bash-doc package.
if [ -f ~/.bash_aliases ]; then
    . ~/.bash_aliases
fi

# Enable color support of ls and also add handy aliases
if [ -x /usr/bin/dircolors ]; then
    test -r ~/.dircolors && eval "$(dircolors -b ~/.dircolors)" || eval "$(dircolors -b)"
    alias ls='ls --color=auto'
    alias ll='ls --color=auto -l'
    alias la='ls --color=auto -A'
    alias l='ls --color=auto -lA'
    alias dir='dir --color=auto'
    alias vdir='vdir --color=auto'

    alias grep='grep --color=auto'
    alias fgrep='fgrep --color=auto'
    alias egrep='egrep --color=auto'
fi

# Colored GCC warnings and errors
export GCC_COLORS='error=01;31:warning=01;35:note=01;36:caret=01;32:locus=01:quote=01'

# Some aliases to prevent mistakes
alias rm='rm -i'
alias cp='cp -i'
alias mv='mv -i'

# Create a default workspace directory to keep all work files in one place
if [ ! -d $HOME/workspace ]; then
    mkdir -p $HOME/workspace
fi

# User-specific environment settings
# Basic environment
# Set system language to en_US.UTF-8 to avoid Chinese character display issues in the terminal
export LANG="en_US.UTF-8"
# The default PS1 setting displays the full path, to prevent it from becoming too long,
# it now shows "username@dev last_directory_name"
export PS1='[\u@dev \W]\$ '
# Set the workspace directory
export WORKSPACE="$HOME/workspace"
# Add $HOME/bin directory to the PATH variable
export PATH=$HOME/bin:$PATH
# Set the default editor to vim
export EDITOR=vim

# When logging into the system, default to the Workspace directory
cd $WORKSPACE

# User-specific aliases, configures and functions
```

通过 `vi` 命令打开文件 `$HOME/.bashrc` 粘贴文件时，因为 `vi` 默认处在非粘贴模式，粘贴后内容可能被 `vi` 自动缩进，这些缩进，并不一定是我们需要的。这时候可以在 `vi` 中键入 `:set paste` 进入粘贴模式，再粘贴复制的内容。使用 `vi` 编辑文件时，`:set paste` 是一个高频使用命令。

配置好 `$HOME/.bashrc` 文件后，我们就可以执行 `bash` 命令将配置加载到当前 Shell 中了。

上述 Bash 脚本会自动创建工作目录 `workspace`，以后所有的工作都可以在这个目录下展开。这样做可以带来以下几点好处：
- 可以使我们的 `$HOME` 目录保持整洁，便于以后的文件查找和分类；
- 如果哪一天 `/` 分区空间不足，可以将整个 `workspace` 目录 mv 到另一个分区中，并在 `/` 分区中保留软连接，例如：`/home/going/workspace -> /data/workspace/`；
- 如果哪天想备份所有的工作文件，可以直接备份 `workspace`。

在配置 `PATH` 变量时，建议将期望使用的命令所在的目录放在 `$PATH` 之前，这样 Linux 会优先匹配到我们期望的命令。例如：`export PATH=$HOME/bin:$PATH`，如果有相同的命令 `A`，Linux 会优先使用 `$HOME/bin` 目录下的 `A`。

至此，我们就完成了 Linux 开发机的初步配置。

### 依赖安装和配置

在 Linux 系统上安装 OneX 应用会依赖一些 `.deb` 包和工具，有些是直接依赖，有些是间接依赖。为了避免后续的操作出现依赖错误，例如因为包不存在而导致的编译、命令执行错误等，本节会预先安装和配置这些依赖包和工具。依赖安装和配置的具体步骤如下。

1. 安装依赖

你可以在 Debian 系统上通过 apt命令来安装需要的依赖工具，安装命令如下：

```bash
$ sudo apt install -y build-essential jq tclsh gettext bc
```

2. 安装 Git

因为安装 `vim`、OneX 应用、执行 `go get` 命令等都会通过 Git 来下载安装包，所以我们还需要安装 Git。由于低版本的 Git 不支持 `--unshallow` 参数，而 `go get` 在安装 Go 包时会用到 `git fetch --unshallow` 命令，因此我们要确保安装一个高版本的 Git，这里我们安装当前最新的版本`2.43.0`（2024.01.08），具体的安装方法如下：

```bash
$ cd /tmp
$ wget --no-check-certificate https://mirrors.edge.kernel.org/pub/software/scm/git/git-2.43.0.tar.gz
$ tar -xvzf git-2.43.0.tar.gz
$ cd git-2.43.0/
$ ./configure
$ make
$ sudo make install
$ git --version # 输出 git 版本号，说明安装成功
git version 2.43.0
```

:::tip
国内因为众所周知的原因，访问国外网站网速会比较慢，请耐心等待。如果下载超时，可以多次重试尝试解决。
:::

安装好 Git 后，还需要把 Git 的二进制目录添加到 `PATH` 路径中，不然 Git 可能会因为找不到一些命令导致 Git 报错。你可以执行以下命令来添加目录：

```bash
$ tee -a $HOME/.bashrc <<'EOF'
# Configure for git
export PATH=/usr/local/libexec/git-core:$PATH
EOF
```

3. 配置 Git。

你可以直接执行以下命令来配置 Git：

```bash
$ git config --global user.name "孔令飞" # 用户名改成自己的
$ git config --global user.email "colin404@foxmail.com" # 邮箱改成自己的
$ git config --global credential.helper store # 设置 git，保存用户名和密码
$ git config --global core.longpaths true # 解决 Git 中 'Filename too long' 的错误
```

## Go 语言开发环境安装和配置

Go 是一门编译型语言，需要使用 Go 语言编译器编译 Go 源码，生成二进制文件，并部署。所以首先需要安装 Go 编译器。

另外，在开发 Go 项目时，经常需要开发 RPC 服务，因此，还需要安装 Protobuf 编译器，来编译 Protobuf 文件。

所以，Go 语言开发环境的安装和配置包括以下 2 部分：
1. Go 编译环境安装和配置；
2. Protobuf 编译环境安装。

### Go 编译环境安装和配置

安装 Go 的编译环境步骤比较简单，你只需下载源码包、设置相应的环境变量即可。具体步骤如下：

1. 下载安装包。

可以从 Go 语言官方网站下载对应的 Go 安装包以及源码包，下面的命令会下载 `go1.22.2` 安装包：

```bash
$ wget -P /tmp/ https://go.dev/dl/go1.22.2.linux-amd64.tar.gz
```

2. 解压并安装。

执行以下命令解压并安装 Go 编译工具和源码：

```bash
$ mkdir -p $HOME/go
$ tar -xvzf /tmp/go1.22.2.linux-amd64.tar.gz -C $HOME/go
$ mv $HOME/go/go $HOME/go/go1.22.2
```

3. 配置 `$HOME/.bashrc` 文件。

你可以执行以下命令，将下列环境变量追加到 `$HOME/.bashrc` 文件中。

```bash
$ tee -a $HOME/.bashrc <<'EOF'
# Go envs
# Go version setting
export GOVERSION=go1.22.2
# Go installation directory
export GO_INSTALL_DIR=$HOME/go
# GOROOT setting
export GOROOT=$GO_INSTALL_DIR/$GOVERSION
# GOPATH setting
export GOPATH=$WORKSPACE/golang #
# Add the binaries from both the Go language and those installed via go install to the PATH
export PATH=$GOROOT/bin:$GOPATH/bin:$PATH
# Enable Go modules feature
export GO111MODULE="on"
# Proxy server setting for installing Go modules
export GOPROXY=https://goproxy.cn,direct
export GOPRIVATE=
# Turn off checking the hash value of Go dependency packages
export GOSUMDB=off
EOF
```

4. 测试是否安装成功。

如果你执行 `go version` 命令可以成功输出 Go 的版本，就说明 Go 编译环境安装成功。具体命令如下：

```bash
$ bash # 配置 `$HOME/.bashrc` 后，需要执行 `bash` 命令将配置加载到当前 Shell
$ go version
go version go1.22.2 linux/amd64
```

### Protobuf  编译环境安装

因为本实战项目还实现了一个 gRPC 服务器，gRPC 服务器使用 Protobuf 作为数据交换格式，所以我们还需要安装 Protobuf 文件的编译器 `protoc`。`protoc` 需要 `protoc-gen-go` 插件来完成 Go 语言的代码转换，因此我们需要安装 `protoc` 和 `protoc-gen-go` 这 2 个工具。它们的安装方法比较简单，具体分为以下两步：

1. 安装 `protoc` 命令。

安装命令如下：

```bash
$ cd /tmp/
$ wget https://github.com/protocolbuffers/protobuf/releases/download/v25.1/protoc-25.1-linux-x86_64.zip
$ unzip protoc-25.1-linux-x86_64.zip -d protoc-25.1-linux-x86_64
$ sudo cp protoc-25.1-linux-x86_64/bin/protoc /usr/local/bin/
$ sudo cp -r protoc-25.1-linux-x86_64/include/ /usr/local/include/
$ protoc --version # 查看 protoc 版本，成功输出版本号，说明安装成功
libprotoc 25.1
```

:::tip
这里我们安装的 `protoc` 版本是 `25.1`。如果你安装了其他版本，后续执行 `protoc` 命令报错，可能需要你根据所安装的版本进行命令参数适配。
:::

2. 安装 `protoc-gen-go` 命令。

安装命令如下：

```bash
$ go install github.com/golang/protobuf/protoc-gen-go@latest
```

当你第一次执行 `go install` 命令的时候，因为本地无缓存，需要下载所有的依赖模块，所以安装速度会比较慢，请你耐心等待。

如果你感觉 `go install` 卡在那里，可以添加 `-x` 参数打印具体的安装细节，通过细节你可以发现具体哪个步骤执行时间比较久：

```bash
$ go install -x github.com/golang/protobuf/protoc-gen-go@latest
```

## Go 开发 IDE 安装和配置

编译环境准备完之后，你还需要一个代码编辑器才能开始 Go 项目开发。为了提高开发效率，你还需要将这个编辑器配置成 Go IDE。

目前，GoLand、VSCode 这些 IDE 都很优秀，但它们都是 Windows 系统下的 IDE。在 Linux 系统下我们可以选择将 Vim 配置成 Go IDE。熟练 Vim IDE 操作之后，开发效率不输 GoLand 和 VSCode。有多种方法可以配置一个 Vim IDE，这里我选择使用 [vim-go](https://github.com/fatih/vim-go) 将 Vim 配置成一个 Go IDE。vim-go 是社区比较受欢迎的 Vim Go 开发插件，可以方便地将一个 Vim 配置成 Vim IDE。

:::tip
Linux 系统下还有 Emacs 编辑器值得你去使用。这里，我们有使用 Emacs，因为好久没用了，操作指令都忘了。使用哪款编辑器并不影响你学习本课程，根据自己的喜好来选择即可。
:::

Vim IDE 的安装和配置分为以下两步：
1. 安装最新版的 Vim：Vim 9；
2. 配置 Vim IDE。

### 安装 Vim 9

如果你当前的 Linux  发行版，已经安装了 Vim 9，可跳过 Vim 9 的安装。如果没有安装  Vim 或者版本不是 9，建议升级到 Vim 9。安装命令如下：

```bash
$ git clone https://github.com/vim/vim /tmp/vim
$ cd /tmp/vim
$ sudo apt install -y libncurses5-dev
$ CFLAGS="-I/usr/local/include -fPIC" ./configure --prefix=/usr/local --with-features=huge --enable-cscope --enable-multibyte --enable-rubyinterp --enable-perlinterp --enable-python3interp --enable-luainterp --with-tlib=ncurses --without-local-dir
$ make
$ sudo make install
$ echo "alias vi=/usr/local/bin/vim" >> ~/.bash_aliases # 设置 vi 为最新的 vim 版本
$ bash
```

### Vim IDE 安装和配置

上面，我们安装好了 Vim 编辑器。接下来，就可以安装 Vim IDE，具体安装命令如下：

```bash
$ rm -rf $HOME/.vim; mkdir -p ~/.vim/pack/plugins/start/
$ git clone https://github.com/colin404/vim-go ~/.vim/pack/plugins/start/vim-go
$ git clone https://github.com/VundleVim/Vundle.vim.git ~/.vim/bundle/Vundle.vim
$ git clone --depth=1 https://github.com/colin404/vimrc.git ~/.vim_runtime
$ sh ~/.vim_runtime/install_awesome_vimrc.sh
$ git clone https://github.com/superproj/vimrc /tmp/vimrc # 安装自定义 Vim 配置
$ cp /tmp/vimrc/vimrc $HOME/.vim_runtime/my_configs.vim
```

在之前使用 Vim 的过程中，发现依赖的仓库，例如：`fatih/vim-go`、`amix/vimrc` 最新版本会有一些 Bug 或环境不适配，导致 Vim IDE 配置失败。为了提高你的配置成功率，我 Fork 了一份稳定版本。上面安装配置，是从我 Fork 出来的（`colin404/vim-go`、`colin404/vimrc`）、经过验证（Debian 12）的代码仓库来安装的。当然，我会定期跟上游进行代码同步，确保 Fork 出来的代码仓库，功能上能跟最新的上游对齐。

### Go 工具安装。

vim-go 会用到一些 Go 工具，比如在函数跳转时会用到 `guru`、`godef` 工具，在格式化时会用到 `goimports`，所以你也需要安装这些工具。

安装方式如下：执行 `vi /tmp/test.go`，然后输入 `:GoInstallBinaries` 安装 vim-go 需要的工具。安装后的 Go IDE 常用操作的按键映射如下图所示：
![Vim核心操作](/images/Vim核心操作.png)

:::tip
在 Vim IDE 中进行开发，使用最多的功能是：:GoDef、:GoDefPop、:GoDoc、Crl + N、Ctrl + P。
:::

更详细的 Vim 安装、配置和使用指南你可以参考：[我为什么会选择Vim来开发Go项目及Vim IDE安装配置和操作](https://mp.weixin.qq.com/s/OKY7PlXTujH3N3H3hMpCxA)。

## 总结

在实际项目开发中， 准备好一个易用的开发环境很重要，易用的开发环境，会直接影响我们的开发效率和开发体验。本节课用最快捷的方式，教你快速部署初始化了一个 Linux 开发环境，并配置了 Vim IDE。

## 课后练习

1. Go 环境安装好之后，试着写一个 Go 代码，编译并运行，确认 Go 编译环境安装是成功的；
2. 编写一段 Go 代码，并试着使用文中的 Vim 快捷键进行函数的跳转：
    - `ctrl-t`：跳转到函数定义处；
    - `ctrl-o`：回到上一次的位置。
