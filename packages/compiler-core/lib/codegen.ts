export interface CodegenResult {
  code: string
  ast: any
}

export function generate(ast: any): CodegenResult {
  /*  可执行js代码生成逻辑 */
  let context = {
    code: 'render code'
  }
  return {
    ast,
    code: context.code
  }
}
