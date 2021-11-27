import { reactive1 } from '@mini-dev-vue3/reactivity';


const createApp = function() {
    const reactive = reactive1<string>('createApp')
    return reactive
}
export {
    createApp
}
