---
date: 2024-03-01
category:
  - OneX
---


在部署和使用 OneX 的过程中，难免会出现一些异常（也称为故障、问题）。这时候，就需要我们能够定位问题，并修复问题。这里，我总结了一些 OneX 的排障方法，以及一些常见故障的解决方法，供你参考。

## 如何排障？

首先，我们需要发现问题，然后定位问题。我们可能需要经过多轮分析排查才能定位到问题的根因，最后去解决问题。排障流程如下图所示：

![如何排障](/images/如何排障-水印.png)

如果想排查问题并解决问题，你还需要具备以下两个基本能力：
- 能够找到组件日志，并理解错误日志的内容；
- 根据错误日志，找出解决方案。

我们举个例子，有以下错误：

```bash
[going@dev onex]$ mysql -h127.0.0.1 -uroot -p'onex(#)666'
bash: /usr/bin/mysql: 没有那个文件或目录
[going@dev onex]$
```

对于这个错误，我们首先来理解错误内容：mysql 命令没有找到，说明没有安装 mysql，或者安装 mysql 失败。

那么，我们的解决方案就是重新执行 MariaDB 的安装步骤：

```bash
$ cd ${ONEX_ROOT}
$ ./scripts/installation/mariadb.sh onex::mariadb::docker::install
```

接下来，我会以 onex-usercenter 服务为例，给你演示下具体如何排障并解决问题。

## 发现问题

![如何发现问题](/images/如何发现问题-水印.png)

要排障，首先我们需要发现问题。我们通常用下面这几种方式来发现问题：
- 代码审查：在开发过程中进行代码审查可以发现代码中的问题和潜在的错误；
- 安全审计：通过安全审计可以发现软件或系统中的安全漏洞和风险；
- 服务状态检查：可以通过检查服务的运行状态，来发现问题。例如：启动 onex-usercenter 服务后，执行 `systemctl status onex-usercenter` 发现 onex-usercenter 启动失败，即 `Active` 的值不为 `active (running)`；
- 代码测试：通过进行各种类型的测试，如单元测试、集成测试、系统测试等，可以发现软件或系统中的问题。例如：访问 onex-usercenter 服务，发现接口返回异常错误码、接口值返回不对等；
- 自动化测试：我们也可以通过运行自动化测试，来帮助我们快速发现问题；
- 日志记录：在服务或接口异常时，我们需要排查日志。通过在日志中发现一些 `WARN`、`ERRORV`、`PANIC`、`FATAL` 等级别的错误日志来发现问题；
- 监控告警：通过监控指标、告警等，也可以发现问题。如果通过日志，能发现已经发生的问题，通过监控，还可以发现一些潜在的问题；
- 用户反馈：产品或功能发布后，用户在使用过程中，也可能会发现一些问题，并将问题反馈给开发人员。

上面发现问题的途径多种多样，有些发现问题的途径，通常发生在特定的软件阶段，例如：测试阶段，我们可以通过测试、质量保障团队来发现问题。产品发布后，可以通过用户反馈来发现问题。

但在开发阶段，发现问题最常用的手段是：**开发自测** -> **日志** -> **监控**。接下来，我来详细介绍下，开发阶段具体如何排查问题。

## 定位问题

发现问题之后，就需要我们定位出问题的根本原因。开发阶段，我们可以通过下面这三种方式来定位问题。
- 查看日志，它是最简单的排障方式。
- 使用 Go 调试工具 Delve 来定位问题。
- 添加 Debug 日志，从程序入口处跟读代码，在关键位置处打印 Debug 日志，来定位问题。

在定位问题的过程中，我们可以采用“顺藤摸瓜”的思路去排查问题。比如，我们的程序执行流程是：A -> B -> ... -> M -> N. 其中 A、B、N 都可以理解为一个排查点。所谓的排查点，就是需要在该处定位问题的点，这些点可能是导致问题的根因所在。

在排障过程中，你可以根据最上层的日志报错 N，找到上一个排查点 M。如果经过定位，发现 M 没有问题，那继续根据程序执行流程，向上查找可能出错的排查点。如此反复，直到找到最终的排查点（例如 B），也就是出问题的根因，即为 Bug 点。执行流程如下图所示：

![定位问题流程](/images/定位问题流程-水印.png)

下面，我们来具体看看这三种定位问题的方法。

### 查看日志定位问题

我们首先应该通过日志来定位问题，这是最简单高效的方式。要通过日志来定位问题，你需要知道组件日志的保存位置，通常是标准输出或者某个日志文件，你不仅要会看日志，还要能读懂日志，也就是理解日志报错的原因。

