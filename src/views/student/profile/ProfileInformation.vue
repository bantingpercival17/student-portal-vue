<template>
    <div class="card shadow">
        <div class="card-header">
            <div class="header-title">
                <label for="" class="fw-bolder text-primary h4">STUDENT INFORMATION</label>
            </div>
        </div>
        <div class="card-body">
<div class="row">
    <div class="col-md">
        <small class="fw-bolder text-muted">FIRST NAME</small>
        L
    </div>
</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Profile Information',
    methods: {
        displayName(data) {
            const extensionName = data.extention_name.toUpperCase() !== 'N/A' ? ' ' + data.extention_name : ''
            const fullName = data.last_name + extensionName + ', ' + data.first_name + ' ' + data.middle_initial
            return fullName.toUpperCase()
        }
    },
    props: {
        details: Object
    }
}
</script>