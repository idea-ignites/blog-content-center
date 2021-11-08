---
title: "符号链接和硬链接"
date: "2020-04-01T08:27:54+08:00"
lastmod: "2020-04-01T08:27:54+08:00"
draft: false
tags: ["inode", "linux", "devops"]
categories: ["技术交流"]
---

# 符号链接与硬链接

*写于 2020 年 4 月 1 日：*

## 前言

在维护和管理 Linux 服务器时，我们可能会经常接触到符号链接（或者叫做「软链接」），通俗来说，符号链接就好像是 Windows 操作系统里面的「快捷方式」一样，是一个文件的一个别名，打开「快捷方式」，就相当于打开这个快捷方式所指向的文件本件，这就是符号链接或者说软链接的作用，但是，或多或少我们还会听说过另外一种链接，叫做「硬链接」(Hard Link)，可能用得少，但是你知道为什么硬链接用得少，为什么一般不用，什么时候适合用硬链接？以及硬链接和符号链接（软链接）的差别和相似点在哪里？

## 文件和文件指向的`inode`

要理解硬链接，我们首先要理解 `inode` 的概念，具体来说， `inode` 是文件系统所维护和使用的一种数据结构，一个 `inode` 包含一些源信息，例如对象的类型（是文件还是目录），对象的读写权限（例如 `rw-r--r--` 这样的权限设置），对象的创建时间和长度，并且 `inode` 是 `Unix` 风格的文件系统所独有的概念，并且，从文件系统的角度来看，「文件」和「文件夹」统统都是「对象」，只不过「类型」不同，而文件和文件夹，实质上，只不过是文件名到 `inode` 编号的对应，一般来说目录类型的 `inode` 对象所指向的内容维护着一个入口表（Entry-Table），入口表中的每一个入口(Entry)其实就是文件名到 `inode` 编号的对应，操作系统视角下的「文件」，是这样来实现的：把文件名和 `inode` 编号对应起来，以一种键值表或者说入口表的方式存储着，而存储文件名到 `inode` 编号的对应关系的地方其实也就是磁盘中存储文件夹的内容的地方.

![figure](figures/inode-file-and-directories.png)

每个文件都会有一个对应的 `inode` 编号，可以使用

```
ls --inode
```

命令来查看当前目录下每个文件（文件夹）的 `inode` 编号

![figure](figures/show-inode-number.png)

上图中每个文件名左边的数字，就是这个文件（文件夹）所对应的 `inode` .

## 硬链接

当你在一个文件夹下创建一个文件，再运行

```
ls --inode
```

会看到列表里新增了一项，这一项具体包括新的文件的文件名，和这个新的文件所指向的 `inode` 的编号.

![figure](figures/create-a-new-file-called-a-txt.png)

上图创建了一个新的文件 `a.txt` ，文件系统给这个 `a.txt` 指向了编号为 `146203` 的 `inode` 对．接下来，我们还可以「创建」另外一个文件，也是给出一个新名字，这个新的名字也有 `inode` 编号与之对应，只不过，这次，这个「新文件」的 `inode` 编号和 `a.txt` 的 `inode` 编号是一模一样．要怎么做呢？很简单

```
ln a.txt b.txt
```

然后再运行

```
ls --inode
```

看一下发生了什么变化

![figure](figures/created-a-hard-link-named-b-txt.png)


我们刚才啊，实质上就是创建了一个「硬链接」，指向 `a.txt` 的 `inode` 对象的一个文件，它叫做 `b.txt` ，或者说 `b.txt` 是 `a.txt` 的一个「硬链接」，默认情况下，如果 `ln` 命令不带参数，只是给两个文件名，那创建的链接就默认是硬链接.

那么既然，我们也看到了， `a.txt` 和 `b.txt` 都有了相同的 `inode` 编号，可不可以认为，它们的地位是等同的，并且它们实质上都是同一个文件呢？没错，这是可以．和符号链接还要区分「源」和「目标」不同，硬链接一旦创建了，就好像是创建了另外一个地位等同的文件，只不过这「两个」文件，都指向同样的一个 `inode` 对象罢了——这一点也提供了硬链接的许多功．我们可以通过编辑 `a.txt` 来编辑 `b.txt` ，因为对 `a.txt` 的编辑最终要写入 `a.txt` 对应的 `inode` 对象所记录的磁盘中的文件数据区域，而 `b.txt` 和 `a.txt` 指向的 `inode` 始终是同一个，因而也相当于编辑了 `b.txt` ，同样地，打开 `b.txt` ，就相当于打开 `b.txt` 指向的 `inode` 指向的磁盘文件数据区域，也相当于打开了 `a.txt` ，编辑操作亦是如此，复制操作亦是如此，而移动操作亦不会改变文件本身指向的 `inode` 编号，仅仅是给文件名做个变更而已，亦不会影响硬链接所具有的性质.

我们可以试一下，执行下列命令，看有什么输出

```
echo "written to a.txt" >> a.txt
cat a.txt
cat b.txt
echo "written to b.txt" >> b.txt
cat a.txt
cat b.txt
```

