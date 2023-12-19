<template>
  <div>
    <v-row>
      <v-col>
        <h1>Crear Nuevo Funcionario</h1>
      </v-col>
    </v-row>

    <v-row class="fill-height">
      <v-col class="d-flex justify-center">
        <v-card max-width="500" width="500" elevation="3">
          <v-card-text>
            <v-form ref="form" v-model="formularioBuscarModel" @submit.prevent="buscarPacientePorRut" lazy-validation>
              <v-row>
                <v-col cols="10">
                  <v-text-field label="RUN" v-model="buscarRun" prepend-icon="mdi-account"></v-text-field>
                </v-col>
                <v-col cols="2">
                  <v-btn type="submit" class="mt-3" block color="success" :loading="btnBuscarCargando"
                    :disabled="btnBuscarDisabled">
                    <v-icon>mdi-magnify</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
            <v-alert text v-model="alertaErrorModel" outlined dismissible type="error" class="mt-5">
              {{ mensajeError }}
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <div v-show="mostrarTablaDatosIdentificacionPaciente" class="mt-5">
      <v-row>
        <v-col>
          <TablaDatosSimplePaciente :pacienteEncontrado="pacienteEncontrado" />
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <h3>Tipo Usuario</h3>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-autocomplete :items="listaTipoUsuario" v-model="modelTipoUsuario" label="Tipo Usuario" outlined dense
            hide-details>
          </v-autocomplete>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <h3>Asignar Contraseña</h3>
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
          <v-btn color="success" block dense @click="crearNuevoUsuario" :disabled="estaGuardandoAtencion" :loading="estaGuardandoAtencion">Crear Nuevo Usuario</v-btn>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import TablaDatosSimplePaciente from '@/components/TablaDatosSimplePaciente.vue'
import obtenerPacientePorRut from '@/services/paciente/obtenerPacientePorRut'
export default {
  name: 'CrearFuncionarioVista',
  data () {
    return {
      estaGuardandoAtencion: false,
      alertaErrorModel: false,
      mensajeError: '',
      alertaErrorModel2: false,
      mensajeError2: '',
      alertaSuccessModel: false,
      mensajeSuccess: '',
      modelTipoUsuario: '',
      modelContrasena: '',
      modelContrasenaRepetir: '',
      mostrarTablaDatosIdentificacionPaciente: false,
      mostrarTablasDeExamenes: false,
      formularioBuscarModel: true,
      buscarRun: '',
      btnBuscarCargando: false,
      btnBuscarDisabled: false,
      pacienteEncontrado: {},
      listaTipoUsuario: [
        'Administrador',
        'Administrativo',
        'Personal Salud',
        'Funcionario'
      ]
    }
  },
  methods: {
    buscarPacientePorRut () {
      this.btnBuscarCargando = true
      this.btnBuscarDisabled = true
      this.alertaErrorModel = false
      if (this.buscarRun === '') {
        this.mensajeError = 'Debe ingresar un RUN.'
        this.alertaErrorModel = true
        this.btnBuscarCargando = false
        this.btnBuscarDisabled = false
        return
      }
      obtenerPacientePorRut(this.buscarRun)
        .then((response) => {
          this.btnBuscarCargando = false
          this.btnBuscarDisabled = false
          if (response !== '') {
            this.pacienteEncontrado = response
            this.mostrarTablaDatosIdentificacionPaciente = true
          } else {
            this.mensajeError = 'No se encuentra un paciente con el RUN ingresado.'
            this.alertaErrorModel = true
            this.mostrarTablaDatosIdentificacionPaciente = false
          }
        })
        .catch(() => {
          this.mensajeError = 'Error inesperado con el servidor.'
          this.alertaErrorModel = true
          this.btnBuscarCargando = false
          this.btnBuscarDisabled = false
        })
    },
    crearNuevoUsuario () {
      this.alertaErrorModel2 = false
      if (this.modelTipoUsuario === '') {
        this.mensajeError2 = 'Debe seleccionar un tipo de usuario.'
        this.alertaErrorModel2 = true
        return
      }
      if (this.modelContrasena === '') {
        this.mensajeError2 = 'Debe ingresar una contraseña.'
        this.alertaErrorModel2 = true
        return
      }
      if (this.modelContrasenaRepetir === '') {
        this.mensajeError2 = 'Debe repetir la contraseña.'
        this.alertaErrorModel2 = true
        return
      }
      if (this.modelContrasena !== this.modelContrasenaRepetir) {
        this.mensajeError2 = 'Las contraseñas no coinciden.'
        this.alertaErrorModel2 = true
        return
      }
      this.alertaErrorModel2 = false
      this.mensajeError2 = ''

      this.estaGuardandoAtencion = true
      setTimeout(() => {
        this.estaGuardandoAtencion = false
        this.alertaSuccessModel = true
        this.modelContrasena = ''
        this.modelContrasenaRepetir = ''
        this.modelTipoUsuario = ''
        this.mensajeSuccess = 'Se ha ingresado correctamente la atención.'
      }, 1000)
    }
  },
  components: {
    TablaDatosSimplePaciente
  }
}
</script>
