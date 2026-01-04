<template>
    <div class="card">
        <div class="card-header p-4 d-flex justify-content-between align-items-center">
            <h3 class="h4 fw-bold text-dark mb-0">Student Grades</h3>
            <div class="col-md-4">
                <select class="form-select" v-model="selectedSemester" @change="viewGrades">
                    <option v-for="item in enrolledSemester" :key="item.enrolled" :value="item.enrolled">{{
                        item.semester }}
                    </option>
                </select>
            </div>
        </div>
        <div class="card-body p-4">
            <!-- <div class="row g-3 mb-4 text-center">
                <div class="col-md-6">
                    <div class="p-3 bg-light rounded"><small class="text-muted d-block">Semester GWA</small>
                        <h4 class="fw-bold mb-0 text-primary">{{ semesterGWA }}</h4>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="p-3 bg-light rounded"><small class="text-muted d-block">Cumulative GWA</small>
                        <h4 class="fw-bold mb-0 text-success">{{ cumulativeGWA }}</h4>
                    </div>
                </div>
            </div> -->

            <template v-if="!contentLoading">
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Course Code</th>
                                <th>Course Title</th>
                                <th class="text-center">Units</th>
                                <th class="text-center">Final Grade</th>
                            </tr>
                        </thead>
                        <tbody v-if="listOfSubjects.length > 0">
                            <tr v-for="course in listOfSubjects" :key="course.code">
                                <td>{{ course.code }}</td>
                                <td>
                                    <span class="text-primary fw-bolder">{{ course.title }}</span>
                                    <br>
                                    <small>{{ course.teacher }}</small>
                                </td>
                                <td class="text-center">{{ course.units }}</td>
                                <td class="text-center fw-bold">
                                    <span v-if="postingOfGrade"
                                        :class="course.grades ? (course.grades.transmutation <= 3.0 ? 'text-success' : 'text-danger') : 'text-secondary'">
                                        {{ course.grades ? course.grades.transmutation : '' }}
                                    </span>
                                    <span v-else>-</span>
                                </td>
                            </tr>
                        </tbody>
                        <tbody v-else>
                            <tr>
                                <td colspan="5">No Data</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </template>
            <template v-else>
                <div class="d-flex flex-column align-items-center">
                    <div class="spinner-border spinner-lg text-success mb-3" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <p class="text-muted">Loading... Please wait.</p>
                </div>
            </template>
        </div>
    </div>
</template>
<script>
import { StudentApi } from '@/services/api/studentApi'

export default {
    name: 'StudentGrade',
    data() {
        return {
            contentLoading: true,
            studentApi: new StudentApi(),
            grades: {
                'First Year - First Semester': [{ code: 'NAV 1', title: 'Terrestrial Navigation 1', units: 3, grade: 1.50 }, { code: 'ENG 1', title: 'Maritime English', units: 3, grade: 1.75 }],
                'First Year - Second Semester': [{ code: 'NAV 2', title: 'Terrestrial Navigation 2', units: 3, grade: 1.75 }, { code: 'DECK 2', title: 'Deck Watchkeeping 2', units: 3, grade: 2.50 }]
            },
            enrolledSemester: [],
            selectedSemester: 'First Year - First Semester',
            listOfSubjects: [],
            postingOfGrade: false

        }
    },
    async mounted() {
        const response = await this.studentApi.studentGrades()
        console.log(response.listOfSubjects)
        this.enrolledSemester = response?.semesters ?? []
        console.log(response)
        this.contentLoading = false
        if (this.enrolledSemester.length > 0) {
            this.selectedSemester = this.enrolledSemester[0].enrolled
            this.listOfSubjects = response.listOfSubjects
            this.postingOfGrade = response.publicationStatus
            // this.listOfSubjects = response.listOfSubjects
        }
    },
    computed: {
        semesterGWA() { return 1.68 }, cumulativeGWA() { return 1.72 }
    },
    methods: {
        async viewGrades() {
            this.contentLoading = true
            this.listOfSubjects = []
            console.log('Selected semester ID:', this.selectedSemester)
            const response = await this.studentApi.studentGrades(this.selectedSemester)
            this.listOfSubjects = response.listOfSubjects
            this.postingOfGrade = response.publicationStatus
            console.log(response)
            this.contentLoading = false
        }
    }


}
</script>