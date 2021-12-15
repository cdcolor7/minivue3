import { VNode } from './vnode'
import { createAppAPI, CreateAppFunction } from './apiCreateApp'
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
    isCustomizedBuiltIn?: string,
    ): HostElement
  createText(text: string): HostNode
  setText(node: HostNode, text: string): void
  setElementText(node: HostElement, text: string): void
  parentNode(node: HostNode): HostElement | null
  nextSibling(node: HostNode): HostNode | null
  querySelector?(selector: string): HostElement | null
  cloneNode?(node: HostNode): HostNode
}



export function createRenderer<
  HostNode = RendererNode,
  HostElement = RendererElement
>(options: RendererOptions<HostNode, HostElement>) {
  return baseCreateRenderer(options)
}


function baseCreateRenderer(
  options: RendererOptions
): any {
  const render: RootRenderFunction = (vnode, container, isSVG) => {
    if (vnode == null) {
      if (container._vnode) {
        // unmount(container._vnode, null, null, true)
      }
    } else {
      // patch(container._vnode || null, vnode, container, null, null, null, isSVG)
    }
    // flushPostFlushCbs()
    container._vnode = vnode
  }
  return {
    render,
    createApp: createAppAPI(render)
  }
}
