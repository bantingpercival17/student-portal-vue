<template>
    <div class="container-fluid">
        <div class="card">
            <div class="nav-scroller ">
                <nav class=" nav nav-underline bg-soft-primary pb-0 text-center " aria-label="Secondary navigation">
                    <a :class="navClass('vessel-information')" @click="changeCard('vessel-information')">
                        VESSEL INFORMATION
                    </a>
                    <a :class="navClass('monthly-report')" @click="changeCard('monthly-report')">
                        MONTHLY REPORT VIEW
                    </a>
                </nav>
            </div>
            <div class="card-body">
                <div v-if="currentCard == 'monthly-report'" class="monthly-report">
                    <div class="row">
                        <h4 class="text-primary fw-bolder col-md">
                            {{ monthlyReport?.month || 'MONTH' }}
                        </h4>
                        <div class="col-md">
                            <a @click="viewReport(monthlyReport?.id, 'v2')" data-bs-toggle="modal"
                                data-bs-target="#viewGeneratedReport" class="btn btn-outline-primary btn-sm float-end "
                                target="_blank">
                                VIEW PDF REPORT
                            </a>
                            <a v-if="!editMode" @click="editMode = true"
                                class="btn btn-outline-info btn-sm me-2 float-end " target="_blank">
                                EDIT
                            </a>
                            <a v-else @click="editMode = false" class="btn btn-outline-danger btn-sm me-2 float-end "
                                target="_blank">
                                CLOSE
                            </a>

                        </div>
                    </div>
                    <div class="report-details">
                        <div v-if="!editMode" class="row">
                            <div class="col-md-12 form-group">
                                <small class="fw-bolder text-muted">TASK AS PER TRB</small>
                                <label for="" class="form-control border border-primary">{{ monthlyReport?.task_trb
                                    }}</label>
                            </div>
                            <div class="col-md-6 form-group">
                                <small class="fw-bolder text-muted">CODE</small>
                                <label for="" class="form-control border border-primary">{{ monthlyReport?.trb_code
                                    }}</label>
                            </div>
                            <div class="col-md-6 form-group">
                                <small class="fw-bolder text-muted">DATE PREFERRED</small>
                                <label for="" class="form-control border border-primary">{{
                                    monthlyReport?.date_preferred
                                    }}</label>
                            </div>
                            <div class="col-md-6 form-group">
                                <small class="fw-bolder text-muted">MASTER'S NAME</small>
                                <label for="" class="form-control border border-primary">{{ monthlyReport?.master_name
                                    }}</label>
                            </div>
                            <div class="col-md-6 form-group">
                                <small class="fw-bolder text-muted">MASTER'S EMAIL</small>
                                <label for="" class="form-control border border-primary">{{
                                    monthlyReport?.master_email }}</label>
                            </div>
                            <div class="col-md-6 form-group">
                                <small class="fw-bolder text-muted">INPUTTED TO DAILY JOURNAL</small>
                                <label for="" class="form-control border border-primary">{{ monthlyReport?.daily_journal
                                    ==
                                    1 ? 'Yes' : 'No'
                                    }}</label>
                            </div>
                            <div class="col-md-6 form-group">
                                <small class="fw-bolder text-muted">SIGNED BY OFFICER / MASTER</small>
                                <label for="" class="form-control border border-primary">{{
                                    monthlyReport?.have_signature ==
                                        1 ? 'Yes' : 'No'
                                }}</label>
                            </div>
                            <div class="col-md-12 form-group">
                                <small class="fw-bolder text-muted">REMARKS IS LEARNING ACQUIRED</small>
                                <label for="" class="form-control border border-primary">{{ monthlyReport?.remarks
                                    }}</label>
                            </div>
                        </div>
                        <form v-else @submit.prevent="submitForm" method="post">
                            <div class="row">
                                <div class="col-md-12 col-lg-12">
                                    <label for="example-text-input" class="form-control-label fw-bolder">
                                        PERIOD COVERED
                                    </label>
                                </div>
                                <div class="col-md-12 col-lg-6">
                                    <inputComponentV2 type="Date" label="Date Start" v-model:value="startDate"
                                        :error="errors.start_date" />
                                </div>
                                <div class="col-md-12 col-lg-6">
                                    <inputComponentV2 label="Date End" type="date" v-model:value="endDate"
                                        :error="errors.end_date" />
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12 col-lg-12">
                                    <inputComponentV2 label="Date Preferred" v-model:value="datePreferred"
                                        :error="errors.date_preferred" />
                                </div>
                                <div class="col-md-12 col-lg-6">
                                    <inputComponentV2 label="Master Name" v-model:value="masterName"
                                        :error="errors.master_name" />
                                </div>
                                <div class="col-md-12 col-lg-6">
                                    <inputComponentV2 label="Master Name Email" v-model:value="masterEmail"
                                        :error="errors.master_email" />
                                </div>
                                <div class="col-md-12 col-lg-6">
                                    <selectComponent label="Inputted to Daily Journal" :data="yesOrNo"
                                        v-model:value="inputDailyJournal" :error="errors.input" />
                                </div>
                                <div class="col-md-12 col-lg-6">
                                    <selectComponent label="Signed by Officer/Master" :data="yesOrNo"
                                        v-model:value="signed" :error="errors.signed" />
                                </div>
                                <div class="col-md-12 col-lg-12">
                                    <inputComponentV2 label="Trb Code" v-model:value="trbCode"
                                        :error="errors.trb_code" />
                                </div>
                                <div class="col-md-12 col-lg-12">
                                    <textAreaComponent label="task as per trb" v-model:value="trbTask"
                                        :error="errors.trb_tasks" row="6" />
                                </div>
                                <div class="col-md-12 col-lg-12">
                                    <textAreaComponent label="remarks us learning acquired" v-model:value="remarks"
                                        :error="errors.remarks" row="6" />
                                </div>
                            </div>
                            <div class="form-group float-right">
                                <button class="btn btn-primary" type="submit">UPDATE INFORMATION</button>
                            </div>
                        </form>
                    </div>

                    <div class="attachments">
                        <h5 class="text-primary fw-bolder">
                            MONTHLY REPORT DOCUMENTS
                        </h5>
                        <div v-for="(task, item) in taskList" :key="item" class="">
                            <div v-if="forms.loading[item]">
                                <div class="form-group">
                                    <p class="document-title"></p>
                                    <div class="document-form">
                                        <div v-if="task.length > 2">
                                            <div class="mb-">
                                                <label for="" class="document-remarks"></label>
                                                <div class="document-remarks-text form-control"></div>
                                            </div>
                                        </div>
                                        <label for="" class="document-remarks"></label>
                                        <div class="document-remarks-file form-control"></div>
                                    </div>

                                </div>
                            </div>
                            <div v-else>
                                <span class="fw-bolder text-info">{{ allCaps(task.name) }}</span>
                                <div v-if="task.content === null" class="document-form">
                                    <FileAttachmentForm :token="token" :attribure="task" />
                                </div>
                                <div v-else>
                                    <FileAttachmentValidationView :token="token" :attribure="task" />
                                </div>
                            </div>
                            <hr>
                        </div>
                    </div>

                </div>
                <div v-if="currentCard == 'vessel-information'" class="vessel-information">
                    <h4 class="card-title fw-bolder text-primary">{{ vesselDetails.vessel_name }}</h4>
                    <div class="row">
                        <div class="col-lg-6 col-md-12">
                            <label-component label="COMPANY NAME" :value="vesselDetails.company_name" />
                        </div>
                        <div class="col-lg-6 col-md-12">
                            <label-component label="VESSEL TYPE" :value="vesselDetails.vessel_type" />
                        </div>

                        <div class="col-lg col-md-12">
                            <label-component label="STATUS" :value="vesselDetails.shipboard_status" />
                        </div>
                        <div class="col-lg col-md-12">
                            <label-component label="DATE OF EMBARKING" :value="vesselDetails.embarked" />
                        </div>
                        <div class="col-lg col-md-12">
                            <label-component label="AREA OF DEPLOYMENT" :value="vesselDetails.shipping_company" />
                        </div>
                    </div>
                    <div class="monitoring-section mt-4">
                        <button class="btn btn-sm btn-primary me-3 float-end" data-bs-toggle="modal"
                            data-bs-target="#create-monthly-report">CREATE MONTHLY REPORT</button>
                        <label for="" class="fw-bolder text-primary h5">| MONTHLY ONBOARD PERFORMANCE REPORT</label>
                        <div class="table-responsive mt-4">
                            <table id="basic-table" class="table table-striped mb-0" role="grid"
                                data-toggle="data-table">
                                <thead>
                                    <tr>
                                        <th>Narrative Report</th>
                                        <!--  <th>Progress</th> -->
                                        <th>Action</th>
                                    </tr>
                                </thead>


                                <tbody v-if="vesselDetails.performance_report.length > 0">
                                    <tr v-for="(vessel, index2) in vesselDetails.performance_report" :key="index2">
                                        <td><span class="fw-bolder">{{ vessel.month }}</span></td>
                                        <!-- <td></td> -->
                                        <td>
                                            <router-link class="btn btn-sm btn-outline-primary me-2"
                                                :to="{ name: 'student-layout.onboard-mopm-view-v2', query: { v: encrypt(vessel.id) } }">view</router-link>
                                            <button class="btn btn-sm btn-outline-info me-2" data-bs-toggle="modal"
                                                data-bs-target="#exampleModal"
                                                @click="viewReport(vessel.id, 'v2')">report</button>
                                            <button class="btn btn-sm btn-outline-danger"
                                                @click="removeReport(vessel.id)">Remove</button>
                                        </td>
                                    </tr>
                                </tbody>
                                <tbody v-else>
                                    <tr>
                                        <th colspan="3">No Data</th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <CreateMonthlyReport v-if="vesselSelected" :key="vesselSelected.id" :token="token" :vesselDetails="vesselSelected"
        :showLoading="showLoading" />
    <modal id="viewGeneratedReport" :tabindex="-1" role="dialog" mainClass="bd-example-modal-lg" dialogClass="modal-lg"
        ariaLabelled="viewGeneratedReport" :ariaHidden="true" contentrole="document">
        <model-header :dismissable="true">
            <h5 class="modal-title text-primary fw-bolder" id="viewGeneratedReport">MONTHLY REPORT OVERVIEW
            </h5>
        </model-header>
        <model-body>
            <div v-if="reportViewLink">
                <PdfViewer :pdfUrl="reportViewLink" />
            </div>
            <label v-else> Loading</label>
        </model-body>
        <model-footer>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </model-footer>

    </modal>
