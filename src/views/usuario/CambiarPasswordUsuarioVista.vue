<template>
  <div>
    <v-row>
      <v-col>
        <h1>Cambiar Contraseña</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-text-field dense type="password" label="Contraseña" v-model="modelContrasena"
          prepend-inner-icon="mdi-form-textbox-password" outlined hide-details></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-text-field dense type="password" label="Repetir Contraseña" v-model="modelContrasenaRepetir"
          prepend-inner-icon="mdi-form-textbox-password" outlined hide-details></v-text-field>
      </v-col>
    </v-row>

    <v-alert text v-model="alertaErrorModel2" outlined dismissible type="error" class="mt-5">
      {{ mensajeError2 }}
    </v-alert>

    <v-alert text v-model="alertaSuccessModel" outlined dismissible type="success" class="mt-5">
      {{ mensajeSuccess }}
    </v-alert>

    <v-row>
      <v-col>
        <v-btn color="success" block dense @click="cambiarContrasena" :disabled="estaGuardandoAtencion"
          :loading="estaGuardandoAtencion">Cambiar Contraseña</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'CambiarPasswordUsuarioVista',
  data () {
    return {
      estaGuardandoAtencion: false,
      modelContrasena: '',
      modelContrasenaRepetir: '',
      alertaErrorModel2: false,
      mensajeError2: '',
      alertaSuccessModel: false,
      mensajeSuccess: ''
    }
  },
  methods: {
    cambiarContrasena () {
      if (this.modelContrasena === '') {
        this.alertaErrorModel2 = true
        this.mensajeError2 = 'Debe ingresar una contraseña'
        return
      }
      if (this.modelContrasenaRepetir === '') {
        this.alertaErrorModel2 = true
        this.mensajeError2 = 'Debe repetir la contraseña'
        return
      }
      if (this.modelContrasena === this.modelContrasenaRepetir) {
        this.estaGuardandoAtencion = true
        setTimeout(() => {
          this.estaGuardandoAtencion = false
          this.alertaErrorModel2 = false
          this.alertaSuccessModel = true
          this.modelContrasena = ''
          this.modelContrasenaRepetir = ''
          this.modelTipoUsuario = ''
          this.mensajeSuccess = 'Se ha cambiado correctamente la contraseña.'
        }, 1000)
      } else {
        this.alertaErrorModel2 = true
        this.mensajeError2 = 'Las contraseñas no coinciden'
      }
    }
  }
}
</script>
