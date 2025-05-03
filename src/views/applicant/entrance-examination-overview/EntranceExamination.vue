<template>
    <stepper value="" :isActive="className.stepperStatus" :isFinish="className.stepperFinish" />
    <div :class="`card ${className.cardClass}`" @click="showContent">
        <div class="card-body m-2 p-2">
            <span :class="`${className.badgeColor} badge float-end`">{{ status }}</span>
            <small class="fw-bolder text-muted">{{ progressName }}</small>
            <h5 :class="`${className.textClass} fw-bolder mb-1`">{{ titleName }}</h5>
            <!-- Documents List -->
            <div v-if="content" class="document-content p-3 row">
                <div v-if="alumnia">
                    <label for="" class="fw-bolder">Senior Highschool Alumnia</label>
                </div>
                <div v-else>
                    <div v-if="examination.examinationDetails" class="examination-view">
                        <div v-if="examination.examinationDetails.is_finish" class="examination-form-and-instruction">
                            <div v-if="application.course_id === 3">
                                Wait for the Examination Result
                            </div>
                            <div v-else>
                                Wait for the announcement of the entrance examination results.
                                <!-- <p v-if="examination.finalResult.result" class="mb-3 fw-bolder text-primary h4">
                                    Congratulations! You have passed the qualifying examination.
                                </p>
                                <p v-else class="mb-3 fw-bolder text-info h4">
                                    Wiat for the annoument
                                    We regret to
                                    inform you that you did not meet the required test score in the entrance
                                    examination.
                                </p>
                                <div class="card">
                                    <div class="card-body">
                                        <label for="" class="fw-bolder text-info h5">EXAMINATION RESULT</label>
                                        <table class="table">
                                            <thead>
                                                <tr>
                                                    <th>CATEGORY</th>
                                                    <th>SCORE</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(data, index) in examination.examinationResult" :key="index">
                                                    <td v-if="data.examinationCategory !== 'Essay'">{{
        data.examinationCategory
    }}
                                                    </td>
                                                    <td v-if="data.examinationCategory !== 'Essay'"><span
                                                            class="fw-bolder text-primary h5">{{ data.score }}</span>
                                                        <span class="text-muted fw-bolder">/{{ data.totalItems }}</span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <th>TOTAL SCORE: </th>
                                                    <td>
                                                        <span class="fw-bolder text-primary h5">
                                                            {{ examination.finalResult.score }}
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>EXAMINATION PERCENTAGE:</th>
                                                    <td> <span class="fw-bolder text-primary h5">{{
            examination.finalResult[1]
        }}</span></td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div> -->
                            </div>
                        </div>
                        <div v-else>
                            <div v-if="!examination.examinationSchedule">
                                <!-- <div class="card">
                                <div class="card-body">
                                    <form @submit.prevent="storeScheduleExam" method="post">
                                        <label for="" class="fw-bolder h5 text-primary">Please select your preferred
                                            examination schedule.</label>
                                        <div class="row">
                                            <div class="col-md">
                                                <selectComponent label="Select Schedule" v-model:value="schedule"
                                                    :error="errors.schedule" :data="scheduledList" />
                                            </div>

                                            <div class="col-md">
                                                <inputComponentV2 type='time' label="Select Time"
                                                    v-model:value="scheduleTime" :error="errors.schedule_time" />
                                            </div>
                                            <div class="col-md">
                                                <button type="submit" class="btn btn-primary ">Submit Schedule</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div> -->
                            </div>
                            <div v-else>
                                <div v-if="checkSchedule(examination.examinationSchedule) == 1">
                                    <div class="card">
                                        <div class="card-body">
                                            <p> <span class="fw-bolder">INSTRUCTION</span></p>
                                            <p class="m-0">1. Ensure that you have a strong internet connection.</p>
                                            <p class="m-0">2. Once you are logged in, read carefully and understand the
                                                guidelines
                                                before
                                                and
                                                after Examination</p>
                                            <p class="m-0">3. Upon completion of the Examination, click the Submit or
                                                Back
                                                button at
                                                the
                                                system.</p>
                                            <p class="m-0">4. When you enter the examination code, your examiantion will
                                                begin.
                                            </p>
                                            <p>5.We recommend using Laptop/Desktop running atleast Windows 7 or higher
                                                to
                                                take
                                                the
                                                examination.
                                                We also recommend to use Google Chrome as browser in taking the
                                                examination.
                                            </p>
                                            <br>
                                        </div>
                                    </div>
                                    <form @submit.prevent="submitExaminationCode" method="post">
                                        <div class="form-group">
                                            <small class="fw-bolder">EXAMINATION CODE</small> <br>
                                            <label for="" class="form-label text-primary fw-bolder">
                                                {{ examination.examinationDetails ?
                                                    examination.examinationDetails.examination_code
                                                    : ''
                                                }}
                                            </label>
                                            <div class="row">
                                                <div class="col-md">
                                                    <input type="text" class="form-control border border-primary"
                                                        v-model="examinationCode" placeholder="Enter Examination Code">
                                                    <span class="badge bg-danger mt-2" v-if="errors.examination">{{
                                                        errors.examination[0] }}</span>
                                                </div>
                                                <div class="col-md">
                                                    <button type="submit" class="btn btn-primary ">Proceed to
                                                        Examination</button>
                                                </div>

                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div v-else-if="checkSchedule(examination.examinationSchedule) == 0">
                                    <p>
                                        Your examination has been forfeited. Please contact the registrar's office if
                                        you wish to reschedule the exam.
                                    </p>
                                </div>
                                <div v-else>
                                    <div v-if="examination.examinationScheduleHistory > 1">
                                        <p> Your entrance examination is scheduled on <b>{{
                                            scheduledFormat(examination.examinationSchedule.schedule_date) }}</b>.
                                        </p>
                                        <p>
                                            Please ensure that you take the entrance examination on the specified date
                                            and
                                            time;
                                            otherwise, your examination
                                            slot will be forfeited.
                                        </p>
                                    </div>
                                    <div v-else>
                                        <p> Your entrance examination is scheduled on <b>{{
                                            scheduledFormat(examination.examinationSchedule.schedule_date) }}</b>
                                            <!--   or you may opt to choose from the date scheduled below:  --></p>
                                        <!--  <div class="row">
                                            <div class="col-md"
                                                v-for="(data, index) in scheduleListData(examination.examinationSchedule.schedule_date)"
                                                :key="index">
                                                <button class="btn btn-primary btn-sm w-100"
                                                    @click="storeScheduleExamv2(data)">
                                                    {{ data }} at 9:00 AM
                                                </button>
                                            </div>
                                        </div> -->

                                        <p>
                                            Please ensure to that you take the examination on the specified date and
                                            time,
                                            otherwise, your examination slot will be forfeited.
                                        </p>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
