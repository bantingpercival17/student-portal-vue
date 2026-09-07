<template>
    <div>
        <h4 class="fw-bold mb-3">Step 1: Verify Your Information</h4>
        <p>Please review your personal information below. If everything is correct, submit it for evaluation by
            the registrar's office. If you need to make changes, please visit the "Update Profile" page first.
        </p>
        <div class="card data-card mb-4">
            <div class="card-header bg-white py-3 px-4 border-bottom d-flex justify-content-between align-items-center">
                <span class="card-section-title">
                    <i class="bi bi-person-vcard text-primary fs-5"></i> Personal Details
                </span>
                <span
                    class="badge bg-success-subtle text-success border border-success-subtle px-2.5 py-1 rounded-pill">
                    <i class="bi bi-check-circle-fill me-1"></i> Active Record
                </span>
            </div>
            <div class="card-body p-4">
                <div class="row g-3">
                    <div class="col-12 col-md-6 col-lg-4">
                        <div class="p-3 bg-light rounded-3 h-100 border border-light-subtle">
                            <small class="text-muted text-sm">FULL NAME</small> <br>
                            <label class="text-success fw-bolder">{{ enrollmentDetails.studentInfo.fullname }}</label>
                        </div>
                    </div>
                    <div class="col-6 col-md-3 col-lg-2">
                        <div class="p-3 bg-light rounded-3 h-100 border border-light-subtle">
                            <small class="text-muted text-sm">STUDENT NUMBER</small> <br>
                            <label class="text-success fw-bolder">
                                {{ enrollmentDetails.studentInfo.student_number }}
                            </label>
                        </div>
                    </div>
                    <div class="col-6 col-md-3 col-lg-3">
                        <div class="p-3 bg-light rounded-3 h-100 border border-light-subtle">
                            <small class="text-muted text-sm">COURSE PROGRAM</small> <br>
                            <label class="text-success fw-bolder">
                                {{ enrollmentDetails.studentInfo.course }}
                            </label>
                        </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-3">
                        <div class="p-3 bg-light rounded-3 h-100 border border-light-subtle">
                            <small class="text-muted text-sm">INSTITUTION EMAIL</small> <br>
                            <label class="text-success fw-bolder">
                                {{ enrollmentDetails.studentInfo.email }}
                            </label>
                        </div>
                    </div>

                    <div class="col-12 col-sm-6 col-md-4">
                        <div class="p-3 bg-light rounded-3 h-100 border border-light-subtle">
                            <small class="text-muted text-sm">PHONE NUMBER</small> <br>
                            <label class="text-success fw-bolder">
                                {{ enrollmentDetails.studentInfo.contactNumber }}
                            </label>
                        </div>
                    </div>
                    <div class="col-12 col-sm-6 col-md-4">
                        <div class="p-3 bg-light rounded-3 h-100 border border-light-subtle">
                            <small class="text-muted text-sm">BIRTHDAY </small> <br>
                            <label class="text-success fw-bolder">{{ enrollmentDetails.studentInfo.birthdate }}</label>
                        </div>
                    </div>
                    <div class="col-12 col-md-4">
                        <div class="p-3 bg-light rounded-3 h-100 border border-light-subtle">
                            <small class="text-muted text-sm">BIRTH PLACE</small> <br>
                            <label class="text-success fw-bolder">{{ enrollmentDetails.studentInfo.birthplace }}</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Domestic Shipping Beneficiary Action Alert -->
        <div v-if="shipboardInformation.shipping_company == 'Domestic Shipping'" id="domesticBeneficiaryNotice"
            class="mt-4 mb-3 p-3 bg-warning-subtle border border-warning-subtle rounded-3 d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3">
            <div class="d-flex align-items-center gap-2 text-warning-emphasis">
                <i class="bi bi-exclamation-triangle-fill fs-5"></i>
                <div>
                    <strong class="d-block">Domestic Shipping Detected!</strong>
                    <span id="beneficiaryNoticeText" class="small">Beneficiary information is required for onboard
                        insurance
                        coverage.</span>
                </div>
            </div>
            <button type="button" class="btn btn-info text-white btn-sm pulse-animation text-nowrap"
                data-bs-toggle="modal" data-bs-target="#beneficiaryModal">
                <i class="bi bi-person-plus-fill me-1"></i> <span id="beneficiaryBtnLabel">Fill-Up Beneficiary
                    Form</span>
            </button>
        </div>
        <div class="card data-card mb-4">
            <div class="card-header bg-white py-3 px-4 border-bottom">
                <span class="card-section-title">
                    <i class="bi bi-clock-history text-secondary fs-5"></i> Previous Enrollment Details
                </span>
            </div>
            <div class="card-body p-4">
                <div class="row g-3">
                    <div class="col-6 col-md">
                        <div class="p-3 bg-light rounded-3 h-100 border border-light-subtle">
                            <small class="text-muted text-sm">ACADEMIC SCHOOL YEAR</small> <br>
                            <label class="text-success fw-bolder">
                                {{ enrollmentDetails.studentInfo.previousEnrollment.schoolYear || 'Not provided' }}
                            </label>
                        </div>
                    </div>
                    <div class="col-12 col-md">
                        <div class="p-3 bg-light rounded-3 h-100 border border-light-subtle">
                            <small class="text-muted text-sm">CURRICULUM TRACK</small> <br>
                            <label class="text-success fw-bolder">
                                {{ enrollmentDetails.studentInfo.previousEnrollment.curriculum || 'Not provided' }}
                            </label>
                        </div>
                    </div>
                    <div class="col-12 col-md">
                        <div class="p-3 bg-light rounded-3 h-100 border border-light-subtle">
                            <small class="text-muted text-sm">YEAR LEVEL</small> <br>
                            <label class="text-success fw-bolder">
                                {{ convertYearLevel(enrollmentDetails.studentInfo.previousEnrollment.yearLevel) || 'Not provided' }}
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card border-0 shadow-sm p-4 bg-white rounded-3">

            <div class="form-check mb-4">
                <input class="form-check-input" type="checkbox" id="confirmDataCheck" v-model="isConfirmed"
                    style="width: 20px; height: 20px; cursor: pointer;">

                <label class="form-check-label ms-2 text-dark fw-medium align-middle" for="confirmDataCheck"
                    style="cursor: pointer;">
                    I confirm that all personal, shipboard classification, and beneficiary details above have been
                    verified accurate.
                </label>
            </div>

            <div
                class="d-flex flex-column flex-sm-row justify-content-end gap-3 align-items-stretch align-items-sm-center">

                <button type="button" class="btn btn-outline-navy" data-bs-toggle="modal"
                    data-bs-target="#updateProfileModal">
                    <i class="bi bi-pencil-square me-2"></i>
                    Update Profile First
                </button>

                <button type="button" id="submitBtn" class="btn btn-success" :class="{ disabled: !isConfirmed }"
                    :disabled="!isConfirmed" @click="submitForEvaluation">
                    Submit For Evaluation
                    <i class="bi bi-arrow-right ms-2"></i>
                </button>

            </div>
        </div>

        <div class="d-flex justify-content-end">
            <button class="btn btn-secondary me-3" @click="submitForEvaluation">Update Profile</button>
            <button class="btn btn-primary" @click="submitForEvaluation">Submit for Evaluation</button>
        </div>
    </div>

    <!-- Step 2: Evaluation -->
    <!--  <div class="text-center p-4">
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
    </div> -->

</template>

<script>
export default {
    name: 'EnrollmentEvaluationCard',
    data() {
        return {
            enrollmentStep: 1,
            evaluationStatus: 'pending', // can be 'pending' or 'approved'
            isConfirmed: false
        }
    },
    props: {
        enrollmentDetails: Object,
        shipboardInformation: Object
    },
    methods: {
        nextStep() {
            this.$emit('next-step')
        },
        convertYearLevel(data) {
            return ({ 1: '1st Class', 2: '2nd Class', 3: '2nd Class', 4: '3rd Class' }[data] || '4th Class')
        }
        /* convertYearLevel(yearLevel) {
            const yearLevels = {
                1: 'First Year',
                2: 'Second Year',
                3: 'Third Year',
                4: 'Fourth Year',
                5: 'Fifth Year'
            }
            return yearLevels[yearLevel] || 'Unknown'
        } */
    }
}
</script>