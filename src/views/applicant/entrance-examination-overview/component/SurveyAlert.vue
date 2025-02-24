<template>
    <div class="modal fade show d-block" tabindex="-1" role="dialog">
        <div class="modal-backdrop" @click="closeModal"></div>
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header bg-primary text-white">
                    <h5 class="modal-title text-white fw-bolder">
                        <i class="bi bi-exclamation-triangle-fill"></i> Survey Required
                    </h5>
                </div>
                <div class="modal-body text-center">
                    <p>⚠️ Please complete the <strong>Online Admission Registration System Survey</strong> before
                        proceeding.</p>
                    <a :href="surveyLink" class="btn btn-primary btn-sm text-white">
                        Go to Survey
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SurveyAlert',
    data() {
        return {
            surveyLink: '/#/applicant/survey' // Replace with your actual survey link
        }
    }
}
</script>
<style scoped>
/* Black background with z-index: 1 */
.modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    z-index: 1;
}

/* Ensure modal is above the backdrop */
.modal-dialog {
    z-index: 2;
}
</style>