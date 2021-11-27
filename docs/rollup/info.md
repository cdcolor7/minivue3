## 介绍
Rollup 是一个 JavaScript 模块打包器，可以将小块代码编译成大块复杂的代码，例如 library 或应用程序。
## 配置文件

Rollup的配置文件是可选的，但是使用配置文件的作用很强大，而且很方便，因此我们推荐你使用  
配置文件是一个ES6模块，它对外暴露一个对象，这个对象包含了一些Rollup需要的一些选项。  
通常，我们把这个配置文件叫做rollup.config.js，它通常位于项目的根目录  

``` javascript
// rollup.config.js
export default {
  input,     // 必须
  plugins,
  output: {  // 必须 (如果要输出多个，可以是一个数组)
    file,    // 必须
    format,  // 必须 g格式：amd, cjs, esm, iife, umd
    name,    // umd iife 必须定于全局变量名称
    sourcemap
  },
  external
};
```
## 命令行
``` bash
 # 默认使用rollup.config.js
rollup --config

 # 或者, 使用自定义的配置文件，这里使用my.config.js作为配置文件
rollup --config my.config.js
```

## 基本插件（必备）
你必须使用配置文件才能执行以下操作：  

把一个项目打包，然后输出多个文件  
@rollup/plugin-node-resolve 插件可以解决 ES6模块的查找导入。  
@rollup/plugin-commonjs 但是npm中的大多数包都是以CommonJS模块的形式出现的，所以需要使用这个插件将CommonJS模块转换为 ES2015 供 Rollup 处理。  
@rollup/plugin-json rollup默认只解析js文件 导入json需要引入相关插件

``` javascript
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";

export default {
  // commonjs 需要放到 transform 插件之前，
  // 但是又个例外， 是需要放到 babel 之后的
  plugins: [
    json(),
    resolve(), 
    commonjs()
  ]
}
```
## 其他插件（扩展）
rollup-plugin-typescript typescript支持  
rollup-plugin-terser 代码压缩  
@rollup/plugin-babel babel

``` bash
yarn add  -W -D @rollup/plugin-babel @babel/core
yarn add  -W @babel/polyfill
```

``` javascript
import ts from "rollup-plugin-typescript";
import terser from "rollup-plugin-terser";
import babel from '@rollup/plugin-babel';

export default {
  plugins: [
    ts(),
    terser(),
    babel({
       babelHelpers: 'bundled' 
    })
  ]
}
```

## 配置.babelrc配置文件
安装Preset部门 -D  
@babel/preset-env : 编译js语法;  
@babel/preset-react ：编译react语法 JSX;  
@babel/preset-typescript： 编译ts语法;   
@babel/preset-flow： 编译flow语法;  
``` bash
yarn add  -W -D @babel/preset-env @babel/preset-typescript
```

``` json
{
  "presets": [["@babel/preset-env", {
    "targets": {
      "browserslist": ["last 2 versions","> 1%"]
    }, // 目标浏览器集合
    "corejs":2, // corejs的版本
    "useBuiltIns": "usage" // 按需加载
  }],
  ]
}
```

## 整合typescript
``` bash
yarn add -D -W typescript
./node_modules/.bin/tsc --init
```
