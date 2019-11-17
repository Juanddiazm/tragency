import Vue from 'vue'
import Vuex from 'vuex'
import { router } from '../router'
import { Accounts } from 'meteor/accounts-base'

Vue.use(Vuex)

export default new Vuex.Store({

    state: {
        users: [],
        user: false,
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
                    Meteor.call("user.add", formData);
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
                    currentUser = state.users.filter(x => x.email === Meteor.user().emails[0].address )
                    commit('updateUser', currentUser[0])
                    // window.localStorage.setItem('user', currentUser[0]);
                    console.log('User in storage: ', state.user)
                    router.push('home')
                }
            })
        },
        logout({ commit }) {
            Meteor.logout(() => {
                // window.localStorage.removeItem('user');
                commit('updateUser', false)
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