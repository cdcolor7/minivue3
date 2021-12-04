### Vue3构建入口
此处是vue3代码的打包文件目录：
``` js
// ./packages/vue/src
├── index.ts   // vue3 完整版本    runtime + compiler
├── runtime.ts // vue3 运行时版本  runtime
```
rollup配置文件：
```js
// ./rollup.config.js
function createConfig(format, output, plugins = []) {
  ...
  let entryFile = /runtime$/.test(format) ? `src/runtime.ts` : `src/index.ts`
  ...
}
```
在接下来源码解析中在，我们重点分析 runtime + compiler 构建出来的 vue.global.js  
输出目录：./packages/vue/dist/vue.global.js