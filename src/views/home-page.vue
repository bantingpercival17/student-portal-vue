<!-- <template>
    <div class="container position-relative">
        <div class="row">
            <div class="col-lg-12">
                <div class="row mar-top justify-content-center align-items-center banner-container">
                    <div class="col-lg-7 banner-item order-lg-first order-last mt-lg-0 mt-5">
                        <span class="rectangle">
                            <svg width="85" viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="84.9997" height="85" rx="8"
                                    transform="matrix(0.883521 -0.468393 0.468328 0.883555 -2.49609 37.5596)"
                                    fill="#3b5e08" />
                            </svg>
                        </span>
                        <div class="banner-text">
                            <h2 class="mb-5 banner-text" id="hero-title">
                                YOUR FIRST STEP IN REACHING YOUR MARITIME DREAM
                            </h2>
                        </div>
                        <span class="ellipse">
                            <svg width="79" viewBox="0 0 79 79" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <ellipse rx="38.7296" ry="38.7296"
                                    transform="matrix(0.938441 0.345441 -0.345486 0.938424 39.7266 39.7235)"
                                    fill="#FDDA5F" />
                            </svg>
                        </span>
                        <span class="ellipse1">
                            <svg width="35" viewBox="0 0 79 79" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <ellipse rx="38.7296" ry="38.7296"
                                    transform="matrix(0.938441 0.345441 -0.345486 0.938424 39.7266 39.7235)"
                                    fill="#FDDA5F" />
                            </svg>
                        </span>
                        <div class="d-flex hero-serch flex-wrap" id="hero-row">
                            <router-link :to="{ name: 'app-layout.admission' }" class="btn btn-primary" id="Admission"
                                data-title="Admission" @click="changename('Admission')"> Inquire Now
                                <svg width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="11.7669" cy="11.7666" r="8.98856" stroke="currentColor" stroke-width="1.5"
                                        stroke-linecap="round" stroke-linejoin="round"></circle>
                                    <path d="M18.0186 18.4851L21.5426 22" stroke="currentColor" stroke-width="1.5"
                                        stroke-linecap="round" stroke-linejoin="round"></path>
                                </svg>
                            </router-link>
                        </div>
                    </div>
                    <div class="col-lg-5 banner-img">
                        <div class="img text-end" id="hero-img">
                            <img src="@/assets/resources/banner/BANNER2.png" class="img-fluid bg-img" alt="banner">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="editors position-relative">
        <div class="container" data-iq-gsap="onStart" data-iq-position-y="70" data-iq-rotate="0" data-iq-trigger="scroll"
            data-iq-ease="power.out" data-iq-opacity="0">
            <div class="row">
                <section class="editors mar-top mar-bot">
                    <div class="header-title d-flex justify-content-between">
                        <h4 class="title-bt fw-bolder">COURSES OFFERED</h4>
                    </div>
                    <span class="ellipse3">
                        <svg width="45" viewBox="0 0 79 79" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <ellipse rx="38.7296" ry="38.7296"
                                transform="matrix(0.938441 0.345441 -0.345486 0.938424 39.7266 39.7235)" fill="#FDDA5F" />
                        </svg>
                    </span>
                    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-3 list-inline">
                        <div class="col">
                            <div class="card bg-white iq-service-card">
                                <router-link :to="{ name: 'app-layout.admission', query: { course: '2' } }" id="Admission"
                                    data-title="Admission" @click="changename('Admission')">
                                    <div class="iq-image position-relative">
                                        <div class="img">
                                            <img src="@/assets/resources/banner/BSMT.png" alt="image"
                                                class="img-fluid height1 radius-our w-100">
                                        </div>
                                        <div class="app badge-1 btn btn-sm btn-primary">COLLEGE</div>
                                        <div class="app badge-3 ms-3 btn btn-sm text-white btn-info">BSMT</div>
                                    </div>
                                    <div class="card-body pb-3">
                                        <div class="border-bottom mt-3">
                                            <h5 class=" mb-3 fw-bolder">BS in Marine Transportation</h5>
                                        </div>
                                        <div class="d-flex justify-content-between flex-wrap mt-3">
                                            <div>
                                                <span class="text-dark ms-2">BS Marine Transportation - is a
                                                    maritime education program that covers the mandatory education
                                                    and training for a Navigational Watch required under Regulation
                                                    II/I of the STCW Convention, 1978, as amended.

                                                    The BSMT program shall cover the study of navigation, cargo
                                                    handling, and storage, and controlling the safe operation of the
                                                    ship, and care for persons on board the ship at the operational
                                                    level.</span>
                                            </div>

                                        </div>
                                    </div>
                                </router-link>

                            </div>
                        </div>


                        <div class="col">
                            <div class="card bg-white iq-service-card">
                                <router-link :to="{ name: 'app-layout.admission', query: { course: '1' } }" id="Admission"
                                    data-title="Admission" @click="changename('Admission')">
                                    <div class="iq-image position-relative">
                                        <div class="img">
                                            <img src="@/assets/resources/banner/BSMARE.png" alt="image"
                                                class="img-fluid height1 radius-our w-100">
                                        </div>
                                        <div class="app badge-2 btn btn-sm btn-primary">$2000</div>
                                        <div class="app badge-1 btn btn-sm btn-primary">COLLEGE</div>
                                        <div class="app badge-3 ms-3 btn btn-sm text-white btn-info">BSMARE</div>

                                    </div>
                                    <div class="card-body pb-3">
                                        <div class="border-bottom mt-3">
                                            <h5 class="mb-3 fw-bolder">BS in Marine ENGINEERING</h5>
                                        </div>
                                        <div class="d-flex justify-content-between flex-wrap mt-3">
                                            <div>

                                                <span class="text-dark ms-2">BS Marine Engineering - is a maritime
                                                    education program that covers the mandatory education and
                                                    training for Officers in Charge of an Engineering Watch required
                                                    under Regulation III/I of the STCW Convention, 1978, as amended

                                                    The BSMarE program shall cover the study of marine engineering
                                                    including but not limited to the propulsion system and its
                                                    auxiliaries, electrical, electronic, and control engineering,
                                                    maintenance, and repair, controlling the operation of the ship,
                                                    and care for persons on board the ship at the operational
                                                    level.he study of navigation, cargo handling, and storage, and
                                                    controlling the safe operation of the ship, and care for persons
                                                    on board the ship at the operational level.</span>
                                            </div>

                                        </div>
                                    </div>
                                </router-link>
                            </div>
                        </div>


                        <div class="col">
                            <div class="card bg-white iq-service-card">
                                <router-link :to="{ name: 'app-layout.admission', query: { course: '3' } }" id="Admission"
                                    data-title="Admission" @click="changename('Admission')">
                                    <div class="iq-image position-relative">
                                        <div class="img">
                                            <img src="@/assets/resources/banner/SHS.png" alt="image"
                                                class="img-fluid height1 radius-our w-100">
                                        </div>
                                        <div class="app badge-2 btn btn-sm btn-primary">$2000</div>
                                        <div class="app badge-1 btn btn-sm btn-primary">SENIOR HIGHSCHOOL</div>

                                    </div>
                                    <div class="card-body pb-3">
                                        <div class="border-bottom mt-3">
                                            <h5 class=" mb-3">Pre-Baccalaureate Maritime</h5>
                                        </div>
                                        <div class="d-flex justify-content-between flex-wrap mt-3">
                                            <div>

                                                <span class="text-dark ms-2">Senior High School - covers the
                                                    mandatory education for the last two years of the K to 12
                                                    Program and includes Grade 11 and 12 required by the Department
                                                    of Education and Marina.


                                                    The BMA SHS program offers a unique track of Pre-Baccalaureate
                                                    Maritime (PBM) aims to equip students with knowledge and skills
                                                    that will help them prepare better for their chosen field in
                                                    maritime education and training.</span>
                                            </div>
                                        </div>
                                    </div>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template> -->
