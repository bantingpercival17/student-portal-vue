<template>
    <div v-if="!contentLoading" class="container my-4">
        <div class="card border border-light-subtle rounded-4 p-4 shadow-sm bg-white">
            <div class="d-flex flex-column flex-sm-row align-items-center align-items-sm-start gap-4">
                <div class=" text-sm-start flex-grow-1">
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="">
                            <h3 id="profile-full-name" class="h4 fw-bolder text-dark mt-1 mb-0">{{ userName }}</h3>
                            <p id="profile-course-title" class="text-warning fw-bold mb-3" style="font-size: 13px;">
                                {{ shipboardInformation?.course || 'Course not provided' }}
                            </p>
                        </div>
                        <a class="btn btn-outline-primary px-1 py-0" style="font-size:16px;" href="#"
                            @click.prevent="openEditProfileModal">

                            <i data-feather="edit-3" style="width:16px; height:16px;"></i>
                        </a>
                    </div>

                    <div class="row g-2 text-muted" style="font-size: 12px;">
                        <div class="col-12 col-sm-6 col-md-4">
                            Student No:
                            <strong id="profile-student-id" class="text-dark fw-semibold">{{ studentNumber }}</strong>
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            Phone:
                            <strong id="profile-phone" class="text-dark fw-semibold">
                                {{ shipboardInformation?.contactNumber || 'Not provided' }}
                            </strong>
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            Email: <strong id="profile-email" class="text-dark fw-semibold">
                                {{ shipboardInformation?.email || 'Not provided' }}
                            </strong>
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            SRN (MISMO ACCOUNT):
                            <strong id="profile-srn" class="text-dark fw-semibold">{{ shipboardInformation?.srn ||
                                'Not provided'
                                }}</strong>
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            TRB No:
                            <strong id="profile-trb-no" class="text-dark fw-semibold">{{ shipboardInformation?.trbNo ?
                                shipboardInformation?.trbNo : 'Not provided'
                                }}</strong>
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            Facebook: <a v-if="shipboardInformation?.facebook" class="badge bg-success"
                                :href="shipboardInformation?.facebook" target="_blank">
                                <strong>Open Facebook</strong>
                            </a>

                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div class="nav-scroller mt-2">
            <ul class="nav nav-tabs mb-4 tabs-container">
                <li class="nav-item" v-for="tab in onboardTabs" :key="tab.id">
                    <a class="nav-link d-flex align-items-center" :class="{ active: activeOnboardTab === tab.id }"
                        href="#" @click.prevent="changeTab(tab.id)">
                        <i :data-feather="tab.icon" class="me-2"></i>{{ tab.name }}
                    </a>
                </li>
            </ul>
        </div>
        <div class="card border border-light-subtle rounded-4 p-2 shadow-sm bg-white">
            <div class="tab-content">
                <div v-show="activeOnboardTab === 'requirements'">
                    <PreDocumentsCard :documentList="documentList" />
                </div>
                <div id="enrollment" v-show="activeOnboardTab === 'enrollment'">
                    <OnboardEnrollmentCard :enrollmentData="enrollmentDetails" />
                </div>
                <div v-show="activeOnboardTab === 'mopm'">
                    <MonthlyMonitoringCard :monthlyMonitoring="monthlyMonitoring"
                        :vesselApplication="enrollmentDetails?.shipboardApplication" />
                </div>
                <div v-show="activeOnboardTab === 'assessment'">
                    <p>Comprehensive Assessment content goes here...</p>
                </div>
            </div>
        </div>
    </div>
    <div v-else class="d-flex justify-content-center align-items-center" style="height: 300px;">
        <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
    <button class="btn btn-success btn-lg rounded-circle shadow-lg help-fab">
        <i data-feather="help-circle" style="width:20px; height:20px;"></i>
    </button>
    <EditProfileModal v-if="modalProfile" v-model="modalProfile" :profileData="shipboardInformation"
        @update="updateDetails" />
