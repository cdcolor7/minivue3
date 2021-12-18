import { RenderFunction } from '@mini-dev-vue3/runtime-core'
import { isString, NOOP } from '@mini-dev-vue3/shared';
import { compile } from '@mini-dev-vue3/compiler-dom'
import * as runtimeDom from '@mini-dev-vue3/runtime-dom'

function compileToFunction(
  template: string | HTMLElement,
  options?: any
): RenderFunction {

  if (!isString(template)) {
    if (template.nodeType) {
      template = template.innerHTML
    } else {
      return NOOP
    }
  }

  if (template[0] === '#') {
    const el = document.querySelector(template)
    template = el ? el.innerHTML : ``
  }

  const  { code } = compile(template)

  console.log(code);


  const render = (
    new Function('Vue', code)(runtimeDom)
  ) as RenderFunction

  console.log(render);

  return render
}

export { compileToFunction as compile }
export * from '@mini-dev-vue3/runtime-dom'
