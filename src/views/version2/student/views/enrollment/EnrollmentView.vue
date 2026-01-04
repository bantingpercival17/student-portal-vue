<template>
    <div class="d-flex flex-column gap-4">
        <EnrollmentProcess />
        <EnrollmentHistoryView :historyList="enrollmentList" />
    </div>
</template>
<script>
import { EnrollmentApi } from '@/services/api/enrollmentApi'
import EnrollmentHistoryView from '@/views/version2/student/views/enrollment/widgets/EnrollmentHistory.vue'
import EnrollmentProcess from './widgets/EnrollmentProcess.vue'
export default {
    name: 'EnrollmentView',
    components: {
        EnrollmentHistoryView, EnrollmentProcess
    },
    data() {
        return {
            enrollmentList: []
        }
    },
    async mounted() {
        const enrollmentApi = new EnrollmentApi()
        // Fetch enrollment history data when the component is mounted
        this.enrollmentList = await enrollmentApi.fetchEnrollmentData()
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