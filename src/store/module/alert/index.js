import {
    SUCCESS_ALERT,
    INFO_ALERT,
    ERROR_ALERT,
    WARNING_ALERT, ENCRYPT_DATA, DECRYPT_DATA
} from '@/store/storeAlertConstants.js'
import Swal from 'sweetalert2'
export default {
    name: 'alert',
    namespaced: true,
    actions: {
        [SUCCESS_ALERT](context, data) {
            // Use sweetalert2
            Swal.fire({
                icon: 'success',
                title: '',
                text: data.message,
                confirmButtonText: 'OK'
            })
        },
        [INFO_ALERT](context, data) {
            // Use sweetalert2
            let content = {
                icon: 'info',
                title: 'Info!',
                text: data.message,
                confirmButtonText: 'OK'
            }

            if (data.htmlTag) {
                if (data.htmlTag === true) {
                    content = {
                        icon: 'info',
                        title: 'Info!',
                        html: data.message,
                        confirmButtonText: 'OK'
                    }
                }
            }
            Swal.fire(content)
        },
        [WARNING_ALERT](context, data) {
            // Use sweetalert2
            Swal.fire({
                icon: 'Warning',
                title: 'Warning Message!',
                text: data.message,
                confirmButtonText: 'OK'
            })
        },
        [ERROR_ALERT](context, data) {
            // Use sweetalert2
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: data.message,
                confirmButtonText: 'OK'
            })
        },
        [ENCRYPT_DATA](data) {
            return btoa(data)
        },
        [DECRYPT_DATA](data) {
            console.log(data)
            /* return atob(data) */
        }
    }
}