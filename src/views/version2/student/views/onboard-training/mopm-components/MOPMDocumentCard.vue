<template>
    <div class="">
        <div class="alert alert-warning">Please upload clear copies of all required documents. Max
            file size: 5MB. Accepted formats: JPG, PNG.</div>
        <ul class="list-group list-group-flush mt-3">
            <li v-for="file in documentList" :key="file.id"
                class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                <div class="me-3">
                    <span class="badge me-2" :class="statusClass(file)">{{
                        statusText(file) }}</span>
                    {{ file.documentName }}
                    <p v-if="file.status == 2" class="small text-danger mb-0 mt-1">
                        <strong>Remarks:</strong> {{
                            file.remarks }}
                    </p>
                </div>
                <div class="mt-2 mt-md-0">
                    <template v-if="!file.loadingStatus">
                        <div v-if="file.link.length > 0">
                            <template v-if="file.status === 1">
                                <span class="btn btn-sm btn-success me-2"
                                    @click="openModal(file.document_id)">View</span>
                            </template>
                            <template v-else>
                                <label class="btn btn-sm btn-outline-info">
                                    Change <input type="file" @change="handleFileUpload($event, file)" hidden
                                        accept=".png,.jpg" multiple>
                                </label>
                                <span class="btn btn-sm btn-success ms-2"
                                    @click="openModal(file.document_id)">View</span>
                            </template>
                        </div>
                        <template v-else>
                            <label class="btn btn-sm btn-outline-info">
                                Upload File <input type="file" @change="handleFileUpload($event, file)" hidden
                                    accept=".png,.jpg" multiple>
                            </label>
                        </template>
                    </template>
                    <template v-else>
                        <div class="spinner-border spinner-border-sm text-warning" role="status"></div>
                    </template>
                </div>
            </li>
        </ul>
    </div>

    <div v-if="showModal" class="modal fade show d-block" tabindex="-1" @click.self="closeModal"
        style="background-color: rgba(0,0,0,0.5);">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">

                <div class="modal-header">
                    <h5 class="modal-title">
                        DOCUMENTARY REQUIREMENTS
                    </h5>

                    <button type="button" class="btn-close" @click="closeModal"></button>
                </div>

                <div class="modal-body">

                    <template v-if="!modalDetails.isLoading">

                        <!-- Download all files -->
                        <button class="btn btn-outline-primary btn-sm w-100 mb-3"
                            @click="downloadFile(modalDetails.link)">
                            Download Files
                        </button>

                        <!-- Display PDF -->
                        <iframe v-if="modalDetails.fileType == 'pdf'" :src="modalDetails.link" width="100%"
                            height="700px"></iframe>

                        <!-- Display multiple images -->
                        <div v-else-if="['jpg', 'jpeg', 'png'].includes(modalDetails.fileType)">
                            <div v-for="(image, index) in modalDetails.links" :key="index" class="mb-4">
                                <p class="fw-bold text-muted">
                                    Image {{ index + 1 }}
                                </p>

                                <img :src="image" alt="Document Image" class="img-fluid rounded border"
                                    style="max-height: 700px; width: 100%; object-fit: contain;">
                            </div>
                        </div>

                    </template>

                    <!-- Loading -->
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
                    <button type="button" class="btn btn-outline-secondary" @click="closeModal">
                        Close
                    </button>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
import apiLink from '@/services/api/apiLink'
import { alertError, alertSuccess } from '@/utils/alert'

