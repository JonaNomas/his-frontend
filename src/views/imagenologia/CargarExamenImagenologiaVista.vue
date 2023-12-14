<template>
  <div>
    <v-row>
      <v-col>
        <h1>Cargar Examenes de Imagenologia</h1>
      </v-col>
    </v-row>

    <v-row class="fill-height">
      <v-col class="d-flex justify-center">
        <v-card max-width="500" width="500" elevation="3">
          <v-card-text>
            <v-form ref="form" v-model="formularioBuscarModel" @submit.prevent="buscarPacientePorRut" lazy-validation
              :disabled="btnBuscarCargando">
              <v-row>
                <v-col cols="10">
                  <v-text-field label="RUN" v-model="buscarRun" prepend-icon="mdi-account"></v-text-field>
                </v-col>
                <v-col cols="2">
                  <v-btn type="submit" class="mt-3" block color="success" :loading="btnBuscarCargando"
                    :disabled="btnBuscarCargando">
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

    <div v-if="seEncontroPaciente">
      <v-row>
        <v-col>
          <TablaDatosSimplePaciente :pacienteEncontrado="pacienteEncontrado" />
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <h2>Examen</h2>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-autocomplete dense label="Tipo Examen" v-model="selectTipoDeExamen" prepend-inner-icon="mdi-account" outlined
            hide-details :items="tiposDeExamen" item-text="nombre" item-value="id"></v-autocomplete>
        </v-col>
        <v-col>
          <v-autocomplete dense label="Tipo Examen" v-model="selectExamenDisponible" prepend-inner-icon="mdi-account"
            outlined hide-details :items="examenesDisponibles" item-text="nombre" item-value="id"></v-autocomplete>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-textarea outlined v-model="textareaInforme" label="Informe" hide-details></v-textarea>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-btn color="secondary" large block><v-icon left>mdi-content-save</v-icon>Guardar Informe</v-btn>
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script>
import obtenerUsuarioPorRut from '@/services/obtenerUsuarioPorRut'
import TablaDatosSimplePaciente from '@/components/TablaDatosSimplePaciente.vue'

export default {
  name: 'CargarExamenImagenologiaVista',
  data () {
    return {
      // Manejo de error
      alertaErrorModel: false,
      mensajeError: '',
      // Formulario buscar por RUT
      formularioBuscarModel: true,
      btnBuscarCargando: false,
      // Datos
      buscarRun: '',
      pacienteEncontrado: {},
      seEncontroPaciente: true, /**/
      // Autocomplete
      tiposDeExamen: [
        { id: 1, nombre: 'Radiografia' },
        { id: 2, nombre: 'Tac' }
      ],
      examenesDisponibles: [
        { id: 1, nombre: 'Rx Torax' },
        { id: 2, nombre: 'Rx Torax AP' },
        { id: 3, nombre: 'Rx Columna Total' }
      ],
      // Campos
      selectTipoDeExamen: '',
      selectExamenDisponible: '',
      textareaInforme: ''
    }
  },
  methods: {
    buscarPacientePorRut () {
      this.btnBuscarCargando = true
      this.alertaErrorModel = false
      this.seEncontroPaciente = false
      obtenerUsuarioPorRut(this.buscarRun)
        .then(({ data }) => {
          console.log(data)
          if (data === '') {
            this.mensajeError = 'No se encontró un paciente con el RUN ingresado.'
            this.alertaErrorModel = true
            this.btnBuscarCargando = false
            this.seEncontroPaciente = false
            return
          }
          this.seEncontroPaciente = true
          this.pacienteEncontrado = data
          this.btnBuscarCargando = false
        })
        .catch((error) => {
          console.log(error)
          this.btnBuscarCargando = false
          this.seEncontroPaciente = false
        })
    }
  },
  components: {
    TablaDatosSimplePaciente
  }
}
</script>
