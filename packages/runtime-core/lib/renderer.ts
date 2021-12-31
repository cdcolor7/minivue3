import { VNode, Fragment, Text } from './vnode'
import { createAppAPI, CreateAppFunction } from './apiCreateApp'
import { ShapeFlags } from '@mini-dev-vue3/shared'
export interface Renderer<HostElement = RendererElement> {
  render: RootRenderFunction<HostElement>
  createApp: CreateAppFunction<HostElement>
}

export type RootRenderFunction<HostElement = RendererElement> = (
  vnode: VNode | null,
  container: HostElement,
  isSVG?: boolean
) => void

export interface RendererElement extends RendererNode {}

export interface RendererNode {
  [key: string]: any
}

export interface RendererOptions<
  HostNode = RendererNode,
  HostElement = RendererElement
> {
  insert(el: HostNode, parent: HostElement, anchor?: HostNode | null): void
  remove(el: HostNode): void
  createElement(
    type: string,
    isSVG?: boolean,
    isCustomizedBuiltIn?: string
  ): HostElement
  createText(text: string): HostNode
  setText(node: HostNode, text: string): void
  setElementText(node: HostElement, text: string): void
  parentNode(node: HostNode): HostElement | null
  nextSibling(node: HostNode): HostNode | null
  querySelector?(selector: string): HostElement | null
  cloneNode?(node: HostNode): HostNode
}

type PatchFn = (
  n1: VNode | null, // null means this is a mount
  n2: VNode,
  container: RendererElement,
  anchor?: RendererNode | null,
  parentComponent?: any
) => void

type ProcessTextOrCommentFn = (
  n1: VNode | null,
  n2: VNode,
  container: RendererElement
) => void

export function createRenderer<
  HostNode = RendererNode,
  HostElement = RendererElement
>(options: RendererOptions<HostNode, HostElement>) {
  return baseCreateRenderer(options)
}

function baseCreateRenderer(options: RendererOptions): any {
  const render: RootRenderFunction = (vnode, container, isSVG) => {
    if (vnode == null) {
      if (container._vnode) {
        // unmount(container._vnode, null, null, true)
      }
    } else {
      patch(null, vnode, container)
    }
    // flushPostFlushCbs()
    container._vnode = vnode
  }

  const {
    insert: hostInsert,
    remove: hostRemove,
    createElement: hostCreateElement,
    createText: hostCreateText,
    setText: hostSetText,
    setElementText: hostSetElementText,
    parentNode: hostParentNode,
    nextSibling: hostNextSibling,
    cloneNode: hostCloneNode
  } = options

  const patch: PatchFn = (
    n1,
    n2,
    container,
    anchor = null,
    parentComponent = null
  ) => {
    if (n1 === n2) {
      return
    }
    // console.log('patch start');
    const { type, shapeFlag } = n2
    switch (type) {
      case Text:
        processText(n1, n2, container)
        break
      case Fragment:
        console.log('Fragment')
        // processFragment(n1, n2, container)
        break
      default:
        if (shapeFlag & ShapeFlags.ELEMENT) {
          console.log('element')
          // processElement(n1, n2, container)
        } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
          console.log('component')
          // processComponent(n1, n2, container, parentComponent)
        }
    }
  }

  // 创建文本节点
  const processText: ProcessTextOrCommentFn = (n1, n2, container) => {
    console.log('处理 Text 节点')
    if (n1 === null) {
      // n1是null 说明是在初始化挂载阶段
      hostInsert((n2.el = hostCreateText(n2.children as string)), container)
    } else {
      // update
      // 先对比一下 updated 之后的内容是否和之前的不一样
      // 在不一样的时候才需要 update text
      // 这里抽离出来的接口是 setText
      // 注意，这里一定要记得把 n1.el 赋值给 n2.el, 不然后续是找不到值的
      const el = (n2.el = n1.el!)
      if (n2.children !== n1.children) {
        hostSetText(el, n2.children as string)
      }
    }
  }

  return {
    render,
    createApp: createAppAPI(render)
  }
}