export default {
    name: 'MOPMDocumentCard',
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
        documentList: Object,
        apiService: Function
    },
    methods: {
        async handleFileUpload(event, document) {
            const files = event.target.files
            if (!files || files.length === 0) return
            const fileDetails = this.documentList
                .find(data => data.id === document.id)
            if (!fileDetails) return
            const formData = new FormData()
            const MAX_FILE_SIZE = 5 * 1024 * 1024 // 10 MB

            Array.from(files).forEach(async file => {
                if (file.size > MAX_FILE_SIZE) {
                    await alertError(`${file.name} exceeds the 5 MB file size limit.`)
                    return
                }
                formData.append('files[]', file)
            })
            fileDetails.loadingStatus = true
            formData.append('shipboard', fileDetails.reportID)
            if (document.documentID !== null) {
                // Update Upload
                formData.append('document', document.id)
            } else {
                // Upload Documents
                formData.append('documentName', document.documentName)
            }
            try {
                const response = await this.apiService.postWithAttachment(
                    formData,
                    apiLink.onboardApiLink.uploadFileMonthlyReport
                )
                await alertSuccess(response.message)
                console.log('Upload response:', response)
                setInterval(function () {
                    window.location.reload()
                }, 1000)
            } catch (error) {
                console.log(error)
                await alertError(error)
            } finally {
                fileDetails.loadingStatus = false
            }
        },
        statusClass(data) {
            const status = data.status
            if (data.link.length > 0) {
                const map = {
                    uploading: 'bg-primary-subtle text-primary-emphasis',
                    error: 'bg-danger-subtle text-danger-emphasis',
                    null: 'bg-info-subtle text-info-emphasis',
                    1: 'bg-success-subtle text-success-emphasis',
                    2: 'bg-danger-subtle text-danger-emphasis'
                }
                return map[status]
            }
            return 'bg-primary-subtle'
        },
        statusText(data) {
            const status = data.status
            if (data.link.length > 0) {
                const map = {
                    uploading: 'Uploading...',
                    error: 'Upload Error',
                    null: 'For Verification',
                    1: 'Approved',
                    2: 'Rejected'
                }
                return map[status]
            }
            return 'Attach File'
        },
        /* openModal(document) {
            this.showModal = true
            const findDocument = this.documentList.find(data => data.document_id === document)
            console.log(findDocument.link)
            this.modalDetails = {
                isLoading: false,
                link: findDocument?.link || '',
                name: findDocument?.documentName,
                fileType: findDocument?.link
                    ? findDocument.link.split('.').pop().toLowerCase()
                    : ''
            }
            console.log(this.modalDetails)
        }, */
        openModal(file) {
            this.modalDetails.isLoading = true
            this.showModal = true

            try {
                let links = file.link

                // Convert JSON string into an array
                if (typeof links === 'string') {
                    links = JSON.parse(links)
                }

                // Ensure it is an array
                if (!Array.isArray(links)) {
                    links = [links]
                }

                this.modalDetails.links = links.filter(
                    link => typeof link === 'string' && link.trim() !== ''
                )

                this.modalDetails.link = this.modalDetails.links[0] || ''

                // Detect file type using the first file
                const firstFile = this.modalDetails.link
                    .split('?')[0]
                    .split('/')
                    .pop()

                this.modalDetails.fileType = firstFile
                    ? firstFile.split('.').pop().toLowerCase()
                    : ''
            } catch (error) {
                console.error('Error parsing file links:', error)

                this.modalDetails.links = []
                this.modalDetails.link = ''
                this.modalDetails.fileType = ''
            } finally {
                this.modalDetails.isLoading = false
            }
        },
        closeModal() {
            this.showModal = false
            this.modalDetails = {
                isLoading: true,
                link: null,
                name: null
            }
        },
        async downloadFile(url) {
            try {
                const response = await fetch(url)
                const blob = await response.blob()

                // Get filename from URL
                const fileName = url.split('/').pop().split('?')[0]

                // Create a temporary URL for the blob
                const blobUrl = window.URL.createObjectURL(blob)

                // Create a link and click it
                const link = document.createElement('a')
                link.href = blobUrl
                link.download = fileName
                document.body.appendChild(link)
                link.click()

                // Cleanup
                /* document.body.removeChild(link)
                window.URL.revokeObjectURL(blobUrl) */
            } catch (error) {
                console.error('Download failed:', error)
            }
        }
    }
}
</script>
