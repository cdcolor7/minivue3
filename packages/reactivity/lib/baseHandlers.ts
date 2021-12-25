import {
  extend,
  hasChanged,
  hasOwn,
  isArray,
  isObject
} from '@mini-dev-vue3/shared'
import { ReactiveFlags, readonly, reactive } from './reactive'
import { Target } from './reactive'

const get = createGetter()
const shallowGet = createGetter(false, true)
const readonlyGet = createGetter(true)
const shallowReadonlyGet = createGetter(true, true)

const set = createSetter()
const shallowSet = createSetter(true)

// 对象proxy
export const mutableHandlers: ProxyHandler<object> = {
  get,
  set,
  deleteProperty
}

// 对象proxy -- readonly
export const readonlyHandlers: ProxyHandler<object> = {
  get: readonlyGet,
  set(target, key) {
    if (__DEV__) {
      console.warn(
        `Set operation on key "${String(key)}" failed: target is readonly.`,
        target
      )
    }
    return true
  },
  deleteProperty(target, key) {
    if (__DEV__) {
      console.warn(
        `Delete operation on key "${String(key)}" failed: target is readonly.`,
        target
      )
    }
    return true
  }
}

// 对象浅层proxy
export const shallowReactiveHandlers = /*#__PURE__*/ extend(
  {},
  mutableHandlers,
  {
    get: shallowGet,
    set: shallowSet
  }
)

// 对象浅层proxy -- readonly
export const shallowReadonlyHandlers = /*#__PURE__*/ extend(
  {},
  readonlyHandlers,
  {
    get: shallowReadonlyGet
  }
)

// 实现 readonly只读  shallow 浅代理 深层代码
function createGetter(isReadonly = false, shallow = false) {
  return function get(target: Target, key: string) {
    if (key === ReactiveFlags.IS_REACTIVE) {
      return !isReadonly
    } else if (key === ReactiveFlags.IS_READONLY) {
      return isReadonly
    } else if (key === ReactiveFlags.RAW) {
      return target
    }
    const res = Reflect.get(target, key)
    // if (!isReadonly) {
    //   track(target, TrackOpTypes.GET, key)
    // }
    if (shallow) {
      return res
    }
    if (isObject(res)) {
      return isReadonly ? readonly(res) : reactive(res)
    }
    return res
  }
}

// shallow 浅代理 深层代码
function createSetter(shallow = false) {
  return function set(target: object, key: string, value: unknown) {
    let oldValue = (target as any)[key]
    const hadKey = isArray(target)
      ? Number(key) < target.length
      : hasOwn(target, key)
    const result = Reflect.set(target, key, value)
    if (!hadKey) {
      // trigger(target, TriggerOpTypes.ADD, key, value)
    } else if (hasChanged(value, oldValue)) {
      // trigger(target, TriggerOpTypes.SET, key, value, oldValue)
    }
    return result
  }
}

// 属性删除
function deleteProperty(target: object, key: string): boolean {
  const hadKey = hasOwn(target, key)
  // const oldValue = (target as any)[key]
  const result = Reflect.deleteProperty(target, key)
  if (result && hadKey) {
    // trigger(target, TriggerOpTypes.DELETE, key, undefined, oldValue)
  }
  return result
}
