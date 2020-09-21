<template>
  <q-card class="q-pa-md full-width">
    <q-card-section class="row items-center q-pb-none">
      <div class="text-h6">Cadastrar lista</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>
    <q-card-section>
      <q-form class="q-gutter-md row" @submit="salvarLista">
        <q-input v-model="name" label="Nome" class="col-12 q-ml-sm" filled />
        <q-field 
          borderless
          stack-label
          label="Selecionar categoria *"
          class="col-12 q-ml-sm q-pa-sm"
          :rules="[categoryRequired]"
        >
          <template v-slot:control>
            <div class="fit row wrap justify-around items-start content-start q-mt-xl">
              <q-btn 
                v-for="category in categories" 
                :flat="selectedCategory != category.id"
                :key="category.id" 
                :icon="category.icon" 
                :color="selectedCategory == category.id ? 'primary' : 'white'"
                :text-color="selectedCategory == category.id ? 'white' : 'grey'"
                @click="selectedCategory = category.id"
                size="1.2rem"
                class="col-2 q-mx-sm"
              >
                <q-tooltip class="text-subtitle1" :content-class="selectedCategory == category.id ? 'bg-primary' : null">
                  {{ category.label }}
                </q-tooltip>
              </q-btn>
            </div>
          </template>
        </q-field>
        <q-card-actions align="right" class="q-pr-none full-width">
          <q-btn label="Salvar Lista" type="submit" color="primary" icon-right="add" />
        </q-card-actions>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  props: {
    categories: Array
  },
  data () {
    return {
      id: null,
      name: '',
      selectedCategory: null
    }
  },
  mounted () {
  },
  methods: {
    salvarLista () {
      this.$q.notify({
        message: 'Tarefa cadastrada com sucesso',
        color: 'positive',
        icon: 'done_all',
        timeout: 1000,
        progress: true
      })
      this.$emit('salvarLista', {
        id: this.id,
        name: this.name,
        category: this.selectedCategory,
        tarefas: []
      })
    },
    categoryRequired (val) {
      return this.selectedCategory != null || 'Favor selecionar uma categoria para a lista.'
    }
  }
}
</script>

<style>

</style>