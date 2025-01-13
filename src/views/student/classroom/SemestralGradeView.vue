<template>
  <div v-if='isLoading'>
    <h3 class='text-primary'>LOADING</h3>
  </div>
  <div v-else>
    <p class='display-6 fw-bolder text-primary'>SEMESTRAL GRADE</p>
    <nav class='nav nav-underline bg-soft-primary pb-0 text-center' aria-label='Secondary navigation'>
      <div class='dropdown m-3 w-100'>
        <a class='dropdown-toggle' data-bs-toggle='dropdown' href='#' role='button' aria-haspopup='false'
          aria-expanded='false'>
          <span class='text-muted'>Academic Year : </span>
          <span class='fw-bolder'>{{ currentAcademic }}</span>
        </a>
        <ul class='dropdown-menu w-100' data-popper-placement='bottom-start'>
          <li v-for='item in enrollmentHistory' :key='item' :value='item.id'>
            <router-link @click='changeGrade(encrypt(item.id))' class='dropdown-item' :to="{
              name: 'student-layout.semestral-grade-view',
              query: { key: encrypt(item.id) },
            }">{{ academicName(item) }}</router-link>
          </li>
        </ul>
      </div>
    </nav>
    <div class='card shadow mt-3'>
      <div class='card-header'>
        <span class='fw-bolder text-primary'>LIST OF SUBJECTS</span>
      </div>
      <div class='card-body'>
        <div class='table-responsive'>
          <table class='table table-striped mb-0'>
            <thead>
              <tr class='fw-bolder'>
                <th>SUBJECT AND INSTRUCTOR</th>
                <th>UNITS</th>
                <th>GRADE</th>
                <th>REMARKS</th>
              </tr>
            </thead>
            <tbody v-if="subjectList.length > 0">
              <tr v-for='item in subjectList' :key='item' :value='item.id'>
                <td>
                  <p class='fw-bolder text-primary m-0 p-0 h4'>
                    {{ item.subjectCode }}
                  </p>
                  <span class='fw-bolder text-secondary'>{{
                    item.subjectTeacher
                  }}</span><br />
                  <span class='text-secondary'>{{
                    item.subjectName
                  }}</span>
                </td>
                <td>
                  <p class='fw-bolder text-secondary h5'>
                    {{ item.subjectUnit }}
                  </p>
                </td>
                <td>
                  <div>
                    <span class='fw-bolder h4 text-primary'>{{
                      item.subjectGrade
                    }}</span>
                  </div>
                </td>
                <td>
                  <div v-if='item.subjectGrade !== "-"'>
                    <span class='fw-bolder h4 text-primary'>
                      {{
                        gradeRemarks(item.subjectGrade)
                      }}
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td>NO SUBJECT</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { GET_USER_TOKEN, IS_USER_AUTHENTICATE_GETTER, SHOW_LOADING_MUTATION } from '@/store/storeConstants'
import { mapGetters, mapMutations } from 'vuex'
import axios from 'axios'
export default {
  name: 'Semestral Grade',
  data() {
    return {
      isLoading: true,
      section: [],
      subjectList: [],
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
    academicName(data) {
      const name = data.semester + ' | ' + data.school_year
      return name.toUpperCase()
    },
    encrypt(data) {
      return btoa(data)
    },
    gradeRemarks(data) {
      return data >= 5 ? 'FAILED' : 'PASSED'
    },
    changeGrade(parameter) {
      this.isLoading = true
      this.subjectList = []
      this.mountedData(parameter)
    },
    async mountedData(parameter) {
      try {
        const link = parameter ? `student/subject-lists?key=${parameter}` : 'student/subject-lists'
        const response = await axios.get(link, {
          headers: {
            Authorization: 'Bearer ' + this.token
          }
        })
        const data = response.data.classroom
        this.enrollmentHistory = data.enrollmentHistory
        const currentEnrollment = data.currentEnrollment
        this.currentAcademic = this.academicName(currentEnrollment.academic)
        if (currentEnrollment.student_section_v2) {
          this.subjectList = data.subjectLists
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
