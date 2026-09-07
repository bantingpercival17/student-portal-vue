<template>
    <aside class="sidebar-student d-flex flex-column" :class="{ 'is-open': isOpen }">
        <div class="p-4 d-flex align-items-center justify-content-between border-bottom flex-shrink-0"
            style="border-color: rgba(255,255,255,0.1) !important;">
            <div class="d-flex align-items-center">
                <img :src="logo" alt="BMA Logo" style="height: 40px; width: 40px;" class="me-2"
                    onerror="this.onerror=null;this.src='https://placehold.co/40x40/FFFFFF/0d47a1?text=BMA';">
                <h1 class="fs-5 fw-bold mb-0 text-white">Student Portal</h1>
            </div>
            <button class="btn btn-close btn-close-white d-lg-none" @click="$emit('close-sidebar')"></button>
        </div>

        <!-- Student Profile Section -->
        <div class="p-3 text-center sidebar-profile flex-shrink-0">
            <img :src="userImage" alt="Student Avatar" class="rounded-circle mb-2"
                style="width: 80px; height: 80px; border: 3px solid #DAA520;">
            <h6 class="fw-bold mb-0 text-white">{{ userName }}</h6>
            <p class="small text-white-50 mb-2">{{ studentNumber }}</p>
            <div class="d-flex justify-content-center gap-2">
                <button class="btn btn-sm btn-outline-light d-flex align-items-center" @click.prevent="openStudentID">
                    <i data-feather="credit-card" class="me-1" style="width:16px;"></i> ID
                </button>
                <button class="btn btn-sm btn-outline-light d-flex align-items-center"
                    @click.prevent="openModalAndClose('showQrModal')">
                    <i data-feather="grid" class="me-1" style="width:16px;"></i> QR
                </button>
            </div>
        </div>

        <nav class="flex-grow-1 p-3">
            <ul class="nav flex-column">
                <li v-for="item in navItems" :key="item.id" class="nav-item">
                    <a class="nav-link" :class="{ 'active': activeTab === item.id }"
                        @click.prevent="navigateAndClose(item.id, item.link)">
                        <i :data-feather="item.icon" class="me-3"></i>{{ item.name }}
                    </a>
                </li>
            </ul>
        </nav>
    </aside>
    <div v-if="idModal" class="modal fade show d-block" tabindex="-1" style="background-color: rgba(0,0,0,0.5);"
        @click.self="idModal = false">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content border-0" style="background: transparent;">
                <div class="modal-body p-0">
                    <!-- Container sets the width of the card -->
                    <template v-if="!idModalLoader">
                        <div class="id-card-container" :class="{ 'is-flipped': isFlipped }"
                            @click="isFlipped = !isFlipped" style="cursor: pointer; max-width: 280px; margin: auto;">
                            <!-- 'aspect-ratio' is swapped to create a portrait orientation -->
                            <div class="id-card-inner" style="aspect-ratio: 54 / 85.6;">
                                <!-- Front of ID -->
                                <div class="id-card-front card shadow-lg d-flex flex-column">
                                    <div class="card-body text-center p-2" style="margin-top: 50%;">
                                        <img :src="studentID.picture" class=" p-1 mb-3"
                                            style="width: 130px; height: 130px;">
                                        <h6 class="card-title fw-bold mt-2 mb-1">{{ studentID.name }}</h6>
                                        <div
                                            style="text-align: start; padding: 0; margin: 0px; margin-top:-2px; margin-left: 150px; font-size: 10px;">
                                            <span class="fw-bold">{{ studentID.studentNumber }}</span> <br>
                                            <span class="fw-bold">{{ studentID.academicYear }}</span><br>
                                            <span class="fw-bold">{{ studentID.batchName }}</span>
                                        </div>
                                        <img :src="studentID.signature" class="" style="height:  45px;">
                                    </div>
                                    <div class="card-footer text-center small p-0 m-0 text-muted">
                                        <p class="fw-bold" style="font-size: 1rem;color:white;">
                                            {{ studentID.course }}
                                        </p>
                                    </div>
                                </div>
                                <!-- Back of ID -->
                                <div class="id-card-back card shadow-lg d-flex flex-column  text-center">
                                    <div class="card-body p-3 flex-grow-1">
                                        <div style=" padding: 0; margin: 0px; margin-top:25px;  font-size: 10px;">
                                            <span class="fw-bold">{{ studentID.parentName }}</span> <br>
                                            <span class="fw-bold">{{ studentID.contactNumber }}</span><br>
                                            <span class="fw-bold">{{ studentID.address }}</span>
                                        </div>
                                        <img :src="studentID.qrCode" alt="QR Code"
                                            style="margin-top: 150px; height: 110px;">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                    <template v-else>
                        <div class="card">
                            <div class="card-body">
                                <div class="d-flex flex-column align-items-center mt-4">
                                    <div class="spinner-border text-primary mb-3" role="status">
                                        <span class="visually-hidden">Loading...</span>
                                    </div>
                                    <p class="text-muted">
                                        Take a few moments. Please wait.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
    <div v-if="qrModal" class="modal fade show d-block" tabindex="-1" style="background-color: rgba(0,0,0,0.5);"
        @click.self="$emit('close')">
        <div class="modal-dialog modal-dialog-centered modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Student QR Code</h5>
                    <button type="button" class="btn-close" @click="$emit('close')"></button>
                </div>
                <div class="modal-body text-center p-4">
                    <!--    <img :src="images.qr" alt="QR Code" class="img-fluid">
                    <h6 class="mt-3 mb-0">{{ student.name }}</h6>
                    <p class="mt-1 small text-muted">{{ student.id }}<br>Scan for verification</p> -->
                </div>
            </div>
        </div>
    </div>
