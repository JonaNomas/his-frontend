<template>
  <div>
    <v-row>
      <v-col>
        <h1>Cargar Exámenes de Laboratorio</h1>
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
          <h2>Exámenes</h2>
        </v-col>
      </v-row>

      <v-row ref="contenedorVista">
        <v-col>
          <v-autocomplete ref="inputExamenLista" dense label="Examen" v-model="selectExamenDisponible"
            prepend-inner-icon="mdi-account" outlined hide-details :items="examenesDisponibles" item-text="nombre"
            item-value="idExamenLaboratorio"></v-autocomplete>
        </v-col>
        <v-col>
          <v-text-field dense label="Resultado" v-model="resultadoExamenSeleccionado" prepend-inner-icon="mdi-counter"
            outlined hide-details></v-text-field>
        </v-col>
        <v-col>
          <v-btn color="secondary" :disabled="selectExamenDisponible === '' || resultadoExamenSeleccionado === ''" block
            @click="agregarNuevoExamen"><v-icon>mdi-plus</v-icon></v-btn>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-data-table dense :headers="headersTabla" :items="examenesAgregados" class="elevation-1">
            <template #[`item.actions`]="{ item }">
              <div>
                <v-icon color="error" @click="windows.alert(item)">mdi-delete</v-icon>
              </div>
            </template>
          </v-data-table>
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
          <v-btn color="secondary" :loading="btnGuardandoExamenCargando" :disabled="btnGuardandoExamenCargando" large block @click="guardarRegistro"><v-icon left>mdi-content-save</v-icon>Guardar Exámenes Regitrados</v-btn>
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script>
import obtenerPacientePorRut from '@/services/paciente/obtenerPacientePorRut'
import TablaDatosSimplePaciente from '@/components/TablaDatosSimplePaciente.vue'
import obtenerListadoExamenesLaboratorio from '@/services/laboratorio/obtenerListadoExamenes'

export default {
  name: 'CargarExamenImagenologiaVista',
  data () {
    return {
      // Mensajes
      alertaErrorModel: false,
      mensajeError: '',
      alertaErrorModel2: false,
      mensajeError2: '',
      alertaSuccessModel: false,
      mensajeSuccess: '',
      // Cargando
      btnGuardandoExamenCargando: false,
      // Formulario buscar por RUT
      formularioBuscarModel: true,
      btnBuscarCargando: false,
      // Datos
      buscarRun: '',
      pacienteEncontrado: {},
      seEncontroPaciente: false,
      // Autocomplete
      examenesDisponibles: [],
      // Campos
      selectExamenDisponible: '',
      resultadoExamenSeleccionado: '',
      // Examenes
      examenes: [],
      // Tabla
      dialogEditar: false,
      dialogDelete: false,
      headersTabla: [
        { text: 'Codigo', value: 'codigo', align: 'center', sortable: false },
        { text: 'Nombre Examen', value: 'nombre' },
        { text: 'Resultado', value: 'resultado', align: 'center', sortable: false },
        { text: 'Acciones', value: 'actions', sortable: false, align: 'center' }
      ],
      examenesAgregados: [
      ]
    }
  },
  methods: {
    async listarExamenesLaboratorio () {
      // TODO: LLamada a API
      this.examenesDisponibles = await obtenerListadoExamenesLaboratorio()
    },
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
    agregarNuevoExamen () {
      if (this.selectExamenDisponible === '' || this.resultadoExamenSeleccionado === '') {
        this.mensajeError2 = 'Debe seleccionar un examen y agregar un resultado.'
        this.alertaErrorModel2 = true
        return
      }

      if (this.examenesAgregados.find(objeto => objeto.id === this.selectExamenDisponible)) {
        this.mensajeError2 = 'El examen seleccionado ya se encuentra agregado.'
        this.alertaErrorModel2 = true
        return
      }

      const objetoEncontrado = this.examenesDisponibles.find(objeto => objeto.idExamenLaboratorio === this.selectExamenDisponible)

      this.examenesAgregados.push({
        id: objetoEncontrado.idExamenLaboratorio,
        codigo: objetoEncontrado.codigo,
        nombre: objetoEncontrado.nombre,
        resultado: this.resultadoExamenSeleccionado
      })
      this.selectExamenDisponible = ''
      this.resultadoExamenSeleccionado = ''

      this.$refs.inputExamenLista.focus()
    },
    guardarRegistro () {
      if (this.examenesAgregados.length === 0) {
        this.mensajeError2 = 'Debe agregar al menos un examen.'
        this.alertaErrorModel2 = true
        return
      }

      this.btnGuardandoExamenCargando = true
      setTimeout(() => {
        this.btnGuardandoExamenCargando = false
        this.alertaSuccessModel = true
        this.mensajeSuccess = 'Se ha guardado el registro correctamente.'
        this.textareaInforme = ''
        this.selectExamenDisponible = ''
        this.resultadoExamenSeleccionado = ''
        this.examenesAgregados = []
      }, 1000)
    }
  },
  mounted () {
    this.listarExamenesLaboratorio()
  },
  components: {
    TablaDatosSimplePaciente
  }
}
</script>
