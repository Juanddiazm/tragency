import Vue from 'vue'
import Vuex from 'vuex'
import { router } from '../router'


Vue.use(Vuex)

export default new Vuex.Store({

    state: {
        userLog: null,
        admin: true,
        status: null,
        error: null,
    },
    mutations: {
        setUser(state, payload) {
            state.userLog = payload
        },
        removeUser(state) {
            state.userLog = null
        },
        setStatus(state, payload) {
            state.status = payload
        },
        setError(state, payload) {
            state.error = payload
        },
        setAdmin(state, payload) {
            state.admin = payload
        }
    },
    actions: {
        signUpAction({ commit }, payload, users) {
            console.log(users, payload)
            commit('setStatus', 'loading')
            var p1 = new Promise(
                function (resolve, reject) {
                    console.log(users)
                    users.forEach(element => {
                        if (element.email === payload.email) {
                            resolve(true);
                        }
                    });
                }
            )
            p1.then(registered => {
                if (registered) {
                    alert('The email is already registered')
                    commit('setStatus', 'failure')
                } else {
                    Meteor.call("user.add", payload);
                    alert('Successfully registered')
                    commit('setStatus', 'success')
                    commit('setError', null)
                    router.push('/login')
                }
            })
        }

        ,
        signInAction({ commit }, payload) {
            for (let index = 0; index < user.length; index++) {
                if (payload.email === user[index].email) {
                    if (user[index].isAdmin === true) {
                        commit('setAdmin', user[index])
                        sessionStorage.setItem('user', user[index]);
                        commit('setStatus', 'success')
                        commit('setError', null)
                        alert('Loggin!')
                        router.push('/home')
                    } else {
                        commit('setUser', user[index])
                        sessionStorage.setItem('user', user[index]);
                        commit('setStatus', 'success')
                        commit('setError', null)
                        alert('Loggin!')
                        router.push('/home')

                    }
                }
            }
            console.log(admin, userLog)
            if (admin == null && userLog == null) {
                alert('Login failed!')
                commit('setStatus', 'failure')
            }

        },
        signOutAction({ commit }) {
            alert('You have successfully left')
            router.push('/')
            commit('setUser', null)
            commit('setAdmin', null)
            sessionStorage.removeItem('user')
            commit('setStatus', 'success')
            commit('setError', null)
        },
    },
    getters: {
        status(state) {
            return state.status
        },

        user(state) {
            return state.user
        },

        error(state) {
            return state.error
        },
    }
})