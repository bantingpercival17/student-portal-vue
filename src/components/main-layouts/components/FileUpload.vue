<template>
    <div class="form-group">
        <small class="form-label"><b>ATTACH FILES<sup class="text-danger">*</sup></b></small>
        <input type="file" class="form-control form-control-sm border border-primary" multiple
            accept="image/*,application/pdf" @change="$emit('upload', $event)">
        <div v-if="errors?.file" class="mt-2">
            <span class="badge bg-danger">{{ errors.file }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FileUpload',
    props: {
        errors: Object
    }
}
</script>