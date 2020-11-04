import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../components/Layout.vue'
import Land from '../views/Land.vue'
import User from '../views/User.vue'
import LandOption from '../views/LandOption.vue'
import Crowdfunding from '../views/Crowdfunding.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'index',
        component: Layout,
        children: [
            {
                path: '/land',
                name: 'land',
                component: Land,
            },
            {
                path: '/land/option',
                name: 'landOption',
                component: LandOption,
            },
            {
                path: '/crowdfunding',
                name: 'crowdfunding',
                component: Crowdfunding,
            },
            {
                path: '/user',
                name: 'user',
                component: User,
            }
        ]
    }

]

const router = new VueRouter({
    mode: 'history',
    routes
})
export default router
