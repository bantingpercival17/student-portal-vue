import axios from 'axios'

if (process.env.NODE_ENV === 'production') {
  /*  axios.defaults.baseURL = 'http://one.bma.edu.ph/api/' */
  axios.defaults.baseURL = 'http://192.168.1.135:7000/api'
} else {
  axios.defaults.baseURL = 'http://127.0.0.1:7000/api/'
  /* axios.defaults.baseURL = 'http://192.168.1.135:7000/api' */
}
// Get the CSRF token from the meta tag
const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
// Set the CSRF token as a default header for all requests
console.log(csrfToken)
axios.get('/csrf-token')
  .then(response => {
    const csrfToken = response.data.csrf_token
    // Use the csrfToken as needed in your application
    console.log(csrfToken)
  })
  .catch(error => {
    console.log(error)
  })
axios.defaults.headers.common['X-CSRF-Token'] = csrfToken
/* axios.defaults.withCredentials = true */
/* axios.defaults.xsrfCookieName = 'XSRF-TOKEN'
axios.defaults.xsrfHeaderName = 'X-XSRF-TOKEN' */
// Make sure to include the `withCredentials` option
/* axios.defaults.withCredentials = true */