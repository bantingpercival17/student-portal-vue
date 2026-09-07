<template>
    <div class="card p-4">
        <h3 class="h4 fw-bold mb-4 text-dark">Current Enrollment Process</h3>

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

        <!-- Step Content -->
        <div v-if="!contentLoader" class="card p-4">
            <!-- Step 0: Start -->
            <div v-if="enrollmentStep === 0" class="text-center p-4">
                <i data-feather="file-text" class="text-primary mb-3" style="width: 64px; height: 64px;"></i>
                <h4 class="fw-bold">Enrollment for A.Y. {{ currentAcademicYear }}</h4>
                <p class="text-muted">Ready to start the next semester? Click the button below to begin your enrollment
                    process.</p>
                <button class="btn btn-primary btn-lg mt-3" @click="startEnrollment()">Enroll Now</button>
            </div>

            <!-- Step 1: Verify Information -->
            <div v-if="enrollmentStep === 1">
                <h4 class="fw-bold mb-3">Step 1: Verify Your Information</h4>
                <p>Please review your personal information below. If everything is correct, submit it for evaluation by
                    the registrar's office. If you need to make changes, please visit the "Update Profile" page first.
                </p>
                <ul class="list-group mb-4">
                    <li class="list-group-item"><strong>Name:</strong> {{ enrollmentDetails.student.studentName }}</li>
                    <li class="list-group-item"><strong>Student ID:</strong>
                        {{ enrollmentDetails.student.studentNumber }}
                    </li>
                    <li class="list-group-item"><strong>Course:</strong> {{ enrollmentDetails.student.course }}</li>
                </ul>
                <label class="fw-bolder mb-2">PREVIOUS ENROLLMENT DETAILS</label>
                <ul class="list-group mb-4">
                    <li class="list-group-item"><strong>ACADEMIC SCHOOL YEAR:</strong>
                        {{ enrollmentDetails.student.previousEnrollment.schoolYear }}
                    </li>
                    <li class="list-group-item"><strong>COURSE:</strong>
                        {{ enrollmentDetails.student.previousEnrollment.course }}
                    </li>
                    <li class="list-group-item"><strong>CURRICULUM:</strong>
                        {{ enrollmentDetails.student.previousEnrollment.curriculum }}
                    </li>
                    <li class="list-group-item"><strong>YEAR LEVEL:</strong>
                        {{ convertYearLevel(enrollmentDetails.student.previousEnrollment.yearLevel) }}
                    </li>
                </ul>
                <label class="fw-bolder mb-2">ENROLLMENT APPLICATION</label>
                <ul class="list-group mb-4">
                    <li class="list-group-item"><strong>ACADEMIC SCHOOL YEAR:</strong>
                        {{ currentAcademicYear }}
                    </li>
                    <li class="list-group-item"><strong>COURSE:</strong>
                        {{ enrollmentDetails.student.previousEnrollment.course }}
                    </li>
                    <li class="list-group-item"><strong>CURRICULUM:</strong>
                        {{ enrollmentDetails.student.previousEnrollment.curriculum }}
                    </li>
                </ul>
                <div class="d-flex justify-content-end">
                    <button class="btn btn-secondary me-3" @click="submitForEvaluation">Update Profile</button>
                    <button class="btn btn-primary" @click="submitForEvaluation">Submit for Evaluation</button>
                </div>
            </div>

            <!-- Step 2: Evaluation -->
            <div v-if="enrollmentStep === 2" class="text-center p-4">
                <h4 class="fw-bold mb-3">Step 2: Under Evaluation</h4>
                <div v-if="evaluationStatus === 'pending'" class="d-flex flex-column align-items-center">
                    <div class="spinner-border text-primary mb-3" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <p class="text-muted">Your records are currently being evaluated by the registrar's office. This may
                        take a few moments. Please wait.</p>
                </div>
                <div v-if="evaluationStatus === 'approved'" class="d-flex flex-column align-items-center">
                    <i data-feather="check-circle" class="text-success mb-3" style="width: 64px; height: 64px;"></i>
                    <h5 class="fw-bold text-success">Evaluation Complete!</h5>
                    <p class="text-muted">You are cleared to proceed with enrollment. Please view your fee assessment
                        for the upcoming semester.</p>
                    <button class="btn btn-success mt-3" @click="nextStep">Proceed to Assessment</button>
                </div>
            </div>

            <!-- Step 3: Assessment -->
            <div v-if="enrollmentStep === 3">
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
                                                <option value="0">Full-payment</option>
                                                <option value="1">Installment</option>
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
                        <button class="btn btn-secondary me-2" @click="enrollmentStep--">Back</button>
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

            <!-- Step 4: Payment -->
            <div v-if="enrollmentStep === 4">
                <h4 class="fw-bold mb-3">Step 4: Payment</h4>
                <p>Please select your preferred payment method for the total amount of
                    <strong> ₱ {{ tuitionFeeAmounts.uponEnrollmentFee.toLocaleString('en-US', {
                        minimumFractionDigits: 1
                    }) }}</strong>.
                </p>
                <PaymentOptionComponents v-if="tuitionFeeAssessment" :assessment="tuitionFeeAssessment?.id ?? null"
                    :transactions="paymentOnlineTransactions" />
                <div class="d-flex justify-content-end mt-4">
                    <button class="btn btn-secondary me-2" @click="enrollmentStep--">Back to Assessment</button>
                </div>
            </div>


            <!-- Step 5: Complete -->
            <div v-if="enrollmentStep === 5" class="text-center p-5">
                <i data-feather="award" class="text-success mb-3" style="width: 64px; height: 64px;"></i>
                <h4 class="fw-bold">Enrollment Complete!</h4>
                <p class="text-muted">Congratulations, you are officially enrolled for A.Y. 2025-2026. You can now
                    download your Certificate of Enrollment.</p>
                <button class="btn btn-success mt-3 d-flex align-items-center mx-auto" @click="downloadCertificate">
                    <i data-feather="download" class="me-2"></i>Download Certificate
                </button>
            </div>
        </div>
        <div v-else class="page-loader">
            <div class="card">
                <div class="card-body align-center">
                    <div class="enrollment-loader"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { EnrollmentApi } from '@/services/api/enrollmentApi'
