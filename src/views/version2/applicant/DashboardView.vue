<template>
    <!-- Cards -->
    <div class="row">
        <div class="col-md-6">
            <div class="card shadow-sm border-0 h-100">
                <div class="card-body d-flex align-items-center">
                    <div class="p-3 badge bg-primary text-white me-3">
                        <i class="bi bi-check2-circle fs-4"></i>
                    </div>
                    <div>
                        <p class="text-muted mb-0 small">Completed Stages</p>
                        <p class="fs-3 fw-bold mb-0">{{ completedStagesCount }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="card shadow-sm border-0 h-100">
                <div class="card-body d-flex align-items-center">
                    <div class="p-3 badge bg-warning text-white me-3">
                        <i class="bi bi-hourglass-split fs-4"></i>
                    </div>
                    <div>
                        <p class="text-muted mb-0 small">In Progress</p>
                        <p class="fs-3 fw-bold mb-0">{{ inProgressStagesCount }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Status Tracker Card -->
    <div class="card shadow border-0 mt-4">
        <div class="card-body p-4">
            <!-- Enrollment Tracker -->
            <!--  <div class="mb-5">
                <h2 class="fs-5 fw-semibold text-secondary border-bottom pb-3 mb-4">Enrollment Status Tracker</h2>
                <div class="d-flex align-items-start w-100">
                    <div v-for="(stage, key, index) in enrollmentProcessStages" :key="key" style="display: contents;">
                        <div class="text-center px-1" @click="!isLocked(key) && navigateTo(key)"
                            :class="{ 'cursor-pointer': !isLocked(key) }" style="flex: 1 1 80px;">
                            <div class="mx-auto rounded-circle d-flex align-items-center justify-content-center"
                                :class="getStepClass(key)" style="width: 2rem; height: 2rem;">
                                <i v-if="stages[key].status === 'complete'" class="bi bi-check-lg text-white"></i>
                                <i v-else
                                    :class="[stage.icon, stages[key].status === 'locked' ? 'text-secondary' : 'text-white']"></i>
                            </div>
                            <p class="fw-bold mt-2" :class="{ 'text-muted': isLocked(key) }"
                                style="font-size: 0.75rem;">{{ stage.shortTitle }}</p>
                        </div>
                        <div v-if="index < Object.keys(enrollmentProcessStages).length - 1"
                            class="flex-grow-1 bg-secondary-subtle" style="height: 4px; margin-top: 0.8rem;">
                            <div class="h-100" :class="{ 'bg-warning': stages[key].status === 'complete' }"
                                style="width: 100%;"></div>
                        </div>
                    </div>
                </div>
            </div> -->

            <!-- Admission Tracker -->
            <h2 class="fs-5 fw-semibold text-secondary border-bottom pb-3 mb-4">Admission Status
                Tracker</h2>
            <div class="d-flex align-items-start w-100">
                <div v-for="(stage, key) in admissionProcessStages" :key="key" style="display: contents;">
                    <div class="text-center px-1" @click="!isLocked(key) && navigateTo(stage.shortTitle)"
                        :class="{ 'cursor-pointer': !isLocked(key) }" style="flex: 1 1 80px;">
                        <div class="mx-auto rounded-circle d-flex align-items-center justify-content-center"
                            :class="getStepClass(stage.status)" style="width: 2rem; height: 2rem;">
                            <i v-if="stage.status === 'complete'" class="bi bi-check-lg text-white"></i>
                            <i v-else
                                :class="[stage.icon, stage.status === 'locked' ? 'text-secondary' : 'text-white']"></i>
                        </div>
                        <p class="fw-bold mt-2" :class="{ 'text-muted': isLocked(key) }" style="font-size: 0.75rem;">{{
                            stage.shortTitle }}</p>
                    </div>
                    <div v-if="(key + 1) < admissionProcessStages.length" class="flex-grow-1 bg-secondary-subtle"
                        style="height: 4px; margin-top: 0.8rem;">
                        <div class="h-100" :class="{ 'bg-warning': stage.status === 'complete' }" style="width: 100%;">
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-stage">
                <RegistrationCard v-if="'Registration' == activeStage" />
            </div>

        </div>
    </div>
</template>
<script>
import RegistrationCard from './admission/widgets/RegistrationCard.vue'

/* eslint-disable */
export default {
    name: 'ApplicantDashboardView',
    data() {
        const enrollmentItem = [
            { title: 'Enrollment Form', shortTitle: 'Enrollment Form', status: 'locked', url: 'student-layout.dashboard', icon: 'bi bi-card-list' },
            { title: 'View Assessment', shortTitle: 'Assessment', status: 'locked', url: 'student-layout.dashboard', icon: 'bi bi-calculator-fill' },
            { title: 'Tuition Payment', shortTitle: 'Tuition Fee', status: 'locked', url: 'student-layout.dashboard', icon: 'bi bi-wallet2' },
            { title: 'Confirmation', shortTitle: 'Confirm', status: 'locked', url: 'student-layout.dashboard', icon: 'bi bi-patch-check-fill' }
        ]
        return {
            completedStagesCount: 1,
            inProgressStagesCount: 0,
            admissionProcessStages: [],
            activeStage: 'Registration',
            enrollmentItem,

        }
    },
    components: {
        RegistrationCard
    },
    mounted() {
        this.admissionProcessStages = [
            { title: 'Registration', shortTitle: 'Registration', status: 'complete', icon: 'bi bi-person-plus-fill', url: 'student-layout.dashboard' },
            { title: 'Documentary Requirements', shortTitle: 'Documents', status: 'in_progress', files: [], icon: 'bi bi-file-earmark-text-fill', url: 'student-layout.dashboard' },
            { title: 'Entrance Exam Payment', shortTitle: 'Exam Fee', status: 'locked', icon: 'bi bi-cash-coin', url: 'student-layout.dashboard' },
            { title: 'Entrance Exam', shortTitle: 'Exam', status: 'locked', scheduled: false, permitReady: false, icon: 'bi bi-pencil-square', url: 'student-layout.dashboard' },
            { title: 'Pre-Enrollment Briefing', shortTitle: 'Briefing', status: 'locked', icon: 'bi bi-people-fill', url: 'student-layout.dashboard' },
            { title: 'Medical Examination', shortTitle: 'Medical', status: 'locked', files: [], icon: 'bi bi-heart-pulse-fill', url: 'student-layout.dashboard' }
        ]
    },
    methods: {
        getStepClass(status) {
            if (status === 'complete') return 'bg-primary'
            if (status === 'in_progress') return 'bg-info'
            return 'bg-secondary-subtle'
        },
        isLocked(key) {
            return this.admissionProcessStages[key].status === 'locked'
        },
        navigateTo(item) {
            this.activeStage = item
        }
    }
}
</script>