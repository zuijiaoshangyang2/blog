---
title: 闲置VPS利用计划——Docker-compose搭建PrivateBin，一个加密的剪贴板
date: 2023-08-12T18:59:42+08:00
lastmod: 2023-08-13T18:59:42+08:00
tags: 
    - 🐘Linux
    - 🐋Docker
    - 💻闲置VPS利用计划
author: yuniee
summary: 加密的保护隐私的剪贴板。让你的分享更放心。
image: https://s2.loli.net/2023/08/16/kmBTW3Uh8be6SH4.png
---

# 闲置VPS利用计划——Docker-compose搭建PrivateBin，一个加密的剪贴板

## 💬前言

有时候想分享一段代码或者一些想要分享一些文字并对隐私希望有所保护，便可以试试这个PrivateBin。让我们更加放心的分享。

## 🌳项目介绍

根据官方的介绍，PrivateBin是一个极简主义的开源在线粘贴板，服务器对已粘贴数据一无所知。数据在浏览器中使用256位AES算法和Galois Counter模式进行加密和解密。

- 作为服务器管理员，您不必担心用户发布的内容在您所在国家被视为非法。您对过去的任何粘贴内容都有合理否认权。如果需要或要求，您可以从系统中删除任何粘贴。。

- 类似Pastebin的系统用于存储文本文档、代码示例等。数据发送到服务器时进行加密。

- 发送到服务器的数据加密。

- 可以设置一个密码来阅读粘贴内容。这进一步保护了粘贴内容，并防止没有密码的人能够通过链接读取它。

  此外，它还支持markdown语法，使用起来还是很方便的。

下面是项目的截图

