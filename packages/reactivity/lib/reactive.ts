import { def } from '@mini-dev-vue3/shared'

export const enum ReactiveFlags {
  SKIP = '__v_skip', // 标记一个对象，使其永远不会转换为 proxy
  IS_REACTIVE = '__v_isReactive', // 标记一个对象，由 reactive 创建的响应式代理
  IS_READONLY = '__v_isReadonly', // 标记一个对象，由 readonly 创建的只读代理
  RAW = '__v_raw' // 保存代理对象的原始对象
}

export interface Target {
  [ReactiveFlags.SKIP]?: boolean
  [ReactiveFlags.IS_REACTIVE]?: boolean
  [ReactiveFlags.IS_READONLY]?: boolean
  [ReactiveFlags.RAW]?: any
}

//  reactive 函数实现
export function reactive(target: object) {
  return createReactiveObject(target)
}

function createReactiveObject(
  target: Target,
  isReadonly?: boolean,
  baseHandlers?: ProxyHandler<any>,
  collectionHandlers?: ProxyHandler<any>,
  proxyMap?: WeakMap<Target, any>
) {
  /* 对象代码 */
}

// 检查对象是否是由 reactive 创建的响应式代理
export function isReactive(value: unknown): boolean {
  if (isReadonly(value)) {
    return isReactive((value as Target)[ReactiveFlags.RAW])
  }
  return !!(value && (value as Target)[ReactiveFlags.IS_REACTIVE])
}

// 检查对象是否是由 readonly 创建的只读代理
export function isReadonly(value: unknown): boolean {
  return !!(value && (value as Target)[ReactiveFlags.IS_READONLY])
}

// 检查对象是否是由 reactive 或 readonly 创建的 proxy
export function isProxy(value: unknown): boolean {
  return isReactive(value) || isReadonly(value)
}

// 返回 reactive 或 readonly 代理的原始对象
export function toRaw<T>(observed: T): T {
  const raw = observed && (observed as Target)[ReactiveFlags.RAW]
  return raw ? toRaw(raw) : observed
}

// 标记一个对象，使其永远不会转换为 proxy。返回对象本身。
export function markRaw<T extends object>(value: T): T {
  def(value, ReactiveFlags.SKIP, true)
  return value
}

// export const toReactive = <T extends unknown>(value: T): T =>
//   isObject(value) ? reactive(value) : value

// export const toReadonly = <T extends unknown>(value: T): T =>
//   isObject(value) ? readonly(value as Record<any, any>) : value
