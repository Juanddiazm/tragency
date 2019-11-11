import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './ui/Home'
import Trips from './ui/Trips'
import Testimonials from './ui/Testimonials'

Vue.use(VueRouter)

const routes = [
    { path: '/home', name: 'Home', component: Home },
    {
        path: '*',
        redirect: '/home'
    },
    { path: '/trips', name: 'Trips', component: Trips },
    { path: '/testimonials', name: 'Testimonials', component: Testimonials }
]

const router = new VueRouter({ mode: 'history', routes })

export default router