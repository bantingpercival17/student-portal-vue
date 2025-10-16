import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '../store/index'
import { IS_USER_AUTHENTICATE_GETTER, GET_USER_TYPE } from '@/store/storeConstants'
import { studentRoute } from './student-route'
import { applicantRoute } from './applicant-route'
import { applicantRouteV2 } from './ApplicantRouteV2'
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
    path: '/achievements',
    name: prop + '.achievements',
    meta: { auth: false, name: 'Achievements', user: 'guest' },
    component: () => import('@/views/guest/Achievements.vue')
  },
  {
    path: '/news-and-events',
    name: prop + '.newsAndEvents',
    meta: { auth: false, name: 'News and Events', user: 'guest' },
    component: () => import('@/views/guest/NewsAndEvents.vue')
  },
  {
    path: '/onboard-training',
    name: prop + '.onboardTraining',
    meta: { auth: false, name: 'Onboard Training', user: 'guest' },
    component: () => import('@/views/guest/OnboardTraining.vue')
  },
  {
    path: '/disciple-and-drills',
    name: prop + '.disciplineAndDrills',
    meta: { auth: false, name: 'Discipline & Drills', user: 'guest' },
    component: () => import('@/views/guest/DisciplineAndDrills.vue')
  },
  {
    path: '/research',
    name: prop + '.research',
    meta: { auth: false, name: 'Research', user: 'guest' },
    component: () => import('@/views/guest/Research.vue')
  },
  {
    path: '/publication',
    name: prop + '.publication',
    meta: { auth: false, name: 'Publication', user: 'guest' },
    component: () => import('@/views/guest/Publication.vue')
  },
  {
    path: '/student/login',
    name: prop + '.student-login',
    meta: { auth: false, name: 'Student Login', user: 'guest' },
    component: () => import('../views/auth/student-login.vue')
  },
  {
    path: '/student/forget-password',
    name: prop + '.student-forget-password',
    meta: { auth: false, name: 'Student Forget Password', user: 'guest' },
    component: () => import('../views/auth/student-forget-password.vue')
  },
  {
    path: '/applicant/login',
    name: prop + '.applicant-login',
    meta: { auth: false, name: 'Applicant Login', user: 'guest' },
    component: () => import('../views/auth/applicant-login.vue')
  },
  {
    path: '/applicant/forget-password',
    name: prop + '.applicant-forget-password',
    meta: { auth: false, name: 'Applicant Forget Password', user: 'guest' },
    component: () => import('../views/auth/ApplicantForgetPassword.vue')
  }
]
const authRoute = (prop) => [
  {
    path: '/',
    name: prop + '.home',
    meta: { auth: false, name: 'Student Login', user: 'guest' },
    component: () => import('../views/auth/student-login.vue')
  },
  {
    path: '/student/login',
    name: prop + '.student-login',
    meta: { auth: false, name: 'Student Login', user: 'guest' },
    component: () => import('../views/auth/student-login.vue')
  },
  {
    path: '/student/forget-password',
    name: prop + '.student-forget-password',
    meta: { auth: false, name: 'Student Forget Password', user: 'guest' },
    component: () => import('../views/auth/student-forget-password.vue')
  },
  {
    path: '/applicant/login',
    name: prop + '.applicant-login',
    meta: { auth: false, name: 'Applicant Login', user: 'guest' },
    component: () => import('../views/auth/applicant-login.vue')
  },
  {
    path: '/applicant/forget-password',
    name: prop + '.applicant-forget-password',
    meta: { auth: false, name: 'Applicant Forget Password', user: 'guest' },
    component: () => import('../views/auth/ApplicantForgetPassword.vue')
  }
]
const routes = [
  /* {
    path: '/',
    name: 'auth-layout',
    component: () => import('../components/main-layouts/auth-layout.vue'),
    children: authRoute('auth-layout')
  }, */
  {
    path: '/',
    name: 'app-layout',
    component: () => import('../components/main-layouts/app-layout.vue'),
    children: defaultchildRoutes('app-layout')
  },
  {
    path: '/student',
    name: 'student-layout',
    component: () => import('../components/main-layouts/student-layout.vue'),
    children: studentRoute('student-layout')
  },
  {
    path: '/applicant',
    name: 'applicant-layout',
    component: () => import('../components/main-layouts/applicant-layout.vue'),
    children: applicantRoute('applicant-layout')
  },
   {
     path: '/applicant/v2',
     name: 'applicant-layout-v2',
     component: () => import('../components/v2/applicant/MainLayout.vue'),
     children: applicantRouteV2('applicant-layout-v2')
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
function studentUserMiddleware(to, from, next) {
  // Regular user middleware logic
  // console.log('Student user middleware')
  if (to.meta.user !== 'student') {
    next('/student/dashboard')
  } else {
    next()
  }
}

function applicantUserMiddleware(to, from, next) {
  // Admin user middleware logic
  // console.log('Applicant user middleware')
  if (to.meta.user !== 'applicant') {
    next('/applicant/dashboard')
  } else {
    next()
  }
}
router.beforeEach((to, from, next) => {
  const isAuth = store.getters[`auth/${IS_USER_AUTHENTICATE_GETTER}`]
  const isAuthType = store.getters[`auth/${GET_USER_TYPE}`]
  document.title = `${to.meta.name} - Baliwag Maritime Academy, Inc.`
  if (isAuth) {
    if (isAuthType === 'student') {
      studentUserMiddleware(to, from, next)
    } else if (isAuthType === 'applicant') {
      applicantUserMiddleware(to, from, next)
    }
  } else {
    if (to.meta.user !== 'guest') {
      next('/')
    } else {
      next()
    }
  }
})
export default router
