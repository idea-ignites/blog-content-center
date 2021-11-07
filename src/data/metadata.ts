/** 网站元信息 */
export type IMetaData = {
  /** 网站标题 */
  title: string;

  /** 网站简介/自述/描述 */
  description: string;

  /** 网站唯一标识符 */
  id: string;

  /** 网站首页链接 */
  link: string;

  /** 网站图标 */
  favicon: string;

  /** 网站内容版权信息 */
  copyright: string;

  /** Feed 生成器 */
  generator: string;

  /** 作者信息 */
  author: {
    /** 姓名 */
    name: string;

    /** 电子邮箱地址 */
    email: string;

    /** 个人主页 */
    link: string;
  };

  /** Feed 链接地址 */
  feedLinks: {
    atom: string;
  };
};

export const metadata: IMetaData = {
  title: '探索子',
  description: '分享和记录发现',
  id: 'https://exploro.one',
  link: 'https://exploro.one',
  favicon:
    'https://www.gravatar.com/avatar/dfa26ed25a72c40d602d33d854dd6f07?s=200',
  copyright: 'All rights reserved 2021, Hsiao-Fong Wayne',
  generator: 'feed',
  author: {
    name: 'Wayne',
    email: 'i@beyondstars.xyz',
    link: 'https://exploro.one',
  },
  feedLinks: {
    atom: 'https://exploro.one/feed/atom',
  },
};
