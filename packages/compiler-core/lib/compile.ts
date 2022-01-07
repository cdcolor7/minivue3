import { transform } from './transform'
import { baseParse } from './parse'
// import { CodegenResult } from './codegen'
import { isString } from '@mini-dev-vue3/shared'

export function baseCompile(template: any, options: any = {}): any {
  const ast = isString(template) ? baseParse(template) : template
  transform(ast)
  return ast
  // return generate(
  //   ast
  // )
}
