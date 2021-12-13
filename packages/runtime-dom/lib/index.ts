import { Renderer } from '@vue/runtime-core'
  
import { isString, extend } from '@mini-dev-vue3/shared'
   
const rendererOptions = {} // extend({ patchProp }, nodeOps)

let renderer: any // Renderer<Element | ShadowRoot>

function createRenderer(options:any) {
    return {
        createApp:  () => {
            return {
                mount: () => {}
            }
        }
    }
}


function ensureRenderer() {
    return (
      renderer ||
      (renderer = createRenderer(rendererOptions))
    )
  }
  
export const createApp = (...args) => {
    const app = ensureRenderer().createApp(...args) 
    const { mount } = app
    app.mount = (containerOrSelector: Element | ShadowRoot | string): any => {
        const container = normalizeContainer(containerOrSelector)
        if (!container) return
        // mount 功能拓展
        // ....
        const proxy = mount(container)
        return proxy
    }
    return app
}

// 标准化容器 -- 待调试...
function normalizeContainer(
    container: Element | ShadowRoot | string
  ): Element | null {
    if (isString(container)) {
      const res = document.querySelector(container)
      if (!res) {
        console.warn(
          `Failed to mount app: mount target selector "${container}" returned null.`
        )
      }
      return res
    }
    if (
      window.ShadowRoot &&
      container instanceof window.ShadowRoot &&
      container.mode === 'closed'
    ) {
        console.warn(
        `mounting on a ShadowRoot with \`{mode: "closed"}\` may lead to unpredictable bugs`
      )
    }
    return container as any
  }
  
