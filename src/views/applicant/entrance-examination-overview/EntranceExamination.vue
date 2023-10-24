<template>
    <stepper value="" :isActive="className.stepperStatus" :isFinish="className.stepperFinish" />
    <div :class="`card ${className.cardClass}`" @click="showContent">
        <div class="card-body m-2 p-2">
            <span :class="`${className.badgeColor} badge float-end`">{{ status }}</span>
            <small class="fw-bolder text-muted">{{ progressName }}</small>
            <h5 :class="`${className.textClass} fw-bolder mb-1`">{{ titleName }}</h5>
            <!-- Documents List -->
            <div v-if="content" class="document-content p-3 row">
                <div v-if="examination.examinationDetails" class="examination-view">
                    <div v-if="examination.examinationDetails.is_finish === true" class="examination-form-and-instruction">
                        <p v-if="examination.finalResult[2]" class="mb-3">
                            Congratulation, you Passed the Entrance Examination, Kindly wait for the announcement in your
                            email account
                        </p>
                        <p v-else>
                            Thank you for trying here at Baliwag Maritime Academy sorry to tell you that you did not meet
                            the
                            Passing Score for the Entrance Examination.
                        </p>
                        <div class="card">
                            <div class="card-body">
                                <label for="" class="fw-bolder text-info h5">EXAMINATION RESULT</label>
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>CATEGORY</th>
                                            <th>SCORE</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(data, index) in examination.examinationResult" :key="index">
                                            <td v-if="data.examinationCategory !== 'Essay'">{{ data.examinationCategory }}
                                            </td>
                                            <td v-if="data.examinationCategory !== 'Essay'"><span
                                                    class="fw-bolder text-primary h5">{{ data.score }}</span> <span
                                                    class="text-muted fw-bolder">/{{ data.totalItems }}</span></td>
                                        </tr>
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <th>TOTAL SCORE: </th>
                                            <td><span class="fw-bolder text-primary h5">{{ examination.finalResult[0]
                                            }}</span></td>
                                        </tr>
                                        <tr>
                                            <th>EXAMINATION PERCENTAGE:</th>
                                            <td> <span class="fw-bolder text-primary h5">{{ examination.finalResult[1]
                                            }}</span></td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <div v-if="!examination.examinationSchedule">

                        </div>
                        <div v-else>

                        </div>

                        <div class="card">
                            <div class="card-body">
                                <p class="text-primary fw-bolder h5">Welcome Applicants</p>
                                <p> <span class="fw-bolder">INSTRUCTION</span></p>
                                <p class="m-0">1. Ensure that you have a strong internet connection.</p>
                                <p class="m-0">2. Once you are logged in, read carefully and understand the guidelines
                                    before
                                    and
                                    after Examination</p>
                                <p class="m-0">3. Upon completion of the Examination, click the Submit or Back button at the
                                    system.</p>
                                <p class="m-0">4. When you enter the examination code, your examiantion will begin.</p>
                                <p>5.We recommend using Laptop/Desktop running atleast Windows 7 or higher to take the
                                    examination.
                                    We also recommend to use Google Chrome as browser in taking the examination.</p>
                                <br>
                            </div>
                        </div>
                        <form @submit.prevent="submitExaminationCode" method="post">
                            <div class="form-group">
                                <small class="fw-bolder">EXAMINATION CODE</small> <br>
                                <label for="" class="form-label text-primary fw-bolder">
                                    {{ examination.examinationDetails ? examination.examinationDetails.examination_code : ''
                                    }}
                                </label>
                                <div class="row">
                                    <div class="col-md">
                                        <input type="text" class="form-control border border-primary"
                                            v-model="examinationCode" placeholder="Enter Examination Code">
                                        <span class="badge bg-danger mt-2" v-if="errors.examination">{{
                                            errors.examination[0] }}</span>
                                    </div>
                                    <div class="col-md">
                                        <button type="submit" class="btn btn-primary ">Take Examination</button>
                                    </div>

                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { SHOW_LOADING_MUTATION } from '@/store/storeConstants'
import { mapMutations, mapActions } from 'vuex'
import stepper from '@/components/main-layouts/components/widgets/stepper-widget.vue'
import axios from 'axios'
import { SUCCESS_ALERT, INFO_ALERT, ERROR_ALERT, ENCRYPT_DATA } from '@/store/storeAlertConstants.js'
export default {
    name: 'ExaminationPayment',
    components: {
        stepper
    },
    data() {
        let className = { status: 'Pending', cardClass: '', textClass: 'text-muted', stepperStatus: false, badgeColor: 'bg-secondary', contentShow: false }
        if (this.propsApplicantDetails.applicant && this.documents.approvedDocuments && this.examination.payment) {
            if (this.examination.payment.is_approved) {
                className = { status: 'Progress', cardClass: 'bg-soft-info', textClass: 'text-info', stepperStatus: true, stepperFinish: false, badgeColor: 'bg-info', contentShow: true }
                if (this.examination.examinationDetails) {
                    if (this.examination.examinationDetails.is_finish) {
                        className = { status: 'Complete', cardClass: 'bg-soft-primary', textClass: 'text-primary', stepperStatus: true, stepperFinish: true, badgeColor: 'bg-primary', contentBody: false, contentShow: false }
                    }
                }
            }
        }
        return {
            errors: [],
            titleName: 'ENTRANCE EXAMINATION',
            progressName: 'STEP 4',
            status: className.status,
            className,
            content: className.contentShow,
            examinationCode: ''
        }
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
        showContent() {
            if (this.className.status === 'Pending') {
                this.content = false
            } else if (this.className.status === 'Progress') {
                this.content = true
            } else {
                this.content = !this.content
            }
        },
        async submitExaminationCode() {
            this.errors = []
            this.showLoading(true)
            axios.post('applicant/examination', { examination: this.examinationCode }, {
                headers: {
                    Authorization: 'Bearer ' + this.token
                }
            }).then((response) => {
                this.showLoading(false)
                this.successAlert(response.data)
                this.$router.push('/applicant/examination/' + btoa(this.examinationCode))
                console.log(response)
            }).catch((error) => {
                this.showLoading(false)
                this.errorAlert(error)
                if (error.response.status === 422) {
                    this.errors = error.response.data.errors
                    console.log(this.errors)
                }
                console.error(error)
            })
        }
    },
    props: { propsApplicantDetails: Object, documents: Object, examination: Object, token: String }
}
</script>