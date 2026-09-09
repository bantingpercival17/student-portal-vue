<template>
    <div v-if="!enrollmentDetails.application">
        <h4 class="fw-bold mb-3">Verify Your Information</h4>
        <p>Please review your personal information below. If everything is correct, submit it for evaluation by
            the registrar's office. If you need to make changes, please visit the "Update Profile" page first.
        </p>
        <hr>
        <div class="student-information">
            <div class="d-flex justify-content-between align-items-center mb-2">
                <span class="card-section-title">
                    <h5 class="fw-bold text-primary mb-0">
                        <i class="bi bi-person-vcard text-primary fs-5"></i> Personal Details
                    </h5>
                </span>
                <span
                    class="badge bg-success-subtle text-success border border-success-subtle px-2.5 py-1 rounded-pill">
                    <i class="bi bi-check-circle-fill me-1"></i> Active Record
                </span>
            </div>
            <div class="">
                <div class="row g-3">
                    <div class="col-12 col-md-6 col-lg-4">
                        <div class="p-3 bg-light rounded-3 h-100 border border-light-subtle">
                            <small class="text-muted text-sm">FULL NAME</small> <br>
                            <label class="text-success fw-bolder">{{ enrollmentDetails.studentInfo?.fullname }}</label>
                        </div>
                    </div>
                    <div class="col-12 col-md-3 col-lg-2">
                        <div class="p-3 bg-light rounded-3 h-100 border border-light-subtle">
                            <small class="text-muted text-sm">STUDENT NUMBER</small> <br>
                            <label class="text-success fw-bolder">
                                {{ enrollmentDetails.studentInfo?.student_number }}
                            </label>
                        </div>
                    </div>
                    <div class="col-12 col-md-3 col-lg-3">
                        <div class="p-3 bg-light rounded-3 h-100 border border-light-subtle">
                            <small class="text-muted text-sm">COURSE PROGRAM</small> <br>
                            <label class="text-success fw-bolder">
                                {{ enrollmentDetails.studentInfo?.course }}
                            </label>
                        </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-3">
                        <div class="p-3 bg-light rounded-3 h-100 border border-light-subtle">
                            <small class="text-muted text-sm">INSTITUTION EMAIL</small> <br>
                            <label class="text-success fw-bolder">
                                {{ enrollmentDetails.studentInfo?.email }}
                            </label>
                        </div>
                    </div>

                    <div class="col-12 col-sm-6 col-md-4">
                        <div class="p-3 bg-light rounded-3 h-100 border border-light-subtle">
                            <small class="text-muted text-sm">PHONE NUMBER</small> <br>
                            <label class="text-success fw-bolder">
                                {{ enrollmentDetails.studentInfo?.contactNumber }}
                            </label>
                        </div>
                    </div>
                    <div class="col-12 col-sm-6 col-md-4">
                        <div class="p-3 bg-light rounded-3 h-100 border border-light-subtle">
                            <small class="text-muted text-sm">BIRTHDAY </small> <br>
                            <label class="text-success fw-bolder">{{ enrollmentDetails.studentInfo?.birthdate }}</label>
                        </div>
                    </div>
                    <div class="col-12 col-md-4">
                        <div class="p-3 bg-light rounded-3 h-100 border border-light-subtle">
                            <small class="text-muted text-sm">BIRTH PLACE</small> <br>
                            <label class="text-success fw-bolder">{{ enrollmentDetails.studentInfo?.birthplace }}</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <hr>
        <!-- Domestic Shipping Beneficiary Action Alert -->
        <template v-if="enrollmentDetails.studentInfo">
            <template v-if="enrollmentDetails.studentInfo.insuranceBeneficiary">
                <div class="student-beneficiary">
                    <div class="row">
                        <div class="col-12 col-md-9">
                            <h5 class="fw-bold text-success mb-0">
                                <i class="bi bi-person-fill-add text-success fs-4"></i>
                                Domestic Shipping - Beneficiary Form
                            </h5>
                        </div>
                        <div class="col-12 col-md-3">
                            <button type="button" class="btn btn-outline-success btn-sm float-end"
                                data-bs-toggle="modal" data-bs-target="#beneficiaryModal">
                                <i class="bi bi-person-plus-fill me-1"></i> Update Beneficiary Information
                            </button>
                        </div>
                    </div>
                    <div class="mt-4">
                        <div class="row g-3">
                            <div class="col-12 col-md-6 col-lg-6">
                                <div class="p-3 bg-light rounded-3 h-100 border border-light-subtle">
                                    <small class="text-muted text-sm">FULL NAME</small> <br>
                                    <label class="text-success fw-bolder">
                                        {{ beneficiaryName(enrollmentDetails.studentInfo.insuranceBeneficiary) }}
                                    </label>
                                </div>
                            </div>
                            <div class="col-12 col-lg-3">
                                <div class="p-3 bg-light rounded-3 h-100 border border-light-subtle">
                                    <small class="text-muted text-sm">RELATIONSHIP</small> <br>
                                    <label class="text-success fw-bolder">
                                        {{ enrollmentDetails.studentInfo.insuranceBeneficiary.relationship }}
                                    </label>
                                </div>
                            </div>
                            <div class="col-12 col-lg-3">
                                <div class="p-3 bg-light rounded-3 h-100 border border-light-subtle">
                                    <small class="text-muted text-sm">NATIONALITY</small> <br>
                                    <label class="text-success fw-bolder">
                                        {{ enrollmentDetails.studentInfo.insuranceBeneficiary.nationality }}
                                    </label>
                                </div>
                            </div>
                            <div class="col-12 col-md-4">
                                <div class="p-3 bg-light rounded-3 h-100 border border-light-subtle">
                                    <small class="text-muted text-sm">BIRTH DATE </small> <br>
                                    <label class="text-success fw-bolder">
                                        {{ enrollmentDetails.studentInfo.insuranceBeneficiary.birthDate }}
                                    </label>
                                </div>
                            </div>
                            <div class="col-12 col-md-8">
                                <div class="p-3 bg-light rounded-3 h-100 border border-light-subtle">
                                    <small class="text-muted text-sm">BIRTH PLACE</small> <br>
                                    <label class="text-success fw-bolder">
                                        {{ enrollmentDetails.studentInfo.insuranceBeneficiary.birthPlace }}
                                    </label>
                                </div>
                            </div>
                            <div class="col-12 col-md-6 col-lg-3">
                                <div class="p-3 bg-light rounded-3 h-100 border border-light-subtle">
                                    <small class="text-muted text-sm">EMAIL</small> <br>
                                    <label class="text-success fw-bolder">
                                        {{ enrollmentDetails.studentInfo.insuranceBeneficiary.email }}
                                    </label>
                                </div>
                            </div>
                            <div class="col-12 col-sm-6 col-md-4">
                                <div class="p-3 bg-light rounded-3 h-100 border border-light-subtle">
                                    <small class="text-muted text-sm">PHONE NUMBER</small> <br>
                                    <label class="text-success fw-bolder">
                                        {{ enrollmentDetails.studentInfo.insuranceBeneficiary.contactNumber }}
                                    </label>
                                </div>
                            </div>
                            <div class="col-12 col-sm-6 col-md-4">
                                <div class="p-3 bg-light rounded-3 h-100 border border-light-subtle">
                                    <small class="text-muted text-sm">ADDRESS</small> <br>
                                    <label class="text-success fw-bolder">
                                        {{ enrollmentDetails.studentInfo.address }}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr>
            </template>
        </template>
        <div v-else>
            <div v-if="shipboardInformation.shipping_company == 'Domestic Shipping' || shipboardInformation.shipping_company == 'DOMESTIC SHIP'"
                id="domesticBeneficiaryNotice"
                class="mt-4 mb-3 p-3 bg-warning-subtle border border-warning-subtle rounded-3 d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3">
                <div class="d-flex align-items-center gap-2 text-warning-emphasis">
                    <i class="bi bi-exclamation-triangle-fill fs-5"></i>
                    <div>
                        <strong class="d-block">Domestic Shipping Detected!</strong>
                        <span id="beneficiaryNoticeText" class="small">
                            Beneficiary information is required for onboard insurance coverage.
                        </span>
                    </div>
                </div>
                <button type="button" class="btn btn-outline-success btn-sm pulse-animation text-nowrap"
                    data-bs-toggle="modal" data-bs-target="#beneficiaryModal">
                    <i class="bi bi-person-plus-fill me-1"></i>
                    <span id="beneficiaryBtnLabel">
                        Fill-Up Beneficiary
                    </span>
                </button>
            </div>
            <hr>
        </div>

        <div class="enrollment-details mb-4">
            <div class="d-flex justify-content-between align-items-center mb-2">
                <span class="card-section-title">
                    <h5 class="fw-bold text-primary mb-0">
                        <i class="bi bi-clock-history text-secondary fs-5"></i> Previous Enrollment Details
                    </h5>
                </span>
            </div>
            <div class="row g-3">
                <div class="col-12 col-md">
                    <div class="p-3 bg-light rounded-3 h-100 border border-light-subtle">
                        <small class="text-muted text-sm">ACADEMIC SCHOOL YEAR</small> <br>
                        <label class="text-success fw-bolder">
                            {{ enrollmentDetails.studentInfo?.previousEnrollment.schoolYear || 'Not provided' }}
                        </label>
                    </div>
                </div>
                <div class="col-12 col-md">
                    <div class="p-3 bg-light rounded-3 h-100 border border-light-subtle">
                        <small class="text-muted text-sm">CURRICULUM TRACK</small> <br>
                        <label class="text-success fw-bolder">
                            {{ enrollmentDetails.studentInfo?.previousEnrollment.curriculum || 'Not provided' }}
                        </label>
                    </div>
                </div>
                <div class="col-12 col-md">
                    <div class="p-3 bg-light rounded-3 h-100 border border-light-subtle">
                        <small class="text-muted text-sm">YEAR LEVEL</small> <br>
                        <label class="text-success fw-bolder">
                            {{ convertYearLevel(enrollmentDetails.studentInfo?.previousEnrollment.yearLevel)
                                || 'Not provided' }}
                        </label>
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
        <div class="modal fade" id="beneficiaryModal" tabindex="-1" aria-labelledby="beneficiaryModalLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content border-0 shadow">
                    <div class="modal-header bg-navy text-white" style="background: var(--primary-navy);">
                        <div class="d-flex align-items-center gap-2">
                            <i class="bi bi-person-fill-add text-success fs-4"></i>
                            <h5 class="modal-title fw-bold text-success mb-0" id="beneficiaryModalLabel">
                                Domestic Shipping - Beneficiary Form
                            </h5>
                        </div>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <form id="beneficiaryForm" @submit.prevent="saveBeneficiary" method="post">
                        <div class="modal-body p-4">
                            <div class="alert alert-warning border-0 small mb-4">
                                <i class="bi bi-shield-lock-fill me-1"></i> As required for <strong>Domestic Shipboard
                                    Training</strong> insurance policies, please provide full details of your primary
                                legal beneficiary.
                            </div>

                            <div class="row g-3">
                                <div class="col-12 col-md-12">
                                    <label for="benFullName" class="form-label fw-semibold text-dark small">Beneficiary
                                        Full Name *</label>
                                    <div class="row">
                                        <div class="col-md">
                                            <input type="text" class="form-control border border-success mb-2"
                                                v-model="formBeneficiary.lastName" id="benFullName"
                                                placeholder="LAST NAME" required>
                                        </div>
                                        <div class="col-md">
                                            <input type="text" class="form-control border border-success mb-2"
                                                v-model="formBeneficiary.firstName" id="benFullName"
                                                placeholder="FIRST NAME" required>
                                        </div>
                                        <div class="col-md">
                                            <input type="text" class="form-control border border-success mb-2"
                                                v-model="formBeneficiary.middleName" id="benFullName"
                                                placeholder="MIDDLE NAME" required>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-12 col-md-4">
                                    <label for="benRelation" class="form-label fw-semibold text-dark small">Relationship
                                        *</label>
                                    <select class="form-select border border-success"
                                        v-model="formBeneficiary.relationship" required>
                                        <option value="" disabled selected>Select Relationship</option>
                                        <option value="MOTHER">Mother</option>
                                        <option value="FATHER">Father</option>
                                        <option value="SPOUSE">Spouse</option>
                                        <option value="SIBLING">Sibling</option>
                                        <option value="LEGAL GUARDIAN">Legal Guardian</option>
                                    </select>
                                </div>
                                <div class="col-12 col-md-4">
                                    <label for="benRelation" class="form-label fw-semibold text-dark small">Date of
                                        Birth
                                        *</label>
                                    <input type="date" class="form-control border border-success"
                                        v-model="formBeneficiary.birthDate" required>
                                </div>
                                <div class="col-12 col-md-4">
                                    <label for="benRelation" class="form-label fw-semibold text-dark small">
                                        Place of Birth *
                                    </label>
                                    <input type="text" class="form-control border border-success"
                                        v-model="formBeneficiary.birthPlace" required>
                                </div>
                                <div class="col-12 col-md-12">
                                    <label for="benEmail" class="form-label fw-semibold text-dark small">
                                        Nationality *
                                    </label>
                                    <input type="text" class="form-control border border-success"
                                        v-model="formBeneficiary.nationality">
                                </div>
                                <div class="col-12 col-md-6">
                                    <label for="benPhone" class="form-label fw-semibold text-dark small">
                                        Contact Phone Number *
                                    </label>
                                    <div class="input-group">
                                        <span class="input-group-text bg-light">+63</span>
                                        <input type="tel" class="form-control border border-success"
                                            v-model="formBeneficiary.contactNumber" placeholder="9171234567"
                                            pattern="[0-9]{10}" required>
                                    </div>
                                </div>

                                <div class="col-12 col-md-6">
                                    <label for="benEmail" class="form-label fw-semibold text-dark small">
                                        Email Address *
                                    </label>
                                    <input type="email" class="form-control border border-success"
                                        v-model="formBeneficiary.email" placeholder="beneficiary@email.com">
                                </div>

                                <div class="col-12">
                                    <label for="benAddress" class="form-label fw-semibold text-dark small">Complete Home
                                        Address *</label>
                                    <textarea class="form-control border border-success" rows="2"
                                        v-model="formBeneficiary.address" required></textarea>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer bg-light border-top-0 px-4 py-3">
                            <button type="button" class="btn btn-light" data-bs-dismiss="modal">Cancel</button>
                            <button type="submit" class="btn btn-success px-4">
                                <i class="bi bi-check-lg me-1"></i> Save & Reflect To Form
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <template v-else>
        <!-- Step 2: Evaluation -->
        <div class="text-center p-4">
            <h4 class="fw-bold mb-3">Step 2: Under Evaluation</h4>
            <div v-if="!enrollmentDetails.application.isApproved" class="d-flex flex-column align-items-center">
                <div class="spinner-border text-primary mb-3" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p class="text-muted">Your records are currently being evaluated by the registrar's office. This may
                    take a few moments. Please wait.</p>
            </div>
            <div v-else class="d-flex flex-column align-items-center">
                <i data-feather="check-circle" class="text-success mb-3" style="width: 64px; height: 64px;"></i>
                <h5 class="fw-bold text-success">Evaluation Complete!</h5>
                <p class="text-muted">You are cleared to proceed with enrollment. Please view your fee assessment
                    for the upcoming semester.</p>
                <button class="btn btn-success mt-3" @click="nextStep">Proceed to Assessment</button>
            </div>
        </div>
    </template>


