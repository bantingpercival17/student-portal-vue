<template>
    <!-- Sidebar Navigation -->
    <SideBarNavigation :isSidebarOpenOnMobile="isSidebarOpenOnMobile" :onToggleMobile="toggleSidebar"
        :onToggleDesktop="toggleSidebarDesktop" :admissionItem="admissionItem" :enrollmentItem="enrollmentItem" />

    <!-- Main Content -->
    <div id="main-content-wrapper" :class="{ 'sidebar-hidden': isSidebarHidden }">
        <NavigationHeader :onToggleMobile="toggleSidebar" :onToggleDesktop="toggleSidebarDesktop" />
        <main class="flex-grow-1 p-3">
            <div class="view">
                <router-view />
            </div>
        </main>
    </div>

</template>
<script>
import NavigationHeader from './NavigationHeader.vue'
import SideBarNavigation from './SideBarNavigation.vue'

export default {
    name: 'ApplicantMainLayout',
    data() {
        const admissionItem = [
            { title: 'Registration', shortTitle: 'Registration', category: 'admission', status: 'complete', icon: 'bi bi-person-plus-fill', url: 'student-layout.dashboard' },
            { title: 'Documentary Requirements', shortTitle: 'Documents', category: 'admission', status: 'in_progress', files: [], icon: 'bi bi-file-earmark-text-fill', url: 'student-layout.dashboard' },
            { title: 'Entrance Exam Payment', shortTitle: 'Exam Fee', category: 'admission', status: 'locked', icon: 'bi bi-cash-coin', url: 'student-layout.dashboard' },
            { title: 'Entrance Exam', shortTitle: 'Exam', category: 'admission', status: 'locked', scheduled: false, permitReady: false, icon: 'bi bi-pencil-square', url: 'student-layout.dashboard' },
            { title: 'Pre-Enrollment Briefing', shortTitle: 'Briefing', category: 'admission', status: 'locked', icon: 'bi bi-people-fill', url: 'student-layout.dashboard' },
            { title: 'Medical Examination', shortTitle: 'Medical', category: 'admission', status: 'locked', files: [], icon: 'bi bi-heart-pulse-fill', url: 'student-layout.dashboard' }
        ]
        const enrollmentItem = [
            { title: 'Enrollment Form', shortTitle: 'Enrollment Form', category: 'enrollment', status: 'locked', url: 'student-layout.dashboard', icon: 'bi bi-card-list' },
            { title: 'View Assessment', shortTitle: 'Assessment', category: 'enrollment', status: 'locked', url: 'student-layout.dashboard', icon: 'bi bi-calculator-fill' },
            { title: 'Tuition Payment', shortTitle: 'Tuition Fee', category: 'enrollment', status: 'locked', url: 'student-layout.dashboard', icon: 'bi bi-wallet2' },
            { title: 'Confirmation', shortTitle: 'Confirm', category: 'enrollment', status: 'locked', url: 'student-layout.dashboard', icon: 'bi bi-patch-check-fill' }
        ]
        return {
            isSidebarHidden: false,
            isSidebarOpenOnMobile: false,
            admissionItem,
            enrollmentItem
        }
    },
    components: {
        SideBarNavigation,
        NavigationHeader
    },
    methods: {
        toggleSidebar() {
            console.log('Desktop Mobile' + this.isSidebarOpenOnMobile)
            this.isSidebarOpenOnMobile = !this.isSidebarOpenOnMobile
        },
        toggleSidebarDesktop() {
            console.log('Desktop' + this.isSidebarHidden)
            this.isSidebarHidden = !this.isSidebarHidden
        }
    }
}
</script>
<style>
body {
    font-family: 'Inter', sans-serif;
    background-color: #f8f9fa;
    font-size: 0.95rem;
    /* Make base font a bit smaller */
}

#app {
    display: flex;
    min-height: 100vh;
}

#sidebar {
    width: 250px;
    background-color: #0c4a2b;
    /* Dark Green */
    transition: transform 0.3s ease;
    color: #f8f9fa;
}

#main-content-wrapper {
    flex: 1;
    transition: padding-left 0.3s ease;
    /* padding-left: 250px; */
    min-width: 0;
    /* Prevents flexbox overflow */
}

@media (max-width: 992px) {
    #sidebar {
        transform: translateX(-100%);
        position: fixed;
        height: 100%;
        z-index: 1040;
    }

    #sidebar.open {
        transform: translateX(0);
    }

    #main-content-wrapper {
        padding-left: 0;
    }
}

.sidebar-hidden #sidebar {
    transform: translateX(-100%);
}

.sidebar-hidden #main-content-wrapper {
    padding-left: 0;
}

.view {
    animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.bg-dark-green {
    background-color: #0c4a2b !important;
}

.text-golden-yellow {
    color: #ffc107 !important;
}

.btn-golden-yellow {
    background-color: #ffc107;
    border-color: #ffc107;
    color: #212529;
}

.btn-golden-yellow:hover {
    background-color: #e0a800;
    border-color: #d39e00;
}

.sidebar-link {
    display: flex;
    align-items: center;
    padding: 0.75rem 1rem;
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    border-radius: 0.375rem;
    transition: background-color 0.2s;
}

.sidebar-link:hover {
    background-color: #1a5d3b;
    color: #fff;
}

.sidebar-link.active {
    background-color: #1a5d3b;
    font-weight: 600;
    color: #fff;
}

.sidebar-link.locked {
    color: rgba(255, 255, 255, 0.4);
    cursor: not-allowed;
}

.sidebar-link.locked:hover {
    background-color: transparent;
}

.accordion-button {
    background: none !important;
    color: rgba(255, 255, 255, 0.8) !important;
    font-size: 0.875rem;
    font-weight: 500;
    padding: 0.75rem 1rem;
    border: none !important;
}

.accordion-button:focus {
    box-shadow: none;
}

.accordion-button:not(.collapsed) {
    background-color: #1a5d3b !important;
    color: #fff !important;
}

.accordion-body {
    padding: 0 0 0 1.5rem;
}

.cursor-pointer {
    cursor: pointer;
}

.form-control:disabled {
    background-color: #e9ecef;
    opacity: 1;
}
</style>