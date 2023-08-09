<template>
    <div v-if="isLoading">
        <h3 class="text-primary">LOADING</h3>
    </div>
    <div v-else>
    </div>
</template>
<script>
import Swal from 'sweetalert2'
import { GET_USER_TOKEN, IS_USER_AUTHENTICATE_GETTER, SHOW_LOADING_MUTATION } from '@/store/storeConstants'
import { mapGetters, mapMutations } from 'vuex'
import axios from 'axios'
export default {
    name: 'Semestral Grade',
    data() {
        const formData = new FormData()
        return {
            isLoading: true
        }
    },
    computed: {
        ...mapGetters('auth', {
            token: GET_USER_TOKEN,
            isAuth: IS_USER_AUTHENTICATE_GETTER
        })
    },
    mounted() {
        axios.get('student/payment-overview', {
            headers: {
                Authorization: 'Bearer ' + this.token
            }
        }).then((response) => {
            this.data = response.data.data
            this.semester = this.data.currently_enrolled.academic
            this.tuitionDetails = this.data.currently_enrolled.payment_assessment_details_with_transactions
            this.course = this.data.currently_enrolled.course
            if (this.tuitionDetails) {
                this.tuitionDetails.additional_fees.forEach(element => {
                    this.remarks.push(element.fee_details.particular.particular_name)
                    console.log(element.fee_details.particular.particular_name)
                })
            }
            this.isLoading = false
        }).catch((error) => {
            console.log(error)
        })
    },
    methods: {
        ...mapMutations({
            showLoading: SHOW_LOADING_MUTATION
        })
    }
}
</script>