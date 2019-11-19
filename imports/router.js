import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './ui/Home'
import Trips from './ui/Trips'
import Testimonials from './ui/Testimonials'
import Register from './ui/Register'
import Login from './ui/Login'
import BuyTrip from './ui/BuyTrip'

Vue.use(VueRouter)
//El router de la aplicacion 
export const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        { path: '/home', name: 'Home', component: Home },

        { path: '/trips', name: 'Trips', component: Trips },

        { path: '/testimonials', name: 'Testimonials', component: Testimonials },

        { path: '/register', name: 'Register', component: Register },

        { path: '/login', name: 'Login', component: Login },

        { path: '/buyTrip', name: 'BuyTrip', component: BuyTrip },
        {
            path: '*',
            redirect: '/home'
        },
    ]

})