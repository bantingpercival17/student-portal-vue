<template>
    <stepper value="" :isActive="className.stepperStatus" />
    <div :class="`card ${className.cardClass}`">
        <div class="card-body m-2 p-2">
            <span :class="`${className.badgeColor} badge float-end`">{{ status }}</span>
            <small class="fw-bolder text-muted">{{ progressName }}</small>
            <h5 :class="`${className.textClass} fw-bolder mb-1`">{{ titleName }}</h5>
            <!-- Documents List -->
            <div v-if="content" class="document-content p-3 row">
                <div class="row">
                    <div class="col-lg-6 col-md-12">
                        <h6 class="text-info mb-1 fw-bolder">PAYMENT INSTRUCTION</h6>
                        <p>For bank deposit or online fund transfer, please use the bank details
                            below:
                        </p>
                        <div v-if="propsApplicantDetails.course_id === 3">
                            <p class="fw-bolder text-info h5 mb-1">SENIOR HIGH SCHOOL</p>
                            <p class="mb-1">
                                <small class="text-muted">BANK:</small> <br>
                                <span class="fw-bolder text-secondary mt-0">LANDBANK OF THE
                                    PHILLIPINES</span>
                            </p>
                            <p class="mb-1">
                                <small class="text-muted">ACCOUNT NAME:</small> <br>
                                <span class="fw-bolder text-secondary mt-0">BALIWAG MARITIME
                                    FOUNDATION,INC.</span>
                            </p>
                            <p class="mb-1">
                                <small class="text-muted">ACCOUNT NUMBER:</small> <br>
                                <span class="fw-bolder text-secondary mt-0">0102112822</span>
                            </p>
                        </div>
                        <div v-else>
                            <p class="fw-bolder text-info h5 mb-1">COLLEGE</p>
                            <p class="mb-1">
                                <small class="text-muted">BANK:</small> <br>
                                <span class="fw-bolder text-secondary mt-0">BANK OF COMMERCE</span>
                            </p>
                            <p class="mb-1">
                                <small class="text-muted">ACCOUNT NAME:</small> <br>
                                <span class="fw-bolder text-secondary mt-0">BALIWAG MARITIME
                                    ACADEMY INC</span>
                            </p>
                            <p class="mb-1">
                                <small class="text-muted">ACCOUNT NUMBER:</small> <br>
                                <span class="fw-bolder text-secondary mt-0">062000001037</span>
                            </p>
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-12">
                        <div v-if="tuitionDetails">
                            <h6 class="text-info mb-1 fw-bolder">PAYMENT TRANSACTION DETAILS</h6>
                            <div class="row">
                                <div class="col-lg-8 col-md-12">
                                    <labelComponent label="transaciton date"
                                        :value="getFormatDate(tuitionDetails.online_transaction.updated_at)" />
                                </div>
                                <div class="col-lg-4 col-md-12">
                                    <!--  <labelComponent label="SBT BATCH" :value="deployment.sbt_batch" /> -->
                                </div>
                                <div class="col-lg-8 col-md-12">
                                    <labelComponent label="reference no."
                                        :value="tuitionDetails.online_transaction.reference_number" />
                                </div>
                                <div class="col-lg-4 col-md-12">
                                    <labelComponent label="paid amount"
                                        :value="currencyFormat(tuitionDetails.online_transaction.amount_paid)" />
                                </div>
                            </div>
                            <div class="d-flex justify-content-between mt-2">
                                <div v-if="tuitionDetails.online_transaction.is_approved === null">
                                    <span class="text-info">This payment is under verification of Accounting
                                        Office's</span>
                                </div>
                                <div v-else-if="tuitionDetails.online_transaction.is_approved === 0">
                                    <span class="text-info">This payment was
                                        disapproved because of this Remarks: </span>
                                    <span class="text-danger">
                                        {{ tuitionDetails.online_transaction.comment_remarks }}
                                    </span>
                                </div>
                                <div v-else>
                                    <span class="text-info">This payment was Verified</span>
                                </div>
                            </div>
                            <div v-if="tuitionDetails.online_transaction.is_approved === 0" class="form-payment">
                                <h6 class="text-info mb-1 fw-bolder">RE-UPLOAD PAYMENT TRANSACTION</h6>
                                <form @submit.prevent="submitPaymentTransaction" method="post"
                                    enctype="multipart/form-data">
                                    <inputComponentV2 type="text" label="Reference Number" v-model:value="reference_number"
                                        :error="errors.reference_number" />
                                    <inputComponentV2 type="date" label="Transaction Date" v-model:value="transactionDate"
                                        :error="errors.transaction_date" />
                                    <inputComponentV2 type="text" label="Payment Amount" v-model:value="amountPaid"
                                        :error="errors.amount_paid" />
                                    <div class="form-group">
                                        <label for="example-text-input" class="form-control-label fw-bolder">
                                            <small>ATTACH PAYMENT RECEIPT<span class="text-danger">*</span></small>
                                        </label>
                                        <input type="file"
                                            v-on:change="fileReAttachment($event, tuitionDetails.online_transaction.id)"
                                            class="form-control border border-primary" />
                                        <span class="badge bg-danger mt-2" v-if="errors.file">{{
                                            errors.file[0] }}</span>
                                    </div>
                                    <button class="btn btn-primary w-100" type="submit">SUBMIT</button>
                                </form>
                            </div>
                        </div>
                        <div v-else>
                            <h6 class="text-info mb-1 fw-bolder">FILL-UP PAYMENT TRANSACTION</h6>
                            <form @submit.prevent="submitPaymentTransaction" method="post" enctype="multipart/form-data">
                                <div class="row">
                                    <div class="col-lg-12 col-md-12 col-xs-12">
                                        <select-component label="Remarks" v-model:value="transactionRemarks"
                                            :error="errors.remarks" :data="remarks" />
                                    </div>
                                    <div class="col-lg-12 col-md-12 col-xs-12">
                                        <select-component label="Payment Mode" v-model:value="transactionPaymentMode"
                                            :error="errors.payment_mode" :data="paymentMode" />
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-lg-12 col-md-12 col-xs-12">
                                        <inputComponentV2 type="text" label="Reference Number"
                                            v-model:value="reference_number" :error="errors.reference_number" />
                                    </div>
                                    <div class="col-lg-12 col-md-12 col-xs-12">
                                        <inputComponentV2 type="date" label="Transaction Date"
                                            v-model:value="transactionDate" :error="errors.transaction_date" />
                                    </div>
                                    <div class="col-lg-12 col-md-12 col-xs-12">
                                        <inputComponentV2 type="text" label="Payment Amount" v-model:value="amountPaid"
                                            :error="errors.amount_paid" />
                                    </div>
                                </div>
                                <a class="badge bg-primary float-end" data-bs-toggle="modal"
                                    data-bs-target="#paymentView">View
                                    Sample Valid Attachment</a>
                                <div class="form-group">
                                    <label for="example-text-input" class="form-control-label fw-bolder">
                                        <small>ATTACH PAYMENT RECEIPT<span class="text-danger">*</span></small>
                                    </label>
                                    <input type="file" v-on:change="fileAttachment"
                                        class="form-control form-control-sm border border-primary" />
                                    <span class="badge bg-danger mt-2" v-if="errors.file">{{
                                        errors.file[0] }}</span>
                                </div>
                                <button class="btn btn-primary btn-sm w-100" type="submit">SUBMIT</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <modal id="paymentView" :tabindex="-1" role="dialog" mainClass="bd-example-modal-xlg" dialogClass="modal-lg"
        ariaLabelled="paymentViewLabel" :ariaHidden="true" contentrole="document">
        <model-header :dismissable="true">
            <h5 class="modal-title text-primary fw-bolder" id="paymentViewScrollableTitle">SAMPLE OF VALID PAYMENT
                ATTACHMENT AND INVALID
            </h5>
        </model-header>
        <model-body>
            <img src="@/assets/resources/accounting/Instruction.png" class="img-fluid gradient-main vh-100" alt="images">
        </model-body>
        <model-footer>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </model-footer>
    </modal>
