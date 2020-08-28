<template>
  <div style="width: 100%; height: 100vh; background-color: #f8f8f8;">
    <div class="fit column wrap justify-center items-center content-center">
      <q-card class="login__card">
        <q-card-section horizontal style="height: 100%;" class="fit row wrap justify-between items-center content-center">
          <q-card-section class="col-4 full-height">
            <div class="full-height column  justify-around items-end content-around">
              <div class="full-width row wrap justify-center items-center content-center">
                <q-icon class="logo_icon" name="done_all" size="8em" style="background-color: #407bff; color: white;" />
                <p style="font-size: 1.7em;"><span style="font-weight: 600;">Donit</span><br>Um novo jeito de se organizar</p>
              </div>
              <q-form class="full-width q-px-md column wrap justify-center items-center content-center" @submit="realizarLogin">
                <div class="q-py-md full-width">
                  <!-- <p>Login</p> -->
                  <q-input outlined standout="bg-primary text-white" v-model="login" label="Login" :rules="[ruleFieldNotEmpty]" />
                </div>
                <div class="q-py-md full-width">
                  <!-- <p>Senha</p> -->
                  <q-input type="password" outlined standout="bg-primary text-white" v-model="senha" label="Senha" :rules="[ruleFieldNotEmpty]" />
                </div>
                <q-btn round color="primary" icon="arrow_right_alt" size="lg" type="submit">
                  <q-tooltip anchor="top middle" self="center middle">
                    Clique para logar
                  </q-tooltip>
                </q-btn>
              </q-form>
            </div>
          </q-card-section>
          <img
            src="intro.svg"
            style="height: 100%;"
          />
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      login: '',
      senha: ''
    }
  },
  methods: {
    realizarLogin () {
      this.$router.push({ name: 'Listas', params: { login: this.login }})
    },
    ruleFieldNotEmpty (val) {
      return (val != null && val.length > 0) || 'Favor preencher este campo para prosseguir'
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=B612:wght@400;700&display=swap');

.login__card {
  width: 60vw;
  height: 70vh;
  font-size: larger;
  text-align: center;
}

.q-form {
  text-align: left;
}

.logo_icon {
  font-size: 8em;
  border-radius: 35px;
  color: white;
  background-color: rgb(64, 123, 255);
  padding: 5px;
  margin-bottom: 35px;
}
</style>