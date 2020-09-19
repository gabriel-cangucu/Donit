import axios from 'axios'

export default {
  login (params) {
    return axios.post('/donit', params)
  },
  cadastro (params) {
    return axios.post('/cadastro', params)
  }
}