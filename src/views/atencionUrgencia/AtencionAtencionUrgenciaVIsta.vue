<template>
  <div>
    <h1>Atención Urgencia</h1>
    <v-row>
      <v-col md="4" sm="12">
        <v-row>
          <v-col>
            <h3>Pendientes de Atención</h3>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-card class="mb-2" v-for="(item, i) in listadoDePacientesEnEspera" :key="i">
              <v-card-text>
                <v-row class="d-flex align-center">
                  <v-col lg="2">
                    <TriageCategorizacionEtiqueta :categoria="item.categoria" />
                  </v-col>
                  <v-col lg="7">{{ item.nombre }}</v-col>
                  <v-col lg="3"><v-btn color="success" block
                      @click="abrirDialogDePacienteEnEspera(item)"><v-icon>mdi-magnify</v-icon></v-btn></v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>

      <v-divider vertical></v-divider>

      <v-col md="8" sm="12">
        <v-row>
          <v-col>
            <h3>En Atención</h3>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6" v-for="(item, i) in boxs" :key="i">
            <v-card elevation="2" :color="!item.idAtencionUrgencia ? 'green lighten-5' : ''">
              <div v-if="item.idAtencionUrgencia">
                <v-card-title>
                  <div class="text-center">{{ item.nombre }}</div>
                </v-card-title>
                <v-card-subtitle>
                  <span class="font-weight-bold">Rut:</span> {{ item.rut }}
                </v-card-subtitle>
                <v-card-text>
                  <v-row>
                    <v-col>
                      <TriageCategorizacionEtiqueta :categoria="item.categoria" /> {{ item.nombrePaciente }}
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <span class="font-weight-bold">Tiempo en Atención:</span> {{ calcularTiempoTranscurrido(item.horaInicio) }}
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-card-actions>
                  <v-btn color="accent" :to="`/urgencias/atencion/${item.idAtencionUrgencia}`" text block>
                    Ver Atención
                  </v-btn>
                </v-card-actions>
              </div>
              <div v-else>
                <v-card-title>
                  <div class="text-center">{{ item.nombre }}</div>
                </v-card-title>
                <v-card-subtitle>
                  <br>
                </v-card-subtitle>
                <v-card-text>
                  <v-row>
                    <v-col cols="12" class="">
                      <p class="text-h3 text-center font-weight-light">Disponible</p>
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-card-actions>
                  <br>
                </v-card-actions>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-dialog v-model="dialogoPacientesEnEspera" max-width="700">
      <v-card>
        <v-toolbar color="primary" dark>
          <v-toolbar-title><v-icon left x-large>mdi-calendar-plus</v-icon> {{ pacienteSeleccionadoDeLaEspera?.nombre
          }}</v-toolbar-title>
        </v-toolbar>

        <v-card-text class="mt-3">
          <v-row>
            <v-col>
              <TablaDatosSimplePaciente :pacienteEncontrado="datosDelPacienteSeleccionadoDeLaEspera" />
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-row>
                <v-col>
                  <h3>Triage</h3>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <TablaReducidaTriageValores :idConsultaUrgencia="pacienteSeleccionadoDeLaEspera?.idConsultaUrgencia" />
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <v-autocomplete dense v-model="selectAsignarABoxDisponible" label="Asignar a Box Disponible"
                    prepend-inner-icon="mdi-account-arrow-right-outline" outlined hide-details :items="boxDisponibles"
                    item-text="nombre" item-value="id"></v-autocomplete>
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <v-btn color="accent" block @click="asignarBox">Asignar a Box</v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="error" text @click="dialogoPacientesEnEspera = false">
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import TablaDatosSimplePaciente from '@/components/TablaDatosSimplePaciente.vue'
import TriageCategorizacionEtiqueta from '@/components/urgencias/TriageCategorizacionEtiqueta.vue'
import TablaReducidaTriageValores from '@/components/urgencias/TablaReducidaTriageValores.vue'
import obtenerPacientePorRut from '@/services/paciente/obtenerPacientePorRut'
import moment from 'moment'

