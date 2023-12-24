<template>
  <div>
    <v-row>
      <v-col>
        <h1>Hospitalización Paciente - Medico</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <h5>ID Hospitalización: {{ $route.params.id }}</h5>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <TablaDatosSimplePaciente :paciente-encontrado="pacienteEncontrado" />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            <v-row>
              <v-col>Días Regitrados</v-col>
              <v-col><v-text-field dense v-model="filtroPacientes" append-icon="mdi-magnify" outlined
                  label="Filtrar" hide-details></v-text-field></v-col>
            </v-row>

          </v-card-title>

          <v-data-table :hide-default-footer="true" :disable-pagination="true" dense :headers="headersTablaDePacientes"
            :items="listadoDiasDeAtencion" :search="filtroPacientes" class="elevation-1">
            <template #[`item.actions`]="{ item }">
              <div>
                <v-btn x-small color="accent" button :to="`/hospitalizacion/atencionEnfermeria/hispitalizacion/${item.idAtencion}`">Ver Día</v-btn>
              </div>
            </template>
          </v-data-table>
        </v-card>
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
        <v-btn color="secondary" block dense @click="agregarNuevoDia" :loading="estaCargando" :disabled="estaCargando">Abrir Día de Hoy</v-btn>
      </v-col>
    </v-row>

  </div>
</template>

<script>
import TablaDatosSimplePaciente from '@/components/TablaDatosSimplePaciente.vue'
import obtenerPacientePorRut from '@/services/paciente/obtenerPacientePorRut'

export default {
  name: 'EvaluacionMedicoHospitalizacionVista',
  data () {
    return {
      estaCargando: false,
      alertaErrorModel2: false,
      mensajeError2: '',
      alertaSuccessModel: false,
      mensajeSuccess: '',
      diaAgregado: false,
      pacienteEncontrado: {},
      filtroPacientes: '',
      headersTablaDePacientes: [
        { text: 'Dia', value: 'dia' },
        { text: 'Fecha', value: 'fecha', align: 'center' },
        { text: 'Diagnóstico', value: 'diagnostico' },
        { text: 'Acciones', value: 'actions', sortable: false, align: 'center' }
      ],
      listadoDiasDeAtencion: []
    }
  },
  methods: {
    listarDiasDeAtencion () {
      this.listadoDiasDeAtencion = [
        { dia: this.listadoDiasDeAtencion.length + 1, fecha: (new Date(new Date().setDate(new Date().getDate() - 3)).toLocaleDateString()), idAtencion: 12, rut: '17654321-0', diagnostico: 'Dolor en Pecho' },
        { dia: this.listadoDiasDeAtencion.length + 2, fecha: (new Date(new Date().setDate(new Date().getDate() - 2)).toLocaleDateString()), idAtencion: 15, rut: '12345678-5', diagnostico: 'Dolor en Pecho' },
        { dia: this.listadoDiasDeAtencion.length + 3, fecha: (new Date(new Date().setDate(new Date().getDate() - 1)).toLocaleDateString()), idAtencion: 20, rut: '19876543-2', diagnostico: 'Insuficiencia Cardíaca Congestiva' }
      ]
    },
    buscarPacientePorRut () {
      obtenerPacientePorRut('19033183-0')
        .then((response) => {
          if (response !== '') {
            this.pacienteEncontrado = response
            this.mostrarTablaDatosIdentificacionPaciente = true
          }
        })
        .catch(() => {
          console.log('error')
        })
    },
    agregarNuevoDia () {
      this.estaCargando = true

      setTimeout(() => {
        if (!this.diaAgregado) {
          this.alertaErrorModel2 = false
          this.alertaSuccessModel = true
          this.mensajeSuccess = 'Se ha agregado correctamente el nuevo día.'
        } else {
          this.alertaErrorModel2 = true
          this.alertaSuccessModel = false
          this.mensajeError2 = 'Ya se ha agregado el día de hoy.'
          this.estaCargando = false
          return
        }
        this.diaAgregado = true
        const nuevoDia = { dia: this.listadoDiasDeAtencion.length + 1, fecha: (new Date(new Date().setDate(new Date().getDate())).toLocaleDateString()), idAtencion: 12, rut: '17654321-0', diagnostico: 'Insuficiencia Cardíaca Congestiva' }
        this.listadoDiasDeAtencion.push(nuevoDia)
        this.estaCargando = false
      }, 1000)
    }
  },
  mounted () {
    this.buscarPacientePorRut()
    this.listarDiasDeAtencion()
  },
  components: { TablaDatosSimplePaciente }
}
</script>
