export const studentRoute = (prop) => [
    {
        path: '/student/dashboard',
        name: prop + '.dashboard',
        meta: { auth: true, name: 'Dashboard', user: 'student' },
        component: () => import('../views/student/dashboard.vue')
    },
    {
        path: '/student/enrollment/overview',
        name: prop + '.enrollment-overview',
        meta: { auth: true, name: 'Enrollment Overview', user: 'student' },
        component: () => import('../views/student/enrollment/enrollment-overview.vue')
    },
    {
        path: '/student/enrollment/history',
        name: prop + '.enrollment-history',
        meta: { auth: true, name: 'Enrollment History', user: 'student' },
        component: () => import('../views/student/enrollment/enrollment-history-view.vue')
    },
    {
        path: '/student/enrollment/certification',
        name: prop + '.enrollment-certification',
        meta: { auth: true, name: 'Enrollment Certification', user: 'student' },
        component: () => import('../views/student/dashboard.vue')
    },
    {
        path: '/student/enrollment/registration',
        name: prop + '.enrollment-registration',
        meta: { auth: true, name: 'Enrollment Registration', user: 'student' },
        component: () => import('../views/student/enrollment/components/registration-form.vue')
    },
    {
        path: '/student/payment/current-payment',
        name: prop + '.payment-current-payment',
        meta: { auth: true, name: 'Payment Overview', user: 'student' },
        component: () => import('../views/student/dashboard.vue')
    },
    {
        path: '/student/payment/current-payment',
        name: prop + '.current-payment',
        meta: { auth: true, name: 'current-payment', user: 'student' },
        component: () => import('../views/student/dashboard.vue')
    },
    {
        path: '/student/payment/payment-history',
        name: prop + '.payment-history',
        meta: { auth: true, name: 'Payment History', user: 'student' },
        component: () => import('../views/student/dashboard.vue')
    },
    {
        path: '/student/payment/student-card',
        name: prop + '.student-card',
        meta: { auth: true, name: 'Student Card', user: 'student' },
        component: () => import('../views/student/dashboard.vue')
    },
    {
        path: '/student/onboard/mopm',
        name: prop + '.onboard-mopm',
        meta: { auth: true, name: 'MOPM', user: 'student' },
        component: () => import('../views/student/onboard/mopm/mopm-view.vue')
    },
    {
        path: '/student/onboard/enrollment',
        name: prop + '.onboard-enrollment',
        meta: { auth: true, name: 'Onboard Training Enrollment', user: 'student' },
        component: () => import('../views/student/onboard/enrollment/enrollment-overview.vue')
    },
    {
        path: '/student/onboard/mopm/view',
        name: prop + '.onboard-mopm-view',
        meta: { auth: true, name: 'Performance Report View', user: 'student' },
        component: () => import('../views/student/onboard/mopm/performance-report-view.vue')
    }
]