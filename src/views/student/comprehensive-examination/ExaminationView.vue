<template>
    <div v-if="isLoading">
        <h3>LOADING</h3>
    </div>
    <div v-else>
        <span class="badge bg-primary">{{ examinationDetails.competence_code }}</span>
        <p class="display-6 fw-bolder text-primary">{{ examinationDetails ? examinationDetails.competence_name : '' }}</p>
        <div class="row">
            <div class="col-md-8">
                <iframe ref="scormFrame" :src="scormContentUrl" width="100%" height="600"></iframe>
                <button @click="getQuizResult">Get Quiz Result</button>
                <div v-if="quizResult !== null">
                    <p>Quiz Result: {{ quizResult }}</p>
                </div>
                {{ examinationDetails.file_name }}
                <iframe :src="examinationDetails.file_name" width="100%" height="600px"></iframe>
            </div>
            <div class="col-md-4">
                <div class="card m-2" v-for="(item, index) in examinationList" :key="index">
                    <div class="card-body">
                        <label for="" class="fw-bolder text-primary">
                            {{ item.competence_code }}- {{ item.competence_name }}
                        </label>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import JSZip from 'jszip'
import { GET_USER_TOKEN, IS_USER_AUTHENTICATE_GETTER, SHOW_LOADING_MUTATION } from '@/store/storeConstants'
import { SUCCESS_ALERT, INFO_ALERT, ERROR_ALERT, ENCRYPT_DATA } from '@/store/storeAlertConstants.js'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import axios from 'axios'
export default {
    name: 'Comprehensive',
    data() {
        return {
            isLoading: true,
            examinationList: [],
            examinationDetails: [],
            scormContentUrl: null,
            quizResult: null
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
    async created() {
        // Unzip the SCORM zip file
        await axios.get('http://127.0.0.1:7000/storage/bma-students/comprehensive-examination/MQ==/sample-competence.zip')
            .then(response => {
                console.log(response.data)
            })
            .catch(error => {
                console.error('Error fetching data:', error)
            })
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
            axios.get('/student/comprehensive-examination/view?id=' + this.$route.query.v, {
                headers: {
                    Authorization: 'Bearer ' + this.token
                }
            }).then((response) => {
                this.isLoading = false
                this.examinationList = response.data.examination_list
                this.examinationDetails = response.data.examination
            }).catch((error) => {
                console.log(error)
                this.errorAlert(error)
                this.isLoading = false
            })
        },
        getQuizResult() {
            const scormFrame = this.$refs.scormFrame
            const scormAPI = scormFrame.contentWindow.API
            if (scormAPI) {
                // Call SCORM API to get quiz result
                const result = scormAPI.LMSGetValue('cmi.core.score.raw')
                this.quizResult = result
            } else {
                console.error('SCORM API not found.')
            }
        }
    }
}
</script>