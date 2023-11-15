---
title: 闲置VPS利用计划——搭建属于自己的个人相册PhotoPrism
date: 2023-11-07T18:57:42+08:00
lastmod: 2023-11-07T19:57:42+08:00
tags: 
    - 🐘Linux
    - 🐋Docker
    - 💻闲置VPS利用计划
author: yuniee
summary: 打造属于自己的私人相册，记录自己的生活。Browse Your Life in Pictures
image: https://s2.loli.net/2023/11/07/HT7Qgz1KuxFMGdO.jpg
---

# 闲置VPS利用计划——搭建属于自己的个人相册PhotoPrism
<InArticleAdsense
    data-ad-client="ca-pub-5818850638223663"
    data-ad-slot="1327307385">
</InArticleAdsense>

## 🥳前言

为什么需要搭建自己的相册，因为自己搭建的相册更具隐私性，并且这可以通过网页随时随地查看。虽然看似图床也有类似的功能，但是首先大多数图床不具备展示视频的功能，而且这个本就是为了作为相册而设计的，所以还有很多特色功能。根据官方介绍有强大的搜索功能，面部识别，地图和地点，相册分享，广泛的文件格式支持，支持高级元数据提取等。总的来说是非常好用的。

> 建议在有更大的内存的服务器上运行。官方建议是4G，大于2G内存的添加SWAP后可尝试运行

**截图展示：**

