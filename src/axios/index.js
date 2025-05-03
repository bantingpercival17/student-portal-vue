import axios from 'axios'


const links = [
  'http://127.0.0.1:7000/api/',
  'http://one.bma.edu.ph/api/',
  'http://beta.one.bma.edu.ph/api/',
  'http://20.0.0.120:70/api/'
]
const production = links[1]
const testing = links[0]
axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? production : testing