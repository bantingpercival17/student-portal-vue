import axios from 'axios'

if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'http://one.bma.edu.ph/api/'
} else {
  axios.defaults.baseURL = 'http://192.168.100.6:7000/api/'
}