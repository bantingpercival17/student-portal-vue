<template>
    <!-- Step 3: Assessment -->
    <div>
        <h4 class="fw-bold mb-3">Step 3: Fee Assessment</h4>
        <div v-if="tuitionFeeValidation" class="tuition-verification">
            <p class="text-muted">Below are your pre-assigned subjects and the corresponding fee assessment for
                the
                upcoming semester.</p>
            <div class="card bg-light">
                <div class="card-body">
                    <h6 class="fw-bold">Assigned Subjects</h6>
                    <ul class="list-group mb-3">
                        <li v-for="course in assignedCourses" :key="course.code"
                            class="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <p class="mb-0 fw-bold">{{ course.code }}: {{ course.title }}</p>
                                <small class="text-muted">Units: {{ course.units }}</small>
                            </div>
                        </li>
                    </ul>

                    <h6 class="fw-bold">Fee Assessment</h6>
                    <div v-if="tuitionFeeDetails" class="tuition-fee-details">
                        <ul class="list-unstyled small">

                            <li v-for="(fee, index) in tuitionFeeDetails.feeAssessment" :key="index"
                                class="d-flex justify-content-between">
                                <span>{{ fee.name }}</span>
                                <span>₱ {{ fee.amount }}</span>
                            </li>

                        </ul>
                        <hr>
                        <ul class="list-unstyled small">

                            <li class="d-flex justify-content-between">
                                <span>Payment Mode:</span>
                                <span>
                                    <select v-model="paymentMode" v-on:change="paymentModeChange"
                                        class="form-select form-select-sm border border-success">
                                        <option value="fullpayment">Full-payment</option>
                                        <option value="installment">Installment</option>
                                    </select>
                                </span>
                            </li>
                            <li class="d-flex justify-content-between">
                                <span>Upon Enrollment</span>
                                <span>
                                    ₱ {{ tuitionFeeAmounts.uponEnrollmentFee }}
                                </span>
                            </li>
                            <li class="d-flex justify-content-between">
                                <span>Monthly Payment (4 Months)</span>
                                <span>
                                    ₱ {{ tuitionFeeAmounts.monthlyFee }}
                                </span>
                            </li>
                        </ul>
                        <hr>
                        <div class="d-flex justify-content-between fw-bold h5">
                            <span>Total Fees:</span>
                            <span>₱ {{ tuitionFeeAmounts.totalTuitionFee }}</span>
                        </div>
                    </div>
                    <div v-else>
                        <p class="mb-3">
                            You can not proceed to the Tuition Fee Assessment because the Tuition is not encoded
                            by
                            the Accounting Office
                        </p>
                    </div>

                </div>
            </div>
            <div class="d-flex justify-content-end mt-4">
                <button class="btn btn-secondary me-2" @click="prevStep">Back</button>
                <button v-if="tuitionFeeDetails" class="btn btn-primary" @click="proceedToPayment">Proceed to
                    Payment</button>
            </div>
        </div>
        <div v-else class="tuition-verification">
            <div v-if="!tuitionFeeAssessment" class="d-flex flex-column align-items-center">
                <div class="spinner-border text-primary mb-3" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p class="text-muted">Your records are currently being evaluated by the accounting's office.
                    This
                    may take a few days. Please wait.</p>
            </div>
            <div v-else class="d-flex flex-column align-items-center">
                <i data-feather="check-circle" class="text-success mb-3" style="width: 64px; height: 64px;"></i>
                <h5 class="fw-bold text-success">Tuition Fee Assessment Complete!</h5>
                <p class="text-muted">You are cleared to proceed with tuition fee. Please view your payment
                    details for the upcoming semester.</p>
                <button class="btn btn-success mt-3" @click="nextStep">Proceed to Payments</button>
            </div>
        </div>

    </div>
</template>
<script>
import apiLink from '@/services/api/apiLink'
import { OnboardTrainingApi } from '@/services/api/onboardTrainingApi'
import { alertError, alertSuccess } from '@/utils/alert'
export default {
    name: 'FeeAssessmentCard',
    props: {
        enrollmentDetails: Object,
        tuitionFeeAssessments: Object
    },
    data() {
        return {
            tuitionFeeValidation: true,
            assignedCourses: [],
            tuitionFeeDetails: null,
            tuitionFeeAmounts: {
                totalTuitionFee: 0,
                uponEnrollmentFee: 0,
                monthlyFee: 0
            },
            tuitionFeeAssessment: [],
            bankProofUploaded: false,
            ewalletProofUploaded: false,
            paymentMode: 'fullpayment'
        }
    },
    async mounted() {
        this.assignedCourses = this.enrollmentDetails?.currentEnrollmentAssessment?.subjectList
        this.tuitionFeeDetails = this.enrollmentDetails?.currentEnrollmentAssessment?.tuitionFee
        this.paymentModeChange()
        this.tuitionFeeAssessment = this.enrollmentDetails?.tuitionFeeAssessment
        if (this.enrollmentDetails?.application?.paymentMode !== null) {
            this.tuitionFeeValidation = false
            // this.enrollmentStep = 3
            if (this.tuitionFeeAssessment) {
                this.tuitionFeeAmounts = {
                    totalTuitionFee: this.tuitionFeeAssessment.total_payment,
                    uponEnrollmentFee: this.tuitionFeeAssessment.upon_enrollment,
                    monthlyFee: this.tuitionFeeAssessment.monthly_payment
                }
            }
            /*  if (this.enrollmentDetails?.application?.paymentOnlineTransactions.length > 0) {
                 // this.enrollmentStep = 4
                 this.paymentOnlineTransactions = this.enrollmentDetails.application.paymentOnlineTransactions
                 // console.log(this.paymentOnlineTransactions)
             } */
        }
    },
    emits: ['loading', 'next-step', 'prev-step'],
    methods: {
        prevStep() {
            this.$emit('prev-step')
        },
        nextStep() {
            this.$emit('next-step')
        },
        paymentModeChange() {
            console.log(this.paymentMode)
            if (this.tuitionFeeDetails) {
                if (this.paymentMode === 'fullpayment') {
                    this.tuitionFeeAmounts = {
                        totalTuitionFee: this.tuitionFeeDetails.total_tuition,
                        uponEnrollmentFee: this.tuitionFeeDetails.total_tuition,
                        monthlyFee: 0
                    }
                    console.log(this.tuitionFeeAmounts)
                } else {
                    this.tuitionFeeAmounts = {
                        totalTuitionFee: this.tuitionFeeDetails.total_tuition_with_interest,
                        uponEnrollmentFee: this.tuitionFeeDetails.upon_enrollment,
                        monthlyFee: this.tuitionFeeDetails.monthly
                    }
                    console.log(this.tuitionFeeAmounts)
                }
            }
        },
        async proceedToPayment() {
            this.$emit('loading', true)
            this.errors = []
            try {
                const formData = new FormData()
                formData.append('paymentMode', this.paymentMode)
                const apiService = new OnboardTrainingApi()
                const response = await apiService.postForm(
                    formData,
                    apiLink.onboardApiLink.paymentMode
                )
                alertSuccess(response.message)
                window.location.reload()
            } catch (error) {
                if (error.response?.status === 422) {
                    this.errors = error.response?.data?.errors ?? {}
                }
                alertError(error.response?.data?.message || error.message)
            } finally {
                this.$emit('loading', false)
            }
        }
    }
}
</script>