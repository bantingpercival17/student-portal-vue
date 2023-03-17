import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '../store/index'
import { IS_USER_AUTHENTICATE_GETTER } from '@/store/storeConstants'
const defaultchildRoutes = (prop) => [
  {
    path: '/',
    name: prop + '.home',
    meta: { auth: false, name: 'Home', user: 'guest' },
    component: () => import('../views/home-page.vue')
  },
  {
    path: '/admission',
    name: prop + '.admission',
    meta: { auth: false, name: 'Admission', user: 'guest' },
    component: () => import('../views/admission-page.vue')
  },
  {
    path: '/student/login',
    name: prop + '.student-login',
    meta: { auth: false, name: 'Student Login', user: 'guest' },
    component: () => import('../views/auth/student-login.vue')
  },
  {
    path: '/applicant/login',
    name: prop + '.applicant-login',
    meta: { auth: false, name: 'Applicant Login', user: 'guest' },
    component: () => import('../views/auth/applicant-login.vue')
  }
]
const studentRoute = (prop) => [
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
    component: () => import('../views/student/dashboard.vue')
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
  }

]
const routes = [
  {
    path: '/',
    name: 'app-layout',
    component: () => import('../components/main-layouts/app-layout.vue'),
    children: defaultchildRoutes('app-layout')
  },
  {
    path: '/student',
    student: 'student-layout',
    component: () => import('../components/main-layouts/student-layout.vue'),
    children: studentRoute('student-layout')
  },
  {
    path: '/homev2',
    name: 'default.dashboard',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuth = store.getters[`auth/${IS_USER_AUTHENTICATE_GETTER}`]
  document.title = `${to.meta.name} - Baliwag Maritime Academy, Inc.`
  if ('auth' in to.meta && !to.meta.auth && isAuth) {
    next('/student/dashboard')
  }
  else if ('auth' in to.meta && to.meta.auth && !isAuth) {
    next('/student/login')
  } else {
    next()
  }
})
export default router
