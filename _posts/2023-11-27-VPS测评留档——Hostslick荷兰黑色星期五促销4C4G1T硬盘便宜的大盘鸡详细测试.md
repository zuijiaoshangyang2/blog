---
title: VPS测评留档——Hostslick荷兰黑色星期五促销4C4G1T硬盘便宜的大盘鸡详细测试
permalink: /hostslicktest
date: 2023-11-27T18:57:42+08:00
lastmod: 2023-11-27T19:57:42+08:00
tags: 
    - 🐘Linux
    - 🛒VPS测评
author: yuniee
summary: Hostslick荷兰黑色星期五促销大盘鸡，35欧元每年1T硬盘大盘鸡。
image: https://s2.loli.net/2023/11/27/wbqAVjJUSelFODp.jpg

---

# VPS测评留档——Hostslick荷兰黑色星期五促销4C4G1T硬盘便宜的大盘鸡详细测试

<InArticleAdsense
    data-ad-client="ca-pub-5818850638223663"
    data-ad-slot="1327307385">
</InArticleAdsense>



## 🫥前言

此测试只是为了记录留档，只为了自己以后可以留作查看对比其他VPS以及为了让想购买该机型的人可以看到测试数据来估计是否满足自己的需求和预期，三思而后行。不做推荐，只供参考。

Hostslick在黑色星期五促销活动中推出了这个大盘存储套餐，每年需要35欧元，闪购有15%优惠，优惠后每年29.75欧元每年。

## 🐾配置

-  CPU - 4核心 - AMD EPYC 7402P

-  内存 - 4GB

-  带宽 - 1Gbit - 10TB（达到10TB后，降至100mbit，上行/下行各50）

-  磁盘空间 - 1TB Pure HD

-  端口速度 - 1Gbit

-  IPv4地址-1个

-  操作系统-Linux

-  位置-荷兰（欧洲）

-  数据中心-WorldStream, 荷兰

-  网络-ColocationX LTD, AS208046



