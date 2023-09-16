---
title: Linux下如何安装配置Rclone并添加Onedrive网盘及Rclone的基本使用方法
date: 2023-08-22T18:57:42+08:00
lastmod: 2023-08-23T18:57:42+08:00
tags: 
    - 🐘Linux
    - 📁rclone
author: yuniee
summary: 在Linux下使用rclone工具挂载onedirve，实现文件在vps和Onedrive之间手动或自动转移。
image: https://s2.loli.net/2023/08/30/wg7xna2eBVpcWGA.png

---

# Linux下如何安装配置Rclone并添加Onedrive网盘及Rclone的基本使用方法

## 🐶前言

Rclone是一款强大而灵活的开源命令行工具，它在Linux系统上为用户提供了便捷的云存储管理解决方案。通过Rclone，您可以轻松地连接、同步和管理各种云存储服务，包括Google Drive、Dropbox、Amazon S3，以及本文所关注的微软OneDrive。无论您是希望备份重要文件，还是需要在多个云存储服务之间传输数据，Rclone都为您提供了一个统一的、命令行界面的工具，为Linux用户提供了无限的可能性。通过rclone，我们可以将网盘挂载到vps中，给小硬盘vps扩容，此功能还能用于emby网盘影库挂载。也可使用rclone增量备份文件以及迁移网盘和vps或网盘与网盘之间的数据。

## 💂‍♀️获取Onedrive Token

因为远程连接vps中我们不能跳转到浏览器登录账号来获取token，所以我们首先使用Windows安装rclone然后获取token用于vps中添加onedrive。



