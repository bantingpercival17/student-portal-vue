<template>
    <div v-if="isLoading">
        <h3>LOADING</h3>
    </div>
    <div v-else>
        <p class="display-6 fw-bolder text-primary">COMPREHENSIVE EXAMINATION</p>
        <div>
            <div class="card m-2" v-for="(item, index) in examinationList" :key="index">
                <div class="card-body">
                    <router-link :to="{ name: 'student-layout.comprehesive-examination-view', query: { v: encrypt(item.id) } }">
                        <label for="" class="fw-bolder text-primary h4">
                            {{ item.competence_code }}- {{ item.competence_name }}
                        </label>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { GET_USER_TOKEN, IS_USER_AUTHENTICATE_GETTER, SHOW_LOADING_MUTATION } from '@/store/storeConstants'
import { SUCCESS_ALERT, INFO_ALERT, ERROR_ALERT, ENCRYPT_DATA } from '@/store/storeAlertConstants.js'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import axios from 'axios'
export default {
    name: 'Comprehensive',
    data() {
        return {
            isLoading: true,
            examinationList: []
        }
    },
    computed: {
        ...mapGetters('auth', {
            token: GET_USER_TOKEN,
            isAuth: IS_USER_AUTHENTICATE_GETTER
        })
    },
    mounted() {
        this.loadComprehensive()
    },
    methods: {
        ...mapActions('alert', {
            successAlert: SUCCESS_ALERT,
            infoAlert: INFO_ALERT,
            errorAlert: ERROR_ALERT,
            encrypt: ENCRYPT_DATA
        }),
        ...mapMutations({
            showLoading: SHOW_LOADING_MUTATION
        }),
        loadComprehensive() {
            axios.get('/student/comprehensive-examination', {
                headers: {
                    Authorization: 'Bearer ' + this.token
                }
            }).then((response) => {
                this.isLoading = false
                this.examinationList = response.data.examination
            }).catch((error) => {
                console.log(error)
                this.errorAlert(error)
                this.isLoading = false
            })
        },
        encrypt(data) {
            return btoa(data)
        }
    }
}
</script>