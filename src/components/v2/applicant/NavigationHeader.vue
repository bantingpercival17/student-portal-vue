<template>
    <header class="bg-white shadow-sm w-100">
        <div class="d-flex align-items-center justify-content-between mx-auto px-3" style="height: 4.5rem;">
            <button @click="onToggleMobile" class="btn btn-light btn-sm d-lg-none">
                <i class="bi bi-list"></i>
            </button>
            <!--  <button @click="onToggleDesktop" class="btn btn-light d-none d-lg-block">
                <i class="bi bi-list"></i>
            </button>
 -->
            <h1 class="fs-5 fw-semibold text-secondary mb-0 mx-3">{{ currentViewTitle }}</h1>

            <div class="d-flex align-items-center ms-auto">
                <!-- Notifications -->
                <div class="dropdown">
                    <button @click="markNotificationsAsRead"
                        class="btn btn-sm btn-light position-relative d-none d-lg-block" type="button"
                        data-bs-toggle="dropdown">
                        <i class="bi bi-bell-fill"></i>
                        <span v-if="unreadNotificationCount > 0"
                            class="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle"></span>
                    </button>
                    <div class="dropdown-menu dropdown-menu-end p-0" style="width: 320px;">
                        <div class="p-2 fw-bold small text-secondary border-bottom">Notifications</div>
                        <ul class="list-unstyled mb-0" style="max-height: 400px; overflow-y: auto;">
                            <li v-for="n in notifications" :key="n.id">
                                <a class="dropdown-item d-flex flex-column" href="#">
                                    <span class="small">{{ n.message }}</span>
                                    <span class="text-muted" style="font-size: 0.7rem;">{{ n.timestamp.toLocaleString()
                                        }}</span>
                                </a>
                            </li>
                            <li v-if="notifications.length === 0" class="text-center text-muted p-3 small">No new
                                notifications.</li>
                        </ul>
                    </div>
                </div>

                <!-- Profile -->
                <div class="dropdown ms-3">
                    <button class="btn d-flex align-items-center" type="button" data-bs-toggle="dropdown">
                        <div class="text-end">
                            <div class="fw-bolder small text-black">{{ name }}</div>
                              <div class="text-muted" style="font-size: 0.7rem;">ID: {{ applicant.id }}</div>
                        </div>
                        <i class="bi bi-chevron-down ms-2 text-muted"></i>
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end">
                        <li><a class="dropdown-item" href="#" @click.prevent="navigateTo('account-settings')">Account
                                Settings</a></li>
                        <li><a class="dropdown-item"  @click="logOut">Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </header>
</template>
<script>
import { LOGOUT_ACTION, GET_USER_TOKEN, GET_USER_NAME } from '@/store/storeConstants'
import { mapActions, mapGetters } from 'vuex'
export default {
    name: 'NavigationHeader',
    data() {
        return {
            currentViewTitle: 'Dashboard',
            applicant: {
                name: 'Juan Dela Cruz',
                id: '2026-00123',
                email: 'juan.delacruz@email.com'
            },
            notifications: []
        }
    },
    computed: {
        ...mapGetters('auth', {
            token: GET_USER_TOKEN,
            name: GET_USER_NAME
        })
    },
    methods: {
        ...mapActions('auth', {
            logout: LOGOUT_ACTION
        }),
        logOut() {
            this.logout()
            this.$router.replace('/')
        }
    },
    props: {
        onToggleMobile: {
            type: Function
        },
        onToggleDesktop: {
            type: Function
        }
    }

}
</script>