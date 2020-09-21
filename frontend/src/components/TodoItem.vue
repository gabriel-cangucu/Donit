<template>
  <q-item tag="label" v-ripple class="q-my-sm bg-white">
    <q-item-section avatar>
      <q-checkbox v-model="done" :color="priority_color" keep-color>
        <q-tooltip>
          <div v-if="done">
            Concluído em {{ conclusion_date }}
          </div>
          <div v-else>
            Marcar como concluído
          </div>
        </q-tooltip>
      </q-checkbox>
    </q-item-section>
    <q-item-section>
      <q-item-label :class="done ? 'text-strike text-grey-8' : null">{{ name }}</q-item-label>
      <q-item-label caption :class="done ? 'text-strike' : null">{{ description }}</q-item-label>
    </q-item-section>
    <q-item-section side>
      <div class="row no-wrap">
        <q-btn color="black" flat round icon="edit" @click="edit">
          <q-tooltip>
            Editar tarefa
          </q-tooltip>
        </q-btn>
        <q-btn color="black" flat round icon="delete_forever" @click="remove">
          <q-tooltip>
            Remover tarefa
          </q-tooltip>
        </q-btn>
      </div>
    </q-item-section>
    <q-badge color="black" floating v-if="!done && days_left < 0">
      {{ Math.abs(days_left) }}
      <q-tooltip>
        Dias em atraso
      </q-tooltip>
    </q-badge>
  </q-item>
</template>

<script>
import { date } from 'quasar'

export default {
  props: [
    'id',
    'name',
    'description',
    'done',
    'priority',
    'creation_date',
    'conclusion_date',
    'due_date'
  ],
  data () {
    return {
    }
  },
  watch: {
    done (val) {
      if (val) {
        this.conclusion_date = new Date()
      }
      this.$emit('update', val)
    }
  },
  computed: {
    days_left () {
      return this.done ? null : date.getDateDiff(this.due_date, new Date(), 'days')
    },
    priority_color () {
      return this.priority === 1 ? 'primary' : this.priority === 2 ? 'warning' : 'red'
    }
  },
  methods: {
    remove () {
      this.$emit('remove')
    },
    edit () {
      this.$emit('edit')
    }
  }
}
</script>

<style>

</style>
