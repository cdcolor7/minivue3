import { RootRenderFunction } from './renderer'
import { createVNode } from "./vnode";
// import { version } from '.' // why???


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
      version: '1.0.0', // mini-dev-vue3的版本号
      mount(rootContainer) {
        // 创建根组件的vnode
        const vnode = createVNode(rootComponent);
        // 用 render，基于 vnode 进行开箱
        render(vnode, rootContainer);
      },
    };
    return app;
  }
}

