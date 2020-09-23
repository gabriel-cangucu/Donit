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
        <q-input v-model="desc" label="Descrição" type="textarea" class="col-12 q-ml-sm" filled  />
        <q-field 
          borderless
          stack-label
          label="Selecionar categoria *"
          class="col-12 q-ml-sm q-pa-sm"
          :rules="[typeRequired]"
        >
          <template v-slot:control>
            <div class="fit row wrap justify-around items-start content-start q-mt-xl">
              <q-btn 
                v-for="type in categories" 
                :flat="selectedType != type.id"
                :key="type.id" 
                :icon="type.icon" 
                :color="selectedType == type.id ? 'primary' : 'white'"
                :text-color="selectedType == type.id ? 'white' : 'grey'"
                @click="selectedType = type.id"
                size="1.2rem"
                class="col-2 q-mx-sm"
              >
                <q-tooltip class="text-subtitle1" :content-class="selectedType == type.id ? 'bg-primary' : null">
                  {{ type.label }}
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
import listasService from '../services/listasService'

export default {
  props: {
    categories: Array,
    item: Object
  },
  data () {
    return {
      id: null,
      name: '',
      selectedType: null,
      desc: ''
    }
  },
  mounted () {
    if (this.item.edit) {
      this.id = this.item.id
      this.name = this.item.name
      this.selectedType = this.item.type
      this.desc = this.item.desc
    }
  },
  methods: {
    salvarLista () {
      this.$emit('salvarLista', {
        id: this.id,
        name: this.name,
        type: this.selectedType,
        desc: this.desc
      })
    },
    typeRequired (val) {
      return this.selectedType != null || 'Favor selecionar uma categoria para a lista.'
    }
  }
}
</script>

<style>

</style>