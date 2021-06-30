<div align="center"><img width="200" src="https://gitee.com/chu1204505056/image/raw/master/logo/vab.svg" alt="VAB"/>
<h1> admin-plus</h1>
<h3> admin-plus为测试版本，如追求稳定建议使用admin-pro开发正式项目，2021年6月19日起，plus稳定性已经上了一个台阶，如有新项目可以开始着手体验Admin plus</h3>
</div>

## 🔈 框架使用约定

- 感谢您认可和尊重作者的劳动成果，禁止将 admin-plus 源码开源或分享给第三方，无论有意还是无意，一经发现将取消您的框架更新及使用资格，移出所有群聊。
- 请遵守群规，文明交流，禁止群内或网络传播不利于框架发展、中伤框架作者、影响框架收益的言论，一经发现将取消您的框架更新及使用资格，移出所有群聊。
- VIP 群文档严禁分享他人，一经发现将取消您的框架更新及使用资格，问题解答时间周一至周五 10 点至 17 点
- 不可以将 plus 源码上传到码云或 github 仓库，一经发现无论有意或无意取消您的框架更新及使用资格，移出所有群聊。
- 我始终相信一分钱一分货的道理，admin-plus 无论在价格、服务、文档上都有很长的路要走，所以请您理解这一切的不易，多给我们一些时间，如果您等不及，可以尝试下比较成熟的商业框架，admin-plus 的前辈们比如 iview-pro 商业版（￥ 9999 元）或者 ant-design-vue-pro 商业版（￥ 8999 元）

## 🔈 注意事项！！！

- 自 2021 年 1 月 1 日后发布的新版本，打包需在项目根目录[.env]文件配置秘钥，秘钥在购买 pro 时发放，已购买用户可联系 vip 群 vab 小助手获取秘钥，自行破解造成一切损失后果自负

## 🔗 链接

- 💻 常规版演示地址：[admin-plus](https://chu1204505056.gitee.io/admin-plus/)
- 📝 使用文档：(文档地址及密码请查看 vip 群群公告第一条)
- 🗃 更新日志：[Releases](https://github.com/vue-admin-beautiful/admin-plus/releases)
- 📌 付费版及 vip 群购买地址：[购买地址](http://vue-admin-beautiful.com/authorization/)

## 🌱 版本

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

### 免费名额之外，额外加入 vip 群 （100/人 仅限已购买框架的的公司员工加入，购买后联系 QQ783963206 即可）

[- 购买地址，网页右下角切换付款码即可](http://vue-admin-beautiful.com/authorization/)

### 致使用者的一封信

由于框架使用人数越来越多，人员越来越杂，为方便管理，请大家仔细阅读群内规章制度，文明交流，互帮互助，如果确实是管理人员问题，我们增设投诉渠道chuzhixin@foxmail.com,可发送群内截图至此邮箱，如果公然恶意诋毁辱骂 vab 及 vab 作者言论，我们将收回其的框架更新和使用权限，移出群聊，vab 付费版以其他付费框架 15 分之一的价格摸爬滚打走到今天，面对巨大的利益诱惑，我们没有走 iview 付费问答的模式，只在文档不显眼位置提供 1200/年/100 次的一对一技术辅导服务（强烈不推荐购买，我们更希望大家在相互帮助中将问题解决），收入 90%归参与竞选的群小助手所有，699 对抗 9999，廉价意味着我们无力承担巨额的人力成本，既然是问题讨论，就请大家放开面子，全心全意投入到技术讨论中去，没有什么理所应当，相互帮助，相互平等，相互尊重是前提，在此建议非工作时间请勿@群内人员，大家都有各自的生活，群内除你之外的任何人都不需要对你的项目和你自己写的代码和 bug 负责，关于框架的建议和 bug，也欢迎发送到 github 讨论区(前提一定是经过详细验证确实是框架存在的 bug)，为保证良好的群交流氛围，现征集 vab 小助手人选 3 名，如果您有余力帮助到大家，并且希望加入我们的开发队伍，可以联系客服 QQ1204505056 申请成为 vab 小助手，问题讨论时间工作日 10 点至 16 点,也可以根据自己闲暇时间进行调整，表现优异者，将不定时获得现金红包奖励，将有机会免费获得我们今后研发的每一个付费产品，优先获取我们开发的组件，注意是任何一个，如 vdb 大屏，地图导航组件，3D 组件等，并有机会参与我们的框架开发，以及外包团队，如果您技术出众，我们会尽全力为您提供一份收入不错的副业，当然一切都需要在您能力尚可通过作者考验的前提下，我们相信帮助他人的同时一定是一个很好的提升自己的机会，再次祝大家工作愉快，家庭幸福。谨代表作者感谢飞木鱼，小助手 1 号，小助手 2 号，Recall，Yoker，黄怼怼，桃桃乌龙不加奶盖，小飞侠和各位热心群成员对 vab 及其他群成员提供的热心帮助。如果你想更好的提升自己，不想一生劳碌，无所收获，欢迎加入我们，也许这正是我们相互成就的大好机会。