</template>
<style scoped>
.tabs-container {
    max-width: 100%;
    overflow-y: hidden;
    overflow-x: auto;

    -webkit-overflow-scrolling: touch;
}

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
<script>
import { StudentApi } from '@/services/api/studentApi'
import { GET_USER_NAME, GET_USER_IMAGE, GET_STUDENT_NUMBER } from '@/store/storeConstants'
import { mapGetters } from 'vuex'
import feather from 'feather-icons'
import EditProfileModal from './onboard-training/EditProfileModal.vue'
import PreDocumentsCard from './onboard-training/PreDocumentsCard.vue'
import { alertSuccess } from '@/utils/alert.js'
import OnboardEnrollmentCard from './onboard-training/OnboardEnrollmentCard.vue'
import MonthlyMonitoringCard from './onboard-training/MonthlyMonitoringCard.vue'
import { setCache, getCache } from '@/utils/cache.js'
export default {
    name: 'OnboardTrainingView',
    data() {
        return {
            contentLoading: true,
            studentApi: new StudentApi(),
            shipboardInformation: null,
            modalProfile: false,
            activeOnboardTab: 'requirements',
            onboardTabs: [
                { id: 'requirements', name: 'Pre-Onboard Requirements', icon: 'clipboard' },
                { id: 'enrollment', name: 'Enrollment', icon: 'file-plus' },
                { id: 'mopm', name: 'MOPM', icon: 'calendar' },
                { id: 'assessment', name: 'OBT Assessment', icon: 'check-square' },
                { id: 'so-filing', name: 'SO Filing', icon: 'clipboard' }
            ],
            documentList: [],
            enrollmentDetails: [],
            monthlyMonitoring: []
        }
    },
    components: {
        EditProfileModal, PreDocumentsCard, OnboardEnrollmentCard, MonthlyMonitoringCard
    },
    computed: {
        ...mapGetters('auth', {
            userName: GET_USER_NAME,
            userImage: GET_USER_IMAGE,
            studentNumber: GET_STUDENT_NUMBER
        })
    },
    async mounted() {
        await this.fetchData()
        feather.replace()
        this.enrollmentTab()
        if (getCache('activeOnboardTab')) {
            const cache = getCache('activeOnboardTab')
            this.activeOnboardTab = cache.tab
        }
    },
    updated() {
        feather.replace() // ensures icons update after DOM changes
    },
    methods: {
        changeTab(data) {
            this.activeOnboardTab = data
            setCache('activeOnboardTab', { tab: this.activeOnboardTab }, (60 * 1500))
        },
        enrollmentTab() {
            const hash = window.location.hash
            const parts = hash.split('#')
            if (parts.length > 2) {
                if (parts[2] === 'enrollment') {
                    this.activeOnboardTab = 'enrollment'
                }
                if (parts[2] === 'enrollment') {
                    this.activeOnboardTab = 'mopm'
                }
                switch (parts[2]) {
                    case 'enrollment':
                        this.activeOnboardTab = 'enrollment'

                        break
                    case 'monthly-monitoring':
                        this.activeOnboardTab = 'mopm'
                        break
                    default:
                        break
                }
                console.log(this.activeOnboardTab)
            }
        },
        async fetchData() {
            this.contentLoading = true
            const response = await this.studentApi.studentOnboardTraining()
            if (response) {
                this.shipboardInformation = response.profile
                if (this.shipboardInformation) {
                    const { srn, trbNo, facebook } = this.shipboardInformation
                    if (
                        srn == null ||
                        trbNo == null ||
                        facebook == null
                    ) {
                        this.modalProfile = true
                    }
                }
                this.documentList = response.documentList
                this.enrollmentDetails = response.enrollment
                this.monthlyMonitoring = response.monthlyMonitoring
                this.contentLoading = false
            }
        },
        openEditProfileModal() {
            // Logic to open the edit profile modal
            this.modalProfile = true
        },
        async updateDetails(data) {
            this.contentLoading = true
            const response = await this.studentApi.updateOnboardDetails(data)
            if (response) {
                this.fetchData()
                alertSuccess('Successfully Updated')
            }
        }
    }
}
</script>