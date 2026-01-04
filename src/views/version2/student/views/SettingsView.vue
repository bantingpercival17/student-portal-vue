<template>
    <div class="card">
        <div class="card-header p-4">
            <h3 class="h4 fw-bold text-dark mb-0">Settings</h3>
        </div>
        <div class="card-body p-4">
            <div class="row g-5">
                <div class="col-lg-6">
                    <h5 class="fw-bold mb-3">Change Password</h5>
                    <form @submit.prevent="$root.showNotification('Password updated successfully!', 'success')">
                        <div class="mb-3"><label class="form-label">Current Password</label><input type="password"
                                class="form-control"></div>
                        <div class="mb-3"><label class="form-label">New Password</label><input type="password"
                                class="form-control"></div>
                        <div class="mb-3"><label class="form-label">Confirm New Password</label><input type="password"
                                class="form-control"></div>
                        <button type="submit" class="btn btn-primary">Update Password</button>
                    </form>
                </div>
                <div class="col-lg-6">
                    <h5 class="fw-bold mb-3">Notification Preferences</h5>
                    <div class="form-check form-switch mb-2"><input class="form-check-input" type="checkbox"
                            checked><label class="form-check-label">Email Notifications</label></div>
                    <div class="form-check form-switch mb-2"><input class="form-check-input" type="checkbox"
                            checked><label class="form-check-label">SMS Alerts for Grades</label></div>
                    <div class="form-check form-switch mb-2"><input class="form-check-input" type="checkbox"><label
                            class="form-check-label">Push Notifications</label></div>
                    <button class="btn btn-primary mt-3"
                        @click="$root.showNotification('Preferences saved!', 'success')">Save Preferences</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
/* eslint-disable */
export default {
    name: 'StudentSettingsViewV2',
    methods: {
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