<template>
    <div v-if="isLoading">
        <h3>LOADING</h3>
    </div>
    <div v-else>
        <p class=" text-primary">
            <span class="display-6 fw-bolder"> {{ scormPackage.competence_code }}: {{ scormPackage ?
                scormPackage.competence_name : '' }}</span>
            <br>
            <span class="fw-bolder text-muted h6">{{ scormPackage.function }}</span>
        </p>

        <div class="scorm-content-page">
            <iframe id="captureIframe" :src="scormPackageUrl" class="scorm-container" ref="scormIframe"></iframe>
            <div class="content-button mt-2 mb-2">
                <button class="btn btn-primary btn-sm" @click="storeResult" :disabled="!isEnabled">NEXT
                    QUESTION</button>
            </div>
        </div>
    </div>
</template>
<script>
import { GET_USER_TOKEN, SHOW_LOADING_MUTATION } from '@/store/storeConstants'
import { SUCCESS_ALERT, INFO_ALERT, ERROR_ALERT, ENCRYPT_DATA } from '@/store/storeAlertConstants.js'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import axios from 'axios'
export default {
    name: 'Comprehensive',
    data() {
        return {
            scormPackage: {},
            scormPackageUrl: '',
            isLoading: true,
            scormScore: null,
            scorm: null,
            isEnabled: false,
            tokenItem: null,
            maxAttemps: 3,
            attemps: null
        }
    },
    computed: {
        ...mapGetters('auth', {
            token: GET_USER_TOKEN
        })
    },
    mounted() {
        this.fetchScormPackage()
        this.getIspringItems()
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
        getElement() {
            const htmlDocuments = this.$refs.scormIframe.contentWindow.document
            const score = htmlDocuments.getElementsByClassName('published-rich-text')[4].outerText
            const passingScore = htmlDocuments.getElementsByClassName('published-rich-text')[2].outerText
            const parts = score.split(' ')
            const finalScore = parts[0]
            console.log('Final Score: ' + finalScore)
            localStorage.removeItem(this.tokenItem)
        },
        storeResult() {
            const htmlDocuments = this.$refs.scormIframe.contentWindow.document
            /*  const score = htmlDocuments.getElementsByClassName('published-rich-text')
             console.log(score) */
            const score = htmlDocuments.getElementsByClassName('published-rich-text')[4].outerText
            const parts = score.split(' ')
            const finalScore1 = parts[0]
            console.log(finalScore1)
            const finalScore = finalScore1
            const form = {
                result: finalScore,
                competence: this.scormPackage.id
            }
            axios.post('/student/comprehensive-examination/store-result', form, {
                headers: {
                    Authorization: 'Bearer ' + this.token
                }
            })
            console.log(form)
            localStorage.removeItem(this.tokenItem)
            this.$router.go(-1)
        },
        fetchScormPackage() {
            axios.get('/student/comprehensive-examination/view?id=' + this.$route.query.v, {
                headers: {
                    Authorization: 'Bearer ' + this.token
                }
            }).then((response) => {
                this.scormPackage = response.data.examination
                this.attemps = response.data.student_attemps
                this.scormPackageUrl = 'http://bma.edu.ph/' + this.scormPackage.file_name + '/res/index.html'
                // this.scormPackageUrl = "/COMPRE DECK/C3 - Use of radar and ARPA to maintain safety of navigation/res/index.html"
                this.isLoading = false
            }).catch((error) => {
                if (error.response) {
                    if (error.response.status === 401) {
                        this.logout()
                    }
                }
                console.log(error)
            })
        },
        getIspringItems() {
            // If two or more ISPRIN token it will be delete all
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i)
                if (key.startsWith('ispring::')) {
                    if (this.tokenItem === null) {
                        localStorage.removeItem(key)
                    }
                }
            }
            setInterval(() => {
                for (let i = 0; i < localStorage.length; i++) {
                    const key = localStorage.key(i)
                    if (key.startsWith('ispring::')) {
                        if (this.tokenItem === null) {
                            this.tokenItem = key
                        }
                    }
                }
                const value = localStorage.getItem(this.tokenItem)
                const data = JSON.parse(value)
                if (data) {
                    const valueOfM = data.S.m
                    if (valueOfM === 'completed') {
                        this.isEnabled = true
                        this.storeResult()
                    }
                }
            }, 1000)
        }
    }
}

</script>
<style scoped>
/* .scorm-container {
    display: flex;
    flex-direction: column;
    height: 90vh;
} */

iframe {
    flex: 1;
    width: 100%;
    height: 80vh;
    border: none;
}
</style>