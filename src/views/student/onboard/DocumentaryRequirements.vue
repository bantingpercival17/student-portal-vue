<template>
    <div v-if="isLoading">
        <LoadingView />
    </div>
    <div v-else>
        <div class="card ms-5 me-5" data-iq-gsap="onStart" data-iq-position-y="70" data-iq-rotate="0"
            data-iq-trigger="scroll" data-iq-ease="power.out" data-iq-opacity="0">
            <div class="card-header">
                <div class="header-title">
                    <h4 class="card-title fw-bold text-primary">PRE-ONBOARD REQUIREMENTS</h4>
                </div>
            </div>
            <div class="card-body">
                <div v-for="(data, index) in documents" :key="index">
                    <div class="form-group">
                        <label for="example-text-input" class="form-control-label fw-bolder">
                            <small>{{ data }}<span class="text-danger">*</span></small>
                        </label>
                        <input type="file" class="form-control border border-primary" />

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { GET_USER_TOKEN, IS_USER_AUTHENTICATE_GETTER } from '@/store/storeConstants'
import { mapGetters } from 'vuex'
import axios from 'axios'
export default {
    name: 'ShipboardEnrollmentOverview',
    /* components: {
        LoadingView
    }, */
    data() {
        return {
            isLoading: false,
            documentLists: [],
            documents: [
                'Proof of Registration to MISMO Portal',
                'Valid SRIB with validity of at least 18 months or more',
                'Valid Passport (for International) wtih validity of at least 18 months or more',
                'Transcript of Record'
            ]
        }
    },
    computed: {
        ...mapGetters('auth', {
            token: GET_USER_TOKEN,
            isAuth: IS_USER_AUTHENTICATE_GETTER
        })
    },
    mounted() {
        axios.get('student/onboard/pre-onboard', {
            headers: {
                Authorization: 'Bearer ' + this.token
            }
        }).then((response) => {
            this.isLoading = false
        }).catch((error) => {
            console.log(error)
            this.isLoading = false
        })
    }
}
</script>