---
title: 配置systemd实现rclone开机自动挂载
permalink: /rclone_auto_mount
date: 2024-06-19T17:57:42+08:00
lastmod: 2024-06-19T19:57:42+08:00
tags: 
    - 🐘Linux
    - 📁rclone
author: yuniee
summary: 使用systemd将rclone挂载服务化实现开机自动挂载以及更灵活的管理rclone挂载。
image: https://s2.loli.net/2024/06/19/ewn8gpsl3UJDcdo.png
---

# 配置systemd实现rclone开机自动挂载

## 🫎前言

​    Rclone 是一款管理云存储文件的命令行程序。添加网盘后可以挂载云盘到本机目录，比如将onedrive和Google Drive等知名网盘挂载到本地当作本地目录使用([Linux下如何安装配置Rclone并添加Onedrive网盘及Rclone的基本使用方法](https://www.yunieebk.com/2023/08/22/linux%E4%B8%8B%E5%A6%82%E4%BD%95%E5%AE%89%E8%A3%85%E9%85%8D%E7%BD%AErclone%E5%B9%B6%E6%B7%BB%E5%8A%A0onedrive%E7%BD%91%E7%9B%98%E5%8F%8Arclone%E7%9A%84%E5%9F%BA%E6%9C%AC%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95/))，比如在emby中常用在挂载大容量网盘来存储大量的影视文件。但是添加后每次重启都必须重新挂载，非常麻烦，所以配置成为systemd服务文件可以凭借简单的systemctl命令来实现启动停止重启以及开机自启的操作。

## 🦏方法一：直接配置systemd文件

systmd service文件常见的存放位置

1. `/etc/systemd/system/`（优先级最高）
2. `/run/systemd/system/`：runtime systemd unit

3. `/lib/systemd/system` :安装应用自带的service存储在这里（优先级最低）

通常修改都是在`/etc/systemd/system/`

所以在`/etc/systemd/system/`下创建一个名为`rclone-mount.service`的文件。

```bash
nano /etc/systemd/system/rclone-mount.service
```

然后输入以下内容

```bash
[Unit]
Description=Mount /opt/movie using rclone
After=network-online.target

[Service]
Type=forking
ExecStart=/usr/bin/rclone mount union:/ /opt/movie --allow-other --attr-timeout 5m --vfs-cache-mode full --vfs-cache-max-age 3h --vfs-cache-max-size 25G --vfs-read-chunk-size-limit 100M --buffer-size 256M --daemon
ExecStop=/bin/fusermount -u /opt/movie
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target
```

**这里的`ExecStart`部分修改为你自己的rclone挂载参数。**

接下来重新加载systemd,输入：

```bash
systemctl daemon-reload
```

之后就可以使用

```bash
systemctl enable rclone-mount.service
```

来实现开机自启了。

## 🐐方法二：将挂载命令写入脚本，再配置systemd文件

首先创建一个脚本，这里我将脚本放在root目录下

```bash
nano /root/rclone_mount.sh
```

然后在脚本中写入我的挂载命令：

```bash
#!/bin/sh
rclone mount union:/ /opt/movie --allow-other --attr-timeout 5m --vfs-cache-mode full --vfs-cache-max-age 3h --vfs-cache-max-size 25G --vfs-read-chunk-size-limit 100M --buffer-size 256M --daemon
```

然后配置`/etc/systemd/system/rclone-mount.service`

```bash
nano /etc/systemd/system/rclone-mount.service
```

填入以下内容：

```bash
[Unit]
Description=Mount /opt/movie using rclone
After=network-online.target

[Service]
Type=forking
Environment="PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
ExecStart=/root/rclone_mount.sh
ExecStop=/bin/fusermount -u /opt/movie
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

接下来重新加载systemd,输入：

```bash
systemctl daemon-reload
```

之后就可以使用

```bash
systemctl enable rclone-mount.service
```

来实现开机自启了。