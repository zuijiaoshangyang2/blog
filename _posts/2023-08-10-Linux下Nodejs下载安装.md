---
title: Linux下手动安装最新版nodejs
date: 2023-08-10T18:57:42+08:00
lastmod: 2023-08-11T19:57:42+08:00
tags: 
    - 🐘Linux
    - 🍓nodejs
author: yuniee
summary: 如果使用apt源下载的方式不可以使用，就试试手动安装吧，也可以选择任意版本
image: https://s2.loli.net/2023/08/16/WFUtnA64pz29R7g.png
---

> 手动下载也可以选择任意版本，遇到不能使用安装源下载的情况就使用手动下载吧

# Linux下Nodejs下载安装

nodejs官网下载：[下载链接](https://nodejs.org/zh-cn/download)

nodejs中文网：[下载链接](https://nodejs.cn/download/)

## 🌏官网下载压缩包

进入下载链接然后选择



![node.png](https://s2.loli.net/2023/08/16/KXgLDnBA1VlcNJE.png)





我当前用的是x64架构的操作系统，所以我选择这个，大家按照自己的实际情况选择。

## 🗜上传后解压

1. 首先在解压之前我先创建一个目录，我们待会将压缩包里的内容解压到这个目录

我习惯放到`/usr/local/lib/nodejs`大家自由选择即可。

```bash
sudo mkdir -p /usr/local/lib/nodejs
```

2. 我下载的压缩包为`node-v16.20.2-linux-x64.tar.xz`

解压缩`tar.xz`使用的命令为

```bash
sudo tar -xJvf 你下载的压缩包名称 -C /usr/local/lib/nodejs
```

所以这里我需要使用

```bash
sudo tar -xJvf node-v16.20.2-linux-x64.tar.xz -C /usr/local/lib/nodejs
```

> 注：如果提示没有安装tar.xz解压工具,提示如下错误

> ```bash
> tar (child): xz: Cannot exec: No such file or directory
> tar (child): Error is not recoverable: exiting now
> tar: Child returned status 2
> tar: Error is not recoverable: exiting now
> ```
> 
> 可以运行
>
> ```bash
> sudo apt-get update
> sudo apt-get install xz-utils
> ```
>
> 



## 💧配置环境变量

解压后修改在/root目录下的`.profile`文件

```bash
vim /root/.profile
```



在文件底部加入

```bash
export PATH=/usr/local/lib/nodejs/node-$VERSION-$DISTRO/bin:$PATH
```

根据我下载的安装包我应该输入

```bash
export PATH=/usr/local/lib/nodejs/node-v16.20.2-linux-x64/bin:$PATH
```

配置之后我们需要刷新profile配置，运行：

```bash
. ~/.profile
```



## 👀检测安装版本

最后检测一些我们的安装版本来确定我们是否已经安装成功并正确配置

```bash
node -v
```

```bash
npm version
```

```bash
npx -v
```



结果输出应该如下

```bash
root@server-iwi3ky:~# node -v
v16.20.2
root@server-iwi3ky:~# npm version
{
  npm: '8.19.4',
  node: '16.20.2',
  v8: '9.4.146.26-node.26',
  uv: '1.43.0',
  zlib: '1.2.11',
  brotli: '1.0.9',
  ares: '1.19.1',
  modules: '93',
  nghttp2: '1.47.0',
  napi: '8',
  llhttp: '6.0.11',
  openssl: '1.1.1v+quic',
  cldr: '41.0',
  icu: '71.1',
  tz: '2022f',
  unicode: '14.0',
  ngtcp2: '0.8.1',
  nghttp3: '0.7.0'
}
root@server-iwi3ky:~# npx -v
8.19.4
```



这样就成功安装了，当然，如果你想继续安装yarn，你可以使用以下指令来安装yarn。
```bash
npm install --global yarn
```

apt软件源安装方式：[Debian 11 安装最新node.js](https://www.yunieebk.com/2023/08/10/linux%E4%B8%8Bnodejs%E4%B8%8B%E8%BD%BD%E5%AE%89%E8%A3%85/)

