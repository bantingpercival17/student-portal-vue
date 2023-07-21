<template>
    <div v-if="isLoading">
        <h3>LOADING</h3>
    </div>
    <div v-else>
        <p class="display-6 fw-bolder text-primary">PAYMENT OVERVIEW</p>
        <div class="table-container" style="max-height: 300px; overflow-y: scroll;">
            <table class="nav nav-underline bg-soft-primary p-0 text-center mb-5" aria-label="Secondary navigation">
                <thead class="d-flex">
                    <tr>
                        <td :class="onActiveCard('overview')" @click="onChangeActive('overview')">OVERVIEW</td>
                    </tr>
                    <tr>
                        <td :class="onActiveCard('payments')" @click="onChangeActive('payments')">PAYMENT</td>
                    </tr>
                    <tr>
                        <td :class="onActiveCard('payment-histories')" @click="onChangeActive('payment-histories')">
                            PAYMENT HISTORY
                        </td>
                    </tr>
                    <tr>

                        <td :class="onActiveCard('online-payment')" @click="onChangeActive('online-payment')">ONLINE
                            PAYMENT</td>

                    </tr>
                </thead>
            </table>
        </div>
        <div class="row">
            <div class="col-lg-8 col-md-8 col-sm-12">
                <div v-if="cardStatus == 'overview'" class="card shadow">
                    <div class="card-body">
                        <label for="" class="text-info h4">
                            <span class="fw-bolder">{{ semester.semester.toUpperCase() }} </span> <small
                                class="text-primary"> {{ semester.school_year }}</small>
                        </label>
                        <div class=" row mt-2">
                            <div class="col-lg-3 col-md-6">
                                <div class="form-group">
                                    <small class="form-label">MODE OF PAYMENT</small>
                                    <br>
                                    <label class="h5 text-info form-label">
                                        {{ tuitionDetails.payment_mode === 1 ? 'INSTALLMENT' : 'FULL-PAYMENT' }}
                                    </label>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-6">
                                <div class="form-group">
                                    <small class="form-label">TOTAL PAYABLE:</small>
                                    <br>
                                    <label class="h5 text-primary form-label">
                                        {{ currencyFormat(tuitionDetails.total_payment) }}
                                    </label>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-6">
                                <div class="form-group">
                                    <small class="form-label">TOTAL PAID:</small>
                                    <br>
                                    <label class="h5 text-primary form-label">
                                        {{ currencyFormat(tuitionDetails.total_paid_amount_sum_payment_amount) }}
                                    </label>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-6">
                                <div class="form-group">
                                    <small class="form-label">BALANCE:</small>
                                    <br>
                                    <label class="h5 text-danger form-label">
                                        {{
                                            currencyFormat(tuitionDetails.total_payment -
                                                tuitionDetails.total_paid_amount_sum_payment_amount)
                                        }}
                                    </label>
                                </div>
                            </div>
                        </div>
                        <label class="h5 text-primary fw-bolder">
                            ADDTIONAL FEES
                        </label>
                        <div v-if="tuitionDetails.additional_fees.length" class="additional-fees mt-3">
                            <div v-for="item in tuitionDetails.additional_fees" :key="item" :value="item.id"
                                class="row p-0 mt-0 mb-0">
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <small class="form-label">FEE NAME</small>
                                        <br>
                                        <label class="h5 text-info form-label">
                                            <!-- {{ $additionalFees->fee_details->particular->particular_name }} -->
                                        </label>

                                    </div>
                                </div>
                                <div class="col-md">
                                    <div class="form-group">
                                        <small class="form-label">FEE AMOUNT</small>
                                        <br>
                                        <label class="h5 text-primary form-label">
                                            <!--  {{ number_format($additionalFees->fee_details->amount, 2) }} -->
                                        </label>
                                    </div>
                                </div>
                                <div class="col-md">
                                    <div class="form-group">
                                        <small class="form-label">TOTAL PAID:</small>
                                        <br>
                                        <label class="h5 text-primary form-label">
                                            <!--  {{ number_format($additionalFees->fee_total_paid(), 2) }} -->
                                        </label>
                                    </div>
                                </div>
                                <div class="col-md">
                                    <div class="form-group">
                                        <small class="form-label">BALANCE:</small>
                                        <br>
                                        <label class="h5 text-danger form-label">
                                            <!--   {{ number_format($additionalFees->fee_details->amount - $additionalFees->fee_total_paid(), 2) }} -->
                                        </label>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-else>
                            <span class="h6 text-muted">NO ADDITIONAL FEES</span>
                        </div>
                        <!--  <label for="" class="h4">
                                <b>
                                    {{ strtoupper($enrollmentAssessment->academic->semester) }}
                                    <small class="text-primary">
                                        {{ $enrollmentAssessment->academic->school_year }}</small>
                                </b>
                            </label> -->
                    </div>
                </div>
                <!--  <div class="card shadow ms-5 me-5" data-iq-gsap="onStart" data-iq-position-y="70" data-iq-rotate="0"
                    data-iq-trigger="scroll" data-iq-ease="power.out" data-iq-opacity="0">
                    <div class="card-header">
                        <div class="header-title">
                            <h4 class="card-title fw-bold text-primary">ENROLLMENT OVERVIEW</h4>
                        </div>
                    </div>
                    <div class="card-body">
                    </div>
                </div> -->
            </div>
        </div>

    </div>
</template>
<script>
import { GET_USER_TOKEN, IS_USER_AUTHENTICATE_GETTER } from '@/store/storeConstants'
import { mapGetters } from 'vuex'
import axios from 'axios'
export default {
    name: 'Payment Overview',
    data() {
        return {
            isLoading: true,
            cardStatus: 'overview',
            data: [],
            semester: [],
            tuition: [],
            tuitionDetails: []
        }
    },
    computed: {
        ...mapGetters('auth', {
            token: GET_USER_TOKEN,
            isAuth: IS_USER_AUTHENTICATE_GETTER
        })
    },
    mounted() {
        axios.get('student/payment-overview', {
            headers: {
                Authorization: 'Bearer ' + this.token
            }
        }).then((response) => {
            this.data = response.data.data
            this.semester = this.data.currently_enrolled.academic
            this.tuitionDetails = this.data.currently_enrolled.payment_assessment_details_with_transactions
            console.log(this.data.currently_enrolled)
            if (this.data.tuition) {
                this.tuition = this.data.tuition.tags
                this.tuitionDetails = this.data.tuition
            }
            this.isLoading = false
        }).catch((error) => {
            console.log(error)
            console.log(error.response.status)
        })
    },
    methods: {
        onActiveCard(item) {
            return this.cardStatus === item ? 'nav-link active' : 'nav-link text-secondary'
        },
        onChangeActive(item) {
            this.cardStatus = item
        },
        currencyFormat(number) {
            return Intl.NumberFormat('hi-IN', { style: 'currency', currency: 'PHP' }).format(number)
        }
    }
}
</script>