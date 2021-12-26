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

type PatchFn = (
  n1: VNode | null, // null means this is a mount
  n2: VNode,
  container: RendererElement,
) => void

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
      patch(null, vnode, container)
    }
    // flushPostFlushCbs()
    container._vnode = vnode
  }

  const  patch:PatchFn = (n1, n2, container) => {
    if (n1 === n2) {
      return
    }
    // console.log('patch start');
    // const { type, ref, shapeFlag } = n2
    // switch (type) {
    //   case Text:
    //     processText(n1, n2, container);
    //     break;
    //   case Fragment:
    //     processFragment(n1, n2, container);
    //     break;
    //   default:
    //     if (shapeFlag & ShapeFlags.ELEMENT) {
    //       processElement(n1, n2, container);
    //     } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
    //       processComponent(n1, n2, container, parentComponent);
    //     }
    // }
    }

  return {
    render,
    createApp: createAppAPI(render)
  }
}
