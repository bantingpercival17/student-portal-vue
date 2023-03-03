import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import globalComponent from './assets/plugins/global-components.js'
import axios from './axios'
createApp(App).use(store).use(router).use(globalComponent).use(axios).mount('#app')
