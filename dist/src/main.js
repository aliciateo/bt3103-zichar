import Vue from 'vue'
import App from './components/App.vue'
import QC from './components/QuantityCounter.vue'
import PC from './components/PageContent.vue'
import basket from './components/Basket.vue'
import VueRouter from 'vue-router'
import Routes from './routes.js'


Vue.config.productionTip = false
Vue.component('QC',QC)
Vue.component('PC',PC)
Vue.component('basket',basket)
Vue.use(VueRouter)

const myRouter = new VueRouter({
  routes:Routes,
  mode:'history'
}) 

new Vue({
  render: h => h(App),
  router:myRouter
}).$mount('#app')