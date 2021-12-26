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

export function effect<T = any>(
  fn: () => T,
  options?: ReactiveEffectOptions
): any {
  /***/
}
