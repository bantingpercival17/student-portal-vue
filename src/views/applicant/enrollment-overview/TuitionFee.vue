<template>
    <div v-if="propsEnrollment.enrollment_application">
        <div v-if="propsEnrollment.enrollment_application.is_approved">
            <div v-if="propsEnrollment.enrollment_application.payment_mode !== null || tuitionDetails.tuition_assessment">
                <div v-if="tuitionDetails.tuition_assessment">
                    <stepper :value="viewName" :isActive="true" :isFinish="true" />
                    <div class="d-inline-block mt-2 w-100">
                        <span class="text-muted h6"><b>PAYMENT ASSESSMENT DETAILS</b></span>
                        <div class="row mt-2">
                            <div class="col-lg-3 col-md-12">
                                <div class="form-group">
                                    <small class="form-label">Mode of Payment:</small>
                                    <br>
                                    <label class="h5 text-info form-label">
                                        {{ tuitionDetails.tuition_assessment.payment_mode === 1 ? 'INSTALLMENT'
                                            : 'FULL-PAYMENT' }}
                                    </label>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-12">
                                <div class="form-group">
                                    <small class="form-label">Tuition Fee Amount:</small>
                                    <br>
                                    <label class="h5 text-primary form-label">
                                        {{ numberFormat(tuitionDetails.tuition_assessment.total_payment) }}
                                    </label>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-12">
                                <div class="form-group">
                                    <small class="form-label">Upon Enrollment:</small>
                                    <br>
                                    <label class="h5 text-primary form-label">
                                        {{ numberFormat(tuitionDetails.tuition_assessment.upon_enrollment) }}
                                    </label>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-12">
                                <div class="form-group">
                                    <small class="form-label">Monthly Fees:</small>
                                    <br>
                                    <label class="h5 text-primary form-label">
                                        {{ numberFormat(tuitionDetails.tuition_assessment.monthly_payment) }}
                                    </label>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div v-else>
                    <stepper :value="viewName" :isActive="true" />
                    <p class="mb-3 mt-1">
                        Accouting Office verifies your Tuition Fee Assessment.
                    </p>
                </div>
            </div>
            <div v-else>
                <stepper :value="viewName" :isActive="true" />
                <div class="d-inline-block w-100">
                    <div v-if="tuitionDetails.tags.length > 0">
                        <div class="row">
                            <div class="col-lg-7 col-md-12">
                                <label class="text-primary fw-bolder">TUITION FEE DETAILS</label>
                                <div class="row">
                                    <div class="col-lg-6">
                                        <label for="example-text-input" class="form-control-label fw-bolder">
                                            PARTICULARS
                                        </label>
                                        <div class="d-flex align-items-center justify-content-between mt-1"
                                            v-for="tags in tuitionDetails.tags" :key="tags">
                                            <small class="fw-bolder badge bg-primary">{{
                                                tags.particular_tag.replace('_tags', ' fee').toUpperCase() }}</small>

                                            <small v-if="propsEnrollment.enrollment_application.course_id !== 3"
                                                class="fw-bolder">
                                                {{ tags.particular_tag == 'tuition_tags' ?
                                                    currencyFormat(
                                                        tags.fees *
                                                        tuitionDetails.units) : currencyFormat(tags.fees) }}
                                            </small>
                                            <small v-else class="fw-bolder">
                                                {{ tags.particular_tag == 'tuition_tags' ?
                                                    currencyFormat(tags.fees) : currencyFormat(tags.fees) }}
                                            </small>
                                        </div>
                                        <div class="d-flex align-items-center justify-content-between mt-1">
                                            <small class="fw-bolder badge bg-primary">TOTAL TUITION FEE</small>
                                            <small class="fw-bolder">{{
                                                numberFormat(tuitionDetails.total_fees.total_tuition)
                                            }}</small>
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <label for="example-text-input" class="form-control-label fw-bolder">
                                            PAYMENT SUMMARY
                                        </label>
                                        <div class="d-flex align-items-center justify-content-between mt-1">
                                            <small class="fw-bolder badge bg-primary">TOTAL TUITION FEE</small>
                                            <small class="fw-bolder" id="final-tuition">{{
                                                currencyFormat(tuitionDetails.total_fees.total_tuition)
                                            }}</small>
                                        </div>
                                        <div class="d-flex align-items-center justify-content-between mt-1">
                                            <small class="fw-bolder badge bg-primary">UPON ENROLLMENT</small>
                                            <small class="fw-bolder" id="upon-enrollment">{{
                                                currencyFormat(tuitionDetails.total_fees.total_tuition)
                                            }}</small>
                                        </div>
                                        <div class="d-flex align-items-center justify-content-between mt-1"
                                            v-for="fees in monthlyFees" :key="fees">
                                            <small class="fw-bolder badge bg-primary"> {{ fees }}</small>
                                            <small class="fw-bolder monthly-fee">-</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-5 col-md-12">
                                <form @submit.prevent="onProcess" method="post">
                                    <label class="text-primary fw-bolder">CHOOSE YOUR PAYMENT MODE</label>
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <selectComponent label="Payment Terms" :data="paymentMode"
                                                v-model:value="modeOfPayment" :error="errors.mode"
                                                v-on:change="changeTerm" />
                                        </div>
                                    </div>
                                    <div class="form-group float-right">
                                        <button class="btn btn-sm btn-primary w-100" type="submit">SUBMIT</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <p class="mb-3">
                            You can not proceed to the Tuition Fee Assessment because the Tuition is not encoded by
                            the Accounting Office
                        </p>
                    </div>

                </div>
            </div>
        </div>
        <div v-else>
            <stepper :value="viewName" />
        </div>
    </div>
    <div v-else>
        <stepper :value="viewName" />
    </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import { mapMutations } from 'vuex'
