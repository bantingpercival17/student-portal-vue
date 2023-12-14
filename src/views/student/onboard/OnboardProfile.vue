<template>
    <div v-if="isLoading">
        <LoadingView />
    </div>
    <div v-else>
        <div class="card ms-5 me-5" data-iq-gsap="onStart" data-iq-position-y="70" data-iq-rotate="0"
            data-iq-trigger="scroll" data-iq-ease="power.out" data-iq-opacity="0">
            <div class="card-header">
                <div class="header-title">
                    <h4 class="card-title fw-bold text-primary">OBT INFORMATION SHEET</h4>
                </div>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-lg-4 col-md-12">
                        <inputComponentV2 label="student number" type="text" v-model:value="fullName"
                            :error="errors.birth_date" />
                    </div>
                    <div class="col-lg-8 col-md-12">
                        <inputComponentV2 label="course" type="text" v-model:value="fullName" :error="errors.birth_date" />
                    </div>
                    <div class="col-lg-12 col-md-12">
                        <inputComponentV2 label="full name" type="text" v-model:value="fullName"
                            :error="errors.birth_date" />
                    </div>
                    <div class="col-lg-4 col-md-12">
                        <inputComponentV2 label="date of birth" type="date" v-model:value="fullName"
                            :error="errors.birth_date" />
                    </div>
                    <div class="col-lg-4 col-md-12">
                        <inputComponentV2 label="email" type="text" v-model:value="fullName" :error="errors.birth_date" />
                    </div>
                    <div class="col-lg-4 col-md-12">
                        <inputComponentV2 label="contact number" type="text" v-model:value="fullName"
                            :error="errors.birth_date" />
                    </div>
                    <div class="col-lg-6 col-md-12">
                        <inputComponentV2 label="Facebook account link" type="text" v-model:value="fullName"
                            :error="errors.birth_date" />
                    </div>
                    <div class="col-lg-6 col-md-12">
                        <inputComponentV2 label="Mismo account" type="text" v-model:value="fullName"
                            :error="errors.birth_date" />
                            <small class="text-warning fw-bolder">
                            If don't have a Mismo Account, Please register on this Link <a href="https://online-appointment.marina.gov.ph/register-new">Register Now</a>
                            </small>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { GET_USER_TOKEN, IS_USER_AUTHENTICATE_GETTER } from '@/store/storeConstants'

import inputComponentV2 from '@/components/main-layouts/components/widgets/input-component-v2.vue'
import { mapGetters } from 'vuex'
import axios from 'axios'
export default {
    name: 'OnboardTrainingStudentProfile',
    components: {
        inputComponentV2
    },
    data() {
        return {
            isLoading: false,
            fullName: '',
            errors: [],
            form: {
                uploadLoading: [],
                fileError: [],
                fileUploaded: [],
                documentDetails: []
            }
        }
    },
    computed: {
        ...mapGetters('auth', {
            token: GET_USER_TOKEN,
            isAuth: IS_USER_AUTHENTICATE_GETTER
        })
    },
    mounted() {
        axios.get('student/onboard/pre-onboard', {
            headers: {
                Authorization: 'Bearer ' + this.token
            }
        }).then((response) => {
            this.documentLists = response.data.document_requirements
            this.onboardRequirements = response.data.onboard_requirements
            console.log(this.documentLists)
            this.isLoading = false
        }).catch((error) => {
            console.log(error)
            this.isLoading = false
        })
    },
    methods: {
        handleFileChange(event, documentValue, index) {
            this.form.uploadLoading[index] = true
            this.form.fileError[index] = null
            let fileUpload = event.target.files[0] // Get the Files in Event
            const formData = {
                document: documentValue,
                file: fileUpload
            }
            console.log(formData)
            axios.post('student/onboard/pre-onboard', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: 'Bearer ' + this.token
                }
            }).then((response) => {
                console.log(response)
                this.form.fileUploaded[index] = true
                fileUpload = ''
            }).catch((error) => {
                console.log(error)
                if (error.response.status === 422) {
                    const err = error.response.data
                    this.form.fileError[index] = err.errors.file[0]
                } else {
                    const err = error.response.data
                    this.form.fileError[index] = err.message
                }
                this.form.uploadLoading[index] = false
            })
        },
        checkFileUpload(id, index) {
            let value = false
            /*  console.log(id) */
            this.onboardRequirements.forEach(element => {
                if (element.document_id === id) {
                    this.form.documentDetails[index] = element
                    value = true
                }
            })
            return value
        },
        getFormatDate(inputDate) {
            // create a new Date object with the input date string
            const date = new Date(inputDate)
            // define an array of month names
            const monthNames = [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
            ]
            // get the day, month, and year values from the date object
            const day = date.getDate()
            const month = monthNames[date.getMonth()] // add 1 to adjust for 0-indexed months
            const year = date.getFullYear()
            // format the date as 'dd/mm/yyyy'
            const formattedDate = month + ' ' + day + ', ' + year
            return formattedDate
        },
        staffName(data) {
            return data != null ? data.first_name + ' ' + data.last_name : ''
        }
    }
}
</script>