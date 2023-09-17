---
title: 闲置VPS利用——使用docker-compose搭建一个QQFlac音乐下载器
date: 2023-08-22T18:57:42+08:00
lastmod: 2023-08-23T18:57:42+08:00
tags: 
    - 🐘Linux
    - 🐋Docker
    - 💻闲置VPS利用计划
author: yuniee
summary: 搭建一个QQ音乐无损音乐下载器，不需要再充绿钻会员也能下载无损音乐。
image: https://s2.loli.net/2023/08/30/ePp7NzMVUOmiaCq.jpg
---

# 闲置VPS利用——使用docker-compose搭建一个QQFlac音乐下载器

## 🦬前言

### 🥸项目简介

QQ音乐作为国内最大的音乐播放平台之一，再加上~~南山必胜客~~腾讯的实力，无疑在国内音乐软件里处于统治地位。版权也算是最多的。但现在大部分热门歌曲不开绿钻会员只能播放一小部分。并且有时候你想要更方便地把qq音乐中你喜欢的音乐的无损音源下载下来。有时候你喜欢使用其他的播放器，但某首音乐的版权只在qq音乐，所以你想下载之后和其他音乐软件配合使用，这样更方便。综上所述，我个人觉得这还是很有用的一个项目。

### 🐧项目展示

![屏幕截图 2023-09-01 213658.png](https://s2.loli.net/2023/09/01/8z7t6GbKXVESasZ.png)

Github仓库地址：[QQFlacMusicDownloader](https://github.com/QiuChenlyOpenSource/QQFlacMusicDownloader)



## 🫀开始搭建

### 🤓准备工作

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

### 😈项目部署

1. 新建目录

我选择将docker-compose文件和存储下载的音乐的目录放到/qqmusicdl目录下，所以先按照以下步骤新建目录并切换到该目录：

```bash
mkdir -p /opt/qqmusicdl/download && cd /opt/qqmusicdl
```

然后我们输入`ls`能看见这个目录下已经有一个download目录了，这是用来存储下载的音乐，因为本项目是将音乐下载到vps当中的，之后我们会介绍如何方便地将音乐文件取出来。

2. 创建一个docker-compose.yml文件

输入以下指令创建一个docker-compose.yml文件,在这之前请保证你在/opt/qqmusicdl目录下。

```bash
vim docker-compose.yml
```

输入指令后会进入vim编辑器界面，然后复制以下内容：

```yaml
version: "3"
services:
  downloader:
    image: registry.cn-hangzhou.aliyuncs.com/music_downloader/qq_flac_music_downloader
    container_name: music
    network_mode: bridge
    volumes:
      - /opt/qqmusicdl/download:/workspace/music #冒号左边输入我们上面创建的download目录，你可以改成你想要保存的位置
    ports:
      - "8888:8899"    #冒号左边可以自定义为你想要的可用的，未被占用的端口号
    restart: always
```

之后按键盘`ESC`键并输入`:`+wq保存退出vim编辑器。

然后拉取镜像并启动容器：

```bash
docker-compose up -d
```

然后使用ip:端口的方式访问网页检查是否成功运行。所以我需要在浏览器输入ip:8888以进入网页，如果想要用域名访问请参考这篇文章：[Caddy的基础使用，下载Caddy并部署反向代理和自动签发, 续期SSL 证书](https://www.yunieebk.com/2023/07/30/caddy%E7%9A%84%E5%9F%BA%E7%A1%80%E4%BD%BF%E7%94%A8%EF%BC%8C%E4%B8%8B%E8%BD%BDcaddy%E5%B9%B6%E9%83%A8%E7%BD%B2%E5%8F%8D%E5%90%91%E4%BB%A3%E7%90%86%E5%92%8C%E8%87%AA%E5%8A%A8%E7%AD%BE%E5%8F%91-%E7%BB%AD%E6%9C%9Fssl-%E8%AF%81%E4%B9%A6/)



### 👻下载Alist来访问自己下载的本地文件

alist文档地址：[Alist文档](https://alist.nn.ci/zh/)

alist的GitHub地址：[Github](https://github.com/alist-org/alist)

运行官方一键脚本

```bash
curl -fsSL "https://alist.nn.ci/v3.sh" | bash -s install
```

运行完安按照提示先输入

```bash
cd /opt/alist
```

再输入

```bash
./alist admin set NEW_PASSWORD
```

把`NEW_PASSWORD`改成你想要的密码。

输入 ip:5244进入web页面，使用admin和你设定的密码登录（登陆后可更改用户名）

> 同样可以通过caddy配置反向代理使用域名访问。

根据提示使用安装后出现的初始密码登录账号，点击下方`管理`按钮进入管理界面，点击`存储`再点击`添加`,填入你的挂载路径和根文件夹路径。

![gz.png](https://s2.loli.net/2023/09/01/nr3Kas1GUIlHMCL.png)



![qqmsc.png](https://s2.loli.net/2023/09/01/N71a6ibCfLTgYhq.png)

然后点击保存，之后回到主页就能看见你自己创建的目录了，进去就是你保存的音乐

![屏幕截图 2023-09-01 225015.png](https://s2.loli.net/2023/09/01/WIQMblZuKj8vYoq.png)

接下来这这里面你可以自己管理音乐的删除或可以之直接在这里通过浏览器下载音乐文件，当然这个文件管理器也内置了音乐播放器，非常好用的一个文件管理器。

## 🐇后记

我个人因为开了AdGuard和卡巴斯基这类去广告或广告拦截软件，所以打开网站会无法显示搜索菜单栏，建议无法正常显示的试着先关闭这类软件，在手机上使用桌面模式可以正常使用。
