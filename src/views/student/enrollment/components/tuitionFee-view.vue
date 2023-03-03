<template>
    <div v-if="propsData.registration">
        <div v-if="propsData.registration.is_approved">
            <div>
                <div class="timeline-dots1 border-primary text-primary">
                    <svg width="20" viewBox="0 2 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M7.67 2H16.34C19.73 2 22 4.38 22 7.92V16.09C22 19.62 19.73 22 16.34 22H7.67C4.28 22 2 19.62 2 16.09V7.92C2 4.38 4.28 2 7.67 2ZM7.52 13.2C6.86 13.2 6.32 12.66 6.32 12C6.32 11.34 6.86 10.801 7.52 10.801C8.18 10.801 8.72 11.34 8.72 12C8.72 12.66 8.18 13.2 7.52 13.2ZM10.8 12C10.8 12.66 11.34 13.2 12 13.2C12.66 13.2 13.2 12.66 13.2 12C13.2 11.34 12.66 10.801 12 10.801C11.34 10.801 10.8 11.34 10.8 12ZM15.28 12C15.28 12.66 15.82 13.2 16.48 13.2C17.14 13.2 17.67 12.66 17.67 12C17.67 11.34 17.14 10.801 16.48 10.801C15.82 10.801 15.28 11.34 15.28 12Z"
                            fill="currentColor"></path>
                    </svg>
                </div>
                <h5 class="float-left mb-2 text-primary fw-bolder">
                    {{ viewName }}
                </h5>
                <div class="d-inline-block w-100">

                    <div v-if="propsData.registration.payment_mode != null">
                        <p> Wait for the Accouting Office for your Tuition Fee Assessment...</p>
                    </div>
                    <div v-else>
                        <form @submit.prevent="onProcess" class="form-assessments-view">
                            <div class="row">
                                <div class="col-md-3">
                                    <span class="text-primary h5"><b>TERMS OF PAYMENT</b></span>
                                    <div class="form-group">
                                        <span class="text-muted"><b>MODE :</b></span>
                                        <div class="col-sm">
                                            <select v-model.trim="mode" class="form-select payment-mode"
                                                v-on:change="changeTerm">
                                                <option value="0">Fullpayment</option>
                                                <option value="1">Installment</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md">
                                    <span class="text-primary h5"><b>PAYMENT DETAILS</b></span> <br>
                                    <label for="" class=""><b>PARTICULARS</b></label>
                                    <div class="row" v-for="tags in propsTags" :key="tags">
                                        <div class="col-md">
                                            <span class="mt-2 badge bg-info">
                                                {{ tags.particular_tag.replace('_tags', ' fee').toUpperCase() }}
                                            </span>

                                        </div>
                                        <div class="col-md">
                                            <span class="mt-2 float-end fw-bolder">
                                                {{ tags.particular_tag == 'tuition_tags' ? tags.fees *
                                                    propsData.tuition.units : tags.fees }}

                                            </span>

                                        </div>
                                    </div>
                                    <div class="roew">
                                        <div class="col-md">
                                            <span class="mt-2 badge bg-info">
                                                TOTAL TUITION FEE</span>
                                        </div>
                                        <div class="col-md ">
                                            <span class="mt-2 float-end fw-bolder"> {{
                                                propsData.tuition.total_fees.total_tuition
                                            }}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md"> <br>
                                    <span class="text-muted h6"><b>PAYMENT SUMMARY</b></span>
                                    <div class="row">
                                        <div class="col-md">
                                            <span class="mt-2 badge bg-info">
                                                TOTAL TUITION FEE</span>
                                        </div>
                                        <div class="col-md-4 ">
                                            <span class="mt-2 float-end">
                                                <b id="final-tuition"> {{ this.propsTuitionDetails.total_fees.total_tuition
                                                }}</b></span>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md">
                                            <span class="mt-2 badge bg-info">
                                                UPON ENROLLMENT </span>
                                        </div>
                                        <div class="col-md-4 ">
                                            <span class="mt-2 float-end">
                                                <b id="upon-enrollment"> {{
                                                    this.propsTuitionDetails.total_fees.total_tuition
                                                }}</b>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="row" v-for="fees in monthlyFees" :key="fees">
                                        <div class="col-md">
                                            <span class="mt-2 badge bg-info">
                                                {{ fees }}
                                            </span>
                                        </div>
                                        <div class="col-md">
                                            <span class="mt-2 float-end">
                                                <b class="monthly-fee">-</b>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" class="btn btn-primary btn-block mt-2">SUBMIT</button>
                        </form>
                    </div>

                </div>
            </div>

        </div>
        <div v-else>
            <div class="timeline-dots timeline-dot1 border-secondary  text-success"></div>
            <h5 class="float-left mb-1 text-muted fw-bolder">
                <i>{{ viewName }}</i>
            </h5>
        </div>
    </div>
    <div v-else>
        <div class="timeline-dots timeline-dot1 border-secondary  text-success"></div>
        <h5 class="float-left mb-1 text-muted fw-bolder">
            <i>{{ viewName }}</i>
        </h5>
    </div>
</template>
<script>
import axios from 'axios'
import { GET_USER_TOKEN } from '@/store/storeConstants'
import { mapGetters } from 'vuex'
export default {
    name: 'TuitionFeeView',
    data() {
        return {
            viewName: 'STEP 3: TUITION FEE ASSESSMENT',
            monthlyFees: ['1ST MONTHLY', '2ND MONTHLY', '3RD MONTHLY', '4TH MONTHLY'],
            uponEnrollment: 0,
            monthly: 0,
            totalPayment: 0,
            mode: 0
        }
    },
    computed: {
        ...mapGetters('auth', {
            token: GET_USER_TOKEN
        })
    },
    props: { propsData: Object, propsTags: Object, propsTuitionDetails: Object },
    methods: {
        onProcess() {
            console.log(this.mode)
            axios.post('student/enrollment/payment-mode', {
                paymentMode: this.mode
            }, {
                headers: {
                    Authorization: 'Bearer ' + this.token
                }
            }).then((response) => {
                console.log(response)
            }).catch((error) => {
                console.log(error)
                console.log(error.response.status)
            })
        },
        changeTerm(event) {
            const option = event.target.value
            if (option >= 1) {
                const finalTuition = this.propsTuitionDetails.total_fees.total_tuition_with_interest
                const uponEnrollment = this.propsTuitionDetails.total_fees.upon_enrollment
                const monthly = this.propsTuitionDetails.total_fees.monthly
                document.getElementById('final-tuition').innerText = finalTuition.toFixed(2)
                document.getElementById('upon-enrollment').innerText = uponEnrollment.toFixed(2)
                document.getElementsByClassName('monthly-fee')[0].innerHTML = monthly.toFixed(2)
                document.getElementsByClassName('monthly-fee')[1].innerHTML = monthly.toFixed(2)
                document.getElementsByClassName('monthly-fee')[2].innerHTML = monthly.toFixed(2)
                document.getElementsByClassName('monthly-fee')[3].innerHTML = monthly.toFixed(2)
            } else {
                const finalTuition = this.propsTuitionDetails.total_fees.total_tuition
                document.getElementById('final-tuition').innerText = finalTuition.toFixed(2)
                document.getElementById('upon-enrollment').innerText = finalTuition.toFixed(2)
                document.getElementsByClassName('monthly-fee')[0].innerHTML = '-'
                document.getElementsByClassName('monthly-fee')[1].innerHTML = '-'
                document.getElementsByClassName('monthly-fee')[2].innerHTML = '-'
                document.getElementsByClassName('monthly-fee')[3].innerHTML = '-'
            }
        }
    }

}
</script>