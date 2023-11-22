<template>
    <stepper value="" :isActive="className.stepperStatus" :isFinish="className.stepperFinish" />
    <div :class="`card ${className.cardClass}`" @click="showContent">
        <div class="card-body m-2 p-2">
            <span :class="`${className.badgeColor} badge float-end`">{{ status }}</span>
            <small class="fw-bolder text-muted">{{ progressName }}</small>
            <h5 :class="`${className.textClass} fw-bolder mb-1`">{{ titleName }}</h5>
            <!-- Documents List -->
            <div v-if="content" class="document-content p-3 row">
                <div v-if="orientation.schedule">
                    <div v-if="orientation.present.is_completed">
                        <p>
                            Thank you for attending the briefing/orientation. Please select a conveient date for your
                            medical examination schedule.
                        </p>
                    </div>
                    <div v-else>
                        <p>Your Briefing/Orientation Program is scheduled on
                            <b>{{ orientation.schedule.schedule_date }}</b> at
                            <b> {{ orientation.schedule.schedule_time }}</b> at
                            Baliwag Maritime Academy, Inc. 3rd Floor Audio Visual Room.
                            <br>
                            <small class="text-info fw-bolder p-0 m-0">
                                We highly encourage your Parents/Guardians to attend the Briefing/Orientation. Please wear
                                appropriate
                                attire (sando, shorts, and slippers are not allowed)
                            </small>
                        </p>
                    </div>
                </div>
                <div v-else>
                    <p>Kindly expect to receive your Orientation Schedule soon; it will be sent to your email.</p>
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
    name: 'BriefingOrientation',
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
                        if (this.orientation.present) {
                            if (this.orientation.present.is_completed) {
                                className = { status: 'Complete', cardClass: 'bg-soft-primary', textClass: 'text-primary', stepperStatus: true, stepperFinish: true, badgeColor: 'bg-primary', contentBody: false, contentShow: false }
                            }
                        }
                    }
                }
            }
        }
        return {
            errors: [],
            titleName: 'BREIFING ORIENTATION',
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
        }
    },
    props: { propsApplicantDetails: Object, documents: Object, examination: Object, orientation: Object, token: String }
}
</script>