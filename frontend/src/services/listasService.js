import axios from 'axios'

export default {
  get () {
    return axios.get('/listas')
  },
  getById (id) {
    return axios.get(`/listas/${id}`)
  },
  update (lista) {
    return axios.put(`/listas/${lista.id}`, lista)
  },
  create (lista) {
    return axios.post(`/listas`, lista)
  },
  delete (id) {
    return axios.delete(`/listas/${id}`)
  }
}