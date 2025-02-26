<template>
  <button class="btn btn-primary text-center" @click="doneSurvey">DONE SUBMISSION</button>
  <iframe ref="googleForm" :src="googleFormUrl" width="100%" height="600px" frameborder="0"
    @load="detectFormSubmission"></iframe>
</template>

<script>
import axios from 'axios'
import { GET_USER_TOKEN } from '@/store/storeConstants'
import { mapGetters } from 'vuex'
export default {
  name: 'ApplicantSurveyForm',
  data() {
    return {
      googleFormUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSf9_xdaFjKxnGyVsCD7id6aSdrpcNPsFjgE2yNASjvimeG8Og/viewform?embedded=true'
    }
  },
  computed: {
    ...mapGetters('auth', {
      token: GET_USER_TOKEN
    })
  },
  methods: {
    detectFormSubmission() {
      const iframe = this.$refs.googleForm
      console.log(iframe.contentWindow)
      setTimeout(() => {
        try {
          if (iframe.contentWindow.location.href.includes('formResponse')) {
            this.$router.push('/') // Redirect to homepage
          }
        } catch (error) {
          console.warn('Cross-origin restriction prevents checking form response.')
        }
      }, 2000)
    },
    doneSurvey() {
      const data = {
        survey: 'admission-survey'
      }
      axios.post('/applicant/survey', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + this.token
        }
      }).then((response) => {
        this.$router.push('/')
      }).catch((error) => {
        console.log(error)
        alert(error)
      })
    }
  }
}

</script>
<style>
.google-form-container {
  width: 100%;
  max-width: 800px;
  /* Optional: set a max width */
  margin: 0 auto;
  /* Center the form */
}

iframe {
  display: block;
  width: 100%;
  min-height: 100vh;
  /* or use a fixed px value */
}
</style>
