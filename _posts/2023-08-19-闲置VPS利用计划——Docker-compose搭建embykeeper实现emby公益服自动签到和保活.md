---
title: 闲置VPS利用计划——Docker compose搭建embykeeper实现emby公益服自动签到和保活
date: 2023-08-19T18:57:42+08:00
lastmod: 2023-08-20T18:57:42+08:00
tags: 
    - 🐘Linux
    - 🐋Docker
    - 💻闲置VPS利用计划
    - 📺EMBY
author: yuniee
summary: emby公益服无需每天手动签到获取积分，也不需要经常看视频保活了。
image: https://s2.loli.net/2023/08/24/VpMi5Nvn98ysKhP.png
---

# 闲置VPS利用计划——Docker compose搭建embykeeper实现emby公益服自动签到和保活

## 🧜‍♂️前言

每天在群里蹲着抢注了那么多emby公益服，因为是公益服，所以都是公益服服主免费分享给大家的服务（感谢公益服主们的无私分享🫡）。所以我也希望大家都不要注册账号后不使用，这会占用真的想要看公益服的人的注册资格。因为签到保号项目本就是公益服主们用来筛选真正需要账号的用户使用的。但有时你真的需要看emby，但是这段时间很忙，或者你害怕总是忘记签到，这个时候我们才用到本项目。希望大家按需使用。

### 



