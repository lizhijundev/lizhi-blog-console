/**
 * @description 导入所有 vuex 模块，自动加入namespaced:true，用于解决vuex命名冲突，请勿修改。
 */
import { createStore } from 'vuex'

const modules = {}
const files = require.context('./modules', false, /\.js$/)
files.keys().forEach((key) => {
  modules[key.replace(/(modules|\/|\.|js)/g, '')] = {
    ...files(key).default,
    namespaced: true,
  }
})

const store = createStore({ modules })

export function setupStore(app) {
  app.use(store)
}
export default store
