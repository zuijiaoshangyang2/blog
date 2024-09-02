---
title: Linux创建新用户并分配root权限
permalink: /adduserroot
date: 2024-08-30T12:57:42+08:00
lastmod: 2024-08-30T15:18:42+08:00
tags: 
    - 🐘Linux
author: yuniee
summary: 新系统创建新用户分配root权限。
image: https://s2.loli.net/2024/08/30/cwhFWuO1BiJ5Ma3.png
---

# Linux创建新用户并分配root权限

## ⛷️创建用户

```bash
sudo useradd newuser
```

## 🦐设置用户密码

```bash
passwd newuser
```

## 👽创建用户专属目录

```bash
sudo mkdir /home/newuserdir
```

## 😵‍💫更改目录所有者

```bash
sudo chown newuser:newuser /home/newuserdir
```

## 🥳设置用户权限

```bash
sudo chmod 750 /home/newuserdir
```

这里的权限设置 `750` 表示：

- `7`：用户拥有读、写、执行权限 (4 + 2 + 1)
- `5`：组成员拥有读、执行权限 (4 + 1)
- `0`：其他人没有任何权限

##  🦩将用户的主目录更改为其他目录

```bash
sudo usermod -d /home/newuserdir newuser
```

## 🤖给用户分配root权限

在 Linux 系统中，给用户分配 `root` 权限通常是通过将该用户添加到 `sudo` 组来实现的。以下是具体的步骤：

1. 添加用户到 `sudo` 组

假设你已经创建了一个名为 `newuser` 的用户，现在你想给他分配 `root` 权限。你可以使用以下命令将用户添加到 `sudo` 组：

```bash
sudo usermod -aG sudo newuser
```

`-aG` 选项表示将用户追加到一个组中，而不是替换用户当前所属的组。

### 验证用户权限

为了验证用户是否已获得 `sudo` 权限，你可以使用 `su` 命令切换到该用户，然后尝试执行需要 `sudo` 权限的命令：

```bash
su - newuser
sudo ls /root
```

如果用户已成功获取 `sudo` 权限，执行上述命令时会提示你输入用户密码，然后你应该能够查看 `/root` 目录的内容。

### 🙂‍↕️编辑 `sudoers` 文件（高级设置）

如果你想进行更细粒度的权限控制或不使用 `sudo` 组，你可以直接编辑 `/etc/sudoers` 文件。使用以下命令打开文件进行编辑：

```bash
sudo visudo
```

在文件中添加以下行，允许 `newuser` 使用 `sudo` 命令：

```bash
newuser ALL=(ALL:ALL) ALL
```

编辑完成后，保存并退出。这样，你的用户就拥有了 `sudo` 权限。

请注意，分配 `sudo` 权限给用户会授予其执行任何系统命令的能力，因此在实际使用中需要谨慎操作。



解释 ALL=(ALL:ALL) ALL

`newuser ALL=(ALL:ALL) ALL` 是在 `sudoers` 文件中用来配置特定用户权限的一条规则。让我们逐一解析这段配置：

- **`newuser`**: 这是指定的用户名，表示这条规则适用于该用户。在这种情况下，它适用于 `newuser` 用户。
- **`ALL`**:
  - 第一个 `ALL` 指的是主机别名（Host_Alias）。在这里表示用户可以在任何主机上执行命令，通常在单机环境中是默认设置。
- **`(ALL:ALL)`**:
  - **第一个 `ALL`**: 表示用户可以以任何用户的身份执行命令。这部分定义了用户在执行命令时的目标用户，通常用于指定以 `root` 或其他用户的身份运行命令。
  - **第二个 `ALL`**: 在括号内的第二个 `ALL` 表示用户可以以任何组的身份运行命令。
- **`ALL`**: 最后一个 `ALL` 表示用户可以执行任何命令。

**综合解释**

整条规则 `newuser ALL=(ALL:ALL) ALL` 的意思是，`newuser` 用户可以在任何主机上，以任何用户或组的身份，执行任何命令。这实际上授予了 `newuser` 用户超级用户（`root`）的权限。

需要注意的是，这种配置会授予用户极大的权限，通常仅用于需要完全控制系统的用户。为了安全，应该谨慎使用这种配置。
