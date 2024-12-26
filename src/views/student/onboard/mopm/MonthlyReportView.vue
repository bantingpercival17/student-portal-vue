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
                            <a href="{{ route('onboard.narative-report-monthly-summary-v2') . '?_midshipman=' . base64_encode($profile->id) . '&narativeReport=' . base64_encode($monthlyReport->id) }}"
                                class="btn btn-outline-primary btn-sm float-end " target="_blank">
                                VIEW PDF REPORT
                            </a>
                        </div>
                    </div>
                    <div class="row">
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
                            <label for="" class="form-control border border-primary">{{ monthlyReport?.date_preferred
                                }}</label>
                        </div>
                        <div class="col-md-6 form-group">
                            <small class="fw-bolder text-muted">INPUTTED TO DAILY JOURNAL</small>
                            <label for="" class="form-control border border-primary">{{ monthlyReport?.daily_journal ==
                                1 ? 'Yes' : 'No'
                                }}</label>
                        </div>
                        <div class="col-md-6 form-group">
                            <small class="fw-bolder text-muted">SIGNED BY OFFICER / MASTER</small>
                            <label for="" class="form-control border border-primary">{{ monthlyReport?.have_signature ==
                                1 ? 'Yes' : 'No'
                                }}</label>
                        </div>
                        <div class="col-md-12 form-group">
                            <small class="fw-bolder text-muted">REMARKS IS LEARNING ACQUIRED</small>
                            <label for="" class="form-control border border-primary">{{ monthlyReport?.remarks
                                }}</label>
                        </div>
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
                                    for validation
                                </div>
                            </div>
                            <hr>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import { GET_USER_TOKEN, IS_USER_AUTHENTICATE_GETTER, SHOW_LOADING_MUTATION } from '@/store/storeConstants'
import { mapGetters, mapMutations } from 'vuex'
import FileAttachmentForm from './components/FileAttachmentForm.vue'
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
            }
        }
    },
    components: {
        FileAttachmentForm
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
                /*  this.performanceReport = response.data.data // Set the Performance Report Information
                 this.version1 = response.data.version1
                 console.log(response.data)
                 if (this.performanceReport.document_attachments) {
                     this.documents = this.performanceReport.document_attachments
                 }
                 this.tasks = response.data.documents // Set the Document of Performance Report */
                this.isLoading = false
            }).catch((error) => {
                console.log(error)
                this.isLoading = false
            })
        }
    }
}
</script>