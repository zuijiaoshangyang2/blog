---
title: VPS测评留档——HosTeons美国洛杉矶5美元1c4g独享cpu小母鸡
date: 2023-10-11T18:57:42+08:00
lastmod: 2023-10-12T18:57:42+08:00
tags: 
    - 🐘Linux
    - 🛒VPS测评
author: yuniee
summary: 每月5美元即可独享的AMD Ryzen 9 5950X。
image: https://s2.loli.net/2023/10/11/otVGWrjgfTZ9XyC.webp
---

# VPS测评留档——HosTeons美国洛杉矶5美元1c4g独享cpu小母鸡

## 🫥配置

```bash
1×Ryzen 5950X、4 GB RAM、
50 GB NVME、15 TB Transfer、
10 Gbps (Shared Port)、1 IPv4、/64 IPv6
三份备份、带有linux和windows
```

```
Looking Glass: https://lg.slc2.hosteons.com
```

## 👽GB5跑分

```bash
Geekbench 5 Benchmark Test:
---------------------------------
Test            | Value                         
                |                               
Single Core     | 1756                          
Multi Core      | 1745                          
Full Test       | https://browser.geekbench.com/v5/cpu/21826523
```

## 🫏流媒体测试

```bash
[流媒体平台及游戏区域限制测试]

项目地址 https://github.com/lmc999/RegionRestrictionCheck 
BUG反馈或使用交流可加TG群组 https://t.me/gameaccelerate 
脚本适配OS: CentOS 6+, Ubuntu 14.04+, Debian 8+, MacOS, Android (Termux), iOS (iSH)
 ** 测试时间: Wed 11 Oct 2023 09:58:25 AM EDT

 ** 正在测试IPv4解锁情况 
--------------------------------
 ** 您的网络为: Hosteons (103.114.*.*) 


============[ Multination ]============
 Dazn:                                  Yes (Region: US)
 HotStar:                               No
 Disney+:                               No
 Netflix:                               Originals Only
 YouTube Premium:                       Yes
 Amazon Prime Video:                    Yes (Region: US)
 TVBAnywhere+:                          Yes
 iQyi Oversea Region:                   US
 Viu.com:                               No
 YouTube CDN:                           Los Angeles, CA 
 Netflix Preferred CDN:                 Los Angeles, CA  
 Spotify Registration:                  No
 Steam Currency:                        USD
 ChatGPT:                               Yes
=======================================
===========[ North America ]===========
 FOX:                                   Yes
 Hulu:                                  Failed
 NFL+:                                  Yes
 ESPN+:[Sponsored by Jam]               No
 Epix:                                  No
 Starz:                                 No
 Philo:                                 No
 FXNOW:                                 No
 TLC GO:                                Yes
 HBO Max:                               Yes
 Shudder:                               Yes
 BritBox:                               Yes
 Crackle:                               Yes
 CW TV:                                 Yes
 A&E TV:                                Yes
 NBA TV:                                Yes
 NBC TV:                                Yes
 Fubo TV:                               Yes
 Tubi TV:                               Yes
 Sling TV:                              Yes
 Pluto TV:                              Yes
 Acorn TV:                              Yes
 SHOWTIME:                              Yes
 encoreTVB:                             No
 Funimation:                            Yes (Region: US)
 Discovery+:                            No
 Paramount+:                            No
 Peacock TV:                            Yes
 Popcornflix:                           Yes
 Crunchyroll:                           Yes
 KBS American:                          No
 KOCOWA:                                Yes
 Maths Spot:                            Failed
 ---CA---
 CBC Gem:                               No
 Crave:                                 Yes
=======================================


 ** 正在测试IPv6解锁情况 
--------------------------------
 ** 您的网络为: Hosteons (2402:d0c0:18:*:*) 


============[ Multination ]============
 Dazn:                                  Failed (Network Connection)
 HotStar:                               Yes (Region: US)
 Disney+:                               Yes (Region: US)
 Netflix:                               Originals Only
 YouTube Premium:                       Yes (Region: SG)
 Amazon Prime Video:                    Unsupported
 TVBAnywhere+:                          Failed (Network Connection)
 iQyi Oversea Region:                   Failed
 Viu.com:                               Failed
 YouTube CDN:                           Los Angeles, CA 
 Netflix Preferred CDN:                 Los Angeles, CA  
 Spotify Registration:                  No
 Steam Currency:                        Failed (Network Connection)
 ChatGPT:                               Yes
=======================================
===========[ North America ]===========
 FOX:                                   Yes
 Hulu:                                  Failed
 NFL+:                                  IPv6 Not Support
 ESPN+:[Sponsored by Jam]               Yes
 Epix:                                  Failed (Network Connection)
 Epix:                                  Failed
 Starz:                                 Failed (Network Connection)
 Philo:                                 IPv6 Not Support
 FXNOW:                                 IPv6 Not Support
 TLC GO:                                IPv6 Not Support
 HBO Max:                               Failed (Network Connection)
 Shudder:                               Yes
 BritBox:                               Yes
 Crackle:                               Yes
 CW TV:                                 Yes
 A&E TV:                                IPv6 Not Support
 NBA TV:                                Yes
 NBC TV:                                Yes
 Fubo TV:                               IPv6 Not Support
 Tubi TV:                               Yes
 Sling TV:                              Yes
 Pluto TV:                              Yes
 Acorn TV:                              Failed (Network Connection)
 SHOWTIME:                              Failed (Network Connection)
 encoreTVB:                             Failed (Network Connection)
 Funimation:                            IPv6 Not Support
 Discovery+:                            IPv6 Not Support
 Paramount+:                            No
 Peacock TV:                            Yes
 Popcornflix:                           IPv6 Not Support
 Crunchyroll:                           IPv6 Not Support
 KBS American:                          IPv6 Not Support
 KOCOWA:                                IPv6 Not Support
 Maths Spot:                            IPv6 Not Support
 ---CA---
 CBC Gem:                               Failed (Network Connection)
 Crave:                                 Failed (Network Connection)
=======================================
本次测试已结束，感谢使用此脚本 
```

