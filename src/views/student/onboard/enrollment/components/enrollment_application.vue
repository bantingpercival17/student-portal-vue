<template>
    <div v-if="deployment">
        <div v-if="deployment.is_approved">
            <div v-if="enrollment.application">
                <div v-if="enrollment.application.is_approved">
                    <div class="timeline-dots1 border-primary text-primary">
                        <svg width="20" viewBox="0 2 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M7.67 2H16.34C19.73 2 22 4.38 22 7.92V16.091C22 19.62 19.73 22 16.34 22H7.67C4.28 22 2 19.62 2 16.091V7.92C2 4.38 4.28 2 7.67 2ZM11.43 14.99L16.18 10.24C16.52 9.9 16.52 9.35 16.18 9C15.84 8.66 15.28 8.66 14.94 9L10.81 13.13L9.06 11.38C8.72 11.04 8.16 11.04 7.82 11.38C7.48 11.72 7.48 12.27 7.82 12.62L10.2 14.99C10.37 15.16 10.59 15.24 10.81 15.24C11.04 15.24 11.26 15.16 11.43 14.99Z"
                                fill="currentColor"></path>
                        </svg>
                    </div>
                    <h5 class="float-left mb-1 text-primary fw-bolder">
                        {{ viewName }}

                    </h5>
                    <div class="d-inline-block w-100">
                        <p class="mb-3">
                            You can now Proceed to Tuition Assessment
                        </p>
                    </div>

                </div>
                <div v-else>
                    <div class="timeline-dots1 border-info text-info">
                        <svg width="20" viewBox="0 2 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M7.67 2H16.34C19.73 2 22 4.38 22 7.92V16.09C22 19.62 19.73 22 16.34 22H7.67C4.28 22 2 19.62 2 16.09V7.92C2 4.38 4.28 2 7.67 2ZM7.52 13.2C6.86 13.2 6.32 12.66 6.32 12C6.32 11.34 6.86 10.801 7.52 10.801C8.18 10.801 8.72 11.34 8.72 12C8.72 12.66 8.18 13.2 7.52 13.2ZM10.8 12C10.8 12.66 11.34 13.2 12 13.2C12.66 13.2 13.2 12.66 13.2 12C13.2 11.34 12.66 10.801 12 10.801C11.34 10.801 10.8 11.34 10.8 12ZM15.28 12C15.28 12.66 15.82 13.2 16.48 13.2C17.14 13.2 17.67 12.66 17.67 12C17.67 11.34 17.14 10.801 16.48 10.801C15.82 10.801 15.28 11.34 15.28 12Z"
                                fill="currentColor"></path>
                        </svg>
                    </div>
                    <h5 class="float-left mb-1 text-info fw-bolder">
                        {{ viewName }}
                    </h5>
                    <p class="mb-3 mt-1">
                        Registrar's Office verifies your Enrollment Assessment. Make sure you have already submitted the
                        needed
                        requirements of the Registrar's Office.
                    </p>
                </div>
            </div>
            <div v-else>
                <div class="timeline-dots1 border-info text-info">
                    <svg width="20" viewBox="0 2 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M7.67 2H16.34C19.73 2 22 4.38 22 7.92V16.09C22 19.62 19.73 22 16.34 22H7.67C4.28 22 2 19.62 2 16.09V7.92C2 4.38 4.28 2 7.67 2ZM7.52 13.2C6.86 13.2 6.32 12.66 6.32 12C6.32 11.34 6.86 10.801 7.52 10.801C8.18 10.801 8.72 11.34 8.72 12C8.72 12.66 8.18 13.2 7.52 13.2ZM10.8 12C10.8 12.66 11.34 13.2 12 13.2C12.66 13.2 13.2 12.66 13.2 12C13.2 11.34 12.66 10.801 12 10.801C11.34 10.801 10.8 11.34 10.8 12ZM15.28 12C15.28 12.66 15.82 13.2 16.48 13.2C17.14 13.2 17.67 12.66 17.67 12C17.67 11.34 17.14 10.801 16.48 10.801C15.82 10.801 15.28 11.34 15.28 12Z"
                            fill="currentColor"></path>
                    </svg>
                </div>
                <h5 class="float-left mb-1 text-info fw-bolder">
                    {{ viewName }}
                </h5>
                <div class="d-inline-block w-100">
                    <p class="mb-3">
                        Start the Enrollment for School Year <i>
                            {{ schoolYear.school_year }} - {{ schoolYear.semester }}
                        </i>
                    </p>
                    <a @click="onRegister" class="btn btn-sm btn-outline-primary rounded-pill">Enroll Now</a>
                </div>
            </div>

        </div>
        <div v-else>
            <div class="timeline-dots timeline-dot1 border-secondary  text-success"></div>
            <h5 class="float-left text-muted fw-bolder">
                <i>{{ viewName }}</i>
            </h5>
        </div>
    </div>
    <div v-else>
        <div class="timeline-dots timeline-dot1 border-secondary  text-success"></div>
        <h5 class="float-left mb-1 text-muted fw-bolder">
            <i>{{ viewName }}</i>
        </h5>
    </div>
</template>

<script>
import axios from 'axios'
import { SHOW_LOADING_MUTATION } from '@/store/storeConstants'
import { mapMutations } from 'vuex'
import Swal from 'sweetalert2'
export default {
    name: 'EnrolllmentApplication',
    data() {
        let schoolYear = []
        schoolYear = this.enrollment.academic
        return {
            viewName: 'STEP 2: ENROLLMENT APPLICATION',
            schoolYear
        }
    },
    methods: {
        ...mapMutations({
            showLoading: SHOW_LOADING_MUTATION
        }),
        onRegister() {
            this.showLoading(true)
            axios.get('student/onboard/enrollment-application', {
                headers: {
                    Authorization: 'Bearer ' + this.token
                }
            }).then((response) => {
                this.showLoading(false)
                console.log(response.data)
                if (response.status === 200) {
                    this.showAlert(response.data.message)
                    window.location.reload()
                }
                console.log(response)
            }).catch((error) => {
                this.showAlertError(error)
            })
        },
        showAlertError(error) {
            Swal.fire({
                icon: 'error',
                title: error.code,
                text: error.message,
                confirmButtonText: 'OK'
            })
        },
        showAlert(data) {
            // Use sweetalert2
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: data.message,
                confirmButtonText: 'OK'
            })
        }
    },
    props: { deployment: Object, enrollment: Object, token: Object }
}
</script>