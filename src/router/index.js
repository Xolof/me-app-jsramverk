import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import NotFound from "../views/NotFound.vue"

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/reports/week/1',
    name: 'Kmom01',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Kmom01.vue')
    },
    {
        path: "/404",
        component: NotFound
    },
    {
        path: "*",
        redirect: "/404"
    }
]

const router = new VueRouter({
  routes
})

export default router
