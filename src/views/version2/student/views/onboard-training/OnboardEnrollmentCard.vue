<template>
    <h3 class="h4 fw-bold mb-4 text-dark">Onboard Enrollment Process</h3>


    <!-- Stepper -->
    <div class="card bg-light border p-3 mb-4">
        <div class="stepper">
            <div v-for="(step, index) in steps" :key="index" class="stepper-item"
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
                :shipping-agencies="shipboardApplication.shippingAgenciesList"
                :vessel-type="shipboardApplication.vesselType" :document-list="shipboardApplication.documents"
                @loading="loaderStatus" />
            <ShipboardInformationCard v-else :information="shipboardInformation"
                :document-list="shipboardApplication.documents" :isDocumentShow="true" />
        </div>
        <div v-if="enrollmentStep === 2" class="p-4">
            <EnrollmentEvaluationCard :enrollment-details="enrollmentDetails"
                :shipboard-information="shipboardInformation" />
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
import ShipboardApplicationCard from './components/ShipboardApplicationCard.vue'
import { OnboardTrainingApi } from '@/services/api/onboardTrainingApi.js'
import apiLink from '@/services/api/apiLink.js'
import { alertError } from '@/utils/alert.js'
import ShipboardInformationCard from './components/ShipboardInformationCard.vue'
import EnrollmentEvaluationCard from './components/EnrollmentEvaluationCard.vue'
export default {
    name: 'OnboardEnrollmentCard',
    components: {
        ShipboardApplicationCard, ShipboardInformationCard, EnrollmentEvaluationCard
    },
    data() {
        // const formData = new FormData()
        return {
            contentLoader: true,
            steps: [{ name: 'Shipboard Application' }, { name: 'Evaluation' }, { name: 'Fee Assessment' }, { name: 'Payment' }, { name: 'Complete' }],
            paymentMode: 0,
            enrollmentStep: 1,
            enrollmentDetails: [],
            shipboardApplication: [],
            shipboardInformation: [],
            errors: [],
            apiService: new OnboardTrainingApi()
        }
    },
    async mounted() {
        console.log(this.shipboardApplication)
        this.fetchData()
    },
    methods: {
        nextStep() { this.enrollmentStep++ },
        async fetchData() {
            try {
                const data = await this.apiService.getData(apiLink.onboardApiLink.onboardEnrollment)
                if (data) {
                    this.shipboardApplication = data.shipboardApplication
                    this.shipboardInformation = data.shipboardInformation
                    if (data.shipboardInformation) {
                        if (data.shipboardInformation.is_approved) {
                            this.enrollmentStep = 2

                            this.enrollmentDetails = data.enrollment.enrollment
                            console.log(this.enrollmentDetails)
                        }
                    }
                    this.contentLoader = false
                    console.log(this.shipboardApplication)
                }
            } catch (error) {
                alertError(error.response?.data?.message || error.message)
            }
            finally {
                this.contentLoader = false
            }
        },
        loaderStatus(data) {
            console.log('LOADING EVENT:', data)
            this.contentLoader = data
        }
    },

    updated() { feather.replace() }
}
</script>