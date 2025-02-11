<template>
    <div class="file-status">
        <label class="text-info">
            {{ fileData.is_approved === null ? "This Document is under Verification" :
                fileData.is_approved === 1 ? "Approved Document" : "Disapproved Document" }}
        </label>
        <div class="float-end">
            <button class="btn btn-primary btn-sm w-100 mb-2" @click="$emit('viewFile')" data-bs-toggle="modal"
                data-bs-target="#viewFile">
                VIEW FILE
            </button>
            <button v-if="!status" class="btn btn-info btn-sm text-white mb-2 w-100" @click="$emit('reupload')">
                CHANGE UPLOAD
            </button>
            <button v-else class="btn btn-danger btn-sm text-white w-100" @click="$emit('closeUpload')">
                CANCEL RE-UPLOAD
            </button>
        </div>
        <br>
        <small class="badge bg-primary">
            File Uploaded Date: {{ getFormatDate(fileData.created_at) }}
        </small>
        <div v-if="fileData.is_approved === 0" class="mt-3">
            <span class="text-danger fw-bolder">DISAPPROVED DOCUMENT</span>
            <p class="text-info"><b>Remarks:</b> {{ fileData.feedback }}</p>

            <div class="form-group">
                <small class="badge bg-secondary me-3">
                    <b>Verified By:</b> {{ staffName(fileData.staff) }}
                </small>
                <small class="badge bg-secondary">
                    <b>Verified Date:</b> {{ getFormatDate(fileData.updated_at) }}
                </small>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FileStatus',
    props: {
        fileData: Object, status: Boolean
    },
    methods: {
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
        staffName(staff) {
            return staff ? staff.name : 'Unknown'
        }
    }
}
</script>