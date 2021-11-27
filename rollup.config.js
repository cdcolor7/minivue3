
import commonjs from '@rollup/plugin-commonjs'
import resolve from "@rollup/plugin-node-resolve";
import ts from 'rollup-plugin-typescript2'

export default {
  input: "./packages/vue/lib/index.ts",
  output: 
    {
      file: "./packages/vue/dist/vue.js",
      format: "iife",
      name: 'Vue',
      sourcemap: true
    },
    plugins: [
      ts(),
      resolve(),
      commonjs()
    ]
  
}