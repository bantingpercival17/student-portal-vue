<template>
    <div class="card ms-5 me-5" data-iq-gsap="onStart" data-iq-position-y="70" data-iq-rotate="0" data-iq-trigger="scroll"
        data-iq-ease="power.out" data-iq-opacity="0">
        <div class="card-header">
            <div class="header-title">
                <h4 class="card-title fw-bold text-primary">SHIPBOARD ENROLLMENT OVERVIEW</h4>
            </div>
        </div>
        <div class="card-body">
            <div class="iq-timeline0 m-0 d-flex align-items-center justify-content-between position-relative">
                <ul class="list-inline p-0 m-0">
                    <li>
                        <DocumentRequirments :propsCompany="company" :propsDocuments="documents"
                            :propsDeployment="deployment" :propsAttachment="documentAttachment" />
                    </li>
                    <!-- <li>
                        <assessmentView :propsData="data" />
                    </li>
                    <li>
                        <tuitionFeeView :propsData="data" :propsTags="tuition" :propsTuitionDetails="tuitionDetails" />
                    </li>
                    <li>
                        <paymentView />
                    </li> -->
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import DocumentRequirments from './components/document-requirments.vue'
import { GET_USER_TOKEN, IS_USER_AUTHENTICATE_GETTER } from '@/store/storeConstants'
import { mapGetters } from 'vuex'
import axios from 'axios'
export default {
    name: 'ShipboardEnrollmentOverview',
    components: {
        DocumentRequirments
    },
    data() {
        return {
            data: [],
            company: [],
            document: [],
            enrollment: [],
            deployment: [],
            documentAttachment: []
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
            this.data = response.data
            this.company = this.data.data.shipping_company
            this.documents = this.data.data.document_requirements
            this.deployment = this.data.data.deployment
            this.documentAttachment = this.data.data.document_attachments
        }).catch((error) => {
            console.log(error)
        })
    }
}
</script>