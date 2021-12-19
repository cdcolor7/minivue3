import { isHTMLTag, isSVGTag, isVoidTag } from "@mini-dev-vue3/shared";

export function compile(
    template: string,
    // options: CompilerOptions = {}
  ) {
    // TODO
    console.log(isHTMLTag);
    console.log(isSVGTag);
    console.log(isVoidTag);
    
    console.log(template);
    
    const code = 'render'
    return {
        code
    }
}
