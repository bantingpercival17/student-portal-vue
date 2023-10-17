import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '../store/index'
import { IS_USER_AUTHENTICATE_GETTER, GET_USER_TYPE } from '@/store/storeConstants'
import { studentRoute } from './student-route'
import { applicantRoute } from './applicant-route'
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
    path: '/applicant/login',
    name: prop + '.applicant-login',
    meta: { auth: false, name: 'Applicant Login', user: 'guest' },
    component: () => import('../views/auth/applicant-login.vue')
  }
]
const routes = [
  /*  {
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
  console.log('Student user middleware')
  if (to.meta.user !== 'student') {
    next('/student/dashboard')
  } else {
    next()
  }
}

function applicantUserMiddleware(to, from, next) {
  // Admin user middleware logic
  console.log('Applicant user middleware')
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
