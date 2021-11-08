import { parse } from 'date-fns';

export interface ICard {
  /** 站点名称 */
  siteTitle: string;

  /** 描述/自述 */
  description: string;

  /** 站长昵称 */
  webmasterName?: string;

  /** 头像 */
  avatar: string;

  /** 链接 */
  link: string;

  /** 添加日期 */
  addDate: number;

  /** 曾用信息 */
  previousInfo?: ICard;
}

const dateFormat = 'yyyy-MM-dd';

export const cards: ICard[] = [
  {
    siteTitle: 'idealclover',
    description: '是翠翠的个人网站！',
    avatar:
      'https://idealclover.top/usr/themes/clover/assets/favicon/apple-touch-icon.png',
    link: 'https://idealclover.top/',
    addDate: parse('2020-03-07', dateFormat, new Date()).valueOf(),
  },
  {
    siteTitle: 'kok的笔记本',
    description: '分享知识和经验，让世界更美好一些',
    avatar:
      'https://www.gravatar.com/avatar/82738f3d7597358c95886d3274506c30?s=200',
    link: 'https://wocai.de/',
    addDate: parse('2020-03-16', dateFormat, new Date()).valueOf(),
  },
  {
    siteTitle: 'ISLAND',
    description: '记录生活，记录过程',
    avatar: 'https://youngxhui.top/favicon.ico',
    link: 'https://youngxhui.top/',
    addDate: parse('2020-03-19', dateFormat, new Date()).valueOf(),
  },
  {
    siteTitle: "Desvl's Blog",
    description: 'Interest comes from thinking.',
    avatar: 'https://desvl.xyz/image/avatar.jpeg',
    link: 'https://desvl.xyz/',
    addDate: parse('2020-03-21', dateFormat, new Date()).valueOf(),
  },
  {
    siteTitle: 'rxliuli',
    description: '这里是吾辈的博客，主要记录一些技术相关的东西呢 ヾ(＠^∇^＠)ノ',
    link: 'https://blog.rxliuli.com',
    avatar: 'https://blog.rxliuli.com/medias/avatar.jpg',
    addDate: parse('2020-03-30', dateFormat, new Date()).valueOf(),
  },
  {
    siteTitle: 'ChrAlpha 的幻想乡',
    link: 'https://chralpha.com',
    avatar: 'https://cdn.jsdelivr.net/npm/chrdnx@1.0.10/img/head-found.png',
    description: '愿自己同样值得期待！',
    addDate: parse('2020-04-03', dateFormat, new Date()).valueOf(),
  },
  {
    siteTitle: 'Geekinney Blog',
    link: 'https://geekinney.com/',
    avatar: 'https://geekinney.com/static/image/favicon.ico',
    description: 'happy hacking emacs!',
    addDate: parse('2020-04-08', dateFormat, new Date()).valueOf(),
  },
  {
    link: 'https://www.yunyoujun.cn',
    avatar:
      'https://cdn.jsdelivr.net/gh/YunYouJun/yunyoujun.github.io/images/avatar.jpg',
    siteTitle: '云游君的小站',
    description: '希望能成为一个有趣的人。# All at sea.',
    addDate: parse('2020-04-10', dateFormat, new Date()).valueOf(),
  },
  {
    link: 'https://asuhe.jp/',
    siteTitle: '約束の明日へ',
    description: 'また君を思い出すよ',
    avatar: 'https://asuhe.jp/wp-content/uploads/2021/01/avatar.webp',
    addDate: parse('2020-04-16', dateFormat, new Date()).valueOf(),
  },
  {
    link: 'https://blog.skihome.xyz/',
    avatar: 'https://blog.skihome.xyz/uploads/avatar.jpg',
    description: '我已经无敌了！',
    siteTitle: 'Sakitami的集装箱',
    addDate: parse('2020-04-16', dateFormat, new Date()).valueOf(),
  },
  {
    avatar: 'https://i.loli.net/2018/04/28/5ae46811094e6.jpg',
    siteTitle: '欧尼酱',
    description: '浑水摸鱼的咸鱼一条，伪Geek',
    link: 'https://www.nothamor.cn/',
    addDate: parse('2020-04-16', dateFormat, new Date()).valueOf(),
  },
  {
    siteTitle: 'Luminous’ Home',
    description: '记录生活中的点滴',
    link: 'https://luotianyi.vc/',
    avatar: 'https://static.lty.fun/weblogo/my.jpg',
    addDate: parse('2020-04-16', dateFormat, new Date()).valueOf(),
  },
  {
    siteTitle: '渡鸦的小窝',
    link: 'https://polarws.moe/',
    avatar:
      'https://polarws-1252580753.cos.ap-chengdu.myqcloud.com/pic/avatar.webp',
    description: '一条快乐咸鱼',
    addDate: parse('2020-04-22', dateFormat, new Date()).valueOf(),
  },
  {
    siteTitle: '摩尔の镇 | モル·町',
    description: '一个奇妙的小世界.',
    link: 'https://www.mole9630.top',
    avatar:
      'https://cdn.jsdelivr.net/gh/mole9630/blog@master/image/[Avatar]mole9630.png',
    addDate: parse('2020-04-20', dateFormat, new Date()).valueOf(),
  },
  {
    siteTitle: '天空 Blond',
    avatar:
      'https://secure.gravatar.com/avatar/b8dd5801979dc700a9cc29ef793f3357?s=400',
    description: '无名小站。',
    link: 'https://skyblond.info/',
    addDate: parse('2020-04-22', dateFormat, new Date()).valueOf(),
  },
  {
    siteTitle: '夜半观星',
    link: 'https://www.ratodo.com',
    description: '我的花园到处是星星的碎片',
    avatar:
      'https://cdn.jsdelivr.net/gh/Ratodo/Lib@latest/image/logo/favicon.png',
    addDate: parse('2020-04-22', dateFormat, new Date()).valueOf(),
  },
  {
    siteTitle: '肆月之风',
    link: 'https://acme.top/',
    avatar: 'https://cdn.jsdelivr.net/gh/niqingyang/files/avatar.jpg',
    description: '爱技术、爱分享',
    addDate: parse('2020-04-24', dateFormat, new Date()).valueOf(),
  },
  {
    siteTitle: '木子的博客',
    link: 'https://blog.k8s.li',
    description: '垃圾佬、搬砖社畜、运维工程师',
    avatar: 'https://blog.k8s.li/avatar.png',
    addDate: parse('2020-04-26', dateFormat, new Date()).valueOf(),
  },
  {
    siteTitle: '皮皮凛の小窝',
    link: 'https://owomoe.net/',
    avatar: 'https://cdn.jsdelivr.net/gh/AyagawaSeirin/Assets/img/logo.jpg',
    description: '永远相信美好的事情即将发生~',
    addDate: parse('2020-04-28', dateFormat, new Date()).valueOf(),
    previousInfo: {
      siteTitle: '皮皮凛の小窝',
      link: 'https://qwq.best/',
      avatar: 'https://cdn.jsdelivr.net/gh/AyagawaSeirin/Assets/img/logo.jpg',
      description: '永远相信美好的事情即将发生~',
      addDate: parse('2020-04-28', dateFormat, new Date()).valueOf(),
    },
  },
  {
    siteTitle: "Edison's Blog",
    description: 'Enjoy Coding Life',
    avatar:
      'https://www.edisoncgh.com/wp-content/uploads/2020/03/2020030410133280.png',
    link: 'https://www.edisoncgh.com/',
    addDate: parse('2020-04-29', dateFormat, new Date()).valueOf(),
  },
  {
    siteTitle: "Steven's Blog",
    description: '大学萌新的普通 Blog',
    avatar: 'https://blog.hly0928.com/icons/icon-512x512.png',
    link: 'https://blog.hly0928.com/',
    addDate: parse('2020-04-29', dateFormat, new Date()).valueOf(),
  },
  {
    siteTitle: '旧日的足迹',
    description: '记录生活点滴，只因找那旧日足迹',
    link: 'https://jrdzj.cc/',
    avatar: 'https://jrdzj.cc/usr/themes/Single/img/icon.png',
    addDate: parse('2020-04-29', dateFormat, new Date()).valueOf(),
  },
  {
    siteTitle: 'bokutake的小栈',
    description: '”除了我以外，在座的各位都是大佬“',
    avatar:
      'https://secure.gravatar.com/avatar/86ef10df2865daf36471371b8260e138?s=400',
    link: 'https://bokutake.com/',
    addDate: parse('2020-05-01', dateFormat, new Date()).valueOf(),
  },
  {
    siteTitle: '小太（小太の游乐园）',
    description: '一个热爱ACG的技术宅',
    avatar:
      'https://gravatar.loli.net/avatar/ad5babe8213864d97007267d9e130291?s=640',
    link: 'https://baka.fun/',
    addDate: parse('2020-05-04', dateFormat, new Date()).valueOf(),
  },
  {
    siteTitle: 'Monst.X',
    description: '山海有你，不惧千里',
    avatar: 'https://cdn.jsdelivr.net/gh/monsterxcn/MyBucket/logo/author.jpg',
    link: 'https://monsterx.cn/',
    addDate: parse('2020-05-22', dateFormat, new Date()).valueOf(),
  },
  {
    siteTitle: '归·程',
    link: 'https://www.backroad.site/',
    description: '从来不担心做的梦不切实际',
    avatar: 'https://www.backroad.site/wp-content/uploads/2020/03/avatar.png',
    addDate: parse('2020-06-05', dateFormat, new Date()).valueOf(),
  },
  {
    siteTitle: 'Frytea’s Blog',
    description: '热爱技术、喜欢科技',
    link: 'https://blog.frytea.com',
    avatar: 'https://blog.frytea.com/usr/uploads/2019/11/2112771261.png',
    addDate: parse('2020-06-06', dateFormat, new Date()).valueOf(),
  },
  {
    siteTitle: 'I BCL.',
    link: 'https://ibcl.us/',
    avatar: 'https://ibcl.us/images/avatar.png',
    description: '一位热爱无线电广播的高中学生的博客',
    addDate: parse('2020-06-07', dateFormat, new Date()).valueOf(),
  },
  {
    siteTitle: 'Verne in GitHub',
    link: 'https://einverne.github.io/',
    avatar: 'https://einverne.github.io/images/favicon.ico',
    description: '有价值的开源软件推荐和教程',
    addDate: parse('2020-06-08', dateFormat, new Date()).valueOf(),
  },
  {
    avatar:
      'https://blog.hibobmaster.com/wp-content/uploads/2020/08/profile-100x100.jpeg',
    description: 'Marking life and learning progress',
    link: 'https://blog.hibobmaster.com',
    siteTitle: "BobMaster's blog",
    addDate: parse('2020-06-20', dateFormat, new Date()).valueOf(),
  },
  {
    avatar:
      'https://avatars3.githubusercontent.com/u/5274559?s=400&u=465c891f61f0219592487c82b5c29886daeb742f&v=4',
    description: 'Maybe a way to explore the world?',
    siteTitle: '奶冰の冷藏室',
    link: 'https://milkice.me',
    addDate: parse('2020-07-14', dateFormat, new Date()).valueOf(),
  },
  {
    siteTitle: 'Mayx的博客',
    description: 'Mayx’s Home Page',
    link: 'https://mabbs.github.io/',
    avatar: 'https://avatars0.githubusercontent.com/u/17966333',
    addDate: parse('2020-08-15', dateFormat, new Date()).valueOf(),
  },
  {
    siteTitle: 'TonyHe',
    description: 'Just A Poor Lifesinger',
    link: 'https://www.ouorz.com/',
    avatar: 'https://static.ouorz.com/t.jpg',
    addDate: parse('2020-10-06', dateFormat, new Date()).valueOf(),
  },
  {
    siteTitle: '萌茶屋',
    link: 'https://cha.moe/',
    avatar: 'https://img.cha.moe/img/blog/favicon/avatar.svg',
    description: '用心写出最可爱的东西',
    addDate: parse('2020-10-12', dateFormat, new Date()).valueOf(),
  },
  {
    siteTitle: '优格の小窝',
    link: 'https://theyog.cn/',
    avatar:
      'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-imgbed/8162afd3-b8ad-4e66-9d44-218c20226506.jpg',
    description: '喜欢热闹，享受孤独',
    addDate: parse('2020-12-13', dateFormat, new Date()).valueOf(),
  },
  {
    siteTitle: 'Sugaryboy',
    link: 'https://www.sugaryboy.com/',
    description: '我与成长，至死方休',
    avatar: 'https://www.sugaryboy.com/img/favicon.png',
    addDate: parse('2020-12-19', dateFormat, new Date()).valueOf(),
  },
  {
    siteTitle: 'TIMEGG',
    description: '放进时光蛋里。',
    avatar:
      'https://raw.githubusercontent.com/cbhua/cbhua.github.io/master/images/icon.png',
    link: 'https://timegg.top',
    addDate: parse('2021-02-23', dateFormat, new Date()).valueOf(),
  },
  {
    siteTitle: "Arn0's Echo",
    description: 'Live your life with passion. With 三倍Ice Cream !!!',
    avatar:
      'https://raw.githubusercontent.com/arn0note/res/master/static_files/fav/favicon.webp',
    link: 'https://arn0.org',
    addDate: parse('2021-03-01', dateFormat, new Date()).valueOf(),
  },
  {
    siteTitle: '瓠樽',
    description:
      '『今子有五石之瓠，何不慮以為大樽，而浮於江湖，而憂其瓠落無所容？』',
    link: 'https://blog.dylanwu.space/',
    avatar:
      'http://blog.dylanwu.space/assets/icon/apple-touch-icon-192x192.png',
    addDate: parse('2021-03-01', dateFormat, new Date()).valueOf(),
  },
  {
    siteTitle: '果子酱',
    description: '业精于勤，荒于嬉；行成于思，毁于随',
    link: 'https://cwxyr.me/',
    avatar: 'https://cdn2.sublimerui.top/2021/02/04/avator.jpg',
    addDate: parse('2021-03-05', dateFormat, new Date()).valueOf(),
  },
  {
    siteTitle: '云梦 ╮不浅',
    description: '梦，开始的地方',
    link: 'https://blog.adworld.top/',
    avatar: 'https://blog.adworld.top/photo/zhade2.jpg',
    addDate: parse('2021-03-05', dateFormat, new Date()).valueOf(),
  },
  {
    siteTitle: 'itsNekoDeng',
    link: 'https://nekodeng.gitee.io',
    avatar: 'https://nekodeng.gitee.io/medias/avatar.jpg',
    description: '十万伏特皮卡丘，梦想是世界和平，想要发光发热',
    addDate: parse('2021-03-05', dateFormat, new Date()).valueOf(),
  },
  {
    siteTitle: '杯子萌',
    link: 'https://www.cupmoe.com/',
    avatar: 'https://cdn.jsdelivr.net/gh/cutemoe/moepic/img/cover/toutu.jpg',
    description: '万物皆可萌',
    addDate: parse('2021-03-05', dateFormat, new Date()).valueOf(),
  },
  {
    siteTitle: "ADD-SP's blog",
    link: 'https://www.addesp.com',
    avatar: 'https://www.addesp.com/avatar',
    description: '记录 & 分享 & 感受',
    addDate: parse('2021-03-05', dateFormat, new Date()).valueOf(),
  },
  {
    siteTitle: '十年之约',
    link: 'https://www.foreverblog.cn/',
    avatar: 'https://www.foreverblog.cn/favicon.ico',
    description: '一个人的寂寞，一群人的狂欢。',
    addDate: parse('2021-03-05', dateFormat, new Date()).valueOf(),
  },
  {
    siteTitle: '风渐远',
    link: 'https://www.naraku.cn/',
    avatar: 'https://www.naraku.cn/res/avatar.png',
    description: '临渊羡鱼,莫如退而结网',
    addDate: parse('2021-03-05', dateFormat, new Date()).valueOf(),
  },
  {
    siteTitle: 'TszHong',
    description: '本人 14 歲',
    link: 'https://tszhong0411.vercel.app',
    avatar: 'https://tszhong0411.vercel.app/img/logo.png',
    addDate: parse('2021-03-15', dateFormat, new Date()).valueOf(),
  },
  {
    siteTitle: "Ryan4Yin's Space",
    description: '赞美快乐~',
    link: 'https://ryan4yin.space/',
    avatar:
      'https://www.gravatar.com/avatar/2362ce7bdf2845a92240cc2f6609e001?s=240',
    addDate: parse('2021-03-15', dateFormat, new Date()).valueOf(),
  },
  {
    siteTitle: '真白的年轮面包',
    description: 'ねぇ、君は何色になりたい？',
    link: 'https://mashiro.best',
    avatar:
      'https://file.moetu.org/images/2019/11/10/avatar632a06e56f4a2ce5.jpg',
    addDate: parse('2021-03-18', dateFormat, new Date()).valueOf(),
  },
  {
    siteTitle: 'mes ames',
    description: 'moi的一般通过小站',
    link: 'https://moi-mo.github.io',
    avatar: 'https://i.loli.net/2020/03/08/VRT2zfWZiLrUJPX.jpg',
    addDate: parse('2021-03-19', dateFormat, new Date()).valueOf(),
  },
  {
    siteTitle: '静かな森',
    description: '致虚极，守静笃。',
    link: 'https://innei.ren/',
    avatar: 'https://cdn.innei.ren/avatar.png',
    addDate: parse('2021-03-23', dateFormat, new Date()).valueOf(),
  },
  {
    siteTitle: '椎咲良田',
    description: '快走吧 趁风停止之前',
    link: 'https://sanshiliuxiao.top',
    avatar: 'https://i.loli.net/2019/02/24/5c71bf051a8f2.jpg',
    addDate: parse('2021-03-24', dateFormat, new Date()).valueOf(),
  },
]
  .slice()
  .sort((a, b) => b.addDate - a.addDate);
