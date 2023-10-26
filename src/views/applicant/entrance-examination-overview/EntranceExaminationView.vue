<template>
    <div v-if="isLoading">
        <span class="text-primary fw-bolder h4">LOADING...</span>
    </div>
    <div v-else>
        <ul id="top-tab-list" class="p-0 row list-inline category-list">
            <li :class="'col-lg col-md mb-2 text-center ' + activeCategory(index)" v-for="(data, index) in categoryList  "
                :key="index">
                <a class="category">
                    <small class="mt-4">{{ data.category_name }}</small>
                </a>
            </li>
        </ul>
        <div class="card shadow mt-2">
            <div class="card-header">
                <h4 class="fw-bolder text-primary">{{ categoryDetails.subject_name }}</h4>
                <h6 class="fw-bolder text-muted">{{ categoryDetails.instruction }}</h6>
                <span class="fw-bolder text-primary h6">TOTAL OF {{ questionNumber }} QUESTIONS </span>
                <div class="float-end">
                    <TimerLayout :startingTime="startTime" :finishFunction="finishExamination" />
                </div>
            </div>
            <div class="card-body">
                <div v-if="reviewModal" class="review">
                    <div class="d-flex justify-content-center">
                        <label for="" class="h4 text-primary fw-bolder">REVIEW ANSWER</label>
                    </div>
                    <div class="question-review">
                        <div class="question mb-4" v-for="data in range(questionIndexReview, questionIndexReviewRange)"
                            :key="data">
                            <div class="row">
                                <div class="col-lg-8 col-md-6">
                                    <span class="badge bg-primary">QUESTION {{ data }}</span>
                                </div>
                            </div>
                            <div class="question-view">
                                <div v-if="questionList[data - 1].question === 'none'">
                                    <img class="img-fluid" :src="questionView(questionList[data - 1].image_path)" alt=""
                                        height="100">
                                </div>
                                <div v-else>
                                    <p class="text-primary fw-bolder h5" v-html="questionList[data - 1].question"></p>
                                    <img v-if="questionList[data - 1].image_path !== 'none'"
                                        :src="questionView(questionList[data - 1].image_path)" alt="" height="200">
                                </div>
                            </div>
                            <div class="question-choices row">
                                <div class="col-lg-6 col-md-12"
                                    v-for="(choice, choiceIndex) in questionList[data - 1].choices_v2" :key="choiceIndex">
                                    <button :class="btnStyleV2(choice.id, (data - 1))"
                                        @click="choiceAswer(choice.id, (data - 1))" v-html="choice.choice_name">
                                    </button>
                                </div>
                            </div>
                        </div>
                        <hr>
                    </div>
                    <div class="row">
                        <div class="float-end mb-2">
                            <button class="btn btn-outline-info me-3 btn-sm" @click="previousReviewQuestion()"
                                v-if="questionIndexReview > 5">PREVIOUS</button>
                            <button v-if="questionIndexReviewRange < questionList.length"
                                class="btn btn-info text-white btn-sm" @click="nextReviewQuestion()">NEXT</button>
                            <button v-else class="btn btn-info text-white btn-sm" @click="nextCategoryReview()">
                                SUBMIT</button>
                        </div>
                    </div>
                </div>
                <div class="questioner" v-else-if="currentQuestion < questionList.length">
                    <div class="">
                        <div class="row">
                            <div class="col-lg-8 col-md-6">
                                <span class="badge bg-primary">QUESTION {{ currentQuestion + 1 }}</span>
                            </div>
                            <div class="col-lg-4 col-md-6">
                                <div class="float-end mb-2">
                                    <button class="btn btn-outline-info me-3 btn-sm" @click="previousQuestion()"
                                        v-if="currentQuestion > 0">PREVIOUS</button>
                                    <button class="btn btn-info text-white btn-sm" @click="nextQuestion()">NEXT</button>
                                </div>
                            </div>
                        </div>
                        <div class="question-view">
                            <div v-if="questionList[currentQuestion].question === 'none'">
                                <img class="img-fluid" :src="questionView(questionList[currentQuestion].image_path)" alt=""
                                    height="100">
                            </div>
                            <div v-else>
                                <p class="text-primary fw-bolder h5" v-html="questionList[currentQuestion].question"></p>
                                <img v-if="questionList[currentQuestion].image_path !== 'none'"
                                    :src="questionView(questionList[currentQuestion].image_path)" alt="" height="200">
                            </div>
                        </div>
                        <div class="question-choices row">
                            <div class="col-lg-6 col-md-12"
                                v-for="(   item, index   ) in questionList[currentQuestion].choices_v2" :key="index">
                                <button :class="btnStyle(item.id)" @click="choiceAswer(item.id, currentQuestion)"
                                    v-html="item.choice_name">
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <div v-if="(categoryIndex + 1) == categoryList.length">
                        <textarea v-model="essay" name="essay" id="" cols="30" rows="10"
                            class="form-control border border-primary" placeholder="Write your Essay here....">
                        </textarea>
                        <div class="d-flex justify-content-center">
                            <button class="btn btn-info mt-3 text-white me-3" @click="finishExamination()">SUBMIT
                                EXAMINATION</button>
                        </div>
                    </div>
                    <div v-else-if="categoryIndex < categoryList.length">
                        <div class="d-flex justify-content-center">
                            <button class="btn btn-outline-info" @click="reviewAnswer">REVIEW ANSWER</button>
                        </div>
                        <div class="h4 text-secondary text-center fw-bolder">Do you want to submit your Answer to proceed to
                            the next Category?</div>
                        <div class="d-flex justify-content-center">
                            <button class="btn btn-info mt-3 text-white me-3" @click="nextCategory()"
                                v-if="currentQuestion > 1">YES </button>
                        </div>
                    </div>
                    <div v-else>
                        <div class="h4 text-secondary text-center fw-bolder">Do you want to Submit your Examination?</div>
                        <div class="d-flex justify-content-center">
                            <button class="btn btn-info mt-3 text-white me-3" @click="finishExamination()"
                                v-if="currentQuestion > 1">YES
                                (SUBMIT)</button>
                            <br>
                            <button class="btn btn-outline-info mt-3" @click="previousQuestion()"
                                v-if="currentQuestion > 1">PREVIOUS</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { GET_USER_TOKEN, IS_USER_AUTHENTICATE_GETTER, SHOW_LOADING_MUTATION } from '@/store/storeConstants'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { SUCCESS_ALERT, INFO_ALERT, ERROR_ALERT, ENCRYPT_DATA } from '@/store/storeAlertConstants.js'
