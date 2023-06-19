import { APPLICANT_LOGIN_ACTION, AUTH_ACTION, AUTO_LOGIN_ACTION, GET_USER_IMAGE, GET_USER_TOKEN, GET_USER_NAME, IS_USER_AUTHENTICATE_GETTER, LOGIN_ACTION, LOGOUT_ACTION, SET_USER_TOKEN_MUTATION, TESTING_ACTION } from '@/store/storeConstants'
import axios from 'axios'
import LoginValidation from '@/services/validation/LoginValidation.js'
export default {
    namespaced: true,
    state() {
        return {
            userId: '',
            name: '',
            email: '',
            token: '',
            image: ''
        }
    },
    mutations: {
        [SET_USER_TOKEN_MUTATION](state, payload) {
            state.email = payload.email
            state.name = payload.name
            state.token = payload.token
            state.image = payload.image
            state.userId = payload.userId
        }
    },
    getters: {
        [GET_USER_IMAGE]: (state) => {
            return state.image
        },

        [GET_USER_TOKEN]: (state) => {
            return state.token
        },

        [IS_USER_AUTHENTICATE_GETTER]: (state) => {
            return !!state.token
        },
        [GET_USER_NAME]: (state) => {
            return state.name
        }
    },
    actions: {
        [LOGOUT_ACTION](context) {
            const tokenData = {
                userId: null,
                email: null,
                name: null,
                token: null,
                image: null
            }
            context.commit(SET_USER_TOKEN_MUTATION, tokenData)
            localStorage.removeItem('userData')
        },

        async [LOGIN_ACTION](context, payload) {
            return context.dispatch(AUTH_ACTION, {
                ...payload,
                url: 'student/login'
            })
        },
        async [APPLICANT_LOGIN_ACTION](context, payload) {
            return context.dispatch(AUTH_ACTION, {
                ...payload,
                url: 'applicant/login'
            })
        },
        [AUTO_LOGIN_ACTION](context) {
            const userData = localStorage.getItem('userData')
            if (userData) {
                context.commit(SET_USER_TOKEN_MUTATION, JSON.parse(userData))
            }
        },

        async [AUTH_ACTION](context, payload) {
            let response = ''
            try {
                response = await axios.post(payload.url, {
                    email: payload.email,
                    password: payload.password
                })
                if (response.status === 200) {
                    const tokenData = {
                        userId: response.data.student.account.student_id,
                        email: response.data.student.account.email,
                        name: response.data.student.account.student.first_name,
                        token: response.data.token,
                        image: response.data.student.profile_picture
                    }
                    localStorage.setItem('userData', JSON.stringify(tokenData))
                    context.commit(SET_USER_TOKEN_MUTATION, tokenData)
                    console.log('Save Detials')
                }
            } catch (error) {
                console.log(error)
                console.log(error.response)
                const errorMessage = LoginValidation.serverError(error.response)
                /* const errorMessage = 'Server Offline' */
                console.log(errorMessage)
                throw errorMessage
            }
        }
    }
}