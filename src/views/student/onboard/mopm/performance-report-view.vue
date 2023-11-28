<template>
    <div v-if="isLoading">
        <label for="" class="h4 text-info">PERFORMANCE REPORT</label>
    </div>
    <div v-else>
        <div v-if="version1">
            <Version1 :propsData="performanceReport" />
        </div>
        <div v-else>
            <Version2 :propsData="performanceReport" />
        </div>
    </div>
</template>
<script>
import { GET_USER_TOKEN, IS_USER_AUTHENTICATE_GETTER, SHOW_LOADING_MUTATION } from '@/store/storeConstants'
import { mapGetters, mapMutations } from 'vuex'
import axios from 'axios'
import Version1 from './components/PerformanceReportViewV1.vue'
import Version2 from './components/PerformanceReportViewV2.vue'
export default {
    name: 'ShipboardMonitoringOverview',
    data() {
        return {
            isLoading: true,
            isEdit: false,
            errors: [],
            performanceReport: [],
            documents: [],
            tasks: [],
            formLoading: '',
            forms: {
                remarks: [],
                files: [],
                loading: [],
                errors: []
            },
            link: '',
            version1: false
        }
    },
    components: {
        Version1,
        Version2
    },
    computed: {
        ...mapGetters('auth', {
            token: GET_USER_TOKEN,
            isAuth: IS_USER_AUTHENTICATE_GETTER
        })
    },
    mounted() {
        const link = this.$route.query.v // Get the Parameter Value in Link
        // Call out the Shipboard Performance in Server Side
        const finalLink = this.$route.query.report ? '/student/onboard/performance/view?month=' + link : '/student/onboard/performance/view?id=' + link
        this.version1 = !!this.$route.query.report
        console.log(finalLink)
        axios.get(finalLink, {
            headers: {
                Authorization: 'Bearer ' + this.token
            }
        }).then((response) => {
            this.performanceReport = response.data.data // Set the Performance Report Information
            console.log(this.version1)
            this.isLoading = false
        }).catch((error) => {
            console.log(error)
            this.isLoading = false
        })
    },
    methods: {
        ...mapMutations({
            showLoading: SHOW_LOADING_MUTATION
        })
    }
}
</script>