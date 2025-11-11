<template>
    <div class="settings-view">
        <div class="container py-5">
            <div class="card shadow-sm border-0 mb-4">
                <div class="card-body p-4">
                    <h3 class="fw-semibold fs-5 mb-4">Change Registered Email</h3>
                    <form @submit.prevent="changeEmail" class="row g-3">
                        <div class="col-md-6">
                            <label class="form-label">Current Email</label>
                            <input type="email" class="form-control form-control-sm border border-primary" :value="applicant.email"
                                disabled>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">New Email</label>
                            <input type="email" class="form-control form-control-sm border border-primary" required>
                        </div>
                        <div class="col-12">
                            <button class="btn btn-primary">Save New Email</button>
                        </div>
                    </form>
                </div>
            </div>
            <div class="card shadow-sm border-0">
                <div class="card-body p-4">
                    <h3 class="fw-semibold fs-5 mb-4">Change Password</h3>
                    <form @submit.prevent="changePassword" class="row g-3">
                        <div class="col-md-4">
                            <label class="form-label">Current Password</label>
                            <input type="password" class="form-control form-control-sm border border-primary" required>
                        </div>
                        <div class="col-md-4">
                            <label class="form-label">New Password</label>
                            <input type="password" class="form-control form-control-sm border border-primary" required>
                        </div>
                        <div class="col-md-4">
                            <label class="form-label">Confirm New Password</label>
                            <input type="password" class="form-control form-control-sm border border-primary" required>
                        </div>
                        <div class="col-12">
                            <button class="btn btn-primary">Change Password</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
/* eslint-disable */
export default {
    name: 'SettingsView',
    data() {
        return {
            applicant: {
                id: 'APP123456',
                email: ''
            }
        }
    }, methods: {
        changeEmail() {
            // Logic to change email
            alert('Email change functionality is not implemented yet.')
        },
        changePassword() {
            // Logic to change password
            alert('Password change functionality is not implemented yet.')
        }
    }
}
</script>