下面我来具体讲解用这种方法定位问题的步骤。

**第一步，确保服务运行正常。**

如果你是使用容器化的方式来安装 OneX，首先登录容器：

```bash
$ docker exec -it onex bash
```

之后，在容器内部执行 `systemctl status` 命令来查看服务的运行状况：

```bash
# systemctl status onex-usercenter
● onex-usercenter.service - Systemd unit file for onex-usercenter
   Loaded: loaded (/etc/systemd/system/onex-usercenter.service; enabled; vendor preset: disabled)
   Active: activating (auto-restart) (Result: exit-code) since Fri 2024-02-02 18:16:39 CST; 1s ago
     Docs: man:onex-usercenter(8)
           https://github.com/superproj/onex/blob/master/docs/guide/zh-CN/installation/systemd/README.md
  Process: 561 ExecStart=/opt/onex/bin/onex-usercenter --config=/opt/onex/etc/onex-usercenter.yaml (code=exited, status=1/FAILURE)
  Process: 560 ExecStartPre=/usr/bin/mkdir -p /opt/onex/log (code=exited, status=0/SUCCESS)
  Process: 559 ExecStartPre=/usr/bin/mkdir -p /opt/onex/data/onex-usercenter (code=exited, status=0/SUCCESS)
 Main PID: 561 (code=exited, status=1/FAILURE)
```

可以看到，`Active` 不是 `active (running)`，说明 onex-usercenter 服务没有正常运行。从上面输出中的 `Process: 1092 ExecStart=/opt/onex/bin/onex-usercenter --config=/opt/onex/etc/onex-usercenter.yaml (code=exited, status=1/FAILURE)`信息中，我们可以获取以下信息：
- onex-usercenter 服务启动命令为 `/opt/onex/bin/onex-usercenter --config=/opt/onex/etc/onex-usercenter.yaml`。
- `/opt/onex/bin/onex-usercenter` 加载的配置文件为 `/opt/onex/etc/onex-usercenter.yaml`。
- `/opt/onex/bin/onex-usercenter` 命令执行失败，退出码为 `1`，其进程 ID 为 `1092`。

这里注意，`systemctl status` 会将超过一定长度的行的后半部分用省略号替代，如果想查看完整的信息，可以追加-l参数，也就是 `systemctl status onex-usercenter -l` 来查看。

既然 onex-usercenter 命令启动失败，那我们就需要查看 onex-usercenter 启动时的日志，看看有没有一些报错日志。

接下来，就进入**第二步，查看 onex-usercenter 运行日志。**

那么如何查看呢？我们有 3 种查看方式，我在下面按优先级顺序排列了下。你在定位问题和查看日志时，按优先级 3 选 1 即可，1 > 2 > 3。
1. 通过 `journalctl -u onex-usercenter` 查看。
2. 通过 onex-usercenter 日志文件查看。
3. 通过 console 查看。

下面我来分别介绍下这三种查看方式。

先来看优先级最高的方式，通过 `journalctl -u onex-usercenter` 查看。

systemd 提供了自己的日志系统，称为 journal。我们可以使用 `journalctl` 命令来读取 journal 日志。`journalctl` 提供了 `-u` 选项来查看某个 Unit 的日志，提供了 `_PID` 来查看指定进程 ID 的日志。在第一步中，我们知道服务启动失败的进程 ID 为 `1092`。执行以下命令来查看这次启动的日志：