![tupian](https://s2.loli.net/2023/11/07/LsgiEaZSInNFuW8.png)



[GitHub仓库链接](https://github.com/photoprism/photoprism)

[Demo](https://demo-zh.photoprism.app/library/browse)



## 🐈‍⬛开始搭建

### 🤯准备工作

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

### 🐅项目部署

1. 创建存配置文件的目录,然后进入目录下。

```bash
mkdir /opt/photoprism 
cd /opt/photoprism
```

2. 下载官方的docker-compose配置文件

```bash
wget https://dl.photoprism.app/docker/docker-compose.yml
```

3. 以下为配置文件中文翻译内容（来自chatgpt）：

```yaml
version: '3.5'

# PhotoPrism的Docker Compose配置文件示例（Linux / AMD64）
#
# 注意：
# - 在具有少于4GB交换空间的服务器上运行PhotoPrism，或者设置内存/交换限制，可能会导致意外重启（"崩溃"），例如当索引器临时需要更多内存来处理大文件时。
# - 如果您在家庭网络之外的公共服务器上安装PhotoPrism，请始终在其后面运行安全的HTTPS反向代理，例如Traefik或Caddy。否则，您的文件和密码将以明文形式传输，并可能被任何人截获，包括您的提供商、黑客和政府：
#   https://docs.photoprism.app/getting-started/proxies/traefik/
#
# 设置指南：
# - https://docs.photoprism.app/getting-started/docker-compose/
# - https://docs.photoprism.app/getting-started/raspberry-pi/
# - https://www.photoprism.app/kb/activation
#
# 故障排除清单：
# - https://docs.photoprism.app/getting-started/troubleshooting/
# - https://docs.photoprism.app/getting-started/troubleshooting/docker/
# - https://docs.photoprism.app/getting-started/troubleshooting/mariadb/
#
# CLI命令：
# - https://docs.photoprism.app/getting-started/docker-compose/#command-line-interface
#
# 当不以root用户身份运行时，所有命令可能都需要以"sudo"为前缀。
# 这将把家目录快捷方式~指向卷挂载中的/root。

services:
  photoprism:
    ## 用于测试预览版本的 photoprism/photoprism:preview：
    image: photoprism/photoprism:latest
    ## 在PhotoPrism正确配置和测试之前，请不要启用自动重启！
    ## 如果服务陷入重启循环，这可能是内存、文件系统、网络或数据库问题：
    ## https://docs.photoprism.app/getting-started/troubleshooting/#fatal-server-errors
    # restart: unless-stopped
    stop_grace_period: 10s
    depends_on:
      - mariadb
    security_opt:
      - seccomp:unconfined
      - apparmor:unconfined
    ports:
      - "2342:2342" # HTTP端口（主机:容器）
    environment:
      PHOTOPRISM_ADMIN_USER: "admin"                 # 管理员登录用户名
      PHOTOPRISM_ADMIN_PASSWORD: "insecure"          # 初始管理员密码（8-72个字符）
      PHOTOPRISM_AUTH_MODE: "password"               # 认证模式（public、password）
      PHOTOPRISM_SITE_URL: "http://localhost:2342/"  # 服务器URL，格式为"http(s)://domain.name(:port)/(path)"
      PHOTOPRISM_DISABLE_TLS: "false"                # 禁用HTTPS/TLS，即使站点URL以https://开头并且有可用证书
      PHOTOPRISM_DEFAULT_TLS: "true"                 # 如果没有其他证书可用，使用自签名的HTTPS/TLS证书作为默认
      PHOTOPRISM_ORIGINALS_LIMIT: 5000               # 原始文件的文件大小限制（MB）（增加以支持高分辨率视频）
      PHOTOPRISM_HTTP_COMPRESSION: "gzip"            # 提高传输速度和带宽利用率（none或gzip）
      PHOTOPRISM_LOG_LEVEL: "info"                   # 日志级别：trace、debug、info、warning、error、fatal或panic
      PHOTOPRISM_READONLY: "false"                   # 不要修改原始目录（功能受限）
      PHOTOPRISM_EXPERIMENTAL: "false"               # 启用实验性功能
      PHOTOPRISM_DISABLE_CHOWN: "false"              # 禁用启动时通过chmod和chown更新存储权限
      PHOTOPRISM_DISABLE_WEBDAV: "false"             # 禁用内置的WebDAV服务器
      PHOTOPRISM_DISABLE_SETTINGS: "false"           # 禁用设置界面和API
      PHOTOPRISM_DISABLE_TENSORFLOW: "false"         # 禁用所有依赖于TensorFlow的功能
      PHOTOPRISM_DISABLE_FACES: "false"              # 禁用人脸检测和识别（需要TensorFlow）
      PHOTOPRISM_DISABLE_CLASSIFICATION: "false"     # 禁用图像分类（需要TensorFlow）
      PHOTOPRISM_DISABLE_VECTORS: "false"            # 禁用矢量图形支持
      PHOTOPRISM_DISABLE_RAW: "false"                # 禁用原始图像的索引和转换
      PHOTOPRISM_RAW_PRESETS: "false"                # 在转换原始图像时启用应用用户预设（降低性能）
      PHOTOPRISM_JPEG_QUALITY: 85                    # 更高的值增加JPEG图像和缩略图的质量和文件大小（25-100）
      PHOTOPRISM_DETECT_NSFW: "false"                # 自动标记可能具有冒犯性的照片为私有（需要TensorFlow）
      PHOTOPRISM_UPLOAD_NSFW: "true"                 # 允许上传可能具有冒犯性的照片（无TensorFlow效果）
      # PHOTOPRISM_DATABASE_DRIVER: "sqlite"         # SQLite是一个嵌入式数据库，不需要服务器
      PHOTOPRISM_DATABASE_DRIVER: "mysql"            # 使用MariaDB 10.5+或MySQL 8+代替SQLite以获得更好的性能
      PHOTOPRISM_DATABASE_SERVER: "mariadb:3306"     # MariaDB或MySQL数据库服务器（主机名:端口）
      PHOTOPRISM_DATABASE_NAME: "photoprism"         # MariaDB或MySQL数据库模式名称
      PHOTOPRISM_DATABASE_USER: "photoprism"         # MariaDB或MySQL数据库用户名
      PHOTOPRISM_DATABASE_PASSWORD: "insecure"       # MariaDB或MySQL数据库用户密码
      PHOTOPRISM_SITE_CAPTION: "基于AI的照片应用"
      PHOTOPRISM_SITE_DESCRIPTION: ""                # 站点描述
      PHOTOPRISM_SITE_AUTHOR: ""                     # 站点作者
      ## 视频转码（https://docs.photoprism.app/getting-started/advanced/transcoding/）：
      # PHOTOPRISM_FFMPEG_ENCODER: "software"        # H.264/AVC编码器（software、intel、nvidia、apple、raspberry或vaapi）
      # PHOTOPRISM_FFMPEG_SIZE: "1920"               # 视频大小限制（像素）（720-7680）（默认值：3840）
      # PHOTOPRISM_FFMPEG_BITRATE: "32"              # 视频比特率限制（Mbit/s）（默认值：50）
      ## 第一次启动时运行/安装（选项：update https gpu tensorflow davfs clitools clean）：
      # PHOTOPRISM_INIT: "https gpu tensorflow"
      ## 在初始化之后以非root用户身份运行（支持的值：0、33、50-99、500-600和900-1200）：
      # PHOTOPRISM_UID: 1000
      # PHOTOPRISM_GID: 1000
      # PHOTOPRISM_UMASK: 0000
    ## 在初始化之前以非root用户身份启动（支持的值：0、33、50-99、500-600和900-1200）：
    # user: "1000:1000"
    ## 与FFmpeg和TensorFlow共享硬件设备（可选）：
    # devices:
    #  - "/dev/dri:/dev/dri"                         # Intel QSV
    #  - "/dev/nvidia0:/dev/nvidia0"                 # Nvidia CUDA
    #  - "/dev/nvidiactl:/dev/nvidiactl"
    #  - "/dev/nvidia-modeset:/dev/nvidia-modeset"
    #  - "/dev/nvidia-nvswitchctl:/dev/nvidia-nvswitchctl"
    #  - "/dev/nvidia-uvm:/dev/nvidia-uvm"
    #  - "/dev/nvidia-uvm-tools:/dev/nvidia-uvm-tools"
    #  - "/dev/video11:/dev/video11"                 # Video4Linux视频编码设备（h264_v4l2m2m）
    working_dir: "/photoprism" # 不要更改或删除
    ## 存储文件夹："~"是家目录的快捷方式，"."是当前目录的快捷方式
    volumes:
      # "/host/folder:/photoprism/folder"                # 示例
      - "~/Pictures:/photoprism/originals"               # 原始媒体文件（不要删除）
      # - "/example/family:/photoprism/originals/family" # 可以像这样挂载*其他*媒体文件夹
      # - "~/Import:/photoprism/import"                  # *可选*用于从原始文件夹导入文件的基本文件夹
      - "./storage:/photoprism/storage"                  # *可写*的存储文件夹，用于缓存、数据库和辅助文件（不要删除）

  ## 数据库服务器（推荐）
  ## 参见 https://docs.photoprism.app/getting-started/faq/#should-i-use-sqlite-mariadb-or-mysql
  mariadb:
    image: mariadb:10.11
    ## 如果MariaDB陷入重启循环，这可能是内存或文件系统问题：
    ## https://docs.photoprism.app/getting-started/troubleshooting/#fatal-server-errors
    restart: unless-stopped
    stop_grace_period: 5s
    security_opt: # 参见 https://github.com/MariaDB/mariadb-docker/issues/434#issuecomment-1136151239
      - seccomp:unconfined
      - apparmor:unconfined
    command: mariadbd --innodb-buffer-pool-size=512M --transaction-isolation=READ-COMMITTED --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci --max-connections=512 --innodb-rollback-on-timeout=OFF --innodb-lock-wait-timeout=120
    ## 永远不要将数据库文件存储在不可靠的设备上，如USB闪存驱动器、SD卡或共享网络文件夹上：
    volumes:
      - "./database:/var/lib/mysql" # 不要删除
    environment:
      MARIADB_AUTO_UPGRADE: "1"
      MARIADB_INITDB_SKIP_TZINFO: "1"
      MARIADB_DATABASE: "photoprism"
      MARIADB_USER: "photoprism"
      MARIADB_PASSWORD: "insecure"
      MARIADB_ROOT_PASSWORD: "insecure"

  ## Watchtower自动升级服务（可选）
  ## 参见 https://docs.photoprism.app/getting-started/updates/#watchtower
  ## 通过 "COMPOSE_PROFILES=update docker compose up -d" 激活
  watchtower:
    restart: unless-stopped
    image: containrrr/watchtower
    profiles: ["update"]
    environment:
      WATCHTOWER_CLEANUP: "true"
      WATCHTOWER_POLL_INTERVAL: 7200 # 每两小时检查更新
    volumes:
      - "/var/run/docker.sock:/var/run/docker.sock"
      - "~/.docker/config.json:/config.json" # 可选，用于身份验证，如果您有Docker Hub帐户
```



4. 修改docker-compose.yml文件后运行

```bash
docker-compose up -d
```

然后就能在浏览器中使用 ip:端口访问了

如果想要配置反向代理并通过域名访问，你需要提前解析域名，并在docker-compose配置文件中更改为你的域名，配置反向代理，你可以参考[Caddy的基础使用，下载Caddy并部署反向代理和自动签发, 续期SSL 证书](https://www.yunieebk.com/2023/07/30/caddy%E7%9A%84%E5%9F%BA%E7%A1%80%E4%BD%BF%E7%94%A8%EF%BC%8C%E4%B8%8B%E8%BD%BDcaddy%E5%B9%B6%E9%83%A8%E7%BD%B2%E5%8F%8D%E5%90%91%E4%BB%A3%E7%90%86%E5%92%8C%E8%87%AA%E5%8A%A8%E7%AD%BE%E5%8F%91-%E7%BB%AD%E6%9C%9Fssl-%E8%AF%81%E4%B9%A6/)

## 🐽后记

进入后台后可以设置中文并根据你的需要管理库和预览质量更改主题等，可以自行去探索。个人觉得界面还是比较简洁美观的。另外还支持webdav，就算是小硬盘也可以使用。
<InArticleAdsense
    data-ad-client="ca-pub-5818850638223663"
    data-ad-slot="1327307385">
</InArticleAdsense>
