import Vue from 'vue'
import VueRouter from 'vue-router'
import VHttp from 'vue-resource'
import App from './App.vue'
import VRoute from './router'
const router = new VueRouter(VRoute)
Vue.use(VueRouter)
Vue.use(VHttp)
Vue.filter('filterName', (str) => {
  if (str instanceof Array) {
    let res = []
    for (let i = 0; i < str.length; i++) {
      res.push(str[i].name)
    }
    res = res.join('、')
    return res
  }
  return '未知'
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
