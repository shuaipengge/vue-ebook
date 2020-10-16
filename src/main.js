import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './lang'
// 导入字体图标
import './assets/styles/icon.css'
// 引入全局样式
import './assets/styles/global.scss'
// rem基准
import 'amfe-flexible'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
