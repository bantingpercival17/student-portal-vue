<template>
    <div class="sticky-top">
        <nav class="nav navbar navbar-expand-lg navbar iq-navbar py-lg-0 ">
            <div class="container-fluid navbar-inner">
                <router-link :to="{ name: 'app-layout.home' }" class="navbar-brand">
                    <img src="@/assets/resources/image/bma-logo-1.png" alt="image"
                        class="img-fluid rounded-circle avatar-70 me-2">
                    <h2 class="logo-title me-3">BALIWAG MARITIME ACADEMY, INC.</h2>
                </router-link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon">
                        <span class="navbar-toggler-bar bar1 mt-2"></span>
                        <span class="navbar-toggler-bar bar2"></span>
                        <span class="navbar-toggler-bar bar3"></span>
                    </span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ms-auto top-menu navbar-nav align-items-center navbar-list mb-3 mb-lg-0">
                        <li class="dropdown nav-item mobile-menu">
                            <a class="nav-link dropdown-toggle " data-bs-toggle="dropdown" href="#" role="button"
                                aria-haspopup="false" aria-expanded="true">
                                Login Account
                            </a>
                            <ul class="dropdown-menu " data-popper-placement="bottom-start">
                                <li><router-link
                                        :class="`dropdown-item ${checkActive('app-layout.student-login') ? 'active' : ''}`"
                                        :to="{ name: 'app-layout.student-login' }">Student Login </router-link></li>
                                <li><router-link
                                        :class="`dropdown-item ${checkActive('app-layout.applicant-login') ? 'active' : ''}`"
                                        :to="{ name: 'app-layout.applicant-login' }">Applicant Login</router-link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <div class="nav-scroller ">
            <nav class="nav nav-underline bg-white pb-0 text-white border border-soft-primary"
                aria-label="Secondary navigation">
                <div class="d-flex" id="head-check">
                    <div v-for="(data, index) in headerLists" :key="index">
                        <router-link :to="{ name: data['route'] }"
                            :class="name == data['name'] ? 'nav-link active text-primary fw-bolder' : 'nav-link text-muted'"
                            :id="data['name']" :data-title="data['name']" @click="changename(data['name'])">
                            {{ data['name'] }}
                        </router-link>
                    </div>
                </div>
                <!-- <ul class="dropdown-menu " data-popper-placement="bottom-start">
                    <li> <router-link :to="{ name: 'app-layout.Facilities' }"
                            :class="name == 'Facilities' ? 'nav-link active' : 'nav-link'" id="Facilities"
                            data-title="Facilities" @click="changename('Facilities')">Facilities</router-link></li>
                    <li><router-link :to="{ name: 'app-layout.admission' }"
                            :class="name == 'Admission' ? 'nav-link active' : 'nav-link'" id="Admission"
                            data-title="Admission" @click="changename('Admission')">Admission Scholarship</router-link></li>
                </ul>
                <router-link :to="{ name: 'app-layout.Contact' }"
                    :class="name == 'Contact' ? 'nav-link active' : 'nav-link'" id="Contact" data-title="Contact"
                    @click="changename('Contact')">Contact Us</router-link> -->
            </nav>
        </div>
    </div>
</template>
<script>
import { mapActions/* , mapGetters */ } from 'vuex'
export default {
    name: 'PageHeader',
    data() {
        // Update the Headers Name into Array Data
        const headerLists = [
            { name: 'Home', route: 'app-layout.home' },
            { name: 'Achievements', route: 'app-layout.achievements' },
            { name: 'News and Events', route: 'app-layout.newsAndEvents' },
            { name: 'Admission', route: 'app-layout.admission' },
            { name: 'Onboard Training', route: 'app-layout.onboardTraining' },
            { name: 'Discipline & Drills', route: 'app-layout.disciplineAndDrills' },
            { name: 'Research', route: 'app-layout.home' }
        ]
        return {
            name: '',
            headerLists
        }
    },
    mounted() {
        this.name = this.$route.meta.name
    },
    methods: {
        ...mapActions({
            changenameaction: 'changenameaction'
        }
        ),
        checkActive(route) {
            if (this.$route.name === route) {
                return true
            }
        },
        changename(name) {
            console.log(name)
            this.name = name
        }
    }
}
</script>
