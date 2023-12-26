import {
    createRouter,
    createWebHistory
} from "vue-router";
import MainLayout from "../layouts/MainLayout.vue";
import MyMatrices from "../views/MyMatrices.vue";

const routes = [
    {
        path: '/',
        component: MainLayout,

        children: [
            {
                path: '',
                component: MyMatrices,
            }
        ],
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