```bash
# journalctl -u onex-usercenter
...
Feb 02 18:39:04 32b56ee12be2 systemd[1]: Starting Systemd unit file for onex-usercenter...
Feb 02 18:39:04 32b56ee12be2 systemd[1]: Started Systemd unit file for onex-usercenter.
Feb 02 18:39:04 32b56ee12be2 onex-usercenter[5463]: 2024/02/02 18:39:04 maxprocs: Leaving GOMAXPROCS=32: CPU quota undefined
Feb 02 18:39:04 32b56ee12be2 onex-usercenter[5463]: panic: runtime error: invalid memory address or nil pointer dereference
Feb 02 18:39:04 32b56ee12be2 onex-usercenter[5463]: [signal SIGSEGV: segmentation violation code=0x1 addr=0x0 pc=0x1de02f7]
Feb 02 18:39:04 32b56ee12be2 onex-usercenter[5463]: goroutine 1 [running]:
Feb 02 18:39:04 32b56ee12be2 onex-usercenter[5463]: github.com/superproj/onex/pkg/options.(*JaegerOptions).AddFlags(0xc000e9fcb8?, 0x29a9508?, {0x6?, 0>
Feb 02 18:39:04 32b56ee12be2 onex-usercenter[5463]:         /home/colin/workspace/golang/src/github.com/superproj/onex/pkg/options/jaeger_options.go:48>
Feb 02 18:39:04 32b56ee12be2 onex-usercenter[5463]: github.com/superproj/onex/cmd/onex-usercenter/app/options.(*Options).Flags(0xc000e23110)
Feb 02 18:39:04 32b56ee12be2 onex-usercenter[5463]:         /home/colin/workspace/golang/src/github.com/superproj/onex/cmd/onex-usercenter/app/options/>
Feb 02 18:39:04 32b56ee12be2 onex-usercenter[5463]: github.com/superproj/onex/pkg/app.(*App).buildCommand(0xc000e23180)
Feb 02 18:39:04 32b56ee12be2 onex-usercenter[5463]:         /home/colin/workspace/golang/src/github.com/superproj/onex/pkg/app/app.go:191 +0x245
Feb 02 18:39:04 32b56ee12be2 onex-usercenter[5463]: github.com/superproj/onex/pkg/app.NewApp({0x29bd1f0, 0xf}, {0x29e450a, 0x1f}, {0xc000e9fef0, 0x4, 0>
Feb 02 18:39:04 32b56ee12be2 onex-usercenter[5463]:         /home/colin/workspace/golang/src/github.com/superproj/onex/pkg/app/app.go:165 +0xd2
Feb 02 18:39:04 32b56ee12be2 onex-usercenter[5463]: github.com/superproj/onex/cmd/onex-usercenter/app.NewApp({0x29bd1f0, 0xf})
Feb 02 18:39:04 32b56ee12be2 onex-usercenter[5463]:         /home/colin/workspace/golang/src/github.com/superproj/onex/cmd/onex-usercenter/app/server.g>
Feb 02 18:39:04 32b56ee12be2 onex-usercenter[5463]: main.main()
Feb 02 18:39:04 32b56ee12be2 onex-usercenter[5463]:         /home/colin/workspace/golang/src/github.com/superproj/onex/cmd/onex-usercenter/main.go:19 +>
Feb 02 18:39:04 32b56ee12be2 systemd[1]: onex-usercenter.service: Main process exited, code=exited, status=2/INVALIDARGUMENT
Feb 02 18:39:04 32b56ee12be2 systemd[1]: onex-usercenter.service: Failed with result 'exit-code'.
```

:::tip
你也可以执行 `journalctl _PID=1092`，效果等效于 `journalctl -u onex-usercenter`。
:::

从上面的日志中，我们找到了服务启动失败的原因：onex-usercenter 启动时，发生了 Panic 级别的错误：`panic: runtime error: invalid memory address or nil pointer dereference`。引起 Painic 的代码行为：`/home/colin/workspace/golang/src/github.com/superproj/onex/pkg/options/jaeger_options.go:48`。到这里，你已经初步定位到问题原因了。

我们再来看通过 onex-usercenter 日志文件查看的方式。

作为一个企业级的实战项目，onex-usercenter 的日志当然是会记录到日志文件中的。在第一步中，我们通过 `systemctl status onex-usercenter` 输出的信息，知道了 onex-usercenter 启动时加载的配置文件为 `/opt/onex/etc/onex-usercenter.yaml`。所以，我们可以通过 onex-usercenter 的配置文件 `onex-usercenter.yaml` 中的 `log.output-paths` 配置项，查看记录日志文件的位置：
```yaml
log:
    level: debug
    format: console
    enable-color: true
    disable-caller: false
    disable-stacktrace: false
    output-paths: ["/opt/onex/log/onex-usercenter.log"]
```

可以看到，onex-usercenter 将日志记录到 `/opt/onex/log/onex-usercenter.log` 文件中。所以，我们可以通过查看 `/opt/onex/log/onex-usercenter.log` 日志文件，来查看报错信息。

当然，我们也可以直接通过 console 来看日志，这就需要我们在 Linux 终端前台运行 onex-usercenter（在第一步中，我们已经知道了启动命令）：

