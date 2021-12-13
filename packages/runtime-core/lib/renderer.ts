export interface Renderer<HostElement = RendererElement> {
  render: RootRenderFunction<HostElement>
  createApp: any
}


export type RootRenderFunction<HostElement = RendererElement> = (
  vnode: VNode | null,
  container: HostElement,
  isSVG?: boolean
) => void

// packages\runtime-core\lib\vnode.ts
export interface VNode {
 // 待完成
}

export interface RendererElement extends RendererNode {}

export interface RendererNode {
  [key: string]: any
}
