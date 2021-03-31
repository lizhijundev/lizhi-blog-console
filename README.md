<div align="center"><img width="200" src="https://gitee.com/chu1204505056/image/raw/master/logo/vab.svg" alt="VAB"/>
<h1> admin-plus</h1>
<h3> admin-plus为测试版本，请使用admin-pro开发正式项目</h3>
</div>

## 🔈 框架使用约定

- 感谢您认可和尊重作者的劳动成果，禁止将 admin-plus 源码开源或分享给第三方，无论有意还是无意，一经发现将取消您的框架更新及使用资格，移出所有群聊。
- 请遵守群规，文明交流，禁止群内或网络传播不利于框架发展、中伤框架作者、影响框架收益的言论，一经发现将取消您的框架更新及使用资格，移出所有群聊。
- VIP 群文档严禁分享他人，一经发现将取消您的框架更新及使用资格，问题解答时间周一至周五 10 点至 17 点
- 如果您需要一对一问题咨询及一对一技术支持远程协助(1200 元/年)
- 可以将 pro 源码放到 github 但必须是 private 仓库！！！一经发现新建的是 public 仓库将取消您的框架更新及使用资格，移出所有群聊。
- 我始终相信一分钱一分货的道理，admin-plus 无论在价格、服务、文档上都有很长的路要走，所以请您理解这一切的不易，多给我们一些时间，如果您等不及，可以尝试下比较成熟的商业框架，admin-plus 的前辈们比如 iview-pro 商业版（￥ 9999 元）或者 ant-design-vue-pro 商业版（￥ 8999 元）

## 🔈 注意事项！！！

- 自 2021 年 1 月 1 日后发布的新版本，打包需在项目根目录[.env]文件配置秘钥，秘钥在购买 pro 时发放，已购买用户可联系 vip 群 vab 小助手获取秘钥，自行破解造成一切损失后果自负

## 🔗 链接

- 💻 常规版演示地址：[admin-plus](https://chu1204505056.gitee.io/admin-pro/)
- 📝 使用文档：(文档地址及密码请查看 vip 群群公告)
- 🗃 更新日志：[Releases](https://github.com/vue-admin-beautiful/admin-pro/releases)
- 📌 购买地址：[购买地址](http://vue-admin-beautiful.com/authorization/)

## 🌱 版本

`template`和`seed`分支 2.2 版本后停止维护，推荐下载`release/xxx`版本

`master`分支更新频率较快，较为激进，不推荐直接使用

对于感兴趣的提交(commit)，可使用精选(Cherry-Pick)复制到自己的项目中

| 分支名                                                                                      | 是否精简 commit | 是否精简功能 | 是否支持 i18n | 更新时间 |                                                                                                  维护人                                                                                                   |
| ------------------------------------------------------------------------------------------- | :-------------: | :----------: | :-----------: | :------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| [master](https://github.com/vue-admin-beautiful/admin-plus/)                                |       ❌        |      ❌      |       ✔       |   即时   | <a href="https://github.com/chuzhixin" target="_blank"><img style="border-radius:999px" src="https://avatars3.githubusercontent.com/u/26647258?s=50&u=753921fb23f418996dffd6196e89729fcb2329ed&v=4"/></a> |
| [release/main](https://github.com/vue-admin-beautiful/admin-plus/tree/release/main)         |        ✔        |      ❌      |       ✔       | 10-30 天 |  <a href="https://github.com/fwfmiao" target="_blank"><img style="border-radius:999px" src="https://avatars3.githubusercontent.com/u/29328241?s=50&u=bb0977b405ccf1a101ce4e18e4fb8d958854ca60&v=4"/></a>  |
| [release/template](https://github.com/vue-admin-beautiful/admin-plus/tree/release/template) |        ✔        |      ✔       |       ✔       | 10-30 天 |  <a href="https://github.com/fwfmiao" target="_blank"><img style="border-radius:999px" src="https://avatars3.githubusercontent.com/u/29328241?s=50&u=bb0977b405ccf1a101ce4e18e4fb8d958854ca60&v=4"/></a>  |
| [release/seed](https://github.com/vue-admin-beautiful/admin-plus/tree/release/seed)         |        ✔        |      ✔       |      ❌       | 10-30 天 |  <a href="https://github.com/fwfmiao" target="_blank"><img style="border-radius:999px" src="https://avatars3.githubusercontent.com/u/29328241?s=50&u=bb0977b405ccf1a101ce4e18e4fb8d958854ca60&v=4"/></a>  |

### 常规版(master)使用

```bash
# 克隆项目
git clone https://github.com/vue-admin-beautiful/admin-plus.git
# 进入项目目录
cd admin-plus
# 安装依赖
npm i
# 本地开发 启动项目
npm run serve
```

### 其他版本下载

`${branch_name}`替换成上表分支名即可

```bash
# 克隆项目
git clone -b ${branch_name} https://github.com/vue-admin-beautiful/admin-plus.git
# 进入项目目录
cd admin-plus
# 安装依赖
npm i
# 本地开发 启动项目
npm run serve
```

### 版权须知

Vab Admin 系列产品受国家计算机软件著作权保护（证书号：软著登字第 7051316 号），
禁止公开及传播产品源文件、二次出售等，
违者将承担相应的法律责任，并影响自身使用。

### TODO

目前暂时没有好的解决方案的几项待办事项，如果您有好的解决方案可以对仓库 【dev】 分支进行 pull request

- [ ] 分栏布局时，tab 过多时火狐浏览器滚动条不美观
- [ ] 由于 element 的菜单组件不支持设置超出自适应，所以导致横向布局时，菜单过多时处理不理想
- [ ] 头像上传组件浏览器 blob 转化异常
