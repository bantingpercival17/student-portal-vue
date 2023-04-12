import axios from 'axios'
/* axios.defaults.baseURL = 'http://58.69.116.138:70/api' */
/* axios.defaults.baseURL = 'http://one.bma.edu.ph/api/' */
if (process.env.NODE_ENV === 'production') {
    axios.defaults.baseURL = 'http://one.bma.edu.ph/api/'
} else {
    axios.defaults.baseURL = 'http://127.0.0.1:7000/api/'
}