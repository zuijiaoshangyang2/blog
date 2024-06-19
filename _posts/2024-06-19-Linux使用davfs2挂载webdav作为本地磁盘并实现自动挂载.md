---
title: Linux使用davfs2挂载webdav作为本地磁盘并实现自动挂载
permalink: /davfs2
date: 2024-06-19T20:20:42+08:00
lastmod: 2024-06-19T20:25:42+08:00
tags: 
    - 🐘Linux
    - 🗃️WebDav
author: yuniee
summary: 将webdav挂载到本地作为本地磁盘，实现小容量vps扩容。
image: https://s2.loli.net/2024/06/19/XQLa536RzTtyxAM.png
---

# Linux使用davfs2挂载webdav作为本地磁盘并实现自动挂载

<InArticleAdsense
    data-ad-client="ca-pub-5818850638223663"
    data-ad-slot="1327307385">
</InArticleAdsense>



## 🐁前言

​       当使用的操作系统硬盘非常小，不够使用的时候除了添加磁盘等解决方法外，还可以采用webdav的方法来挂载一个网络磁盘。这个方式的成本较低，且也比较灵活。支持webdav的网盘有很多，比如[infini cloud](https://infini-cloud.net/en)（如注册可以使用我的邀请码`32VVG`增加5GB的空间），以及一些自建网盘程序，如[Cloudreve](https://docs.cloudreve.org/)等，当然[alist](https://alist.nn.ci/zh/guide/webdav.html)可以将大多数网盘转换为webdav的形式，所以使用webdav是一个比较不错的选择。

## 🦡使用davfs2挂载网盘

**1.安装davfs2**

```bash
yum install davfs2 #CentOS系统
apt install davfs2 #Ubuntu/Debian系统
```

**2.创建挂载目录：**

```bash
mkdir /path/webdav  #创建想要挂载的目录路径
```

**3.挂载 WebDAV：**

```bash
mount -t davfs https://webdav.drive.com/dav  /path/webdav  #替换为自己想要挂载的webdav网址
```

4.输入账号密码：

使用以上挂载命令后就会让输入账号密码，只需要按照实际输入即可。网盘的官网或者文档都会提供。

然后输入`df -h`就可以查看到当前挂载的硬盘。

## 🦛配置开机自动挂载

​       每次重启后都必须要重新输入挂载命令，非常不方便，所以我们可以配置davfs2的配置文件以及配置systemd服务化来实现开机自动挂载，达到无感的效果。

**1.修改`davfs2.conf`配置文件**

```bash
nano /etc/davfs2/davfs2.conf 
```

打开文件后修改其中的`use_locks`参数，将原来的`1`，改为`0`。

![](https://s2.loli.net/2024/06/19/PbynJCcaq7xoGL4.png)

**2.修改davfs2的secrets文件，添加认证信息**

```bash
nano /etc/davfs2/secrets
```

将webdav的地址以及用户名密码输入到最底部。

例如：

```bash
https://webdav.drive.com/dav  用户名  密码
```

**3.配置systemd文件**

我想要将webdav挂载到`/path/webdav`目录，所以我需要创建一个名为`path-webdav.mount`的systemd配置。

```bash
nano /etc/systemd/system/path-webdav.mount
```

> 注意：通常情况下，挂载单元文件（mount unit）的命名是按照要挂载的路径来命名的。这种命名约定是由systemd规定的，以便于自动识别和处理挂载点。如挂载点 `/mnt/data` 的挂载单元文件应命名为 `mnt-data.mount`

然后填入以下配置：

```bash
[Unit]
Description=Mount WebDAV Share
After=network-online.target
Wants=network-online.target

[Mount]
What=https://webdav.drive.com/dav  #修改为自己的webdav地址
Where=/path/webdav                 #修改为自己的挂载路径
Type=davfs 
Options=_netdev,users,rw

[Install]
WantedBy=multi-user.target
```

保存后重新加载systemd配置：

```bash
systemctl daemon-reload
```

然后输入：

```bash
systemctl enable path-webdav.mount
```

这样就能开机自动挂载了。

可以在重启系统之后再次输入`df -h`来测试一下是否挂载成功了。

<InArticleAdsense
    data-ad-client="ca-pub-5818850638223663"
    data-ad-slot="1327307385">
</InArticleAdsense>

