<template>
  <div>
    <v-row>
      <v-col>
        <h1>Cargar Examenes de Laboratorio</h1>
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
            <v-alert v-model="alertaErrorModel" outlined dismissible type="error" class="mt-5 text-center">
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

      <v-row>
        <v-col>
          <v-data-table :headers="headersTabla" :items="examenesAgregados" class="elevation-1">
            <template #[`item.actions`]="{item}">
              <div>
                <v-icon color="secondary" @click="windows.alert(item)">mdi-pencil-box</v-icon>
                <v-icon color="error" @click="windows.alert(item)">mdi-delete</v-icon>
              </div>
            </template>
          </v-data-table>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-autocomplete dense label="Examen" v-model="selectExamenDisponible" prepend-inner-icon="mdi-account" outlined
            hide-details :items="examenesDisponibles" item-text="nombre" item-value="id"></v-autocomplete>
        </v-col>
        <v-col>
          <v-text-field dense label="Resultado" v-model="resultadoExamenSeleccionado" prepend-inner-icon="mdi-counter"
            outlined hide-details></v-text-field>
        </v-col>
        <v-col>
          <v-btn color="secondary" block><v-icon>mdi-plus</v-icon></v-btn>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-btn color="secondary" large block><v-icon left>mdi-content-save</v-icon>Guardar Exámenes Regitrados</v-btn>
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
      examenesDisponibles: [
        { id: 1, nombre: 'Uremia' },
        { id: 2, nombre: 'Orina Completa' },
        { id: 3, nombre: 'Glucosa en Sangre' }
      ],
      // Campos
      selectExamenDisponible: '',
      resultadoExamenSeleccionado: '',
      // Examenes
      examenes: [],
      // Tabla
      dialog: false,
      dialogDelete: false,
      headersTabla: [
        { text: 'Codigo', value: 'codigo', align: 'center', sortable: false },
        { text: 'Nombre Examen', value: 'nombre' },
        { text: 'Resultado', value: 'resultado', align: 'center', sortable: false },
        { text: 'Acciones', value: 'actions', sortable: false, align: 'center' }
      ],
      examenesAgregados: [
        { id: '0', codigo: '022132', nombre: 'Uremia', resultado: '10' },
        { id: '1', codigo: '022132', nombre: 'Orina Completa', resultado: '20' },
        { id: '2', codigo: '022132', nombre: 'Glucosa en Sangre', resultado: '30' }
      ]
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
