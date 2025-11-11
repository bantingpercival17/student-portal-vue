<template>
    <div>
        <div class="alert alert-success">Your registration is complete. The information below is for
            review purposes only.</div>
        <form class="row g-3 mt-3">
            <div class="col-md-12">
                <label class="form-label">Full Name</label>
                <input type="text" class="form-control" :value="applicant.name" disabled>
            </div>
            <div class="col-md-6">
                <label class="form-label">Email Address</label>
                <input type="email" class="form-control" :value="applicant.email" disabled>
            </div>
            <div class="col-md-6">
                <label class="form-label">Program Choice</label>
                <input type="text" class="form-control" value="BS in Marine Transportation" disabled>
            </div>
        </form>
    </div>
</template>
<script>
export default {
    name: 'RegistrationCard',
    data() {
        return {
            applicant: {
                email: '',
                name: ''
            }
        }
    }
}
</script>