![2023-08-16 211935.png](https://s2.loli.net/2023/08/16/Biw3Jc2dXWYMPbL.png)

该项目官网：[https://privatebin.info/](https://privatebin.info/)

该项目的GitHub地址：[https://github.com/PrivateBin/PrivateBin](https://github.com/PrivateBin/PrivateBin)

参考官方docker配置：[https://github.com/PrivateBin/PrivateBin/wiki/Docker](https://github.com/PrivateBin/PrivateBin/wiki/Docker)

## 🏠开始搭建

因为本人觉得docker-compose使用起来更便捷，更舒服，所以根据官方docker配置，修改成了docker-compose文件。

1. 更新系统

   ```bash
   apt update -y && apt upgrade -y
   ```

2. 安装必要工具

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
### 🔪安装
1. 新建文件夹

   ```bash
   mkdir -p /opt/privatebin/data  /opt/privatebin/config
   ```

2. 修改文件夹权限
   ```bash
   chmod 777 /opt/privatebin/data
   ```

3. 下载配置文件

   ```bash
   wget -O /opt/privatebin/config/conf.sample.php               https://raw.githubusercontent.com/PrivateBin/PrivateBin/master/cfg/conf.sample.php
   ```

4. 然后将示例配置文件复制一份,并重命名

    ```bash
    cp /opt/privatebin/config/conf.sample.php   opt/privatebin/config/conf.php
    ```

5. 进入文件夹

    ```bash
    cd /opt/privatebin
    ```

6. 创建一个docker-compose文件

    ```bash
    nano docker-compose.yml
    ```

7. 输入配置文件

    ```yaml
    version: '3'
    services:
      privatebin:
        image: privatebin/nginx-fpm-alpine
        container_name: privatebin
        restart: always
        environment:
          - PUID=1000
          - PGID=1000
        ports:
          - "8080:8080" #左边端口可以修改
        volumes:
          - /opt/privatebin/config/conf.php:/srv/cfg/conf.php:ro
          - /opt/privatebin/data:/srv/data
        read_only: true
    ```

8. 运行docker-compose

    ```bash
    docker-compose up -d
    ```

9. 测试是否成功

在浏览输入：http://ip:8080 (输入你自己修改的映射端口)

**注意！一定要配置https访问，否则无法正常使用**
    

## 📕后记
    
如果想要配置反向代理使用域名访问网页，请参考这篇文章： [Caddy的基础使用，下载Caddy并部署反向代理和自动签发, 续期SSL 证书](https://www.yuniee.de/2023/07/30/caddy%E7%9A%84%E5%9F%BA%E7%A1%80%E4%BD%BF%E7%94%A8%EF%BC%8C%E4%B8%8B%E8%BD%BDcaddy%E5%B9%B6%E9%83%A8%E7%BD%B2%E5%8F%8D%E5%90%91%E4%BB%A3%E7%90%86%E5%92%8C%E8%87%AA%E5%8A%A8%E7%AD%BE%E5%8F%91-%E7%BB%AD%E6%9C%9Fssl-%E8%AF%81%E4%B9%A6/)
    
在PrivateBin配置文件中配置yourls短链接请看这篇：[在PrivateBin中使用YOURLS短链接服务](https://www.yuniee.de/2023/08/13/%E5%9C%A8privatebin%E4%B8%AD%E4%BD%BF%E7%94%A8yourls%E7%9F%AD%E9%93%BE%E6%8E%A5%E6%9C%8D%E5%8A%A1/)
    

### 配置文件详解（仅供参考）
    
来源: [senra的博客](http://www.senra.me/deploy-your-private-online-clipboard-using-privatebin/)
    
```php
    ;<?php http_response_code(403); /*
    ; PrivateBin 配置文件
    ;
    ; 每个选项的解释可以参考 https://github.com/PrivateBin/PrivateBin/wiki/Configuration.
    ; 本配置由Senra翻译
     
    [main]
    ; (可选) 设置一个用于在网站上显示的项目名(网站名)
    ; name = "PrivateBin"
     
    ; 启用或禁用讨论功能(针对Paste内容留言讨论)，默认为true
    discussion = true
     
    ; 预选讨论功能(是否在创建新的Paste时默认勾选开启讨论)，默认为false
    opendiscussion = false
     
    ; 启用或禁用密码功能，默认为true
    password = true
     
    ; 启用或禁用文件上传功能，默认false
    fileupload = false
     
    ; (是否在创建新的Paste时默认勾选阅后即焚)，默认为false
    burnafterreadingselected = false
     
    ; 当启用了阅后即焚的Paste被第一次访问后马上进行删除，而不是等待一次成功的解密
    ; 按照说明，PrivateBin默认在你浏览器成功解密后才会使用js来做一个回调以便删除Paste，这个功能将无视你是否成功解密，直接进行删除
    instantburnafterreading = false
     
    ; 预选的默认显示模式(在创建新的Paste时默认选择的显示\渲染格式)，默认为"plaintext"(纯文本)
    ; 请确保这个值存在于[formatter_options]中
    defaultformatter = "plaintext"
     
    ; (可选) 设置一种代码高亮的主题，可以在 css/prettify/ 目录中查看
    ; syntaxhighlightingtheme = "sons-of-obsidian"
     
    ; 每个Paste或者评论留言的大小限制，单位为bytes，默认是2Mb
    sizelimit = 2097152
     
    ; 使用的模板，默认是"bootstrap" (tpl/bootstrap.php)
    template = "bootstrap"
     
    ; (可选) 显示的提示
    ; notice = "Note: This is a test service: Data may be deleted anytime. Kittens will die if you abuse this service."
     
    ; 默认情况下PrivateBin会根据用户的浏览器设置来猜测用户使用的语言，启用该选项将使得用户能够在菜单中选择语言
    ; 语言的选择记录会以session cookie的形式存储在你的浏览器中，保存到你的浏览器关闭之前
    languageselection = false
     
    ; 设置默认语言，默认为English
    ; 如果这个选项被设置了且上一个语言选择功能被关闭，则这将成为唯一的语言
    ; languagedefault = "en"
     
    ; (可选) 链接缩短程序的地址(API)，通过配置这个能在创建新的Paste时同时创建短链以方便使用
    ; 需要注意的是请选择可靠的或者是自建的短链，因为这会使得短链提供者能够获取你带有加密密钥的完整链接
    ; urlshortener = "https://shortener.example.com/api?link="
     
    ; (可选) 是用户能够一键生成一个用于分享Paste链接的二维码
    ; 这个会对你创建Paste以及浏览Paste的页面同时生效
    ; qrcode = true
     
    ; (可选) 使用基于IP的评论头像来区分一条评论是否是来自于一个使用了相同的用户名的不同用户是一个比较差劲的机制。
    ; 因为这种情况下如果服务器的salt泄露，可以通过为IP生成彩虹版的方式来碰撞获得所有非匿名的评论者的IP
    ; 这个选项可以被设置为 none / vizhash / identicon(默认)
    ; icon = none
     
    ; Content Security Policy(CSP)这个HTTP头允许网站限制什么内容可以在它的页面加载(用于防止插入恶意内容)
    ; 如果你修改模板来添加第三方域名的自定义脚本(比如追踪脚本或者使用了某些抗D服务)，你可能需要修改这个。
    ; 可以参考 https://content-security-policy.com/ 来配置
    ; 注意: 如果你使用bootstrap主题，你可以去除sandbox限制中的allow-popups
    ; cspheader = "default-src 'none'; manifest-src 'self'; connect-src *; form-action 'none'; script-src 'self'; style-src 'self'; font-src 'self'; img-src 'self' data:; referrer no-referrer; sandbox allow-same-origin allow-scripts allow-forms allow-popups"
     
    ; 和PrivateBin Alpha 0.19保持兼容，会导致降低一定的安全性
    ; 如果启用这项，将使用base64.js的1.7版本，而不是2.1.9版本，并且在HMAC中将使用sha1而不是sha256(用于生成删除Paste的token)
    zerobincompatibility = false
     
    [expire]
    ; 预选的过期时间(创建新的Paste时默认选择的过期时间)，请确保这个值存在于[expire_options]中
    default = "1week"
     
    ; (可选) 克隆按钮可以在过期的Pastes中关闭，但是请注意这只是隐藏了按钮，复制和粘贴还是可能的
    ; clone = false
     
    [expire_options]
    ; 为每个过期的时间段设置具体的秒数，0代表永不过期
    5min = 300
    10min = 600
    1hour = 3600
    1day = 86400
    1week = 604800
    ; 这个一个月只有30天，所以不算准确
    1month = 2592000
    1year = 31536000
    never = 0
     
    [formatter_options]
    ; 设置可选的格式(用于渲染和显示)，它们的顺序和标签
    plaintext = "Plain Text"
    syntaxhighlighting = "Source Code"
    markdown = "Markdown"
     
    [traffic]
    ; 同一个IP的访问频率限制，单位为秒，设为0代表禁用
    limit = 10
     
    ; (可选) 如果你的网站运行在一个反代或者负载均衡之后，设置包含用户IP的HTTP头可以将用户正确的IP传递给程序
    ; header = "X_FORWARDED_FOR"
     
    ; 存储访问频率限制的目录
    dir = PATH "data"
     
    [purge]
    ; 清除过期Paste的最小时间间隔，清除只会在创建Paste的时候触发，设为0代表每次创建都进行清除
    limit = 300
     
    ; 清除过期Paste一次最多删除的Paste数量，设为0代表禁用清除。如果网站使用人数较多建议把这个值设置的稍微大点
    batchsize = 10
     
    ; 存储清除频率限制的目录
    dir = PATH "data"
     
    [model]
    ; 加载的模型类(指定了把数据存哪)，以及存储用的目录
    ; 默认的模型"Filesystem"(文件系统)将所有数据都直接存储在文件中
    class = Filesystem
    [model_options]
    dir = PATH "data"
     
    ;[model]
    ; 使用MySQL存储的配置示例
    ;class = Database
    ;[model_options]
    ;dsn = "mysql:host=localhost;dbname=privatebin;charset=UTF8"
    ;tbl = "privatebin_" ; table prefix
    ;usr = "privatebin"
    ;pwd = "Z3r0P4ss"
    ;opt[12] = true ; PDO::ATTR_PERSISTENT
     
    ;[model]
    ; 使用SQLite存储的配置示例
    ;class = Database
    ;[model_options]
    ;dsn = "sqlite:" PATH "data/db.sq3"
    ;usr = null
    ;pwd = null
    ;opt[12] = true ; PDO::ATTR_PERSISTENT
    ;[model]
    ; PostgreSQL数据库配置示例
    ;class = Database
    ;[model_options]
    ;dsn = "pgsql:host=localhost;dbname=privatebin"
    ;tbl = "privatebin_" ; 表前缀
    ;usr = "privatebin"
    ;pwd = "Z3r0P4ss"
    ;opt[12] = true ; PDO::ATTR_PERSISTENT
    
    ;[model]
    ; Rados网关/CEPH的S3配置示例
    ;class = S3Storage
    ;[model_options]
    ;region = ""
    ;version = "2006-03-01"
    ;endpoint = "https://s3.my-ceph.invalid"
    ;use_path_style_endpoint = true
    ;bucket = "my-bucket"
    ;accesskey = "my-rados-user"
    ;secretkey = "my-rados-pass"
    
    ;[model]
    ; AWS的S3配置示例
    ;class = S3Storage
    ;[model_options]
    ;region = "eu-central-1"
    ;version = "latest"
    ;bucket = "my-bucket"
    ;accesskey = "access key id"
    ;secretkey = "secret access key"
    
    ;[model]
    ; 使用AWS的SDK默认凭据提供程序的AWS的S3配置示例
    ; 如果依赖于环境变量，AWS SDK将查找以下内容：
    ; - AWS_ACCESS_KEY_ID
    ; - AWS_SECRET_ACCESS_KEY
    ; - AWS_SESSION_TOKEN（如果需要）
    ; 有关详细信息，请参阅https://docs.aws.amazon.com/sdk-for-php/v3/developer-guide/guide_credentials.html#default-credential-chain
    ;class = S3Storage
    ;[model_options]
    ;region = "eu-central-1"
    ;version = "latest"
    ;bucket = "my-bucket"
    
    [yourls]
    ; 当使用YOURLS作为"urlshortener"配置项时：
    ; - 默认情况下，"urlshortener"将指向YOURLS API URL，带有或不带有凭据，并且将在PrivateBin网页上公开显示。
    ; 只有在允许无凭据创建短URL时才使用此选项。
    ; - 或者，使用此部分中的参数（"signature"和"apiurl"），"urlshortener"需要指向您的PrivateBin实例的基本URL，并附加"shortenviayourls?link="。例如：
    ; urlshortener = "${basepath}shortenviayourls?link="
    ; 然后，此URL将在服务器端调用YOURLS，使用来自"apiurl"的URL和来自下面的"signature"参数的"access signature"。
    
    ; （可选）YOURLS为使用帐户颁发的"signature"（访问密钥）
    ; signature = ""
    ; （可选）YOURLS API的URL，用于缩短PrivateBin URL
    ; apiurl = "https://yourls.example.com/yourls-api.php"
    
```


​    
