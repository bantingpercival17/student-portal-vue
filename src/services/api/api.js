import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { GET_USER_TOKEN } from '@/store/storeConstants'

const api = axios.create({
    baseURL: process.env.VUE_APP_API_URL
})

//  Attach Token Automatically
api.interceptors.request.use((config) => {
    const token = store.getters[`auth/${GET_USER_TOKEN}`]

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

//  Global Response Handling
api.interceptors.response.use(
    response => response,
    error => {
        const status = error.response?.status

        if (status === 401) {
            store.dispatch('auth/logout')
            router.push({ name: 'Login' })
        }
        if (status === 422) {
            console.log(error.response.data.errors)
        }
        const apiError = new Error(
            error.message
        )
        const apiResponseError = {
            status: status,
            errors: error.response
        }
        apiError.status = status
        apiError.errors = error.response || null
        throw apiResponseError
    }
)

export default api