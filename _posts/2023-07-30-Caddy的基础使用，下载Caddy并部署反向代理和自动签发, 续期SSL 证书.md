---
title: Caddy的基础使用，下载Caddy并部署反向代理和自动签发, 续期SSL 证书
date: 2023-07-30T18:57:42+08:00
lastmod: CST，China Standard Time
tags: 
    - 🐘Linux
    - 🍬caddy
author: yuniee
summary: 证书配置不再那么复杂，小白也能自己配置ssl
image: 
  path: https://s2.loli.net/2023/08/16/p9gUMcPu1QVJShG.jpg
  alt: caddy
---

 # 前言 

​        通常觉得一台服务器上只部署一个服务显得服务器太过空闲，有些性能的浪费（~~我们要榨干它的最后一点资源~~）。但在一个只有一条独立IPV4的服务器上只有一个80端口(HTTP)和一个443端口(Https),当我们想要部署多个网站时我们就需要使用不同的端口，但因此当我们去访问这些网站时就必须以IP+端口的方式访问网站，这通常不太优雅。所以我们需要反向代理来将这些网站反向代理到80或443端口，让我们可以通过一条域名访问。并且我们可以不需要担心ssl证书的申请和续期了。

## 开始安装 

### 准备事宜

一条域名，一个**80和443端口未被占用**的VPS

### 安装Caddy

安装参考  [官方文档](https://caddyserver.com/docs/install)

接下来我们首先安装caddy，这里我们展示Ubuntu/Debian系统的安装，其他系统的安装见官方文档。

首先我们更新系统

```bash
apt update -y && apt upgrade -y
```

然后安装一些经常使用的软件

```bash
apt install wget curl sudo vim git  -y
```



第一步:

```bash
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https
```

第二步

```bash
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
```

第三步

```bash
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
```

第四步

```bash
sudo apt update
```

第五步

```bash
sudo apt install caddy
```

这样caddy就安装完成了，接下来我们可以使用`sudo systemctl start caddy`来启动caddy，然后可以使用`sudo systemctl status caddy`来查看caddy是否已经运行了。结果如下图：

![caddy.png](https://s2.loli.net/2023/08/01/uHN2tr51j7BDlws.png)

出现了active（running）说明我们已经成功启动caddy了。

然后使用

 ````
bash
 sudo systemctl enable caddy
 ````

来配置开机自启。

### Caddy的基础配置

Caddy的配置文件路径在 `/etc/caddy/Caddyfile`

```bash
sudo nano /etc/caddy/Caddyfile
```

第一次打开这个文件时会有很多内容，我们先把他们全部删掉或者注释掉，然后可以填入以下内容：

```
a.example.com {
         tls admin@examlpe.com
         encode gzip
         reverse_proxy localhost:7777
}
b.example.com {
         tls admin@examlpe.com
         encode gzip
         reverse_proxy localhost:8888
}
```

在这里你可以把域名改成你的提前解析过这台安装caddy的服务器ip的域名，邮箱也可以改成你的，当然随意填一个不存在的邮箱也可以。

### 使配置生效

若提前启动了caddy，我们需要使用 `sudo systemctl restart caddy `  来使配置生效。

配置完时候caddy会帮你自动申请证书，并且在之后会帮你自动续期证书，非常方便。

## 后记

Caddy还有其他使用方式，比如实现网站重定向

```
a.example.com {   
         redir https://b.example.com{uri}
}
```

这样就可以把a.example.com 重定向到 b.example.com



### 可能遇见的问题

有时候反向代理其他服务器的网站会出现无法使用的情况，我们可以使用

```
a.example.me {
    tls admin@example.com
    reverse_proxy https://11.22.33.44:9999 {
        transport http {
            tls_insecure_skip_verify
        }
    }
}
```



