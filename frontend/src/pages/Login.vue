<template>
  <div style="width: 100%; height: 100vh; background-color: #f8f8f8;">
    <div class="fit column wrap justify-center items-center content-center">
      <q-card class="main__card" :class="cadastro ? 'register__card all__transitions' : 'login__card '">
        <q-card-section horizontal style="height: 100%;" class="fit row wrap justify-between items-center content-center">
          <q-card-section class="full-height" :class="cadastro ? 'full-width all__transitions' : null">
            <div class="full-height column  justify-around items-end content-around"  v-if="!cadastro">
              <div class="full-width row wrap justify-center items-center content-center">
                <q-icon class="logo__icon" name="img:icon.png" size="8em" />
                <p style="font-size: 1.7em;" class="col-12"><span style="font-weight: 600;">Donit</span><br>Um novo jeito de se organizar</p>
              </div>
              <q-form class="full-width q-px-md column wrap justify-center items-center content-center" @submit="realizarLogin" ref="form_login" >
                <div class="q-py-md full-width">
                  <q-input outlined standout="bg-primary text-white" v-model="email" label="E-mail" :rules="[ruleFieldNotEmpty]" />
                </div>
                <div class="q-py-md full-width">
                  <q-input type="password" outlined standout="bg-primary text-white" v-model="pass" label="Senha" :rules="[ruleFieldNotEmpty]" />
                </div>
                <q-btn round color="primary" icon="arrow_right_alt" size="lg" type="submit" :loading="loading">
                  <q-tooltip anchor="top middle" self="center middle">
                    Clique para logar
                  </q-tooltip>
                </q-btn>
                <div class="q-mt-md">
                  <p class="link__cadastro text-primary" @click="cadastro = true">
                    <span class="text-grey">Não possui cadastro?</span> Crie uma conta!
                    <q-tooltip anchor="bottom middle" self="top middle">
                      Clique para se cadastrar
                    </q-tooltip>
                  </p>
                </div>
              </q-form>
            </div>
            <div v-else class="full-height full-width row wrap justify-center items-start content-start">
              <div class="full-width">
                <q-icon class="logo__icon" name="done_all" size="8em" style="background-color: #407bff; color: white;" />
                <p class="col-12" style="font-size: 1.7em;"><span style="font-weight: 600;">Donit</span></p>
              </div>
              <q-form class="full-width q-pt-lg" @submit="realizarCadastro">
                <div class="text-center">
                  Preencha os campos abaixo para realizar o cadastro.
                </div>
                <div class="q-pt-md full-width q-px-md">
                  <q-input outlined standout="bg-primary text-white" v-model="email" label="E-mail" :rules="[ruleFieldNotEmpty]" />
                </div>
                <div class="q-pt-md full-width q-px-md">
                  <q-input outlined standout="bg-primary text-white" v-model="name" label="Nome" :rules="[ruleFieldNotEmpty]" />
                </div>
                <div class="full-width q-px-md">
                  <q-input type="password" outlined standout="bg-primary text-white" v-model="pass" label="Senha" :rules="[ruleFieldNotEmpty]" />
                </div>
                <div class="full-width q-px-md">
                  <q-input type="password" outlined standout="bg-primary text-white" v-model="confirmaSenha" label="Confirmação Senha" :rules="[ruleFieldNotEmpty, ruleEqualPasswords]" />
                </div>
                <q-card-actions align="center" class="q-pt-md">
                  <q-btn color="primary" style="width: 200px" type="submit" :loading="loading">Cadastrar</q-btn>
                </q-card-actions>
              </q-form>
            </div>
          </q-card-section>
          <img
            v-if="!cadastro"
            src="intro.svg"
            class="login__svg"
            style="height: 100%;"
          />
        </q-card-section>
        <q-btn v-if="cadastro" class="absolute-top-left" icon="keyboard_backspace" flat color="primary" size="lg" @click="cadastro = false">
          <q-tooltip anchor="bottom middle" self="top middle">
            Voltar para tela de login
          </q-tooltip>
        </q-btn>
      </q-card>
    </div>
  </div>
</template>

<script>
import loginService from '../services/loginService'

export default {
  name: 'login',
  data () {
    return {
      email: '',
      name: '',
      pass: '',
      cadastro: false,
      confirmaSenha: '',
      loading: false
    }
  },
  methods: {
    realizarLogin () {
      this.loading = true
      loginService.login({
        email: this.email,
        password: this.pass
      })
        .then((response) => {
          this.$q.notify({
            message: 'Donit up!',
            type: 'positive',
            icon: 'done_all'
          })
          this.$router.push({ name: 'Listas'})
          this.loading = false
        })
        .catch(err => {
          this.$q.notify({
            message: 'Usuário não encontrado',
            type: 'negative',
            icon: 'error'
          })
          this.loading = false
        })
    },
    realizarCadastro () {
      this.loading = true
      loginService.cadastro({
        email: this.email,
        name: this.name,
        password: this.pass
      })
        .then((response) => {
          this.$q.notify({
            message: 'Usuário cadastrado com sucesso!',
            type: 'positive',
            icon: 'done_all'
          })
          this.cadastro = false
          this.loading = false
          this.email = null
          this.name = null
          this.pass = null
          this.confirmaSenha = null
          this.$nextTick(() => {
            this.$refs.form_login.resetValidation()
          })
        })
        .catch(err => {
          this.$q.notify({
            message: 'Já existe um usuário cadastrado com esse e-mail.',
            type: 'negative',
            icon: 'error'
          })
          this.loading = false
        })
    },
    ruleFieldNotEmpty (val) {
      return (val != null && val.length > 0) || 'Favor preencher este campo para prosseguir'
    },
    ruleEqualPasswords (val) {
      return (val === this.pass) || 'As senhas digitadas são diferentes.'
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=B612:wght@400;700&display=swap');
.all__transitions {
  transition: all 1s;
}

.main__card {
  height: 80vh;
  font-size: larger;
  text-align: center;
}

.login__card {
  width: 60vw;
}

.register__card {
  width: 500px;
}

.q-form {
  text-align: left;
}

.logo__icon {
  font-size: 8em;
  border-radius: 35px;
  color: white;
  padding: 5px;
  margin-bottom: 35px;
}

.link__cadastro {
  font-size: 14px;
  display: inline;
}

.link__cadastro:hover {
  cursor: pointer;
}

@media screen and (max-width: 1140px) {
  .login__svg {
    display: none;
  }
}
</style>