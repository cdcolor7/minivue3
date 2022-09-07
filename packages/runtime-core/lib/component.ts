import { markRaw, shallowReadonly, proxyRefs } from '@minivue3/reactivity'
import { EMPTY_OBJ, ShapeFlags } from '@minivue3/shared'
import { emit } from './componentEmits'
import { initProps } from './componentProps'
import { PublicInstanceProxyHandlers } from './componentPublicInstance'
import { initSlots } from './componentSlots'
import { applyOptions } from './componentOptions'

let uid = 0
export type Data = Record<string, unknown> // TS自带的工具泛型

type LifecycleHook<TFn = Function> = TFn[] | null

export const enum LifecycleHooks {
  BEFORE_CREATE = 'bc',
  CREATED = 'c',
  BEFORE_MOUNT = 'bm',
  MOUNTED = 'm',
  BEFORE_UPDATE = 'bu',
  UPDATED = 'u',
  BEFORE_UNMOUNT = 'bum',
  UNMOUNTED = 'um',
  DEACTIVATED = 'da',
  ACTIVATED = 'a',
  RENDER_TRIGGERED = 'rtg',
  RENDER_TRACKED = 'rtc',
  ERROR_CAPTURED = 'ec',
  SERVER_PREFETCH = 'sp'
}
export interface ComponentInternalInstance {
  uid: number
  type: any
  root: any
  vnode: any
  next: any
  props: Data
  parent: ComponentInternalInstance | null
  provides: Data
  ctx: Data
  proxy: any
  attrs: Data
  setupState: Data
  slots: any
  refs: Data
  emit: any
  isMounted: boolean
  isUnmounted: boolean
  isDeactivated: boolean
  [LifecycleHooks.BEFORE_CREATE]: LifecycleHook
  [LifecycleHooks.CREATED]: LifecycleHook
  [LifecycleHooks.BEFORE_MOUNT]: LifecycleHook
  [LifecycleHooks.MOUNTED]: LifecycleHook
  [LifecycleHooks.BEFORE_UPDATE]: LifecycleHook
  [LifecycleHooks.UPDATED]: LifecycleHook
  [LifecycleHooks.BEFORE_UNMOUNT]: LifecycleHook
  [LifecycleHooks.UNMOUNTED]: LifecycleHook
}

export function createComponentInstance(vnode: any, parent: any) {
  const instance: ComponentInternalInstance = {
    uid: uid++,
    type: vnode.type,
    vnode,
    next: null, // 需要更新的 vnode，用于更新 component 类型的组件
    props: EMPTY_OBJ,
    parent,
    root: null,
    provides: parent ? parent.provides : EMPTY_OBJ, //  获取 parent 的 provides 作为当前组件的初始化值 这样就可以继承 parent.provides 的属性了
    proxy: null,
    attrs: EMPTY_OBJ, // 存放 attrs 的数据
    slots: EMPTY_OBJ, // 存放插槽的数据
    ctx: EMPTY_OBJ, // context 对象
    refs: EMPTY_OBJ,
    setupState: EMPTY_OBJ, // 存储 setup 的返回值
    emit: () => EMPTY_OBJ,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: false,
    isUnmounted: false,
    isDeactivated: false,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null
  }
  instance.ctx = {
    _: instance
  }

  instance.root = parent ? parent.root : instance

  // 赋值 emit
  // 这里使用 bind 把 instance 进行绑定
  // 后面用户使用的时候只需要给 event 和参数即可
  instance.emit = emit.bind(null, instance) as any

  return instance
}

export function isStatefulComponent(instance: any) {
  return instance.vnode.shapeFlag & ShapeFlags.STATEFUL_COMPONENT
}

export function setupComponent(instance: any) {
  // 1. 处理 props
  // 取出存在 vnode 里面的 props
  const { props, children } = instance.vnode
  const isStateful = isStatefulComponent(instance)
  initProps(instance, props)
  // 2. 处理 slots
  initSlots(instance, children)

  // 源码里面有两种类型的 component
  // 一种是基于 options 创建的
  // 还有一种是 function 的
  // 这里处理的是 options 创建的
  // 叫做 stateful 类型
  const setupResult = isStateful ? setupStatefulComponent(instance) : undefined
  return setupResult
}

// 普通组件安装
function setupStatefulComponent(instance: any) {
  const Component = instance.type
  // 1. proxy 对象其实是代理了 instance.ctx 对象
  // 我们在使用的时候需要使用 instance.proxy 对象
  // 因为 instance.ctx 在 prod 和 dev 坏境下是不同的
  instance.proxy = markRaw(new Proxy(instance.ctx, PublicInstanceProxyHandlers))

  // 解析setup
  const { setup } = Component
  if (setup) {
    setCurrentInstance(instance)
    const setupContext = createSetupContext(instance)
    const setupResult =
      setup && setup(shallowReadonly(instance.props), setupContext)
    setCurrentInstance(null)
    // 处理setupResult 此处忽略了异步组件
    handleSetupResult(instance, setupResult)
  } else {
    finishComponentSetup(instance)
  }
}

function handleSetupResult(instance: any, setupResult: any) {
  // setup 返回值不一样的话，会有不同的处理
  // 1. 看看 setupResult 是个什么
  if (typeof setupResult === 'function') {
    // render函数处理
    // 如果返回的是 function 的话，那么绑定到 render 上
    // 认为是 render 逻辑
    // setup(){ return ()=>(h("div")) }
    instance.render = setupResult
  } else if (typeof setupResult === 'object') {
    // 普通对象处理
    // 返回的是一个对象的话
    // 先存到 setupState 上
    // 先使用 @vue/reactivity 里面的 proxyRefs
    // proxyRefs 的作用就是把 setupResult 对象做一层代理
    // 方便用户直接访问 ref 类型的值
    // 比如 setupResult 里面有个 count 是个 ref 类型的对象，用户使用的时候就可以直接使用 count 了，而不需要在 count.value
    instance.setupState = proxyRefs(setupResult)
  }

  finishComponentSetup(instance)
}

//  给 instance 设置 render
function finishComponentSetup(instance: any) {
  // 先取到用户设置的 component options
  const Component = instance.type

  if (!instance.render) {
    // todo
    // 调用 compile 模块来编译 template
    // Component.render = compile(Component.template)
    instance.render = Component.render
  }

  // 兼容vue2.x
  applyOptions()
}

// 创建setup执行上下文
function createSetupContext(instance: any) {
  return {
    attrs: instance.attrs,
    slots: instance.slots,
    emit: instance.emit,
    expose: () => {} // TODO 实现 expose 函数逻辑
  }
}

// 当前组件实例
export let currentInstance: ComponentInternalInstance | null = null

// 这个接口暴露给用户，用户可以在 setup 中获取组件实例 instance
export function getCurrentInstance(): any {
  return currentInstance
}

export function setCurrentInstance(instance: any) {
  currentInstance = instance
}
