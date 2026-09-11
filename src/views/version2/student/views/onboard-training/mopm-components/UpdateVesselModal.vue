<template>
    <div class="modal fade show d-block" tabindex="-1" style="background-color: rgba(0,0,0,0.5);">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content border-0">
                <div class="modal-header bg-success text-white">
                    <h5 class="modal-title fw-bold text-white">
                        <i class="bi bi-ship me-2"></i>UPDATE VESSEL
                    </h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"
                        @click="closeModal"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="submitForm" method="post" enctype="multipart/form-data">
                        <div class="form-group">
                            <small class="text-muted fw-bolder">SHIPPING COMPANY <span
                                    class="text-danger">*</span></small>
                            <select v-model="formData.company" class="form-select form-select-sm border border-success"
                                v-on:change="fetchVessel" required>
                                <option v-for="data in shippingAgencies" :key="data.id" :value="data.id">
                                    {{ data.name }}
                                </option>
                            </select>
                            <span class="badge bg-danger mt-2" v-if="errors['company']">{{
                                errors['company'][0] }}</span>
                        </div>
                        <div class="form-group">
                            <small class="text-muted fw-bolder">VESSEL NAME <span class="text-danger">*</span></small>
                            <select v-model="formData.vessel" class="form-select form-select-sm border border-success"
                                v-on:change="vesselData" required>
                                <option v-for="data in vesselList" :key="data.id" :value="data.id">
                                    {{ data.name }}
                                </option>
                            </select>
                            <span class="badge bg-danger mt-2" v-if="errors['vessel']">{{
                                errors['vessel'][0] }}</span>
                        </div>
                        <div class="form-group">
                            <small class="text-muted fw-bolder">VESSEL TYPE <span class="text-danger">*</span></small>
                            <select v-model="formData.type" class="form-select form-select-sm border border-success"
                                required>
                                <option v-for="(data, index) in vesselDetails?.vesselType" :key="index" :value="data">
                                    {{ data }}
                                </option>
                            </select>
                            <span class="badge bg-danger mt-2" v-if="errors['type']">{{
                                errors['type'][0] }}</span>
                        </div>
                        <div class="form-group">
                            <small class="text-muted fw-bolder">AREA OF DEPLOYMENT <span
                                    class="text-danger">*</span></small>
                            <select v-model="formData.deployment"
                                class="form-select form-select-sm border border-success" required>
                                <option value="INTERNATIONAL SHIPPING">
                                    International Shipping
                                </option>
                                <option value="DOMESTIC SHIPPING">
                                    Domestic Shipping
                                </option>
                            </select>
                            <span class="badge bg-danger mt-2" v-if="errors['deployment']">{{
                                errors['deployment'][0] }}</span>
                        </div>
                        <div class="form-group">
                            <small class="text-muted fw-bolder">DATE OF EMBARKATION <span
                                    class="text-danger">*</span></small>
                            <input type="date" v-model="formData.date"
                                class="form-control form-control border border-success" required>
                            <span class="badge bg-danger mt-2" v-if="errors['date']">{{
                                errors['date'][0] }}</span>
                        </div>
                        <div class="form-group">
                            <small class="text-muted fw-bolder">DATE OF DISEMBARKATION <span
                                    class="text-danger">*</span></small>
                            <input type="date" v-model="formData.dateDisembrakation"
                                class="form-control form-control border border-success" required>
                            <span class="badge bg-danger mt-2" v-if="errors['dateDisembrakation']">{{
                                errors['dateDisembrakation'][0] }}</span>
                        </div>
                        <div class="form-group">
                            <button class="btn btn-success w-100" type="submit">UPDATE VESSEL DETAILS</button>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-outline-danger mt-2 btn-sm w-100" @click="closeModal">Cancel
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import apiLink from '@/services/api/apiLink'
import { OnboardTrainingApi } from '@/services/api/onboardTrainingApi'
import { alertError, alertSuccess } from '@/utils/alert'
export default {
    name: 'UpdateVesselModal',
    props: {
        vesselDetails: Object,
        activeVessel: Object
    },
    mounted() {
        this.fetchVessel()
    },
    data() {
        const formInputData = new FormData()
        const formData = {
            company: '',
            vessel: '',
            type: '',
            deployment: '',
            date: '',
            dateDisembrakation: ''
        }
        if (this.activeVessel) {
            formData.company = this.activeVessel.company_id
            formData.date = this.activeVessel.embarked
            formData.dateDisembrakation = this.activeVessel.disembarked
        }
        return {
            formData,
            formInputData,
            shippingAgencies: this.vesselDetails.shippingAgenciesList,
            vesselType: this.vesselDetails.vesselType,
            documentList: this.vesselDetails.documents,
            vesselList: this.vesselDetails.shippingAgenciesList.find(item => item.id === this.activeVessel.company_id),
            files: [],
            errors: []
        }
    },
    methods: {
        fetchVessel() {
            console.log(this.activeVessel)
            let company = this.formData.company
            // If company is not set, find it using the company name
            if (!this.activeVessel.company_id) {
                const findCompany = this.shippingAgencies.find(
                    item => item.name === this.activeVessel.company_name
                )
                if (!findCompany) {
                    console.warn(
                        'Company not found:',
                        this.activeVessel.company_name
                    )
                    return
                }
                this.formData.company = findCompany.id
                company = findCompany.id
            }
            // Find the selected company/shipping agency
            const companyData = this.shippingAgencies.find(
                item => item.id === company
            )
            if (!companyData) {
                console.warn('Shipping agency not found:', company)
                this.vesselList = []
                return
            }
            this.vesselList = companyData.vesselList || []
            // Find the vessel
            const selectedVessel = this.vesselList.find(
                item => item.name === this.activeVessel.vessel_name
            )
            if (!selectedVessel) {
                console.warn(
                    'Vessel not found:',
                    this.activeVessel.vessel_name
                )
                return
            }
            this.formData.vessel = selectedVessel.id
            this.formData.type = selectedVessel.type
            this.formData.deployment = selectedVessel.areaOfDeployment
        },
        vesselData() {
            const vessel = this.vesselList.find(
                item => item.id === this.formData.vessel
            )
            if (vessel) {
                this.formData.type = vessel.type
                this.formData.deployment = vessel.areaOfDeployment
                console.log(this.formData)
            }
        },
        async submitForm() {
            this.$emit('loading', true)
            this.errors = []
            try {
                const formData = new FormData()
                Object.entries(this.formData).forEach(([key, value]) => {
                    formData.append(key, value)
                })
                formData.append('shipboard', this.activeVessel.id)
                const apiService = new OnboardTrainingApi()
                const response = await apiService.postForm(
                    formData,
                    apiLink.onboardApiLink.updateVesselDetails
                )
                alertSuccess(response.message)
                window.location.reload()
                console.log(response)
            } catch (error) {
                if (error.response?.status === 422) {
                    this.errors = error.response?.data?.errors ?? {}
                }
                alertError(error.response?.data?.message || error.message)
            } finally {
                this.$emit('loading', false)
            }
        },
        closeModal() {
            this.$emit('update:modelValue', false) // Close the modal
        },
        loaderStatus(data) {
            this.contentLoader = data
        }
    }
}
</script>