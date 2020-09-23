<template>
  <q-page class="fit row justify-center q-py-md bg-grey-2" v-if="selectedList != null">
    <q-card class="col-8">
      <q-card-section class="bg-primary">
        <q-toolbar>
          <q-toolbar-title class="text-white text-bold">{{ selectedList.name }}</q-toolbar-title>
          <q-btn flat icon="add" color="white" @click="addTarefa" size="1.3rem">
            <q-tooltip>
              Adicionar tarefa
            </q-tooltip>
          </q-btn>
          <q-btn flat icon="edit" color="white" @click="editLista" size="1.3rem">
            <q-tooltip>
              Editar lista
            </q-tooltip>
          </q-btn>
          <q-btn flat icon="delete_forever" color="white" @click="removeLista" size="1.3rem">
            <q-tooltip>
              Remover lista
            </q-tooltip>
          </q-btn>
        </q-toolbar>
      </q-card-section>
      <q-separator dark />
      <q-list class="col-8">
        <todo-item v-for="tarefa in tarefas" :key="tarefa.id"
          v-bind="tarefa"
          @update="updateTarefa(tarefa)"
          @remove="removeTarefa(tarefa)"
          @edit="editTarefa(tarefa)"
        />
      </q-list>
    </q-card>
    <q-dialog v-model="form" >
      <todo-item-form @salvarTarefa="salvarTarefa" :item="selectedTarefa" />
    </q-dialog>
  </q-page>
</template>

<script>
import TodoItem from '../components/TodoItem'
import TodoItemForm from '../components/TodoItemForm'
import taskService from '../services/taskService'
import listService from '../services/listasService'

export default {
  name: 'ListaDeTarefas',
  props: ['selectedList'],
  components: {
    'todo-item': TodoItem,
    'todo-item-form': TodoItemForm
  },
  data () {
    return {
      nome: 'Lista teste',
      selectedTarefa: null,
      form: false,
      tarefas: []
    }
  },
  watch: {
    selectedList (val) {
      this.carregarTarefas()
    }
  },
  methods: {
    salvarTarefa (tarefa) {
      const service = tarefa.id ? taskService.update : taskService.create
      service(tarefa, this.selectedList.id)
        .then(result => {
          this.carregarTarefas()
          this.form = false
        })
        .catch(err => {
          console.log(err)
          this.$q.notify({
            message: 'Não foi possível completar a ação.',
            color: 'negative',
            icon: 'error',
            timeout: 1000,
            progress: true
          })
        })
    },
    carregarTarefas () {
      listService.getById(this.selectedList.id)
        .then(result => {
          this.tarefas = result.data.map(tarefa =>{
            return {
              id: tarefa.taskId,
              name: tarefa.name,
              desc: tarefa.descTask,
              creationDate: tarefa.creationDate,
              priority: parseInt(tarefa.priority),
              conclusionDate: tarefa.conclusionDate || null,
              dueDate: tarefa.dueDate || null
            }
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    addTarefa () {
      this.selectedTarefa = null
      this.form = true
    },
    updateTarefa (tarefa) {
      if (!tarefa.conclusionDate) {
        tarefa.conclusionDate = new Date()
      } else {
        tarefa.conclusionDate = null
      }
      taskService.update(tarefa)
        .then(result => {
          this.carregarTarefas()
          if (tarefa.conclusionDate != null) {
            this.$q.notify({
              message: 'Donit!',
              color: 'positive',
              icon: 'done_all',
              timeout: 1000,
              progress: true
            })
          }
        })
    },
    editTarefa (tarefa) {
      this.selectedTarefa = tarefa
      this.form = true
    },
    removeTarefa (tarefa) {
      this.$q.dialog({
        title: 'Confirmar',
        message: 'Tem certeza que deseja remover a tarefa?',
        ok: {
          label: 'Confirmar',
          color: 'primary'
        },
        cancel: {
          label: 'Cancelar',
          color: 'red-10'
        }
      }).onOk(() => {
        taskService.delete(tarefa.id)
          .then(result => {
            this.carregarTarefas()
            this.$q.notify({
              message: 'Donit!',
              color: 'positive',
              icon: 'done_all',
              timeout: 1000,
              progress: true
            })
          })
          .catch(err => {
            this.$q.notify({
              message: 'Não foi possível completar a ação.',
              color: 'negative',
              icon: 'error',
              timeout: 1000,
              progress: true
            })
          })
      })
    },
    editLista () {
      this.$emit('edit')
    },
    removeLista () {
      this.$q.dialog({
        title: 'Confirmar',
        message: 'Tem certeza que deseja remover a lista de tarefas?',
        ok: {
          label: 'Confirmar',
          color: 'primary'
        },
        cancel: {
          label: 'Cancelar',
          color: 'red-10'
        }
      }).onOk(() => {
        listService.delete(this.selectedList.id)
          .then(result => {
            this.$emit('removeLista')
            this.$emit('update')
            this.$q.notify({
              message: 'Donit!',
              color: 'positive',
              icon: 'done_all',
              timeout: 1000,
              progress: true
            })
          })
          .catch(err => {
            this.$q.notify({
              message: 'Não foi possível completar a ação.',
              color: 'negative',
              icon: 'error',
              timeout: 1000,
              progress: true
            })
          })
      })
    }
  }
}
</script>
