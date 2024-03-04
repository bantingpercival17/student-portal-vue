<template>
    <div v-if="isLoading">
        <SubjectLoading />
    </div>
    <div v-else>
        <p class='display-6 fw-bolder text-primary'>SUBJECT LIST</p>
        <nav class='nav nav-underline bg-soft-primary pb-0 text-center mb-3' aria-label='Secondary navigation'>
            <div class='dropdown m-2 w-100'>
                <a class='dropdown-toggle' data-bs-toggle='dropdown' href='#' role='button' aria-haspopup='false'
                    aria-expanded='false'>
                    <span class='text-muted'>Academic Year : </span>
                    <span class='fw-bolder'>{{ currentAcademic }}</span>
                </a>
                <ul class='dropdown-menu w-100' data-popper-placement='bottom-start'>
                    <li v-for='item in enrollmentHistory' :key='item' :value='item.id'>
                        <router-link @click='mountedData(encrypt(item.id))' class='dropdown-item' :to="{
                            name: 'student-layout.subjects-view',
                            query: { key: encrypt(item.id) },
                        }">{{ academicName(item.academic) }}</router-link>
                    </li>
                </ul>
            </div>
        </nav>
        <div class="row">
            <div class="col-lg-4 col-md-6 col-xs-12" v-for="(data, index) in subjectLists" :key="index">
                <router-link :to="{ name: 'student-layout.subject-view-subject', params: { subject: encrypt(data.id) } }">
                    <div class="card bg-primary">
                        <div class="card-header d-flex align-items-center justify-content-between pb-4">
                            <div class="header-title">
                                <div class="d-flex flex-wrap">
                                    <div class="media-support-user-img me-3">
                                        <img :src="teacherImage(data.staff)" alt="teacher-image"
                                            class="img-fluid avatar avatar-70 rounded-circle">
                                    </div>
                                    <div class="media-support-info mt-2">
                                        <h5 class="mb-0 fw-bolder text-white">{{
                                            data.curriculum_subjects.subject.subject_code
                                        }}</h5>
                                        <p class="mb-0 text-white">{{ data.staff.first_name + " " + data.staff.last_name }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-body p-0">
                        </div>
                    </div>
                </router-link>

            </div>
        </div>
    </div>
</template>
<script>
import Swal from 'sweetalert2'
import { LOGOUT_ACTION, GET_USER_TOKEN, IS_USER_AUTHENTICATE_GETTER, SHOW_LOADING_MUTATION } from '@/store/storeConstants'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import SubjectLoading from './loading-view/SubjectsLoading.vue'
import axios from 'axios'
export default {
    name: 'SUBJECT LIST',
    components: {
        SubjectLoading
    },
    data() {
        const formData = new FormData()
        return {
            isLoading: true,
            subjectLists: [],
            currentAcademic: '',
            enrollmentHistory: []
        }
    },
    computed: {
        ...mapGetters('auth', {
            token: GET_USER_TOKEN,
            isAuth: IS_USER_AUTHENTICATE_GETTER
        })
    },
    mounted() {
        const parameter = this.$route.query.key
        this.mountedData(parameter)
    },
    methods: {
        ...mapMutations({
            showLoading: SHOW_LOADING_MUTATION
        }),
        ...mapActions('auth', {
            logout: LOGOUT_ACTION
        }),
        async teacherImage(staff) {
            try {
                const response = await axios.post('/staff/image', { id: staff.id }, {
                    headers: {
                        Authorization: 'Bearer ' + this.token
                    }
                })
                console.log(response.data) // Make sure response data is what you expect
                return response.data.image
            } catch (error) {
                console.error('Error fetching teacher image:', error)
                return 'http://one.bma.edu.ph/assets/img/staff/avatar.png' // Default image URL or handle error as needed
            }
        },
        encrypt(data) {
            return btoa(data)
        },
        academicName(data) {
            const name = data.semester + ' | ' + data.school_year
            return name.toUpperCase()
        },
        async mountedData(parameter) {
            try {
                const link = parameter ? `student/subject-lists?key=${parameter}` : 'student/subject-lists'
                const response = await axios.get(link, {
                    headers: {
                        Authorization: 'Bearer ' + this.token
                    }
                })
                this.enrollmentHistory = response.data.enrollmentHistory
                this.currentAcademic = this.academicName(response.data.enrollment.academic)
                if (response.data.section.student_section) {
                    this.subjectLists = response.data.section.student_section.subject_details
                }
                this.isLoading = false
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    this.logout()
                }
                console.error('Error fetching data:', error)
                // Handle error or display error message
            }
        }
    }
}
</script>