<template>
    <stepper value="" :isActive="className.stepperStatus" />
    <div :class="`card ${className.cardClass}`">
        <div class="card-body m-2 p-2">
            <span :class="`${className.badgeColor} badge float-end`">{{ status }}</span>
            <small class="fw-bolder text-muted">{{ progressName }}</small>
            <h5 :class="`${className.textClass} fw-bolder mb-1`">{{ titleName }}</h5>


        </div>
    </div>
</template>
<script>
import stepper from '@/components/main-layouts/components/widgets/stepper-widget.vue'
export default {
    name: 'DocumentsRequirements',
    components: {
        stepper
    },
    data() {
        let className = { status: 'Pending', cardClass: '', textClass: 'text-muted', stepperStatus: false, badgeColor: 'bg-secondary' }
        if (this.propsApplicantDetails.applicant) {
            className = { status: 'Progress', cardClass: 'bg-soft-info', textClass: 'text-info', stepperStatus: true, badgeColor: 'bg-info' }
        }
        return {
            titleName: 'DOCUMENTARY REQUIREMENTS',
            progressName: 'STEP 2',
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
    props: { propsApplicantDetails: Object }
}
</script>