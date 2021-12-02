# mini-dev-vue3

### 介绍
深入学习vue3源代码，基于TypeScript语言开发、Lerna + Monorepo多包管理实现一个mini版的vue3框架

#### 安装依赖
npm 不支持 workspaces，安装依赖必须使用 yarn 安装依赖
``` bash
yarn # 必须
```

#### 开发
开发文件测试目录：./packages/vue/examples/
``` bash
yarn dev <name> -s  # '<name>打包目标[为空默认vue,]'; -s '是否开启souceMap'
```
#### 启动docs
vue3源码详细说明，lerna、pnpm、rollup相关使用说明。
``` bash
yarn doc:dev
```

#### 测试
``` bash
yarn test
```

#### 构建
构建输出文件目录：./packages/*/dist/
``` bash
yarn build <name>  # '<name>构建目标[为空默认全部]'
```
### Tasking
...
输出中...
...
### vue3源码思维导图
...
输出中...
...
#### 参与贡献

1.  Fork 本仓库
2.  新建 Feat_xxx 分支
3.  提交代码
4.  新建 Pull Request
