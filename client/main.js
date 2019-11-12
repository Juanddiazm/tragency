import  { Meteor } from  'meteor/meteor'
import  Vue from 'vue'
import  Vuetify from  'vuetify'
import 'vuetify/dist/vuetify.css'
import store from '../imports/store'
import VueMeteorTracker  from 'vue-meteor-tracker'
import { router }  from  '../imports/router'
import App from  '../imports/ui/App'
import './main.html'

Vue.use(Vuetify)
const opts = {}
const vuetify = new Vuetify(opts)
Vue.use(VueMeteorTracker)

Meteor.startup(() => {
   new Vue ({
     el: "#app", 
     vuetify,
     router,
     store,
     ...App
   }) 
})