<template>
  <div>
    <h1 class="text-center mb-3">Buscar Paciente</h1>

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

    <div v-show="mostrarTablaDatosIdentificacionPaciente">
      <TablaDatosIdentificacionPaciente :pacienteEncontrado="pacienteEncontrado" />
    </div>

    <div v-if="mostrarTablasDeExamenes">
      <TablaAtencionesUrgenciaHC />
      <TablaHospitalizacionesHC />
    </div>
  </div>
</template>

<script>
import TablaAtencionesUrgenciaHC from '@/components/historiasClinicas/TablaAtencionesUrgenciaHC.vue'
import TablaDatosIdentificacionPaciente from '@/components/historiasClinicas/TablaDatosIdentificacionPaciente.vue'
import TablaHospitalizacionesHC from '@/components/historiasClinicas/TablaHospitalizacionesHC.vue'
import obtenerPacientePorRut from '@/services/paciente/obtenerPacientePorRut'

export default {
  name: 'BuscarPacienteVista',
  data () {
    return {
      alertaErrorModel: false,
      mensajeError: '',
      mostrarTablaDatosIdentificacionPaciente: false,
      mostrarTablasDeExamenes: false,
      formularioBuscarModel: true,
      buscarRun: '',
      btnBuscarCargando: false,
      btnBuscarDisabled: false,
      pacienteEncontrado: {}
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
          if (response.data !== '') {
            this.pacienteEncontrado = response.data
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
    }
  },
  components: {
    TablaDatosIdentificacionPaciente,
    TablaAtencionesUrgenciaHC,
    TablaHospitalizacionesHC
  }
}
</script>
