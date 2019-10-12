import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

import Projects from './components/Projects.vue'
import Now from './components/Now.vue'
import About from './components/About.vue'

import './scss/main.scss'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Projects
  },
  {
    path: '/about',
    component: About
  },
  {
    path: '/now',
    component: Now
  }
]

Vue.config.productionTip = false

const router = new VueRouter({
  routes, // short for routes: routes
  mode: 'history',
  history: true
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
