export * from '@minivue3/reactivity'
import {
  Renderer,
  createRenderer,
  CreateAppFunction
} from '@minivue3/runtime-core'
import { isString } from '@minivue3/shared'
import { nodeOps } from './nodeOps'

/*
  nodeOps: Dom操作
  patchProp： 节点属性
  extend({ patchProp }, nodeOps)
*/
const rendererOptions = nodeOps
let renderer: Renderer<Element>

function ensureRenderer() {
  return renderer || (renderer = createRenderer(rendererOptions))
}

export const createApp = ((...args) => {
  const app = ensureRenderer().createApp(...args)
  const { mount } = app
  app.mount = (containerOrSelector: string): any => {
    const container = normalizeContainer(containerOrSelector)
    if (!container) return
    const proxy = mount(container)
    return proxy
  }
  return app
}) as CreateAppFunction<Element>

function normalizeContainer(container: string): Element | null {
  if (isString(container)) {
    const res = document.querySelector(container)
    if (!res) {
      console.error(
        `Failed to mount app: mount target selector "${container}" returned null.`
      )
    }
    return res
  }
  return container as any
}

export * from '@minivue3/runtime-core'
