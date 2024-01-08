---
title: 闲置VPS利用——Docker compose搭建个人链接展示页LinkStack
date: 2023-08-20T18:57:42+08:00
permalink: /linkstack
lastmod: 2023-08-21T18:57:42+08:00
tags: 
    - 🐘Linux
    - 🐋Docker
    - 💻闲置VPS利用计划
author: yuniee
summary: 搭建一个个人主页，展示你的个人链接，让大家更好的了解你。
image: https://s2.loli.net/2023/08/27/IxPmdavn8wcoW5g.png
---

# 闲置VPS利用——Docker compose搭建个人链接展示页LinkStack

## 🦜前言

### 😇简介

有时你需要一个聚合链接网页，展示你的各种链接，类似于博客链接，YouTube ，tiktok，BiliBili主页链接，又或者想把它当做一个放少量链接的导航站，那这个项目一定适合你。

这是官方对其功能的简介：

LinkStack是一个独特的平台，为在线链接管理和共享提供高效解决方案。我们的平台类似于Linktree网站，克服了社交媒体平台只能添加一个链接的限制。通过LinkStack，用户可以轻松地链接到自己定制的页面，并在一个便捷位置为其关注者提供访问所需所有链接的方式。与其他链接管理平台相比，LinkStack最大的优势在于其灵活性，使用户能够将其链接托管在自己的网络服务器或网络托管提供商上。这样一来，用户完全掌握了他们在线存在的控制权，并确保他们的链接易于访问。此外，LinkStack还允许其他用户注册并创建自己的链接，这使其成为企业和组织管理多个链接时理想选择。借助我们友好易用的管理员面板，管理和访问其他用户的连接变得简单轻松。

### 🐧项目展示

直接上我的成品图：

![link](https://s2.loli.net/2023/08/27/dEmJIgptLq9VKwO.png)

官方还有各种自定义的主题，下面展示一些。

<img src="https://s2.loli.net/2023/08/27/k7jSHiyAuVa4TNM.png" alt="preview _1_.png" style="zoom: 33%;" />

<img src="https://s2.loli.net/2023/08/27/8BElWRGigN3D5c9.png" alt="preview.png" style="zoom:33%;" />

<img src="https://s2.loli.net/2023/08/27/swJ7Eku2nSUZbme.png" alt="preview _2_.png" style="zoom:33%;" />

总体看下来还是非常美观和有趣的，一个美观的个人页面会让别人对你印象深刻，来自己搭建一个属于你自己的个人链接聚合主页，自托管在自己的服务器上吧。

### 🐨项目地址

项目github：[Github](https://github.com/LinkStackOrg/LinkStack)

官网：[官网](https://linkstack.org/)

Docker地址：[Docker](https://hub.docker.com/r/linkstackorg/linkstack)

官网主题下载链接：[主题下载链接](https://linkstack.org/themes/)

## 🦄开始搭建

### 🦖准备工作

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

### 🦂项目部署

1. 添加swap

我使用的系统为Debian11，这个虽然只是一个个人主页，但建议512m内存的vps开启一些swap，因为内存占用还是有点高的。

开启swap可使用以下脚本：

```bash
wget https://www.moerats.com/usr/shell/swap.sh && bash swap.sh
```

根据脚本提示添加swap，自己决定添加多少，512(第二步输入512)应该就够了。

2. 安装

我们使用docker-compose安装，我选择将docker-compose文件放在`/opt/LinkStack`下。

新建目录并切换到此目录：

```bash
mkdir -p /opt/LinkStack && cd /opt/LinkStack
```

然后使用vim指令创建新的docker-compose配置文件并输入内容。

```bash
vim docker-compose.yml
```

输入以下内容：

```yaml
version: "3.8"

services:

  linkstack:
    hostname: 'linkstack'
    image: 'linkstackorg/linkstack:latest'
    environment:
      TZ: 'Asia/Shanghai'
      SERVER_ADMIN: 'admin@yuniee.de'          #改成你自己的邮箱
      HTTP_SERVER_NAME: 'a.example.com'        #改成你的域名
      HTTPS_SERVER_NAME: 'a.emxample.com'      #改成你自己的域名
      LOG_LEVEL: 'info'
      PHP_MEMORY_LIMIT: '512M'        
      UPLOAD_MAX_FILESIZE: '16M'
    volumes:
      - 'linkstack_data:/htdocs' 
    ports:
      - '8500:443'                             #冒号左边改成你的未被占用的端口 
    restart: unless-stopped

volumes:
  linkstack_data:
```

接着按键盘英文 `:` 然后输入`wq`保存退出vim编辑器。

随后启动容器：

```bash
docker-compose up -d
```

等待拉取镜像并部署。

然后在浏览器输入：https://ip:8500 (你刚才修改的端口) 

> 注意要用https，提示不安全也点击继续进入，因为我们是自签证书。

### 🦧后台配置

打开后台是这样的，因为不支持中文，所以选择英文就可以了。点击next，进入下一步。

<img src="https://s2.loli.net/2023/08/28/uvCO4bDheSnzqLG.png" alt="后台1" style="zoom: 70%;" />



接着界面如下显示，继续点击next



<img src="https://s2.loli.net/2023/08/28/rBUGoPbtcVWhwym.png" alt="2" style="zoom:70%;" />



下一步如下，选择默认的SQLite就可以，继续点击下一步。

输入你设置的邮箱，自己设置一个密码，Handle后面也自己填一个，页面的名字自定义。之后点击下一步。

<img src="https://s2.loli.net/2023/08/28/yHKIENMiaLlCzhb.png" alt="屏幕截图 2023-08-28 221809.png" style="zoom:70%;" />

接下来根据需求选择，分别是`开启注册`, `启用邮箱验证`，`将您的页面设为首页（个人使用建议修改为yes，否则你必须在域名后面添加/home才能访问你的链接）`

<img src="https://s2.loli.net/2023/08/28/5wKdXHMky3WInsx.png" alt="屏幕截图 2023-08-28 222120.png" style="zoom:70%;" />





然后到达以下页面



<img src="https://s2.loli.net/2023/08/28/DswOZVfp7134Qqe.png" alt="屏幕截图 2023-08-28 222625.png" style="zoom:70%;" />

在网页后面加入`/home`进入后台管理页面。

然后你就自己探索如何自定义你自己的主页，让其成为你想要的外观。

## 🫣后记

做出自己的链接后就添加自己的各个链接让别人访问。聚合你的社交媒体链接，写下一段简短的自我介绍，让别人了解你更方便，更轻松。如果想通过域名访问，请参考这篇文章配置反向代理：[Caddy的基础使用，下载Caddy并部署反向代理和自动签发, 续期SSL 证书](https://www.yunieebk.com/2023/07/30/caddy%E7%9A%84%E5%9F%BA%E7%A1%80%E4%BD%BF%E7%94%A8%EF%BC%8C%E4%B8%8B%E8%BD%BDcaddy%E5%B9%B6%E9%83%A8%E7%BD%B2%E5%8F%8D%E5%90%91%E4%BB%A3%E7%90%86%E5%92%8C%E8%87%AA%E5%8A%A8%E7%AD%BE%E5%8F%91-%E7%BB%AD%E6%9C%9Fssl-%E8%AF%81%E4%B9%A6/)
