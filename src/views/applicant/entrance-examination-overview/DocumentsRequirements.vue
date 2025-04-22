<template>
    <stepper value="" :isActive="className.stepperStatus" :isFinish="className.stepperFinish" />
    <div :class="`card ${className.cardClass}`">
        <div class="card-body m-2 p-2">
            <span @click="showContent" :class="`${className.badgeColor} badge float-end`">{{ status }}</span>
            <small class="fw-bolder text-muted">{{ progressName }}</small>
            <h5 @click="showContent" :class="`${className.textClass} fw-bolder mb-1`">{{ titleName }}</h5>
            <!-- Documents List -->
            <div v-if="content" class="document-content p-3">
                <div class="document-list row" v-if="!documents.disqualification">
                    <div class="col-lg-6 col-md-6 mb-4" v-for="(data, index) in documents.listOfDocuments" :key="index">
                        <h5 class="text-primary fw-bolder">
                            {{ data.document_name }}
                        </h5>

                        <FileAttachment :token="token" :DocumentFile="data" />

                    </div>
                </div>
                <div v-else>
                    <p>
                        I regret to inform you that your application has been disqualified due to the following reason:
                        "{{
                            documents.disqualification.remarks }}".
                    </p>
                    <p> We appreciate your interest and effort in applying, and we encourage you to consider reapplying
                        in
                        the future.
                        <br>
                        Thank you for your understanding.
                    </p>
                </div>

            </div>

        </div>
    </div>
</template>
<script>
import FileAttachment from '@/components/main-layouts/components/FileAttachment.vue'
import stepper from '@/components/main-layouts/components/widgets/stepper-widget.vue'
import axios from 'axios'
export default {
    name: 'DocumentsRequirements',
    components: {
        stepper, FileAttachment
    },
    data() {
        let className = { status: 'Pending', cardClass: '', textClass: 'text-muted', stepperStatus: false, stepperFinish: false, badgeColor: 'bg-secondary', contentShow: false }
        if (this.applicantInformation) {
            className = { status: 'Progress', cardClass: 'bg-soft-info', textClass: 'text-info', stepperStatus: true, stepperFinish: false, badgeColor: 'bg-info', contentShow: true }
            if (this.documents.disqualification) {
                className = { status: 'Complete', cardClass: 'bg-soft-primary', textClass: 'text-primary', stepperStatus: true, stepperFinish: true, badgeColor: 'bg-primary', contentBody: false, contentShow: false }
            }
            if (this.documents.approvedDocuments) {
                className = { status: 'Complete', cardClass: 'bg-soft-primary', textClass: 'text-primary', stepperStatus: true, stepperFinish: true, badgeColor: 'bg-primary', contentBody: false, contentShow: false }
            }
        }
        return {
            titleName: 'DOCUMENTARY REQUIREMENTS',
            progressName: 'STEP 2',
            status: className.status,
            className,
            content: className.contentShow,
            form: {
                uploadLoading: [],
                fileError: [],
                fileUploaded: [],
                documentDetails: []
            }
        }
    },
    methods: {
        showContent() {
            if (this.className.status === 'Pending') {
                this.content = false
            }
            else if (this.className.status === 'Progress') {
                this.content = true
            }
            else {
                this.content = !this.content
            }
        },
        handleFileChange(event, documentValue, index) {
            this.form.uploadLoading[index] = true
            this.form.fileError[index] = null
            let fileUpload = event.target.files[0] // Get the Files in Event
            const formData = {
                document: documentValue,
                file: fileUpload
            }
            console.log(formData)
            axios.post('applicant/document-requirement-upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: 'Bearer ' + this.token
                }
            }).then((response) => {
                console.log(response)
                this.form.fileUploaded[index] = true
                fileUpload = ''
            }).catch((error) => {
                console.log(error)
                if (error.response.status === 422) {
                    const err = error.response.data
                    this.form.fileError[index] = err.errors.file[0]
                } else {
                    const err = error.response.data
                    this.form.fileError[index] = err.message
                }
                this.form.uploadLoading[index] = false
            })
        },
        checkFileUpload(id, index) {
            let value = false
            /*  console.log(id) */
            this.documents.documents.forEach(element => {
                if (element.document_id === id) {
                    this.form.documentDetails[index] = element
                    value = true
                }
                /* console.log(element) */
            })
            return value
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
            return data.first_name + ' ' + data.last_name
        }
    },
    props: { applicantInformation: Object, documents: Object, token: String }
}
</script>