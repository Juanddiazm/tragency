import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './ui/Home'
import Trips from './ui/Trips'
Vue.use(VueRouter)

const routes = [
    { path: '/home', name: 'Home', component: Home },
    {
        path: '*',
        redirect: '/home'
    },
    { path: '/trips', name: 'Trips', component: Trips }
]

const router = new VueRouter({ mode: 'history', routes })

export default router