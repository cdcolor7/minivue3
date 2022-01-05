export interface SchedulerJob extends Function {
  id?: number
  active?: boolean
  computed?: boolean
  allowRecurse?: boolean
  ownerInstance?: any
}

const queue: SchedulerJob[] = []

const p = Promise.resolve()
let isFlushPending = false

export function nextTick(fn: any) {
  return fn ? p.then(fn) : p
}

export function queueJob(job: SchedulerJob) {
  if (!queue.includes(job)) {
    queue.push(job)
    // 执行所有的 job
    queueFlush()
  }
}

function queueFlush() {
  // 如果同时触发了两个组件的更新的话
  // 这里就会触发两次 then （微任务逻辑）
  // 但是着是没有必要的
  // 我们只需要触发一次即可处理完所有的 job 调用
  // 所以需要判断一下 如果已经触发过 nextTick 了
  // 那么后面就不需要再次触发一次 nextTick 逻辑了
  if (isFlushPending) return
  isFlushPending = true
  nextTick(flushJobs)
}

const getId = (job: SchedulerJob): number =>
  job.id == null ? Infinity : job.id

// 一下执行更新
function flushJobs() {
  isFlushPending = false
  queue.sort((a, b) => getId(a) - getId(b))
  let job

  while ((job = queue.shift())) {
    if (job) {
      job()
    }
  }
}