<style>
.removepadding {
    margin: 0%;
    padding: 0%;
}

* {
    margin: 0%;
    padding: 0%;
}

.custom-bullets {
    padding-left: 20px;
    text-align: left;
    color: black;
}

.custom-bullets li {
    position: relative;
    margin-bottom: 10px;
}

.custom-bullets li:before {
    content: "\2022";
    position: absolute;
    left: -20px;
}
</style>
<template>
    <div class="position-relative">
        <img src="@/assets/homepage-banner.png" class="img-fluid" alt="#" width="100%">
        <div class="position-absolute top-0 start-0 w-100 h-100 bg-soft-primary"></div>
        <div class="position-absolute top-50 start-50 translate-middle text-center text-white">
            <h1 class="mb-1 fw-bold text-white display-5">
                "CHARTING SUCCESS, TRANSFORMING DREAMS INTO REALITIES"
            </h1>
            <p class="text-lg mt-2 text-white">Reach your maritime dream right now. 🚢</p>
            <a href="/#/admission"
                class="text-white bg-primary p-2 w-35 border border-primary rounded-start rounded-end">Inquire Now! <svg
                    width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="11.7669" cy="11.7666" r="8.98856" stroke="currentColor" stroke-width="1.5"
                        stroke-linecap="round" stroke-linejoin="round"></circle>
                    <path d="M18.0186 18.4851L21.5426 22" stroke="currentColor" stroke-width="1.5"
                        stroke-linecap="round" stroke-linejoin="round"></path>
                </svg></a>
        </div>
    </div>
    <div class="container">
        <div class="editors position-relative">
            <div class="container" data-iq-gsap="onStart" data-iq-position-y="70" data-iq-rotate="0"
                data-iq-trigger="scroll" data-iq-ease="power.out" data-iq-opacity="0">
                <div class="row">
                    <section class="editors  mar-bot">
                        <div class="card text-center mt-5 ">
                            <h4 class="fw-bolder fs-1 text-primary mb-2 mt-1">WELCOME TO THE BALIWAG MARITIME ACADEMY
                            </h4>
                            <h6 class="fw-bolder text-primary mb-2">WHERE YOUR DREAMS BECOME A REALITY OF SUCCESS</h6>
                            <p class="m-3 text-black">At Baliwag Maritime Academy, we are dedicated to nurturing the
                                next
                                generation of maritime professionals through comprehensive education and practical
                                training.
                                Our goal is to equip our students with the skills, knowledge, and competence required
                                for a
                                successful career at sea. We are more than just a school; we are a community of
                                professionals with a shared vision: to chart success and transform dreams into
                                realities.
                                Whether you aspire to be a marine Deck or Enginner Office, or a seafarer, we have the
                                right
                                program for you. Our course are accredited by CHED and MARINA, and our curriculum is
                                aligned
                                with the latest industry standards and best practices. Additionally, we provide
                                scholarship
                                opportunities for deserving students. Join us today and discover how we can help you
                                achieve
                                your goals and reach your full potential in the maritime industry. Baliwag Maritime
                                Academy:
                                Charting Success, Transforming Dreams into Realities
                            </p>
                        </div>
                        <div class="container">
                            <div class="row">
                                <div class="col">
                                    <div class="card mt-3">
                                        <h4 class="fw-bolder fs-1 text-center text-primary">MISSION</h4>
                                        <p class="m-3 text-black justify-content-between"> The Baliwag Maritime Academy
                                            shall offer its
                                            students a
                                            competency based Maritime
                                            Education &
                                            Training
                                            Program
                                            to
                                            produce competent marine officers with an adequate knowledge, attitudes, &
                                            leadership skills necessary in
                                            pursuing
                                            their respective professional maritime career which complies to national and
                                            international standards.</p>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="card mt-3">
                                        <h4 class="fw-bolder fs-1 text-center text-primary">VISION</h4>
                                        <p class="m-3 text-black justify-content-between"> The Baliwag Maritime Academy
                                            as
                                            one of the leading
                                            Maritime Higher Educational
                                            Institution
                                            visualizes itself
                                            as
                                            a producer of highly competent marine officers who will excel in the
                                            practice of
                                            the seafaring profession in
                                            both domestic and international shipping, and as competent maritime
                                            educators.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr>
                        <div class="row text-center">
                            <div class="card">
                                <h2 class="mt-3 title-bt fw-bolder fs-1">CORE VALUES</h2>
                                <div class="row">
                                    <div class="col-sm">
                                        <h3 class="text-info fw-bolder">KNOWLEDGE</h3><br>
                                        <p class="text-black">
                                            Knowledge refers to the acquisitio of information and practical skills that
                                            are
                                            necessary for a successful career in the maritime industry.
                                        </p>
                                    </div>
                                    <div class="col-sm">
                                        <h3 class="text-danger fw-bolder">DISCIPLINE</h3><br>
                                        <p class="text-black">
                                            Discipline refers to the ability to follow rules and regulations, as well as
                                            to
                                            maintain a high level of professionalism earned through regimented training.
                                        </p>
                                    </div>
                                    <div class="col-sm">
                                        <h3 class="text-warning fw-bolder">EXCELLENCE</h3><br>
                                        <p class="text-black">
                                            Excellence refers to the pursuit of the highest standards of performance in
                                            all
                                            aspects of shipboard work. Commitment to lifelong learning, service to
                                            community
                                            and care of environment.
                                        </p>
                                    </div>
                                </div>
                                <p>These values are important for student to learn and embody in order to succeed in
                                    their
                                    future careers at sea.</p>
                            </div>
                            <hr>
                            <div class="header-title d-flex justify-content-between">
                                <h4 class="fw-bolder fs-1 ">OUR PROGRAMS</h4>
                            </div>
                            <div class="text-start text-black">
                                <p>Explore our range of specialize programs tailored to meet the diverse needs of
                                    aspiring
                                    maritime professionals:</p>
                            </div>
                            <div class="row  list-inline">
                                <div class="col">
                                    <div class="card bg-white iq-service-card">
                                        <div class="iq-image position-relative">
                                            <div class="img">
                                                <img src="@/assets/resources/banner/BSMARE.png" alt="image"
                                                    class="img-fluid height1 radius-our w-100">
                                            </div>
                                            <div class="app badge-1 btn btn-sm btn-primary">COLLEGE</div>
                                            <div class="app badge-3 ms-3 btn btn-sm text-white btn-info">BSMARE</div>
                                        </div>
                                        <div class="card-body pb-3">
                                            <div class="border-bottom mt-3">
                                                <h5 class="mb-3 fw-bolder">BS in Marine Engineering</h5>
                                            </div>
                                            <div class="d-flex justify-content-between flex-wrap mt-3">
                                                <div>
                                                    <span class="text-dark ms-2">BS Marine Engineering - is a maritime
                                                        education program that covers the mandatory education and
                                                        training for Officers in Charge of an Engineering Watch required
                                                        under Regulation III/I of the STCW Convention, 1978, as amended
                                                    </span>
                                                    <a href="#/Bsme" class="text-primary-emphasis">Read More.</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="card bg-white iq-service-card">
                                        <div class="iq-image position-relative">
                                            <div class="img">
                                                <img src="@/assets/resources/banner/BSMT.png" alt="image"
                                                    class="img-fluid height1 radius-our w-100">
                                            </div>
                                            <div class="app badge-1 btn btn-sm btn-primary">COLLEGE</div>
                                            <div class="app badge-3 ms-3 btn btn-sm text-white btn-info">BSMT</div>
                                        </div>
                                        <div class="card-body pb-3">
                                            <div class="border-bottom mt-3">
                                                <h5 class=" mb-3 fw-bolder">BS in Marine Transportation</h5>
                                            </div>
                                            <div class="d-flex justify-content-between flex-wrap mt-3">
                                                <div>
                                                    <span class="text-dark ms-2">BS Marine Transportation - is a
                                                        maritime education program that covers the mandatory education
                                                        and training for a Navigational Watch required under Regulation
                                                        II/I of the STCW Convention, 1978, as amended.
                                                    </span>
                                                    <a href="#/bsmt" class="text-primary-emphasis">Read More.</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p class="text-black">Our curriculum is thoughtfully crafted to blend theoretical learning
                                with
                                hands-on
                                experience, ensuring that our
                                graduates are well-prepared to excel in the dynamic maritime sector.
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </div>
    <hr>
    <div class="text-center">
        <h2 class="fw-bolder fs-1">STATE OF THE ART FACILITIES</h2>
        <p class="text-black">We provide access to modern facilities and cutting-edge resources that
            facilitate effective
            learning and practical training. Our campus offer advanced simulation laboratories. full-equipped
            workshops, and comprehensive libraries to support our students' academic endeavors.</p>
        <hr>
        <h4 class="fw-bolder fs-1 ">EXPERIENCED FACULTY</h4>
        <p class="text-black">Our faculty comprises experienced industry professionals and dedicated
            educators committed to
            delivering
            high-quality education. They mentor and guide students, forstering an environment of
            academic excellence and professional growth.
        </p>
        <hr>
        <h4 class="fw-bolder fs-1 ">CAREER OPPORTUNITIES</h4>
        <p class="text-black">Upon graduation, our students are well-positioned to embark on
            rewarding careers in the maritime industry.
            We provide career guidance and support, connecting our graduates with promising
            employment opportunities worldwide.
        </p>
        <hr>
        <h4 class="fw-bolder fs-1 ">WHY CHOOSE BALIWAG MARITIME ACADEMY?</h4>
        <div class="row justify-content-center mt-1">
            <div class="col-6">
                <ul class="list-unstyled custom-bullets">
                    <li>Accredited programs ensuring quality education</li>
                    <li>Strong industry partnerships and networking opportunities</li>
                    <li>Holistic approach to student development</li>
                    <li>Commitment to safety, innovation, and sustainability in maritime practices
                    </li>
                </ul>
            </div>
        </div>
        <hr>
        <h4 class="mt-6 fw-bolder fs-1">GET IN TOUCH</h4>
        <p class="text-black">
            Ready to begin your journey toward a fulfilling maritime career? Contact us to learn more
            about our programs, admission process, and campus life. We look forward to welcoming you to
            the Baliwag Maritime Academy family!
        </p>
    </div>
    <hr>
</template>
<script>
import axios from 'axios'
export default {
    name: 'HomePage',
    mounted() {
        axios.get('checker').then((response) => {
            console.log(response.data.bot)
        }).catch((error) => {
            console.log(error)
        })
    }
}

</script>