首先去rclone[官方下载地址](https://rclone.org/downloads/)根据实际情况下载Windows版rclone。此时下载了一个压缩包，将压缩包解压到你想要放置的文件夹，比如我将其解压到了`F:\recloe`,然后打开这个文件夹位置。双击进入`rclone-v1.64.0-windows-amd64`(根据版本不同，名称有微小变化)，就会看到如下界面。

![无标题-2023-09-16-2140.png](https://s2.loli.net/2023/09/16/lN4Yu9OwbKPphA3.png)

然后点击顶部路径位置，输入cmd，如下图：

![屏幕截图 2023-09-16 214337.png](https://s2.loli.net/2023/09/16/dAFCekybKNf8WQM.png)

然后就会打开电脑的命令提示符（cmd），而且cmd的路径就是我们rclone所在的位置。并在里面输入如下命令：

```bash
rclone authorize "onedrive"
```

![屏幕截图 2023-09-16 214652.png](https://s2.loli.net/2023/09/16/UF1bqGBJNi5wYd9.png)

按下回车键后会自动弹出默认浏览器，并跳到微软登录界面，安装要求登录账号后会显示success：

![屏幕截图 2023-09-16 214832.png](https://s2.loli.net/2023/09/16/hbRudw89YGIWiMt.png)

然后回到cmd界面就会看见已经出现token了：

![无标题-2023-09-16-2149.png](https://s2.loli.net/2023/09/16/rCgfJyURh5NFkte.png)

复制{xxxxxxxx}内全部内容，包括{}，然后找个地方保存起来。这就是onedrive的token。

## 🦦安装rclone并添加OneDrive

rclone有官方一键安装脚本，运行脚本后即可安装成功，但在此之前先更新一下操作系统。

- 更新系统，我使用的是Debian11系统（Ubuntu同理，其余的更新方式自己搜索）

```bash
apt update -y && apt upgrade -y
```

- 安装必要工具

```bash
apt install wget curl sudo vim git  -y
```

- 然后运行rclone安装脚本：

```bash
curl https://rclone.org/install.sh | sudo bash
```

之后输入`rclone config`命令，会进入交互页面：

```bash
root@server-eucco8:~# rclone config
2023/09/16 14:06:25 NOTICE: Config file "/root/.config/rclone/rclone.conf" not found - using defaults
No remotes found, make a new one?
n) New remote
s) Set configuration password
q) Quit config
n/s/q> 
```

输入n，开始创建连接网盘,然后输入你想要的名称（随意，这里我使用onedrive）：

```bash
Enter name for new remote.
name> onedrive
```

然后进入云盘类型的选择,可能因版本不同选项会有不同，只需要找到`Microsoft OneDrive`，我这里选择**31**：

```bash
Option Storage.
Type of storage to configure.
Choose a number from below, or type in your own value.
 1 / 1Fichier
   \ (fichier)
 2 / Akamai NetStorage
   \ (netstorage)
 3 / Alias for an existing remote
   \ (alias)
 4 / Amazon Drive
   \ (amazon cloud drive)
 5 / Amazon S3 Compliant Storage Providers including AWS, Alibaba, ArvanCloud, Ceph, China Mobile, Cloudflare, GCS, DigitalOcean, Dreamhost, Huawei OBS, IBM COS, IDrive e2, IONOS Cloud, Leviia, Liara, Lyve Cloud, Minio, Netease, Petabox, RackCorp, Scaleway, SeaweedFS, StackPath, Storj, Synology, Tencent COS, Qiniu and Wasabi
   \ (s3)
 6 / Backblaze B2
   \ (b2)
 7 / Better checksums for other remotes
   \ (hasher)
 8 / Box
   \ (box)
 9 / Cache a remote
   \ (cache)
10 / Citrix Sharefile
   \ (sharefile)
11 / Combine several remotes into one
   \ (combine)
12 / Compress a remote
   \ (compress)
13 / Dropbox
   \ (dropbox)
14 / Encrypt/Decrypt a remote
   \ (crypt)
15 / Enterprise File Fabric
   \ (filefabric)
16 / FTP
   \ (ftp)
17 / Google Cloud Storage (this is not Google Drive)
   \ (google cloud storage)
18 / Google Drive
   \ (drive)
19 / Google Photos
   \ (google photos)
20 / HTTP
   \ (http)
21 / Hadoop distributed file system
   \ (hdfs)
22 / HiDrive
   \ (hidrive)
23 / In memory object storage system.
   \ (memory)
24 / Internet Archive
   \ (internetarchive)
25 / Jottacloud
   \ (jottacloud)
26 / Koofr, Digi Storage and other Koofr-compatible storage providers
   \ (koofr)
27 / Local Disk
   \ (local)
28 / Mail.ru Cloud
   \ (mailru)
29 / Mega
   \ (mega)
30 / Microsoft Azure Blob Storage
   \ (azureblob)
31 / Microsoft OneDrive
   \ (onedrive)
32 / OpenDrive
   \ (opendrive)
33 / OpenStack Swift (Rackspace Cloud Files, Blomp Cloud Storage, Memset Memstore, OVH)
   \ (swift)
34 / Oracle Cloud Infrastructure Object Storage
   \ (oracleobjectstorage)
35 / Pcloud
   \ (pcloud)
36 / PikPak
   \ (pikpak)
37 / Proton Drive
   \ (protondrive)
38 / Put.io
   \ (putio)
39 / QingCloud Object Storage
   \ (qingstor)
40 / Quatrix by Maytech
   \ (quatrix)
41 / SMB / CIFS
   \ (smb)
42 / SSH/SFTP
   \ (sftp)
43 / Sia Decentralized Cloud
   \ (sia)
44 / Storj Decentralized Cloud Storage
   \ (storj)
45 / Sugarsync
   \ (sugarsync)
46 / Transparently chunk/split large files
   \ (chunker)
47 / Union merges the contents of several upstream fs
   \ (union)
48 / Uptobox
   \ (uptobox)
49 / WebDAV
   \ (webdav)
50 / Yandex Disk
   \ (yandex)
51 / Zoho
   \ (zoho)
52 / premiumize.me
   \ (premiumizeme)
53 / seafile
   \ (seafile)
Storage> 31

```

接下来只需要使用空格使用默认选项

```bash
Option client_secret.
OAuth Client Secret.
Leave blank normally.
Enter a value. Press Enter to leave empty.
client_secret> 

Option region.
Choose national cloud region for OneDrive.
Choose a number from below, or type in your own string value.
Press Enter for the default (global).
 1 / Microsoft Cloud Global
   \ (global)
 2 / Microsoft Cloud for US Government
   \ (us)
 3 / Microsoft Cloud Germany
   \ (de)
 4 / Azure and Office 365 operated by Vnet Group in China
   \ (cn)
region> 

Edit advanced config?
y) Yes
n) No (default)
y/n> 
```

直到这一步我们选择**no**,因为这是为了获取token，而我们之前获取过了。

```bash
Use web browser to automatically authenticate rclone with remote?
 * Say Y if the machine running rclone has a web browser you can use
 * Say N if running rclone on a (remote) machine without web browser access
If not sure try Y. If Y failed, try N.

y) Yes (default)
n) No
y/n> n
```

输入{你的token}后一直输入空格，直到出现以下界面

```bash
Current remotes:

Name                 Type
====                 ====
onedrive             onedrive

e) Edit existing remote
n) New remote
d) Delete remote
r) Rename remote
c) Copy remote
s) Set configuration password
q) Quit config
e/n/d/r/c/s/q> 
```

这里显示我们就添加onedrive成功了。并被我们刚才命名为了`onedrive`。

## 🦨使用方法

> 网盘文件就用name:/path，本地文件直接使用绝对路径即可（name为你自己为每个添加的网盘的命名，/path为此网盘内文件的路径。）

### 🦌平时使用中最基本的几个使用命令：

- copy复制文件

```bash
rclone copy source:sourcepath dest:destpsth
```

例如我想要将OneDrive网盘的/data的文件复制到vps的/opt目录，可使用：

```bash
rclone copy onedrive:/data  /opt
```

想要将我自己命名为`onedrive`的OneDrive网盘的/data1的文件复制到我自己命名为`google`的google网盘的/data2目录，可使用：

```bash
rclone copy onedrive:/data1  google:/data2
```



*以下所有命令皆同理，只是细微不同。*



- sync同步数据

```bash
rclone sync source:path dest:path
```

> 这个是同步参数，会保持目标文件夹的内容和源文件夹内容相同，所以会删除其他数据，所以一定要注意。

- move移动数据

```bash
rclone move source:path dest:path
```

- purge清空目标目录数据

```bash
rclone purge remote:path
```

- delete自定义删除数据可以使用：

```bash
rclone delete remote:path
```

### 🐇其他命令

- `rclone size` - 查看网盘文件占用大小。
- `rclone mkdir` - 创建目录。
- `rclone rmdir` - 删除目录。
- `rclone rmdirs` - 删除指定灵境下的空目录。如果加上 `--leave-root` 参数，则不会删除根目录。
- `rclone check` - 检查源和目的地址数据是否匹配。
- `rclone ls` - 列出指定路径下的所有的文件以及文件大小和路径。
- `rclone lsl` - 比上面多一个显示上传时间。
- `rclone lsd` 列出指定路径下的目录
- `rclone lsf` - 列出指定路径下的目录和文件

- `rclone bisync` -两条路径之间的双向同步。

- `rclone version` - 显示版本号。
- `rclone copyto` - 将文件从源复制到目标，跳过已经复制的。

- `rclone mount` - 将远程挂载为挂载点。
- `rclone moveto` - 将文件或目录从源移动到目标。

### 🐷常用参数

- `-n` = `--dry-run` - 测试运行，用来查看 rclone 在实际运行中会进行哪些操作。
- `-P` = `--progress` - 显示实时传输进度，500mS 刷新一次，否则默认 1 分钟刷新一次。
- `--cache-chunk-size SizeSuffi` - 块的大小，默认5M，理论上是越大上传速度越快，同时占用内存也越多。如果设置得太大，可能会导致进程中断。
- `--cache-chunk-total-size SizeSuffix` - 块可以在本地磁盘上占用的总大小，默认10G。
- `--transfers=N` - 并行文件数，默认为4。在比较小的内存的VPS上建议调小这个参数，比如128M的小鸡上使用建议设置为1。
- `--config string` - 指定配置文件路径，`string`为配置文件路径。
- `--ignore-errors` - 跳过错误。比如 OneDrive 在传了某些特殊文件后会提示`Failed to copy: failed to open source object: malwareDetected: Malware detected`，这会导致后续的传输任务被终止掉，此时就可以加上这个参数跳过错误。但需要注意 RCLONE 的退出状态码不会为`0`。

> 这里我最常用的就是 -P 参数了，可以让我直观的看见文件操作的进程。

## 🐞后记

rclone运行期间你可以配合screen指令来实现关闭ssh后继续运行rclone，并且随时可以调用出来查看进度，关于screen命令的使用可见这篇文章：[Linux screen指令的基础应用](https://www.yunieebk.com/2023/07/15/linux-screen%E6%8C%87%E4%BB%A4%E7%9A%84%E5%9F%BA%E7%A1%80%E5%BA%94%E7%94%A8/)，总得来说，rclone功能强大，文件操作可靠，是个非常实用的工具。