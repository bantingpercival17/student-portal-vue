<template>
    <div class="modal fade show d-block" tabindex="-1" style="background-color: rgba(0,0,0,0.5);">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content border-0">
                <div class="modal-header bg-success text-white py-3 px-4">
                    <div class="d-flex align-items-center gap-3">
                        <i class="bi bi-file-earmark-text fs-3 text-warning"></i>
                        <div>
                            <h5 class="modal-title fw-bold text-white mb-0">MONTHLY MONITORING REPORT VIEW</h5>
                            <span class="small text-white-50">{{ vesselDetails?.vessel_name }} - {{ monthReport?.month
                            }}
                            </span>
                        </div>
                    </div>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"
                        @click="closeModal"></button>
                </div>
                <div class="card-body p-0">
                    <iframe v-if="fileLink" :src="fileLink" width="100%" height="700px"></iframe>
                    <label v-else for="">LOADING</label>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.spinner-border {
    width: 100px;
    height: 100px;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
</style>
<script>
export default {
    name: 'MonthlyReportPDFModal',
    props: {
        vesselDetails: Object,
        monthReport: Object
    },
    data() {
        return {
            fileLink: this.monthReport?.pdfLink
        }
    },
    methods: {
        closeModal() {
            this.$emit('update:modelValue', false) // Close the modal
        }
    }
}
</script>