```bash
# /opt/onex/bin/onex-usercenter --config=/opt/onex/etc/onex-usercenter.yaml
2024/02/02 18:43:19 maxprocs: Leaving GOMAXPROCS=32: CPU quota undefined
panic: runtime error: invalid memory address or nil pointer dereference
[signal SIGSEGV: segmentation violation code=0x1 addr=0x0 pc=0x1de02f7]

goroutine 1 [running]:
github.com/superproj/onex/pkg/options.(*JaegerOptions).AddFlags(0xc000efbcb8?, 0x29a9508?, {0x6?, 0x0?, 0x0?})
        /home/colin/workspace/golang/src/github.com/superproj/onex/pkg/options/jaeger_options.go:48 +0x17
github.com/superproj/onex/cmd/onex-usercenter/app/options.(*Options).Flags(0xc000cb3180)
        /home/colin/workspace/golang/src/github.com/superproj/onex/cmd/onex-usercenter/app/options/options.go:92 +0x1ba
github.com/superproj/onex/pkg/app.(*App).buildCommand(0xc000cb31f0)
        /home/colin/workspace/golang/src/github.com/superproj/onex/pkg/app/app.go:191 +0x245
github.com/superproj/onex/pkg/app.NewApp({0x29bd1f0, 0xf}, {0x29e450a, 0x1f}, {0xc000efbef0, 0x4, 0x100000002688611?})
        /home/colin/workspace/golang/src/github.com/superproj/onex/pkg/app/app.go:165 +0xd2
github.com/superproj/onex/cmd/onex-usercenter/app.NewApp({0x29bd1f0, 0xf})
        /home/colin/workspace/golang/src/github.com/superproj/onex/cmd/onex-usercenter/app/server.go:23 +0x15c
main.main()
        /home/colin/workspace/golang/src/github.com/superproj/onex/cmd/onex-usercenter/main.go:19 +0x1f
```

通过上面这 3 种查看方式，我们均能初步定位到服务异常的原因。

### 使用 Go 调试工具 Delve 来定位问题

查看日志是最简单的排障方式，通过查看日志，我们可能定位出问题的根本原因，这种情况下问题就能得到快速的解决。但有些情况下，我们通过日志并不一定能定位出问题，例如：
- 程序异常，但是没有错误日志。
- 日志有报错，但只能判断问题的面，还不能精准找到问题的根因。

遇到上面这两种情况，我们都需要再进一步地定位问题。这时候，我们可以使用 Delve 调试工具来尝试定位问题。Delve 工具的用法你可以参考Delve 使用详解 。

### 添加 Debug 日志定位问题

如果使用 Delve 工具仍然没有定位出问题，接下来你可以尝试最原始的方法：添加 Debug 日志来定位问题。这种方法具体可以分为两个步骤。

**第一步，在关键代码段添加 Debug 日志。**

你需要根据自己对代码的理解来决定关键代码段。如果不确定哪段代码出问题，可以从请求入口处添加 Debug 日志，然后跟着代码流程一步步往下排查，并在需要的地方添加 Debug 日志。

例如，通过排查日志，我们定位到 `/home/colin/workspace/golang/src/github.com/superproj/onex/pkg/options/jaeger_options.go:48` 位置的代码导致程序 Panic，Panic原因是，根据 Go 项目开发经验和 Go 语言语法，我们不难猜测导致 Panic 的原因可能是 `o`是 `nil`：

![问题定位Panic原因](/images/问题定位Panic原因.png)

这时，我们可以加一些 Debug 代码，来判断 `o` 是否是 `nil`，如下图所示：


![问题定位添加debug日志](/images/问题定位添加debug日志.png)

这里有个小技巧：可以在错误返回的位置添加 Debug 日志，这样能大概率帮助你定位到出错的位置，例如：

```go
if err != nil {
  log.Debugf("DEBUG POINT - 1: %v", err)
  return err
}
```

**第二步，重新编译源码，并启动。**

我们添加完 Debug 代码后，就可以重新编译并运行程序了。程序运行后，继续通过日志查看是否有以下日志输出：
```
Var o is nil
```

如果有，说明 `o` 没有被初始化、如果没有，说明猜想错误，继续其他 Debug。这里，我们加完之后，日志输出中有 `Var o is nil` 字符串，说明 `o` 没有被初始化。

在你添加 Debug 日志的过程中，因为这些 Debug 日志能够协助你定位问题，从侧面说明这些日志是有用的，所以你可以考虑保留这些 Debug 日志调用代码。

**第三步，修复代码，并重新编译、启动、测试**

继续跟读代码，我们发现，`o` 为 `nil` 是因为在创建 onex-usercenter options 时，没有初始化 `JaegerOptions` 字段：

