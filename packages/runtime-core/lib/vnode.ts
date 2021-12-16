export interface VNode {
  __v_isVNode: true
}

export type VNodeProps = {
  key?: string | number | symbol
}

export const Fragment = Symbol('Fragment') as any as {
  __isFragment: true
  new (): {
    $props: VNodeProps
  }
}

export type VNodeTypes =
  | string
  // | Component
  | VNode
  | typeof Text
  | typeof Fragment

export const createVNode = (_createVNode) as typeof _createVNode

export function _createVNode(
  type: VNodeTypes,
  props: (Date & VNodeProps) | null = null,
  children: unknown = null,
  patchFlag: number = 0,
  dynamicProps: string[] | null = null,
  isBlockNode = false
):any {
  console.log('获取vnode基类函数');
  return 'vnode'
}