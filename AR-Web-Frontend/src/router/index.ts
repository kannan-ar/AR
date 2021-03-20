import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/layouteditor/:pId',
    name: 'LayoutEditor',
    component: () => import('../views/LayoutEditor.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
