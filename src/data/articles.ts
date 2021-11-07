/** 文章数据类型定义 */
export interface IArticle {
  /**
   * 类型：
   *
   * 'pdf'      -> 该对象指向一个 PDF 文件
   * 'markdown' -> 该对象执行一篇用 Markdown 语言写的文章
   */
  type: 'pdf' | 'markdown';

  /**
   * 文件 ID:
   *
   * 当 type === 'pdf' 时，去 pdfs 目录下寻找该对象执行的具体文件
   *
   * 当 type === 'markdown' 时，Markdown 文本和图片一同去 markdowns 目录下找
   */
  file: string;

  /** 标题，文章的标题 */
  title: string;

  /** 描述：主要是作者对该篇文章的一句话简短描述 */
  description?: string;

  /**
   * 更新日期：
   *
   * 格式一（举例）：'2021-08-28'
   * 格式二（举例）：'2021-08-28 00:11:22'
   * 格式三（举例）：1636129809652
   */
  updatedAt?: string | number;

  /** 创建日期，格式同更新日期 */
  createdAt: string | number;
}

/** 文章数据列表 */
export const articles: IArticle[] = [
  {
    title: '使用装饰器来模拟请求延迟和请求进度更新',
    file: 'decorator-in-angular.pdf',
    createdAt: '2021-08-28',
    type: 'pdf',
    description: '通过装饰器来提高代码复用能力',
  },
  {
    title: '在 Angular 项目中实现 Data Mocking 的几种方式',
    file: 'serveral-data-mocking-methods-in-angular.pdf',
    createdAt: '2021-07-03',
    type: 'pdf',
    description: '用好依赖注入',
  },
  {
    title: '求两个偏序集的最大交集',
    file: 'posets-1.pdf',
    createdAt: '2021-05-22',
    type: 'pdf',
    description: '使用排序和双指针技巧．',
  },
  {
    title: 'Git 原理',
    file: 'git-internals.md',
    createdAt: '2021-05-18',
    type: 'markdown',
    description: '一切皆 objects.',
  },
  {
    title: '使用贝叶斯方法进行推断',
    file: 'bayesian-demo-1.pdf',
    createdAt: '2021-04-10',
    type: 'pdf',
    description: '学习和理解朴素贝叶斯方法．',
  },
  {
    title: '推荐系统初探（二）',
    description: '进行推荐并且评估模型的性能．',
    createdAt: '2021-03-29',
    file: 'recommender-system-2.md',
    type: 'markdown',
  },
  {
    title: '推荐系统初探（一）',
    description: '找出前 n 个最相近的用户．',
    createdAt: '2021-03-28',
    file: 'recommender-system-1.md',
    type: 'markdown',
  },
  {
    title: '拥抱 tailwindcss',
    file: 'welcome-tailwindcss.md',
    type: 'markdown',
    createdAt: '2021-03-22',
    description: '本站已经完成了到 tailwindcss 的改造．',
  },
  {
    title: '实现 Pretty URL',
    file: 'implement-pretty-url.md',
    type: 'markdown',
    description: '我为这个站点实现 Pretty URL.',
    createdAt: '2021-03-17',
  },
  {
    title: '服务器被入侵',
    file: 'measures-after-an-abuse-warning',
    type: 'markdown',
    description: '应对举措以及收获．',
    createdAt: '2021-03-15',
  },
  {
    title: '用 Markdown 写作',
    description: '重拾 Markdown.',
    createdAt: '2021-03-13',
    file: 'writing-in-markdown.md',
    type: 'markdown',
  },
  {
    title: 'nginx -s stop',
    file: 'nginx-stop.pdf',
    createdAt: '2021-03-10',
    type: 'pdf',
    description: '博客架构升级改造．',
  },
  {
    title: 'R 软件 macOS 中文绘图',
    file: 'r-cjk-font-rendering.pdf',
    createdAt: '2021-03-07',
    type: 'pdf',
    description: '解决 R 在 macOS 下中文乱码问题．',
  },
  {
    title: '缓存配置案例',
    createdAt: '2021-03-05',
    file: 'proxy-case-study-1.pdf',
    type: 'pdf',
    description: '通过一个案例分析缓存失效原因．',
  },
  {
    title: '用 Celery 实现多台设备的协同工作',
    createdAt: '2021-02-19',
    file: 'celery-intro.pdf',
    type: 'pdf',
    description: '用 Celery 使多台设备协同工作．',
  },
  {
    title: '向量函数的导数以及神经网络',
    createdAt: '2021-02-07',
    file: 'vector-valued-function.pdf',
    type: 'pdf',
    description: '向量函数和雅克比矩阵．',
  },
  {
    title: '主成分分析教程',
    createdAt: '2021-02-03',
    file: 'pca-tutorial.pdf',
    type: 'pdf',
    description: '从线代角度讲解主成分分析．',
  },
  {
    title: '统计学习方法的学习总结',
    createdAt: '2021-02-02',
    file: 'statistical-learning-methods.pdf',
    type: 'pdf',
    description: '统计学习三要素、正则化以及常见学习策略．',
  },
  {
    title: '三维物体的投影计算',
    createdAt: '2021-01-30',
    file: 'cube.pdf',
    type: 'pdf',
    description: '画出三维物体被看到的样子．',
  },
  {
    title: '几个向量化计算的小技巧',
    createdAt: '2021-01-27',
    file: 'vectorization-computing-intro.pdf',
    type: 'pdf',
    description: '向量化计算能大幅提升Flops．',
  },
  {
    title: '将多个矩阵方程的求解并行化',
    createdAt: '2021-01-27',
    file: 'parallelization-of-solving-matrix-equations.pdf',
    type: 'pdf',
    description: '重复利用已有的算力同时求解多个矩阵方程．',
  },
  {
    title: '用 GPU 加速运行《生命游戏》',
    createdAt: '2021-01-23',
    file: 'automata-cuda.pdf',
    type: 'pdf',
    description: '在 GPU 上实现元胞自动机的一个例子．',
  },
  {
    title: '神经网络教程',
    createdAt: '2021-01-22',
    file: 'neuralnet.pdf',
    type: 'pdf',
    description: '梯度下降和误差逆传播其实就是复合函数的求导．',
  },
  {
    title: '支持向量机的简单实现',
    createdAt: '2021-01-19',
    file: 'svm-intro.pdf',
    type: 'pdf',
    description: '从线性分类器到核方法．',
  },
  {
    title: '基于 LSA 的文本索引技术初探',
    createdAt: '2021-01-17',
    file: 'semantic-indexing.pdf',
    type: 'pdf',
    description: '利用奇异值分解技术实现更加准确的文本检索．',
  },
  {
    title: '在 GPU 上实现遗传算法',
    createdAt: '2021-01-17',
    file: 'gpu-tsp.pdf',
    type: 'pdf',
    description: '同时演化每一个个体，在 GPU 中这不难做到．',
  },
  {
    title: 'SVD 方法应用于矩阵近似',
    createdAt: '2021-01-13',
    file: 'svd-matrix-approximation.pdf',
    type: 'pdf',
    description: '初步理解奇异值分解技术．',
  },
  {
    title: '并行化计算尝试',
    createdAt: '2021-01-12',
    file: 'gpu-accel.pdf',
    type: 'pdf',
    description: '直观感受并行化计算加速效果．',
  },
  {
    title: 'DP: 以 House Robber 问题为例',
    createdAt: '2020-08-30',
    file: 'dynamic-programming-intro.md',
    type: 'markdown',
    description: '动规就是计算结果的复用．',
  },
  {
    title: 'Maximum Subarray 问题',
    createdAt: '2020-08-23',
    file: 'solving-maximum-subarray.md',
    type: 'markdown',
    description: '不妨先转化之．',
  },
  {
    file: 'merge-two-sorted-array.md',
    type: 'markdown',
    title: '合并两个已排序数组',
    createdAt: '2020-08-22',
    description: '为一个简单的问题找到多种解法．',
  },
  {
    file: 'longest-common-prefix-n-ary-tree-solution.md',
    type: 'markdown',
    title: 'LCP 问题与数据结构',
    createdAt: '2020-08-18',
    description: '算法和数据结构之间千丝万楼的关系．',
  },
  {
    title: '图片旋转问题',
    file: 'leetcode-rotate-image.md',
    type: 'markdown',
    createdAt: '2020-08-17',
    description: '原地操作就可以不用申请额外的内存了．',
  },
  {
    title: '生成括号组合',
    file: 'generate-parentheses-base-on-desicion-procedures.md',
    type: 'markdown',
    createdAt: '2020-08-14',
    description: '可能是一种直观的解法．',
  },
  {
    file: '4sum-problem-branch-and-bound-solution.md',
    type: 'markdown',
    title: '4Sum 问题分支定界求解',
    createdAt: '2020-08-11',
    description: '4Sum 问题和分支定界思想．',
  },
  {
    file: 'implementing-a-rubkis-cube-in-mathematica.md',
    type: 'markdown',
    title: '在 Mathematica 中模拟魔方',
    createdAt: '2020-05-09',
    description: '魔方的可视化．',
  },
  {
    file: 'eight-queen-problem.md',
    type: 'markdown',
    title: '8 皇后问题：启发式解法',
    createdAt: '2020-04-16',
    description: '解方程、遗传算法和启发式解法．',
  },
  {
    file: 'linux-tools-recommendation-1.md',
    type: 'markdown',
    title: 'Linux 命令行工具推荐',
    createdAt: '2020-04-14',
    description: '命令行界面操作起来是非常高效和方便的．',
  },
  {
    file: 'sudoku-mathematical-formulation.md',
    type: 'markdown',
    title: '解数独与解方程',
    createdAt: '2020-04-13',
    description: '解数独和解方程有什么关系？',
  },
  {
    file: 'openssl-certificates.md',
    type: 'markdown',
    title: 'TLS 证书：签发与验证',
    createdAt: '2020-04-08',
    description: '几乎找不到另外一种比 HTTP 更广泛的协议．',
  },
  {
    file: 'symlink-vs-harlink.md',
    type: 'markdown',
    title: '符号链接和硬链接',
    createdAt: '2020-04-01',
    description: '什么时候用硬链接？什么时候用软连接？',
  },
  {
    file: 'traceroute-introduction.md',
    type: 'markdown',
    title: 'traceroute 介绍：原理和实验',
    createdAt: '2020-03-30',
    description: '打印本机到目标主机之间的节点．',
  },
  {
    file: 'cdn-deployment.md',
    type: 'markdown',
    createdAt: '2020-03-25',
    title: 'CDN 部署过程：原理和实践',
    description: '尝试部署了一下 CloudCone 的 CDN.',
  },
  {
    file: 'correct-time-in-cloudcone-vps.md',
    type: 'markdown',
    title: '修复 CloudCone VPS 时间同步问题',
    createdAt: '2020-03-18',
    description: '一步步发现问题并且解决问题',
  },
  {
    title: 'Crontab 案例',
    file: 'crontab-tutorial',
    description: 'crontab 用来设置定时任务',
    createdAt: '2020-03-16',
    type: 'markdown',
  },
];
