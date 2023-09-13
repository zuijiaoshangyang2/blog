---
title: 闲置VPS利用计划——在Ubuntu上搭建Jitsi Meet来代替zoom视频会议
date: 2023-08-25T18:57:42+08:00
lastmod: 2023-08-26T18:57:42+08:00
tags: 
    - 🐘Linux
    - 💻闲置VPS利用计划
author: yuniee
summary: zoom的替代品，开源的视频通话，视频会议项目，功能强大安全可靠。
image: https://s2.loli.net/2023/09/13/duFR3I8g5hULQMp.jpg
---

# 闲置VPS利用计划——在Ubuntu上搭建Jitsi Meet来代替zoom视频会议

## 🦌前言

当今世界，远程协作和远程沟通已经成为日常工作生活中不可或缺的一部分。而视频通话软件在这个领域扮演着至关重要的角色。Jitsi Meet是一个开源的、安全可靠的视频通话平台，它为用户提供了一个简单而强大的方式来进行实时的远程协作和交流。

Jitsi Meet的优势之一是其易用性。无论是个人用户还是企业团队，都可以轻松地搭建和使用Jitsi Meet。作为一个基于WebRTC技术的平台，Jitsi Meet不需要任何插件或额外的软件安装，只需在浏览器中打开即可开始视频通话。这使得它成为一个非常方便的选择，无论是在个人电脑上还是移动设备上。

另一个Jitsi Meet的优点是其强大的功能。它支持高清视频和音频通话，允许多人同时参与会议，而且还可以共享屏幕、发送聊天消息以及记录会议内容。此外，Jitsi Meet还提供了端到端的加密，确保通话内容的安全性和隐私保护。

在Ubuntu上搭建Jitsi Meet也非常简单。你可以通过安装Jitsi Meet软件包和配置一些基本设置来快速设置自己的视频通话服务器。一旦搭建完成，你就可以邀请他人加入你的会议，无论他们是使用Jitsi Meet客户端还是通过浏览器访问。

通过搭建Jitsi Meet视频通话平台，你可以享受到高质量、安全可靠的远程协作体验。不论是进行工作会议、在线教育还是与亲朋好友进行远程交流，Jitsi Meet都是一个值得尝试的选择。



