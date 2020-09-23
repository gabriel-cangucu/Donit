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
          <q-input filled v-model="dueDate" class="col-6" label="Data final" >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date mask="DD-MM-YYYY" :locale="myLocale" v-model="dueDate" @input="() => $refs.qDateProxy.hide()" :options="compareDate" />
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
      creationDate: null,
      conclusionDate: null,
      dueDate: null,
      myLocale: {
        days: 'Domingo_Segunda_Terça_Quarta_Quinta_Sexta_Sábado'.split('_'),
        daysShort: 'Dom_Seg_Ter_Qua_Qui_Sex_Sáb'.split('_'),
        months: ['Janeiro', 'Feveiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Maio', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        firstDayOfWeek: 1
      }
    }
  },
  mounted () {
    if (this.item) {
      let dueDate = this.item.dueDate
      if (dueDate != null) {
        const parts = dueDate.split('-')
        if (parts.length == 3) {
          dueDate = parts[2] + '-' + parts[1] + '-' + parts[0]
        }
      }
      this.id = this.item.id
      this.name = this.item.name
      this.description = this.item.desc
      this.priority = this.item.priority
      this.creationDate = this.item.creationDate
      this.conclusionDate = this.item.conclusionDate
      this.dueDate = dueDate
    }
  },
  computed: {
    priorityColor () {
      return this.priority === 1 ? 'primary' : this.priority === 2 ? 'warning' : 'red'
    },
    itemObject () {
      const tempDate = this.dueDate ? this.dueDate.split('-') : null
      return {
        id: this.id,
        name: this.name,
        desc: this.description,
        priority: this.priority,
        creationDate: this.creationDate ? this.creationDate : new Date(),
        conclusionDate: this.conclusionDate,
        dueDate: tempDate ? new Date(tempDate[2], tempDate[1] - 1, tempDate[0]) : null
      }
    },
    today () {
      return Object.freeze(new Date().toLocaleDateString('pt-br').split('/').reverse().join('/'))
    },
    locale () {
      return {
        monthsShort: this.monthsShort
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
    },
    compareDate (date) {
      return date >= this.today
    }
  }
}
</script>

<style>

</style>
