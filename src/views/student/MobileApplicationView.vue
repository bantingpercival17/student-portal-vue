<template>
    <div v-if="isLoading">
        <h3>LOADING</h3>
    </div>
    <div v-else>
        <p class="display-6 fw-bolder text-primary">BMA APPLICATION</p>
        <div class="row mt-3">
            <div v-if="application.length > 0">
                <div v-for="(app, index) in application" :key="index">
                    <div class="card  shadow ">
                        <div class="row no-gutters">
                            <div class="col-md-3">
                                <img :src="app.app_logo_path" class="card-img" alt="#">
                            </div>
                            <div class="col-md p-3">
                                <div class="card-body  p-3">
                                    <label for="" class="fw-bolder text-primary h4">{{ app.app_name }}</label>
                                    <p class="mb-0">
                                        {{ app.description }}
                                    </p>

                                    <button class="float-end btn btn-primary btn-sm" v-if="app.latest_version"
                                        @click="downloadApp(app.id, app.latest_version.app_path)">
                                        DOWNLOAD
                                        APP</button>
                                    <span v-else class="float-end badge bg-info">SOON TO RELEASE</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
import { GET_USER_TOKEN, IS_USER_AUTHENTICATE_GETTER, SHOW_LOADING_MUTATION } from '@/store/storeConstants'
import { mapGetters, mapMutations } from 'vuex'
/* import labelComponent from '@/components/main-layouts/components/widgets/label-component.vue' */
import axios from 'axios'
export default {
    name: 'Payment Overview',
    data() {
        return {
            isLoading: true,
            application: []
        }
    },
    computed: {
        ...mapGetters('auth', {
            token: GET_USER_TOKEN,
            isAuth: IS_USER_AUTHENTICATE_GETTER
        })
    },
    mounted() {
        this.fetchData()
    },
    methods: {
        ...mapMutations({
            showLoading: SHOW_LOADING_MUTATION
        }),
        fetchData() {
            axios.get('student/bma-application', {
                headers: {
                    Authorization: 'Bearer ' + this.token
                }
            }).then((response) => {
                this.application = response.data.application
                this.isLoading = false
            }).catch((error) => {
                console.log(error)
                alert(error)
                this.isLoading = false
            })
        },
        downloadApp(data, link) {
            /* axios.post('student/bma-application/downloads', { data: data }, {
                headers: {
                    Authorization: 'Bearer ' + this.token
                }
            }) */
            console.log(link)
            const link2 = document.createElement('a')
            link2.href = link
            link2.setAttribute('download', '') // This attribute ensures that the file is downloaded instead of opened
            document.body.appendChild(link2)

            // Programmatically click the link2 to trigger the download
            link2.click()

            // Clean up - remove the temporary anchor element from the DOM
            document.body.removeChild(link2)
        }

    }
}
</script>