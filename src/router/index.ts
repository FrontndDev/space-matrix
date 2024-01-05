import {
    createRouter,
    createWebHistory
} from "vue-router";
import Home from "../views/Home/Home.vue";

const routes = [
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

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router