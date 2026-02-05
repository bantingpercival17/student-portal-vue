/* eslint-disable */
import axios from 'axios'
import store from '@/store'
import { GET_USER_TOKEN } from '@/store/storeConstants'

export class ApplicantAdmissionApi {
    constructor() {
        this.api = axios.create({
            headers: {
                get Authorization() {
                    return `Bearer ${store.getters[`auth/${GET_USER_TOKEN}`]}`
                }
            }
        })

        this.endpoints = {
            information: '/v2/applicant/admission-information',
            assessment: 'student/v2/enrollment-assessment',
            enrollment: 'student/v2/current-enrollment',
            application: 'student/v2/enrollment-application',
            paymentMode: 'student/v2/tuition-fee-payment-mode',
            payments: 'student/v2/enrollment-payment'
        }
    }

    async fetchAdmissionInformation() {
        try {
            const { data } = await this.api.get(this.endpoints.information)
            return data?.admissionInformation ?? []
        } catch (error) {
            console.error('Fetch Admission Information Error:', error)
            return []
        }
    }

    async enrollmentAssessmentView(payload) {
        try {
            const { data } = await this.api.post(
                this.endpoints.assessment,
                payload
            )
            return data?.enrollmentDetails ?? []
        } catch (error) {
            console.error('Assessment View Error:', error)
            return []
        }
    }
}

