export const studentRouteV2 = (prop) => [
    {
        path: '/student/v2/dashboard',
        name: prop + '.dashboard',
        meta: { auth: true, name: 'Dashboard', user: 'student' },
        component: () => import('../views/version2/student/views/DashboardView.vue')
    },
    {
        path: '/student/v2/settings',
        name: prop + '.settings',
        meta: { auth: true, name: 'Account Setting', user: 'student' },
        component: () => import('../views/version2/student/views/SettingsView.vue')
    },
    {
        path: '/student/v2/profile',
        name: prop + '.profile',
        meta: { auth: true, name: 'Profile', user: 'student' },
        component: () => import('../views/version2/student/views/ProfileView.vue')
    },
    {
        path: '/student/v2/enrollment',
        name: prop + '.enrollment',
        meta: { auth: true, name: 'Enrollment', user: 'student' },
        component: () => import('../views/version2/student/views/enrollment/EnrollmentView.vue')
    },
    {
        path: '/student/v2/account-card',
        name: prop + '.account-card',
        meta: { auth: true, name: 'Account Card', user: 'student' },
        component: () => import('../views/version2/student/views/AccountCardView.vue')
    },
    {
        path: '/student/v2/grades',
        name: prop + '.grades',
        meta: { auth: true, name: 'Student Grades', user: 'student' },
        component: () => import('../views/version2/student/views/GradesView.vue')
    }
]