import TimerLayout from './component/TimerLayout.vue'
import Swal from 'sweetalert2'
import axios from 'axios'
export default {
    name: 'Assessment View',
    data() {
        return {
            isLoading: true,
            errors: [],
            categoryIndex: 0,
            categoryList: [],
            categoryDetails: [],
            questionList: [],
            questionNumber: [],
            currentQuestion: 0,
            startTime: null,
            answerActive: [],
            selectedChoices: [],
            examinationDetails: [],
            questionIndexReview: 1,
            questionIndexReviewRange: 5,
            reviewModal: false,
            essay: ''
        }
    },
    components: {
        TimerLayout
    },
    computed: {
        ...mapGetters('auth', {
            token: GET_USER_TOKEN,
            isAuth: IS_USER_AUTHENTICATE_GETTER
        })
    },
    mounted() {
        const link = 'applicant/examination?code=' + this.$route.params.code
        axios.get(link, {
            headers: {
                Authorization: 'Bearer ' + this.token
            }
        })
            .then((response) => {
                this.data = response.data
                this.startTime = this.data.examinationDetails.examination_start
                this.examinationDetails = this.data.examinationDetails
                this.categoryList = this.data.questionLists
                this.categoryDetails = this.categoryList[this.categoryIndex]
                this.questionList = this.categoryList[this.categoryIndex].question_lists
                this.questionNumber = this.questionList.length
                console.log(this.startTime)
                this.showLoading(false)
                this.isLoading = false
            })
            .catch((error) => {
                console.log(error)
            })
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
        findQuestionIndex(array, questionId) {
            for (let i = 0; i < array.length; i++) {
                if (array[i].question === questionId) {
                    return i // Return the index if found
                }
            }
            return -1 // Return -1 if not found
        },
        btnStyle(choiceIndex) {
            const currentQuestion = this.questionList[this.currentQuestion].id
            const index = this.findQuestionIndex(this.selectedChoices, currentQuestion)
            let style = 'btn btn-outline-primary w-100 mt-4'
            if (index !== -1) {
                if (this.selectedChoices[index].choices === choiceIndex) {
                    style = 'btn btn-primary w-100 mt-4'
                }
            }
            return style
        },
        btnStyleV2(choiceIndex, questionIndex) {
            const currentQuestion = this.questionList[questionIndex].id
            const index = this.findQuestionIndex(this.selectedChoices, currentQuestion)
            let style = 'btn btn-outline-primary w-100 mt-4'
            if (index !== -1) {
                if (this.selectedChoices[index].choices === choiceIndex) {
                    style = 'btn btn-primary w-100 mt-4'
                }
            }
            return style
        },
        reviewAnswer() {
            this.reviewModal = true
        },
        choiceAswer(choice, questionIndex) {
            const currentQuestion = this.questionList[questionIndex].id
            const data = {
                examination: this.examinationDetails.id,
                question: currentQuestion,
                choices: choice
            }
            const index = this.findQuestionIndex(this.selectedChoices, currentQuestion)
            if (index !== -1) {
                this.selectedChoices[index].choices = choice
            } else {
                this.selectedChoices.push(data)
            }
            axios.post('/applicant/examination/answer', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: 'Bearer ' + this.token
                }
            }).then((response) => {
                if (!this.reviewModal) {
                    this.nextQuestion()
                }
                /* console.log(response) */
            }).catch((error) => {
                this.showLoading(false)
                console.log(error)
                if (error.response.status === 422) {
                    console.log(error.response.data)
                    this.errors = error.response.data.errors
                } else {
                    this.errorAlert(error)
                }
            })
            console.log(data)
        },
        nextQuestion() {
            this.currentQuestion += 1
        },
        previousQuestion() {
            this.currentQuestion -= 1
        },
        nextReviewQuestion() {
            this.questionIndexReview += 5
            this.questionIndexReviewRange += 5
            console.log(this.questionIndexReview)
        },
        previousReviewQuestion() {
            this.questionIndexReview -= 5
            this.questionIndexReviewRange -= 5
        },
        nextCategory() {
            this.categoryIndex += 1
            this.currentQuestion = 0
            this.categoryDetails = this.categoryList[this.categoryIndex]
            this.questionList = this.categoryList[this.categoryIndex].question_lists
            this.questionNumber = this.questionList.length
        },
        nextCategoryReview() {
            this.reviewModal = false
            this.categoryIndex += 1
            this.currentQuestion = 0
            this.questionIndexReview = 1
            this.questionIndexReviewRange = 5
            this.categoryDetails = this.categoryList[this.categoryIndex]
            this.questionList = this.categoryList[this.categoryIndex].question_lists
            this.questionNumber = this.questionList.length
        },
        finishExamination() {
            this.showLoading(false)
            axios.post('/applicant/examination/finish', { examination: this.examinationDetails.id, essay: this.essay }, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: 'Bearer ' + this.token
                }
            }).then((response) => {
                this.showLoading(false)
                this.successAlert(response.data)
                setInterval(() => {
                    this.$router.push('/applicant/dashboard')
                }, 1000)
            }).catch((error) => {
                this.showLoading(false)
                console.log(error)
                if (error.response.status === 422) {
                    console.log(error.response.data)
                    this.errors = error.response.data.errors
                    this.errorAlert(error)
                } else {
                    this.errorAlert(error)
                }
            })
        },
        activeCategory(index) {
            return this.categoryIndex === index ? 'active' : ''
        },
        questionView(data) {
            return 'http://bma.edu.ph/assets/image/questions/' + data
        },
        range(start, end) {
            return Array.from({ length: end - start + 1 }, (_, index) => start + index)
        }
    }
}
</script>