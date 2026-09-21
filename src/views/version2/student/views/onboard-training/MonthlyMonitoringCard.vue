<template>
    <div
        class="card-header bg-white p-4 border-bottom d-flex flex-wrap align-items-center justify-content-between gap-3">
        <div>
            <h3 class="h5 fw-bold text-success mb-1">
                <i class="bi bi-ship text-success me-2"></i>SEA SERVICE &amp; MONTHLY MONITORING (MOPM)
            </h3>
            <p class="text-muted small mb-0">Manage shipboard deployment logs, TRB task accomplishments, and monthly
                verifications.</p>
        </div>

        <button class="btn btn-success btn-sm px-3 shadow-sm d-flex align-items-center gap-2"
            @click="openModal('add-vessel')">
            <i class="bi bi-plus-circle-fill"></i> Add Vessel
        </button>
    </div>
    <div class="card-body m-0 p-0">
        <template v-if="seaServiceList">
            <div class="bg-light m-0 p-0 border-bottom ">
                <div class="nav-scroller mt-2">
                    <ul class="nav nav-tabsm-0 p-0">
                        <li class="nav-item" v-for="vessel in seaServiceList" :key="vessel.id">
                            <button class="nav-link fw-semibold px-4 py-2.5 me-2 border-0 rounded-top"
                                :class="{ 'active bg-white text-success border-top border-start border-end': selectVessel === vessel.id }"
                                @click="changeVessel(vessel.id)">
                                <i class="bi bi-briefcase-fill me-1 small"></i> {{ vessel.vessel_name }}
                                <span class="badge ms-2"
                                    :class="vessel.shipboard_status === 'ON-GOING' ? 'bg-info' : 'bg-success'">
                                    {{ vessel.shipboard_status }}
                                </span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- Active Vessel Details Header Panel -->
            <div class="card-body p-0 pt-4 border-bottom bg-light-subtle" v-if="activeVessel">
                <div class="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-3">
                    <div>
                        <h4 class="h5 fw-bold text-dark mb-1 d-flex align-items-center gap-2">
                            {{ activeVessel.vessel_name }}
                            <span
                                class="badge bg-warning-subtle text-warning-emphasis border border-warning-subtle fs-7">
                                {{ activeVessel.vessel_type }}
                            </span>
                        </h4>
                        <div class="text-muted small">Company:
                            <strong class="text-dark">
                                {{ activeVessel.company_name }}
                            </strong>
                        </div>
                    </div>

                    <div class="d-flex gap-2">
                        <button class="btn btn-outline-success btn-sm px-3" @click="openModal('edit-vessel')">
                            <i class="bi bi-pencil-square me-1"></i> Edit
                        </button>
                        <button class="btn btn-outline-danger btn-sm px-3" @click="removeVessel(activeVessel.id)">
                            <i class="bi bi-trash me-1"></i> Remove
                        </button>
                    </div>
                </div>
                <!-- Vessel Key Metrics Grid -->
                <div class="row g-3">
                    <div class="col-12 col-md col-md-3">
                        <div class="form-control bg-white rounded border">
                            <small class="text-uppercase text-muted fw-semibold">Status</small>
                            <div class="fw-bold text-success">{{ activeVessel.shipboard_status }}</div>
                        </div>
                    </div>
                    <div class="col-12 col-md col-md-3">
                        <div class="form-control bg-white rounded border">
                            <small class="text-uppercase text-muted fw-semibold">Area of Deployment</small>
                            <div class="fw-bold text-dark">{{ activeVessel.areaOfDeployment }}</div>
                        </div>
                    </div>
                    <div class="col-12 col-md col-md-3">
                        <div class="form-control bg-white rounded border">
                            <small class="text-uppercase text-muted fw-semibold">Date of Embarking</small>
                            <div class="fw-bold text-dark">{{ convertDate(activeVessel.embarked) }}</div>
                        </div>
                    </div>
                    <div v-if="activeVessel.disembarked" class="col-12 col-md col-md-3">
                        <div class="form-control bg-white rounded border">
                            <small class="text-uppercase text-muted fw-semibold">Date of Disembarking</small>
                            <div class="fw-bold text-dark">{{ convertDate(activeVessel.disembarked) }}</div>
                        </div>
                    </div>
                    <div class="col-12 col-md col-md-3">
                        <div class="form-control bg-white rounded border">
                            <small class="text-uppercase text-muted fw-semibold">Total Reports</small>
                            <div class="fw-bold text-primary">
                                {{ activeVessel.totalMonthlyReport }} Submissions
                            </div>
                        </div>
                    </div>
                </div>
                <!-- List of Monthly Monitoring -->
                <div class="mt-3">
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <h5
                            class="h6 fw-bold text-uppercase text-success tracking-wide mb-0 border-start border-3 border-success ps-2">
                            Monthly Onboard Performance Reports
                        </h5>
                        <button class="btn btn-success btn-sm px-3 shadow-sm"
                            @click="openModal('create-monthly-report')">
                            <i class="bi bi-plus-lg me-1"></i> Create Monthly Report
                        </button>
                    </div>

                    <!-- Empty State -->
                    <div v-if="!activeVessel || activeVessel.totalMonthlyReport === 0"
                        class="text-center py-5 border rounded-3 bg-light">
                        <i class="bi bi-journal-x display-4 text-muted mb-2"></i>
                        <p class="text-muted fw-medium">No monthly performance reports submitted for this vessel yet.
                        </p>
                        <button class="btn btn-success btn-sm" @click="openModal('create-monthly-report')">
                            <i class="bi bi-plus-circle me-1"></i> Submit First Monthly Report
                        </button>
                    </div>

                    <!-- Reports Table -->
                    <div v-else class="table-responsive rounded-3 border">
                        <table class="table table-hover align-middle mb-0">
                            <thead class="bg-light text-secondary extra-small text-uppercase">
                                <tr>
                                    <th class="ps-3 py-3">Narrative / Period</th>
                                    <!-- <th>TRB Task Code</th> -->
                                    <th>Verification Status</th>
                                    <th>Signed By Master</th>
                                    <th class="text-end pe-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="report in activeVessel.listofMonthlyReport" :key="report.id">
                                    <td class="ps-3 fw-bold text-dark">
                                        <div class="d-flex align-items-center gap-2">
                                            <i class="bi bi-calendar-event text-emerald fs-5"></i>
                                            <span>{{ report.month }}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <span class="badge rounded-pill px-2.5 py-1"
                                            :class="report.is_approved === 1 ? 'bg-success-subtle text-success border border-success-subtle' : 'bg-warning-subtle text-warning-emphasis border border-warning-subtle'">
                                            <i class="bi me-1"
                                                :class="report.is_approved === 1 ? 'bi-check-circle-fill' : 'bi-clock-history'"></i>
                                            {{ report.is_approved === null ? 'DRAFT' :
                                                (report.is_approved ? 'APPROVED DOCUMENTS' : 'PENDING') }}
                                        </span>
                                    </td>
                                    <td>
                                        <span class="badge"
                                            :class="report.have_signature ? 'bg-primary-subtle text-primary' : 'bg-secondary-subtle text-secondary'">
                                            {{ report.have_signature ? 'Yes (Signed)' : 'Pending' }}
                                        </span>
                                    </td>
                                    <td class="text-end pe-3">
                                        <div class="btn-group btn-group-sm">
                                            <button class="btn btn-outline-success px-3"
                                                @click="viewReportDetails(report)" title="View Full Report">
                                                <i class="bi bi-eye-fill me-1"></i> View
                                            </button>
                                            <button class="btn btn-outline-primary px-3" @click="viewReportPDF(report)"
                                                title="Export PDF">
                                                <i class="bi bi-file-earmark-pdf-fill me-1"></i> PDF
                                            </button>
                                            <button class="btn btn-outline-danger px-2"
                                                @click="removeMonthlyReport(report.id)" title="Delete">
                                                <i class="bi bi-trash"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </template>
        <template v-else>
            <p class="text-muted fw-medium">No vessel information yet.</p>
        </template>
    </div>
    <AddVesselModal v-if="modalAddVessel" v-model="modalAddVessel" :vessel-details="vesselApplication" />
    <UpdateVesselModal v-if="modalUpdateVessel" v-model="modalUpdateVessel" :vessel-details="vesselApplication"
        :active-vessel="activeVessel" />
    <CreateMonthlyReportModal v-if="modalCreateReport" v-model="modalCreateReport" :vessel-details="activeVessel" />
    <ViewMonthlyReportModal v-if="modalViewMonthlyReport" v-model="modalViewMonthlyReport"
        :monthReport="seletedMonthlyReport" :vessel-details="activeVessel" />
    <MonthlyReportPDFModal v-if="modalMonthlyReportPDF" v-model="modalMonthlyReportPDF"
        :monthReport="seletedMonthlyReport" :vessel-details="activeVessel" />

