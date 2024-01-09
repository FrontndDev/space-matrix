import {
    createRouter,
    createWebHistory
} from "vue-router";
import Home from "../views/Home/Home.vue";

const baseUrl: string = '/app/matrix/v'

const routes = [
    {
        path: baseUrl,
        children: [
            {
                path: ':type?',
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

export { baseUrl }
export default router