<template>
    <div v-if="isLoading">
       <h3>LOADING</h3>
    </div>
    <div v-else>
        <div class="card ms-5 me-5" data-iq-gsap="onStart" data-iq-position-y="70" data-iq-rotate="0"
            data-iq-trigger="scroll" data-iq-ease="power.out" data-iq-opacity="0">
            <div class="card-header">
                <div class="header-title">
                    <h4 class="card-title fw-bold text-primary">ENROLLMENT OVERVIEW</h4>
                </div>
            </div>
            <div class="card-body">
            </div>
        </div>
    </div>
</template>
<script>
import { GET_USER_TOKEN, IS_USER_AUTHENTICATE_GETTER } from '@/store/storeConstants'
import { mapGetters } from 'vuex'
import axios from 'axios'
export default {
    name: 'Payment Overview',
    data() {
        return {
            isLoading: true,
            data: [],
            semester: [],
            tuition: [],
            tuitionDetails: []
        }
    },
    computed: {
        ...mapGetters('auth', {
            token: GET_USER_TOKEN,
            isAuth: IS_USER_AUTHENTICATE_GETTER
        })
    },
    mounted() {
        axios.get('student/enrollment', {
            headers: {
                Authorization: 'Bearer ' + this.token
            }
        }).then((response) => {
            this.data = response.data.data
            this.semester = this.data.academic
            console.log(this.data)
            if (this.data.tuition) {
                this.tuition = this.data.tuition.tags
                this.tuitionDetails = this.data.tuition
            }
            this.isLoading = false
        }).catch((error) => {
            console.log(error)
            console.log(error.response.status)
        })
    }
}
</script>