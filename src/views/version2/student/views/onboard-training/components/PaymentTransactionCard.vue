<template>
    <h4 class="fw-bold mb-3">Step 4: Payment</h4>
    <p>Please select your preferred payment method for the total amount of
        <strong> ₱ {{ tuitionFeeAssessments?.upon_enrollment.toLocaleString('en-US', {
            minimumFractionDigits: 1
        }) }}
        </strong>.
    </p>
    <PaymentOptionComponents v-show="tuitionFeeAssessments" :assessment="tuitionFeeAssessments?.id ?? null"
        :transactions="paymentOnlineTransactions" />
    <div class="d-flex justify-content-end mt-4">
        <button class="btn btn-secondary me-2" @click="prevStep">Back to Assessment</button>
    </div>
</template>
<script>
import PaymentOptionComponents from '../../payments/PaymentOptionComponents.vue'
export default {
    name: 'PaymentTransactionCard',
    components: { PaymentOptionComponents },
    props: {
        tuitionFeeAssessments: Object,
        paymentOnlineTransactions: Object
    },
    emits: ['loading', 'next-step', 'prev-step'],
    methods: {
        prevStep() {
            this.$emit('prev-step')
        },
        nextStep() {
            this.$emit('next-step')
        }
    }
}
</script>