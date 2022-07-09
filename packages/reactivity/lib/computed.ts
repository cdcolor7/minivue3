import { isFuncBoolean, NOOP } from '@minivue3/shared'
import { ReactiveFlags, toRaw } from './reactive'
import { ReactiveEffect } from './effect'
import { trackRefValue, triggerRefValue, Ref } from './ref'
import { createDep } from './dep'

declare const ComputedRefSymbol: unique symbol

export interface ComputedRef<T = any> extends WritableComputedRef<T> {
  readonly value: T
  [ComputedRefSymbol]: true
}

export interface WritableComputedRef<T> extends Ref<T> {
  readonly effect: ReactiveEffect<T>
}

export type ComputedGetter = (...args: any[]) => any
export type ComputedSetter = (v: any) => void

export interface WritableComputedOptions {
  get: ComputedGetter
  set: ComputedSetter
}

export class ComputedRefImpl<T> {
  public dep?: any

  private _value!: T
  public readonly effect: ReactiveEffect<T>

  public readonly __v_isRef = true
  public readonly [ReactiveFlags.IS_READONLY]: boolean = false

  public _dirty = true
  public _cacheable: boolean

  constructor(
    getter: ComputedGetter,
    private readonly _setter: ComputedSetter,
    isReadonly: boolean
  ) {
    this.dep = createDep() // 未知原因
    this.effect = new ReactiveEffect(getter, () => {
      if (!this._dirty) {
        this._dirty = true
        triggerRefValue(this)
      }
    })
    this.effect.computed = this
    this.effect.active = this._cacheable = true // !isSSR
    this[ReactiveFlags.IS_READONLY] = isReadonly
  }

  get value() {
    // the computed ref may get wrapped by other proxies e.g. readonly() #3376
    const self = toRaw(this)
    trackRefValue(self)
    if (self._dirty || !self._cacheable) {
      self._dirty = false
      self._value = self.effect.run()!
    }
    return self._value
  }

  set value(newValue: T) {
    this._setter(newValue)
  }
}

export function computed(
  getterOrOptions: ComputedGetter | WritableComputedOptions
) {
  let getter: ComputedGetter
  let setter: ComputedSetter

  const onlyGetter = isFuncBoolean(getterOrOptions)
  if (onlyGetter) {
    getter = getterOrOptions as ComputedGetter
    setter = __DEV__
      ? () => {
          console.warn('Write operation failed: computed value is readonly')
        }
      : NOOP
  } else {
    getter = (getterOrOptions as WritableComputedOptions).get
    setter = (getterOrOptions as WritableComputedOptions).set
  }

  const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter)

  return cRef as any
}
