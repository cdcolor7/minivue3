import {
  ComputedRef,
  DebuggerOptions,
  EffectScheduler,
  isReactive,
  isRef,
  ReactiveEffect,
  Ref
} from '@minivue3/reactivity'
import { EMPTY_OBJ, isFunction, NOOP } from '@minivue3/shared'
import { currentInstance } from './component'
import { callWithAsyncErrorHandling, ErrorCodes } from './errorHandling'
import { queueJob, SchedulerJob } from './scheduler'

type OnCleanup = (cleanupFn: () => void) => void

export type WatchEffect = (onCleanup: OnCleanup) => void

export type WatchSource<T = any> = Ref<T> | ComputedRef<T> | (() => T)

export type WatchCallback<V = any, OV = any> = (
  value: V,
  oldValue: OV,
  onCleanup: OnCleanup
) => any

export interface WatchOptionsBase extends DebuggerOptions {
  flush?: 'pre' | 'post' | 'sync'
}

export interface WatchOptions<Immediate = boolean> extends WatchOptionsBase {
  immediate?: Immediate
  deep?: boolean
}

export type WatchStopHandle = () => void

const INITIAL_WATCHER_VALUE = {}

export function watchEffect(
  effect: WatchEffect,
  options?: WatchOptionsBase
): WatchStopHandle {
  // return doWatch(effect, null)
  return doWatch(effect, null, options)
}

export function watch<T = any, Immediate extends Readonly<boolean> = false>(
  source: T | WatchSource<T>,
  cb: any,
  options?: WatchOptions<Immediate>
): WatchStopHandle {
  // return doWatch(source as any, cb)
  return doWatch(source as any, cb, options)
}

function doWatch(
  source: WatchSource | WatchEffect | object,
  cb: WatchCallback | null,
  { immediate }: WatchOptions = EMPTY_OBJ
): WatchStopHandle {
  const instance = currentInstance
  let getter: () => any

  if (isRef(source)) {
    getter = () => source.value
  } else if (isReactive(source)) {
    getter = () => source
  } else if (isFunction(source)) {
    getter = () => {
      if (instance && instance.isUnmounted) {
        return
      }
      return callWithAsyncErrorHandling(
        source,
        instance,
        ErrorCodes.WATCH_CALLBACK
      )
    }
  } else {
    getter = NOOP
  }

  let oldValue = INITIAL_WATCHER_VALUE
  const job: SchedulerJob = () => {
    if (!effect.active) {
      return
    }
    if (cb) {
      const newValue = effect.run()
      callWithAsyncErrorHandling(cb, instance, ErrorCodes.WATCH_CALLBACK, [
        newValue,
        oldValue === INITIAL_WATCHER_VALUE ? undefined : oldValue
      ])
      oldValue = newValue
    } else {
      effect.run()
    }
  }

  job.allowRecurse = !!cb

  let scheduler: EffectScheduler
  scheduler = () => queueJob(job)

  const effect = new ReactiveEffect(getter, scheduler)

  if (cb && immediate) {
    job()
  }
  effect.run()

  return () => {
    effect.stop() // 取消 watch
  }
}