可看到 `a.txt` 和 `b.txt` 这两个文件看起来就是两个文件，并且是两个文件指向同样的一段数据区域，而不像是创建了链接关系：因为你看不出究竟哪个是源，哪个是．

![figure](figures/acting-like-same-file-when-reading-and-writing.png)

接下来我们尝试在硬链接 `b.txt` 的基础上创建硬链接，并将最开始的 `a.txt` 删除，甚至创建出的硬链接 `b.txt` 也删除，然后创建新的硬链接 `c.txt` 和 `d.txt` ，以 `b.txt` 指向的 `inode` 为基础（你知道我为什么这么说）.

![figure](figures/removed-old-source-file-for-create-new-hard-link.png)

根据上图，我们了解了，创建硬链接几乎就是创建一个文件，只不过是把新的文件名，指向旧的文件的 `indoe` 对象，并且，创建出的硬链接，也完全可以看做是一个正常的，与原来的文件地位相等的一个文．这就是硬链接的最简单概．我们说「几乎」是创建一个文件，是因为，因为某种原因， `ln` 命令不允许硬链接目录（尽管目录某种意义上也是一种文件）.

结合以上，我们算是解释了「硬链接」的概念，其实，与其说硬链接是链接文件，不如说硬链接是文件名链接到 `inode` 编号，如果你愿意，也可以把 `Linux` 虚拟文件系统中所有文件都看成是到 `inode` 的硬链接.

## 符号链接

符号链接，也称软链接，它和硬链接是不同的，功能也强大的多，也自由得．首先如果硬链接是「文件名到 `inode` 编号的链接的话」，那「符号链接」就可以看成是纯粹的文件到文件的链接了，而 `inode` 这个概念，在符号链接的世界里，也被抽象掉了，很简单：符号链接就是一个符号，就是一个链接到另外一个文件去的符号，就是另外一个文件的别．一个符号链接与其说是一个链接，不如说是一个符号：它就是一个符号！

要创建一个符号链接其实非常简单，例如，创建一个符号链接，名叫 `sc.txt` ，指向当前目录下的 `c.txt` ，那么就这样做：

```
ln -s c.txt sc.txt
```

或者

```
ln --symbolic c.txt sc.txt
```

然后，用

```
ls -all
```

命令可以看到新创建的符号链接

![figure](figures/the-newly-created-symbolic-link.png)

可以看到，对于一个符号链接，`ls -all`命令会把它列出来，亦可以单独查看一个符号链接是指向何处：

```
ln -all sc.txt
```

![figure](figures/where-a-symbolic-link-pointing-to.png)

与硬链接不同的是，由于符号链接仅仅是一个记录着真实原文件路径的「符号」，所以它这样一个符号同样可以「记录」一个文件夹路径，因而也可以创建符号链接指向一个目录：

![figure](figures/symbolic-link-can-also-point-to-a-directory.png)

但是当源文件被删除时，符号链接会变得不可用：

![figure](figures/will-make-symbolic-link-unusable-after-source-deleted.png)

原文件被删除后，再用`ls -all`列出所有文件，会看到符号链接显示的颜色改变，表明不可用，如果再直接打开符号链接，会提示文件找不到，这是因为 `sc.txt` 这个符号链接虽然还在，但是这个符号的意义，它所指向的文件， `c.txt` 被删除了，打开一个符号链接其实打开的是这个符号链接所指向的文件，所以会提示文件找不到.

但总的来说，出来原文件被删除会使得符号链接不可用之外，能够链接目录这一点还是比较有用的，同时符号链接能够链接到其他磁盘，例如网络驱动器，例如按照其他文件系统格式化的分区或者硬盘，而硬链接由于涉及到文件系统层级里的 `inode` 数据结构，是不能够链接到其他文件系统的文件．如果我在使用静态网站生成器来生成一个视频网站，可以用目录软链接的方式避免不必要的文件拷贝，加快了编译速度，减小了磁盘空间占用.

## 总结

符号链接其实就是文件的别名，或者说就是一个符号，这个符号的意义就是符号链接所真正指向的文件，打开符号链接等于打开符号所代表的真实路径，删除了源文件也会使得符号链接失效，同时符号链接可以跨文件系统链接，也可以链接目录.

硬链接只能够链接文件，而且不能跨文件系统链接，当前也不能链接目录，但是硬链接由于实质上是对 `inode` 的链接，所以一个硬链接事实上有着文件的地位，删除一个硬链接或者硬链接的源不会使其他的硬链接失效（硬链接真正的源不是文件而是 `inode` ），一个 `inode` 会被删除只有当所有指向这个 `inode` 的硬链接都被删除，所有硬链接看起来更安全一些.

## 参考文献

[1] [inode - Wikipedia](https://en.wikipedia.org/wiki/Inode)

[2] [What is the difference between a hard link and a symbolic link?](https://blog.usejournal.com/what-is-the-difference-between-a-hard-link-and-a-symbolic-link-8c0493041b62)