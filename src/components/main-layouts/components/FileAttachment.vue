<template>
    <div v-if="isLoading" class="loading-section">
        <div class="form-group">
            <p class="loading-spinner">Uploading...</p>
        </div>
    </div>
    <div v-else class="attachment-section">
        <div v-if="DocumentFile?.applicant_requirements_v2" class="have-file">
            <!--  {{ DocumentFile.applicant_requirements_v2 }} -->
            <div v-if="DocumentFile?.applicant_requirements_v2.is_approved === null" class="verification">
                <label for="" class="text-info">This Documents is under Verification</label>
                <span class="badge bg-primary">
                    File Uploaded Date: {{
                        getFormatDate(DocumentFile.applicant_requirements_v2.created_at) }}
                </span>
                <div class="row ">
                    <div class="col-md mt-3">
                        <button class="btn btn-primary btn-sm w-100"
                            @click="setImage(DocumentFile.applicant_requirements_v2)" data-bs-toggle="modal"
                            data-bs-target="#viewFile">VIEW FILE</button>
                    </div>
                    <div class="col-md mt-3">
                        <button class="btn btn-info btn-sm text-white w-100" @click="isReupload = true">CHANGE
                            UPLOAD</button>
                    </div>
                </div>
            </div>
            <div v-else class="verification">
                <div v-if="DocumentFile?.applicant_requirements_v2.is_approved === 1" class="approved">

                </div>
                <div v-else class="disapproved">
                    <button class="btn btn-primary btn-sm w-100"
                        @click="setImage(DocumentFile?.applicant_requirements_v2)" data-bs-toggle="modal"
                        data-bs-target="#viewFile">VIEW FILE</button>
                    <div class="row">
                        <div class="col-md-12">
                            <span class="text-muted">Status: </span>
                            <span class="text-danger fw-bolder">DISAPPROVED DOCUMENT</span>
                            <p class="text-info">
                                <span>Remarks: </span>
                                <span class="fw-bolder">{{ DocumentFile?.applicant_requirements_v2.feedback
                                    }}</span>
                            </p>
                        </div>
                        <div class="col-md">
                            <div class="form-group">
                                <small for="" class="badge bg-secondary me-3">
                                    <span>Verified By: </span>
                                    <span class="fw-bolder">
                                        {{ this.staffName(DocumentFile?.applicant_requirements_v2.staff) }}
                                    </span>
                                </small>
                                <small for="" class="badge bg-secondary">
                                    <span>Verified Date: </span>
                                    <span class="fw-bolder">
                                        {{ getFormatDate(DocumentFile?.applicant_requirements_v2.updated_at) }}
                                    </span>
                                </small>
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <small class="form-label"><b>ATTACH FILES<sup class="text-danger">*</sup></b></small>
                        <div class="form-group">
                            <input type="file" class="form-control form-control-sm border border-primary" multiple
                                accept="image/*,application/pdf" v-on:change="attachFileUpload($event)">
                            <div v-if="errors">
                                <span class="badge bg-danger mt-2" v-if="errors">
                                    {{ errors.file }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else-if="uploadedDocuments" class="uploadedDocument">
            <label for="" class="text-info">This Documents is under Verification</label>
            <span class="badge bg-primary">
                File Uploaded Date: {{
                    getFormatDate(uploadedDocuments.created_at) }}
            </span>
            <div class="row ">
                <div class="col-md mt-3">
                    <button class="btn btn-primary btn-sm w-100" @click="setImage(uploadedDocuments)"
                        data-bs-toggle="modal" data-bs-target="#viewFile">VIEW FILE</button>
                </div>
                <div class="col-md mt-3">
                    <button class="btn btn-info btn-sm text-white w-100" @click="isReupload = true">CHANGE
                        UPLOAD</button>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="form-group">
                <small class="form-label"><b>ATTACH FILES<sup class="text-danger">*</sup></b></small>
                <div class="form-group">
                    <input type="file" class="form-control form-control-sm border border-primary" multiple
                        accept="image/*,application/pdf" v-on:change="attachFileUpload($event)">
                    <div v-if="errors">
                        <span class="badge bg-danger mt-2" v-if="errors">
                            {{ errors.file }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div class="form-group" v-if="isReupload">
            <small class="form-label"><b>ATTACH FILES<sup class="text-danger">*</sup></b></small>
            <div class="form-group">
                <input type="file" class="form-control form-control-sm border border-primary" multiple
                    accept="image/*,application/pdf" v-on:change="attachFileUpload($event)">
                <div v-if="errors">
                    <span class="badge bg-danger mt-2" v-if="errors">
                        {{ errors.file }}
                    </span>
                </div>
            </div>
        </div>
    </div>
    <modal id="viewFile" :tabindex="-1" role="dialog" mainClass="bd-example-modal-xl" ariaLabelled="viewFileLabel"
        dialogClass="modal-lg" :ariaHidden="true" contentrole="document">
        <model-header :dismissable="true">
            <h5 class="modal-title text-primary fw-bolder" id="viewFileScrollableTitle">DOCUMENT PREVIEW
            </h5>
        </model-header>
        <model-body>
            <iframe :src="imageFile" width="100%" h frameborder="0"></iframe>
        </model-body>
        <model-footer>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </model-footer>

    </modal>
</template>
<script>
import axios from 'axios'
import modal from '@/components/bootstrap/modal/modal.vue'
export default {
    name: 'FileAttachment',
    components: {
        modal
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
            console.log(data)
            const convertJson = JSON.parse(data.file_links)
            this.imageFile = convertJson[0]
            console.log(this.imageFile)
        },
        changeUpload() {
            this.isReupload = true
            console.log(this.isReupload)
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