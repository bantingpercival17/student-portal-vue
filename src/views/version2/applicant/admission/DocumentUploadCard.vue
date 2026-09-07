<template>
    <div class="card-body p-4">
        <div class="alert alert-warning">Please upload clear copies of all required documents. Max
            file size: 5MB. Accepted formats: JPG, PNG, PDF.</div>
        <ul class="list-group list-group-flush mt-3">
            <li v-for="file in documentList" :key="file.id"
                class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                <div class="me-3">
                    <span class="badge me-2" :class="statusClass(file.status)">{{
                        statusText(file.status) }}</span>
                    {{ file.documentName }}
                    <p v-if="file.status === 2 && file.remarks" class="small text-danger mb-0 mt-1">
                        <strong>Remarks:</strong> {{
                            file.remarks }}
                    </p>
                </div>
                <div class="mt-2 mt-md-0">
                    <div v-if="file.status === 'uploading'" class="spinner-border spinner-border-sm text-warning"
                        role="status"></div>
                    <label v-else-if="file.status === 0 || file.status === 2" class="btn btn-sm btn-golden-yellow">
                        Upload File <input type="file" @change="handleFileUpload($event, file.document_id)" hidden
                            accept=".png,.jpg,.pdf">
                    </label>
                    <div v-else-if="file.status == null" class="">
                        <span class="btn btn-sm btn-primary me-2" @click="openModal(file.document_id)">View</span>
                        <label class="btn btn-sm btn-golden-yellow">
                            Change File <input type="file" @change="handleFileUpload($event, file.document_id)" hidden
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
                    <iframe v-if="!modalDetails.isLoading" :src="modalDetails.file" width="100%" height="700px"
                        frameborder="0"></iframe>
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
import { ApplicantAdmissionApi } from '@/services/api/ApplicantApi/admissionApi'
export default {
    name: 'DocumentCard',
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
        documentList: Object
    },
    methods: {
        async handleFileUpload(event, fileId) {
            const file = event.target.files[0]
            console.log(fileId)
            if (!file) return
            const formData = new FormData()
            formData.append('document', fileId)
            formData.append('file', file)
            console.log(this.documentList)
            const fileDetails = this.documentList
                .find(data => data.document_id === fileId)
            console.log(fileDetails)
            fileDetails.status = 'uploading'
            const admissionApi = new ApplicantAdmissionApi()
            try {
                const response = await admissionApi.uploadDocument(formData)
                console.log(response)
                window.location.reload()
                fileDetails.status = 'uploaded' // success state
            } catch (error) {
                console.log(error)
                fileDetails.status = 'error'
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
            return map[status]
        },
        statusText(status) {
            const map = {
                '000': 'Pending',
                uploading: 'Uploading...',
                error: 'Upload Error',
                null: 'For Verification',
                1: 'Approved',
                2: 'Rejected'
            }
            return map[status]
        },
        openModal(document) {
            this.showModal = true
            const findDocument = this.documentList.find(data => data.document_id === document)
            const convertJson = JSON.parse(findDocument?.link)
            this.modalDetails = {
                isLoading: false,
                link: findDocument ? convertJson[0] : '',
                name: findDocument?.documentName
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
