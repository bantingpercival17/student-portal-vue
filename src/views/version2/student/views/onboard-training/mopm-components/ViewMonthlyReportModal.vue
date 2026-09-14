<template>
    <div class="modal fade show d-block" tabindex="-1" style="background-color: rgba(0,0,0,0.5);">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content border-0">
                <div class="modal-header bg-success text-white py-3 px-4">
                    <div class="d-flex align-items-center gap-3">
                        <i class="bi bi-file-earmark-text fs-3 text-warning"></i>
                        <div>
                            <h5 class="modal-title fw-bold text-white mb-0">MONTHLY MONITORING REPORT VIEW</h5>
                            <span class="small text-white-50">{{ vesselDetails.vessel_name }}
                            </span>
                        </div>
                    </div>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"
                        @click="closeModal"></button>
                </div>
                <template v-if="contentLoader">
                    <div class="d-flex justify-content-center align-items-center" style="height: 300px;">
                        <div class="spinner-border text-primary" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <form @submit.prevent="submitNewReport">
                        <div class="modal-body p-4">
                            <div class="row g-3">
                                <div class="col-12 col-md-6">
                                    <label class="form-label fw-bold text-dark small">Date Start *</label>
                                    <input type="date" class="form-control" v-model="newReportForm.startDate" required>
                                </div>
                                <div class="col-12 col-md-6">
                                    <label class="form-label fw-bold text-dark small">Date End *</label>
                                    <input type="date" class="form-control" v-model="newReportForm.endDate" required>
                                </div>
                                <div class="col-12 col-md-12">
                                    <label class="form-label fw-bold text-dark small">TRB Task Code *</label>
                                    <input type="text" class="form-control" placeholder="e.g. 1.1 (.1, .2) 1.2 (.3, .4)"
                                        v-model="newReportForm.code" required>
                                </div>
                                <div class="col-12">
                                    <label class="form-label fw-bold text-dark small">Task Description As Per TRB
                                        *</label>
                                    <input type="text" class="form-control"
                                        placeholder="e.g. Relieving and Handing Over the Watch"
                                        v-model="newReportForm.taskAsPerTrb" required>
                                </div>
                                <div class="col-12 col-md-12">
                                    <label class="form-label fw-bold text-dark small">Date Range / Preferred *</label>
                                    <input type="text" class="form-control"
                                        placeholder="e.g. AUGUST 31 2024 TO SEPTEMBER 30 2024"
                                        v-model="newReportForm.datePreferred" required>
                                </div>
                                <div class="col-12 col-md-6">
                                    <label class="form-label fw-bold text-dark small">Master's / Officer's Name
                                        *</label>
                                    <input type="text" class="form-control" placeholder="e.g. KONDRATENKOV, SERGEI"
                                        v-model="newReportForm.mastersName" required>
                                </div>
                                <div class="col-12 col-md-6">
                                    <label class="form-label fw-bold text-dark small">Master's / Officer's Email
                                        *</label>
                                    <input type="text" class="form-control" placeholder="e.g. sample@bma.edu.ph"
                                        v-model="newReportForm.mastersEmail" required>
                                </div>
                                <div class="col-6">
                                    <div class="form-check form-switch mt-3">
                                        <input class="form-check-input" type="checkbox" id="journalCheck"
                                            v-model="newReportForm.inputtedDailyJournal" required>
                                        <label class="form-check-label fw-semibold small" for="journalCheck">Inputted To
                                            Daily Journal</label>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="form-check form-switch mt-3">
                                        <input class="form-check-input" type="checkbox" id="signedCheck"
                                            v-model="newReportForm.signedByMaster" required>
                                        <label class="form-check-label fw-semibold small" for="signedCheck">Signed By
                                            Master / Officer</label>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <label class="form-label fw-bold text-dark small">Remarks / Learning Acquired
                                        *</label>
                                    <textarea class="form-control" rows="3"
                                        placeholder="Describe key machinery operations, watchkeeping experience, or safety protocols..."
                                        v-model="newReportForm.remarksLearning" required></textarea>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer bg-light">
                            <button type="button" class="btn btn-light" @click="closeModal">Cancel</button>
                            <button type="submit" class="btn btn-success px-4">Submit Monthly Report</button>
                        </div>
                    </form>
                </template>
            </div>
        </div>
    </div>
</template>
<style scoped>
.spinner-border {
    width: 100px;
    height: 100px;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
</style>
<script>
import apiLink from '@/services/api/apiLink'
import { OnboardTrainingApi } from '@/services/api/onboardTrainingApi'
import { alertError, alertSuccess } from '@/utils/alert'
export default {
    name: 'ViewMonthlyReportModal',
    props: {
        vesselDetails: Object
    },
    data() {
        const newReportForm = {
            startDate: '',
            endDate: '',
            code: '',
            taskAsPerTrb: '',
            datePreferred: '',
            mastersName: '',
            mastersEmail: '',
            inputtedDailyJournal: false,
            signedByMaster: false,
            remarksLearning: ''
        }
        return {
            contentLoader: false,
            newReportForm
        }
    },
    methods: {
        closeModal() {
            this.$emit('update:modelValue', false) // Close the modal
        },
        async submitNewReport() {
            this.contentLoader = true
            this.errors = []
            try {
                const formData = new FormData()
                Object.entries(this.newReportForm).forEach(([key, value]) => {
                    formData.append(key, value)
                })
                console.log(this.vesselDetails)
                formData.append('shipboard', this.vesselDetails.id)
                const apiService = new OnboardTrainingApi()
                const response = await apiService.postForm(
                    formData,
                    apiLink.onboardApiLink.createMonthlyReport
                )
                alertSuccess(response.message)
                setInterval(function () {
                    window.location.reload()
                }, 500)
                console.log(response)
            } catch (error) {
                if (error.response?.status === 422) {
                    this.errors = error.response?.data?.errors ?? {}
                }
                console.log(error.response?.data?.error?.message)
                alertError(error.response?.data?.error?.message || error.message)
            } finally {
                this.contentLoader = false
            }
            console.log(this.newReportForm)
        }
    }
}
</script>