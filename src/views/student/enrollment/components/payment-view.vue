<template>
    <div class="">
        <div class="timeline-dots timeline-dot1 border-secondary  text-success"></div>
        <h5 class="float-left mb-1 text-muted fw-bolder">
            <i>{{ viewName }}</i>
        </h5>
    </div>
</template>
<script>
export default {
    name: 'PaymentView',
    data() {
        return {
            viewName: 'STEP 4: PAYMENT TRANSACTION'
        }
    }
}
</script>