import axios from 'axios'
import { Notify } from 'quasar'

axios.defaults.baseURL = 'http://localhost:8080/'


export default  ({ Vue, router }) => {
  Vue.prototype.$axios = axios
  axios.interceptors.request.use(function (config) {
    config.withCredentials=  true
    return config;
  }, function (error) {
    return Promise.reject(error);
  })
  
  axios.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    if (error.response.status == 403) {
      Notify.create({
        message: 'Usuário desconectado!',
        type: 'negative',
        icon: 'error'
      })
      router.push('/login')
    }
    return Promise.reject(error);
  })
}
