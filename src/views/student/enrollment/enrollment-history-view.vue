<template>
    <div v-for="item in data" :key="item" class="card">
        <div class="card-body">

        </div>
    </div>
</template>
<script>
import { GET_USER_TOKEN, IS_USER_AUTHENTICATE_GETTER } from '@/store/storeConstants'
import { mapGetters } from 'vuex'
import axios from 'axios'
export default {
    name: 'EnrollmentHistory',
    data() {
        return {
            isLoading: true,
            data: []
        }
    },
    computed: {
        ...mapGetters('auth', {
            token: GET_USER_TOKEN,
            isAuth: IS_USER_AUTHENTICATE_GETTER
        })
    },
    mounted() {
        axios.get('student/enrollment-history', {
            headers: {
                Authorization: 'Bearer ' + this.token
            }
        }).then((response) => {
            this.data = response.data.data
            this.isLoading = false
        }).catch((error) => {
            console.log(error)
            console.log(error.response.status)
        })
    }
}
</script>