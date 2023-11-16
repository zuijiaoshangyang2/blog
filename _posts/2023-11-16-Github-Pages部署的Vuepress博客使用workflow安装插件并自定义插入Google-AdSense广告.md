---
title: Github Pages部署的Vuepress博客使用workflow安装插件并自定义插入Google AdSense广告
date: 2023-11-16T18:57:42+08:00
lastmod: 2023-11-17T18:57:42+08:00
tags: 
    - 🐘Linux
    - 🍓nodejs
    - 📕blog
    - 👾Vue
author: yuniee
summary: 在GitHub Actions的workflow中安装并使用vuepress插件，让广告出现的位置尽在掌握之中。
image: https://s2.loli.net/2023/11/16/qUpjaL6CGErlnmJ.webp
---

# Github Pages部署的Vuepress博客使用workflow安装vue-google-adsens插件并自定义插入Google AdSense广告
<InArticleAdsense
    data-ad-client="ca-pub-5818850638223663"
    data-ad-slot="1327307385">
</InArticleAdsense>

## 🐖前提

需要先去[Google AdSense ](https://www.google.com/adsense)按照提示步骤托管你的网站，经过审核通过后才可以在网站中显示广告。并且需要在审核通过后在Google AdSense后台的网站部分获取ads.txt代码并将ads.txt放入你的网站根目录下。最终可以通过“域名/ads.txt”访问。等待检测通过后就完成了。



[插件GitHub地址](https://github.com/YunYouJun/vuepress-plugin-google-adsense)

## 🫏获取广告代码

1. **在后台进入手动配置广告单元的部分**

![无标题-2023-11-16-2156.png](https://s2.loli.net/2023/11/16/GKJNfSgVm63nX8Z.png)



2. **选择你想要的广告模块展示方式，输入广告单元名称然后点击"创建"按钮。**

![ads](https://s2.loli.net/2023/11/16/2PUT41IXG6JlMNg.png)

3.**生成并保存广告代码。**

然后就会出现以下界面，你需要保存这段代码，尤其是`data-ad-client` 和 `data-ad-slot`

![houtai](https://s2.loli.net/2023/11/16/Hl6xW9RFNOgdzjG.png)

## 👻**修改workflow代码安装插件**

> 本地运行的可以使用以下代码
>
> ```bash
> yarn add -D vue-script2 vue-google-adsense
> ```

在deploy.yml中直接添加以下代码

```yaml
      - name: Add vue-script2 and vue-google-adsense
        run: yarn add vue-script2 vue-google-adsense
```

添加后以我的博客的workflow代码为例

```yaml
name: Build and Deploy
on: [push, repository_dispatch]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout self
        uses: actions/checkout@master

      - name: Checkout blog
        uses: actions/checkout@v2
        with:
          repository: ${{ secrets.REPO_BLOG }}
          token: ${{ secrets.REPO_BLOG_ACCESS_TOKEN }}
          path: blog

      - name: Get yarn cache directory path
        id: yarn-cache-dir-path
        run: echo "::set-output name=dir::$(yarn cache dir)"

      - name: Move blog/public/ to blog/.vuepress/
        run: mv -f blog/public/ blog/.vuepress/public/


      - uses: actions/cache@v2
        id: yarn-cache
        with:
          path: ${{ steps.yarn-cache-dir-path.outputs.dir }}
          key: ${{ runner.os }}-yarn-${{ hashFiles('**/yarn.lock') }}
          restore-keys: |
            ${{ runner.os }}-yarn-
     
      - name: Create .vuepress/dist/ directory
        run: mkdir -p blog/.vuepress/dist/
      - name: Copy robots.txt to .vuepress/dist/
        run: cp blog/robots.txt blog/.vuepress/dist/robots.txt
      - name: Install Google analytics plugin
        run: yarn add -D @vuepress/plugin-google-analytics
      - name: Add vue-script2 and vue-google-adsense
        run: yarn add vue-script2 vue-google-adsense         #我添加到了这里
      - name: vuepress-deploy
        uses: jenkey2011/vuepress-deploy@master
        env:
          ACCESS_TOKEN: ${{ secrets.REPO_HOSTING_ACCESS_TOKEN }}
          TARGET_REPO: ${{ secrets.REPO_HOSTING }}
          TARGET_BRANCH: main
          BUILD_SCRIPT: yarn && yarn build
          BUILD_DIR: blog/.vuepress/dist/
          CNAME: ${{ secrets.CNAME }}
```

然后点击运行部署，就会执行安装vue-google-adsense插件的命令。

## 🦥配置enhanceApp.js

该文件的路径为`docs/.vuepress/enhanceApp.js`

将文件修改为以下内容

```js
export default ({
  Vue,
  options,
  router,
  siteData
}) => {
  if (typeof window !== 'undefined') {
    import('vue-google-adsense')
      .then(module => {
        const Ads = module.default
        Vue.use(require('vue-script2'))
        Vue.use(Ads.Adsense)
        Vue.use(Ads.InArticleAdsense)
        Vue.use(Ads.InFeedAdsense)
      })
      .catch(e => {
        console.log(e)
      })
  }
}

```

## 🐊使用插入广告代码

如果想插入广告就在markdown文件中你想要的位置输入以下代码：

```bash
<InArticleAdsense
    data-ad-client="你刚才保存的data-ad-client内容"
    data-ad-slot="你刚才保存的data-ad-slot内容">
</InArticleAdsense>
```

比如我在本文中将广告插入到了题目下面和文章最后。就将这段代码放在`.md`文件的对应位置。

## 🐻‍❄️后记

最好在插入广告代码后空出一行，否则会出现显示上的问题。
<InArticleAdsense
    data-ad-client="ca-pub-5818850638223663"
    data-ad-slot="1327307385">
</InArticleAdsense>


<InArticleAdsense    data-ad-client="ca-pub-5818850638223663"    data-ad-slot="1327307385"> </InArticleAdsense>