## 🐞YABS综合测试

```bash
================================================
root@vps55952669:~# ^C
root@vps55952669:~# curl -sL yabs.sh | bash
# ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## #
#              Yet-Another-Bench-Script              #
#                     v2023-09-06                    #
# https://github.com/masonr/yet-another-bench-script #
# ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## #

Wed 11 Oct 2023 10:00:21 AM EDT

Basic System Information:
---------------------------------
Uptime     : 0 days, 6 hours, 50 minutes
Processor  : AMD Ryzen 9 5950X 16-Core Processor
CPU cores  : 1 @ 3393.624 MHz
AES-NI     : ✔ Enabled
VM-x/AMD-V : ✔ Enabled
RAM        : 3.8 GiB
Swap       : 512.0 MiB
Disk       : 48.6 GiB
Distro     : Debian GNU/Linux 11 (bullseye)
Kernel     : 5.10.0-26-amd64
VM Type    : KVM
IPv4/IPv6  : ✔ Online / ✔ Online

IPv6 Network Information:
---------------------------------
ISP        : Hosteons Pte. Ltd.
ASN        : AS142036 Hosteons Pte. Ltd.
Host       : Hosteons Pte. Ltd
Location   : Salt Lake City, Utah (UT)
Country    : United States

fio Disk Speed Tests (Mixed R/W 50/50):
---------------------------------
Block Size | 4k            (IOPS) | 64k           (IOPS)
  ------   | ---            ----  | ----           ---- 
Read       | 451.08 MB/s (112.7k) | 1.84 GB/s    (28.8k)
Write      | 452.27 MB/s (113.0k) | 1.85 GB/s    (28.9k)
Total      | 903.36 MB/s (225.8k) | 3.69 GB/s    (57.7k)
           |                      |                     
Block Size | 512k          (IOPS) | 1m            (IOPS)
  ------   | ---            ----  | ----           ---- 
Read       | 1.74 GB/s     (3.3k) | 1.71 GB/s     (1.6k)
Write      | 1.83 GB/s     (3.5k) | 1.83 GB/s     (1.7k)
Total      | 3.57 GB/s     (6.9k) | 3.54 GB/s     (3.4k)

iperf3 Network Speed Tests (IPv4):
---------------------------------
Provider        | Location (Link)           | Send Speed      | Recv Speed      | Ping           
-----           | -----                     | ----            | ----            | ----           
Clouvider       | London, UK (10G)          | 1.37 Gbits/sec  | 1.58 Gbits/sec  | 114 ms         
Scaleway        | Paris, FR (10G)           | busy            | 921 Mbits/sec   | 147 ms         
NovoServe       | North Holland, NL (40G)   | busy            | 1.44 Gbits/sec  | 119 ms         
Uztelecom       | Tashkent, UZ (10G)        | 751 Mbits/sec   | 799 Mbits/sec   | 268 ms         
Clouvider       | NYC, NY, US (10G)         | 3.39 Gbits/sec  | 2.81 Gbits/sec  | 49.3 ms        
Clouvider       | Dallas, TX, US (10G)      | busy            | busy            | 30.7 ms        
Clouvider       | Los Angeles, CA, US (10G) | 3.16 Gbits/sec  | 3.33 Gbits/sec  | 41.9 ms        

iperf3 Network Speed Tests (IPv6):
---------------------------------
Provider        | Location (Link)           | Send Speed      | Recv Speed      | Ping           
-----           | -----                     | ----            | ----            | ----           
Clouvider       | London, UK (10G)          | busy            | 1.58 Gbits/sec  | 114 ms         
Scaleway        | Paris, FR (10G)           | 1.18 Gbits/sec  | busy            | 159 ms         
NovoServe       | North Holland, NL (40G)   | 769 Mbits/sec   | 1.50 Gbits/sec  | 119 ms         
Uztelecom       | Tashkent, UZ (10G)        | 883 Mbits/sec   | 816 Mbits/sec   | 211 ms         
Clouvider       | NYC, NY, US (10G)         | 3.66 Gbits/sec  | 3.82 Gbits/sec  | 49.3 ms        
Clouvider       | Dallas, TX, US (10G)      | busy            | 5.38 Gbits/sec  | 30.7 ms        
Clouvider       | Los Angeles, CA, US (10G) | 6.27 Gbits/sec  | busy            | 28.3 ms        

Geekbench 6 Benchmark Test:
---------------------------------
Test            | Value                         
                |                               
Single Core     | 2281                          
Multi Core      | 2271                          
Full Test       | https://browser.geekbench.com/v6/cpu/3026708

YABS completed in 12 min 44 sec
```

