<template>
    <div class="row">
        <div class="form-group col-md-5 col-xs-12">
            <small class="text-muted fw-bold">SHIPPING COMPANY </small>
            <label for="" class="form-control border border-success fw-bolder text-success">
                {{ information.company_name }}
            </label>
        </div>
        <div class="form-group col-md col-xs-12">
            <small class="text-muted fw-bold">VESSEL NAME </small>
            <label for="" class="form-control border border-success fw-bolder text-success">
                {{ information.vessel_name }}
            </label>
        </div>
        <div class="form-group col-md col-xs-12">
            <small class="text-muted fw-bold">VESSEL TYPE </small>
            <label for="" class="form-control border border-success fw-bolder text-success">
                {{ information.vessel_type }}
            </label>
        </div>
    </div>
    <div class="row">
        <div class="form-group col-md-5 col-xs-12">
            <small class="text-muted fw-bold">AREA OF DEPLOYMENT </small>
            <label for="" class="form-control border border-success fw-bolder text-success">
                {{ information.shipping_company }}
            </label>
        </div>
        <div class="form-group col-md col-xs-12">
            <small class="text-muted fw-bold">SBT BATCH </small>
            <label for="" class="form-control border border-success fw-bolder text-success">
                {{ information.sbt_batch }}
            </label>
        </div>
    </div>
    <div class="row">
        <div class="form-group col-md col-xs-12">
            <small class="text-muted fw-bold">ONBOARD STATUS </small>
            <label for="" class="form-control border border-success fw-bolder text-success">
                {{ information.shipboard_status }}
            </label>
        </div>
        <div class="form-group col-md col-xs-12">
            <small class="text-muted fw-bold">DATE OF EMBARKING </small>
            <label for="" class="form-control border border-success fw-bolder text-success">
                {{ formatDate(information.embarked) }}
            </label>
        </div>
        <div v-show="information.disembarked" class="form-group col-md col-xs-12">
            <small class="text-muted fw-bold">DATE OF DISEMBARKING </small>
            <label for="" class="form-control border border-success fw-bolder text-success">
                {{ formatDate(information.disembarked) }}
            </label>
        </div>
    </div>
    <div v-show="isDocumentShow" class="form-group">
        <small class="text-muted fw-bolder">DOCUMENT REQUIREMENTS <span class="text-danger">*</span></small>
        <div class="alert alert-warning">Please upload clear copies of all required documents. Max
            file size: 5MB. Accepted formats: JPG, PNG, PDF.</div>
        <ul class="list-group list-group-flush mt-3">
            <li v-for="file in documentList" :key="file.id"
                class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                <div class="me-3">
                    <span class="badge me-2" :class="statusClass(file.uploadedFile)">
                        {{ statusText(file.uploadedFile) }}
                    </span>
                    {{ file.document_name }}
                    <p v-if="file.uploadedFile?.status === 2 && file.uploadedFile?.remarks"
                        class="small text-danger mb-0 mt-1">
                        <strong>Remarks:</strong> {{
                            file.remarks }}
                    </p>
                </div>
                <div class="mt-2 mt-md-0">
                    <div v-if="file.uploadedFile?.document_status === 'uploading'"
                        class="spinner-border spinner-border-sm text-warning" role="document_status">
                    </div>
                    <label v-else-if="file.uploadedFile?.document_status === 0 || file.uploadedFile?.document_status === 2 || file.uploadedFile?.document_status === '000' ||
                        file.uploadedFile?.document_status === 'error'" class="btn btn-sm btn-outline-info">
                        Upload File <input type="file" @change="handleFileUpload($event, file.id)" hidden
                            accept=".png,.jpg,.pdf">
                    </label>
                    <div v-else-if="file.uploadedFile?.document_status == null" class="">
                        <span class="btn btn-sm btn-success me-2" @click="openModal(file.id)">View</span>
                        <label class="btn btn-sm btn-outline-warning">
                            Change File <input type="file" @change="handleFileUpload($event, file.id)" hidden
                                accept=".png,.jpg,.pdf">
                        </label>
                    </div>
                    <span v-else class="small text-muted">{{ file.file }}</span>
                </div>
            </li>
        </ul>
    </div>
    <div v-if="showModal" class="modal fade show d-block" tabindex="-1" @click.self="closeModal"
        style="background-color: rgba(0,0,0,0.5);">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">DOCUMENTARY REQUIREMENTS</h5>
                    <button type="button" class="btn-close" @click="closeModal"></button>
                </div>
                <div class="modal-body">
                    <template v-if="!modalDetails.isLoading">
                        <button class="btn btn-outline-primary btn-sm w-100 mb-3"
                            @click="downloadFile(modalDetails.link)">
                            Download File
                        </button>
                        <iframe v-if="modalDetails.fileType == 'pdf'" :src="modalDetails.link" width="100%"
                            height="700px"></iframe>
                        <img v-else-if="['jpg', 'jpeg', 'png'].includes(modalDetails.fileType)" :src="modalDetails.link"
                            alt="Document Image" class="img-fluid">
                    </template>
                    <template v-else>
                        <div class="page-loader text-center">
                            <div class="card">
                                <div class="card-body align-center text-center">
                                    <div class="enrollment-loader"></div>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" @click="closeModal">Close</button>
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
    name: 'ShipboardInformationCard',
    data() {
        return {
            showModal: false,
            modalDetails: {
                isLoading: true,
                link: null,
                name: null
            }
        }
    },
    props: {
        information: Object,
        isDocumentShow: {
            type: Boolean,
            default: false
        },
        documentList: Object
    },
    methods: {
        formatDate(dateString) {
            const date = new Date(dateString)
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: '2-digit'
            })
        },
        async handleFileUpload(event, fileId) {
            const file = event.target.files[0]
            const fileDetails = this.documentList
                .find(data => data.id === fileId)
            if (!file) return
            const formData = new FormData()
            formData.append('document', fileId)
            formData.append('file', file)
            formData.append('documentUpload', fileDetails.uploadedFile.id)
            fileDetails.uploadedFile.document_status = 'uploading'
            console.log(fileDetails)
            try {
                const apiService = new OnboardTrainingApi()
                console.log(apiLink.onboardApiLink.changeUploadDocument)
                const response = await apiService.postForm(
                    formData,
                    apiLink.onboardApiLink.changeUploadDocument
                )
                alertSuccess(response.message)
                fileDetails.uploadedFile.document_status = null// success state
                window.location.reload()
            } catch (error) {
                console.log(error)
                await alertError(error)
                fileDetails.uploadedFile.document_status = 'error'
            }
        },
        statusClass(status) {
            const map = {
                '000': 'bg-secondary-subtle',
                uploading: 'bg-primary-subtle text-primary-emphasis',
                error: 'bg-danger-subtle text-danger-emphasis',
                null: 'bg-info-subtle text-info-emphasis',
                1: 'bg-success-subtle text-success-emphasis',
                2: 'bg-danger-subtle text-danger-emphasis'
            }
            return map[status?.document_status]
        },
        statusText(status) {
            const map = {
                '000': 'Attach File',
                uploading: 'Uploading...',
                error: 'Upload Error',
                null: 'For Verification',
                1: 'Approved',
                2: 'Rejected'
            }
            return map[status?.document_status]
        },
        openModal(document) {
            this.showModal = true
            const findDocument = this.documentList.find(data => data.id === document)
            this.modalDetails = {
                isLoading: false,
                link: findDocument.uploadedFile?.file_path || '',
                name: findDocument.uploadedFile?.documentName,
                fileType: findDocument.uploadedFile?.document_path
                    ? findDocument.uploadedFile?.document_path.split('.').pop().toLowerCase()
                    : ''
            }
            console.log(this.modalDetails)
        },
        closeModal() {
            this.showModal = false
            this.modalDetails = {
                isLoading: true,
                link: null,
                name: null
            }
        }
    }
}
</script>