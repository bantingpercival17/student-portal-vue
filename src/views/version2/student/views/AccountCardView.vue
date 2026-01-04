<template>

    <div class="card">
        <div class="card-header p-4 d-flex justify-content-between align-items-center flex-wrap gap-2">
            <h3 class="h4 fw-bold text-dark mb-0">Account Card</h3>
            <div class="col-md-4">
                <select class="form-select" v-model="selectedSemester" @change="fetchData">
                    <option v-for="item in semesters" :key="item.enrolled" :value="item.enrolled">{{ item.semester }}
                    </option>
                </select>
            </div>
        </div>
        <div class="card-body p-4">
            <template v-if="!contentLoading">
                <div v-if="selectedFinancial">
                    <div class="row g-4 mb-4">
                        <div class="col-md-3 col-6">
                            <div class="p-3 bg-light rounded text-center"><small class="text-muted d-block">Tuition
                                    Fees</small>
                                <h5 class="fw-bold mb-0">₱ {{ selectedFinancial.tuition }}</h5>
                            </div>
                        </div>
                        <div class="col-md-3 col-6">
                            <div class="p-3 bg-light rounded text-center">
                                <small class="text-muted d-block">Other Fees</small>
                                <h5 class="fw-bold mb-0">₱ {{ selectedFinancial.additionalFees }}</h5>
                            </div>
                        </div>
                        <div class="col-md-3 col-6">
                            <div class="p-3 bg-light rounded text-center">
                                <small class="text-muted d-block">Payments Made</small>
                                <h5 class="fw-bold mb-0 text-success">₱ {{ selectedFinancial.totalPaid }}
                                </h5>
                            </div>
                        </div>
                        <div class="col-md-3 col-6">
                            <div class="p-3 bg-danger-subtle rounded text-center">
                                <small class="text-danger-emphasis d-block">Current Balance</small>
                                <h5 class="fw-bold mb-0 text-danger">₱ {{ selectedFinancial.balance }}</h5>
                            </div>
                        </div>
                    </div>
                    <h4 class="h5 fw-bold text-dark mb-3">Transaction History</h4>
                    <div class="table-responsive">
                        <table class="table table-striped table-hover">
                            <thead class="table-light">
                                <tr>
                                    <th>Date</th>
                                    <th>Description</th>
                                    <th class="text-end">Charges</th>
                                    <th class="text-end">Payments</th>
                                    <th class="text-end">Balance</th>
                                </tr>
                            </thead>
                            <tbody v-if="selectedFinancial?.transactions?.length > 0">
                                <tr v-for="(t, index) in selectedFinancial.transactions" :key="t.date + '-' + index">
                                    <td>{{ t.date }}</td>
                                    <td>{{ t.desc }}</td>
                                    <td class="text-end">{{ t.charge ? '₱ ' + t.charge : '-' }}</td>
                                    <td class="text-end text-success">{{ t.payment ? '₱ ' + t.payment : '-'
                                    }}</td>
                                    <td class="text-end fw-bold">₱ {{ t.balance }}</td>
                                </tr>
                            </tbody>
                            <tbody v-else>
                                <tr>
                                    <td class="text-center" colspan="5">No Payment Transaction</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="mt-4" v-if="selectedFinancial.balance != '0.00'">
                        <h4 class="h5 fw-bold text-dark mb-3">Payment Options</h4>
                        <PaymentOptionComponents v-if="selectedFinancial"
                            :assessment="selectedFinancial?.paymentAssessment ?? null" />
                    </div>
                    <div class="alert alert-success mt-4" v-else>
                        <i data-feather="check-circle" class="me-2"></i> Your account is fully paid for this semester.
                    </div>
                </div>
                <div v-else class="text-center text-muted p-5">No financial data available for this semester.</div>
            </template>
            <template v-else>
                <div class="d-flex flex-column align-items-center">
                    <div class="spinner-border spinner-lg text-success mb-3" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <p class="text-muted">Loading... Please wait.</p>
                </div>
            </template>
        </div>
    </div>
</template>
<script>
import { StudentApi } from '@/services/api/studentApi'
import PaymentOptionComponents from './payments/PaymentOptionComponents.vue'

export default {
    name: 'AccountCardView',
    components: {
        PaymentOptionComponents
    },
    data() {
        return {
            contentLoading: true,
            semesters: [],
            selectedSemester: null,
            selectedFinancial: [],
            financialData: {
                'Fall 2023': {
                    tuition: 20000,
                    otherFees: 5000,
                    payments: 15000,
                    transactions: [
                        { date: '2023-09-01', desc: 'Tuition Fee', charge: 20000, payment: null, balance: 20000 },
                        { date: '2023-09-05', desc: 'Other Fees', charge: 5000, payment: null, balance: 25000 },
                        { date: '2023-09-10', desc: 'Payment Received', charge: null, payment: 15000, balance: 10000 }
                    ]
                },
                'Spring 2024': {
                    tuition: 22000,
                    otherFees: 6000,
                    payments: 28000,
                    transactions: [
                        { date: '2024-01-01', desc: 'Tuition Fee', charge: 22000, payment: null, balance: 22000 },
                        { date: '2024-01-05', desc: 'Other Fees', charge: 6000, payment: null, balance: 28000 },
                        { date: '2024-01-15', desc: 'Payment Received', charge: null, payment: 28000, balance: 0 }
                    ]
                },
                'Summer 2024': null
            },
            bankProofUploaded: false,
            ewalletProofUploaded: false,
            studentApi: new StudentApi()
        }
    },
    async mounted() {
        const response = await this.studentApi.studentAccountCard()
        if (response) {
            this.contentLoading = false
        }
        this.semesters = response?.semesters ?? this.semesters
        this.selectedSemester = this.semesters.length > 0 ? this.semesters[0].enrolled : null
        this.selectedFinancial = response.paymentDetails
    },
    methods: {
        async fetchData() {
            this.contentLoading = true
            this.selectedFinancial = []
            const response = await this.studentApi.studentAccountCard(this.selectedSemester)
            if (response) {
                this.contentLoading = false
            }
            this.semesters = response?.semesters ?? this.semesters
            this.selectedFinancial = response.paymentDetails
        },
        uploadProof(method) {
            if (method === 'bank') {
                this.bankProofUploaded = true
            } else if (method === 'ewallet') {
                this.ewalletProofUploaded = true
            }
        }
    }
}
</script>