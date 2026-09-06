<template>
    <div class="modal fade show d-block" tabindex="-1" style="background-color: rgba(0,0,0,0.5);">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content border-0">
                <div class="modal-body p-0">
                    <div class="card">
                        <div class="card-header">
                            <h5 class="card-title">Onboard Information Update </h5>
                        </div>
                        <div class="card-body">
                            <form @submit.prevent="saveProfile">
                                <div class="mb-3">
                                    <small for="srn" class="fw-bolder text-muted">SRN (MISMO ACCOUNT)</small>
                                    <input type="text" class="form-control form-control-sm border border-success"
                                        id="srn" v-model="formData.srn">
                                </div>
                                <div class="mb-3">
                                    <small for="trbNo" class="fw-bolder text-muted">TRB No</small>
                                    <input type="text" class="form-control form-control-sm border border-success"
                                        id="trbNo" v-model="formData.trbNo">
                                </div>
                                <div class="mb-3">
                                    <small for="facebook" class="fw-bolder text-muted">Facebook</small>
                                    <input type="text" class="form-control form-control-sm border border-success"
                                        id="facebook" v-model="formData.facebook">
                                </div>
                                <button type="submit" class="btn btn-success btn-sm w-100">Save Changes</button>
                            </form>
                            <button class="btn btn-outline-danger mt-2 btn-sm w-100" @click="closeModal">Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'EditProfileModal',
    props: {
        profileData: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            formData: { ...this.profileData }
        }
    },
    methods: {
        saveProfile() {
            // Logic to save the profile data
            this.$emit('update:profileData', this.formData)
            this.$emit('update', this.formData)
            this.$emit('update:modelValue', false) // Close the modal
        },
        closeModal() {
            this.$emit('update:modelValue', false) // Close the modal
        }
    }
}
</script>