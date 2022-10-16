import App from './App'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)
const app = new Vue({
    ...App
})
app.$mount()
// #endif

import request from 'utils/request.js'
import getToken from 'utils/login.js'
import lang from 'utils/lang.js'

Vue.prototype.$request = request
Vue.prototype.$checkToken = getToken
Vue.prototype.$lang = lang

var langs = uni.getStorageSync('lang');
langs = langs=='zn'?'zn':'cn'
uni.setStorageSync('lang',langs)

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif