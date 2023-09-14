import {createRouter, createWebHistory} from 'vue-router'
import Layout from "@/layout/Layout";




const routes = [
    {
        path: '/',
        name: 'Layout',
        component: Layout,
        redirect: "/home",
        children: [
            {
                path: 'home',
                name: 'Home',
                component: () => import("@/views/Home"),
            },
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import("@/views/Login")
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import("@/views/Register")
    },

    {
        path: '/knnpush',
        name: 'KNNpush',
        component: () => import("../views/KNNpush"),
    },

    {
        path: '/knndp',
        name: 'KNNdp',
        component: () => import("../views/KNNdp"),
    },

    {
        path: '/lrpush',
        name: 'LRpush',
        component: () => import("../views/LRpush"),
    },

    {
        path: '/lrdp',
        name: 'LRdp',
        component: () => import("../views/LRdp"),
    },
]




const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})


// 在刷新页面的时候重置当前路由
activeRouter()

function activeRouter() {
    const userStr = sessionStorage.getItem("user")
}

router.beforeEach((to, from, next) => {
    if (to.path === '/login' || to.path === '/register') {
        next()
        return
    }
    let user = sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user")) : {}
    if (!user.permissions || !user.permissions.length) {
        next('/login')
    } else {
        next()
    }
})

export default router
