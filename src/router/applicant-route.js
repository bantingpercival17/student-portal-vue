export const applicantRoute = (prop) => [
    {
        path: '/applicant/dashboard',
        name: prop + '.dashboard',
        meta: { auth: true, name: 'Dashboard', user: 'applicant' },
        component: () => import('../views/applicant/ApplicantDashboard.vue')
    },
    {
        path: '/applicant/applicant-information',
        name: prop + '.applicant-information',
        meta: { auth: true, name: 'Applicant Information Form', user: 'applicant' },
        component: () => import('../views/applicant/entrance-examination-overview/ApplicantFormInformation.vue')
    },
    {
        path: '/applicant/examination/:code',
        name: prop + '.applicant-examination',
        meta: { auth: true, name: 'Entrance Examination', user: 'applicant' },
        component: () => import('../views/applicant/entrance-examination-overview/EntranceExaminationView.vue')
    },
    {
        path: '/applicant/enrollment-overview',
        name: prop + '.applicant-enrollment-overview',
        meta: { auth: true, name: 'Enrollment Overview', user: 'applicant' },
        component: () => import('../views/applicant/ApplicantEnrollmentOverview.vue')
    },
    {
        path: '/applicant/enrollment/registration',
        name: prop + '.applicant-enrollment-registration',
        meta: { auth: true, name: 'Enrollment Registration Form', user: 'applicant' },
        component: () => import('../views/applicant/enrollment-overview/EnrollmentRegistrationForm.vue')
    }
]