<template>
    <div class="accordion" id="paymentAccordion">
        <!-- Bank Transfer -->
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingTwo">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                    <i data-feather="home" class="me-2"></i> Bank Transfer
                </button>
            </h2>
            <div id="collapseTwo" class="accordion-collapse collapse show" aria-labelledby="headingTwo"
                data-bs-parent="#paymentAccordion">
                <div class="accordion-body">
                    <p>Deposit your payment to the following account:</p>
                    <ul class="list-group list-group-flush mb-3">
                        <li class="list-group-item"><strong>Bank Name:</strong> <span class="text-success fw-bold">BANK
                                OF COMMERCE</span></li>
                        <li class="list-group-item"><strong>Account Name:</strong> <span
                                class="text-success fw-bold">BALIWAG MARITIME ACADEMY
                                INC</span></li>
                        <li class="list-group-item"><strong>Account Number:</strong> <span
                                class="text-success fw-bold">062000001037</span></li>
                    </ul>
                    <p>After depositing, please upload a clear photo of your deposit slip for verification.
                        Enrollment will be confirmed upon successful verification.</p>
                    <template v-if="!submitLoader">
                        <div v-if="!bankProofUploaded">
                            <form @submit.prevent="submitPaymentTransaction('bank-transfer')" method="post">
                                <div class="form-group">
                                    <label class="text-primary fw-bold">Payment For <span
                                            class="text-danger">*</span></label>
                                    <select class="form-select border border-success" v-model="formInput.remark"
                                        required>
                                        <option v-for="remark in remarks" :key="remark" :value="remark">{{ remark }}
                                        </option>
                                    </select>
                                    <span v-if="errors.remark" class="text-danger">{{ errors.remark }}</span>
                                </div>
                                <div class="form-group">
                                    <label class="text-primary fw-bold">Proof of Payment <span
                                            class="text-danger">*</span></label>
                                    <input type="file" class="form-control border border-success"
                                        accept=".png, .jpg, .jpeg, .pdf" v-on:change="fileAttachment">
                                    <span v-if="errors.file" class="text-danger">{{ errors.file }}</span>
                                </div>
                                <div class="form-group">
                                    <label class="text-primary fw-bold">Amount <span
                                            class="text-danger">*</span></label>
                                    <input type="number" class="form-control border border-success"
                                        v-model="formInput.amount" required>
                                    <span v-if="errors.amount" class="text-danger">{{ errors.amount }}</span>
                                </div>
                                <div class="form-group">
                                    <label class="text-primary fw-bold">Transaction Date <span
                                            class="text-danger">*</span></label>
                                    <input type="date" class="form-control border border-success"
                                        v-model="formInput.transactionDate" required>
                                    <span v-if="errors.transactionDate" class="text-danger">{{ errors.transactionDate
                                    }}</span>
                                </div>
                                <button class="btn btn-primary w-100" type="submit">SUBMIT</button>
                            </form>
                        </div>
                        <div v-else class="alert alert-success mt-3 d-flex align-items-center">
                            <i data-feather="check-circle" class="me-2"></i>
                            Proof of payment uploaded. Waiting for verification.
                        </div>
                    </template>
                    <template v-else>
                        <div class="enrollment-loader spinner-lg text-success mb-3" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                        <p class="text-muted">Submitting... Please wait.</p>
                    </template>

                </div>
            </div>
        </div>
        <!-- E-Wallet -->
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingThree">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    <i data-feather="smartphone" class="me-2"></i> E-Wallet (GCash)
                </button>
            </h2>
            <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree"
                data-bs-parent="#paymentAccordion">
                <div class="accordion-body">
                    <p>Scan the appropriate QR code to pay using your preferred e-wallet.</p>
                    <div class="d-flex justify-content-center gap-4 mb-3">
                        <div class="text-center">
                            <img src="https://placehold.co/150x150/ffffff/000000?text=GCash+QR" alt="GCash QR">
                            <p class="fw-bold mt-2">GCash</p>
                        </div>
                    </div>
                    <p>After paying, please upload a screenshot of your transaction receipt for
                        verification. Enrollment will be confirmed upon successful verification.</p>
                    <div v-if="!ewalletProofUploaded">
                        <form @submit.prevent="submitPaymentTransaction('gcash')" method="post">
                            <div class="form-group">
                                <label class="text-primary fw-bold">Payment For <span
                                        class="text-danger">*</span></label>
                                <select class="form-select border border-success" v-model="formInput.remark" required>
                                    <option v-for="remark in remarks" :key="remark" :value="remark">{{ remark }}
                                    </option>
                                </select>
                                <span v-if="errors.remark" class="text-danger">{{ errors.remark }}</span>
                            </div>
                            <div class="form-group">
                                <label class="text-primary fw-bold">Proof of Payment <span
                                        class="text-danger">*</span></label>
                                <input type="file" class="form-control border border-success"
                                    accept=".png, .jpg, .jpeg, .pdf" v-on:change="fileAttachment">
                                <span v-if="errors.file" class="text-danger">{{ errors.file }}</span>
                            </div>
                            <div class="form-group">
                                <label class="text-primary fw-bold">Reference Number <span
                                        class="text-danger">*</span></label>
                                <input type="number" class="form-control border border-success"
                                    v-model="formInput.referenceNumber" required>
                                <span v-if="errors.referenceNumber" class="text-danger">{{ errors.referenceNumber
                                }}</span>
                            </div>
                            <div class="form-group">
                                <label class="text-primary fw-bold">Amount <span class="text-danger">*</span></label>
                                <input type="number" class="form-control border border-success"
                                    v-model="formInput.amount" required>
                                <span v-if="errors.amount" class="text-danger">{{ errors.amount }}</span>
                            </div>
                            <div class="form-group">
                                <label class="text-primary fw-bold">Transaction Date <span
                                        class="text-danger">*</span></label>
                                <input type="date" class="form-control border border-success"
                                    v-model="formInput.transactionDate" required>
                                <span v-if="errors.transactionDate" class="text-danger">{{ errors.transactionDate
                                }}</span>
                            </div>
                            <button class="btn btn-primary w-100" type="submit">SUBMIT</button>
                        </form>
                    </div>
                    <div v-else class="alert alert-success mt-3 d-flex align-items-center">
                        <i data-feather="check-circle" class="me-2"></i>
                        Proof of payment uploaded. Waiting for verification.
                    </div>
                </div>
            </div>
        </div>
        <div class="accordion-item" v-if="showTransactionHistory">
            <h2 class="accordion-header">
                <button class="accordion-button" type="button" data-bs-toggle="collapse"
                    data-bs-target="#historyCollapse">
                    Transaction History
                </button>
            </h2>

            <div id="historyCollapse" class="accordion-collapse collapse show" data-bs-parent="#paymentAccordion">
                <div class="accordion-body">

                    <table class="table table-bordered table-sm">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Description</th>
                                <th>Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="(t, i) in transactions" :key="i">
                                <td>{{ t.dateSubmitted }}</td>
                                <td>{{ t.transactionType }}</td>
                                <td>{{ t.amountPaid }}</td>
                                <td>
                                    <span class="badge bg-success" v-if="t.isApproved === 1">Verified</span>
                                    <span class="badge bg-danger" v-if="t.isApproved === 2">Disapproved</span>
                                    <span class="badge bg-warning" v-else>Pending</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { EnrollmentApi } from '@/services/api/enrollmentApi'

