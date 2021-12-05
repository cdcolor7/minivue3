export * from './patchFlags'
export * from './shapeFlags'
export * from './slotFlags'


export const isArray = Array.isArray
export const isObject = (val: unknown) => {
    return val !== null && typeof val === 'object'
}
