<template>
  <div>
    <v-row class="fill-height">
      <v-col>

        <v-form class="mb-5">
          <v-row dense>
            <v-col cols="12" sm="12" md="4">
              <h1 class="mb-3">Agendamiento Horas Medicas</h1>
            </v-col>
            <v-col cols="12" sm="12" md="4">
              <v-btn block color="secondary" @click="crearNuevaHoraDialog = true"><v-icon left>mdi-plus</v-icon>Nuevo Bloque Hora</v-btn>
            </v-col>
            <v-col cols="12" sm="12" md="4">
              <v-btn :loading="seEstanCargandoLasHoras" :disabled="seEstanCargandoLasHoras" block color="secondary"
                @click="cargarHoras">Cargar</v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="12" md="4">
              <v-autocomplete :items="especialidades" v-model="modelEspecialidad" label="Especialidad" item-text="nombre"
                item-value="id" outlined dense hide-details @change="traerEspecialistas($event.value)">
              </v-autocomplete>
            </v-col>
            <v-col cols="12" sm="12" md="4">
              <v-autocomplete :items="especialistas" label="Especialista" outlined dense hide-details>
              </v-autocomplete>
            </v-col>
            <v-col cols="12" sm="12" md="4">
              <v-text-field dense label="Rut Paciente" v-model="modelRutPacienteBuscar"
                prepend-inner-icon="mdi-account" outlined hide-details></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field dense label="Año" v-model="modelAnoParaBusqueda"
                prepend-inner-icon="mdi-account" outlined hide-details></v-text-field>
            </v-col>
            <v-col>
              <v-autocomplete :items="mesesParaBusqueda" v-model="modelMesParaBusqueda" label="Mes" item-text="nombre"
                item-value="id" outlined dense hide-details>
              </v-autocomplete>
            </v-col>
          </v-row>
        </v-form>

        <v-sheet height="64">
          <v-toolbar flat>

            <v-btn fab text small color="grey darken-2" @click="prev">
              <v-icon small>
                mdi-chevron-left
              </v-icon>
            </v-btn>
            <v-btn fab text small color="grey darken-2" @click="next">
              <v-icon small>
                mdi-chevron-right
              </v-icon>
            </v-btn>
            <v-toolbar-title v-if="$refs.calendar">
              {{ ($refs.calendar.title).toUpperCase() }}
            </v-toolbar-title>
            <v-spacer></v-spacer>

            <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
              Hoy
            </v-btn>

            <v-menu bottom right>
              <template v-slot:activator="{ on, attrs }">
                <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
                  <span>{{ vistaSemana }}</span>
                  <v-icon right>
                    mdi-menu-down
                  </v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item v-for="(dia, index ) in weekdays" :key="index"
                  @click="vistaSemana = dia.texto; weekday = dia.valor">
                  <v-list-item-title>{{ dia.texto }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>

            <v-menu bottom right>
              <template v-slot:activator="{ on, attrs }">
                <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on" class="ml-3">
                  <span>{{ typeToLabel[type] }}</span>
                  <v-icon right>
                    mdi-menu-down
                  </v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="type = 'month'">
                  <v-list-item-title>Mes</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'week'">
                  <v-list-item-title>Semana</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'day'">
                  <v-list-item-title>Día</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-toolbar>
        </v-sheet>

        <v-sheet height="600">

          <v-calendar ref="calendar" v-model="focus" color="primary" :events="events" :event-color="getEventColor"
            :type="type" :weekdays="weekday" @click:event="showEvent" @click:more="viewDay" @click:date="viewDay">
          </v-calendar>

          <!-- Asignar Hora -->
          <v-dialog max-width="600" v-model="selectedElement">
            <v-card>
              <v-toolbar :color="selectedEvent.color" dark>
                <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title></v-toolbar>
              <v-card-text>

                <v-row class="mt-3">
                  <v-col>
                    <h3>Profesional</h3>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field hide-details :value="selectedEvent?.profesionalSalud?.nombre" label="Profesional"
                      readonly></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field hide-details :value="selectedEvent?.profesionalSalud?.rut" label="RUN"
                      readonly></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field hide-details :value="selectedEvent?.profesionalSalud?.especialidad"
                      label="Especialidad" readonly></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col>
                    <h3>Detalles Hora</h3>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col>
                    <v-text-field hide-details :value="fechaDDMMAAAA(selectedEvent?.start)" label="Día"
                      readonly></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field hide-details :value="obtenerHoraDesdeFecha(selectedEvent?.start)" label="Hora"
                      readonly></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field hide-details :value="selectedEvent?.duracion" label="Duración" readonly></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col>
                    <h3>Paciente Asignado</h3>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="8">
                    <v-text-field dense label="RUN" v-model="runPacienteParaTomarHora"
                      prepend-inner-icon="mdi-account-box" outlined hide-details></v-text-field>
                  </v-col>
                  <v-col cols="2">
                    <v-btn :loading="seEstaBuscandoPaciente" :disabled="seEstaBuscandoPaciente" dense color="success"
                      @click="buscarPacienteParaTomarHoraPorRut"><v-icon>mdi-magnify</v-icon></v-btn>
                  </v-col>
                  <v-col cols="2">
                    <v-btn dense color="error"><v-icon>mdi-close-thick</v-icon></v-btn>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col>
                    <v-simple-table dense>
                      <template v-slot:default>
                        <tbody>
                          <tr>
                            <td class="negrita">Run</td>
                            <td class="negrita">:</td>
                            <td>{{ datosPacienteParaTomarHora?.run ?? '' }}</td>
                          </tr>
                          <tr>
                            <td class="negrita">ID Paciente</td>
                            <td class="negrita">:</td>
                            <td>{{ datosPacienteParaTomarHora?.idPaciente ?? '' }}</td>
                          </tr>
                          <tr>
                            <td class="negrita">Apellidos</td>
                            <td class="negrita">:</td>
                            <td>{{ datosPacienteParaTomarHora?.apellidoPaterno ?
                              (datosPacienteParaTomarHora.apellidoPaterno + " " +
                                datosPacienteParaTomarHora.apellidoMaterno) : '' }}</td>
                          </tr>
                          <tr>
                            <td class="negrita">Nombres</td>
                            <td class="negrita">:</td>
                            <td>{{ datosPacienteParaTomarHora?.nombrePrimer ? (datosPacienteParaTomarHora.nombrePrimer + " " + datosPacienteParaTomarHora.nombreSegundo) : '' }}</td>
                          </tr>
                          <tr>
                            <td class="negrita">Previsión</td>
                            <td class="negrita">:</td>
                            <td>{{ datosPacienteParaTomarHora?.prevision ?? '' }}</td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col>
                    <v-btn dense block color="success"><v-icon left>mdi-account-plus</v-icon>Asignar Hora</v-btn>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col>
                    <v-btn block small color="secondary"><v-icon left>mdi-email</v-icon>Comprobante por Email</v-btn>
                  </v-col>
                  <v-col>
                    <v-btn block small color="secondary"><v-icon left>mdi-printer</v-icon>Imprimir Comprobante</v-btn>
                  </v-col>
                </v-row>

              </v-card-text>
              <v-card-actions>
                <v-btn text @click="selectedElement = false" color="error">Eliminar Bloque</v-btn>
                <v-spacer></v-spacer>
                <v-btn text @click="selectedElement = false">Cerrar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <!-- Crear Hora Nueva -->
          <v-dialog max-width="600" v-model="crearNuevaHoraDialog" persistent>
            <v-card>
              <v-toolbar color="primary" dark>

                <v-toolbar-title><v-icon left x-large>mdi-calendar-plus</v-icon> Agregar nueva hora</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-container class="mt-5">
                  <v-row>
                    <v-col>
                      <v-autocomplete :items="especialidades" item-text="nombre" item-value="id" label="Especialidad"
                        outlined dense hide-details @change="traerEspecialistas($event.value)">
                      </v-autocomplete>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col>
                      <v-autocomplete :items="especialistas" label="Especialista" outlined dense hide-details>
                      </v-autocomplete>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col>
                      <v-dialog ref="dialogoSeleccionarFecha" v-model="modalSeleccionarFecha" :return-value.sync="date"
                        persistent width="290px">
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field v-model="date" label="Fecha" hide-details prepend-icon="mdi-calendar" readonly
                            v-bind="attrs" v-on="on"></v-text-field>
                        </template>
                        <v-date-picker v-model="date" scrollable>
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="modalSeleccionarFecha = false">
                            Cancelar
                          </v-btn>
                          <v-btn text color="primary" @click="$refs.dialogoSeleccionarFecha.save(date)">
                            Asignar
                          </v-btn>
                        </v-date-picker>
                      </v-dialog>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col>
                      <v-dialog ref="dialogoSeleccionarHora" v-model="modalSeleccionarHora" :return-value.sync="time"
                        persistent width="290px">
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field v-model="time" label="Hora" hide-details
                            prepend-icon="mdi-clock-time-four-outline" readonly v-bind="attrs" v-on="on"></v-text-field>
                        </template>
                        <v-time-picker v-if="modalSeleccionarHora" v-model="time" full-width>
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="modalSeleccionarHora = false">
                            Cancelar
                          </v-btn>
                          <v-btn text color="primary" @click="$refs.dialogoSeleccionarHora.save(time)">
                            Asignar
                          </v-btn>
                        </v-time-picker>
                      </v-dialog>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-text-field hide-details label="Cantidad Bloques" outlined dense type="number"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col>
                      <v-slider v-model="duracionHoraMedicaSlider" class="mt-5" label="Duración de la hora medica" min="5"
                        max="60" thumb-label="always"></v-slider>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions class="justify-end">
                <v-btn text @click="crearNuevaHoraDialog = false">Cerrar</v-btn>
                <v-btn text @click="crearNuevaHoraDialog = false" color="success">Crear</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

        </v-sheet>

      </v-col>
    </v-row>

  </div>
</template>
<script>
/**
 * TODO: MODIFICAR HORA Y CANCELAR HORA, ELIMINAR BLOQUE
 */
import fechaDDMMAAAA from '@/utils/fechaDDMMAAAA'
import obtenerHoraDesdeFecha from '@/utils/obtenerHoraDesdeFecha'
import obtenerPacientePorRut from '@/services/paciente/obtenerPacientePorRut'
import obtenerEspecialidades from '@/services/especialidad/obtenerEspecialidades'
import obtenerAgenda from '@/services/calendario/obtenerAgenda'

export default {
  name: 'CalendarioHoras',
  data () {
    return {
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      time: null,
      crearNuevaHoraDialog: false,
      dialog: true,
      focus: '',
      type: 'month',
      weekday: [1, 2, 3, 4, 5],
      typeToLabel: {
        month: 'Mes',
        week: 'Semana',
        day: 'Día',
        '4day': '4 Días'
      },
      vistaSemana: 'Lunes a Viernes',

      weekdays: [
        { texto: 'Lunes a Domingo', valor: [1, 2, 3, 4, 5, 6, 0] },
        { texto: 'Lunes a Sabado', valor: [1, 2, 3, 4, 5, 6] },
        { texto: 'Lunes a Viernes', valor: [1, 2, 3, 4, 5] }
      ],

      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      events: [],
      especialidades: [],
      especialistas: [],
      mesesParaBusqueda: [
        { id: 1, nombre: 'Enero' },
        { id: 2, nombre: 'Febrero' },
        { id: 3, nombre: 'Marzo' },
        { id: 4, nombre: 'Abril' },
        { id: 5, nombre: 'Mayo' },
        { id: 6, nombre: 'Junio' },
        { id: 7, nombre: 'Julio' },
        { id: 8, nombre: 'Agosto' },
        { id: 9, nombre: 'Septiembre' },
        { id: 10, nombre: 'Octubre' },
        { id: 11, nombre: 'Noviembre' },
        { id: 12, nombre: 'Diciembre' }
      ],
      selectEstadoHoraModel: 'Todas',
      // Crear nueva hora
      modalSeleccionarHora: false,
      modalSeleccionarFecha: false,
      duracionHoraMedicaSlider: 10,
      // Asignar Nueva Hora
      runPacienteParaTomarHora: '',
      datosPacienteParaTomarHora: {},
      seEstaBuscandoPaciente: false,
      // Estados de carga
      seEstanCargandoLasHoras: false,
      // Buscador
      modelEspecialidad: 0,
      modelRutPacienteBuscar: '',
      modelMesParaBusqueda: new Date().getMonth() + 1,
      modelAnoParaBusqueda: new Date().getFullYear()
    }
  },
  mounted () {
    this.$refs.calendar.checkChange()

    this.traerEspecialidades()
  },
  methods: {
    viewDay ({ date }) {
      this.focus = date
      this.type = 'day'
    },
    getEventColor (event) {
      return event.color
    },
    setToday () {
      this.focus = new Date()
    },
    prev () {
      this.$refs.calendar.prev()
    },
    next () {
      this.$refs.calendar.next()
    },
    async traerEspecialidades () {
      this.especialidades = await obtenerEspecialidades()
      this.especialidades.unshift({ id: 0, nombre: 'Todas' })
    },
    traerEspecialistas (especialidadSeleccionada) {
      // TODO: traer especialistas desde la base de datos

      this.especialistas = [
        'Juan Perez', 'Pedro Gonzalez', 'Maria Lopez', 'Josefa Martinez', 'Luisa Rodriguez', 'Jorge Hernandez', 'Miguel Sanchez', 'Carlos Gonzalez', 'Fernando Perez', 'Ricardo Lopez', 'Javier Martinez', 'Raul Rodriguez', 'Roberto Hernandez', 'Francisco Sanchez', 'Eduardo Gonzalez', 'Ramon Perez', 'Daniel Lopez', 'Alejandro Martinez', 'Rafael Rodriguez', 'Jose Hernandez', 'Arturo Sanchez', 'Manuel Gonzalez', 'Joaquin Perez', 'Sergio Lopez', 'Oscar Martinez', 'Guillermo Rodriguez', 'Julio Hernandez', 'Ignacio Sanchez', 'Hector Gonzalez', 'Alfonso Perez', 'Mauricio Lopez', 'Victor Martinez', 'Alberto Rodriguez', 'Mario Hernandez', 'Enrique Sanchez', 'Gustavo Gonzalez', 'Adrian Perez', 'Pablo Lopez', 'Emilio Martinez', 'Salvador Rodriguez', 'Agustin Hernandez', 'Jeronimo Sanchez', 'Cristian Gonzalez', 'Elias Perez', 'Benjamin Lopez', 'Eugenio Martinez', 'Cesar Rodriguez', 'Federico Hernandez', 'Rodrigo Sanchez'
      ]
    },
    async cargarHoras () {
      this.seEstanCargandoLasHoras = true

      const idEspecialidad = this.modelEspecialidad
      const idProfesional = 0
      const rutPaciente = this.modelRutPacienteBuscar
      const ano = this.modelAnoParaBusqueda
      const mes = this.modelMesParaBusqueda

      const agendaEncontrada = await obtenerAgenda(idEspecialidad, idProfesional, rutPaciente, ano, mes)

      console.table(agendaEncontrada)

      agendaEncontrada.forEach(element => {
        element.color = element.name === 'Disponible' ? 'success' : 'error'
      })

      this.events = agendaEncontrada

      this.seEstanCargandoLasHoras = false
    },
    showEvent ({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        requestAnimationFrame(() => requestAnimationFrame(() => { this.selectedOpen = true }))
      }

      if (this.selectedOpen) {
        this.selectedOpen = false
        requestAnimationFrame(() => requestAnimationFrame(() => open()))
      } else {
        open()
      }

      nativeEvent.stopPropagation()
    },
    async buscarPacienteParaTomarHoraPorRut () {
      if (this.runPacienteParaTomarHora === '') {
        return
      }
      this.seEstaBuscandoPaciente = true
      const datosObtenidosDeUsuario = await obtenerPacientePorRut(this.runPacienteParaTomarHora)
      this.datosPacienteParaTomarHora = datosObtenidosDeUsuario
      this.seEstaBuscandoPaciente = false
    },
    fechaDDMMAAAA,
    obtenerHoraDesdeFecha
  }
}
</script>
