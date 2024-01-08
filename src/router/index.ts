import {
    createRouter,
    createWebHistory
} from "vue-router";
import Home from "../views/Home/Home.vue";

const baseUrl = import.meta.env.VITE_VUE_APP_BASE_ROUTER_URL

const routes = [
    {
        path: baseUrl,
        children: [
            {
                path: '/:type?',
                component: Home,
            },
            // {
            //     name: 'NotFound',
            //     path: ':pathMatch(.*)*',
            //     component: NotFound
            // },
        ]
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router