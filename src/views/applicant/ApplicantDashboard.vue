<template>
    <div v-if="isLoading">
        <h3>LOADING</h3>
    </div>
    <div v-else>
        <label for="" class="display-6 text-primary">Welcome <span class="fw-bolder">{{ applicantName }}!</span></label>
        <p>Applicant Number: <span class="badge bg-primary">{{ applicantNumber }}</span></p>
        <div class="overview-panels">

            <div class="iq-timeline0 m-0 d-flex align-items-center justify-content-between position-relative">
                <ul class="list-inline p-0 m-0 w-100">
                    <!--  <li>
                        <PreRegistration :propsApplicantDetails="applicantDetails" />
                    </li> -->
                    <li>
                        <ApplicantInformation :propsApplicantDetails="applicantDetails" :token="token" />
                    </li>
                    <li>
                        <DocumementsRequirements :propsApplicantDetails="applicantDetails" :documents="documents"
                            :token="token" />
                    </li>
                    <li>
                        <ExaminationPayment :propsApplicantDetails="applicantDetails" :documents="documents"
                            :examination="examination" :alumnia="alumnia" :token="token" :survey="survey" />
                    </li>
                    <li>
                        <EntranceExamination :propsApplicantDetails="applicantDetails" :documents="documents"
                            :examination="examination" :alumnia="alumnia" :token="token" />
                    </li>
                    <!--  <li>
                        <BriefingOrientation :propsApplicantDetails="applicantDetails" :documents="documents"
                            :examination="examination" :orientation="orientation" :token="token" />
                    </li> -->
                    <li>
                        <MedicalExamination :propsApplicantDetails="applicantDetails" :documents="documents"
                            :examination="examination" :alumnia="alumnia" :orientation="orientation" :medical="medical"
                            :token="token" />
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import { GET_USER_TOKEN, IS_USER_AUTHENTICATE_GETTER } from '@/store/storeConstants'
import { mapGetters } from 'vuex'
import axios from 'axios'
/* import PreRegistration from './entrance-examination-overview/PreRegistration.vue' */
import ApplicantInformation from './entrance-examination-overview/ApplicantInformation.vue'
import DocumementsRequirements from './entrance-examination-overview/DocumentsRequirements.vue'
import ExaminationPayment from './entrance-examination-overview/EntranceExaminationPayment.vue'
import EntranceExamination from './entrance-examination-overview/EntranceExamination.vue'
/* import BriefingOrientation from './entrance-examination-overview/BriefingOrientation.vue' */
import MedicalExamination from './entrance-examination-overview/MedicalExamination.vue'
export default {
    name: 'ApplicantDasboard',
    data() {
        return {
            isLoading: true,
            applicantName: '',
            applicantNumber: '',
            applicantDetails: [],
            documents: [],
            examination: [],
            orientation: [],
            alumnia: [],
            medical: [],
            survey: []
        }
    },
    components: {
        /* PreRegistration, */
        ApplicantInformation,
        DocumementsRequirements,
        ExaminationPayment,
        EntranceExamination,
        MedicalExamination
    },
    computed: {
        ...mapGetters('auth', {
            token: GET_USER_TOKEN,
            isAuth: IS_USER_AUTHENTICATE_GETTER
        })
    },
    mounted() {
        axios.get('applicant/information', {
            headers: {
                Authorization: 'Bearer ' + this.token
            }
        }).then((response) => {
            this.data = response.data.data
            this.applicantName = this.data.name
            this.applicantNumber = this.data.applicant_number
            this.applicantDetails = this.data
            this.documents = response.data.documents
            this.examination = response.data.examination
            this.orientation = response.data.orientation
            this.alumnia = response.data.alumnia
            this.medical = response.data.medical
            this.survey = response.data.survey
            this.isLoading = false
        }).catch((error) => {
            console.log(error)
        })
    }

}
</script>