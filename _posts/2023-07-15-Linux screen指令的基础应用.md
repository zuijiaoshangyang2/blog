---
title: Linux screen指令的基础应用
date: 2023-07-15T18:57:42+08:00
lastmod: CST，China Standard Time
tags: 
    - 🐘Linux
    - 🍌screen
author: yuniee
summary: 在Linux远程运行中非常有用
image: https://s2.loli.net/2023/06/19/qOhLfRHbU6IuBkD.png
---

> 一个防止小鸡ssh断连导致任务中断的神器

# 为什么需要screen指令？
当购买的vps网络不好，或者本地网络不稳定时，通过ssh连接总是出现断连的情况，这时当你运行一个重要的任务时突然中断，这让人很抓狂，或者当你用vps传输数据时或者备份时，突然中断，就前功尽弃了，更严重者会丢失数据。又或者你有一个任务想让他人和你一起编辑，利用screen指令就可以和别人一起共享同一个会话了。

## 检查screen命令的安装
有些vps的系统一开始并不自带screen指令，所以在使用之前你需要检查一下你的系统里是否已经安装了screen指令

使用以下命令检查

```bash
screen -v
```
当出现以下情况时就说明你已经安装了screen
![屏幕截图 2023-06-09 180932.png](https://s2.loli.net/2023/06/19/6ke5zuvj3pLICdl.png)



如果你还没有安装screen，可输入以下命令安装

-  Debian/Ubuntu

```bash
apt install screen -y
```
- CentOS/RedHat/Fedora
```bash
yum install screen -y
```
## screen的基础使用
>这里我们将要使用的只是简单的使用方法

- **新建一个screen会话**
```bash
screen -S 自定义名称
```
由此我们建立了一个screen会话,并且你已经进入了新的screen会话。

- **查看我们刚才新建的screen会话**

使用

```bash
screen -ls
```
查看

你会看见如下图结果
![屏幕截图 2023-06-09 195708.png](https://s2.loli.net/2023/06/19/tRKDgCBHwo9XfOM.png)

很明显，我在这里创建了一个名为aaa的会话。

- **detach，暂时离开当前会话，使其后台运行**


当你的任务已经在运行中，并且你还想运行别的命令，又或者你需要断开ssh使工作后台运行你可以使用`ctrl+a+d`使其detach,当然你也可以使用``screen -d aaa``使其detach。

- **回到刚才的screen会话**


要想回到刚才的screen会话，我们使用
```bash
screen -r aaa
```
然后我们就回到了刚才的会话


- **删除新建的screen会话**


当你的任务结束了，你想删除刚才新建的会话，你可以首先再次使用`ctrl+a+d`，然后再次使用`screen -ls`查看你的会话名称或者会话的编号

比如我们上面创建的screen会话，我们可以使用以下命令删除
```bash
screen -X -S aaa quit
```
或者

```bash
screen -X -S 212612 quit
```
## 其它参数
经过以上操作，我们已经掌握了screen的最简单的用法，下面是一些其它参数
- A 　将所有的视窗都调整为目前终端机的大小。
- d <作业名称> 　将指定的screen作业离线。
- h <行数> 　指定视窗的缓冲区行数。
- m 　即使目前已在作业中的screen作业，仍强制建立新的screen作业。
- r <作业名称> 　恢复离线的screen作业。
- R 　先试图恢复离线的作业。若找不到离线的作业，即建立新的screen作业。
- s 　指定建立新视窗时，所要执行的shell。
- S <作业名称> 　指定screen作业的名称。
- v 　显示版本信息。
- x 　恢复之前离线的screen作业。
- ls或--list 　显示目前所有的screen作业。
- wipe 　检查目前所有的screen作业，并删除已经无法使用的screen作业。
## 总结
以上就是使用screen的最最基础方法，如果你感兴趣可以去深入研究，但对很多人来说已经足够了，希望这能帮到大家。
