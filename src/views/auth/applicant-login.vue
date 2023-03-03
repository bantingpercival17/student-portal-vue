<template>
    <div class=" row align-items-center">

        <div class="col-lg-7 d-md-block d-none p-0">
            <img src="@/assets/resources/banner/bma-building.png" class="img-fluid gradient-main vh-100" alt="images">
        </div>
        <div class="col-lg-5 auth-padding">
            <div class="card-body">
                <h2 class="mb-2 text-center"><b>APPLICANT'S PORTAL</b></h2>
                <p class="text-center">SIGN IN</p>
                <form method="POST" action="{{ route('applicant-login') }}">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="form-group">
                                <label for="email" class="form-label">Email</label>
                                <input type="email" class="form-control border-primary" id="email"
                                    aria-describedby="email" name="email">
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="form-group">
                                <label for="password" class="form-label">Password</label>
                                <input type="password" class="form-control border-primary" id="password"
                                    aria-describedby="password" name="password">
                            </div>
                        </div>

                        <div class="col-lg-12 d-flex justify-content-between">
                            <div class="form-check mb-3">
                                <input type="checkbox" class="form-check-input" id="customCheck1" name="remember">
                                <label class="form-check-label" for="customCheck1">Remember Me</label>
                            </div>
                            <a href="recoverpw.html">Forgot Password?</a>
                        </div>
                    </div>
                    <div class="d-flex justify-content-center">
                        <button type="submit" class="btn btn-primary w-100">Sign In</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ApplicantLoginPage'
}

</script>