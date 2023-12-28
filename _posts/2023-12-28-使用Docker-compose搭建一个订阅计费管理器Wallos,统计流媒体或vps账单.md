---
title: 使用Docker-compose搭建一个订阅计费管理器Wallos,统计流媒体或vps账单
permalink: /Wallos
date: 2023-12-28T11:57:42+08:00
lastmod: 2023-12-28T18:57:42+08:00
tags: 
    - 🐘Linux
    - 🐋Docker
    - 💻闲置VPS利用计划
author: yuniee
summary: 搭建一个Personal Subscription Tracker，管理流媒体，vps或其他订阅制的账单统计，看看自己一年为此究竟花了多少钱。
image: https://s2.loli.net/2023/12/28/8K9IitbpurAVmcy.png
---

# 使用Docker-compose搭建一个订阅计费管理器Wallos,统计流媒体或vps账单

<InArticleAdsense
    data-ad-client="ca-pub-5818850638223663"
    data-ad-slot="1327307385">
</InArticleAdsense>

## 🫢前言

平时订阅了许多流媒体，也买了很多vps，但想知道自己一年在这些东西上花多少钱很麻烦，总想找一个能帮我们统计这些订阅制费用的软件，好让我们心中有数。有人用notion或excel等来统计自己在这些订阅制产品上的花费，但个人感觉还是有些不方便和简陋。之前在微信中使用过一个叫做“有数鸟”的订阅制管理小程序，可以管理比如Netflix，spotify或爱奇艺等流媒体的计费，但毕竟是在微信公众号中，自己感觉不方便。并且图标仅限于这些流媒体。后来也放弃使用了。接着在GitHub上发现了Wallos这个项目，开源且可以自托管，使用起来稍微安心和方便一些。

## 🫠介绍及展示

**特性**：

订阅管理：跟踪您的定期订阅和付款，确保您不会错过截止日期。

分类管理：将您的费用组织成可自定义的类别，帮助您了解自己的消费习惯。

多货币支持：Wallos支持多种货币，使您能够以所选货币管理财务。

**货币转换：与Fixer API集成，可以获取汇率并在主要货币中查看所有订阅内容。**（我觉得这是最吸引我的地方）

数据隐私：作为自托管应用程序，Wallos确保您的财务数据在自己的服务器上保持私密和安全。

定制化：根据需要个性化设置Wallos的类别、货币、主题和其他显示选项。

排序选项：允许从不同排序方式查看您的订阅内容。

徽标搜索: 如果没有可供上传，则Wallos可以在网络上搜索您订阅服务的徽标图案.

移动视图: 随时使用移动设备浏览Wallos.

统计信息: 从另一个角度了解你的开销.

通知: 通过电子邮件收到即将到期付款提醒

**展示**：

随便添加了几个来展示一下，可以看见，因为这个是在网络上搜索icon的，所以就算是冷门的icon也能找到，实在找不到就可以自己上传一个。这些价格都是Fixer自动转换汇率之后的结果。



