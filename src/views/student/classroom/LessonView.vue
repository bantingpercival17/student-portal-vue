<template>
    <div v-if="isLoading">
        <LessonLoading />
    </div>
    <div v-else>

        <div class="row">
            <div class="col-md-8 col-sm-12">
                <p class='display-6 fw-bolder text-primary m-0'>{{ topic.learning_outcomes }}</p>
                <span class="fw-bolder text-muted m-0">{{ subject.subject_name }}</span>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="card">
                    <div class="card-header m-2 p-2">
                        <label for="" class="text-muted fw-bolder">LIST OF LESSON</label>
                    </div>
                    <div class="card-body">
                        <div class="form-group" v-for="(data, index) in lessons" :key="index">
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
        </div>

    </div>
</template>

<script>
import axios from 'axios'
import { LOGOUT_ACTION, GET_USER_TOKEN, IS_USER_AUTHENTICATE_GETTER, SHOW_LOADING_MUTATION } from '@/store/storeConstants'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import LessonLoading from './loading-view/LessonLoading.vue'
export default {
    name: 'Lesson View',
    components: {
        LessonLoading
    },
    data() {
        return {
            isLoading: true,
            subject: [],
            topic: [],
            lessons: []
        }
    },
    computed: {
        ...mapGetters('auth', {
            token: GET_USER_TOKEN,
            isAuth: IS_USER_AUTHENTICATE_GETTER
        })
    },
    mounted() {
        const subjectValue = this.$route.params.subject
        const topicValue = this.$route.params.lesson
        this.mountedData(subjectValue, topicValue)
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
        },
        async mountedData(data1, data) {
            const value = {
                subject: data1,
                lesson: data
            }
            await axios.post('/subject/topic', value, {
                headers: {
                    Authorization: 'Bearer ' + this.token
                }
            })
                .then((response) => {
                    this.topic = response.data.topic
                    this.subject = response.data.subject.curriculum_subjects.subject
                    this.lessons = response.data.lesson.syllabus_details.learning_outcomes
                    console.log(this.lessons)
                    this.isLoading = false
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }
}
</script>