/* eslint-disable */
import axios from 'axios'
import store from '@/store'
import { GET_USER_TOKEN } from '@/store/storeConstants'

export class EnrollmentApi {
    constructor() {
        this.api = axios.create({
            headers: {
                get Authorization() {
                    return `Bearer ${store.getters[`auth/${GET_USER_TOKEN}`]}`
                }
            }
        })

        this.endpoints = {
            history: 'student/v2/enrollmentHistory',
            assessment: 'student/v2/enrollment-assessment',
            enrollment: 'student/v2/current-enrollment',
            application: 'student/v2/enrollment-application',
            paymentMode: 'student/v2/tuition-fee-payment-mode',
            payments: 'student/v2/enrollment-payment'
        }
    }

    async fetchEnrollmentData() {
        try {
            const { data } = await this.api.get(this.endpoints.history)
            return data?.enrollmentList ?? []
        } catch (error) {
            console.error('Fetch Enrollment Error:', error)
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

    async currentEnrollmentProcess() {
        // Same API as fetchEnrollmentData — reuse it
        try {
            const { data } = await this.api.get(this.endpoints.enrollment)
            return data?.enrollmentDetails ?? []
        } catch (error) {
            console.error('Current Enrollment Error:', error)
            return []
        }
    }
    async enrollmentApplication() {
        // Enrollment Application for new Academic Year
        try {
            const { data } = await this.api.post(
                this.endpoints.application
            )
            return data?.enrollmentApplication ?? []
        } catch (error) {
            console.error('Enrollment Application Error:', error)
            return []
        }
    }
    async submitPaymentMode(payload) {
        try {
            const { data } = await this.api.post(
                this.endpoints.paymentMode,
                payload,
                { withCredentials: true }
            )
            return data?.data ?? []
        } catch (error) {
            console.error('Tuition Fee Payment Error:', error)
            return []
        }
    }
    async submitEnrollmentPayment(payload) {
        try {
            const { data } = await this.api.post(
                this.endpoints.payments,
                payload, {
            })
            return data?.data ?? []
        } catch (error) {
            console.error('Tuition Fee Payment Error:', error)
            return []
        }
    }
}

