import { RootRenderFunction } from './renderer'
import { createVNode } from "./vnode";


export type CreateAppFunction<HostElement> = (
  rootComponent: any,
) => any

export interface App<HostElement = any> {
  version: string
  mount(
    rootContainer: HostElement | string,
  ): any
  _uid: number
  _component: any
  _instance: any
}

let uid = 0

// 返回app实例的工厂函数
export function createAppAPI<HostElement>(
  render: RootRenderFunction,
): CreateAppFunction<HostElement> {
  return function createApp(rootComponent) {
    const app:App = {
      _uid: uid++,
      _component: rootComponent,
      _instance: null,
      version: __VERSION__,
      mount(rootContainer) {
        // 创建根组件的vnode
        const vnode = createVNode(rootComponent);
        // 基于 vnode 进行渲染
        render(vnode, rootContainer);
      },
    };
    return app;
  }
}

