<template>
    <div class="form-group">
        <label for="example-text-input" class="form-control-label fw-bolder">
            <small>{{ label.toUpperCase() }}<span v-if="required" class="text-danger">*</span></small>
        </label>
        <input :type="type" class="form-control form-control-sm border border-primary" :value="value"
            @input="$emit('update:value', $event.target.value)" :min="type == 'date' && $max ? minYear() : ''"
            :max="type == 'date' && max ? maxYear() : ''" />
        <span class="badge bg-danger mt-2" v-if="error">{{
            error[0] }}</span>
    </div>
</template>
<script>

export default {
    props: {
        type: {
            type: String,
            default: 'text'
        },
        required: {
            type: Boolean,
            default: true
        },
        label: {
            type: String,
            required: true
        },
        value: {
            type: String,
            required: true
        },
        max: {
            type: Boolean,
            default: false
        },
        error: Object
    },
    emits: ['update:value'],
    methods: {
        minYear() {
            const startAge = 22
            const currentDate = new Date()
            // Get the current year
            const currentYear = currentDate.getFullYear()
            return (currentYear - startAge) + '-01-01'
        },
        maxYear() {
            const startAge = 15
            const currentDate = new Date()
            // Get the current year
            const currentYear = currentDate.getFullYear()
            return (currentYear - startAge) + '-12-31'
        }
    }
}
</script>