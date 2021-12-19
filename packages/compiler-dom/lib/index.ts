import {
  baseCompile,
  // baseParse,
  // CompilerOptions,
  // CodegenResult,
  // ParserOptions,
  // RootNode,
  // noopDirectiveTransform,
  // NodeTransform,
  // DirectiveTransform
} from '@mini-dev-vue3/compiler-core'


export function compile(
    template: string,
    // options: CompilerOptions = {}
  ): any {  // CodegenResult
    return baseCompile(template)
}

export * from '@mini-dev-vue3/compiler-core'
