import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '../store/index'
import { IS_USER_AUTHENTICATE_GETTER } from '@/store/storeConstants'
import { studentRoute } from './student-route'
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
