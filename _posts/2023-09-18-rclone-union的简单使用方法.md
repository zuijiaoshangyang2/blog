---
title: rclone union的简单使用方法
date: 2023-09-18T18:57:42+08:00
lastmod: 2023-09-18T19:57:42+08:00
tags: 
    - 🐘Linux
    - 📁rclone
author: yuniee
summary: rclone union怎么使用？将你的云盘多合一，统一管理。
image: https://s2.loli.net/2023/09/18/GcpseQy3j41abRK.png
---

# rclone union的简单使用方法

## 🐓前言

当想把云盘全部挂载在一个文件夹里更好管理时，又或者当你没有大容量云盘，只是白嫖了E5的开发者5T云盘想要挂载为emby的影视盘时想统一设置vfs-cache-max-size，而不是每个盘都分开设置vfs-cache-max-size使小硬盘emby服务器能得到更大效率的利用时rclone union就能很好的帮忙。不由得让人赞叹rclone功能的强大。

Rclone Union 是 Rclone 的一个插件，它为用户提供了一个强大的工具，可以将多个云存储服务合并到一个统一的文件系统中，就像它们是一个存储空间一样。这使得您可以轻松地在不同的云存储服务之间移动、复制和管理文件，而无需来回切换不同的云存储账户。无论您是一个拥有多个云存储账户的个人用户，还是一个需要整合不同云存储服务的企业用户，Rclone Union 都是一个强大的工具，可以简化您的工作流程。

## 🐕‍🦺使用方式

### 🐚前提
你已经提前用rclone添加了所有你想要挂载的云盘。

*如果你不知道如何安装配置Rclone并添加Onedrive网盘（其他网盘步骤类似）及Rclone的基本使用方法可参考：[Linux下如何安装配置Rclone并添加Onedrive网盘及Rclone的基本使用方法](https://www.yunieebk.com/2023/08/22/linux%E4%B8%8B%E5%A6%82%E4%BD%95%E5%AE%89%E8%A3%85%E9%85%8D%E7%BD%AErclone%E5%B9%B6%E6%B7%BB%E5%8A%A0onedrive%E7%BD%91%E7%9B%98%E5%8F%8Arclone%E7%9A%84%E5%9F%BA%E6%9C%AC%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95/)*

### 🐖操作方式
可以通过rclone操作界面挂载，但那很麻烦，我们选择最简单的方式。直接在rclone的配置文件（`rclone.config`）中添加rclone union的配置。

因为在你输入rclone config命令开始，rclone就会在你的`/root/.config/rclone`路径下创建了一个`rclone.config`文件，如果你之前已经添加好了云盘，你会在里面看见你的所有配置，例如：

```bash
[onedrive1]
type = onedrive
token = {"access_token":"xxxx"}
drive_id = xxxxxxx
drive_type = business
```

> 个人配置不同，形式供参考。

### 🐯关于配置文件

配置文件可以直接修改生效，而不需要再运行`rclone config`指令一条条添加，所以当你想要迁移rclone或者想要在另一台vps上添加相同的云盘而不想要再次麻烦地按步骤一条条添加，就可以直接保存这个文件然后覆盖另一台vps的`/root/.config/rclone/rclone.config`,这样再次输入`rclone config`时就可以看见相同的配置和名称。

### 🤠修改配置文件添加rclone union

假设我已经提前添加了 onedrive1  onedrive2   google1  webdav云盘

使用vim编辑器打开`/root/.config/rclone`:

```bash
vim /root/.config/rclone
```

到文件的最底部，输入`i`添加以下内容（根据自己自定义的网盘名称修改）：

```bash
[union(可自定义)]
type = union
remotes = onedrive1:/  onedrive2:/  google1:/  webdav:/
```

然后输入`:`加`wq`保存，然后再次输入rclone config就可以看见已经多了一个名为union的名称。如果你挂载union到本地就会看见这个目录下分别有 onedrive1 onedrive2 google1 webdav目录，里面的内容就是各个网盘的根目录内容。

#### 🦒只添加某个网盘特定的目录下的文件

如果我想添加onedrive1网盘内的名为emby的目录，onedrive2下名为movie的目录，google1名为TV的目录，webdav下名为9kg（😏）的目录，就可以按照常规的类似`onedrive1:/emby`的形式，下面是示例：

```bash
[union(可自定义)]
type = union
remotes = onedrive1:/emby  onedrive2:/movie  google1:/TV  webdav:/9kg
```

按照上面同样的方法保存退出文件就可以了。

## 🐮后记

通过以上方式简单的使用rclone union，这样你在emby影视盘挂载时不仅更方便，也会让你更节省资源，使播放体验更好。
