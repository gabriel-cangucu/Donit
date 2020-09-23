<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Donit
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-item clickable @click="form = true">
        <q-item-section avatar>
          <q-icon name="add" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Criar Lista</q-item-label>
        </q-item-section>
      </q-item>
      <q-list v-if="categoriesWithLists.length > 0">
        <q-expansion-item
          expand-separator
          v-for="category in categoriesWithLists"
          :key="category.id"
          :icon="category.icon"
          :label="category.label"
        >
          <q-item
            v-for="list in category.lists"
            :key="list.id"
            clickable
            @click="selectedList = list"
          >
            <q-item-section>
              <q-item-label>{{ list.name }}</q-item-label>
            </q-item-section>
            <q-tooltip max-width="20vw">
              {{ list.desc }}
            </q-tooltip>
          </q-item>
          <q-separator />
        </q-expansion-item>
      </q-list>
      <q-item v-else>
        Você ainda não possui listas cadastradas!
      </q-item>
      <q-item clickable v-close-popup to="/login">
        <q-item-section avatar>
          <q-icon name="exit_to_app" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Sair</q-item-label>
        </q-item-section>
      </q-item>
    </q-drawer>

    <q-page-container>
      <router-view 
        :selectedList="selectedList"
        @update="carregarListas"
        @edit="editLista"
        @removeLista="selectedList = null"
      />
    </q-page-container>
    <q-dialog v-model="form" >
      <todo-list-form @salvarLista="salvarLista" :categories="categories" :item="{...selectedList, edit}" />
    </q-dialog>
  </q-layout>
</template>

<script>
import listasService from '../services/listasService'
import TodoListForm from '../components/TodoListForm'

export default {
  name: 'MainLayout',
  components: {
    'todo-list-form': TodoListForm
  },
  data () {
    return {
      leftDrawerOpen: false,
      form: false,
      selectedList: null,
      edit: false,
      categories: []
    }
  },
  created () {
    this.categories = [
      {
        id: 0,
        icon: 'local_grocery_store',
        label: 'Lista de compras',
        lists: []
      },
      {
        id: 1,
        icon: 'fitness_center',
        label: 'Atividades físicas',
        lists: []
      },
      {
        id: 2,
        icon: 'event',
        label: 'Planejamento de eventos',
        lists: []
      },
      {
        id: 3,
        icon: 'pets',
        label: 'Lista de cuidados com pet',
        lists: []
      },
      {
        id: 4,
        icon: 'work',
        label: 'Tarefas do trabalho',
        lists: []
      },
      {
        id: 5,
        icon: 'menu_book',
        label: 'Lista de estudos',
        lists: []
      },
      {
        id: 6,
        icon: 'weekend',
        label: 'Lista de lazer',
        lists: []
      },
      {
        id: 7,
        icon: 'flight',
        label: 'Planejamento de viagem',
        lists: []
      },
      {
        id: 8,
        icon: 'cleaning_services',
        label: 'Lista para faxina',
        lists: []
      },
      {
        id: 9,
        icon: 'self_improvement',
        label: 'Lista de desenvolvimento pessoal',
        lists: []
      }
    ]
  },
  mounted () {
    this.carregarListas()
  },
  computed: {
    categoriesWithLists () {
      return this.categories.filter(c => c.lists.length > 0)
    }
  },
  methods: {
    salvarLista (list) {
      const service = list.id ? listasService.update : listasService.create
      service(list)
        .then(result => {
          this.carregarListas()
          this.$q.notify({
            message: 'Donit!',
            color: 'positive',
            icon: 'done_all',
            timeout: 1000,
            progress: true
          })
          this.form = false
        })
    },
    inserirLista (list) {
      const selected = this.categories.find(el => el.id == list.type)
      selected.lists.push(list)
    },
    carregarListas () {
      this.$q.loading.show('Carregando listas...')
      for(let i = 0; i < this.categories.length; i++) {
        this.categories[i].lists = []
      }
      listasService.get()
        .then(response => {
          const lists = response.data
          for (let i = 0; i < lists.length; i++) {
            this.inserirLista(lists[i])
            if (this.edit && lists[i].id == this.selectedList.id) {
              this.selectedList = lists[i]
            }
          }
          this.$q.loading.hide()
        })
        .catch(error => {
          this.$q.loading.hide()
          if (error.response.status != 403) {
            this.$q.notify({
              message: 'Algum ocorreu durante a operação!',
              type: 'negative',
              icon: 'error'
            })
          }
        })
    },
    editLista () {
      this.edit = true
      this.form = true
    }
  }
}
</script>
