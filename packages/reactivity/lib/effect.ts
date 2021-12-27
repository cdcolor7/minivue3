import { extend } from '@mini-dev-vue3/shared'

export interface DebuggerOptions {
  onTrack?: (event: any) => void
  onTrigger?: (event: any) => void
}

export type EffectScheduler = (...args: any[]) => any

export interface ReactiveEffectOptions extends DebuggerOptions {
  lazy?: boolean
  scheduler?: EffectScheduler
  scope?: any
  allowRecurse?: boolean
  onStop?: () => void
}

export interface ReactiveEffectRunner<T = any> {
  (): T
  effect: ReactiveEffect
}

export function effect<T = any>(
  fn: () => T,
  options?: ReactiveEffectOptions
): ReactiveEffectRunner {
  const _effect = new ReactiveEffect(fn)
  // 把用户传过来的值合并到 _effect 对象上去
  if (options) {
    extend(_effect, options)
  }

  // 执行effect
  if (!options || !options.lazy) {
    _effect.run()
  }

  // 返回_effect.run 让用户可以自行选择调用的时机（调用 fn）
  const runner = _effect.run.bind(_effect) as ReactiveEffectRunner
  runner.effect = _effect
  return runner
}

const effectStack: ReactiveEffect[] = []
let activeEffect: ReactiveEffect | undefined

export class ReactiveEffect<T = any> {
  active = true
  deps: any[] = []
  onStop?: () => void

  constructor(
    public fn: () => T,
    public scheduler: EffectScheduler | null = null,
    scope?: any
  ) {}

  run() {
    if (!this.active) {
      return this.fn()
    }
    /*
      开发中
    */
    const result = this.fn()
    return result
  }

  stop() {
    if (this.active) {
      // 这是为了防止重复的调用，执行 stop 逻辑
      cleanupEffect(this)
      if (this.onStop) {
        this.onStop()
      }
      this.active = false
    }
  }
}

export function stop(runner: ReactiveEffectRunner) {
  runner.effect.stop()
}

// 找到所有依赖这个 effect 的响应式对象
// 从这些响应式对象里面把 effect 给删除掉
function cleanupEffect(effect: ReactiveEffect) {
  const { deps } = effect
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].delete(effect)
    }
    deps.length = 0
  }
}

// 依赖收集
export function track(target: object, type: any, key: unknown) {}

// 触发更新
export function trigger(
  target: object,
  type: any,
  key?: unknown,
  newValue?: unknown,
  oldValue?: unknown,
  oldTarget?: Map<unknown, unknown> | Set<unknown>
) {}
