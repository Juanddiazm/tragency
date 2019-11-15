import Vue from 'vue'
import Vuex from 'vuex'
import { router } from '../router'
import { Accounts } from 'meteor/accounts-base'

Vue.use(Vuex)

export default new Vuex.Store({

    state: {
        users: [],
        user: null,
    },
    mutations: {
        updateUsers(state, value) {
            console.log('users state mutated')
            state.users = value
        },
        updateUser(state, value) {
            state.user = value
        },
        isUsernameValid(state, value) {
            state.isUsernameValid = value
        }
    },
    actions: {
        submitRegisterForm({ commit, state }, formData) {
            Accounts.createUser(formData, error => {
                if (error) {
                    console.log(error.reason)
                } else {

                    console.log('user registered')
                    router.push('login')
                }
            })
        },
        submitLoginForm({ commit, state }, formData) {
            Meteor.loginWithPassword(formData.email, formData.password, error => {
                if (error) {
                    console.log(error.reason)
                } else {
                    commit('updateUser', Meteor.user())
                    console.log('user logged in', state.user)
                    router.push('home')
                }
            })
        },
        logout({ commit }) {
            Meteor.logout(() => {
                commit('updateUser', null)
                console.log('user logged out')
            })
        }

    },
    getters: {
        user(state) {
            return state.user
        },
    }
})