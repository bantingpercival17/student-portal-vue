<template>
    <stepper value="" :isActive="className.stepperStatus" />
    <div :class="`card ${className.cardClass}`">
        <div class="card-body m-2 p-2">
            <span :class="`${className.badgeColor} badge float-end`">{{ status }}</span>
            <small class="fw-bolder text-muted">{{ progressName }}</small>
            <h5 :class="`${className.textClass} fw-bolder mb-1`">{{ titleName }}</h5>
            <!-- Documents List -->
            <div v-if="className.contentShow" class="document-content p-3 row">
            </div>
        </div>
    </div>
</template>
<script>
import stepper from '@/components/main-layouts/components/widgets/stepper-widget.vue'
import axios from 'axios'
export default {
    name: 'ExaminationPayment',
    components: {
        stepper
    },
    data() {
        let className = { status: 'Pending', cardClass: '', textClass: 'text-muted', stepperStatus: false, badgeColor: 'bg-secondary', contentShow: false }
        if (this.propsApplicantDetails.applicant) {
            className = { status: 'Progress', cardClass: 'bg-soft-info', textClass: 'text-info', stepperStatus: true, badgeColor: 'bg-info', contentShow: false }
        }
        return {
            titleName: 'ENTRANCE EXAMINATION PAYMENT',
            progressName: 'STEP 3',
            status: className.status,
            className,
            content: false
        }
    },
    methods: {
        showContent() {
            this.content = !this.content
        }
    },
    props: { propsApplicantDetails: Object, documents: Object, token: String }
}
</script>