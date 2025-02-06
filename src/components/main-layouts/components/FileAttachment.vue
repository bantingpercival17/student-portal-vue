<template>
    <div v-if="isLoading" class="loading-section">
        <div class="form-group">
            <p class="document-title">Uploading...</p>
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
            </div>
            <div class="approved">

            </div>
        </div>
        <div v-else>
            <div class="form-group">
                <small class="form-label"><b>ATTACH FILES<sup class="text-danger">*</sup></b></small>
                <div class="form-group">
                    <input type="file" class="form-control form-control-sm border border-primary" multiple
                        accept="image/*,application/pdf" v-on:change="handleFileUpload($event)">
                    <div v-if="errors">
                        <span class="badge bg-danger mt-2" v-if="errors">
                            {{ errors.message }}
                        </span>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
export default {
    name: 'FileAttachment',
    data() {
        return { isLoading: false, errors: [] }
    },
    props: { DocumentFile: Object, token: String },
    methods: {
        attachFile() {

        },
        handleFileUpload(event) {
            const files = Array.from(event.target.files)
            const validFiles = files.filter(file =>
                file.type.startsWith('image/') || file.type === 'application/pdf'
            )

            if (validFiles.length !== files.length) {
                this.errors.files[0] = 'Only image and PDF files are allowed.'
                this.files = ''
            }

            this.files = validFiles
            console.log(validFiles) // Only valid files will be logged
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
        }
    }
}
</script>