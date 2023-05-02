<template>
    <h2>Performance Report</h2>
</template>
<script>
/* import loadingPage from './mopm-loading-view.vue'
import labelComponent from '@/components/main-layouts/components/widgets/label-component.vue'
import inputComponentV2 from '@/components/main-layouts/components/widgets/input-component-v2.vue'
import textAreaComponent from '@/components/main-layouts/components/widgets/text-area-component.vue' */
import { GET_USER_TOKEN, IS_USER_AUTHENTICATE_GETTER, SHOW_LOADING_MUTATION } from '@/store/storeConstants'
import { mapGetters, mapMutations } from 'vuex'
import Swal from 'sweetalert2'
import axios from 'axios'
export default {
    name: 'ShipboardMonitoringOverview',
    data() {
        return {
            isLoading: true,
            shipboardInformation: [],
            errors: []
        }
    },
    /*  components: {
         labelComponent,
         inputComponentV2,
         textAreaComponent,
         loadingPage
     }, */
    computed: {
        ...mapGetters('auth', {
            token: GET_USER_TOKEN,
            isAuth: IS_USER_AUTHENTICATE_GETTER
        })
    },
    mounted() {
        const link = window.location.link
        console.log(link)
        /* axios.get('/student/onboard/performance', {
            headers: {
                Authorization: 'Bearer ' + this.token
            }
        }).then((response) => {
            const data = response.data.data
            console.log(data)
            this.shipboardInformation = data.shipboard_information
            console.log(this.shipboardInformation)
            this.isLoading = false
        }).catch((error) => {
            console.log(error)
            this.isLoading = false
        }) */
    },
    methods: {
        ...mapMutations({
            showLoading: SHOW_LOADING_MUTATION
        }),
        setData(event) {
            this.shipboardId = event.target.getAttribute('data-id')
        },
        async submitForm() {
            this.showLoading(true)
            const formData = new FormData()
            formData.append('shipboard_id', this.shipboardId)
            formData.append('start_date', this.startDate)
            formData.append('end_date', this.endDate)
            formData.append('date_preferred', this.datePreferred)
            formData.append('input', this.inputDailyJournal)
            formData.append('trb_tasks', this.trbTask)
            formData.append('trb_code', this.trbCode)
            formData.append('signed', this.signed)
            formData.append('remarks', this.remarks)
            axios.post('/student/onboard/performance', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: 'Bearer ' + this.token
                }
            }).then((response) => {
                this.showLoading(false)
                console.log(response.data)
                if (response.status === 200) {
                    this.showAlert(response.data.data)
                    window.location.reload()
                }
            }).catch((error) => {
                this.showLoading(false)
                console.log(error)
                if (error.response.status === 422) {
                    console.log(error.response.data)
                    this.errors = error.response.data.errors
                } else {
                    this.showAlertError(error)
                }
            })
        },
        showAlertError(error) {
            Swal.fire({
                icon: 'error',
                title: error.code,
                text: error.message,
                confirmButtonText: 'OK'
            })
        },
        showAlert(data) {
            // Use sweetalert2
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: data.message,
                confirmButtonText: 'OK'
            })
        }
    }
}
</script>