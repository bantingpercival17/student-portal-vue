<template>
    <div v-if="propsEnrollment.enrollment_application">
        <div v-if="propsEnrollment.enrollment_application.is_approved">
            <div v-if="tuitionDetails.tuition_assessment">
                <div v-if="tuitionDetails.payment_transaction" class="complete">
                    <stepper :value="viewName" :isActive="true" :isFinish="true" />
                    <div class="d-inline-block w-100">
                        <h5 class=" mb-1">Congratulations, you are now officially enrolled.</h5>
                    </div>
                </div>
                <div v-else>
                    <stepper :value="viewName" :isActive="false" />
                </div>
            </div>
            <div v-else>
                <stepper :value="viewName" :isActive="false" />
            </div>
        </div>
        <div v-else>
            <stepper :value="viewName" :isActive="false" />
        </div>
    </div>
    <div v-else>
        <stepper :value="viewName" :isActive="false" />
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { SHOW_LOADING_MUTATION } from '@/store/storeConstants'
import stepper from '@/components/main-layouts/components/widgets/stepper-widget.vue'
export default {
    name: 'EnrollmentComplete',
    components: {
        stepper
    },
    data() {
        return {
            viewName: 'STEP 5: ENROLLMENT SUCCESSFULLY COMPLETED',
            errors: []
        }
    },
    methods: {
        ...mapMutations({
            showLoading: SHOW_LOADING_MUTATION
        })
    },
    props: {
        propsEnrollment: Object, tuitionDetails: Object, token: Object
    }
}
</script>