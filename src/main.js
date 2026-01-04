import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import globalComponent from './assets/plugins/global-components.js'
import axios from './axios'
import db from './store/database/index.js'
import Swal from 'sweetalert2'

// Create a global Toast instance on window
window.Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

createApp(App).use(store).use(router).use(globalComponent).use(axios).use(db).mount('#app')
