<template>
    <h3 class="h4 fw-bold mb-4 text-dark">Onboard Enrollment Process</h3>


    <!-- Stepper -->
    <div class="card bg-light border p-3 mb-4">
        <div class="stepper">
            <div v-for="(step, index) in steps" :key="index" class="stepper-item"
                @click="enrollmentStep > index + 1 && handleCompletedStep(index + 1)"
                :class="{ 'completed': enrollmentStep > index + 1, 'active': enrollmentStep === index + 1 }">
                <div class="stepper-circle" style="border-color: #f8fafc;">
                    <i v-if="enrollmentStep > index + 1" data-feather="check"></i>
                    <span v-else>{{ index + 1 }}</span>
                </div>
                <div class="stepper-label fw-semibold"
                    :class="{ 'text-dark': enrollmentStep >= index + 1, 'text-muted': enrollmentStep < index + 1 }">
                    {{
                        step.name }}</div>
                <div class="stepper-line" v-if="index < steps.length - 1"></div>
            </div>
        </div>
    </div>
    <div v-show="!contentLoader" class="card">
        <!-- Step 0: Start -->
        <div v-if="enrollmentStep === 1" class="p-4">
            <ShipboardApplicationCard v-if="!shipboardInformation"
                :shipping-agencies="shipboardApplication?.shippingAgenciesList"
                :vessel-type="shipboardApplication?.vesselType" :document-list="shipboardApplication?.documents"
                @loading="loaderStatus" />
            <ShipboardInformationCard v-else :information="shipboardInformation"
                :document-list="shipboardApplication?.documents" :isDocumentShow="true" />
        </div>
        <div v-else-if="enrollmentStep === 2" class="p-4">
            <EnrollmentEvaluationCard :enrollment-details="enrollmentDetails"
                :shipboard-information="shipboardInformation" @loading="loaderStatus" @next-step="nextStep" />
        </div>
        <div v-else-if="enrollmentStep === 3" class="p-4">
            <FeeAssessmentCard :enrollment-details="enrollmentDetails" :tuition-fee-assessments="tuitionFeeAssessment"
                @loading="loaderStatus" @next-step="nextStep" @prev-step="prevStep" />
        </div>
        <div v-else-if="enrollmentStep === 4" class="p-4">
            <PaymentTransactionCard :tuitionFeeAssessments="tuitionFeeAssessment"
                :paymentOnlineTransactions="paymentOnlineTransactions" @loading="loaderStatus" @next-step="nextStep"
                @prev-step="prevStep" />
        </div>
        <div v-else-if="enrollmentStep === 5" class="p-4">
            <CompleteEnrollmentCard :enrollment="enrollmentDetails" @loading="loaderStatus" />
        </div>
    </div>
    <div v-show="contentLoader" class="page-loader">
        <div class="card">
            <div class="card-body align-center">
                <div class="enrollment-loader"></div>
            </div>
        </div>
    </div>
</template>
<style>
.page-loader {
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    /* dark background */
}

.enrollment-loader {
    width: 60px;
    height: 60px;
    border: 6px solid rgba(255, 255, 255, 0.2);
    border-top-color: #38bdf8;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
</style>
<script>
import feather from 'feather-icons'
import { alertError } from '@/utils/alert.js'
import ShipboardApplicationCard from './components/ShipboardApplicationCard.vue'
import ShipboardInformationCard from './components/ShipboardInformationCard.vue'
import EnrollmentEvaluationCard from './components/EnrollmentEvaluationCard.vue'
import FeeAssessmentCard from './components/FeeAssessmentCard.vue'
import PaymentTransactionCard from './components/PaymentTransactionCard.vue'
import CompleteEnrollmentCard from './components/CompleteEnrollmentCard.vue'
export default {
    name: 'OnboardEnrollmentCard',
    components: {
        ShipboardApplicationCard, ShipboardInformationCard, EnrollmentEvaluationCard, FeeAssessmentCard, PaymentTransactionCard, CompleteEnrollmentCard
    },
    props: {
        enrollmentData: Object
    },
    data() {
        // const formData = new FormData()
        return {
            contentLoader: true,
            steps: [{ name: 'Shipboard Application' }, { name: 'Evaluation' }, { name: 'Fee Assessment' }, { name: 'Payment' }, { name: 'Complete' }],
            paymentMode: 0,
            enrollmentStep: 1,
            activePanel: 1,
            enrollmentDetails: null,
            shipboardApplication: null,
            shipboardInformation: null,
            tuitionFeeAssessment: null,
            paymentOnlineTransactions: null,
            errors: []
        }
    },
    async mounted() {
        this.fetchDataV2()
    },
    methods: {
        nextStep() { this.enrollmentStep++ },
        prevStep() { this.enrollmentStep-- },
        handleCompletedStep(index) {
            console.log(index)
            console.log(this.enrollmentStep)
            this.activePanel = index
            this.enrollmentStep = index
        },
        fetchDataV2() {
            try {
                if (this.enrollmentData) {
                    this.shipboardApplication = this.enrollmentData.shipboardApplication
                    this.shipboardInformation = this.enrollmentData.shipboardApplication.shipboardInformation
                    if (this.shipboardInformation) {
                        if (this.shipboardInformation.is_approved) {
                            this.enrollmentStep = 2
                            this.enrollmentDetails = this.enrollmentData
                            if (this.enrollmentData) {
                                // ENROLLMENT APPLICATION
                                if (this.enrollmentData.application) {
                                    if (this.enrollmentData.application.isApproved) {
                                        if (this.tuitionFeeAssessment || this.enrollmentData?.application?.paymentMode !== null) {
                                            this.enrollmentStep = 3
                                            if (this.enrollmentDetails.tuitionFeeAssessment) {
                                                this.tuitionFeeAssessment = this.enrollmentDetails.tuitionFeeAssessment
                                                if (this.enrollmentDetails.paymentOnlineTransactions.length > 0) {
                                                    this.enrollmentStep = 4
                                                    this.paymentOnlineTransactions = this.enrollmentDetails.paymentOnlineTransactions
                                                    if (this.enrollmentDetails.paymentTransactions) {
                                                        this.enrollmentStep = 5
                                                    }
                                                    // console.log(this.paymentOnlineTransactions)
                                                }
                                            }
                                        }
                                    }
                                }
                                /*  this.enrollmentStep = 3
                                  */
                            }
                        }
                    }
                    this.activePanel = this.enrollmentStep
                    this.contentLoader = false
                }
            } catch (error) {
                alertError(error.response?.data?.message || error.message)
            }
            finally {
                this.contentLoader = false
            }
        },
        loaderStatus(data) {
            this.contentLoader = data
        }
    },
    updated() {
        this.$nextTick(() => {
            feather.replace()
        })
    }
    /* updated() { feather.replace() } */
}
</script>