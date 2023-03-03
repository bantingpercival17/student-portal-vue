import { createStore } from 'vuex'
import auth from './module/auth'
import { SHOW_LOADING_MUTATION } from './storeConstants'
const store = createStore({
  modules: {
    auth
  },
  state() {
    return {
      showLoading: false
    }
  },
  mutations: {
    [SHOW_LOADING_MUTATION](state, payload) {
      state.showLoading = payload
    }
  }
})
export default store
