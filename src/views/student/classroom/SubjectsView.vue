<template>
    <div v-if="isLoading">
        <LessonLoading />
    </div>
    <div v-else>
        <p class='display-6 fw-bolder text-primary'>{{ subject.subject_code }}</p>
        <span class="fw-bolder text-muted">{{ subject.subject_name }}</span>
        <div class="row">
            <div class="col-md-8">
                <div v-if="topic">
                    <div class="card border mt-3 shadow">
                        <div class="card-header p-3">
                            <div class="h5 fw-bolder text-primary">LIST OF TOPICS</div>
                        </div>
                        <div class="card-body p-3">
                            <div class="form-group" v-for="(data, index) in topic" :key="index">
                                <div class="row">
                                    <div class="col-md">
                                        <router-link
                                            :to="{ name: 'student-layout.subject-view-lesson', params: { subject: this.$route.params.subject, lesson: encrypt(data.id) } }">
                                            <small class="fw-bolder text-muted">LESSON {{ index + 1 }}</small> <br>
                                            <label for="" class="fw-bolder">{{ data.learning_outcomes }}</label>
                                        </router-link>
                                        <!--  <a href="http://127.0.0.1:7000/teacher/course-syllabus/preview/topic?topic=NjI=">

                                        </a> -->
                                    </div>
                                </div>
                                <hr>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <p class="h4 fw-bolder text-primary">NO CONTENT</p>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios'
import { LOGOUT_ACTION, GET_USER_TOKEN, IS_USER_AUTHENTICATE_GETTER, SHOW_LOADING_MUTATION } from '@/store/storeConstants'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import LessonLoading from './loading-view/LessonLoading.vue'
export default {
    name: 'Subject View',
    components: {
        LessonLoading
    },
    data() {
        return {
            isLoading: true,
            subject: [],
            topic: []
        }
    },
    computed: {
        ...mapGetters('auth', {
            token: GET_USER_TOKEN,
            isAuth: IS_USER_AUTHENTICATE_GETTER
        })
    },
    mounted() {
        const dynamicValue = this.$route.params.subject
        axios.get(`student/subject-lists/view?subject=${dynamicValue}`, {
            headers: {
                Authorization: 'Bearer ' + this.token
            }
        }).then((response) => {
            this.data = response.data
            if (this.data) {
                this.subject = this.data.subject.curriculum_subjects.subject
                if (this.data.subject.course_syllabus) {
                    this.course_syllabus = this.data.subject.course_syllabus
                    if (this.course_syllabus.syllabus_details) {
                        if (this.course_syllabus.syllabus_details.learning_outcomes) {
                            this.topic = this.course_syllabus.syllabus_details.learning_outcomes
                        }
                    }
                }
            }
            console.log(this.topic)
            this.isLoading = false
        }).catch((error) => {
            if (error.response) {
                if (error.response.status === 401) {
                    this.logout()
                }
            }
            console.log(error)
        })
    },
    methods: {
        ...mapMutations({
            showLoading: SHOW_LOADING_MUTATION
        }),
        ...mapActions('auth', {
            logout: LOGOUT_ACTION
        }),
        encrypt(data) {
            return btoa(data)
        }
    }
}
</script>