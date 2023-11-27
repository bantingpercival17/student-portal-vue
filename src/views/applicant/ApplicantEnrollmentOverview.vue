<template>
    <div v-if="isLoading">
        <LoadingView />
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
                <div class="iq-timeline0 m-0 d-flex align-items-center justify-content-between position-relative">
                    <ul class="list-inline p-0 m-0">
                        <li>
                            <EnrollmentRegistration :propsEnrollment="enrollmentDetails" :propsSemester="semester" />
                        </li>
                        <li>
                            <EnrollmentAssessment :propsEnrollment="enrollmentDetails" :propsSemester="semester" />
                        </li>
                        <li>
                            <TuitionFee :propsEnrollment="enrollmentDetails" :propsSemester="semester"
                                :tuitionDetails="tuitionFeeDetails" :token="token" />
                        </li>
                        <li>
                            <TuitionFeePayment :propsEnrollment="enrollmentDetails" :propsSemester="semester"
                                :tuitionDetails="tuitionFeeDetails" :token="token" />
                        </li>
                        <li>
                            <CompleteEnrollment :propsEnrollment="enrollmentDetails" :propsSemester="semester"
                                :tuitionDetails="tuitionFeeDetails" />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import EnrollmentRegistration from './enrollment-overview/EnrollmentRegistration.vue'
import EnrollmentAssessment from './enrollment-overview/EnrollmentAssessment.vue'
import TuitionFee from './enrollment-overview/TuitionFee.vue'
import TuitionFeePayment from './enrollment-overview/TuitionFeePayment.vue'
import CompleteEnrollment from './enrollment-overview/CompleteEnrollment.vue'
import LoadingView from './enrollment-overview/EnrollmentOverviewLoading.vue'
import { GET_USER_TOKEN, IS_USER_AUTHENTICATE_GETTER } from '@/store/storeConstants'
import { mapGetters } from 'vuex'
import axios from 'axios'
export default {
    name: 'EnrollmentOverview',
    components: {
        EnrollmentRegistration,
        EnrollmentAssessment,
        TuitionFee,
        TuitionFeePayment,
        CompleteEnrollment,
        LoadingView
    },
    data() {
        return {
            isLoading: true,
            semester: [],
            enrollmentDetails: [],
            tuitionFeeDetails: []
        }
    },
    computed: {
        ...mapGetters('auth', {
            token: GET_USER_TOKEN,
            isAuth: IS_USER_AUTHENTICATE_GETTER
        })
    },
    mounted() {
        axios.get('applicant/enrollment', {
            headers: {
                Authorization: 'Bearer ' + this.token
            }
        }).then((response) => {
            const data = response.data
            this.enrollmentDetails = data.enrollmentDetails
            this.semester = data.semester
            this.tuitionFeeDetails = data.tuitionFeeDetails
            this.isLoading = false
        }).catch((error) => {
            console.log(error)
        })
    }
}
</script>