import { SHOW_LOADING_MUTATION } from '@/store/storeConstants'
import stepper from '@/components/main-layouts/components/widgets/stepper-widget.vue'
import selectComponent from '@/components/main-layouts/components/widgets/select-component.vue'
export default {
    name: 'TuitionFeeAssesment',
    components: {
        stepper,
        selectComponent
    },
    data() {
        return {
            viewName: 'STEP 3: TUITION FEE ASSESSMENT',
            paymentMode: ['Fullpayment', 'Installment'],
            modeOfPayment: '',
            errors: [],
            monthlyFees: ['1ST MONTHLY', '2ND MONTHLY', '3RD MONTHLY', '4TH MONTHLY'],
            uponEnrollment: 0,
            monthly: 0,
            totalPayment: 0
        }
    },
    methods: {
        ...mapMutations({
            showLoading: SHOW_LOADING_MUTATION
        }),
        numberFormat(number) {
            return Intl.NumberFormat('hi-IN', { style: 'currency', currency: 'PHP' }).format(number)
        },
        onProcess() {
            this.showLoading(true)
            const mode = this.modeOfPayment === 'Installment' ? 1 : 0
            axios.post('applicant/enrollment/tuition-fees', {
                paymentMode: mode
            }, {
                headers: {
                    Authorization: 'Bearer ' + this.token
                }
            }).then((response) => {
                this.showLoading(false)
                console.log(response.data)
                if (response.status === 200) {
                    this.showAlert(response.data)
                    window.location.reload()
                }
                console.log(response)
            }).catch((error) => {
                console.log(error)
                console.log(error.response.status)
            })
        },
        changeTerm(event) {
            const option = event.target.value
            if (option === 'Installment') {
                const finalTuition = this.tuitionDetails.total_fees.total_tuition_with_interest
                const uponEnrollment = this.tuitionDetails.total_fees.upon_enrollment
                const monthly = this.tuitionDetails.total_fees.monthly
                document.getElementById('final-tuition').innerText = this.numberFormat(finalTuition)
                document.getElementById('upon-enrollment').innerText = this.currencyFormat(uponEnrollment)
                document.getElementsByClassName('monthly-fee')[0].innerHTML = this.numberFormat(monthly)
                document.getElementsByClassName('monthly-fee')[1].innerHTML = this.numberFormat(monthly)
                document.getElementsByClassName('monthly-fee')[2].innerHTML = this.numberFormat(monthly)
                document.getElementsByClassName('monthly-fee')[3].innerHTML = this.numberFormat(monthly)
            } else {
                const finalTuition = this.tuitionDetails.total_fees.total_tuition
                document.getElementById('final-tuition').innerText = this.numberFormat(finalTuition)
                document.getElementById('upon-enrollment').innerText = this.numberFormat(finalTuition)
                document.getElementsByClassName('monthly-fee')[0].innerHTML = '-'
                document.getElementsByClassName('monthly-fee')[1].innerHTML = '-'
                document.getElementsByClassName('monthly-fee')[2].innerHTML = '-'
                document.getElementsByClassName('monthly-fee')[3].innerHTML = '-'
            }
        },
        showAlertError(error) {
            Swal.fire({
                icon: 'error',
                title: error.code,
                text: error.message,
                confirmButtonText: 'OK'
            })
        },
        showAlert(data) {
            // Use sweetalert2
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: data.message,
                confirmButtonText: 'OK'
            })
        },
        currencyFormat(number) {
            return Intl.NumberFormat('hi-IN', { style: 'currency', currency: 'PHP' }).format(number)
        }
    },
    props: {
        propsEnrollment: Object, tuitionDetails: Object, token: Object
    }
}
</script>