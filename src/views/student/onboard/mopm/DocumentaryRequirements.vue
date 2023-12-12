<template>
    <div v-if="isLoading">
        <LoadingView />
    </div>
    <div v-else>
        <div class="card ms-5 me-5" data-iq-gsap="onStart" data-iq-position-y="70" data-iq-rotate="0"
            data-iq-trigger="scroll" data-iq-ease="power.out" data-iq-opacity="0">
            <div class="card-header">
                <div class="header-title">
                    <h4 class="card-title fw-bold text-primary">DOCUMENTARY REQUIREMENTS</h4>
                </div>
            </div>
            <div class="card-body">
                <div v-for="(data, index) in documents" :key="index">
                    <div class="form-group">
                        <label for="example-text-input" class="form-control-label fw-bolder">
                            <small>{{ index }}<span class="text-danger">*</span></small>
                        </label>
                        <input type="file" class="form-control border border-primary" />

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import LoadingView from './view/loading-view.vue'
import { GET_USER_TOKEN, IS_USER_AUTHENTICATE_GETTER } from '@/store/storeConstants'
import { mapGetters } from 'vuex'
import axios from 'axios'
export default {
    name: 'ShipboardEnrollmentOverview',
    components: {
        LoadingView,
    },
    data() {
        return {
            isLoading: true,
            data: [],
            company: [],
            document: [],
            enrollment: [],
            deployment: [],
            vesselType: [],
            tuitionDetails: [],
            documents: [
                'Proof of Registration to MISMO Portal',
                'Valid SRIB with validity of at least 18 months or more',
                'Valid Passport (for International) wtih validity of at least 18 months or more',
                'Transcript of Record'
            ]
        }
    },
    computed: {
        ...mapGetters('auth', {
            token: GET_USER_TOKEN,
            isAuth: IS_USER_AUTHENTICATE_GETTER
        })
    },
    mounted() {
        axios.get('student/onboard/enrollment', {
            headers: {
                Authorization: 'Bearer ' + this.token
            }
        }).then((response) => {
            this.data = response.data.data
            this.company = this.data.application_details.shipping_company
            this.documents = this.data.application_details.document_requirements
            this.vesselType = this.data.application_details.vessel_type
            this.deployment = this.data.shipboard_application
            this.enrollment = this.data.enrollment
            this.tuitionDetails = this.data.tuition
            this.isLoading = false
        }).catch((error) => {
            console.log(error)
            this.isLoading = false
        })
    }
}
</script>