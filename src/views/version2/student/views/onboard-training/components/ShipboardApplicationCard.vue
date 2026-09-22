<template>
    <form @submit.prevent="submitForm" method="post" enctype="multipart/form-data">
        <div class="form-group">
            <small class="text-muted fw-bolder">SHIPPING COMPANY <span class="text-danger">*</span></small>
            <select v-model="formData.company" class="form-select form-select-sm border border-success"
                v-on:change="fetchVessel">
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
                v-on:change="vesselData">
                <option v-for="data in vesselList" :key="data.id" :value="data.id">
                    {{ data.name }}
                </option>
            </select>
            <span class="badge bg-danger mt-2" v-if="errors['vessel']">{{
                errors['vessel'][0] }}</span>
        </div>
        <div class="form-group">
            <small class="text-muted fw-bolder">VESSEL TYPE <span class="text-danger">*</span></small>
            <select v-model="formData.type" class="form-select form-select-sm border border-success">
                <option v-for="(data, index) in vesselType" :key="index" :value="data">
                    {{ data }}
                </option>
            </select>
            <span class="badge bg-danger mt-2" v-if="errors['type']">{{
                errors['type'][0] }}</span>
        </div>
        <div class="form-group">
            <small class="text-muted fw-bolder">AREA OF DEPLOYMENT <span class="text-danger">*</span></small>
            <select v-model="formData.deployment" class="form-select form-select-sm border border-success">
                <option value="International Shipping">
                    International Shipping
                </option>
                <option value="Domestic Shipping">
                    Domestic Shipping
                </option>
            </select>
            <span class="badge bg-danger mt-2" v-if="errors['deployment']">{{
                errors['deployment'][0] }}</span>
        </div>
        <div class="form-group">
            <small class="text-muted fw-bolder">RANK / POSITION <span class="text-danger">*</span></small>
            <select v-model="formData.rank" class="form-select form-select-sm border border-success">
                <option v-for="(data, index) in positions" :key="index" :value="data">
                    {{ data }}
                </option>
            </select>
            <span class="badge bg-danger mt-2" v-if="errors['rank']">{{
                errors['type'][0] }}</span>
        </div>
        <div class="form-group">
            <small class="text-muted fw-bolder">DATE OF EMBARKATION <span class="text-danger">*</span></small>
            <input type="date" v-model="formData.date" class="form-control form-control border border-success">
            <span class="badge bg-danger mt-2" v-if="errors['date']">{{
                errors['date'][0] }}</span>
        </div>
        <div class="form-group">
            <small class="text-muted fw-bolder">DOCUMENT REQUIREMENTS <span class="text-danger">*</span></small>
            <div class="alert alert-warning">Please upload clear copies of all required documents. Max
                file size: 5MB. Accepted formats: JPG, PNG, PDF.</div>
            <ul class="list-group list-group-flush mt-3">
                <li v-for="(file, indexFile) in documentList" :key="file.id"
                    class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <div class="me-3">
                        {{ file.document_name }} <span class="text-danger">*</span>
                    </div>
                    <div class="mt-2 mt-md-0">
                        <!-- <label class="btn btn-sm btn-golden-yellow">
                            <input type="file" accept=".png,.jpg,.pdf"
                                class="form-control-sm form-control border border-success">
                        </label> -->
                        <input type="hidden" :value="file.id" name="documents">
                        <input type="file" class="form-control border border-success" :name="`file${indexFile}`"
                            accept=".pdf, .png, .jpeg, .jpg" ref="files"
                            @change="handleFileUpload($event.target.files[0], file.document_name.replaceAll(' ', '_').toLowerCase())" />
                        <span class="badge bg-danger mt-2"
                            v-if="errors[file.document_name.toLowerCase().replaceAll(' ', '_')]">{{
                                errors[file.document_name.toLowerCase().replaceAll(' ', '_')][0] }}</span>
                    </div>
                </li>
            </ul>
        </div>
        <div class="form-group">
            <button class="btn btn-success w-100" type="submit">SUBMIT SHIPBOARD APPLICATION</button>
        </div>
    </form>
</template>
<script>
import apiLink from '@/services/api/apiLink'
import { OnboardTrainingApi } from '@/services/api/onboardTrainingApi'
import { alertError, alertSuccess } from '@/utils/alert'

export default {
    name: 'ShipboardApplicationCard',
    props: {
        shippingAgencies: Object,
        vesselType: Object,
        documentList: Object
    },
    data() {
        const formInputData = new FormData()

        return {
            formData: {
                company: '',
                vessel: '',
                type: '',
                deployment: '',
                date: ''
            },
            formInputData,
            vesselList: [],
            files: [],
            errors: [],
            positions: [
                'Deck Cadet',
                'Engine Cadet',
                'Deck Apprentice',
                'Apprentice Engineer',
                'Ordinary Seaman',
                'Able Seafarer Deck',
                'Boatswain',
                'Wiper',
                'Fitter',
                'Oiler',
                'Motorman',
                'Able Seafarer Engine'
            ]
        }
    },
    methods: {
        handleFileUpload(file, type) {
            this.formData[type] = file
        },
        onFileChange(index, id) {
            const file = this.$refs.files[index].files[0]
            this.formInputData.append(id.toString(), file)
        },
        fetchVessel() {
            const company = this.formData.company
            const vessel = this.shippingAgencies.find(item => item.id === company)
            this.vesselList = vessel.vesselList
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
                const apiService = new OnboardTrainingApi()
                const response = await apiService.postForm(
                    formData,
                    apiLink.onboardApiLink.shipboardApplication
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
        }
    }
}
</script>