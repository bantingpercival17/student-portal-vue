<template>
    <div class="text-center p-5">
        <i data-feather="award" class="text-success mb-3" style="width: 64px; height: 64px;"></i>
        <h4 class="fw-bold">Enrollment Complete!</h4>
        <p class="text-muted">Congratulations, you are officially enrolled for {{ academic() }}. You can now
            download your Certificate of Enrollment.</p>
        <button class="btn btn-success mt-3 d-flex align-items-center mx-auto" @click="downloadCertificate">
            <i data-feather="download" class="me-2"></i>Download Certificate
        </button>
    </div>
</template>
<script>
export default {
    name: 'CompleteEnrollmentCard',
    props: {
        enrollment: Object
    },
    methods: {
        academic() {
            return this.enrollment.currentEnrollmentAssessment.schoolYear
        },
        downloadCertificate() {
            console.log('donwload')
        }
    }
}
</script>