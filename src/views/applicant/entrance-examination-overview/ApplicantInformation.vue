<template>
    <stepper value="" :isActive="className.stepperStatus" :isFinish="className.stepperFinish" />
    <div :class="`card ${className.cardClass}`" @click="showContent">
        <div class="card-body m-2 p-2">
            <span :class="`${className.badgeColor} badge float-end`">{{ status }}</span>
            <small class="fw-bolder text-muted">{{ progressName }}</small>
            <h5 :class="`${className.textClass} fw-bolder mb-1`">{{ titleName }}</h5>
            <div v-if="content">
                <div v-if="className.contentBody" class="content-active">
                    <p class="mb-3">
                        Kindly Fill-up the Form for your Additional Information,
                        <router-link class="badge bg-primary" :to="{ name: 'applicant-layout.applicant-information' }">Go to Applicant Information Form</router-link>
                    </p>
                </div>
                <div v-else>
                    <div class="row">
                        <div class="col-md-8">
                            Application Completed, you may now proceed to uploading of Documentary Requirements
                        </div>
                        <div class="col-md">
                            <router-link class="badge bg-primary w-100" :to="{ name: 'applicant-layout.applicant-information' }">Update Application Form</router-link>
                            <a href="{{ route('applicant-form') }}"
                                class="badge border border-primary text-primary w-100">View
                                Application
                                Form</a>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    </div>
</template>
<script>
import stepper from '@/components/main-layouts/components/widgets/stepper-widget.vue'
export default {
    name: 'ApplicantInformation',
    components: {
        stepper
    },
    data() {
        let className = { status: 'Progress', cardClass: 'bg-soft-info', textClass: 'text-info', stepperStatus: true, stepperFinish: false, badgeColor: 'bg-info', contentBody: true, contentShow: true }
        if (this.propsApplicantDetails.applicant) {
            className = { status: 'Complete', cardClass: 'bg-soft-primary', textClass: 'text-primary', stepperStatus: true, stepperFinish: true, badgeColor: 'bg-primary', contentBody: false, contentShow: false }
        }
        return {
            titleName: "APPLICANT'S INFORMATION",
            progressName: 'STEP 1',
            status: className.status,
            className,
            content: className.contentShow
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