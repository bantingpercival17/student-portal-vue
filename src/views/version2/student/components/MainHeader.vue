<template>
    <header class="d-flex justify-content-between align-items-center main-student-header">
        <div class="d-flex align-items-center">
            <button class="btn btn-light d-lg-none me-2" @click="$emit('toggle-sidebar')">
                <i data-feather="menu"></i>
            </button>
            <div>
                <h2 class="h5 fw-bold text-dark mb-0">Welcome, {{ studentName }}!</h2>
            </div>
        </div>
        <div class="d-flex align-items-center">
            <!-- Notification Dropdown -->
            <div class="dropdown me-3">
                <button class="btn btn-light rounded-circle p-2 position-relative" type="button"
                    data-bs-toggle="dropdown" aria-expanded="false">
                    <i data-feather="bell"></i>
                    <span v-if="unreadCount > 0"
                        class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {{ unreadCount }}
                        <span class="visually-hidden">unread notifications</span>
                    </span>
                </button>
                <ul class="dropdown-menu dropdown-menu-end shadow border-0" style="width: 350px;">
                    <li class="px-3 py-2 d-flex justify-content-between align-items-center">
                        <h6 class="dropdown-header p-0">Notifications</h6>
                        <button v-if="unreadCount > 0" class="btn btn-link btn-sm p-0"
                            @click.prevent="$root.markAllAsRead()">Mark all as read</button>
                    </li>
                    <li>
                        <hr class="dropdown-divider my-0">
                    </li>
                    <li style="max-height: 300px; overflow-y: auto;">
                        <div v-if="!notifications.length" class="text-center p-3 text-muted small">No new notifications
                        </div>
                        <a v-for="notif in notifications.slice(0, 5)" :key="notif.id"
                            class="dropdown-item py-2 notification-item" :class="{ unread: !notif.read }" href="#"
                            @click.prevent="$root.handleNotificationClick(notif)">
                            <div class="d-flex align-items-start">
                                <div :class="'bg-' + notif.color + '-subtle'"
                                    class="rounded-circle d-flex align-items-center justify-content-center p-2 me-3 notification-icon">
                                    <i :data-feather="notif.icon" :class="'text-' + notif.color"></i>
                                </div>
                                <div>
                                    <p class="fw-semibold mb-0 small">{{ notif.title }}</p>
                                    <p class="text-muted mb-1" style="font-size: 0.8rem;">{{ notif.message }}</p>
                                    <small class="text-muted" style="font-size: 0.7rem;">{{ timeAgo(notif.timestamp)
                                    }}</small>
                                </div>
                            </div>
                        </a>
                    </li>
                    <li>
                        <hr class="dropdown-divider my-0">
                    </li>
                    <li><a class="dropdown-item text-center small py-2" href="#"
                            @click.prevent="$emit('navigate', 'notifications')">View all notifications</a></li>
                </ul>
            </div>

            <!-- Profile Dropdown -->
            <div class="dropdown">
                <img :src="studentImage" alt="User Avatar" class="rounded-circle header-avatar"
                    data-bs-toggle="dropdown" aria-expanded="false">
                <ul class="dropdown-menu dropdown-menu-end shadow border-0">
                    <li><a class="dropdown-item" href="#" @click.prevent="navigateTo('student-layout-v2.profile')"><i
                                data-feather="user" class="me-2" style="width:16px;"></i>Update Profile</a></li>
                    <li>
                        <a class="dropdown-item" href="#" @click.prevent="navigateTo('student-layout-v2.settings')"><i
                                data-feather="settings" class="me-2" style="width:16px;"></i>Settings</a>
                    </li>
                    <li>
                        <hr class="dropdown-divider">
                    </li>
                    <li><a class="dropdown-item" href="#" @click.prevent="logOut"><i data-feather="log-out" class="me-2"
                                style="width:16px;"></i>Logout</a></li>
                </ul>
            </div>
        </div>
    </header>
</template>
<script>
import { LOGOUT_ACTION, GET_USER_TOKEN, GET_USER_NAME, GET_USER_IMAGE } from '@/store/storeConstants'
import { mapActions, mapGetters } from 'vuex'
export default {
    name: 'MainHeader',
    data() {
        return {
            student: {
                firstName: 'John',
                lastName: 'Doe'
            },
            avatar: 'https://placehold.co/80x80/FFFFFF/0d47a1?text=JD',
            notifications: [
                {
                    id: 1,
                    title: 'New Assignment Posted',
                    message: 'Your instructor has posted a new assignment for your Marine Navigation course.',
                    timestamp: new Date(new Date().getTime() - 5 * 60000), // 5 minutes ago
                    read: false,
                    icon: 'file-text',
                    color: 'primary'
                },
                {
                    id: 2,
                    title: 'Payment Received',
                    message: 'Your payment for the Spring 2024 semester has been successfully processed.',
                    timestamp: new Date(new Date().getTime() - 2 * 3600000), // 2 hours ago
                    read: true,
                    icon: 'check-circle',
                    color: 'success'
                }
            ]
        }
    },
    computed: {
        ...mapGetters('auth', {
            token: GET_USER_TOKEN,
            studentName: GET_USER_NAME,
            studentImage: GET_USER_IMAGE
        }),
        unreadCount() {
            return this.notifications.filter(notif => !notif.read).length
        }
    },
    methods: {
        timeAgo(timestamp) {
            const now = new Date()
            const diff = Math.floor((now - timestamp) / 1000) // difference in seconds

            if (diff < 60) return `${diff} seconds ago`
            if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`
            if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`
            return `${Math.floor(diff / 86400)} days ago`
        },
        ...mapActions('auth', {
            logout: LOGOUT_ACTION
        }),
        logOut() {
            this.logout()
            this.$router.replace('/')
        },
        navigateTo(routeName) {
            this.$router.push({ name: routeName })
        }
    }
}
</script>