Hostslick官网： [https://hostslick.com](https://hostslick.com/)



![discount](https://s2.loli.net/2023/11/27/DkTjpoGh6W9sq4Z.png)




## 👾YABS测试

```bash
# ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## #
#              Yet-Another-Bench-Script              #
#                     v2023-11-24                    #
# https://github.com/masonr/yet-another-bench-script #
# ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## #

2023年 11月 26日 星期日 23:32:34 EST

Basic System Information:
---------------------------------
Uptime     : 0 days, 4 hours, 50 minutes
Processor  : AMD EPYC 7402P 24-Core Processor
CPU cores  : 4 @ 2794.748 MHz
AES-NI     : ✔ Enabled
VM-x/AMD-V : ✔ Enabled
RAM        : 3.7 GiB
Swap       : 0.0 KiB
Disk       : 1007.9 GiB
Distro     : CentOS Linux 7 (Core)
Kernel     : 3.10.0-1160.42.2.el7.x86_64
VM Type    : KVM
IPv4/IPv6  : ✔ Online / ❌ Offline

IPv4 Network Information:
---------------------------------
ISP        : ColocationX Ltd.
ASN        : AS208046 ColocationX Ltd.
Host       : ColocationX Ltd
Location   : Amsterdam, North Holland (NH)
Country    : Netherlands

fio Disk Speed Tests (Mixed R/W 50/50) (Partition /dev/vda1):
---------------------------------
Block Size | 4k            (IOPS) | 64k           (IOPS)
  ------   | ---            ----  | ----           ---- 
Read       | 1.74 MB/s      (435) | 24.15 MB/s     (377)
Write      | 1.76 MB/s      (440) | 24.66 MB/s     (385)
Total      | 3.50 MB/s      (875) | 48.81 MB/s     (762)
           |                      |                     
Block Size | 512k          (IOPS) | 1m            (IOPS)
  ------   | ---            ----  | ----           ---- 
Read       | 40.43 MB/s      (78) | 47.90 MB/s      (46)
Write      | 42.16 MB/s      (82) | 50.86 MB/s      (49)
Total      | 82.60 MB/s     (160) | 98.76 MB/s      (95)

iperf3 Network Speed Tests (IPv4):
---------------------------------
Provider        | Location (Link)           | Send Speed      | Recv Speed      | Ping           
-----           | -----                     | ----            | ----            | ----           
Clouvider       | London, UK (10G)          | 771 Mbits/sec   | 618 Mbits/sec   | 6.64 ms        
Scaleway        | Paris, FR (10G)           | busy            | busy            | 10.2 ms        
NovoServe       | North Holland, NL (40G)   | 941 Mbits/sec   | 917 Mbits/sec   | 1.60 ms        
Uztelecom       | Tashkent, UZ (10G)        | 871 Mbits/sec   | 861 Mbits/sec   | 103 ms         
Clouvider       | NYC, NY, US (10G)         | 876 Mbits/sec   | 884 Mbits/sec   | 75.9 ms        
Clouvider       | Dallas, TX, US (10G)      | busy            | 567 Mbits/sec   | 230 ms         
Clouvider       | Los Angeles, CA, US (10G) | 799 Mbits/sec   | 819 Mbits/sec   | 142 ms         

Geekbench 6 test failed. Run manually to determine cause.

YABS completed in 7 min 57 sec
```



## 😧GB5测试

```
Geekbench 5 Benchmark Test:
---------------------------------
Test            | Value
                |
Single Core     | 1006
Multi Core      | 3880
Full Test       | https://browser.geekbench.com/v5/cpu/21988792
```



## 🐺4K顺序混合读写

```bash
sqe_70read_4k: (g=0): rw=rw, bs=4K-4K/4K-4K, ioengine=psync, iodepth=1
...
sqe_70read_4k: (g=0): rw=rw, bs=4K-4K/4K-4K, ioengine=psync, iodepth=1
fio 2.0.7
Starting 20 threads
sqe_70read_4k: Laying out IO file(s) (1 file(s) / 5120MB)
Jobs: 20 (f=20): [MMMMMMMMMMMMMMMMMMMM] [100.0% done] [638K/368K /s] [155 /89  iops] [eta 00m:00s] 
sqe_70read_4k: (groupid=0, jobs=20): err= 0: pid=15273
  read : io=38912KB, bw=663015 B/s, iops=161 , runt= 60098msec
    clat (usec): min=123 , max=641294 , avg=93823.62, stdev=77406.56
     lat (usec): min=123 , max=641294 , avg=93823.77, stdev=77406.56
    clat percentiles (usec):
     |  1.00th=[  165],  5.00th=[  286], 10.00th=[ 1624], 20.00th=[24960],
     | 30.00th=[44288], 40.00th=[64256], 50.00th=[81408], 60.00th=[98816],
     | 70.00th=[121344], 80.00th=[150528], 90.00th=[193536], 95.00th=[238592],
     | 99.00th=[350208], 99.50th=[382976], 99.90th=[544768], 99.95th=[569344],
     | 99.99th=[643072]
    bw (KB/s)  : min=    5, max=   85, per=4.99%, avg=32.27, stdev=11.17
  write: io=17156KB, bw=292318 B/s, iops=71 , runt= 60098msec
    clat (usec): min=128 , max=594989 , avg=67167.22, stdev=73428.11
     lat (usec): min=128 , max=594989 , avg=67167.49, stdev=73428.13
    clat percentiles (usec):
     |  1.00th=[  163],  5.00th=[  205], 10.00th=[  251], 20.00th=[  382],
     | 30.00th=[ 4320], 40.00th=[29568], 50.00th=[50432], 60.00th=[71168],
     | 70.00th=[92672], 80.00th=[118272], 90.00th=[162816], 95.00th=[201728],
     | 99.00th=[309248], 99.50th=[366592], 99.90th=[569344], 99.95th=[569344],
     | 99.99th=[593920]
    bw (KB/s)  : min=    4, max=   80, per=5.97%, avg=17.01, stdev=11.19
    lat (usec) : 250=5.86%, 500=7.04%, 750=1.55%, 1000=0.50%
    lat (msec) : 2=0.72%, 4=1.03%, 10=1.69%, 20=4.39%, 50=15.60%
    lat (msec) : 100=26.02%, 250=32.03%, 500=3.42%, 750=0.16%
  cpu          : usr=0.37%, sys=0.78%, ctx=645317, majf=0, minf=5683
  IO depths    : 1=100.0%, 2=0.0%, 4=0.0%, 8=0.0%, 16=0.0%, 32=0.0%, >=64=0.0%
     submit    : 0=0.0%, 4=100.0%, 8=0.0%, 16=0.0%, 32=0.0%, 64=0.0%, >=64=0.0%
     complete  : 0=0.0%, 4=100.0%, 8=0.0%, 16=0.0%, 32=0.0%, 64=0.0%, >=64=0.0%
     issued    : total=r=9728/w=4289/d=0, short=r=0/w=0/d=0

Run status group 0 (all jobs):
   READ: io=38912KB, aggrb=647KB/s, minb=647KB/s, maxb=647KB/s, mint=60098msec, maxt=60098msec
  WRITE: io=17156KB, aggrb=285KB/s, minb=285KB/s, maxb=285KB/s, mint=60098msec, maxt=60098msec

Disk stats (read/write):
  vda: ios=9741/4349, merge=0/100, ticks=382575/58778, in_queue=441353, util=99.79%
```



虽然盘大，这个io是真的低得离谱，不过好在cpu和内存容量还可以，毕竟才35欧元每年。对这io早有预期🤣。



## 👻SPEEDTEST

```bash
   Speedtest by Ookla

      Server: Bakcell LTD - Baku (id: 2221)
         ISP: ColocationX
Idle Latency:    74.99 ms   (jitter: 0.09ms, low: 74.88ms, high: 75.08ms)
    Download:   775.54 Mbps (data used: 1.4 GB)                                                   
                347.21 ms   (jitter: 77.43ms, low: 81.18ms, high: 836.16ms)
      Upload:   118.10 Mbps (data used: 209.7 MB)                                                   
                116.55 ms   (jitter: 35.59ms, low: 77.54ms, high: 160.01ms)
 Packet Loss:     0.0%
  Result URL: https://www.speedtest.net/result/c/b52c7068-d200-48fa-b4cc-07f338e23f3b
```

![speedtest](https://s2.loli.net/2023/11/27/x8J5tbrKyZ6du4v.png)



## 🫏三网回程线路测试

```bash
----------------------------------------------------------------------
北京电信
traceroute to 219.141.147.210 (219.141.147.210), 30 hops max, 32 byte packets
 1  mastersocialize.org.uk (109.205.211.3)  0.36 ms  AS208046  荷兰, 南荷兰省, 纳尔德韦克, azeronline.com
 2  109.236.95.226  0.26 ms  AS49981  荷兰, worldstream.nl
 3  7-2-2.ear4.Amsterdam1.Level3.net (212.72.41.249)  2.15 ms  AS3356  荷兰, 北荷兰省, 阿姆斯特丹, level3.com
 4  *
 5  *
 6  *
 7  202.97.53.65  265.81 ms  AS4134  中国, 北京, chinatelecom.com.cn, 电信
 8  *
 9  *
10  *
11  *
12  *
13  *
14  *
15  bj141-147-210.bjtelecom.net (219.141.147.210)  285.03 ms  AS4847  中国, 北京, chinatelecom.com.cn, 电信

----------------------------------------------------------------------
上海电信
traceroute to 202.96.209.133 (202.96.209.133), 30 hops max, 32 byte packets
 1  mastersocialize.org.uk (109.205.211.3)  0.26 ms  AS208046  荷兰, 南荷兰省, 纳尔德韦克, azeronline.com
 2  109.236.95.230  0.27 ms  AS49981  荷兰, worldstream.nl
 3  *
 4  be3382.ccr41.lon13.atlas.cogentco.com (154.54.39.217)  7.45 ms  AS174  英国, 伦敦, cogentco.com
 5  be2375.rcr21.b015533-1.lon13.atlas.cogentco.com (154.54.61.158)  7.75 ms  AS174  英国, 伦敦, cogentco.com
 6  *
 7  *
 8  *
 9  *
10  *
11  101.95.95.2  320.52 ms  AS4812  中国, 上海, chinatelecom.com.cn, 电信
12  61.152.1.166  311.15 ms  AS4812  中国, 上海, chinatelecom.com.cn, 电信
13  ns-pd.online.sh.cn (202.96.209.133)  300.45 ms  AS4812  中国, 上海, chinatelecom.com.cn, 电信

----------------------------------------------------------------------
深圳电信
traceroute to 58.60.188.222 (58.60.188.222), 30 hops max, 32 byte packets
 1  109.205.211.2  0.24 ms  AS208046  荷兰, 南荷兰省, 纳尔德韦克, azeronline.com
 2  109.236.95.224  0.37 ms  AS49981  荷兰, 南荷兰省, 纳尔德韦克, worldstream.nl
 3  *
 4  be3458.ccr42.ams03.atlas.cogentco.com (154.54.39.185)  2.21 ms  AS174  荷兰, 北荷兰省, 阿姆斯特丹, cogentco.com
 5  be2814.ccr42.fra03.atlas.cogentco.com (130.117.0.142)  120.53 ms  AS174  德国, 黑森州, 法兰克福, cogentco.com
 6  be3187.agr41.fra03.atlas.cogentco.com (130.117.1.117)  8.75 ms  AS174  德国, 黑森州, 法兰克福, cogentco.com
 7  chinatelecom.demarc.cogentco.com (149.14.159.114)  653.36 ms  AS174  德国, 黑森州, 法兰克福, cogentco.com
 8  202.97.13.29  894.57 ms  AS4134  中国, 广东, 广州, chinatelecom.com.cn, 电信
 9  202.97.12.38  892.35 ms  AS4134  中国, 广东, 广州, chinatelecom.com.cn, 电信
10  202.97.71.253  894.47 ms  AS4134  中国, 广东, 广州, chinatelecom.com.cn, 电信
11  *
12  *
13  *
14  58.60.188.222  905.31 ms  AS4134  中国, 广东, 深圳, chinatelecom.com.cn, 电信

----------------------------------------------------------------------
北京联通
traceroute to 202.106.50.1 (202.106.50.1), 30 hops max, 32 byte packets
 1  mastersocialize.org.uk (109.205.211.3)  0.20 ms  AS208046  荷兰, 南荷兰省, 纳尔德韦克, azeronline.com
 2  109.236.95.226  0.26 ms  AS49981  荷兰, worldstream.nl
 3  *
 4  be3385.ccr42.ams03.atlas.cogentco.com (154.54.58.197)  2.35 ms  AS174  荷兰, 北荷兰省, 阿姆斯特丹, cogentco.com
 5  be2814.ccr42.fra03.atlas.cogentco.com (130.117.0.142)  9.17 ms  AS174  德国, 黑森州, 法兰克福, cogentco.com
 6  be3187.agr41.fra03.atlas.cogentco.com (130.117.1.117)  8.85 ms  AS174  德国, 黑森州, 法兰克福, cogentco.com
 7  *
 8  219.158.15.157  143.06 ms  AS4837  中国, 北京, chinaunicom.com, 联通
 9  219.158.16.69  161.82 ms  AS4837  中国, 北京, chinaunicom.com, 联通
10  *
11  *
12  202.106.50.1  140.10 ms  AS4808  中国, 北京, chinaunicom.com, 联通

----------------------------------------------------------------------
上海联通
traceroute to 210.22.97.1 (210.22.97.1), 30 hops max, 32 byte packets
 1  109.205.211.2  0.25 ms  AS208046  荷兰, 南荷兰省, 纳尔德韦克, azeronline.com
 2  109.236.95.228  0.31 ms  AS49981  荷兰, worldstream.nl
 3  *
 4  be3458.ccr42.ams03.atlas.cogentco.com (154.54.39.185)  2.64 ms  AS174  荷兰, 北荷兰省, 阿姆斯特丹, cogentco.com
 5  be2814.ccr42.fra03.atlas.cogentco.com (130.117.0.142)  8.82 ms  AS174  德国, 黑森州, 法兰克福, cogentco.com
 6  be2846.rcr22.fra06.atlas.cogentco.com (154.54.37.30)  9.12 ms  AS174  德国, 黑森州, 法兰克福, cogentco.com
 7  be3277.nr51.b037206-0.fra06.atlas.cogentco.com (154.25.2.166)  9.50 ms  AS174  德国, 黑森州, 法兰克福, cogentco.com
 8  149.11.84.194  8.92 ms  AS174  德国, 黑森州, 法兰克福, cogentco.com
 9  219.158.5.141  164.35 ms  AS4837  中国, 广东, 广州, chinaunicom.com, 联通
10  219.158.4.101  172.03 ms  AS4837  中国, 广东, 广州, chinaunicom.com, 联通
11  *
12  *
13  *
14  *
15  210.22.97.1  194.18 ms  AS17621  中国, 上海, chinaunicom.com, 联通

----------------------------------------------------------------------
深圳联通
traceroute to 210.21.196.6 (210.21.196.6), 30 hops max, 32 byte packets
 1  109.205.211.2  0.28 ms  AS208046  荷兰, 南荷兰省, 纳尔德韦克, azeronline.com
 2  109.236.95.224  0.25 ms  AS49981  荷兰, 南荷兰省, 纳尔德韦克, worldstream.nl
 3  bb1-fra1.worldstream.nl (109.236.95.221)  12.51 ms  AS49981  德国, 黑森州, 法兰克福, worldstream.nl
 4  109.236.95.131  12.26 ms  AS49981  德国, 黑森州, 法兰克福, worldstream.nl
 5  *
 6  de-fra11b-rc1-ae-5-0.aorta.net (84.116.137.209)  173.72 ms  AS6830  德国, 黑森州, 法兰克福, libertyglobal.com
 7  us-mia01a-rd1-ae-20-0.aorta.net (84.116.130.105)  121.23 ms  AS6830  美国, 佛罗里达州, 迈阿密, libertyglobal.com
 8  us-sjo01a-ri3-ae-4-0.aorta.net (84.116.133.113)  173.81 ms  AS6830  美国, libertyglobal.com
 9  219.158.41.61  168.86 ms  AS4837  美国, 加利福尼亚州, 圣何塞, chinaunicom.com, 联通
10  219.158.96.41  247.65 ms  AS4837  中国, 北京, chinaunicom.com, 联通
11  219.158.115.122  291.30 ms  AS4837  中国, 广东, 广州, chinaunicom.com, 联通
12  219.158.97.26  283.73 ms  AS4837  中国, 广东, 广州, chinaunicom.com, 联通
13  219.158.97.1  303.70 ms  AS4837  中国, 广东, 广州, chinaunicom.com, 联通
14  120.84.0.122  282.51 ms  AS17816  中国, 广东, 深圳, chinaunicom.com, 联通
15  120.80.147.254  293.23 ms  AS17623  中国, 广东, 深圳, chinaunicom.com, 联通
16  dns2-ftcg.gdsz.cncnet.net (210.21.196.6)  293.02 ms  AS17623  中国, 广东, 深圳, chinaunicom.com, 联通

----------------------------------------------------------------------
北京移动
traceroute to 221.179.155.161 (221.179.155.161), 30 hops max, 32 byte packets
 1  109.205.211.2  0.34 ms  AS208046  荷兰, 南荷兰省, 纳尔德韦克, azeronline.com
 2  109.236.95.228  0.28 ms  AS49981  荷兰, worldstream.nl
 3  109.236.95.106  1.35 ms  AS49981  荷兰, 北荷兰省, 阿姆斯特丹, worldstream.nl
 4  ae22-412.ams10.core-backbone.com (5.56.21.189)  1.73 ms  AS201011  荷兰, 北荷兰省, 阿姆斯特丹, core-backbone.com
 5  *
 6  223.118.18.173  17.57 ms  AS58453  英国, 伦敦, chinamobile.com, 移动
 7  223.120.22.18  206.51 ms  AS58453  中国, 北京, chinamobile.com, 移动
 8  221.183.55.106  256.16 ms  AS9808  中国, 北京, chinamobile.com, 移动
 9  221.183.46.250  205.90 ms  AS9808  中国, 北京, chinamobile.com, 移动
10  221.183.89.102  205.34 ms  AS9808  中国, 北京, chinamobile.com, 移动
11  221.183.46.178  263.23 ms  AS9808  中国, 北京, chinamobile.com, 移动
12  221.183.130.142  207.06 ms  AS9808  中国, 北京, chinamobile.com, 移动
13  cachedns03.bj.chinamobile.com (221.179.155.161)  206.94 ms  AS56048  中国, 北京, chinamobile.com, 移动

----------------------------------------------------------------------
上海移动
traceroute to 211.136.112.200 (211.136.112.200), 30 hops max, 32 byte packets
 1  109.205.211.2  0.60 ms  AS208046  荷兰, 南荷兰省, 纳尔德韦克, azeronline.com
 2  109.236.95.228  0.27 ms  AS49981  荷兰, worldstream.nl
 3  109.236.95.173  1.50 ms  AS49981  荷兰, worldstream.nl
 4  ae12-403.ams10.core-backbone.com (5.56.21.173)  2.51 ms  AS201011  荷兰, 北荷兰省, 阿姆斯特丹, core-backbone.com
 5  ae3-2072.lon10.core-backbone.com (80.255.15.166)  6.57 ms  AS201011  英国, 伦敦, core-backbone.com
 6  *
 7  223.120.16.134  335.83 ms  AS58453  中国, 上海, chinamobile.com, 移动
 8  *
 9  221.183.89.69  311.77 ms  AS9808  中国, 上海, chinamobile.com, 移动
10  *
11  *
12  *
13  211.136.112.252  354.52 ms  AS24400  中国, 上海, chinamobile.com, 移动
14  211.136.112.200  333.61 ms  AS24400  中国, 上海, chinamobile.com, 移动

----------------------------------------------------------------------
深圳移动
traceroute to 120.196.165.24 (120.196.165.24), 30 hops max, 32 byte packets
 1  109.205.211.2  0.21 ms  AS208046  荷兰, 南荷兰省, 纳尔德韦克, azeronline.com
 2  109.236.95.224  0.29 ms  AS49981  荷兰, 南荷兰省, 纳尔德韦克, worldstream.nl
 3  109.236.95.167  1.24 ms  AS49981  荷兰, worldstream.nl
 4  ae12-403.ams10.core-backbone.com (5.56.21.173)  1.88 ms  AS201011  荷兰, 北荷兰省, 阿姆斯特丹, core-backbone.com
 5  ae3-2072.lon10.core-backbone.com (80.255.15.166)  6.57 ms  AS201011  英国, 伦敦, core-backbone.com
 6  *
 7  223.120.15.54  299.13 ms  AS58453  中国, 广东, 广州, chinamobile.com, 移动
 8  221.183.55.58  285.33 ms  AS9808  中国, 广东, 广州, chinamobile.com, 移动
 9  221.183.92.21  257.20 ms  AS9808  中国, 广东, 广州, chinamobile.com, 移动
10  221.183.89.242  251.00 ms  AS9808  中国, 广东, 广州, chinamobile.com, 移动
11  221.183.71.78  283.39 ms  AS9808  中国, 广东, 广州, chinamobile.com, 移动
12  221.183.110.166  311.76 ms  AS9808  中国, 广东, 广州, chinamobile.com, 移动
13  ns6.gd.cnmobile.net (120.196.165.24)  305.63 ms  AS56040  中国, 广东, 深圳, chinamobile.com, 移动

----------------------------------------------------------------------
成都教育网
traceroute to 202.112.14.151 (202.112.14.151), 30 hops max, 32 byte packets
 1  mastersocialize.org.uk (109.205.211.3)  0.38 ms  AS208046  荷兰, 南荷兰省, 纳尔德韦克, azeronline.com
 2  109.236.95.226  0.25 ms  AS49981  荷兰, worldstream.nl
 3  bb1-fra1.worldstream.nl (109.236.95.221)  15.55 ms  AS49981  德国, 黑森州, 法兰克福, worldstream.nl
 4  109.236.95.131  15.46 ms  AS49981  德国, 黑森州, 法兰克福, worldstream.nl
 5  *
 6  de-fra11b-rc1-ae-5-0.aorta.net (84.116.137.209)  12.06 ms  AS6830  德国, 黑森州, 法兰克福, libertyglobal.com
 7  de-fra02a-ri1-ae-48-0.aorta.net (84.116.130.62)  11.69 ms  AS6830  德国, 黑森州, 法兰克福, libertyglobal.com
 8  *
 9  *
10  *
11  *
12  *
13  *
14  erx-cernet-bkb-as4538.e0-25.switch7.lax2.he.net (216.218.244.106)  161.25 ms  AS6939  美国, 加利福尼亚州, 洛杉矶, he.net
15  101.4.117.185  162.03 ms  AS4538  美国, 加利福尼亚州, 洛杉矶, edu.cn, 教育网
16  101.4.117.213  304.18 ms  AS4538  中国, 北京, edu.cn, 教育网
17  *
18  *
19  *
20  101.4.116.106  334.30 ms  AS4538  中国, 湖北, 武汉, edu.cn, 教育网
21  101.4.112.29  347.78 ms  AS4538  中国, 重庆, edu.cn, 教育网
22  101.4.117.53  356.82 ms  AS4538  中国, 四川, 成都, edu.cn, 教育网
23  101.4.116.242  345.33 ms  AS4538  中国, 四川, 成都, edu.cn, 教育网
24  *
25  *
26  *
27  202.112.14.151  352.39 ms  AS24355  中国, 四川, 成都, 电子科技大学CERNET西南地区网络中心, edu.cn, 教育网

----------------------------------------------------------------------
```



<InArticleAdsense
    data-ad-client="ca-pub-5818850638223663"
    data-ad-slot="1327307385">
</InArticleAdsense>



## 🐖流媒体测试

```bash
 ** 测试时间: 2023年 11月 27日 星期一 09:27:11 EST

 ** 正在测试IPv4解锁情况 
--------------------------------
 ** 您的网络为: ColocationX (109.205.*.*) 


============[ Multination ]============
 Dazn:                                  Yes (Region: AZ)
 HotStar:                               Yes (Region: GB)
 Disney+:                               Yes (Region: NL)
 Netflix:                               Yes (Region: GB)
 YouTube Premium:                       Yes (Region: NL)
 Amazon Prime Video:                    Yes (Region: AZ)
 TVBAnywhere+:                          Yes
 iQyi Oversea Region:                   GB
 Viu.com:                               No
 YouTube CDN:                           Amsterdam 
 Netflix Preferred CDN:                 Frankfurt  
 Spotify Registration:                  No
 Steam Currency:                        USD
 ChatGPT:                               Yes
 Bing Region:                           WW
=======================================
===============[ Europe ]==============
 Rakuten TV:                            Yes
 Funimation:                            No
 SkyShowTime:                           Yes (Region: SEARCH)
 HBO Max:                               No
 Maths Spot:                            Failed
 ---GB---
 Sky Go:                                Yes
 BritBox:                               Yes
 ITV Hub:                               Yes
 Channel 4:                             Yes
 Channel 5:                             No
 BBC iPLAYER:                           No
 Discovery+ UK:                         No
 ---FR---
 Salto:                                 Failed (Network Connection)
 Canal+:                                Yes
 Molotov:                               No
 ---DE---
 Joyn:                                  No
 Sky:                                   No
 ZDF:                                   No
 ---NL---
 NLZIET:                                Failed
 videoland:                             Failed (Network Connection)
 NPO Start Plus:                        No
 ---ES---
 PANTAYA:                               Failed (Network Connection)
 ---IT---
 Rai Play:                              Yes
 ---RU---
 Amediateka:                            Yes
=======================================
当前主机不支持IPv6,跳过...

本次测试已结束，感谢使用此脚本 
```



## 🐢ping.pe国际互连测试


![ping](https://s2.loli.net/2023/11/27/ZC2UnAIY7mdbG9J.png)



## 🐺ITDOG国内ping测试

## 
![itdog](https://s2.loli.net/2023/11/27/Lqc7QtnRZ1oXuzB.png)



## 🦥内存超售测试


```bash
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  1263  100  1263    0     0   3712      0 --:--:-- --:--:-- --:--:--  3703
内存超售检测开始......

内存io速度: 19 GB/s

未使用SWAP超售，内存io速度正常

balloon超售!
存在virtio_balloon模块，使用气球驱动Balloon超售内存

未使用KSM超售，Kernel Samepage Merging状态正常，
```



## 👽后记

这io实在不行，这两天刚刚开机，可能大家都在测试，希望过段时间会有一丝丝的改善🥹。

<InArticleAdsense
    data-ad-client="ca-pub-5818850638223663"
    data-ad-slot="1327307385">
</InArticleAdsense>