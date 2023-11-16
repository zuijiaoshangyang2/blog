---
title: 闲置VPS利用——Docker compose搭建一个QD面板(签到面板),让签到完全自动化
date: 2023-08-18T18:57:42+08:00
lastmod: 2023-08-19T20:57:42+08:00
tags: 
    - 🐘Linux
    - 🐋Docker
    - 💻闲置VPS利用计划
author: yuniee
summary: 搭建一个QD面板(签到面板),可实现阿里云盘,Nodeseek,hostloc,网易云等众多站点自动签到，以及PT站自动签到及保号。
image: https://s2.loli.net/2023/08/22/chwLGvQdjgbNymZ.png
---

# 闲置VPS利用——Docker compose搭建一个QD面板(签到面板),让签到完全自动化
<InArticleAdsense
    data-ad-client="ca-pub-5818850638223663"
    data-ad-slot="1327307385">
</InArticleAdsense>

## 🪱前言

在很多网站注册账号后都会有签到功能，有的网站需要签到升级，或者签到给奖励，还有的网站必须登录保号，否则账号就会被收回，手里这么多站点，每天签到一遍会花费很多时间，并且保不准哪天就忘记了断签了。所以一个自动签到面板将他们集合在一起自动签到，还是非常方便管理的。尤其是PT站点，那么多每天都要签到，实在太麻烦了。所幸这些在QD面板里都有别人写好的签到模板。QD 是 一个 基于 HAR 编辑器和 Tornado 服务端的 HTTP 定时任务自动执行 Web 框架。

### 😶‍🌫️特性

- 基于Har: 仅需上传通过抓包得到的 Har, 即可制作框架所需的 HTTP 任务模板。
- Tornado 服务端: 使用 Tornado 作为服务端, 以实现异步响应前端和发起 HTTP 请求。
- API & 插件支持: 内置多种 API 和过滤器用于模板制作, 后续将提供自定义插件支持。
- 开源: QD 是一个基于 MIT 许可证的开源项目。

### 👹优点

- 配置简单，只需要填写账号密码或者获取cookie就可以签到。
- 模板众多，公共模板非常多，覆盖的网站很广。
- 功能强大，支持失败后再次尝试，可自定义再次尝试的次数以及时间间隔，以及自定义时间每次随机签到的偏差范围。
- 管理方便，显示成功失败次数以及签到日志，什么错误一看便知。还可以分组管理。

### 🤳项目展示

