import axios from 'axios'

function convertDate (date) {
  const parts = date.split('-')
  if (parts.length < 3) return date
  return new Date(parts[0], parts[1] - 1, parts[2])
}

export default {
  update (tarefa) {
    if (tarefa.conclusionDate != null && typeof tarefa.conclusionDate == 'string') {
      tarefa.conclusionDate = convertDate(tarefa.conclusionDate)
    }
    if (tarefa.dueDate != null && typeof tarefa.dueDate == 'string') {
      tarefa.dueDate = convertDate(tarefa.dueDate)
    }
    return axios.put(`/task?taskId=${tarefa.id}`, tarefa)
  },
  create (lista, idList) {
    return axios.post(`/task?listId=${idList}`, lista)
  },
  delete (id) {
    return axios.delete(`/task?taskId=${id}`)
  }
}