export const enum ReactiveFlags {
  SKIP = '__v_skip',
  IS_REACTIVE = '__v_isReactive',
  IS_READONLY = '__v_isReadonly',
  RAW = '__v_raw'
}

export interface Target {
  [ReactiveFlags.SKIP]?: boolean
  [ReactiveFlags.IS_REACTIVE]?: boolean
  [ReactiveFlags.IS_READONLY]?: boolean
  [ReactiveFlags.RAW]?: any
}

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
