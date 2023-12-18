<template>
  <div>
    <v-row class="fill-height">
      <v-col class="d-flex justify-center mt-15">
        <v-card max-width="500" width="500" elevation="5">
          <v-toolbar color="primary" dark dense>
            <v-toolbar-title><v-icon left>mdi-account</v-icon> Iniciar Sesión</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" v-model="valid" @submit.prevent="iniciarSesion" lazy-validation>
              <v-text-field v-model="run" label="RUN" prepend-icon="mdi-account"></v-text-field>
              <v-text-field v-model="password" label="Contraseña" prepend-icon="mdi-key-variant"
                type="password"></v-text-field>
              <v-btn type="submit" class="mt-3" block color="success" :loading="estaCargando" :disabled="estaCargando">Ingresar</v-btn>
            </v-form>

            <v-alert text v-model="alertaErrorModel" outlined dismissible type="error" class="mt-5">
              {{ mensajeError }}
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import inicioSesionUsuario from '@/services/inicioSesionUsuario.js'
import decodificarJWT from '@/utils/decodificarJWT.js'

export default {
  data () {
    return {
      estaCargando: false,
      valid: false,
      run: '',
      password: '',
      alertaErrorModel: false,
      mensajeError: ''
    }
  },
  methods: {
    async iniciarSesion () {
      if (this.run === '' || this.password === '') {
        this.alertaErrorModel = true
        this.mensajeError = 'Debe completar todos los campos.'
        return
      }
      this.estaCargando = true
      const data = await inicioSesionUsuario(this.run, this.password)

      if (data.login) {
        const usuario = decodificarJWT(data.token)
        this.$store.commit('setUsuario', usuario)
        this.$store.commit('setEstaLoggeado', true)
        sessionStorage.setItem('token', data.token)
        this.$router.push({ path: '/' })
      } else {
        this.alertaErrorModel = true
        this.mensajeError = 'Las credenciales proporcionadas no son válidas.'
        this.password = ''
      }
      this.estaCargando = false
    }
  },
  beforeCreate () {
    if (this.$store.state.estaLoggeado) {
      this.$router.push({ path: '/' })
    }
  }
}
</script>
