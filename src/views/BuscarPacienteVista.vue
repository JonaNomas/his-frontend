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
                  <v-btn type="submit" class="mt-3" block color="success">
                    <v-icon>mdi-magnify</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <TablaDatosIdentificacionPaciente />

    <div>
      <TablaAtencionesUrgenciaHC />
      <TablaHospitalizacionesHC />
    </div>
  </div>
</template>

<script>
import TablaAtencionesUrgenciaHC from '@/components/historiasClinicas/TablaAtencionesUrgenciaHC.vue'
import TablaDatosIdentificacionPaciente from '@/components/historiasClinicas/TablaDatosIdentificacionPaciente.vue'
import TablaHospitalizacionesHC from '@/components/historiasClinicas/TablaHospitalizacionesHC.vue'

export default {
  name: 'BuscarPacienteVista',
  data () {
    return {
      formularioBuscarModel: true,
      buscarRun: ''
    }
  },
  methods: {
    buscarPacientePorRut () {
      console.log('buscarPacientePorRut', this.buscarRun)
    }
  },
  components: {
    TablaDatosIdentificacionPaciente,
    TablaAtencionesUrgenciaHC,
    TablaHospitalizacionesHC
  }
}
</script>