```go
func NewOptions() *Options {
    o := &Options{
        // GenericOptions: genericoptions.NewOptions(),
        GRPCOptions:  genericoptions.NewGRPCOptions(),
        HTTPOptions:  genericoptions.NewHTTPOptions(),
        TLSOptions:   genericoptions.NewTLSOptions(),
        MySQLOptions: genericoptions.NewMySQLOptions(),
        RedisOptions: genericoptions.NewRedisOptions(),
        EtcdOptions:  genericoptions.NewEtcdOptions(),
        KafkaOptions: genericoptions.NewKafkaOptions(),
        ConsulOptions: genericoptions.NewConsulOptions(),
        JWTOptions:    genericoptions.NewJWTOptions(),
        Metrics:       genericoptions.NewMetricsOptions(),
        Log:           log.NewOptions(),
    }

    return o
}
```

解决方式就是，添加 `JaegerOption` 的初始化代码，如下：


```go
func NewOptions() *Options {
    o := &Options{
        // GenericOptions: genericoptions.NewOptions(),
        GRPCOptions:   genericoptions.NewGRPCOptions(),
        HTTPOptions:   genericoptions.NewHTTPOptions(),
        TLSOptions:    genericoptions.NewTLSOptions(),
        MySQLOptions:  genericoptions.NewMySQLOptions(),
        RedisOptions:  genericoptions.NewRedisOptions(),
        EtcdOptions:   genericoptions.NewEtcdOptions(),
        KafkaOptions:  genericoptions.NewKafkaOptions(),
        JaegerOptions: genericoptions.NewJaegerOptions(),
        ConsulOptions: genericoptions.NewConsulOptions(),
        JWTOptions:    genericoptions.NewJWTOptions(),
        Metrics:       genericoptions.NewMetricsOptions(),
        Log:           log.NewOptions(),
    }

    return o
}
```

之后，便可以根据开发指南，编译、运行并测试。修复后，重新运行后，检查 onex-usercenter 服务状态：

```bash
# systemctl status onex-usercenter
● onex-usercenter.service - Systemd unit file for onex-usercenter
   Loaded: loaded (/etc/systemd/system/onex-usercenter.service; enabled; vendor preset: disabled)
   Active: active (running) since Fri 2024-02-02 19:09:06 CST; 4s ago
     Docs: man:onex-usercenter(8)
           https://github.com/superproj/onex/blob/master/docs/guide/zh-CN/installation/systemd/README.md
  Process: 12955 ExecStartPre=/usr/bin/mkdir -p /opt/onex/log (code=exited, status=0/SUCCESS)
  Process: 12954 ExecStartPre=/usr/bin/mkdir -p /opt/onex/data/onex-usercenter (code=exited, status=0/SUCCESS)
 Main PID: 12956 (onex-usercenter)
    Tasks: 37 (limit: 410387)
   Memory: 63.0M
   CGroup: /system.slice/docker-32b56ee12be20e8de08e242031e6916b9dbaf0528a99e79bfe68db1b2e783511.scope/system.slice/onex-usercenter.service
           └─12956 /opt/onex/bin/onex-usercenter --config=/opt/onex/etc/onex-usercenter.yaml
....
```
出现 `Active: active (running)` 字样，说明 onex-usercenter 运行成功，bug 被修复。

## 解决问题

在定位问题阶段，我们已经找到了问题的原因，接下来就可以根据自己对业务、底层代码实现的掌握和理解，修复这个问题了。至于怎么修复，你需要结合具体情况来判断，并没有统一的流程和方法论，这里就不多介绍了。

上面，我介绍了排查问题的思路和方法。接下来，我来向你展示在部署和使用 OneX 平台时容易遇到的问题，并提供解决方法。这些问题基本上都是由服务器环境引起的。

## 总结

本节课，我给你介绍了排查日志的思路和方式：发现问题 -> 定位问题 -> 解决问题。在开发阶段，发现问题的主要方式是通过测试 + 日志，定位问题的一个有效手段是从日志报错处开始，逆着程序运行流程向上找问题出错的地方。找到问题根因之后，就要解决问题。你需要根据自己对业务、底层代码实现的掌握和理解，解决这个问题。

本节课介绍的，是日常开发中，最常用的定位问题的手段。还有其他一些问题定位手段，例如：你还可以根据实际场景选择使用单元测试代码来定位问题。

## 课后练习

1. 试着用本节课中列举的问题定位方法，来定位你部署、开发过程中的问题；
2. 思考下，你日常开发工作中，还有哪些有效的问题定位方法，欢迎评论区分享。

