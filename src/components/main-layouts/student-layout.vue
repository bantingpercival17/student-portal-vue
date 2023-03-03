<template>
    <div id="loading">
        <loader />
    </div>
    <!-- loader END -->
    <sidebar :minisidebar="sidebarmini" @makeminisidebar="onsidebarmini" />
    <main class="main-content">
        <div class="position-relative">
            <!--Nav Start-->
            <PageHeader :fullsidebar="sidebarmini" @makefullsidebar="onfullsidebar" />
            <!--Nav End-->
        </div>
        <div class="conatiner-fluid content-inner mt-6 py-0">
            <router-view />
        </div>
        <PageFooter />
    </main>
    <!-- Wrapper End-->
</template>
<script>
import loader from '@/components/main-layouts/components/student-loader.vue'
import PageHeader from '@/components/main-layouts/components/student-page-header.vue'
import PageFooter from '@/components/main-layouts/components/page-footer.vue'
/* import Sidebar from '@/components/custom/partials/Sidebars/Sidebar' */
import sidebar from '@/components/main-layouts/components/Sidebars/side-bar.vue'
import axios from 'axios'
export default {
    name: 'student-layout',
    components: {
        PageHeader,
        loader,
        PageFooter,
        sidebar
    },
    data() {
        return {
            sidebarmini: false,
            user: null
        }
    },
    methods: {
        onsidebarmini(e) {
            this.sidebarmini = e
        },
        onfullsidebar(e) {
            this.sidebarmini = e
        }
    }
    /* ,async created() {
        const response = await axios.get('student')
        this.$store.dispatch('student', response.data.student)
        console.log(response.data.student)
    } */
}
</script>
