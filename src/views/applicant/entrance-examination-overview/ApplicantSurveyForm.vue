<template>
  <div class="google-form-container">
    <iframe ref="googleForm" :src="googleFormUrl" width="100%" height="600" frameborder="0" allowfullscreen></iframe>
  </div>
  <!--  <div class="google-form-container">
    <iframe ref="googleForm" src="" width="100%" height="500" frameborder="0" allowfullscreen>Loading…</iframe>
  </div> -->
</template>

<script>
export default {
  name: 'ApplicantSurveyForm',
  data() {
    return {
      googleFormUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSf9_xdaFjKxnGyVsCD7id6aSdrpcNPsFjgE2yNASjvimeG8Og/viewform?embedded=true'
    }
  },
  mounted() {
    this.checkFormSubmission()
    // this.detectFormSubmission()
  },
  methods: {
    checkFormSubmission() {
      console.log('Form Submit')
      const iframe = this.$refs.googleForm
      setInterval(() => {
        try {
          const currentUrl = iframe.contentWindow.location.href
          console.log(currentUrl.includes('formResponse'))
          if (currentUrl.includes('formResponse')) {
            // Redirect to another page after submission
            window.location.href = '/#/applicant/dashboard'
          }
        } catch (error) {
          console.log(error)
          // Cross-origin restrictions may block access to iframe URL
        }
      }, 1000)
    },
    detectFormSubmission() {
      const iframe = this.$refs.googleForm
      setInterval(() => {
        try {
          const currentUrl = iframe.contentWindow.location.href
          if (currentUrl.includes('formResponse')) {
            // Redirect after form submission
            window.location.href = '/#/applicant/dashboard'
          }
        } catch (error) {
          // Cross-origin access may be restricted
        }
      }, 1000)
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
