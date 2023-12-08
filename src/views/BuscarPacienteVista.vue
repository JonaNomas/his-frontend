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
import obtenerUsuarioPorRut from '@/services/obtenerUsuarioPorRut'

export default {
  name: 'BuscarPacienteVista',
  data () {
    return {
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
      console.log('buscarPacientePorRut', this.buscarRun)
      obtenerUsuarioPorRut(this.buscarRun)
        .then((response) => {
          console.log(response)
          this.btnBuscarCargando = false
          this.btnBuscarDisabled = false
          if (response.data !== '') {
            console.log('encontrado')
            this.pacienteEncontrado = response.data
            this.mostrarTablaDatosIdentificacionPaciente = true
          } else {
            console.log('no encontrado')
            this.mostrarTablaDatosIdentificacionPaciente = false
          }
        })
        .catch((error) => {
          console.log(error)
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