export default {
    name: 'PaymentOptionComponents',

    props: {
        assessment: {
            type: Number,
            required: true
        },
        transactions: {
            type: Object,
            required: false
        }
    },

    data() {
        return {
            submitLoader: false,
            remarks: [
                'Upon Enrollment',
                '1st Monthly',
                '2nd Monthly',
                '3rd Monthly',
                '4th Monthly'
            ],

            formInput: {
                remark: '',
                amount: null,
                transactionDate: null,
                referenceNumber: null
            },

            file: null,
            filePreviewUrl: null,

            bankProofUploaded: false,
            ewalletProofUploaded: false,
            showTransactionHistory: false,
            errors: {},

            enrollmentApi: new EnrollmentApi()
        }
    },
    mounted() {
        console.log(this.transactions)
        if (this.transactions && this.transactions.length > 0) {
            this.showTransactionHistory = true
            const hasPending = this.transactions.some(
                t => t.isApproved === null
            )

            if (hasPending) {
                this.bankProofUploaded = true
                this.ewalletProofUploaded = true
            }
        }
    },
    methods: {
        async submitPaymentTransaction(paymentMethod) {
            this.submitLoader = true
            this.errors = {}

            /* ================= VALIDATION ================= */
            if (!this.formInput.remark) {
                this.errors.remark = 'Payment remark is required.'
            }

            if (!this.formInput.amount) {
                this.errors.amount = 'Amount is required.'
            }

            if (!this.formInput.transactionDate) {
                this.errors.transactionDate = 'Transaction date is required.'
            }

            if (!this.file) {
                this.errors.file = 'Proof of payment is required.'
            }

            if (paymentMethod === 'gcash' && !this.formInput.referenceNumber) {
                this.errors.referenceNumber = 'Reference number is required.'
            }

            if (Object.keys(this.errors).length > 0) return
            /* ============================================== */

            const formData = new FormData()
            formData.append('transactionType', this.formInput.remark)
            formData.append('amountPaid', this.formInput.amount)
            formData.append('transactionDate', this.formInput.transactionDate)
            formData.append('paymentMethod', paymentMethod)
            formData.append('assessment', this.assessment)
            formData.append('file', this.file)

            if (paymentMethod === 'gcash') {
                formData.append('referenceNumber', this.formInput.referenceNumber)
            }
            try {
                const response = await this.enrollmentApi.submitEnrollmentPayment(formData)
                if (response.status === 200) {
                    window.Toast.fire({
                        icon: 'success',
                        title: 'Payment transaction submitted successfully!'
                    })
                    this.resetForm()
                    window.location.reload()
                } else {
                    window.Toast.fire({
                        icon: 'error',
                        title: (response?.data?.message && response?.data?.error)
                            ? `${response.data.message} - ${response.data.error}`
                            : 'An error occurred. Please try again.'
                    })
                }
            } catch (error) {
                console.error(error)
                window.Toast.fire({
                    icon: 'error',
                    title: 'An error occurred. Please try again.'
                })
                this.errors = error.response.data.errors || { general: 'An error occurred. Please try again.' }
            }
            this.submitLoader = false
            window.location.reload()
        },

        fileAttachment(event) {
            const file = event.target.files[0]
            if (!this.fileValidation(file)) return
            this.file = file
        },

        fileValidation(file) {
            const allowedTypes = [
                'image/png',
                'image/jpeg',
                'image/jpg',
                'application/pdf'
            ]
            const maxSize = 3 * 1024 * 1024

            if (!allowedTypes.includes(file.type)) {
                this.errors.file = 'Only PNG, JPG, JPEG, and PDF files are allowed.'
                return false
            }

            if (file.size > maxSize) {
                this.errors.file = 'File must not exceed 3MB.'
                return false
            }

            return true
        },

        resetForm() {
            this.formInput = {
                remark: '',
                amount: null,
                transactionDate: null,
                referenceNumber: null
            }
            this.file = null
            this.errors = {}
        }
    }
}
</script>
