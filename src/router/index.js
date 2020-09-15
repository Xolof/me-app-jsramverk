import Vue from 'vue'
import VueRouter from 'vue-router'
import Presentation from '../views/Presentation.vue'
import NotFound from "../views/NotFound.vue"

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Presentation',
    component: Presentation
  },
  {
    path: '/reports',
    name: 'Rapporter',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Reports.vue')
    },
    {
        path: "/register",
        name: "Registrera",
        component: () => import("../views/Register.vue")
    },
    {
        path: "/login",
        name: "Logga in",
        component: () => import("../views/Login.vue")
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