</template>

<script>
import apiLink from '@/services/api/apiLink'
import { OnboardTrainingApi } from '@/services/api/onboardTrainingApi'
import { alertError, alertSuccess } from '@/utils/alert'
export default {
    name: 'EnrollmentEvaluationCard',
    data() {
        const formBeneficiary = {
            firstName: '',
            lastName: '',
            middleName: '',
            relationship: '',
            birthDate: '',
            birthPlace: '',
            nationality: '',
            contactNumber: '',
            email: '',
            address: ''
        }
        if (this.enrollmentDetails) {
            if (this.enrollmentDetails.studentInfo) {
                if (this.enrollmentDetails.studentInfo.insuranceBeneficiary) {
                    const insurance = this.enrollmentDetails.studentInfo.insuranceBeneficiary
                    formBeneficiary.firstName = insurance.first_name
                    formBeneficiary.lastName = insurance.last_name
                    formBeneficiary.middleName = insurance.middle_name
                    formBeneficiary.relationship = insurance.relationship
                    formBeneficiary.birthDate = insurance.birthDate
                    formBeneficiary.birthPlace = insurance.birthPlace
                    formBeneficiary.nationality = insurance.nationality
                    formBeneficiary.contactNumber = insurance.contactNumber
                    formBeneficiary.email = insurance.email
                    formBeneficiary.address = insurance.address
                }
            }
        }
        return {
            formBeneficiary,
            isConfirmed: false
        }
    },
    emits: ['loading', 'next-step'],
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
        },
        async saveBeneficiary() {
            this.$emit('loading', true)
            this.errors = []
            console.log(this.formBeneficiary)
            try {
                const formData = new FormData()
                Object.entries(this.formBeneficiary).forEach(([key, value]) => {
                    formData.append(key, value)
                })
                const apiService = new OnboardTrainingApi()
                const response = await apiService.postForm(
                    formData,
                    apiLink.onboardApiLink.studentInsurance
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
        },
        async submitForEvaluation() {
            this.$emit('loading', true)
            this.errors = []
            try {
                const formData = new FormData()
                formData.append('category', 'SBT ENROLLMENT')
                const apiService = new OnboardTrainingApi()
                const response = await apiService.postForm(
                    formData,
                    apiLink.onboardApiLink.enrollmentApplication
                )
                alertSuccess('Successfully Submitted')
                window.location.reload()
            } catch (error) {
                if (error.response?.status === 422) {
                    this.errors = error.response?.data?.errors ?? {}
                }
                alertError(error.response?.data?.message || error.message)
            } finally {
                this.$emit('loading', false)
            }
        },
        beneficiaryName(data) {
            return data.last_name + ', ' + data.first_name + ' ' + data.middle_name
        }
    }
}
</script>