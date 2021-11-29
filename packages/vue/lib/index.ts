import { reactive1 } from '@mini-dev-vue3/reactivity';
import { testOne } from './other.js'
export function createApp() {
    const test = testOne(1)
    console.log(reactive1('1212'));
    return test
}
