<template>
  <q-page class="flex flex-center">
    <h1><span v-if="login">{{ login }}, </span>Página para exibir listas</h1>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  computed: {
    login () {
      return this.$route.params.login || null
    }
  }
}
</script>
