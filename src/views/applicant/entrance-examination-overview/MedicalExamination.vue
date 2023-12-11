<template>
    <stepper value="" :isActive="className.stepperStatus" :isFinish="className.stepperFinish" />
    <div :class="`card ${className.cardClass}`" @click="showContent">
        <div class="card-body m-2 p-2">
            <span :class="`${className.badgeColor} badge float-end`">{{ status }}</span>
            <small class="fw-bolder text-muted">{{ progressName }}</small>
            <h5 :class="`${className.textClass} fw-bolder mb-1`">{{ titleName }}</h5>
            <!-- Documents List -->
            <div v-if="content" class="document-content p-3 row">
                <div v-if="medical.appointment">
                    <div v-if="medical.appointment.is_approved">
                        <div v-if="medical.medical_result">
                            <div v-if="medical.medical_result.is_fit === 1">
                                <h5 class="fw-bolder text-primary">
                                    MEDICAL EXAMINATION PASSED
                                </h5>
                                <p>Congratulation's for successfully
                                    passing the physical and
                                    psychological Examination.
                                    You are now qualified to Enroll at
                                    Baliwag Maritime Academy, Inc </p>
                                <router-link class="btn btn-outline-primary rounded-pill"
                                    :to="{ name: 'applicant-layout.applicant-enrollment-overview' }">Enroll
                                    Now</router-link>
                            </div>
                            <div v-else>
                                <div v-if="medical.medical_result.is_fit === 2">
                                    <h5 class="fw-bolder text-danger">
                                        MEDICAL
                                        EXAMINATION FAILED
                                    </h5>
                                    <p>We regret to inform you that you
                                        did not pass the Medical
                                        Examination.</p>
                                </div>
                                <div v-else>
                                    <h5 class="fw-bolder text-info">
                                        PENDING MEDICAL RESULT</h5>
                                    <p>{{ medical.medical_result.remarks }}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div v-else>
                            <div v-if="propsApplicantDetails.course.id === 3">
                                <label for="" class="h5 fw-bolder">MEDICAL EXAMINATION CHECKLIST FOR INCOMING GRADE
                                    11</label>
                                <br>
                                <div>
                                    <span class="fw-bolder"> A. Physical Exam with Weight, Height, BMI, Pulse Rate, Blood
                                        Pressure, Respiration,
                                        Body Temperature
                                    </span> <br>

                                    <span class="fw-bolder">
                                        B. Visual Acuity

                                    </span>
                                    <ol>
                                        <li>Ishihara Test</li>
                                        <li>Audiometry Test</li>
                                    </ol>

                                    <span class="fw-bolder">
                                        C. Ancillary Exam

                                    </span>
                                    <ol>
                                        <li>Chest X-Ray
                                        </li>
                                        <li>
                                            ECG
                                        </li>
                                        <li>
                                            CBC w/ Blood Typing
                                        </li>
                                        <li>
                                            Urinalysis
                                        </li>
                                        <li>
                                            Stool Exam
                                        </li>
                                        <li>
                                            HepaBsAg
                                        </li>
                                    </ol>
                                </div>
                            </div>
                            <div v-else>
                                <label for="" class="h5 fw-bolder">CHECK LIST OF MEDICAL EXAMINATION FOR INCOMING 4th
                                    CLASS</label>
                                <br>
                                <div class="row">
                                    <div class="col-lg-4 col-md-12">
                                        <span class="fw-bolder text-info"> A. Basic Medical Examination</span>
                                        <p>
                                            1. Complete Physical Examination (PE) <br>
                                            2. Chest X-Ray using 11x14 plates <br>
                                            3. Complete Blood Count (CBC) <br>
                                            4. Blood Typing <br>
                                            5. Stool Examination <br>
                                            6. Urinalysis <br>
                                            7. Dental Examination <br>
                                            8. Neuro Psychological Examination <br>
                                            9. Ishihara Test <br>
                                            10. Audiometry test <br>

                                        </p>
                                    </div>
                                    <div class="col-lg-6 col-md-12">
                                        <span class="fw-bolder text-info">B. Additional Laboratory examination</span>
                                        <p>
                                            1. HBsAg (Hepa B Test) <br>
                                            2. Drug Test <br>
                                            - Amphetamine <br>
                                            - Cannabinoids <br>
                                            3. FBS (Fasting Blood Sugar) <br>
                                        </p>
                                        <span class="fw-bolder text-info">C. ECG (Electronic diagram)</span> <br>
                                        <span class="fw-bolder text-info">D. Psychology Test</span> <br>
                                    </div>
                                </div>
                            </div>
                            <label for="" class="h5 fw-bolder">SCHEDULED APPOINTMENT</label>
                            <div class="alert alert-info mt-3 mb-3">
                                <b>TAKE NOTE</b> <br>
                                The medical examination day may <b>be altered or change</b> subject to:
                                <br>
                                a. Govt. travel restriction by IATF-DOH-LGU
                                <br>
                                b. Other reasons beyond control of the administration in which case re-scheduling
                                shall be
                                arranged
                                and
                                notice
                            </div>
                            <p>
                                Your appointment with Centerport Medical Services Inc. is scheduled on
                                <b>{{ getFormatDate(medical.appointment.appointment_date) }}</b> . <br>
                            </p>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.342591389652!2d120.97658231527882!3d14.579544181499985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397ca2f83bf0ae3%3A0x205ff1c834bda92!2sCenterport%20Medical%20Services.%2C%20Inc.!5e0!3m2!1sen!2sph!4v1654503989120!5m2!1sen!2sph"
                                width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"
                                referrerpolicy="no-referrer-when-downgrade"></iframe> <br>
                            Should you have queries or require any clarifications, please do not hesitate to contact
                            our Medical
                            Officer
                            on the numbers below.
                            <br> Tactical Officer Mr. Robert S Evangelista
                            with contact number <b>0968-459-1304</b>
                            <br>
                            If for any reason you wish to cancel your appointment, We appreciate a prompt and early
                            notification
                            from
                            your side.
                            <br>
                            Looking forward to your presence.

                        </div>
                    </div>
                    <div v-else>
                        <p>
                            Your requested appointment schedule
                            on<b><i> {{ getFormatDate(medical.appointment.appointment_date) }}</i></b>
                            has been submitted and is pending approval from our Medical Officer.
                        </p>
                    </div>
                </div>
                <div v-else>
                    <p>
                        All students are advised to undergo a mandatory medical examination. Kindly report to the Baliwag Maritime Academy, Inc to receive your designated medical examination date and obtain any
                        required medical referrals.
                    </p>
                    <!--  <p class="">For Scheduling of appointment, Kindly choose to available schedule.</p>
                    <div class="row">
                        <div class="col-lg-4 col-md-6 col-sm-12" v-for="(data, index) in  medical.medical_scheduled "
                            :key="index">
                            <div class="d-flex justify-content-between align-items-center">
                                <span class="badge bg-primary w-100 mt-1 me-2 ">{{ getFormatDate(data.date) }}</span>
                                <div class="" v-if="scheduleSlot(data.id)">
                                    <span class="badge bg-secondary">Full Scheduled</span>
                                </div>
                                <div v-else>
                                    <a class="badge bg-info" @click="setMedicalScheduled(data.date)">Available Schedule</a>
                                </div>
                            </div>
                        </div>
                    </div> -->
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
    name: 'MedicalExamination',
    components: {
        stepper
    },
    data() {
        let className = { status: 'Pending', cardClass: '', textClass: 'text-muted', stepperStatus: false, badgeColor: 'bg-secondary', contentShow: false }
        if (this.propsApplicantDetails.applicant && this.documents.approvedDocuments && this.examination.payment) {
            if (this.examination.payment.is_approved) {
                if (this.examination.examinationDetails) {
                    if (this.examination.examinationDetails.is_finish && this.examination.finalResult[2]) {
                        className = { status: 'Progress', cardClass: 'bg-soft-info', textClass: 'text-info', stepperStatus: true, stepperFinish: false, badgeColor: 'bg-info', contentShow: true }
                        if (this.medical.medical_result) {
                            if (this.medical.medical_result.is_fit !== 0) {
                                className = { status: 'Complete', cardClass: 'bg-soft-primary', textClass: 'text-primary', stepperStatus: true, stepperFinish: true, badgeColor: 'bg-primary', contentBody: false, contentShow: true }
                            }
                        }
                    }
                }
            }
        }
        return {
            errors: [],
            titleName: 'MEDICAL EXAMINATION',
            progressName: 'STEP 5',
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
        scheduleSlot(data) {
            axios.get('applicant/medical-schedule/slot/' + data, {
                headers: {
                    Authorization: 'Bearer ' + this.token
                }
            }).then((response) => {
                return response.data
            }).catch((error) => {
                console.log(error)
            })
        },
        setMedicalScheduled(data) {
            axios.get('applicant/medical-schedule/' + data, {
                headers: {
                    Authorization: 'Bearer ' + this.token
                }
            }).then((response) => {
                console.log(response)
                this.successAlert(response)
            }).catch((error) => {
                console.log(error)
                this.errorAlert(error)
            })
        },
        getFormatDate(inputDate) {
            // create a new Date object with the input date string
            const date = new Date(inputDate)
            // define an array of month names
            const monthNames = [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
            ]
            // get the day, month, and year values from the date object
            const day = date.getDate()
            const month = monthNames[date.getMonth()] // add 1 to adjust for 0-indexed months
            const year = date.getFullYear()
            // format the date as 'dd/mm/yyyy'
            const formattedDate = month + ' ' + day + ', ' + year
            return formattedDate
        }
    },
    props: { propsApplicantDetails: Object, documents: Object, examination: Object, orientation: Object, medical: Object, token: String }
}
</script>