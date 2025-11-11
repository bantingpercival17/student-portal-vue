export const applicantRouteV2 = (prop) => [
    {
        path: '/applicant/v2/dashboard',
        name: prop + '.dashboard',
        meta: { auth: true, name: 'Dashboard', user: 'applicant' },
        component: () => import('../views/version2/applicant/DashboardView.vue')
    },
    {
        path: '/applicant/v2/settings',
        name: prop + '.settings',
        meta: { auth: true, name: 'Account Setting', user: 'applicant' },
        component: () => import('../views/version2/applicant/SettingsView.vue')
    }
]