import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//引入axios,并加到原型链中
import axios from 'axios'
Vue.prototype.$axios = axios
import QS from 'qs'
Vue.prototype.qs = QS
Vue.use(ElementUI)
Vue.config.productionTip = false

router.beforeEach((to,from,next)=>{
	document.title = '智能通风控制系统'
	next()
})

new Vue({
	router,
  render: h => h(App),
}).$mount('#app')


