import {
    createRouter,
    createWebHistory
} from "vue-router";
import Home from "@/views/Home/Home.vue";


const baseUrl: string = '/app/big-money-club'

const routes = [
    {
        path: baseUrl,
        children: [
            {
                path: ':id?',
                component: Home,
            },
        ]
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export { baseUrl }
export default router