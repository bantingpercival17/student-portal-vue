<template>
    <div class="card p-4">
        <h3 class="h4 fw-bold mb-4 text-dark">Enrollment History</h3>
        <div class="table-responsive">
            <table class="table table-hover">
                <thead class="table-light">
                    <tr>
                        <th>Academic Year</th>
                        <th>Semester</th>
                        <th>Date Enrolled</th>
                        <th>Status</th>
                        <th class="text-end">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in historyList" :key="item.ay + item.semester">
                        <td>{{ item.academicYear }}</td>
                        <td>{{ item.semester }}</td>
                        <td>{{ item.enrollmentDate }}</td>
                        <td><span :class="colorStatus(item.status)">{{ item.status }}</span></td>
                        <td class="text-end">
                            <template v-if="item.status === 'Completed'">
                                <button class="btn btn-sm btn-outline-secondary me-2"
                                    @click="viewEnrollmentHistory(item.enrollment_id)">
                                    <i data-feather="eye" class="me-1" style="width:14px;"></i>View
                                </button>
                                <!-- <button class="btn btn-sm btn-outline-primary" @click="$root.downloadCertificate(item)">
                                    <i data-feather="download" class="me-1" style="width:14px;"></i>Download
                                </button> -->
                            </template>


                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div v-if="showEnrollmentHistoryModal" class="modal fade show d-block" tabindex="-1"
        @click.self="closeEnrollmentHistoryModal" style="background-color: rgba(0,0,0,0.5);">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Enrollment Details</h5>
                    <button type="button" class="btn-close" @click="closeEnrollmentHistoryModal"></button>
                </div>
                <div class="modal-body" v-if="historyItem">
                    <h6 class="fw-bold">{{ historyItem.academicYear }}</h6>
                    <p class="text-muted">Enrolled on: {{ historyItem.enrollmentDate }}</p>
                    <hr>
                    <h6 class="fw-bold">Subjects Enrolled</h6>
                    <ul class="list-group mb-3">
                        <li v-for="course in historyItem.subjectList" :key="course.code"
                            class="list-group-item d-flex justify-content-between">
                            <span><b>{{ course.code }}</b> : {{ course.name }}</span>
                            <span>{{ course.units }} units</span>
                        </li>
                    </ul>
                    <h6 class="fw-bold">Fee Assessment</h6>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary"
                        @click="closeEnrollmentHistoryModal">Close</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { EnrollmentApi } from '@/services/api/enrollmentApi'

export default {
    name: 'EnrollmentHistoryViewV2',
    props: {
        historyList: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            showEnrollmentHistoryModal: false,
            historyItem: []
        }
    },
    methods: {
        colorStatus(status) {
            return status === 'Completed' ? 'badge bg-success' : 'badge bg-info'
        },
        async viewEnrollmentHistory(item) {
            const enrollmentApi = new EnrollmentApi()
            const formData = new FormData()
            formData.append('enrollment', item)
            this.historyItem = await enrollmentApi.enrollmentAssessmentView(formData)
            this.showEnrollmentHistoryModal = true
        },
        closeEnrollmentHistoryModal() {
            this.showEnrollmentHistoryModal = false
            this.historyItem = []
        }
    }
}
</script>