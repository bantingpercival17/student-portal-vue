<template>
    <aside id="sidebar" :class="{ 'open': isSidebarOpenOnMobile }">
        <div class="d-flex align-items-center justify-content-center p-3 shadow-sm bg-dark-green">
            <img src="https://placehold.co/40x40/FFFFFF/15803d?text=BMA" alt="BMA Logo" class="rounded-circle">
            <span class="ms-3 fs-5 fw-bold">BMA Portal</span>
        </div>
        <nav class="p-3">
            <ul class="flex-column" style="list-style: none; padding: 0; margin: 0;">
                <!-- Dashboard -->
                <li class="nav-item">
                    <a href="#" @click.prevent="navigateTo('dashboard')" class="active sidebar-link">
                        <i class="bi bi-house-door-fill me-3"></i> Dashboard
                    </a>
                </li>

                <!-- Admission -->
                <div class="accordion accordion-flush" id="admissionAccordion">
                    <div class="accordion-item bg-transparent">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapseAdmission">
                                <i class="bi bi-journal-text me-3"></i> Admission
                            </button>
                        </h2>
                        <div id="collapseAdmission" class="accordion-collapse collapse"
                            data-bs-parent="#admissionAccordion">
                            <div class="accordion-body">
                                <ul class="flex-column" style="list-style: none; padding: 0; margin: 0;">
                                    <li class="nav-item" v-for="(stage, key) in admissionItem" :key="key">
                                        <router-link :to="stage.status === 'locked' ? '' : { name: stage.url }"
                                            :class="['sidebar-link', { active: checkRoute(stage.url), locked: stage.status === 'locked' }]"
                                            @click.prevent="stage.status === 'locked' && $event.preventDefault()">
                                            {{ stage.title }}
                                        </router-link>
                                        <!--   <a href="#" @click.prevent="!isLocked(key) && navigateTo(key)"
                                            class="sidebar-link"
                                            :class="{ 'active': currentView === key, 'locked': isLocked(key) }">

                                        </a> -->
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Enrollment -->
                <div class="accordion accordion-flush" id="enrollmentAccordion">
                    <div class="accordion-item bg-transparent">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapseEnrollment">
                                <i class="bi bi-check-circle-fill me-3"></i> Enrollment
                            </button>
                        </h2>
                        <div id="collapseEnrollment" class="accordion-collapse collapse"
                            data-bs-parent="#enrollmentAccordion">
                            <div class="accordion-body">
                                <ul class="flex-column" style="list-style: none; padding: 0; margin: 0;">
                                    <li class="nav-item" v-for="(stage, key) in enrollmentItem" :key="key">
                                        <router-link :to="stage.status === 'locked' ? '' : { name: stage.url }"
                                            :class="['sidebar-link', { active: checkRoute(stage.url), locked: stage.status === 'locked' }]"
                                            @click.prevent="stage.status === 'locked' && $event.preventDefault()">
                                            {{ stage.title }}
                                        </router-link>
                                        <!--   <a href="#" @click.prevent="!isLocked(key) && navigateTo(key)"
                                            class="sidebar-link"
                                            :class="{ 'active': currentView === key, 'locked': isLocked(key) }">

                                        </a> -->
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </ul>
        </nav>
    </aside>
    <!-- Mobile Sidebar Overlay -->
    <div v-if="isSidebarOpenOnMobile" @click="onToggleMobile"
        class="position-fixed top-0 start-0 w-100 h-100 bg-black opacity-50" style="z-index: 1030;"></div>
</template>
<script>
export default {
    name: 'SideNavBar',
    data() {
        return {
            currentView: null
        }
    },
    methods: {
        checkRoute(route) {
            if (this.$route.name === route) {
                return true
            }
            if (route.includes(this.$route.name)) {
                return true
            }
        },
        isLocked(key) {
            console.log(this.admissionItem[key].status)
            return this.admissionItem[key].status === 'locked'
        }
    },
    props: {
        isSidebarOpenOnMobile: Boolean,
        onToggleMobile: {
            type: Function
        },
        onToggleDesktop: {
            type: Function
        },
        admissionItem: Object,
        enrollmentItem: Object
    }
}
</script>