项目的GitHub地址：[GitHub](https://github.com/embykeeper/embykeeper)

感谢开发团队开发出这么实用的项目👍

## 🐹开始搭建

### 🤖准备工作

更新系统，我使用的是Debian11系统（Ubuntu同理）

```bash
apt update -y && apt upgrade -y
```

安装必要工具

```bash
apt install wget curl sudo vim git  -y
```

### 🐋安装docker，docker-compose并配置

1. 下载docker   

```bash
wget -qO- get.docker.com | bash
```

2. 设置docker开机自启

```bash
systemctl enable docker
```

3. 重启docker

```bash
systemctl restart docker
```

4. 安装docker-compose

```bash
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

5. docker-compose赋权

```bash
sudo chmod +x /usr/local/bin/docker-compose
```

6. 修改时区为上海

```bash
sudo timedatectl set-timezone Asia/Shanghai
```

### 🧢项目部署

我想要将本项目安装并映射在`/opt/embykeeper`目录下,所以首先创建目录并切换到我创建的目录下。

```bash
mkdir -p /opt/embtkeeper && cd /opt/embtkeeper
```

根据官方文档里描述，我们在使用docker-compose之前还必须用docker run运行一次。所以首先我们先运行以下命令：

```bash
docker run -v /opt/embtkeeper:/app --rm -it --net=host embykeeper/embykeeper
```

等待镜像拉取完毕之后你会发现`/opt/embtkeeper`目录下生成了一个`config.toml`文件。根据自己实际情况修改这个文件。文件中写得已经足够详细了。一般情况下你只需要修改`service` , `telegram`和`emby`这三个部分的配置，当然你也可以配置代理。[😶‍🌫️官方配置项解释](#🦙官方文档中的配置项)

在修改之后我们再次输入docker run命令运行一次,此次运行是为了引导你登录telegram账号然后生成生成 `.session` 文件，这样才能每次登录你的账号。

```bash
docker run -v /opt/embtkeeper:/app --rm -it --net=host embykeeper/embykeeper
```

接下来根据引导，输入登陆验证码以及你账号设置的二次验证密码。之后就开始执行保活和签到了。执行完毕一次之后就`ctrl+C`退出。然后创建docker-compose.yml文件：

```yaml
version: '3'
services:
  embykeeper:
    container_name: embykeeper
    image: embykeeper/embykeeper
    restart: unless-stopped
    volumes:
      - /opt/embtkeeper:/app       #冒号左边修改为你想映射的路径
    network_mode: host 
  watchtower:                      #这个程序是用来自动更新版本的
    container_name: watchtower
    image: containrrr/watchtower
    restart: unless-stopped
    volumes:
      - /opt/embtkeeper/var/run/docker.sock:/var/run/docker.sock:rw #冒号左边修改为你想要映射的路径
```

然后输入

```bash
docker-compose up -d
```

它就会在后台运行了，我们可以通过输入 `docker logs -f embykeeper` 或 `docker-compose logs -f embykeeper` 以查看最新日志。



## 🐨后记

### 🐫telegram通知 

可以通过设置项 "`notifier`" 设置 成功/失败 通知将被发送的 Telegram 账号, 您可以通过 [Embykeeper Bot](https://t.me/embykeeper_bot) 设置消息每日发送的时间。

### 🦙官方文档中的配置项

| 设置项       | 值类型             | 简介                                         | 默认值  |
| ------------ | ------------------ | -------------------------------------------- | ------- |
| `timeout`    | `int`              | Telegram 机器人签到超时 (秒)                 | `120`   |
| `retries`    | `int`              | Telegram 机器人签到错误重试次数              | `4`     |
| `concurrent` | `int`              | Telegram 机器人签到最大并发                  | `1`     |
| `random`     | `int`              | Telegram 机器人签到各站点间时间随机量 (分钟) | `15`    |
| `notifier`   | `int`/`bool`/`str` | 发送通知到 Telegram 账号 (序号/手机号)       | `False` |
| `service`    | `dict`             | 签到/水群/监视功能开启站点设置               | `{}`    |
| `proxy`      | `dict`             | 代理设置                                     | `{}`    |
| `telegram`   | `list`             | Telegram 账号设置 (支持多账号)               | `[]`    |
| `emby`       | `list`             | Emby 账号设置 (支持多账号)                   | `[]`    |

`service`设置可以为:

| 设置项      | 值类型 | 简介           | 默认值               |
| ----------- | ------ | -------------- | -------------------- |
| `checkiner` | `list` | 启用的签到站点 | (当前所有支持的站点) |
| `monitor`   | `list` | 启用的监视会话 | (当前所有支持的会话) |
| `messager`  | `list` | 启用的水群会话 | (当前所有支持的会话) |

注意, 当您未曾与站点机器人对话, 该站点签到将不会运行. 若您需要禁用部分签到站点, 您可以在列表中删除对应的名称. 若您需要使用默认禁用的签到站点, 您可以在列表中增加对应的名称. 若您设置错误, 程序将跳过并提示您所有可选的站点名. 当前支持的名称包括:

| 站点        | 名称       |      | 站点        | 名称          |
| ----------- | ---------- | ---- | ----------- | ------------- |
| 垃圾影音    | `ljyy`     |      | 搜书神器    | `sosdbot`     |
| 卷毛鼠 IPTV | `jms_iptv` |      | 终点站      | `terminus`    |
| Pornemby    | `pornemby` |      | Singularity | `singularity` |
| Peach       | `peach`    |      | Nebula      | `nebula`      |
| Bluesea     | `bluesea`  |      | Embyhub     | `embyhub`     |
| 卷毛鼠      | `jms`      |      | 卡戎        | `charon`      |

`proxy` 设置可以为:

| 设置项     | 值类型 | 简介                                    | 默认值      |
| ---------- | ------ | --------------------------------------- | ----------- |
| `hostname` | `str`  | 代理服务器地址                          | `localhost` |
| `port`     | `int`  | 代理端口号                              | `1080`      |
| `scheme`   | `str`  | 代理协议, 可以为 "`socks5`" 或 "`http`" | `socks5`    |

`telegram` 设置可以为:

| 设置项     | 值类型 | 简介                                                         | 默认值  |
| ---------- | ------ | ------------------------------------------------------------ | ------- |
| `phone`    | `str`  | 账户手机号, 一般为 "`+86...`"                                |         |
| `monitor`  | `bool` | 启用群组监控系列功能                                         | `false` |
| `send`     | `bool` | 启用自动水群系列功能                                         | `false` |
| `api_id`   | `str`  | (可选) 从[Telegram 官网](https://my.telegram.org/)申请的 Application ID |         |
| `api_hash` | `str`  | (可选) 从[Telegram 官网](https://my.telegram.org/)申请的 Application Hash |         |

如果您在使用过程中遇到 'API_ID_PUBLISHED_FLOOD' 错误, 您可能需要申请自己的 API, 可以通过 [Telegram 官网](https://my.telegram.org/) 申请 `api_id` 和 `api_hash`. 登陆后选择 `API development tools`, 随后应用信息可以随意填写, 请注意 `URL` 是必填项, 可以填写 `localhost`. 提交时若显示 "Error", 您可能需要再次多次点击提交, 或等待新账户脱离风控期/更换代理/清除浏览器记录并重试. 申请后请将 api_id 和 api_hash 填入 telegram 配置中即可.

`emby` 设置可以为:

| 设置项     | 值类型 | 简介                                                      | 默认值 |
| ---------- | ------ | --------------------------------------------------------- | ------ |
| `url`      | `str`  | Emby 服务器地址, 一般为 "`https://...`" 或 "`http://...`" |        |
| `username` | `str`  | Emby 服务器用户名                                         |        |
| `password` | `str`  | Emby 服务器密码                                           |        |
| `time`     | `int`  | 模拟观看的时间 (秒)                                       | `800`  |
| `progress` | `int`  | 观看后模拟进度条保存的时间 (秒)                           | `1000` |

服务可以进行特定配置, 如下所示:

```
[monitor.bgk] # 支持 bgk, embyhub, polo
unique_name = "your_username_for_registeration" # 自动抢注时使用的用户名

[monitor.pornemby]
only_history = true # 仅当问题历史中找到答案时自动回答
```