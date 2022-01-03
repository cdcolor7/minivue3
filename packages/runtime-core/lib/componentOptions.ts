import { VNode } from './vnode'

type VNodeChildAtom =
  | VNode
  | string
  | number
  | boolean
  | null
  | undefined
  | void

export type VNodeArrayChildren = Array<VNodeArrayChildren | VNodeChildAtom>
export type VNodeChild = VNodeChildAtom | VNodeArrayChildren
export type RenderFunction = () => VNodeChild

// 兼容vue2.x  options api
export function applyOptions() {
  // todo
}
