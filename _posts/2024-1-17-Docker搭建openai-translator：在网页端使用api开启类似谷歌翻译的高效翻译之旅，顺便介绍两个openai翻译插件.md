---
title: Docker搭建openai-translator：在网页端使用chatgpt的api开启类似谷歌翻译的高效翻译之旅，顺便介绍两个openai翻译插件
permalink: /openai_translator
date: 2024-1-17T10:57:42+08:00
lastmod: 2024-1-17T19:57:42+08:00
tags: 
    - 🐘Linux
    - 💻闲置VPS利用计划
    - 🐋Docker
author: yuniee
summary: 想要在各个客户随时随地打开网页来翻译，并且想要利用chatgpt的强大的语言能力来帮你更准确自然的翻译，试试自托管一个网页翻译器。并且还有几个有意思的翻译插件值得了解一下。
image: https://s2.loli.net/2024/01/17/7hXwqL8GBdrlRCo.jpg
---

# Docker搭建openai-translator：在网页端使用chatgpt的api开启类似谷歌翻译的高效翻译之旅，顺便介绍两个openai翻译插件

<InArticleAdsense
    data-ad-client="ca-pub-5818850638223663"
    data-ad-slot="1327307385">
</InArticleAdsense>



## 🐙前言

以前在和外国人交流或者翻译各种语言的单词或句子时就会使用Google translator，或者是deepl，之前deepl的确是很神的，翻译效果很好，但最近表现一般，尤其是chatgpt出来之后，其翻译能力对待以前的翻译软件可以称得上是降维打击。所以我们想要ai翻译软件。但由于ai热度很高，所以无论是谷歌商店还是其他地方都出现了一大把蹭热度的假ai翻译软件，或者需要收取远高于成本的费用。购买别人注册的一个api key仅仅几块钱，自己注册更是便宜。况且还有不良林大佬分享的免费获取api key的方法([不良林的Youtube视频](https://youtu.be/yndqfXr_qPg?si=6cOqlN9kgdr-ddYG))。



**为什么不用[ChatGPT-Next-Web](https://github.com/ChatGPTNextWeb/ChatGPT-Next-Web)？**          的确，这个很方便，但是经常在设置好prompt后，把附带历史消息数设置的很高也没几句就开始不翻译了，变成开始回答了。官网的由于访问地区限制，非常不方便随时使用以及任何人都能使用。

## 🦬搭建openai-translator网页

### 😸介绍

GitHub地址：https://github.com/LanceMoe/openai-translator

安卓的谷歌浏览器可以将网页安装在桌面上，就像一个应用，这样可以快捷打开，极为方便，直接替代了我的其他翻译软件。



**图片展示：**

![屏幕截图 2024-01-17 113805.png](https://s2.loli.net/2024/01/17/n2fDZbemAQk5hdP.png)



![屏幕截图 2024-01-17 114037.png](https://s2.loli.net/2024/01/17/xiUndzsIhaZ5LDC.png)



![屏幕截图 2024-01-17 114149.png](https://s2.loli.net/2024/01/17/XFVzA1Hsqi6ZkyG.png)



![屏幕截图 2024-01-17 114300.png](https://s2.loli.net/2024/01/17/5tsDSbBI3eRANJQ.png)



![屏幕截图 2024-01-17 114424.png](https://s2.loli.net/2024/01/17/xbuVe4tJ7ZQpMNn.png)

### 🐼搭建方式

> 有使用pnpm搭建的方式，可以在GitHub中看到教程，因为我主要是为了介绍这个web应用，所有采用同样是官方提供的docker搭建方式

#### 😇准备工作

更新系统，我使用的是Debian11系统（Ubuntu同理）

```bash
apt update -y && apt upgrade -y
```

安装必要工具

```bash
apt install wget curl sudo nano git  -y
```

#### 🚪搭建

首先切换到一个目录(按照自己喜好，方便管理)

```bash
cd /opt
```

克隆源码：

```bash
git clone https://github.com/LanceMoe/openai-translator.git
```

切换到源码目录

```bash
cd /opt/openai-translator
```

构建docker镜像

```bash
docker build -t openai-translator-web .
```

> 一定要注意末尾有个‘”. “，末尾的 “ . ” 表示当前目录。

然后启动docker容器（**可以修改冒号左边的端口来自定义监听哪个端口，即浏览器打开网页的端口**）

```bash
docker run -d --restart=always -p 3000:80 openai-translator-web
```

> 添加了`-d`表示以守护进程模式运行容器，使容器在后台运行。 `--restart=always` 表示容器在退出后将始终自动重新启动

然后在浏览器使用 `IP:端口`的方式打开网页，例如按照上面我可以使用`ip:3000`。

如果想要配置反向代理使用域名打开，可参考：[Caddy的基础使用](https://yunieebk.com/2023/07/30/caddy%E7%9A%84%E5%9F%BA%E7%A1%80%E4%BD%BF%E7%94%A8%EF%BC%8C%E4%B8%8B%E8%BD%BDcaddy%E5%B9%B6%E9%83%A8%E7%BD%B2%E5%8F%8D%E5%90%91%E4%BB%A3%E7%90%86%E5%92%8C%E8%87%AA%E5%8A%A8%E7%AD%BE%E5%8F%91-%E7%BB%AD%E6%9C%9Fssl-%E8%AF%81%E4%B9%A6/)



打开网页后在设置页面填写apikey并选择模型后即可使用，非常方便。但是在新浏览器使用或者新设备使用时需要再次填写apikey。

<InArticleAdsense
    data-ad-client="ca-pub-5818850638223663"
    data-ad-slot="1327307385">
</InArticleAdsense>



## 🐹介绍插件 openai-translator

这个和上面的那个虽然是同一个名字，但是没有关系，功能也不同，这个既有浏览器插件也有window和mac的应用程序。

GitHub：**[openai-translator](https://github.com/openai-translator/openai-translator)**

下载地址：[releases](https://github.com/openai-translator/openai-translator/releases)

可以去GitHub看看，介绍非常详细。浏览器插件虽然也很好用，但我主要想推荐的是windows和mac应用。配合桌面剪切板扩展使用才是这个应用的魅力所在。

Windows可以在微软商店安装 SnipDo这个剪切板扩展配合使用

Mac可以安装PopClip这个剪切板扩展配合使用

官方剪切板扩展使用介绍地址：[配合桌面剪切板扩展](https://github.com/openai-translator/openai-translator/blob/main/CLIP-EXTENSIONS.md)



安装并配置桌面剪切板扩展之后就可以在包括浏览器以内的任何你可以选中的位置翻译那里的文字，非常方便。

**官方演示**

![gif](https://user-images.githubusercontent.com/1206493/240358161-2788eb97-d00b-4808-aa86-a7fcfe3f71dd.gif)



**个人使用演示**

![屏幕截图 2024-01-17 130456.png](https://s2.loli.net/2024/01/17/KrBtXWhRgP2opSE.png)





## 🦔介绍插件：沉浸式翻译

chrome应用商店地址：[沉浸式翻译](https://chromewebstore.google.com/detail/%E6%B2%89%E6%B5%B8%E5%BC%8F%E7%BF%BB%E8%AF%91-%E5%8F%8C%E8%AF%AD%E5%AF%B9%E7%85%A7%E7%BD%91%E9%A1%B5%E7%BF%BB%E8%AF%91-pdf%E6%96%87%E6%A1%A3%E7%BF%BB%E8%AF%91/bpoadfkcbjbfhfodiogcnhhhpibjhbnh?pli=1)

个人觉得这个插件比起上面介绍的应用更适合浏览器使用，但上面那个的主要优点是能在任何可以选中的地方使用，包括跨浏览器和浏览器之外。

这个插件的优点是可以使用各种翻译服务：

![屏幕截图 2024-01-17 122523.png](https://s2.loli.net/2024/01/17/Tt75hXJkZipfP3s.png)

如果我们自己提供apikey就无需登录，并且在这里可以使用Gemini的apikey，**推荐使用Gemini的apikey**，因为Gemini单次使用限额更多，使用openai的apikey来翻译整个网页时由于文字太多会提示达到单次使用限额而翻译视失败，所以如果想要使用openai的key需要划段翻译，**然而也推荐划段翻译，因为翻译更快，避免翻译整个网页中不需要翻译的地方浪费大量时间和api token。**



只需要设置这里：

![屏幕截图 2024-01-17 123316.png](https://s2.loli.net/2024/01/17/qwRuxMFzK4ZJbyW.png)

像这样选中之后按动触发键就可以翻译指定的段落或句子

![屏幕截图 2024-01-17 123504.png](https://s2.loli.net/2024/01/17/lpMOQiEGfc82FJ9.png)

**翻译后的效果非常惊艳，这也是为什么我要推荐的原因之一，翻译的结果是以双语的形式出现的，有时候翻译的结果比较奇怪时可以根据原文自己翻译成准确的意思**

![屏幕截图 2024-01-17 123640.png](https://s2.loli.net/2024/01/17/CxXYfd59vqBerFa.png)



**另一个我非常推荐的原因是可以翻译YouTube的外语字幕，虽然网上也有很多YouTube字幕翻译软件，但是那翻译的结果完全处于不可读的状态，尤其是非英语的外语。而openai和germini无疑要强很多，我个人尝试过后觉得完全可以根据翻译后的字幕来观看视频并准确理解。并且同样是提供双语字幕，非常方便自己对比。**



只需点击插件即可翻译

![屏幕截图 2024-01-17 124430.png](https://s2.loli.net/2024/01/17/5VYi61T7WcDd4Gf.png)

翻译后的效果：

![屏幕截图 2024-01-17 124701.png](https://s2.loli.net/2024/01/17/u9YFbBxVwqn7jUr.png)



**❗当然视频翻译的缺点还有很多，字幕翻译的逻辑是将整个视频的所有字幕完全翻译之后再显示，这需要花费非常非常多的时间，比较长的视频，或者话比较多的视频就非常不适合这个，就算是二三十分钟的视频也得等几分钟才能翻译成功。同时，因为这个全部翻译后再显示的特性，openai的apikey不可使用，因为需要翻译的字数太多了，一定要要使用Germini pro的免费apikey，翻译效果也非常棒。**

如果能够多线程翻译，翻译一小段就显示一小段，这样交互就会感觉好很多，并且也可也减少token的浪费。



## 🗝️api key获取

Openai api key获取地址：[openai apikey](https://platform.openai.com/api-keys)

Germini pro api key获取地址：[Germini pro api key](https://makersuite.google.com/app/apikey)    （个人使用免费也够用）



## 🤑总结

我平时将这三样一起使用，介绍的第一个用于手机翻译，第二个用于浏览器之外的翻译，或者在某个软件内翻译，不需要再复制粘贴打开浏览器翻译了，只需要点击一下就可以弹出翻译窗口。第三个就用来浏览器内沉浸式翻译以及YouTube视频翻译。综合使用起来翻译体验非常好。

<InArticleAdsense
    data-ad-client="ca-pub-5818850638223663"
    data-ad-slot="1327307385">
</InArticleAdsense>
