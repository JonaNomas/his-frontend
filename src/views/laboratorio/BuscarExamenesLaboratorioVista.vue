<template>
  <div>
    <v-row>
      <v-col>
        <h1>Buscar Exámenes de Laboratorio Ingresados</h1>
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

    <div v-if="mostrarResultado">
      <v-row>
        <v-col>
          <h2>Resultados</h2>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-data-table :hide-default-footer="true" :disable-pagination="true" dense
            :headers="headersTabla" :items="listadoTabla"
            class="elevation-1">
            <template #[`item.actions`]="{ item }">
              <div>
                <v-btn x-small color="accent" button :to="`/laboratorio/buscar/${item.id}`">Ver</v-btn>
              </div>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import obtenerPacientePorRut from '@/services/paciente/obtenerPacientePorRut'

export default {
  name: 'BuscarExamenesLaboratorioVista',
  data () {
    return {
      // Resultado
      mostrarResultado: true,
      pacienteEncontrado: {},
      buscarRun: '',
      // Modal de error
      alertaErrorModel: false,
      mensajeError: '',
      // Formulario
      btnBuscarCargando: false,
      formularioBuscarModel: true,
      // Tabla
      headersTabla: [
        { text: 'ID', value: 'id' },
        { text: 'Run', value: 'rut' },
        { text: 'Nombre', value: 'nombre' },
        { text: 'Fecha', value: 'fecha' },
        { text: 'Acciones', value: 'actions', sortable: false }
      ],
      listadoTabla: []
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
          this.llenarTabla()
        })
        .catch(() => {
          this.btnBuscarCargando = false
          this.seEncontroPaciente = false
        })
    },
    async llenarTabla () {
      this.listadoTabla = [
        { id: 12, rut: this.pacienteEncontrado.run, nombre: `${this.pacienteEncontrado.nombrePrimer} ${this.pacienteEncontrado.nombreSegundo} ${this.pacienteEncontrado.apellidoPaterno} ${this.pacienteEncontrado.apellidoMaterno}`, fecha: '2023-12-15' },
        { id: 22, rut: this.pacienteEncontrado.run, nombre: `${this.pacienteEncontrado.nombrePrimer} ${this.pacienteEncontrado.nombreSegundo} ${this.pacienteEncontrado.apellidoPaterno} ${this.pacienteEncontrado.apellidoMaterno}`, fecha: '2023-12-15' },
        { id: 24, rut: this.pacienteEncontrado.run, nombre: `${this.pacienteEncontrado.nombrePrimer} ${this.pacienteEncontrado.nombreSegundo} ${this.pacienteEncontrado.apellidoPaterno} ${this.pacienteEncontrado.apellidoMaterno}`, fecha: '2023-12-15' },
        { id: 25, rut: this.pacienteEncontrado.run, nombre: `${this.pacienteEncontrado.nombrePrimer} ${this.pacienteEncontrado.nombreSegundo} ${this.pacienteEncontrado.apellidoPaterno} ${this.pacienteEncontrado.apellidoMaterno}`, fecha: '2023-12-15' },
        { id: 26, rut: this.pacienteEncontrado.run, nombre: `${this.pacienteEncontrado.nombrePrimer} ${this.pacienteEncontrado.nombreSegundo} ${this.pacienteEncontrado.apellidoPaterno} ${this.pacienteEncontrado.apellidoMaterno}`, fecha: '2023-12-16' },
        { id: 42, rut: this.pacienteEncontrado.run, nombre: `${this.pacienteEncontrado.nombrePrimer} ${this.pacienteEncontrado.nombreSegundo} ${this.pacienteEncontrado.apellidoPaterno} ${this.pacienteEncontrado.apellidoMaterno}`, fecha: '2023-12-16' }
      ]
    }
  }
}
</script>