</template>
<script>
import axios from 'axios'
import { GET_USER_TOKEN, IS_USER_AUTHENTICATE_GETTER, SHOW_LOADING_MUTATION } from '@/store/storeConstants'
import { mapGetters, mapMutations } from 'vuex'
import FileAttachmentForm from './components/FileAttachmentForm.vue'
import FileAttachmentValidationView from './components/FileAttachmentValidationView.vue'
import PdfViewer from '@/components/main-layouts/components/PdfViewer.vue'
import inputComponentV2 from '@/components/main-layouts/components/widgets/input-component-v2.vue'
import textAreaComponent from '@/components/main-layouts/components/widgets/text-area-component.vue'
import selectComponent from '@/components/main-layouts/components/widgets/select-component.vue'
import labelComponent from '@/components/main-layouts/components/widgets/label-component.vue'

import Swal from 'sweetalert2'
import CreateMonthlyReport from './components/CreateMonthlyReport.vue'
export default {
    name: 'MonthlyReportView',
    data() {
        return {
            isLoading: true,
            monthlyReport: [],
            vesselDetails: [],
            taskList: [],
            currentCard: 'monthly-report',
            forms: {
                remarks: [],
                files: [],
                loading: [],
                errors: []
            },
            errors: [],
            reportViewLink: '',
            editMode: false,
            yesOrNo: ['Yes', 'No'],
            shipboardId: '',
            startDate: '',
            endDate: '',
            trbTask: '',
            trbCode: '',
            inputDailyJournal: '',
            signed: '',
            remarks: '',
            datePreferred: '',
            masterEmail: '',
            masterName: ''
        }
    },
    components: {
        PdfViewer,
        FileAttachmentForm,
        FileAttachmentValidationView,
        inputComponentV2,
        textAreaComponent,
        selectComponent,
        labelComponent,
        CreateMonthlyReport
    },
    computed: {
        ...mapGetters('auth', {
            token: GET_USER_TOKEN,
            isAuth: IS_USER_AUTHENTICATE_GETTER
        })
    },
    mounted() {
        this.retrieveData()
    },
    methods: {
        ...mapMutations({
            showLoading: SHOW_LOADING_MUTATION
        }),
        navClass(item) {
            return this.currentCard === item ? 'nav-link active' : 'nav-link'
        },
        changeCard(item) {
            this.currentCard = item
        },
        allCaps(data) {
            return data.toUpperCase()
        },
        encrypt(data) {
            return btoa(data)
        },
        retrieveData() {
            const link = this.$route.query.v // Get the Parameter Value in Link
            axios.get('/student/onboard/performance/view/v2?id=' + link, {
                headers: {
                    Authorization: 'Bearer ' + this.token
                }
            }).then((response) => {
                const responseData = response.data
                this.taskList = responseData.taskList
                this.monthlyReport = responseData.monthlyReport
                this.vesselDetails = responseData.vesselDetails
                this.isLoading = false

                const dates = this.monthlyReport?.date_covered.split(':')
                this.startDate = dates[0]
                this.endDate = dates[1]
                this.trbTask = this.monthlyReport?.task_trb
                this.trbCode = this.monthlyReport?.trb_code
                this.inputDailyJournal = this.monthlyReport?.daily_journal === 1 ? 'Yes' : 'No'
                this.signed = this.monthlyReport?.have_signature === 1 ? 'Yes' : 'No'
                this.remarks = this.monthlyReport?.remarks
                this.datePreferred = this.monthlyReport?.date_preferred
                this.masterEmail = this.monthlyReport?.master_email
                this.masterName = this.monthlyReport?.master_name
            }).catch((error) => {
                console.log(error)
                this.isLoading = false
            })
        },
        viewReport(data, version) {
            const link = '/student/onboard/performance/view-report/' + data + '/' + version
            console.log(link)
            axios.get(link, {
                headers: {
                    Authorization: 'Bearer ' + this.token
                },
                responseType: 'blob'
            }).then(response => {
                // Create a Blob from the PDF data
                const blob = new Blob([response.data], { type: 'application/pdf' })

                // Convert Blob to a data URL
                const dataUrl = URL.createObjectURL(blob)
                /*  const blob = new Blob([response.data], { type: 'application/pdf' })
                 const url = window.URL.createObjectURL(blob) */
                console.log(dataUrl)
                this.reportViewLink = dataUrl
                console.log(this.reportViewLink)
                // window.open(url, '_blank')
            }).catch(error => {
                this.errorAlert(error)
                console.error('Error fetching PDF:', error)
            })
        },
        async submitForm() {
            this.showLoading(true)
            const formData = new FormData()
            formData.append('report', this.monthlyReport.id)
            formData.append('start_date', this.startDate)
            formData.append('end_date', this.endDate)
            formData.append('date_preferred', this.datePreferred)
            formData.append('input', this.inputDailyJournal)
            formData.append('trb_tasks', this.trbTask)
            formData.append('trb_code', this.trbCode)
            formData.append('signed', this.signed)
            formData.append('remarks', this.remarks)
            formData.append('master_name', this.masterName)
            formData.append('master_email', this.masterEmail)
            axios.post('/student/onboard/monthly-performance/update', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: 'Bearer ' + this.token
                }
            }).then((response) => {
                this.showLoading(false)
                // window.location.reload()
            }).catch((error) => {
                this.showLoading(false)
                if (error.response.status === 422) {
                    console.log(error.response.data)
                    this.errors = error.response.data
                } else {
                    Swal.fire('Network Failed!', error, 'warning')
                }
            })
        },
        confirmAndRemove(url, data, successMessage) {
            Swal.fire({
                title: 'Are you sure?',
                text: 'Do you want to proceed?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, remove it!',
                cancelButtonText: 'Cancel'
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.post(url, data, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: 'Bearer ' + this.token
                        }
                    })
                        .then((response) => {
                            window.location.reload()
                            Swal.fire('Removed!', successMessage, 'success')
                        })
                        .catch((error) => {
                            alert(error)
                        })
                }
            })
        },
        removeItem(data) {
            this.confirmAndRemove(
                '/student/onboard/vessel-detials/remove',
                { vessel: data },
                'The vessel information has been removed.'
            )
        },
        removeReport(data) {
            this.confirmAndRemove(
                '/student/onboard/monthly-performance/remove',
                { report: data },
                'The monthly report has been removed.'
            )
        }
    }
}
</script>