![屏幕截图 2023-12-28 125756.png](https://s2.loli.net/2023/12/28/ncGeDxOX4UjkWoH.png)



![屏幕截图 2023-12-28 124953.png](https://s2.loli.net/2023/12/28/PI8FzE9n3Q2LXYf.png)

<img src="https://s2.loli.net/2023/12/28/ob4LkvUP7nExm63.jpg" alt="an" style="zoom: 50%;" />



Github仓库：[Wallos](https://github.com/ellite/Wallos?tab=readme-ov-file)

## 🤐安装部署

### 😇准备工作

更新系统，我使用的是Debian11系统（Ubuntu同理）

```bash
apt update -y && apt upgrade -y
```

安装必要工具

```bash
apt install wget curl sudo nano git  -y
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

### 🫤项目部署

1. 创建存配置文件的目录,然后进入目录下。

```bash
mkdir /opt/wallos
cd /opt/wallos
```

2. 创建docker-compose.yaml

```bash
nano docker-compose.yaml
```

写入以下内容：

```yaml
version: '3.0'

services:
  wallos:
    container_name: wallos
    image: bellamy/wallos:latest
    ports:
      - "8282:80/tcp"        #冒号左边为打开网页时输入的端口
    environment:
      TZ: 'Asia/Shanghai'
    # Volumes store your data between container upgrades
    volumes:
      - './db:/var/www/html/db'
      - './logos:/var/www/html/images/uploads/logos'
    restart: unless-stopped
```

然后按住`ctrl`键按`x`键，之后输入`y`按回车保存。

3. 拉取镜像部署

```bash
docker-compose up -d
```

静等镜像自动拉取并自动启动应用后输入 `ip:端口`打开网页，根据上面的配置文件我的端口是8282.



如果需要配置反向代理用域名访问请参考这篇：[caddy配置反向代理](https://www.yunieebk.com/2023/07/30/caddy%E7%9A%84%E5%9F%BA%E7%A1%80%E4%BD%BF%E7%94%A8%EF%BC%8C%E4%B8%8B%E8%BD%BDcaddy%E5%B9%B6%E9%83%A8%E7%BD%B2%E5%8F%8D%E5%90%91%E4%BB%A3%E7%90%86%E5%92%8C%E8%87%AA%E5%8A%A8%E7%AD%BE%E5%8F%91-%E7%BB%AD%E6%9C%9Fssl-%E8%AF%81%E4%B9%A6/)

## 🐺使用

### 🚪后台

打开网页会让我们先创建一个登录账号，并选择自己使用的货币


![屏幕截图 2023-12-28 121606.png](https://s2.loli.net/2023/12/28/v1BD8HeRN7TYPGk.png)

然后就可以登录了



![屏幕截图 2023-12-28 121743.png](https://s2.loli.net/2023/12/28/aFnOi1XQHAPuoD2.png)

点击头像旁的小箭头就可以选择进入设置和总账单统计。

> 黑色或白色主题在设置里切换



![屏幕截图 2023-12-28 132721.png](https://s2.loli.net/2023/12/28/yjJUSbtxsFg24LA.png)

### 🐒添加订阅产品

可以看到，只需要在名称里输入关键词就可以点击右侧的小放大镜来搜索，如果搜索不到就试着换关键词，等获取图标之后再改成你想要的名称就可以了，也可以点击`Upload Logo`来上传本地图片。



![屏幕截图 2023-12-28 122017.png](https://s2.loli.net/2023/12/28/YOcVdTf9ZgwbrBR.png)



这个URL可以填写一下，因为填写之后可以在主界面直接打开



![屏幕截图 2023-12-28 142324.png](https://s2.loli.net/2023/12/28/MrbDFo6wsVH3Gxt.png)

先点击一下产品再，点击这个小地球就可以直接跳转到产品界面，所以你可以将URL设置为vps后台面板或者付款界面。很方便就能打开了。



![屏幕截图 2023-12-28 142525.png](https://s2.loli.net/2023/12/28/K3UjCTJaysARrfu.png)



### 🦥配置Fixer汇率转换

想要配置汇率转换功能就可以使用fixer，首先打开这个链接申请一个免费的fixer api： [fixer api申请链接](https://fixer.io/#pricing_plan)

打开之后根据自己的情况选择一个api PLAN，个人的话免费的应该也够用。


![屏幕截图 2023-12-28 143033.png](https://s2.loli.net/2023/12/28/tc6glBQoLp9FIvG.png)



填写信息后注册号就会直接跳转到Dashboard的api界面，复制获取到的api



![屏幕截图 2023-12-28 143415.png](https://s2.loli.net/2023/12/28/4u3jkUVQ2o6aXvN.png)



然后我们回到我们搭建的Wallos，点击头像旁的小箭头，点击setting选项进入设置界面。滑到下面，可以看到 Fixer API Key 一栏，填入你刚才获取到的api key点击save即可。你可以选择DisPlay setting一栏中第二个选项，使你输入的外币账单在展示时直接转换为人民币展示。



![屏幕截图 2023-12-28 144004.png](https://s2.loli.net/2023/12/28/J5eyQYrZG6ODKFl.png)



**❗❗**刚刚配置完汇率汇率显示是有问题的，所以你应该先将setting里个人资料部分的Main Currency改成你添加的产品的货币，比如欧元或者美元，保存后再修改回Chinese Yuan再次保存。就会正常显示转换后的人民币了。以后你添加订阅账单时就直接选择账单的原始货币就可以了。

![屏幕截图 2023-12-28 144529.png](https://s2.loli.net/2023/12/28/LfYWuJVtT1iPc3E.png)



## 🫥后记

还有其他功能比如邮件提醒功能想要配置的可以搜索一下你想使用的邮箱的STMP配置，但要注意这是以明文传输的，所以我也就没配置，项目作者推荐为了安全起见，创建一个专门用于此目的的邮箱账户。其他的自定义分类等也可以自己摸索一下。总的来说，这已经满足了我的大部分需求，很方便掌握我的消费。（话说添加之后发现买鸡真的是温水煮青蛙🐸，没想到一年这么多钱😬）。