官方文档地址: [官方文档](https://qd-today.github.io/qd/zh_CN/)

项目GitHub地址：[GitHub](https://github.com/qd-today/qd)

Gitlab地址：[Gitlab](https://gitee.com/qd-today/qd)

DockerHub网址：[DockerHub](https://hub.docker.com/r/qdtoday/qd)

## 🦈开始搭建

### 🦉准备工作

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

### 🐉部署项目

我打算将项目的文件和配置文件放到`/opt`目录下,所以首先创建目录：

```bash
mkdir -p /opt/qd/config && cd /opt/qd
```

然后下载docker-compose文件

```bash
wget https://fastly.jsdelivr.net/gh/qd-today/qd@master/docker-compose.yml
```

接下来使用vi，vim或nano等编辑器打开，我使用vim编辑器：

```bash
vim docker-compose.yml
```

打开后配置文件如下：

```yaml
version: "3"

services:
  qd:
    image: qdtoday/qd:latest
    # image: qdtoday/qd:lite-latest # 精简版
    # image: qdtoday/qd:dev # 开发版
    container_name: qd
    depends_on:
      - redis
    ports:
      - "8923:80" # 可将左侧端口修改为未占用端口
    volumes:
      - "./config:/usr/src/app/config"
    environment:
      # - QD_DEBUG=False
      # - BIND=0.0.0.0
      # - PORT=80
      # - MULTI_PROCESS=False
      # - AUTO_RELOAD=False
      # - GZIP=True
      # - ACCESS_LOG=True
      # - DISPLAY_IMPORT_WARNING=True
      # - USER0ISADMIN=True
      # - STATIC_URL_PREFIX=/static/
      - DOMAIN=
      # - COOKIE_DAY=5
      # - COOKIE_SECURE_MODE=False
      - COOKIE_SECRET=binux
      - PBKDF2_ITERATIONS=400
      - AES_KEY=binux
      # - DB_TYPE=sqlite3
      # - JAWSDB_MARIA_URL=mysql://user:pass@localhost:3306/dbname?auth_plugin=
      # - QD_SQL_LOGGING_NAME=QD.sql
      # - QD_SQL_LOGGING_LEVEL=WARNING
      # - QD_SQL_POOL_LOGGING_NAME=QD.sql.pool
      # - QD_SQL_POOL_LOGGING_LEVEL=WARNING
      # - QD_SQL_POOL_SIZE=5
      # - QD_SQL_MAX_OVERFLOW=10
      # - QD_SQL_POOL_PRE_PING=True
      # - QD_SQL_POOL_RECYCLE=3600
      # - QD_SQL_POOL_TIMEOUT=30
      # - QD_SQL_POOL_USE_LIFO=True
      - REDISCLOUD_URL=redis://redis:6379
      # - REDIS_DB_INDEX=1
      # - QD_EVIL=1000
      # - EVIL_PASS_LAN_IP=True
      # - WORKER_METHOD=Queue
      # - QUEUE_NUM=50
      # - CHECK_TASK_LOOP=500
      # - TASK_MAX_RETRY_COUNT=8
      # - NEW_TASK_DELAY=1
      # - TASK_WHILE_LOOP_TIMEOUT=900
      # - TASK_REQUEST_LIMIT=1500
      # - DOWNLOAD_SIZE_LIMIT=5242880
      # - REQUEST_TIMEOUT=30.0
      # - CONNECT_TIMEOUT=30.0
      # - DELAY_MAX_TIMEOUT=29.9
      # - UNSAFE_EVAL_TIMEOUT=3.0
      # - USE_PYCURL=True
      # - ALLOW_RETRY=True
      # - DNS_SERVER=
      # - CURL_ENCODING=True
      # - CURL_CONTENT_LENGTH=True
      # - NOT_RETRY_CODE=301|302|303|304|305|307|400|401|403|404|405|407|408|409|410|412|415|413|414|500|501|502|503|504|599
      # - EMPTY_RETRY=True
      # - TRACEBACK_PRINT=False
      # - PUSH_PIC_URL=https://gitee.com/qd-today/qd/raw/master/web/static/img/push_pic.png
      # - PUSH_BATCH_SW=True
      # - PUSH_BATCH_DELTA=60
      # - WS_PING_INTERVAL=5
      # - WS_PING_TIMEOUT=30
      # - WS_MAX_MESSAGE_SIZE=10485760
      # - WS_MAX_QUEUE_SIZE=100
      # - WS_MAX_CONNECTIONS_SUBSCRIBE=30
      # - SUBSCRIBE_ACCELERATE_URL=jsdelivr_cdn
      # - PROXIES=
      # - PROXY_DIRECT_MODE=regexp
      # - PROXY_DIRECT=(?xi)\A([a-z][a-z0-9+\-.]*://)?(0(.0){3}|127(.0){2}.1|localhost|\[::([\d]+)?\])(:[0-9]+)?
      # - EXTRA_ONNX_NAME=
      # - EXTRA_CHARSETS_NAME=
      # - MAIL_SMTP=
      # - MAIL_PORT=465
      # - MAIL_SSL=True
      # - MAIL_USER=
      # - MAIL_PASSWORD=
      # - MAIL_FROM=${MAIL_USER}
      # - MAIL_DOMAIN_HTTPS=False
      # - MAILGUN_KEY=
      # - MAILGUN_DOMAIN=${DOMAIN}
      # - GA_KEY=

  redis:
    image: redis:alpine
    container_name: redis
    command: ["--loglevel warning"]
    # command: redis-server /usr/local/etc/redis/redis.conf
    volumes:
      # - ./redis/redis.conf:/usr/local/etc/redis/redis.conf:rw
      - ./redis/data:/data:rw

```

**如果不懂怎么自定义修改就只修改上方代码中我标注的可修改端口，或者直接不修改。当然你也可以自己参考一下[参考配置文件](#🦧参考的配置文件)**。

vi，vim编辑器下输入英文 `:` ，然后输入`wq`保存并退出。nano编辑器输入`ctrl+x`然后输入y保存退出

最后使用

```bash
docker-compose up -d
```

启动应用。



最后打开网页:

ip:端口（自己刚刚定义端口，如果未修改就使用8923）

### 👾反向代理
如果你觉得这样访问很不好看，想要配置反向代理然后使用自己的域名访问，请参考[Caddy的基础使用，下载Caddy并部署反向代理和自动签发, 续期SSL 证书](https://www.yunieebk.com/2023/07/30/caddy%E7%9A%84%E5%9F%BA%E7%A1%80%E4%BD%BF%E7%94%A8%EF%BC%8C%E4%B8%8B%E8%BD%BDcaddy%E5%B9%B6%E9%83%A8%E7%BD%B2%E5%8F%8D%E5%90%91%E4%BB%A3%E7%90%86%E5%92%8C%E8%87%AA%E5%8A%A8%E7%AD%BE%E5%8F%91-%E7%BB%AD%E6%9C%9Fssl-%E8%AF%81%E4%B9%A6/)


### 🪶后台配置

打开网页之后就是这样，然后点击右上角登录按钮

![屏幕截图 2023-08-22 221038.png](https://s2.loli.net/2023/08/22/rtANoc5GwxZedz7.png)



接下来创建账号，输入你想使用的邮箱和密码，然后点击下图中的注册按钮。



![qd.png](https://s2.loli.net/2023/08/22/YNXn3P5Km9jeyqs.png)



打开后的图像如下图所示：



![屏幕截图 2023-08-22 222320.png](https://s2.loli.net/2023/08/22/Gvu8RDfq7zmJNMo.png)



这样我们就成功搭建模板了，点击我的模板里面的公共模板然后你就能看见里面各种签到的模板了，签到模板有很多，也可以搜索一下更方便找到你想要的签到模板。对每个模板都有详细的使用方式，可以按照这个配置。



![无标题-2023-08-22-2234.png](https://s2.loli.net/2023/08/22/FDl3Zm8JLYEU5nd.png)



配置完模板之后就能在我的模板一栏看见了。然后在`我的任务`一栏，点击如下按钮：

![wdrw.png](https://s2.loli.net/2023/08/22/ayhTw6eNAQzYMqR.png)



然后按照弹出界面的提示信息，根据公共模板的备注/日志一栏中的获取这些参数的方法进行配置，然后自定义签到时间签到重试次数等，这些配置好了就可以自动签到了。当然也可也配置消息推送等功能，都可以在官方文档中找到并进行配置。

## 🧜‍♂️后记
### 👽第三方模板仓库
尽管公共模板已经很全面了但还有一些公共模板里没有的，比如Nodeseek，阿里云盘等，你可以去这里找找 : [[整理自用qiandao 框架可用的各种网站和App的Har 模板](https://github.com/wjf0214/qd-templates)]。
<InArticleAdsense
    data-ad-client="ca-pub-5818850638223663"
    data-ad-slot="1327307385">
</InArticleAdsense>

### 🦧参考的配置文件

|            变量名            | 是否必须 |                            默认值                            |                             说明                             |
| :--------------------------: | :------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
|             BIND             |    否    |                           0.0.0.0                            |                           监听地址                           |
|             PORT             |    否    |                             8923                             |                           监听端口                           |
|           QD_DEBUG           |    否    |                            False                             |                      是否启用Debug模式                       |
|        WORKER_METHOD         |    否    |                            Queue                             | 任务定时执行方式, 默认为 Queue, 可选 Queue 或 Batch, Batch 模式为旧版定时任务执行方式, 性能较弱, **建议仅当 Queue 定时执行模式失效时使用** |
|        MULTI_PROCESS         |    否    |                            False                             |         (实验性)是否启用多进程模式, Windows平台无效          |
|         AUTO_RELOAD          |    否    |                            False                             |         是否启用自动热加载, MULTI_PROCESS=True时无效         |
|      STATIC_URL_PREFIX       |    否    |                          `/static/`                          |                       静态文件URL前缀                        |
|            DOMAIN            |    否    |                              ''                              | 指定访问域名, **(建议修改)**, 否则通过邮件重置密码及邮箱推送等功能无效 |
|           AES_KEY            |    否    |                            binux                             |               AES加密密钥, **(强烈建议修改)**                |
|        COOKIE_SECRET         |    否    |                            binux                             |              cookie加密密钥, **(强烈建议修改)**              |
|          COOKIE_DAY          |    否    |                              5                               |                  Cookie在客户端中保留的天数                  |
|           DB_TYPE            |    否    |                           sqlite3                            |                 需要使用MySQL时设置为'mysql'                 |
|       JAWSDB_MARIA_URL       |    否    |                              ''                              | 需要使用MySQL时, 设置为 (mysql://用户名:密码@hostname:port/数据库名?auth_plugin=) |
|         QD_SQL_ECHO          |    否    |                            False                             | 是否启用 SQLAlchmey 的日志输出, 默认为 False, 设置为 True 时, 会在控制台输出 SQL 语句, 允许设置为 debug 以启用 debug 模式 |
|     QD_SQL_LOGGING_NAME      |    否    |                        QD.sql_engine                         |         SQLAlchmey 日志名称, 默认为 'QD.sql_engine'          |
|     QD_SQL_LOGGING_LEVEL     |    否    |                           Warning                            |            SQLAlchmey 日志级别, 默认为 'Warning'             |
|       QD_SQL_ECHO_POOL       |    否    |                             True                             | 是否启用 SQLAlchmey 的连接池日志输出, 默认为 True, 允许设置为 debug 以启用 debug 模式 |
|   QD_SQL_LOGGING_POOL_NAME   |    否    |                         QD.sql_pool                          |       SQLAlchmey 连接池日志名称, 默认为 'QD.sql_pool'        |
|  QD_SQL_LOGGING_POOL_LEVEL   |    否    |                           Warning                            |         SQLAlchmey 连接池日志级别, 默认为 'Warning'          |
|       QD_SQL_POOL_SIZE       |    否    |                              10                              |               SQLAlchmey 连接池大小, 默认为 10               |
|     QD_SQL_MAX_OVERFLOW      |    否    |                              50                              |             SQLAlchmey 连接池最大溢出, 默认为 50             |
|     QD_SQL_POOL_PRE_PING     |    否    |                             True                             |       是否在连接池获取连接前, 先ping一下, 默认为 True        |
|     QD_SQL_POOL_RECYCLE      |    否    |                             3600                             |            SQLAlchmey 连接池回收时间, 默认为 3600            |
|     QD_SQL_POOL_TIMEOUT      |    否    |                              60                              |             SQLAlchmey 连接池超时时间, 默认为 60             |
|     QD_SQL_POOL_USE_LIFO     |    否    |                             True                             |          SQLAlchmey 是否使用 LIFO 算法, 默认为 True          |
|        REDISCLOUD_URL        |    否    |                              ''                              | 需要使用Redis或RedisCloud时, 设置为 [http://rediscloud:密码@hostname:port](http://rediscloud:密码@hostname:port/) |
|        REDIS_DB_INDEX        |    否    |                              1                               |                           默认为1                            |
|           QD_EVIL            |    否    |                             500                              | (限Redis连接已开启)登录用户或IP在1小时内 分数 = 操作失败(如登录, 验证, 测试等操作)次数 * 相应惩罚分值 分数达到evil上限后自动封禁直至下一小时周期 |
|       EVIL_PASS_LAN_IP       |    否    |                             True                             |   是否关闭本机私有IP地址用户及Localhost_API请求的evil限制    |
|       TRACEBACK_PRINT        |    否    |                            False                             |      是否启用在控制台日志中打印Exception的TraceBack信息      |
|         PUSH_PIC_URL         |    否    | [push_pic.png](https://fastly.jsdelivr.net/gh/qd-today/qd@master/web/static/img/push_pic.png) | 默认为[push_pic.png](https://fastly.jsdelivr.net/gh/qd-today/qd@master/web/static/img/push_pic.png) |
|        PUSH_BATCH_SW         |    否    |                             True                             |         是否允许开启定期推送 QD 任务日志, 默认为True         |
|          MAIL_SMTP           |    否    |                              ""                              |                        邮箱SMTP服务器                        |
|          MAIL_PORT           |    否    |                             465                              |                      邮箱SMTP服务器端口                      |
|          MAIL_USER           |    否    |                              ""                              |                          邮箱用户名                          |
|        MAIL_PASSWORD         |    否    |                              ""                              |                           邮箱密码                           |
|          MAIL_FROM           |    否    |                          MAIL_USER                           |            发送时使用的邮箱，默认与MAIL_USER相同             |
|      MAIL_DOMAIN_HTTPS       |    否    |                            False                             | 发送的邮件链接启用HTTPS, 非框架前端使用HTTPS, 如果前端需要HTTPS, 请使用反向代理. |
|           PROXIES            |    否    |                              ""                              |                     全局代理域名列表,用"                     |
|      PROXY_DIRECT_MODE       |    否    |                              ""                              | 全局代理黑名单模式,默认不启用 "url"为网址匹配模式;"regexp"为正则表达式匹配模式 |
|         PROXY_DIRECT         |    否    |                              ""                              |                    全局代理黑名单匹配规则                    |
|        NEW_TASK_DELAY        |    否    |                              1                               |           新建任务后准备时间, 单位为秒, 默认为1秒            |
|   TASK_WHILE_LOOP_TIMEOUT    |    否    |                             900                              | 任务运行中单个 While 循环最大运行时间, 单位为秒, 默认为 15 分钟 |
|      TASK_REQUEST_LIMIT      |    否    |                             1500                             |        任务运行中单个任务最大请求次数, 默认为 1500 次        |
|          USE_PYCURL          |    否    |                             True                             |                      是否启用Pycurl模组                      |
|         ALLOW_RETRY          |    否    |                             True                             | 在Pycurl环境下部分请求可能导致Request错误时, 自动修改冲突设置并重发请求 |
|          DNS_SERVER          |    否    |                              ""                              |  通过Curl使用指定DNS进行解析(仅支持Pycurl环境), 如 8.8.8.8   |
|        CURL_ENCODING         |    否    |                             True                             |               是否允许使用Curl进行Encoding操作               |
|     CURL_CONTENT_LENGTH      |    否    |                             True                             |      是否允许Curl使用Headers中自定义Content-Length请求       |
|        NOT_RETRY_CODE        |    否    | [详见配置](https://github.com/qd-today/qd/blob/master/config.py)... | [详见配置](https://github.com/qd-today/qd/blob/master/config.py)... |
|         EMPTY_RETRY          |    否    |                             True                             | [详见配置](https://github.com/qd-today/qd/blob/master/config.py)... |
|         USER0ISADMIN         |    否    |                             True                             |              第一个注册用户为管理员，False关闭               |
|       EXTRA_ONNX_NAME        |    否    |                              ""                              | config目录下自定义ONNX文件名 (不填 ".onnx" 后缀) 多个onnx文件名用"\|"分隔 |
|     EXTRA_CHARSETS_NAME      |    否    |                              ""                              | config目录下自定义ONNX对应自定义charsets.json文件名 (不填 ".json" 后缀) 多个json文件名用"\|"分隔 |
|       WS_PING_INTERVAL       |    No    |                              5                               |           WebSocket ping间隔, 单位为秒, 默认为 5s            |
|       WS_PING_TIMEOUT        |    No    |                              30                              |         WebSocket ping超时时间, 单位为秒, 默认为 30s         |
|     WS_MAX_MESSAGE_SIZE      |    No    |                           10485760                           |         WebSocket 单次接收最大消息大小, 默认为 10MB          |
|      WS_MAX_QUEUE_SIZE       |    No    |                             100                              |            WebSocket 最大消息队列大小, 默认为 100            |
| WS_MAX_CONNECTIONS_SUBSCRIBE |    No    |                              30                              |       WebSocket 公共模板更新页面最大连接数, 默认为 30        |
|   SUBSCRIBE_ACCELERATE_URL   |    No    |                         jsdelivr_cdn                         | 订阅加速方式或地址, 用于加速公共模板更新, 仅适用于 GitHub.[详见配置](https://github.com/qd-today/qd/blob/master/config.py)... |
<InArticleAdsense
    data-ad-client="ca-pub-5818850638223663"
    data-ad-slot="1327307385">
</InArticleAdsense>