export default {
  name: 'AtencionAtencionUrgenciaVista',
  data () {
    return {
      dialogoPacientesEnEspera: false,
      pacienteSeleccionadoDeLaEspera: null,
      datosDelPacienteSeleccionadoDeLaEspera: null,
      listadoDePacientesEnEspera: [],
      selectAsignarABoxDisponible: null,
      boxDisponibles: [],
      boxs: []
    }
  },
  methods: {
    moment,
    cargarPacientesEnEspera () {
      const listadoDePacientesEnEsperaDeApi = [
        { id: 1, idConsultaUrgencia: 300, rut: '19033183-0', nombre: 'Victor Alexis Guzman Contreras', categoria: '2' },
        { id: 2, idConsultaUrgencia: 300, rut: '12345678-5', nombre: 'Victor Alexis Guzman Contreras', categoria: '3' },
        { id: 3, idConsultaUrgencia: 300, rut: '19033183-0', nombre: 'Victor Alexis Guzman Contreras', categoria: '4' },
        { id: 4, idConsultaUrgencia: 300, rut: '19033183-0', nombre: 'Victor Alexis Guzman Contreras', categoria: '4' },
        { id: 5, idConsultaUrgencia: 300, rut: '19033183-0', nombre: 'Victor Alexis Guzman Contreras', categoria: '5' },
        { id: 6, idConsultaUrgencia: 300, rut: '19033183-0', nombre: 'Victor Alexis Guzman Contreras', categoria: '1' },
        { id: 7, idConsultaUrgencia: 300, rut: '19033183-0', nombre: 'Victor Alexis Guzman Contreras', categoria: '1' }
      ]
      // Ordenar por categoria
      listadoDePacientesEnEsperaDeApi.sort((a, b) => a.categoria - b.categoria)

      this.listadoDePacientesEnEspera = listadoDePacientesEnEsperaDeApi
    },
    async abrirDialogDePacienteEnEspera (item) {
      this.datosDelPacienteSeleccionadoDeLaEspera = await obtenerPacientePorRut(item.rut)
      this.dialogoPacientesEnEspera = true
      this.pacienteSeleccionadoDeLaEspera = item
      this.listarBoxDisponible()
    },
    listarBoxDisponible () {
      this.boxDisponibles = [
        { id: 1, nombre: 'Box 1' },
        { id: 8, nombre: 'Box 8' },
        { id: 9, nombre: 'Box 9' },
        { id: 10, nombre: 'Box 10' }
      ]
    },
    cargarBoxs () {
      // Peticion A API
      this.boxs = [
        { idBox: 1, nombre: 'Box 1', horaInicio: null, nombrePaciente: '', categoria: '', idAtencionUrgencia: null },
        { idBox: 2, nombre: 'Box 2', horaInicio: new Date('2023-12-17T18:02:18.666Z'), rut: '12345678-0', nombrePaciente: 'Roberto Juan Perez Perez', categoria: '3', idAtencionUrgencia: 23265 },
        { idBox: 3, nombre: 'Box 3', horaInicio: new Date('2023-12-17T18:01:10.666Z'), rut: '11111111-0', nombrePaciente: 'Ervin Ervin Howell Howell', categoria: '4', idAtencionUrgencia: 232456 },
        { idBox: 4, nombre: 'Box 4', horaInicio: new Date('2023-12-16T18:04:18.666Z'), rut: '22222222-0', nombrePaciente: 'Victor Alexis Guzman Contreras', categoria: '4', idAtencionUrgencia: 23122 },
        { idBox: 5, nombre: 'Box 5', horaInicio: new Date('2023-12-17T17:04:18.666Z'), rut: '33333333-0', nombrePaciente: 'Victor Alexis Guzman Contreras', categoria: '5', idAtencionUrgencia: 23221 },
        { idBox: 6, nombre: 'Box 6', horaInicio: new Date('2023-12-17T18:04:18.666Z'), rut: '44444444-0', nombrePaciente: 'Victor Alexis Guzman Contreras', categoria: '1', idAtencionUrgencia: 23221 },
        { idBox: 7, nombre: 'Box 7', horaInicio: new Date('2023-12-17T18:30:18.666Z'), rut: '55555555-0', nombrePaciente: 'Victor Alexis Guzman Contreras', categoria: '1', idAtencionUrgencia: 232321 },
        { idBox: 8, nombre: 'Box 8', horaInicio: null, nombrePaciente: '', categoria: '', idAtencionUrgencia: null },
        { idBox: 9, nombre: 'Box 9', horaInicio: null, nombrePaciente: '', categoria: '', idAtencionUrgencia: null },
        { idBox: 10, nombre: 'Box 10', horaInicio: null, nombrePaciente: '', categoria: '', idAtencionUrgencia: null }
      ]
    },
    calcularTiempoTranscurrido (fechaHora) {
      const fechaPublicacion = moment(fechaHora)
      return fechaPublicacion.fromNow()
    },
    asignarBox () {
      this.boxs[this.selectAsignarABoxDisponible - 1] = { idBox: 1, nombre: 'Box 1', horaInicio: new Date(), rut: '22222222-0', nombrePaciente: 'Victor Alexis Guzman Contreras', categoria: '4', idAtencionUrgencia: 23122 }
      this.dialogoPacientesEnEspera = false
    }
  },
  created () {
    this.cargarBoxs()
    this.cargarPacientesEnEspera()
  },
  components: {
    TriageCategorizacionEtiqueta,
    TablaDatosSimplePaciente,
    TablaReducidaTriageValores
  }
}
</script>
