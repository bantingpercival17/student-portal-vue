/* eslint-disable */
import api from '../api'

export class ApplicantAdmissionApi {

    constructor() {
        this.endpoints = {
            admission: '/v2/applicant/admission-information',
            information: '/v2/applicant/applicant-information',
            storeInformation: '/v2/applicant/store-information',
            uploadDocument: '/v2/applicant/upload-document'
        }
    }
    async admissionDetails() {
        const { data } = await api.get(this.endpoints.admission)
        return data?.applicantDetails ?? []
    }
    async fetchAdmissionInformation() {
        const { data } = await api.get(this.endpoints.information)
        return data?.data ?? []
    }

    async storeInformation(payload) {
        const { data } = await api.post(
            this.endpoints.storeInformation,
            payload
        )
        return data
    }
    async uploadDocument(payload) {
        const { data } = await api.post(
            this.endpoints.uploadDocument,
            payload
        )
        return data
    }

}