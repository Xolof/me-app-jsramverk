import Vue from 'vue'
import VueRouter from 'vue-router'
import Presentation from '../views/Presentation.vue'
import NotFound from "../views/NotFound.vue"

import VueSocketIo from 'vue-socket.io';
import chatStore from '../store/chat.js';

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
        path: "/chat",
        name: "Chatt",
        component: () => import("../views/Chat.vue"),
        beforeEnter: async (to, from, next) => {
            await Vue.nextTick()
            if (!router.app.chatNick) {
                next("/chat-sign-in");
                return
            }

            if (!Vue.prototype.$socket) {
                let url = "https://socket-server.oljo.me";
                if (process.env.NODE_ENV === "development") {
                    url = "http://localhost:8300";
                }
                Vue.use(VueSocketIo, url, chatStore);
            }
            next();
        }
    },
    {
        path: "/chat-sign-in",
        name: "Anslut till chatten",
        component: () => import("../views/ChatSignIn.vue")
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
