export const applicantRouteV2 = (prop) => [
    {
        path: '/applicant/v2/dashboard',
        name: prop + '.dashboard',
        meta: { auth: true, name: 'Dashboard', user: 'applicant' },
        component: () => import('../views/applicant/ApplicantDashboard.vue')
    }
]