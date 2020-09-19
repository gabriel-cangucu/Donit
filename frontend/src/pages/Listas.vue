<template>
  <q-page class="fit row justify-center q-py-md bg-grey-2" v-if="selectedList != null">
    <q-card class="col-8">
      <q-card-section class="bg-primary">
        <q-toolbar>
          <q-toolbar-title class="text-white text-bold">{{ selectedList.name }}</q-toolbar-title>
          <q-btn flat icon="add" @click="form = true" color="white" size="1.3rem" />
        </q-toolbar>
      </q-card-section>
      <q-separator dark />
      <q-list class="col-8">
        <todo-item v-for="tarefa in selectedList.tarefas" :key="tarefa.id" v-bind="tarefa"/>
      </q-list>
    </q-card>
    <q-dialog v-model="form" >
      <todo-item-form @salvarTarefa="salvarTarefa" />
    </q-dialog>
  </q-page>
</template>

<script>
import TodoItem from '../components/TodoItem'
import TodoItemForm from '../components/TodoItemForm'

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
      form: false,
      tarefas: []
    }
  },
  methods: {
    salvarTarefa (tarefa) {
      this.selectedList.tarefas.push(tarefa)
    }
  }
}
</script>
