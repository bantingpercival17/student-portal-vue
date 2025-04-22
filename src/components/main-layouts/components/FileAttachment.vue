<template>
    <div v-if="isLoading" class="loading-section">
        <div class="form-group">
            <p class="loading-spinner">Uploading...</p>
        </div>
    </div>
    <div v-else class="attachment-section">
        <FileStatus v-if="DocumentFile?.applicant_requirements_v2" :fileData="DocumentFile.applicant_requirements_v2"
            @reupload="changeUpload()" :setImage="setImage(DocumentFile.applicant_requirements_v2)" :status="isReupload"
            @closeUpload="closeUpload()" />

        <FileStatus v-else-if="uploadedDocuments" :fileData="uploadedDocuments" @reupload="changeUpload()"
            :status="isReupload" :setImage="setImage(uploadedDocuments)" @closeUpload="closeUpload()" />

        <FileUpload v-else @upload="attachFileUpload" :errors="errors" />

        <FileUpload v-if="isReupload" @upload="attachFileUpload" :errors="errors" />
        <FileUpload v-if="DocumentFile?.applicant_requirements_v2?.is_approved === 2" @upload="attachFileUpload"
            :errors="errors" />


    </div>
    <modal id="viewFile" :tabindex="-1" role="dialog" mainClass="bd-example-modal-xl" ariaLabelled="viewFileLabel"
        dialogClass="modal-lg" :ariaHidden="true" contentrole="document">
        <model-header :dismissable="true">
            <h5 class="modal-title text-primary fw-bolder" id="viewFileScrollableTitle">DOCUMENT PREVIEW
            </h5>
        </model-header>
        <model-body>
            <iframe :src="imageFile" width="100%" height="700px" frameborder="0"></iframe>
        </model-body>
        <model-footer>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </model-footer>

    </modal>
</template>
<script>
import axios from 'axios'
import modal from '@/components/bootstrap/modal/modal.vue'
import FileUpload from './FileUpload.vue'
import FileStatus from './FileStatus.vue'
export default {
    name: 'FileAttachment',
    components: {
        modal, FileUpload, FileStatus
    },
    data() {
        return { isLoading: false, errors: [], uploadedDocuments: null, imageFile: null, isReupload: false }
    },
    props: { DocumentFile: Object, token: String },
    methods: {
        async attachFileUpload(event) {
            const fileUpload = event.target.files[0] // Get the Files in Event
            const formData = {
                document: this.DocumentFile.id,
                file: fileUpload
            }
            if (this.isReupload) {
                this.isReupload = false
            }
            this.errors = []
            this.isLoading = true
            console.log(formData)
            axios.post('applicant/document-requirement-upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: 'Bearer ' + this.token
                }
            }).then((response) => {
                console.log(response)
                this.isLoading = false
                this.uploadedDocuments = response.data
                window.location.reload()
                // this.documentUploaded = true
            }).catch((error) => {
                console.log(error)
                if (error.response.status === 422) {
                    const err = error.response.data
                    this.errors = { file: err.errors.file[0] }
                    console.log(this.errors)
                } else {
                    const err = error.response.data
                    this.errors = err.message
                }
                this.isLoading = false
            })
        },
        setImage(data) {
            const convertJson = JSON.parse(data.file_links)
            return convertJson[0]
        },
        changeUpload() {
            this.isReupload = true
        },
        closeUpload() {
            this.isReupload = false
        },
        getFormatDate(inputDate) {
            // create a new Date object with the input date string
            const date = new Date(inputDate)
            // define an array of month names
            const monthNames = [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
            ]
            // get the day, month, and year values from the date object
            const day = date.getDate()
            const month = monthNames[date.getMonth()] // add 1 to adjust for 0-indexed months
            const year = date.getFullYear()
            // format the date as 'dd/mm/yyyy'
            const formattedDate = month + ' ' + day + ', ' + year
            return formattedDate
        },
        staffName(data) {
            return data ? data.first_name + ' ' + data.last_name : 'n.a'
        }
    }
}
</script>