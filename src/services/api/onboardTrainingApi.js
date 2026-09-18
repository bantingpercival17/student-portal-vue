/* eslint-disable */
import axios from 'axios'
import store from '@/store'
import { GET_USER_TOKEN } from '@/store/storeConstants'

export class OnboardTrainingApi {
    constructor() {
        this.api = axios.create({
            headers: {
                get Authorization() {
                    return `Bearer ${store.getters[`auth/${GET_USER_TOKEN}`]}`
                }
            }
        })

        this.endpoints = {
            onboardEnrollment: 'student/v2/onboard-training/enrollment',
        }
    }
    async enrollmentDetails() {
        // Same API as fetchEnrollmentData — reuse it
        try {
            const { data } = await this.api.get(this.endpoints.onboardEnrollment)
            return data?.student ?? []
        } catch (error) {
            console.error('Current Enrollment Error:', error)
            throw error
        }
    }
    async getData(api) {
        try {
            const { data } = await this.api.get(api)
            return data ?? []
        } catch (error) {
            console.error('Current Enrollment Error:', error)
            return []
        }
    }
    async postForm(payload, api) {
        try {
            const { data } = await this.api.post(api, payload)
            return data.data
        } catch (error) {
            throw error
        }
    }
    async postWithAttachment(payload, api) {
        try {
            const { data } = await this.api.post(
                api,
                payload,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                }
            )
            return data?.data ?? []
        } catch (error) {
            console.error('Shipboard Application:', error)
            return []
        }
    }

}
