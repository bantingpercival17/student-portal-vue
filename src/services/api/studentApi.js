/* eslint-disable */
import axios from 'axios'
import store from '@/store'
import { GET_USER_TOKEN } from '@/store/storeConstants'

export class StudentApi {
    constructor() {
        this.api = axios.create({
            headers: {
                get Authorization() {
                    return `Bearer ${store.getters[`auth/${GET_USER_TOKEN}`]}`
                }
            }
        })

        this.endpoints = {
            studentDetails: 'student/v2/student-details',
            grades: 'student/v2/student-grades',
            statementOfAccount: 'student/v2/student-account-card'
        }
    }
    async studentIdDetails() {
        // Same API as fetchEnrollmentData — reuse it
        try {
            const { data } = await this.api.get(this.endpoints.studentDetails)
            return data?.student ?? []
        } catch (error) {
            console.error('Current Enrollment Error:', error)
            return []
        }
    }
    async studentGrades(semester) {
        // Same API as fetchEnrollmentData — reuse it
        const link = semester != null ? this.endpoints.grades + '?semester=' + semester : this.endpoints.grades
        try {
            const { data } = await this.api.get(link)
            return data?.data ?? []
        } catch (error) {
            console.error('Current Enrollment Error:', error)
            return []
        }
    }
    async studentAccountCard(semester) {
        // Same API as fetchEnrollmentData — reuse it
        const link = semester != null ? this.endpoints.statementOfAccount + '?semester=' + semester : this.endpoints.statementOfAccount
        try {
            const { data } = await this.api.get(link)
            return data?.data ?? []
        } catch (error) {
            console.error('Current Enrollment Error:', error)
            return []
        }
    }

}

