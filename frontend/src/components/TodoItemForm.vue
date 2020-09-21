<template>
  <q-card class="q-pa-md full-width">
    <q-card-section class="row items-center q-pb-none">
      <div class="text-h6">Cadastrar tarefa</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>
    <q-card-section>
      <q-form class="q-gutter-md row" @submit="salvarTarefa">
        <q-input v-model="name" label="Nome" class="col-12 q-ml-sm" filled />
        <q-input v-model="description" label="Descrição" type="textarea" class="col-12 q-ml-sm" filled  />
        <div class="row col-12 q-ml-sm">
          <q-input filled v-model="due_date" class="col-6" label="Data final" >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date mask="DD-MM-YYYY" v-model="due_date" @input="() => $refs.qDateProxy.hide()" :options="date => date >= '2020/03/10'" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-item class="col-6">
            <q-item-section avatar>
              <q-icon name="priority_high" :color="priorityColor" />
            </q-item-section>
            <q-item-section>
              <q-slider
                v-model="priority"
                :min="1"
                :max="3"
                :color="priorityColor"
                label
                label-always
                :label-value="'Priodidade : ' + priority"
              />
            </q-item-section>
          </q-item>
        </div>
        <q-card-actions align="right" class="q-pr-none full-width">
          <q-btn label="Salvar tarefa" type="submit" color="primary" icon-right="add" />
        </q-card-actions>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  props: {
    item: Object
  },
  data () {
    return {
      id: null,
      name: '',
      description: '',
      priority: 1,
      creation_date: null,
      conclusion_date: null,
      due_date: null
    }
  },
  mounted () {
    if (this.item) {
      this.id = this.item.id
      this.name = this.item.name
      this.description = this.item.description
      this.priority = this.item.priority
      this.creation_date = this.item.creation_date
      this.conclusion_date = this.item.conclusion_date
      this.due_date = this.item.due_date
    }
  },
  computed: {
    priorityColor () {
      return this.priority === 1 ? 'primary' : this.priority === 2 ? 'warning' : 'red'
    },
    itemObject () {
      const tempDate = this.due_date ? this.due_date.split('-') : null
      return {
        id: this.id,
        name: this.name,
        description: this.description,
        done: false,
        priority: this.priority,
        creation_date: this.creation_date ? this.creation_date : new Date(),
        conclusion_date: this.conclusion_date,
        due_date: tempDate ? new Date(tempDate[2], tempDate[1] - 1, tempDate[0]) : null
      }
    }
  },
  methods: {
    salvarTarefa () {
      this.$emit('salvarTarefa', this.itemObject)
      this.$q.notify({
        message: 'Tarefa cadastrada com sucesso',
        color: 'positive',
        icon: 'done_all',
        timeout: 1000,
        progress: true
      })
    }
  }
}
</script>

<style>

</style>
