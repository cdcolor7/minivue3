import { reactive1 } from '@mini-dev-vue3/reactivity';
import { testOne } from './other.js'
const createApp = function() {
    const reactive = reactive1('1212')
    const test = testOne(1)
    console.log(test);
    return reactive
}
export {
    createApp
}