</template>
<style>
.id-card-front {
    font-family: 'Poppins', sans-serif;
    background-image: url('/public/id-layout/front.png');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
}

.id-card-back {
    font-family: 'Poppins', sans-serif;
    background-image: url('/public/id-layout/back.png');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
}
</style>
<script>
import logoImage from '@/assets/resources/image/bma-logo-1.png'
import defaultAvatar from '@/assets/resources/image/midship-man.jpg'
import feather from 'feather-icons'
import { GET_USER_NAME, GET_USER_IMAGE, GET_STUDENT_NUMBER } from '@/store/storeConstants'
import { mapGetters } from 'vuex'
import { StudentApi } from '@/services/api/studentApi'
import QRCode from 'qrcode'
export default {
    name: 'SideNavigation',
    props: {
        isOpen: Boolean
    },
    data() {
        return {
            logo: logoImage,
            avatar: defaultAvatar,
            student: {
                id: 'STU2023001',
                name: 'John Doe'
            },
            navItems: [
                { id: 'Dashboard', name: 'Dashboard', icon: 'grid', link: 'student-layout-v2.dashboard' },
                { id: 'Enrollment', name: 'Enrollment', icon: 'file-text', link: 'student-layout-v2.enrollment' },
                /* { id: 'studies', name: 'Program of Studies', icon: 'book-open', link: 'student-layout-v2.dashboard' }, */
                { id: 'Account Card', name: 'Account Card', icon: 'credit-card', link: 'student-layout-v2.account-card' },
                { id: 'Student Grades', name: 'Grades', icon: 'award', link: 'student-layout-v2.grades' },
                /*  { id: 'lms', name: 'LMS', icon: 'monitor', link: 'student-layout-v2.dashboard' }, */
                { id: 'onboard', name: 'Onboard Training', icon: 'anchor', link: 'student-layout-v2.onboard-training' },
                { id: 'e-library', name: 'E-Library', icon: 'book', link: 'student-layout-v2.dashboard' }
            ],
            activeTab: 'dashboard',
            isFlipped: false,
            idModal: false,
            idModalLoader: true,
            qrModal: false,
            studentID: {
                name: 'StudentName',
                studentNumber: '23128',
                academicYear: '2024-2025',
                batchName: 'Batch Name',
                course: 'BS MARINE TRANSPORTATION',
                signature: 'http://one.bma.edu.ph/assets/image/student-signature/23128.png',
                picture: 'http://one.bma.edu.ph/assets/image/student-profile/23128.png',
                qrCode: '',
                parentName: '',
                contactNumber: '',
                address: ''
            }
        }
    },
    computed: {
        ...mapGetters('auth', {
            userName: GET_USER_NAME,
            userImage: GET_USER_IMAGE,
            studentNumber: GET_STUDENT_NUMBER
        })
    },
    mounted() {
        this.activeTab = this.$route.meta.name
        console.log(this.activeTab)
        feather.replace()
    },
    updated() {
        feather.replace() // ensures icons update after DOM changes
    },
    emits: ['close-sidebar'],
    methods: {
        navigateAndClose(tabId, link) {
            this.activeTab = tabId
            this.$emit('navigate', tabId)
            this.$emit('close-sidebar')
            this.$router.push({ name: link })
        },
        openModalAndClose(modalName) {
            this.$emit('open-modal', modalName)
            this.$emit('close-sidebar')
        },
        async openStudentID() {
            this.idModal = true
            const studentApi = new StudentApi()
            this.studentID = await studentApi.studentIdDetails()
            if (this.studentID) {
                this.studentID.qrCode = await QRCode.toDataURL(this.studentID.qrNumber, {
                    width: 300,
                    margin: 2,
                    errorCorrectionLevel: 'H'
                })
                this.idModalLoader = false
            }
        }
    }
}
</script>