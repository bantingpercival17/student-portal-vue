<template>
    <div class="file-status row">
        <div class="col-lg col-md-12 mb-2">
            <div v-if="fileData.is_approved === 2" class="mt-3">
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
            <div v-else>
                <label class="fw-bolder text-info">
                    {{ fileData.is_approved === null ? "This Document is under Verification" :
                        fileData.is_approved === 1 ? "APPROVED DOCUMENT" : "Disapproved Document" }}
                </label>
                <div v-if="fileData.is_approved === 1">
                    <div class="form-group">
                        <small class="badge bg-secondary me-3">
                            <b>Verified By:</b> {{ staffName(fileData.staff) }}
                        </small>
                        <small class="badge bg-secondary">
                            <b>Verified Date:</b> {{ getFormatDate(fileData.updated_at) }}
                        </small>
                    </div>
                </div>
                <small class="badge bg-primary">
                    File Uploaded Date: {{ getFormatDate(fileData.created_at) }}
                </small>
            </div>
        </div>
        <div class="col-lg-4 col-md-12">
            <a class="badge bg-primary w-100 mb-2" @click="showModal = true">
                VIEW FILE
            </a>
            <div v-if="fileData.is_approved !== 2 && fileData.is_approved !== 1">
                <a v-if="!status" class="badge bg-info mb-2 w-100" @click="$emit('reupload')">
                    CHANGE UPLOAD
                </a>
                <a v-else class="badge bg-danger text-white w-100" @click="$emit('closeUpload')">
                    CANCEL RE-UPLOAD
                </a>
            </div>
        </div>

    </div>
    <div class="modal-viewer">
        <div v-if="showModal" class="modal fade show d-block" tabindex="-1" role="dialog"
            aria-labelledby="viewFileLabel" aria-modal="true">
            <div class="modal-dialog modal-xl modal-lg" role="document">
                <div class="modal-content">
                    <!-- Header -->
                    <div class="modal-header">
                        <h5 class="modal-title text-primary fw-bolder" id="viewFileLabel">DOCUMENT PREVIEW</h5>
                        <button type="button" class="btn-close" @click="showModal = false"></button>
                    </div>

                    <!-- Body -->
                    <div class="modal-body">
                        <img v-if="setImage" :src="setImage" alt="Modal Image" class="modal-image" />
                        <!--  <iframe v-if="setImage" :src="setImage" width="100%" height="700px" frameborder="0"></iframe> -->
                        <label v-else class="text-info fw-bolder">Wait to Load Image</label>
                    </div>

                    <!-- Footer -->
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="showModal = false">Close</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Backdrop -->
        <div v-if="showModal" class="modal-backdrop fade show"></div>
    </div>
</template>
<style>
.modal-image {
    width: 100%;
    height: auto;
    object-fit: contain;
    /* Ensures the image fits without distorting */
}
</style>
<script>
export default {
    name: 'FileStatus',
    props: {
        fileData: Object, status: Boolean, setImage: String
    },
    data() {
        return {
            showModal: false
        }
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
        staffName(data) {
            return data ? data.first_name + ' ' + data.last_name : 'n.a'
        }
    }
}
</script>