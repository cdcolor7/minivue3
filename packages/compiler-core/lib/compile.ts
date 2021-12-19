import { RootNode } from './ast'
import { baseParse } from './parse'
// import { CodegenResult } from './codegen'
import { isString } from '@mini-dev-vue3/shared';

export function baseCompile(
  template: string | RootNode,
  // options: CompilerOptions = {}
): any { // CodegenResult
  const ast = isString(template) ? baseParse(template) : template

  return ast

  // transform(
  //   ast
  // )

  // return generate(
  //   ast
  // )
}
