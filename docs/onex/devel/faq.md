---
title: OneX 常见问题
shortTitle: 常见问题
date: 2024-03-01
sticky: true
icon: wenti
star: true
isOriginal: true
order: 4
category:
  - OneX
tag:
  - OneX
---

# OneX 常见故障及解决办法

## Q：遇到xxx: permission denied这类的错误。

出现这种错误，是因为你没有权限执行当前的操作。解决方法是排查自己是否有权限执行当前操作。如果没有权限，需要你切换到有权限的用户，或者放弃执行当前操作。

为了说明问题，这里我举一个错误例子，并给出排查思路。例子的错误日志如下：

```bash
[going@VM-8-9-centos /]$ go get -u github.com/golang/protobuf/protoc-gen-go
go: could not create module cache: mkdir /golang: permission denied
[going@VM-8-9-centos /]$ sudo go get -u github.com/golang/protobuf/protoc-gen-go
sudo: go: command not found
```

上述错误中， 一共报了两个错误，分别是`mkdir /golang: permission denied`和`sudo: go: command not found`。我们先来看`mkdir /golang: permission denied`错误。

通过命令行提示符`$`可以知道，当前登陆用户是普通用户；通过报错`mkdir /golang: permission denied`可以知道`go get -u github.com/golang/protobuf/protoc-gen-go`命令底层执行了`mkdir /golang`，因为普通用户没有写 `/` 目录的权限，所以会报权限错误。解决方法是切换到用户的目录下，执行`go get -u`命令。

我们再来看下`sudo: go: command not found`错误。`sudo`命令会将命令执行的环境切换到`root`用户，`root`用户显然是没有安装go命令的，所以会导致`command not found`错误。解决方式是去掉 `sudo`，直接执行 `$ go get -u xxx`。

## Q：报 `No such file or directory`、 `command not found`、`permission denied` 错误。

遇到这类错误，要根据提示排查和解决问题。
- `No such file or directory`：确认文件是否存在，不存在的原因是什么。
- `command not found`：确认命令是否存在，如果不存在，可以重新安装命令。
- `permission denied`：确认是否有操作权限，如果没有，要切换到有权限的用户或者目录。

## Q：报 `Failed to parse input: unexpected end of JSON input .*  generate-node-cert(...). *`

该问题大概率是因为在使用 `cfssl` 工具生成证书的时候报的错，版本不匹配导致的。建议大家重新安装 `v1.6.1` 版本的 `cfssl` 工具。

因为国内墙的原因，使用脚本可能会安装超时，可以手动安装。安装方法如下：

```bash
$ mkdir -p $HOME/bin/
$ wget https://github.com/cloudflare/cfssl/releases/download/v1.6.1/cfssl_1.6.1_linux_amd64 -O $HOME/bin/cfssl
$ wget https://github.com/cloudflare/cfssl/releases/download/v1.6.1/cfssljson_1.6.1_linux_amd64 -O $HOME/bin/cfssljson
$ wget https://github.com/cloudflare/cfssl/releases/download/v1.6.1/cfssl-certinfo_1.6.1_linux_amd64 -O $HOME/bin/cfssl-certinfo
$ chmod +x $HOME/bin/{cfssl,cfssljson,cfssl-certinfo}
```

## Q：安装 Vim IDE 时报 `vim-go: Error installing golang.org/x/tools/cmd/guru@master: go: golang.org/x/tools/cmd/guru@master ....`

可以手动安装 `guru` 工具，安装命令如下：

```bash
$ go install golang.org/x/tools/cmd/guru@latest
```