它的功能已经很丰富了，完全可以在很多方面替代zoom ：
![jt](https://s2.loli.net/2023/09/13/Q3kBPAFYaOMG214.png)



GitHub：[Github项目地址](https://github.com/jitsi)

官方文档：[官方文档](https://jitsi.github.io/handbook/docs/intro)

## 👻开始搭建

### 🤖准备工作

首先解析一个域名，如下图：

![屏幕截图 2023-09-13 221719.png](https://s2.loli.net/2023/09/13/egDXA4suKzfIcFa.png)

> 我这里用的cloudflare，其他域名服务商的面板同理。



然后连接ssh，更新系统，我使用的是Ubuntu 20.04

```bash
apt update -y && apt upgrade -y
```

安装必要工具

```bash
apt install wget curl sudo vim git gnupg2 nginx-full socat -y
```

开启nginx：

```bash
systemctl start nginx
```

### 🐾开始部署

- 首先安装

```bash
sudo apt install apt-transport-https
```

- 然后安装Ubuntu universe软件包存储库的依赖项

```bash
sudo apt-add-repository universe
```

- 然后再次更新一下软件包,使用
```bash
sudo apt update
```

- 接下来设置完全限定域名，使用刚刚解析的域名，我解析的域名是`meet.yuniee.social`,所以我运行命令:

```bash
sudo hostnamectl set-hostname meet.yuniee.social
```

你需要修改为你自己刚刚解析的域名

然后使用文本编辑器打开`/etc/hosts`  :

```bash
vim /etc/hosts
```

输入以下内容：

```bash
127.0.0.1 localhost
x.x.x.x meet.yuniee.social
```

> x.x.x.x是服务器的ip，替换成你的ip

随后先按`ESC`按键退出编辑模式，再使用**英文输入法** 输入`:`   再输入`wq`保存并退出。

最后尝试使用`ping "$(hostname)"`来验证，正常情况下会ping你的域名。`ctrl+c`终止ping

- 添加 Prosody 包

**Ubuntu 18.04 和 20.04**使用命令

```bash
echo deb http://packages.prosody.im/debian $(lsb_release -sc) main | sudo tee -a /etc/apt/sources.list
wget https://prosody.im/files/prosody-debian-packages.key -O- | sudo apt-key add -
sudo apt install lua5.2
```

**Ubuntu 22.04**需要使用命令：

```bash
sudo curl -sL https://prosody.im/files/prosody-debian-packages.key -o /etc/apt/keyrings/prosody-debian-packages.key
echo "deb [signed-by=/etc/apt/keyrings/prosody-debian-packages.key] http://packages.prosody.im/debian $(lsb_release -sc) main" | sudo tee /etc/apt/sources.list.d/prosody-debian-packages.list
sudo apt install lua5.2
```

- 添加 Jitsi 包存储

如果你是**Ubuntu 18.04 和 20.04**，输入：

```bash
curl https://download.jitsi.org/jitsi-key.gpg.key | sudo sh -c 'gpg --dearmor > /usr/share/keyrings/jitsi-keyring.gpg'
echo 'deb [signed-by=/usr/share/keyrings/jitsi-keyring.gpg] https://download.jitsi.org stable/' | sudo tee /etc/apt/sources.list.d/jitsi-stable.list > /dev/null
```

如果你是**Ubuntu 22.04**，输入：

```bash
curl -sL https://download.jitsi.org/jitsi-key.gpg.key | sudo sh -c 'gpg --dearmor > /usr/share/keyrings/jitsi-keyring.gpg'
echo "deb [signed-by=/usr/share/keyrings/jitsi-keyring.gpg] https://download.jitsi.org stable/" | sudo tee /etc/apt/sources.list.d/jitsi-stable.list
```



- 再次更新安装包:

```bash
sudo apt update
```



🥸**打开端口（如果你的主机商默认开启防火墙就在面板设置，否则你不需要管他，可忽略）**

需要在防火墙中打开以下端口，以允许流量到达 Jitsi Meet 服务器：

- `80 TCP`=> 使用 Let's Encrypt 进行 SSL 证书验证/续订。**必需的**
- `443 TCP`=> 用于 Jitsi Meet 的一般访问。**必需的**
- `10000 UDP`=> 适用于一般网络音频/视频会议。**必需的**
- `22 TCP`=> 用于使用 SSH 访问您的服务器（如果端口不是 22，请相应更改端口）。**必需的**
- `3478 UDP`=> 用于查询 stun 服务器（coturn，可选，需要`config.js`更改才能启用它）。
- `5349 TCP`=> 用于通过 TCP 进行后备网络视频/音频通信（例如，当 UDP 被阻止时），由 coturn 提供服务。**必需的**



🐬最后，运行安装的命令

```bash
sudo apt install jitsi-meet
```

> 如果有选择的提示，不懂时按照提示输入y或yes即可

- 在此过程会让你输入域名，如下：

![屏幕截图 2023-09-13 225831.png](https://s2.loli.net/2023/09/13/mUg4co6tLN9zZur.png)

输入你自己刚刚设置的域名

- 然后进入下一步，出现如下情况：

![屏幕截图 2023-09-13 225945.png](https://s2.loli.net/2023/09/13/VPp15CS3sZWUmIf.png)

我们选择`1`

- 然后出现以下情况，提示你输入邮箱

最后等待命令执行结束，然后在浏览器输入你的域名就可以访问了，界面如下：

![屏幕截图 2023-09-13 232544.png](https://s2.loli.net/2023/09/13/BFfr7R3Y4o16JMb.png)

## 🤼‍♀️后记

在安卓上使用时你可以在谷歌商店下载官方应用，安装完成后，你将拥有一个功能强大的视频通话平台，可以与他人进行高清视频通话、共享屏幕、发送聊天消息以及记录会议内容。你可以邀请他人加入你的会议，无论他们是使用Jitsi Meet客户端还是通过浏览器访问。