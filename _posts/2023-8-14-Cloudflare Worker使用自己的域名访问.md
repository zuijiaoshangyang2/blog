---
title: Cloudflare Worker使用自己的域名访问
date: 2023-08-14T18:57:42+08:00
lastmod: CST，China Standard Time
tags: 
    - 🔗域名
    - ☁Cloudflare
author: yuniee
summary: 使用自己的域名访问Cloudflare Worker，让访问更优雅
image: 
  path: /photos/worker.png
---

# Cloudflare Worker使用自己的域名访问





## 🐽前言

Cloudflare Workers是Cloudflare提供的一项边缘计算服务。它允许开发人员在全球分布的Cloudflare边缘服务器上运行和扩展自定义代码，以处理网络请求并改变网站或应用程序的行为。

使用Cloudflare Workers，开发人员可以编写JavaScript代码，该代码在离用户最近的Cloudflare边缘节点上执行，而不是在传统的中心化服务器上执行。这意味着代码可以更快地响应请求，减少延迟，并提高用户体验。

我们通过Workers可以搭建各种网站，但workers分配给我们的域名通常很长，例如：XXX.XXX.workers.dev 。这让人很难记忆并且因为太长了，所以看起来不美观。所以我们要绑定自己的域名。



## 🐉注意事项

1. 你需要有一个域名

2. 你的域名必须托管在Cloudflare里面

3. 你的域名要开启cdn，即启用cdn代理（打开小黄云）如下图所示：

   ​    ![worker2.png](https://s2.loli.net/2023/08/19/nSKaUiz7r3HlDFW.png)

4. 添加子域名的时候可以随便添加任何的一个ip，这里不影响。

## 🐅 自定义域名关联Worker



首先点击左侧菜单栏中的`Workers路由`，然后点击添加路由



![worker1.png](https://s2.loli.net/2023/08/19/7EQSlvTDFbByc56.png)

然后 

1. 里面填入``你刚刚创建的子域名/*``
2. 选择你想关联的worker
3. 点击保存

![worker3.png](https://s2.loli.net/2023/08/19/S6lMLgYv5NbamRx.png)

4. 在浏览器中输入你的域名，看是否关联成功。



## 🐂总结

自定义域名关联Worker还是非常简单的，关联域名后访问worker项目更加方便。
