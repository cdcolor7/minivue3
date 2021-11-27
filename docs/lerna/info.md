
## 介绍
lerna & yarn & monorepo 组合
1. 可以管理公共依赖和单独依赖；
2. 多package相互依赖直接内部 link，不必发版；
3. 可以单独发布和全体发布；
4. 多包放一个git仓库，也有利于代码管理，如配置统一的代码规范。

## 初始化
``` bash
全局安装 npm install -g lerna
lerna init --independent / -i # 使用独立的版本控制模式
lerna bootstrap # 在当前 lerna 仓库中执行引导流程（bootstrap）
```

## lerna 和 yarn workspace 同时使用
在 lerna.json 添加
``` json
{
  "packages": [
    "packages/*"
  ],
  "version": "independent",
  "npmClient": "yarn",
  "useWorkspaces": true
}
```
然后在 package.json 添加：
``` json
{
  "private": true,
  "workspaces": [
    "packages/*"
  ]
}
 
```
开启 yarn workspaces 之后可以在根目录中使用 yarn install 给所有的包统一安装依赖。  
由于yarn和lerna在功能上有较多的重叠,我们采用yarn官方推荐的做法,用yarn来处理依赖问题，用lerna来处理发布问题。

## 生成子项目
``` bash
lerna create '子项目名称'
```

## 建立软连接
``` bash
lerna link
npm link
```

## 添加依赖
1.根文件安装依赖
``` bash
yarn add -W -D '包名'
```

2.所有子项目同时安装依赖
``` bash
lerna add 包名  # 给全局安装
lerna bootstrap #  等于 yarn install,将依赖提升到根目录下的node_modules。
```

3.单个子项目安装依赖
``` bash
lerna add 包名 --scope=项目名 -D
yarn workspace 项目名 add 包名 -D
```

## 更新依赖
``` bash
lerna update
yarn workspace 项目名 upgrade 包名
```

## 删除依赖
``` bash
yarn workspace 项目名 remove 包名
yarn remove -W -D '包名称'  # 删除根文件依赖
```

## 清理环境
``` bash
lerna clean  # 清理所有node_modules
yarn workspaces run clean  # 执行所有package的clean操作
```

## 脚本执行
``` bash
lerna run test        # 运行所有包的 test 命令
lerna run --scope 项目名 test     # 运行 my-component 模块下的 test
lerna run --parallel watch    # 观看所有包并在更改时发报，流式处理前缀输出

lerna exec – 命令         # 对所有子项目同时执行命令
lerna exec --rm -rf ./node_modules         # 删除根依赖包
lerna exec --scope 子项目名 命令      # 制定某个项目，执行具体命令
```
## 项目构建
Leran支持按照拓扑排序规则执行命令
``` bash
lerna run --stream --sort build
lerna version # 升级版本
lerna publish # 版本发布
```