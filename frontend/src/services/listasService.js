import axios from 'axios'

export default {
  get () {
    return axios.get('/listAll')
  },
  getById (id) {
    return axios.get(`/list?listId=${id}`)
  },
  update (lista) {
    return axios.put(`/list?listId=${lista.id}`, lista)
  },
  create (lista) {
    return axios.post(`/list?listId=`, lista)
  },
  delete (id) {
    return axios.delete(`/list?listId=${id}`)
  }
}