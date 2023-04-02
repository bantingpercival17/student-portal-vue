<template>
    <div class=" row align-items-center">
        <div class="res-hide col-lg-7 col-md-0 d-md-block d-none p-0">
            <img src="@/assets/resources/banner/bma-building.png" class="img-fluid gradient-main vh-100" alt="images">
        </div>
        <div class="col-lg-5 col-md-12 auth-padding">
            <div class="card-body">
                <h2 class="mb-2 text-center"><b>STUDENT PORTAL</b></h2>
                <p class="text-center">SIGN IN</p>
                <form @submit.prevent="onLogin" class="row">
                    <div class="">
                        <div class="col-lg-12">
                            <div class="form-group">
                                <label for="validationCustomemail" class="form-label">Email</label>
                                <input type="email" class="form-control border-primary" id="validationCustomemail"
                                    v-model.trim="username">
                                <span class="badge bg-danger mt-2" v-if="errors.email">{{ errors.email }}</span>
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="form-group">
                                <label for="validationCustompassword" class="form-label">Password</label>
                                <input type="password" class="form-control border-primary" id="validationCustompassword"
                                    v-model.trim="password">
                                <span class="badge bg-danger mt-2" v-if="errors.password">{{ errors.password }}</span>
                            </div>
                        </div>
                        <span class="badge bg-danger mt-2" v-if="errorMessage">{{ errorMessage }}</span>

                        <div class="col-lg-12 d-flex justify-content-between">
                            <div class="form-check mb-3">
                                <input type="checkbox" class="form-check-input" id="customCheck1" v-model="rememberMe">
                                <label class="form-check-label" for="customCheck1">Remember Me</label>
                            </div>
                            <a href="recoverpw.html">Forgot Password?</a>
                        </div>
                    </div>
                    <div class="d-flex justify-content-center">
                        <button class="btn btn-primary w-100" type="submit">Sign In</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import LoginValidation from '@/services/validation/LoginValidation'
import { LOGIN_ACTION, SHOW_LOADING_MUTATION, TESTING_ACTION } from '@/store/storeConstants.js'
import { mapActions, mapMutations } from 'vuex'
export default {
    name: 'StudentLoginPage',
    data() {
        return {
            username: '',
            password: '',
            rememberMe: '',
            errors: [],
            message: [],
            errorMessage: ''
        }
    },
    methods: {
        ...mapActions('auth', {
            login: LOGIN_ACTION
        }),
        ...mapMutations({
            showLoading: SHOW_LOADING_MUTATION
        }),
        async onLogin() {
            const validation = new LoginValidation(this.username, this.password)
            this.errors = validation.checkValidations()
            if ('email' in this.errors || 'password' in this.errors) {
                return false
            }
            this.errorMessage = ''
            this.showLoading(true)
            const data = {
                email: this.username,
                password: this.password,
                remember_me: this.rememberMe
            }
            try {
                await this.login(data)
                this.$router.push('/student/dashboard')
            } catch (error) {
                this.errorMessage = error
                this.showLoading(false)
            }
            this.showLoading(false)
        }
    }
}

</script>