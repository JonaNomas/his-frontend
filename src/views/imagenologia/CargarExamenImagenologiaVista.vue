<template>
  <div>
    <v-row>
      <v-col>
        <h1>Cargar Exámenes de Imagenología</h1>
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
            hide-details :items="tiposDeExamen" item-text="nombre" item-value="nombre" @change="cambiarExamenesDisponibles"></v-autocomplete>
        </v-col>
        <v-col>
          <v-autocomplete dense label="Examen" v-model="selectExamenDisponible" prepend-inner-icon="mdi-account"
            outlined hide-details :items="examenesDisponibles" item-text="nombre" item-value="id"></v-autocomplete>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-textarea outlined v-model="textareaMotivoExamen" label="Motivo Examen" hide-details></v-textarea>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-textarea outlined v-model="textareaInforme" label="Informe" hide-details></v-textarea>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-textarea outlined v-model="textareaImpresionDiagnostica" label="Impresión Diagnóstica"
            hide-details></v-textarea>
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
          <v-btn color="secondary" :loading="btnGuardandoExamenCargando" :disabled="btnGuardandoExamenCargando" @click="guardarInforme" large block><v-icon left>mdi-content-save</v-icon>Guardar
            Informe</v-btn>
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script>
import obtenerPacientePorRut from '@/services/paciente/obtenerPacientePorRut'
import TablaDatosSimplePaciente from '@/components/TablaDatosSimplePaciente.vue'
import obtenerListadoExamenes from '@/services/imagenologia/obtenerListadoExamenes'

export default {
  name: 'CargarExamenImagenologiaVista',
  data () {
    return {
      // Manejo de error
      alertaErrorModel: false,
      mensajeError: '',

      alertaErrorModel2: false,
      mensajeError2: '',

      alertaSuccessModel: false,
      mensajeSuccess: '',
      // Formulario buscar por RUT
      formularioBuscarModel: true,
      btnBuscarCargando: false,
      btnGuardandoExamenCargando: false,
      // Datos
      buscarRun: '',
      pacienteEncontrado: {},
      seEncontroPaciente: false,
      // Autocomplete
      tiposDeExamen: [
        {
          id: 1,
          nombre: 'Radiografía'
        },
        {
          id: 2,
          nombre: 'TAC'
        },
        {
          id: 3,
          nombre: 'Ecografías'
        }
      ],
      examenesDisponibles: [],
      // Campos
      selectTipoDeExamen: '',
      selectExamenDisponible: '',
      textareaInforme: '',
      textareaMotivoExamen: '',
      textareaImpresionDiagnostica: ''
    }
  },
  methods: {
    buscarPacientePorRut () {
      this.btnBuscarCargando = true
      this.alertaErrorModel = false
      this.seEncontroPaciente = false
      obtenerPacientePorRut(this.buscarRun)
        .then((response) => {
          if (response === '') {
            this.mensajeError = 'No se encontró un paciente con el RUN ingresado.'
            this.alertaErrorModel = true
            this.btnBuscarCargando = false
            this.seEncontroPaciente = false
            return
          }
          this.seEncontroPaciente = true
          this.pacienteEncontrado = response
          this.btnBuscarCargando = false
        })
        .catch(() => {
          this.btnBuscarCargando = false
          this.seEncontroPaciente = false
        })
    },
    guardarInforme () {
      if (this.selectTipoDeExamen === '' || this.selectExamenDisponible === '' || this.textareaInforme === '' || this.textareaMotivoExamen === '' || this.textareaImpresionDiagnostica === '') {
        this.mensajeError2 = 'Debe completar todos los campos.'
        this.alertaErrorModel2 = true
        return
      }
      this.btnGuardandoExamenCargando = true

      setTimeout(() => {
        this.btnGuardandoExamenCargando = false
        this.alertaSuccessModel = true
        this.mensajeSuccess = 'Se ha guardado el informe correctamente.'
        this.textareaInforme = ''
        this.textareaMotivoExamen = ''
        this.textareaImpresionDiagnostica = ''
      }, 1000)
    },
    cambiarExamenesDisponibles () {
      this.examenesDisponibles = obtenerListadoExamenes().filter((examen) => examen.tipo === this.selectTipoDeExamen)
    }
  },
  components: {
    TablaDatosSimplePaciente
  }
}
</script>