import feather from 'feather-icons'
import PaymentOptionComponents from '../../payments/PaymentOptionComponents.vue'
export default {
    name: 'EnrollmentProcess',
    components: { PaymentOptionComponents },
    data() {
        const formData = new FormData()
        return {
            contentLoader: true,
            paymentMode: 0,
            enrollmentStep: 0,
            evaluationStatus: 'pending',
            steps: [{ name: 'Verify Info' }, { name: 'Evaluation' }, { name: 'Fee Assessment' }, { name: 'Payment' }, { name: 'Complete' }],
            enrollmentDetails: [],
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
            enrollmentApi: new EnrollmentApi(),
            formData,
            errors: [],
            formInput: {
                transactionDate: '',
                amount: '',
                paymentMethod: '',
                referenceNumber: ''
            },
            paymentOnlineTransactions: []
        }
    },
    async mounted() {
        this.enrollmentProcess()
    },
    methods: {
        async enrollmentProcess() {
            this.enrollmentDetails = await this.enrollmentApi.currentEnrollmentProcess()
            if (this.enrollmentDetails) {
                this.currentAcademicYear = this.enrollmentDetails.currentAcademic.semester + ' - ' + this.enrollmentDetails.currentAcademic.school_year
                if (this.enrollmentDetails.enrollmentApplication.enrollmentApplication) {
                    this.enrollmentStep = 2
                    this.evaluationStatus = 'pending'
                    if (this.enrollmentDetails.enrollmentApplication.currentEnrollmentAssessment) {
                        this.evaluationStatus = 'approved'
                        this.assignedCourses = this.enrollmentDetails.enrollmentApplication.currentEnrollmentAssessment.subjectList
                        this.tuitionFeeDetails = this.enrollmentDetails.enrollmentApplication.currentEnrollmentAssessment.tuitionFee
                        this.paymentModeChange()
                        this.tuitionFeeAssessment = this.enrollmentDetails.enrollmentApplication.tuitionFeeAssessment
                        if (this.enrollmentDetails.enrollmentApplication.enrollmentApplication.paymentMode !== null) {
                            this.tuitionFeeValidation = false
                            this.enrollmentStep = 3
                            if (this.tuitionFeeAssessment) {
                                this.tuitionFeeAmounts = {
                                    totalTuitionFee: this.tuitionFeeAssessment.total_payment,
                                    uponEnrollmentFee: this.tuitionFeeAssessment.upon_enrollment,
                                    monthlyFee: this.tuitionFeeAssessment.monthly_payment
                                }
                            }
                            if (this.enrollmentDetails.enrollmentApplication.paymentOnlineTransactions.length > 0) {
                                this.enrollmentStep = 4
                                this.paymentOnlineTransactions = this.enrollmentDetails.enrollmentApplication.paymentOnlineTransactions
                                // console.log(this.paymentOnlineTransactions)
                            }
                        }
                    }
                }
                this.contentLoader = false
            }
        },
        startEnrollment() {
            console.log('clicked')
            console.log(this.enrollmentDetails)
            console.log(this.enrollmentDetails?.cci_completer)

            if (!this.enrollmentDetails?.cci_completer) {
                console.log('redirecting...')
                window.location.href = '/#/student/v2/onboard-training#enrollment'
            } else {
                this.enrollmentStep += 1
            }
        },
        nextStep() { this.enrollmentStep++ },
        async submitForEvaluation() {
            this.contentLoader = true
            await this.enrollmentApi.enrollmentApplication().then(response => {
                this.enrollmentStep = 2
                this.evaluationStatus = 'pending'
            }).catch(error => {
                console.log(error)
            }).finally(error => {
                console.log(error)
                this.contentLoader = false
            })
        },
        async proceedToPayment() {
            const formData = new FormData()
            formData.append('paymentMode', this.paymentMode)
            await this.enrollmentApi.submitPaymentMode(formData)
                .then(response => {
                    console.log(response)
                }).catch(error => {
                    console.log(error)
                })
        },
        generatePaymentSlip() {
            this.$root.showNotification('Generating payment slip...', 'info')
            setTimeout(() => {
                this.$root.showNotification('Payment slip generated. Please pay at the cashier.', 'success')
                this.nextStep() // Move to "Complete" step
            }, 1500)
        },
        uploadProof(method) {
            const message = method === 'bank' ? 'Uploading deposit slip...' : 'Uploading transaction screenshot...'
            this.$root.showNotification(message, 'info')
            setTimeout(() => {
                if (method === 'bank') this.bankProofUploaded = true
                else if (method === 'ewallet') this.ewalletProofUploaded = true
                this.$nextTick(() => feather.replace())
            }, 1500)
        },
        downloadCertificate() {
            this.$root.downloadCertificate()
        },
        convertYearLevel(data) {
            return ({ 1: '1st Class', 2: '2nd Class', 3: '2nd Class', 4: '3rd Class' }[data] || '4th Class')
        },
        paymentModeChange() {
            if (this.tuitionFeeDetails) {
                if (this.paymentMode === 0) {
                    this.tuitionFeeAmounts = {
                        totalTuitionFee: this.tuitionFeeDetails.total_tuition,
                        uponEnrollmentFee: this.tuitionFeeDetails.total_tuition,
                        monthlyFee: 0
                    }
                } else {
                    this.tuitionFeeAmounts = {
                        totalTuitionFee: this.tuitionFeeDetails.total_tuition_with_interest,
                        uponEnrollmentFee: this.tuitionFeeDetails.upon_enrollment,
                        monthlyFee: this.tuitionFeeDetails.monthly
                    }
                }
            }
        },
        async submitPaymentTransaction() {
            this.errors = {}
            this.formData.append('transactionDate', this.formInput.transactionDate)
            this.formData.append('amountPaid', this.formInput.amount)
            this.formData.append('referenceNumber', this.formInput.referenceNumber)
            this.formData.append('paymentMethod', this.formInput.paymentMethod)
            console.log(this.formData)
            const response = await this.enrollmentApi.submitEnrollmentPayment(this.formData)
            console.log(response)
        }
    },
    updated() { feather.replace() }
}
</script>