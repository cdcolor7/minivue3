export default {
  lang: 'en-US',
  title: 'mini-dev-vue3 源码学习',
  description:
    '深入学习vue3源代码，基于TypeScript语言开发、Lerna + Monorepo多包管理实现一个mini版的vue3框架',

  themeConfig: {
    // repo: 'vuejs/vitepress',
    // docsDir: 'docs',

    // editLinks: true,
    // editLinkText: 'Edit this page on GitHub',
    // lastUpdated: 'Last Updated',

    // algolia: {
    //   appId: '8J64VVRP8K',
    //   apiKey: 'a18e2f4cc5665f6602c5631fd868adfd',
    //   indexName: 'vitepress'
    // },

    // carbonAds: {
    //   carbon: 'CEBDT27Y',
    //   custom: 'CKYD62QM',
    //   placement: 'vuejsorg'
    // },

    nav: [
      { text: 'Vue3', link: '/vue3/index', activeMatch: '^/$|^/vue3/' },
      {
        text: 'Monorepo',
        link: '/lerna/info',
        activeMatch: '^/lerna/'
      },
      {
        text: 'Rollup',
        link: '/rollup/info',
        activeMatch: '^/rollup/'
      },
      {
        text: 'Gitee',
        link: 'https://gitee.com/yiyi520/mini-dev-vue3'
      }
    ],

    sidebar: {
      '/vue3/': getGuideSidebar(),
      '/lerna/': getLernaSidebar(),
      '/rollup/': getConfigSidebar(),
      '/': getGuideSidebar()
    }
  }
}

function getGuideSidebar() {
  return [
    {
      text: '准备工作',
      children: [
        { text: '开篇词', link: '/vue3/index' },
        { text: '目录结构', link: '/vue3/prepare/catalogue' },
        { text: '源码构建', link: '/vue3/prepare/build' },
        { text: 'Vue3入口', link: '/vue3/prepare/entrance' }
      ]
    },
    {
      text: '数据响应式',
      children: [
        { text: '功能概要', link: '/vue3/reactivity/index' },
        { text: 'reactive', link: '/vue3/reactivity/reactive' },
        { text: 'ref', link: '/vue3/reactivity/ref' },
        { text: 'baseHandlers', link: '/vue3/reactivity/baseHandlers' },
        { text: 'effect', link: '/vue3/reactivity/effect' }
      ]
    },
    {
      text: 'Runtime core',
      children: [
        { text: '功能概要', link: '/vue3/runtime-core/index' },
        { text: 'renderer', link: '/vue3/runtime-core/renderer' },
        { text: 'component', link: '/vue3/runtime-core/component' },
        { text: 'scheduler', link: '/vue3/runtime-core/scheduler' },
        { text: 'vnode', link: '/vue3/runtime-core/vnode' }
      ]
    },
    {
      text: 'Runtime dom',
      children: [
        { text: '功能概要', link: '/vue3/runtime-dom/index' },
        { text: 'nodeOps', link: '/vue3/runtime-dom/nodeOps' }
      ]
    },
    {
      text: '编译器-核心',
      children: [
        { text: '功能概要', link: '/vue3/compiler-core/index' },
        { text: 'parse', link: '/vue3/compiler-core/parse' },
        { text: 'transform', link: '/vue3/compiler-core/transform' },
        { text: 'codegen', link: '/vue3/compiler-core/codegen' }
      ]
    },
    {
      text: '编译器-DOM',
      children: [{ text: '功能概要', link: '/vue3/compiler-dom/index' }]
    }
  ]
}

function getLernaSidebar() {
  return [
    {
      text: 'Monorepo',
      children: [
        { text: 'lerna', link: '/lerna/info' },
        { text: 'pnpm', link: '/lerna/pnmp' },
        { text: '版本号管理', link: '/lerna/version' }
      ]
    }
  ]
}

function getConfigSidebar() {
  return [
    {
      text: 'Rollup',
      children: [
        { text: '基本使用', link: '/rollup/info' },
        { text: 'tsconfig配置详解', link: '/rollup/tsconfig' }
      ]
    }
  ]
}