import { SHOW_LOADING_MUTATION } from '@/store/storeConstants'
import { mapMutations, mapActions } from 'vuex'
import stepper from '@/components/main-layouts/components/widgets/stepper-widget.vue'
import axios from 'axios'
import { SUCCESS_ALERT, INFO_ALERT, ERROR_ALERT, ENCRYPT_DATA } from '@/store/storeAlertConstants.js'
export default {
    name: 'ExaminationPayment',
    components: {
        stepper
    },
    data() {
        let className = { status: 'Pending', cardClass: '', textClass: 'text-muted', stepperStatus: false, badgeColor: 'bg-secondary', contentShow: false }
        const listScheduled = []
        if (this.applicantInformation && this.documents.approvedDocuments) {
            if (this.alumnia) {
                className = { status: 'Complete', cardClass: 'bg-soft-primary', textClass: 'text-primary', stepperStatus: true, stepperFinish: true, badgeColor: 'bg-primary', contentBody: false, contentShow: false }
            } else {
                if (this.payment) {
                    if (this.payment.is_approved) {
                        // listScheduled = this.scheduleListData(this.payment.updated_at)
                        className = { status: 'Progress', cardClass: 'bg-soft-info', textClass: 'text-info', stepperStatus: true, stepperFinish: false, badgeColor: 'bg-info', contentShow: true }
                        if (this.examination.examinationDetails) {
                            if (this.examination.examinationDetails.is_finish) {
                                className = { status: 'Complete', cardClass: 'bg-soft-primary', textClass: 'text-primary', stepperStatus: true, stepperFinish: true, badgeColor: 'bg-primary', contentBody: true, contentShow: true }
                            }
                        }
                    }
                }
            }
        }
        return {
            errors: [],
            titleName: 'ENTRANCE EXAMINATION',
            progressName: 'STEP 4',
            status: className.status,
            className,
            content: className.contentShow,
            examinationCode: '',
            schedule: '',
            scheduleTime: '',
            scheduledList: []
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
        scheduleListData(date) {
            const result = []
            const currentDate = new Date(date)

            for (let i = 0; i < 3; i++) {
                result.push(this.formatDate(currentDate))
                currentDate.setDate(currentDate.getDate() + 1) // Move to the next day
                console.log(currentDate.getDay())
                // Check if the current day is a weekend (0 for Sunday, 6 for Saturday)
                if (currentDate.getDay() === 6) {
                    currentDate.setDate(currentDate.getDate() + 1) // Skip the weekend day
                }
                if (currentDate.getDay() === 0) {
                    currentDate.setDate(currentDate.getDate() + 1) // Skip the weekend day
                }
            }

            return result
        },
        formatDate(date) {
            const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

            const dayOfWeek = daysOfWeek[date.getDay()]
            const month = months[date.getMonth()]
            const day = date.getDate()
            const year = date.getFullYear()

            return `${dayOfWeek} ${month} ${day} ${year}`
        },
        showContent() {
            if (this.className.status === 'Pending') {
                this.content = false
            } else if (this.className.status === 'Progress') {
                this.content = true
            } else {
                this.content = !this.content
            }
        },
        async storeScheduleExam() {
            this.errors = []
            this.showLoading(true)
            axios.post('applicant/examination-scheduled', { schedule: this.schedule, schedule_time: this.scheduleTime }, {
                headers: {
                    Authorization: 'Bearer ' + this.token
                }
            }).then((response) => {
                this.showLoading(false)
                this.successAlert(response.data)
                // window.location.reload()
            }).catch((error) => {
                this.showLoading(false)
                this.errorAlert(error)
                if (error.response.status === 422) {
                    this.errors = error.response.data.errors
                    console.log(this.errors)
                }
                console.error(error)
            })
        },
        storeScheduleExamv2(date) {
            this.errors = []
            this.showLoading(true)
            axios.post('applicant/examination-scheduled', { schedule: date, schedule_time: '09:00' }, {
                headers: {
                    Authorization: 'Bearer ' + this.token
                }
            }).then((response) => {
                this.showLoading(false)
                this.successAlert(response.data)
                // window.location.reload()
            }).catch((error) => {
                this.showLoading(false)
                this.errorAlert(error)
                if (error.response.status === 422) {
                    this.errors = error.response.data.errors
                    console.log(this.errors)
                }
                console.error(error)
            })
        },
        async submitExaminationCode() {
            this.errors = []
            this.showLoading(true)
            axios.post('applicant/examination', { examination: this.examinationCode }, {
                headers: {
                    Authorization: 'Bearer ' + this.token
                }
            }).then((response) => {
                this.showLoading(false)
                const message = { message: 'Examination Code Verified' }
                this.successAlert(message)
                this.$router.push('/applicant/examination/' + btoa(this.examinationCode))
                console.log(response)
            }).catch((error) => {
                this.showLoading(false)
                this.errorAlert(error)
                if (error.response.status === 422) {
                    this.errors = error.response.data.errors
                    console.log(this.errors)
                }
                console.error(error)
            })
        },
        checkSchedule(scheduled) {
            const currentDate = new Date() // This gives you the current date and time.

            // Strip out the time from the current date to compare only the date part
            const currentDateWithoutTime = new Date(currentDate.setHours(0, 0, 0, 0))

            const examinationDate = new Date(scheduled.schedule_date) // The scheduled examination date
            const examinationDateWithoutTime = new Date(examinationDate.setHours(0, 0, 0, 0)) // Stripping out time

            // Log the current date and examination date for debugging
            console.log('Current Date:', currentDateWithoutTime)
            console.log('Examination Date:', examinationDateWithoutTime)

            if (currentDateWithoutTime < examinationDateWithoutTime) {
                // The examination is in the future
                console.log('The examination is in the future.')
                return 2
            } else if (currentDateWithoutTime === examinationDateWithoutTime) {
                // The examination is today
                console.log('The examination is scheduled for today.')
                return 1
            } else {
                // The examination date has passed
                console.log('The examination date has passed.')
                return 0
            }
        },
        scheduledFormat(date1) {
            const date = new Date(date1)

            const options = {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
            }

            const formatter = new Intl.DateTimeFormat('en-US', options)
            return formatter.format(date)
            /* return this.formatDate(date) */
        }
    },
    props: { application: Object, applicantInformation: Object, documents: Object, alumnia: Object, payment: Object, examination: Object, token: String }
}
</script>