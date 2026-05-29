<template>
    <!-- Status Tracker Card -->
    <div class="card shadow border-0 mt-4">
        <div class="card-body p-4">
            <h2 class="fs-5 fw-semibold text-secondary border-bottom pb-3 mb-4">
                Admission Status Tracker
            </h2>
            <template v-if="!isLoading">
                <div class="d-flex align-items-start w-100">
                    <div v-for="(stage, key) in admissionProcessStages" :key="key" style="display: contents;">
                        <div class="text-center px-1" @click="navigateTo(stage.shortTitle)"
                            :class="{ 'cursor-pointer': !isLocked(key) }" style="flex: 1 1 80px;">
                            <div class="mx-auto rounded-circle d-flex align-items-center justify-content-center"
                                :class="getStepClass(stage.status)" style="width: 2rem; height: 2rem;">
                                <i v-if="stage.status === 'complete'" class="bi bi-check-lg text-white"></i>
                                <i v-else
                                    :class="[stage.icon, stage.status === 'locked' ? 'text-secondary' : 'text-white']"></i>
                            </div>
                            <p class="fw-bold mt-2" :class="{ 'text-muted': isLocked(key) }"
                                style="font-size: 0.75rem;">{{
                                    stage.title }}</p>
                        </div>
                        <div v-if="(key + 1) < admissionProcessStages.length" class="flex-grow-1 bg-secondary-subtle"
                            style="height: 4px; margin-top: 0.8rem;">
                            <div class="h-100" :class="{ 'bg-warning': stage.status === 'complete' }"
                                style="width: 100%;">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-stage">
                    <RegistrationCard v-if="'Registration' == activeStage" :registration="information" />
                    <DocumentUploadCard v-if="'Documents' == activeStage"
                        :documentList="documentList.listOfDocuments" />

                </div>

            </template>
            <template v-else>
                <div class="page-loader text-center">
                    <div class="card">
                        <div class="card-body align-center text-center">
                            <div class="enrollment-loader"></div>
                        </div>
                    </div>
                </div>
            </template>

        </div>
    </div>
    <ExaminationCard v-if="'Exam' == activeStage" :examinationData="examination" />
    <PreBriefingCard v-if="'Briefing' == activeStage" :examinationData="examination" @medical="handleMedicalClick" />
    <MedicalExaminationCard v-if="'Medical' == activeStage" :medical="medicalInfo"
        @enrollment="handleEnrollmentClick" />
    <EnrollmentView v-if="'Enrollment' == activeStage" />
</template>
<script>
/* eslint-disable */
import { ApplicantAdmissionApi } from '@/services/api/ApplicantApi/admissionApi'
import RegistrationCard from './admission/widgets/RegistrationCard.vue'
import DocumentUploadCard from './admission/DocumentUploadCard.vue';
import ExaminationCard from './admission/ExaminationCard.vue';
import PreBriefingCard from './admission/PreBriefingCard.vue';
import MedicalExaminationCard from './admission/MedicalExaminationCard.vue';
import STAGE_CONFIG from '@/data/userAdmissionStage';
import EnrollmentView from './EnrollmentView.vue';
export default {
    name: 'ApplicantDashboardView',
    data() {
        return {
            isLoading: true,
            activeStage: 'Registration',
            admissionInformation: null,
            information: {
                basicInfo: {},
                applications: null
            },
            documentList: {},
            examination: {},
            medicalInfo: {}
        }
    },
    components: {
        RegistrationCard, DocumentUploadCard, ExaminationCard, PreBriefingCard, MedicalExaminationCard, EnrollmentView
    },
    computed: {
        admissionProcessStages() {
            const stages = {
                Registration: !!this.admissionInformation?.applicantInfo,
                Documents: this.documentList?.approvedDocuments === 1,
                Exam: this.examination?.examination_result_v2?.result === 1,
                Briefing: !!this.medicalInfo,
                Medical: !!this.medicalInfo
            }

            return STAGE_CONFIG.map((stage, index) => {
                const values = Object.values(stages)

                let status = 'locked'

                if (index === 0 || values[index - 1]) {
                    status = values[index]
                        ? stage.key === 'Medical'
                            ? 'in_progress'
                            : 'complete'
                        : 'in_progress'
                }

                return {
                    ...stage,
                    shortTitle: stage.key,
                    status,
                    url: 'student-layout.dashboard'
                }
            })
        }
    },
    async mounted() {
        this.fetchData()
    },
    methods: {
        async fetchData() {
            try {
                const admissionApi = new ApplicantAdmissionApi()

                const admissionInformation = await admissionApi.admissionDetails()
                this.admissionInformation = admissionInformation
                if (!admissionInformation.applicantInfo) {
                    return
                }
                this.information = {
                    basicInfo: admissionInformation.application,
                    applications: admissionInformation.applicantInfo
                }
                this.documentList = admissionInformation.documents || {}
                this.examination = admissionInformation.examination?.examinationDetails || {}
                this.medicalInfo = admissionInformation.medical || {}
                this.setActiveStage()

            } finally {
                this.isLoading = false
            }
        },
        setActiveStage() {
            const currentStage =
                this.admissionProcessStages.find(
                    stage => stage.status === 'in_progress'
                )

            if (currentStage) {
                this.activeStage = currentStage.shortTitle
            }
        },

        getStepClass(status) {
            if (status === 'complete') return 'bg-success'
            if (status === 'in_progress') return 'bg-info'

            return 'bg-secondary-subtle'
        },

        isLocked(key) {
            return this.admissionProcessStages[key]
                ?.status === 'locked'
        },

        navigateTo(item) {
            const stage =
                this.admissionProcessStages.find(
                    s => s.shortTitle === item
                )

            if (stage?.status !== 'locked') {
                this.activeStage = item
            }
        },

        handleMedicalClick() {
            this.activeStage = 'Medical'
        },
        handleEnrollmentClick() {
            this.activeStage = 'Enrollment'
        }
    }
}
</script>
<style>
.page-loader {
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    /* dark background */
}

.enrollment-loader {
    width: 60px;
    height: 60px;
    border: 6px solid rgba(255, 255, 255, 0.2);
    border-top-color: #38bdf8;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
</style>