---
title: 在PrivateBin中使用YOURLS短链接服务
date: 2023-08-13T18:57:42+08:00
lastmod: CST，China Standard Time
tags: 
    - 🐘Linux
author: yuniee
summary: 让PrivateBin的链接看起来更简短。
image: 
  path: https://s2.loli.net/2023/08/17/iCDt3UMnW8HT4FK.png
---

# 在PrivateBin中使用YOURLS短链接服务

## 🖊前言

我们之前搭建了一个PrivateBin这个加密剪贴板服务，但保存后生成的链接往往太长了，看起来太复杂，就像是这样：

![lianjie.png](https://s2.loli.net/2023/08/17/I3b5PEnjJtgfAK8.png)



暂时我们还是没有上面的那个`缩短链接`按钮，接下来我们就来配置，使之出现这个按钮来缩短链接。

## 🪲获取YOURLS 的signature token

YOURLS关于signature token的介绍是： YOURLS允许使用老方法进行API调用，即使用`username`和`password`参数。 如果你担心这有潜在的风险，你也可以不使用你的用户名或密码进行API调用，而使用一个 secret signature token。

所以选择signature token是个更安全的选项。

获取signature token方法如下：



打开你的YOURLS管理界面的网页，点击上方菜单中的`工具`选项，然后滑到界面底部就能看见`安全的API调用`一栏，在那里就写着：

你的 secret signature token：**XXXXX** （请保存好，勿泄露）。然后复制**XXXXX**的内容。

## 👾修改PrivateBin配置文件

官方已经给出了使用yourls等短链接服务的方法：[链接](https://github.com/PrivateBin/PrivateBin/wiki/Configuration#urlshortener)

下面我们按照这个来配置

-  YOURLS内配置

首先官方文档内说如果您选择自托管解决方案，您必须启用CORS支持。以Nginx为例，可以通过在YOURLS的Nginx配置文件中设置PHP相关字段的头部来实现：

```php
location ~ \.php$ {
    add_header Access-Control-Allow-Origin "https://your.privatebin.domain" always;
}
```

这在YOURLS配置，比如宝塔面板内的`URL rewrite`

- PrivateBin配置

我的PrivateBin目录地址为`/opt/PrivateBin`

所以我输入以下命令打开配置文件

```bash
vim /opt/PrivateBin/config/conf.php
```

我们可以在里面找到这样一段配置：

```php
; (optional) URL shortener address to offer after a new paste is created.
; It is suggested to only use this with self-hosted shorteners as this will leak
; the pastes encryption key.
; urlshortener = "https://shortener.example.com/api?link="
```



我们要删除urlshortener前面的 ";" 使这个配置生效，然后将引号内的内容改为`${basepath}shortenviayourls?link=`

就像这样：

```php
; (optional) URL shortener address to offer after a new paste is created.
; It is suggested to only use this with self-hosted shorteners as this will leak
; the pastes encryption key.
urlshortener = "${basepath}shortenviayourls?link="
```

然后翻到配置文件最底部有如下段落:

```php
[yourls]
; When using YOURLS as a "urlshortener" config item:
; - By default, "urlshortener" will point to the YOURLS API URL, with or without
;   credentials, and will be visible in public on the PrivateBin web page.
;   Only use this if you allow short URL creation without credentials.
; - Alternatively, using the parameters in this section ("signature" and
;   "apiurl"), "urlshortener" needs to point to the base URL of your PrivateBin
;   instance with "shortenviayourls?link=" appended. For example:
;   urlshortener = "${basepath}shortenviayourls?link="
;   This URL will in turn call YOURLS on the server side, using the URL from
;   "apiurl" and the "access signature" from the "signature" parameters below.

; (optional) the "signature" (access key) issued by YOURLS for the using account
; signature = ""
; (optional) the URL of the YOURLS API, called to shorten a PrivateBin URL
; apiurl = "https://yourls.example.com/yourls-api.php"
```

我们要修改的是最后一段的`signature`和`apiurl`，同样的，删除前面的  ";"  然后填入你的`signature`和`apiurl`

`signature `：刚刚我们已经在YOURLS管理面板获取

`apiurl`  ：https://你的yourls地址/yourls-api.php

修改后如下：

```php
[yourls]
; When using YOURLS as a "urlshortener" config item:
; - By default, "urlshortener" will point to the YOURLS API URL, with or without
;   credentials, and will be visible in public on the PrivateBin web page.
;   Only use this if you allow short URL creation without credentials.
; - Alternatively, using the parameters in this section ("signature" and
;   "apiurl"), "urlshortener" needs to point to the base URL of your PrivateBin
;   instance with "shortenviayourls?link=" appended. For example:
urlshortener = "${basepath}shortenviayourls?link="
;   This URL will in turn call YOURLS on the server side, using the URL from
;   "apiurl" and the "access signature" from the "signature" parameters below.

; (optional) the "signature" (access key) issued by YOURLS for the using account
signature = "XXXXXX"
; (optional) the URL of the YOURLS API, called to shorten a PrivateBin URL
apiurl = "https://example.com/yourls-api.php"
```

这样保存配置然后重启PrivateBin服务就可以生效了。因为我用的`docker-compose`安装（见   [闲置VPS利用计划——Docker-compose搭建PrivateBin，一个加密的剪贴板](https://www.yuniee.de/2023/08/12/%E9%97%B2%E7%BD%AEvps%E5%88%A9%E7%94%A8%E8%AE%A1%E5%88%92-docker-compose%E6%90%AD%E5%BB%BAprivatebin%EF%BC%8C%E4%B8%80%E4%B8%AA%E5%8A%A0%E5%AF%86%E7%9A%84%E5%89%AA%E8%B4%B4%E6%9D%BF/)），所以我在`docker-compose.yml`所在目录下直接运行`docker-compose down`然后`docker-compose up -d`

再次打开页面，在保存内容后你就能看见这个按钮了，点击后就直接变成了短链接，并且在你的YOURLS里有记录了。

## 总结

使用缩短链接后分享给别人也会更美观一些，我认为配置这个还是有必要的。
