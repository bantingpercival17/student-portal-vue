import {
  APPLICANT_LOGIN_ACTION,
  AUTH_ACTION,
  AUTO_LOGIN_ACTION,
  GET_USER_IMAGE,
  GET_USER_TOKEN,
  GET_USER_NAME,
  IS_USER_AUTHENTICATE_GETTER,
  LOGIN_ACTION,
  LOGOUT_ACTION,
  SET_USER_TOKEN_MUTATION,
  APPLICANT_REGISTRATION_ACTION,
  GET_USER_TYPE,
  GET_NAV_ITEM
} from '@/store/storeConstants'
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
      userType: '',
      image: '',
      navItem: false
    }
  },
  mutations: {
    [SET_USER_TOKEN_MUTATION](state, payload) {
      state.email = payload.email
      state.name = payload.name
      state.token = payload.token
      state.image = payload.image
      state.userId = payload.userId
      state.userType = payload.userType
      state.navItem = payload.navItem
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
    },
    [GET_USER_NAME]: (state) => {
      return state.name
    },
    [GET_USER_TYPE]: (state) => {
      return state.userType
    },
    [GET_NAV_ITEM]: (state) => {
        return state.navItem
      }
  },
  actions: {
    [LOGOUT_ACTION](context) {
      const tokenData = {
        userId: null,
        email: null,
        name: null,
        token: null,
        image: null,
        navItem: false
      }
      context.commit(SET_USER_TOKEN_MUTATION, tokenData)
      localStorage.removeItem('userData')
    },

    async [LOGIN_ACTION](context, payload) {
      return context.dispatch(AUTH_ACTION, {
        ...payload,
        url: 'student/login',
        userType: 'student'
      })
    },
    async [APPLICANT_LOGIN_ACTION](context, payload) {
      return context.dispatch(AUTH_ACTION, {
        ...payload,
        url: 'applicant/login',
        userType: 'applicant'
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
          const userName = payload.userType === 'student' ? response.data.student.first_name : response.data.student.account.name
          const nav = payload.userType === 'student' && !!response.data.student.comprehensive_examination
          const tokenData = {
            userId: response.data.student.id,
            email: response.data.email,
            name: userName,
            userType: payload.userType,
            token: response.data.token,
            image: response.data.profile_picture,
            navItem: nav
          }
          console.log(tokenData)
          localStorage.setItem('userData', JSON.stringify(tokenData))
          context.commit(SET_USER_TOKEN_MUTATION, tokenData)
          console.log('Save Detials')
        }
      } catch (error) {
        console.log(error)
        const errorMessage = LoginValidation.serverError(error.response)
        /* const errorMessage = 'Server Offline' */
        console.log(errorMessage)
        throw errorMessage
      }
    },
    async [APPLICANT_REGISTRATION_ACTION](context, payload) {
      let response = ''
      try {
        response = await axios.post('applicant/register', payload)
        if (response.status === 200) {
          console.log('Registration Complete')
          return response
        }
      } catch (error) {
        console.log('Auth Module ' + error)
        /* const errorMessage = LoginValidation.serverError(error.response)
        console.log(errorMessage)
        throw errorMessage */
        throw error
      }
    }
  }
}
