<template>
    <div class="card">
        <div class="card-header p-4">
            <h3 class="h4 fw-bold text-dark mb-0">Update Profile</h3>
        </div>
        <div class="card-body p-4">
            <form @submit.prevent="$root.showNotification('Profile updated successfully!', 'success')">
                <h5 class="fw-bold mb-3">Personal Information</h5>
                <div class="row g-3">
                    <div class="col-md-6"><label class="form-label">First Name</label><input type="text"
                            class="form-control" :value="student.firstName"></div>
                    <div class="col-md-6"><label class="form-label">Last Name</label><input type="text"
                            class="form-control" :value="student.lastName"></div>
                    <div class="col-md-6"><label class="form-label">Email Address</label><input type="email"
                            class="form-control" :value="student.email"></div>
                    <div class="col-md-6"><label class="form-label">Phone Number</label><input type="tel"
                            class="form-control" :value="student.phone"></div>
                    <div class="col-12"><label class="form-label">Address</label><input type="text" class="form-control"
                            :value="student.address"></div>
                </div>
                <hr class="my-4">
                <h5 class="fw-bold mb-3">Emergency Contact</h5>
                <div class="row g-3">
                    <div class="col-md-6"><label class="form-label">Full Name</label><input type="text"
                            class="form-control" :value="student.emergencyContact.name"></div>
                    <div class="col-md-6"><label class="form-label">Relation</label><input type="text"
                            class="form-control" :value="student.emergencyContact.relation"></div>
                    <div class="col-md-6"><label class="form-label">Phone Number</label><input type="tel"
                            class="form-control" :value="student.emergencyContact.phone"></div>
                    <div class="col-md-6"><label class="form-label">Address</label><input type="text"
                            class="form-control" :value="student.emergencyContact.address"></div>
                </div>
                <div class="text-end mt-4">
                    <button type="submit" class="btn btn-primary">Save Changes</button>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
export default {
    name: 'StudentProfileViewV2',
    data() {
        return {
            student: {
                firstName: 'John',
                lastName: 'Doe',
                email: '',
                phone: '',
                address: '',
                emergencyContact: {
                    name: '',
                    relation: '',
                    phone: '',
                    address: ''
                }
            }
        }
    }

}
</script>