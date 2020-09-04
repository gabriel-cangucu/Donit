import Vue from 'vue'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8080/donit'
Vue.prototype.$axios = axios
