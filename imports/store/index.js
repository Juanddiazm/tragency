import Vue from 'vue'
import Vuex from 'vuex'
import { router } from '../router'
import { Accounts } from 'meteor/accounts-base'

Vue.use(Vuex)

/**
 * Clase Store de Vuex 
 */
export default new Vuex.Store({
    //Diferentes estados y datos disponibles para toda la aplicacion
    state: {
        //Se usa para obtener todos los usarios con su informacion completa
        users: [],
        //Se usa para saber que usuario esta actualmente logueado
        user: false,
        //Se usa para que archivo BuyTrip sepa que viaje se quiere comprar.
        itemTrip: null
    },
    //Permiten editar directamente los estados arriba definidos
    mutations: {
        updateUsers(state, value) {
            state.users = value
        },
        updateUser(state, value) {
            state.user = value
        },
        isUsernameValid(state, value) {
            state.isUsernameValid = value
        },
        updateItemTrip(state, value) {
            state.itemTrip = value
        }
    },
    //Metodos que afectan las mutaciones 
    actions: {
        //Permite hacer el registro de un usario usando la clase de Meteor Accounts
        //Como parametro: formData -> Json con los datos del usuario
        submitRegisterForm({ commit, state }, formData) {
            Accounts.createUser(formData, error => {
                if (error) {
                    console.log(error.reason)
                } else {
                    //Se llama el metodo de User.js que tiene el metodo que permite añadir usarios a la collecion user
                    Meteor.call("user.add", formData);
                    console.log('user registered')
                    router.push('login')
                }
            })
        },
        //Permite que un usuario se pueda loguear en la aplicacion usa la clase de Meteor
        //Como parametro: formData -> Json con los datos del usuario 
        submitLoginForm({ commit, state }, formData) {
            Meteor.loginWithPassword(formData.email, formData.password, error => {
                if (error) {
                    console.log(error.reason)
                } else {
                    //Se hace un filtrado para obtener un usuario por su email
                    currentUser = state.users.filter(x => x.email === Meteor.user().emails[0].address)
                   //Se define el usario actual logueado
                    commit('updateUser', currentUser[0])
                    // window.localStorage.setItem('user', currentUser[0]);
                    console.log('User in storage: ', state.user)
                    //Se le redirige a la pagina principal
                    router.push('home')
                }
            })
        },
        //Permite cerrar sesion usa metodos de Meteor 
        logout({ commit }) {
            Meteor.logout(() => {
                // window.localStorage.removeItem('user');}
                //Define el usuario en falso
                commit('updateUser', false)
                console.log('user logged out')
            })
        }

    },
    //Esto en realidad no lo uso pero por si acaso.
    getters: {
        user(state) {
            return state.user
        },
    }
})