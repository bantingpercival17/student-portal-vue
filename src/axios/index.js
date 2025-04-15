import axios from 'axios'
const production = 'http://one.bma.edu.ph/api' // ✅ Use HTTPS in production
const baseURL = process.env.NODE_ENV === 'production' ? production : '/api'
const instance = axios.create({
  baseURL,
  timeout: 10000
})
export default instance