</template>
<script>
import AddVesselModal from './mopm-components/AddVesselModal.vue'
import UpdateVesselModal from './mopm-components/UpdateVesselModal.vue'
import Swal from 'sweetalert2'
import apiLink from '@/services/api/apiLink'
import { OnboardTrainingApi } from '@/services/api/onboardTrainingApi'
import { alertError, alertSuccess } from '@/utils/alert'
import CreateMonthlyReportModal from './mopm-components/CreateMonthlyReportModal.vue'
import ViewMonthlyReportModal from './mopm-components/ViewMonthlyReportModal.vue'
import { setCache, getCache, pushCache } from '@/utils/cache.js'
import MonthlyReportPDFModal from './mopm-components/MonthlyReportPDFModal.vue'
export default {
    name: 'MonthlyMonitoringCard',
    props: {
        monthlyMonitoring: Object,
        vesselApplication: Object
    },
    components: {
        AddVesselModal, UpdateVesselModal, CreateMonthlyReportModal, ViewMonthlyReportModal, MonthlyReportPDFModal
    },
    data() {
        return {
            contentLoading: true,
            modalAddVessel: false,
            modalUpdateVessel: false,
            modalCreateReport: false,
            modalViewMonthlyReport: false,
            modalMonthlyReportPDF: false,
            selectVessel: null,
            seletedMonthlyReport: null,
            activeVessel: null,
            seaServiceList: null
        }
    },
    mounted() {
        if (this.monthlyMonitoring) {
            this.seaServiceList = this.monthlyMonitoring?.seaServiceList ?? []
            if (this.seaServiceList) {
                this.selectVessel = this.seaServiceList[0]?.id
                this.activeVessel = this.seaServiceList.find(
                    e => e.id === this.selectVessel
                )
            }
            const cache = getCache('activeOnboardTab')
            if (cache) {
                if (!cache?.vesselID) {
                    pushCache('activeOnboardTab', {
                        vesselID: this.selectVessel,
                        vesselData: this.activeVessel
                    })
                }
                else {
                    this.selectVessel = cache?.vesselID
                    this.activeVessel = cache?.vesselData
                }
                console.log('Have a Cache ' + cache)
            } else {
                console.log('No Cache history')
            }
        }
    },
    methods: {
        openModal(data) {
            if (data === 'add-vessel') {
                this.modalAddVessel = true
            }
            if (data === 'edit-vessel') {
                this.modalUpdateVessel = true
            }
            if (data === 'create-monthly-report') {
                this.modalCreateReport = true
            }
            if (data === 'view-monthly-report') {
                this.modalViewMonthlyReport = true
            }
        },
        viewReportDetails(data) {
            this.openModal('view-monthly-report')
            console.log(data)
            this.seletedMonthlyReport = data
            this.recentOpenReport()
        },
        viewReportPDF(data) {
            this.modalMonthlyReportPDF = true
            this.seletedMonthlyReport = data
            console.log(data.pdfLink)
        },
        changeVessel(data) {
            console.log(data)
            this.selectVessel = data
            this.activeVessel = this.seaServiceList.find(
                e => e.id === this.selectVessel
            )
            pushCache('activeOnboardTab', {
                vesselID: data,
                vesselData: this.activeVessel
            })
        },
        convertDate(date) {
            date = new Date(date)
            const options = {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }
            const formatter = new Intl.DateTimeFormat('en-US', options)
            return formatter.format(date)
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
            }).then(async (result) => {
                if (result.isConfirmed) {
                    this.errors = []
                    try {
                        const formData = new FormData()
                        Object.entries(data).forEach(([key, value]) => {
                            formData.append(key, value)
                        })
                        formData.append('shipboard', this.activeVessel.id)
                        const apiService = new OnboardTrainingApi()
                        const response = await apiService.postForm(
                            formData,
                            url
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
                        alertError(error.response?.data?.message || error.message)
                    } finally {
                        this.$emit('loading', false)
                    }
                }
            })
        },
        recentOpenReport() {
            const cache = getCache('activeOnboardTab')
            if (cache?.vesselID) {
                const data = {
                    report: this.seletedMonthlyReport
                }
                pushCache('activeOnboardTab', data, 60000)
            }
        },
        removeVessel(data) {
            this.confirmAndRemove(
                apiLink.onboardApiLink.removeVesselDetails,
                { vessel: data },
                'The vessel information has been removed.'
            )
        },
        removeMonthlyReport(data) {
            this.confirmAndRemove(
                apiLink.onboardApiLink.removeMonthlyReport,
                { report: data },
                'The Month Report has been removed.'
            )
        }
    }
}
</script>