</template>
<script>
import stepper from '@/components/main-layouts/components/widgets/stepper-widget.vue'
import inputComponentV2 from '@/components/main-layouts/components/widgets/input-component-v2.vue'
import selectComponent from '@/components/main-layouts/components/widgets/select-component.vue'
import axios from 'axios'
export default {
    name: 'ExaminationPayment',
    components: {
        stepper,
        inputComponentV2/* ,
        selectComponent */
    },
    data() {
        let className = { status: 'Pending', cardClass: '', textClass: 'text-muted', stepperStatus: false, stepperFinish: false, badgeColor: 'bg-secondary', contentShow: false }
        if (this.propsApplicantDetails.applicant && this.documents.approvedDocuments) {
            className = { status: 'Progress', cardClass: 'bg-soft-info', textClass: 'text-info', stepperStatus: true, stepperFinish: false, badgeColor: 'bg-info', contentShow: false }
        }
        const formData = new FormData()
        return {
            titleName: 'ENTRANCE EXAMINATION PAYMENT',
            progressName: 'STEP 3',
            status: className.status,
            className,
            content: true,
            tuitionDetails: false,
            errors: [],
            transactionDate: '',
            amountPaid: '',
            reference_number: '',
            formData
        }
    },
    methods: {
        showContent() {
            this.content = !this.content
        },
        fileAttachment(event) {
            const file = event.target.files[0] // Get the Files in Event
            this.formData.append('file', file) // Set the File on FormData
        },
        async submitPaymentTransaction() {
            this.showLoading(true)
            this.formData.append('transaction_date', this.transactionDate)
            this.formData.append('amount_paid', this.amountPaid)
            this.formData.append('reference_number', this.reference_number)
            this.formData.append('remarks', this.transactionRemarks)
            this.formData.append('payment_mode', this.transactionPaymentMode)
            this.formData.append('payment', this.tuitionDetails.id)
            this.errors = []
            axios.post('/student/payment-transaction', this.formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: 'Bearer ' + this.token
                }
            }).then((response) => {
                this.showLoading(false)
                console.log(response.data)
                if (response.status === 200) {
                    this.showAlert(response.data)
                    window.location.reload()
                }
            }).catch((error) => {
                this.showLoading(false)
                console.log(error)
                if (error.response.status === 422) {
                    console.log(error.response.data)
                    this.errors = error.response.data.errors
                } else {
                    this.showAlertError(error)
                }
            })
        }
    },
    props: { propsApplicantDetails: Object, documents: Object, examination: Object, token: String }
}
</script>