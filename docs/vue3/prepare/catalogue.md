## 源码结构
源码主体结构如下：
```js
├── package
    ├── compiler-core
    ├── compiler-dom 
    ├── compiler-sfc
    ├── compiler-ssr
    ├── global.d.ts
    ├── reactivity
    ├── runtime-core
    ├── runtime-dom
    ├── runtime-test
    ├── server-rendere
    ├── shared
    ├── size-check
    ├── template-explorer
    └── vue
├── scripts
├── test-dts
├── .eslintrc.js
├── .prettierrc
├── api-extractor.json
├── jest.config.js
├── package.json
├── rollup.config.js
├── tsconfig.json
└── pnpm-workspace.yaml
```
## 模块关系图

```js
                      +---------------------+    +----------------------+
                      |                     |    |                      |
        +------------>|  @vue/compiler-dom  +--->|  @vue/compiler-core  |
        |             |                     |    |                      |
   +----+----+        +---------------------+    +----------------------+
   |         |
   |   vue   |
   |         |
   +----+----+        +---------------------+    +----------------------+    +-------------------+
        |             |                     |    |                      |    |                   |
        +------------>|  @vue/runtime-dom   +--->|  @vue/runtime-core   +--->|  @vue/reactivity  |
                      |                     |    |                      |    |                   |
                      +---------------------+    +----------------------+    +-------------------+
```