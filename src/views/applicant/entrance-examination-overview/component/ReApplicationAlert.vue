<template>
    <div class="modal fade show d-block" tabindex="-1" role="dialog">
        <div class="modal-backdrop" @click="closeModal"></div>
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header bg-primary text-white">
                    <h5 class="modal-title text-white fw-bolder">
                        <i class="bi bi-exclamation-triangle-fill"></i> Application Status.
                    </h5>
                </div>
                <div class="modal-body">
                    <p class="text-center">Good day! Your application has <b>expired</b>. Would you like to
                        <b>reactivate </b> it for the
                        <b>upcoming
                            academic year</b>?
                    </p>
                    <form @submit.prevent="submitApplication" method="post">
                        <span class="text-primary fw-bolder">PLEASE SELECT A COURSE</span>
                        <div class="col-md-12 position-relative">
                            <small for="validationTooltip04" class="form-label fw-bolder">COURSE <sup
                                    class="text-danger fw-bolder">*</sup></small>
                            <select class="form-select form-select-sm border border-primary" v-model="course">
                                <option selected="" disabled="" value="">Choose...</option>
                                <option value="1">BS MARINE ENGINEERING</option>
                                <option value="2">BS MARINE TRANSPORTATION </option>
                                <!-- <option value="3">SENIOR HIGHSCHOOL - PRE-BACCALAUREATE MARITIME</option> -->
                            </select>
                        </div>
                        <button class="btn btn-sm btn-primary mt-2 float-end">SUBMIT NOW</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { SHOW_LOADING_MUTATION } from '@/store/storeConstants'
import { mapMutations, mapActions } from 'vuex'
import { SUCCESS_ALERT, INFO_ALERT, ERROR_ALERT, ENCRYPT_DATA } from '@/store/storeAlertConstants.js'
import axios from 'axios'

export default {
    name: 'ReApplicationAlert',
    data() {
        return {
            course: ''
        }
    },
    methods: {
        ...mapActions('alert', {
            successAlert: SUCCESS_ALERT,
            infoAlert: INFO_ALERT,
            errorAlert: ERROR_ALERT,
            encrypt: ENCRYPT_DATA
        }),
        ...mapMutations({
            showLoading: SHOW_LOADING_MUTATION
        }),
        async submitApplication() {
            const formData = {
                course: this.course
            }
            axios.post('applicant/re-application', formData, {
                headers: {
                    Authorization: 'Bearer ' + this.userToken
                }
            }).then((response) => {
                this.showLoading(false)
                this.successAlert(response.data)
                window.location.reload()
                console.log(response)
            }).catch((error) => {
                if (error.response.status === 422) {
                    this.errors = error.response.data.errors
                    error = { message: 'Kindly Fill-up the Required Fields' }
                }
                this.showLoading(false)
                this.errorAlert(error)
            })
        }
    },
    props: { userToken: String }
}
</script>
<style scoped>
/* Black background with z-index: 1 */
.modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    z-index: 1;
}

/* Ensure modal is above the backdrop */
.modal-dialog {
    z-index: 2;
}
</style>