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
              <v-btn block color="secondary" @click="crearNuevaHoraDialog = true"><v-icon left>mdi-plus</v-icon>Agregar
                Nueva Hora Disponible</v-btn>
            </v-col>
            <v-col cols="12" sm="12" md="4">
              <v-btn block color="secondary" @click="cargarHoras">Cargar</v-btn>
            </v-col>
            <v-col cols="12" sm="12" md="4">
              <v-autocomplete :items="especialidades" label="Especialidad" outlined dense hide-details
                @change="traerEspecialistas($event.value)">
              </v-autocomplete>
            </v-col>
            <v-col cols="12" sm="12" md="4">
              <v-autocomplete :items="especialistas" label="Especialista" outlined dense hide-details>
              </v-autocomplete>
            </v-col>
            <v-col cols="12" sm="12" md="4">
              <v-autocomplete :items="selectEstadoHora" v-model="selectEstadoHoraModel" label="Estado Hora" outlined dense
                hide-details>
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
                <div class="pa-12">{{ selectedEvent }}</div>
              </v-card-text>
              <v-card-actions>
                <v-btn text @click="selectedElement = false" color="error">Eliminar Bloque</v-btn>
                <v-spacer></v-spacer>
                <v-btn text @click="selectedElement = false">Close</v-btn>
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
                      <v-autocomplete :items="especialidades" label="Especialidad" outlined dense hide-details
                        @change="traerEspecialistas($event.value)">
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
                      <v-dialog ref="dialogoSeleccionarFecha" v-model="modalSeleccionarFecha" :return-value.sync="date" persistent width="290px">
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field v-model="date" label="Fecha" hide-details prepend-icon="mdi-calendar"  readonly v-bind="attrs"
                            v-on="on"></v-text-field>
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
                      <v-dialog ref="dialogoSeleccionarHora" v-model="modalSeleccionarHora" :return-value.sync="time" persistent width="290px">
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field v-model="time" label="Hora" hide-details prepend-icon="mdi-clock-time-four-outline" readonly
                            v-bind="attrs" v-on="on"></v-text-field>
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
                      <v-slider v-model="duracionHoraMedicaSlider" class="mt-5" label="Duración de la hora medica" min="5" max="60"
                        thumb-label="always"></v-slider>
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

export default {
  name: 'CalendarioHoras',
  data () {
    return {
      crearNuevaHoraDialog: false,
      dialog: true,
      focus: '',
      type: 'week',
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
      colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
      especialidades: [],
      especialistas: [],
      selectEstadoHora: [
        'Todas', 'Disponible', 'Reservada'
      ],
      selectEstadoHoraModel: 'Todas',
      // Asignar nueva hora
      modalSeleccionarHora: false,
      modalSeleccionarFecha: false,
      duracionHoraMedicaSlider: 10
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
    traerEspecialidades () {
      // TODO: traer especialidades desde la base de datos

      this.especialidades = [
        'Dermatologo', 'Oftalmologo', 'Traumatologo', 'Ginecologo', 'Pediatra', 'Cardiologo', 'Neurologo', 'Psiquiatra', 'Otorrinolaringologo', 'Urologo', 'Endocrinologo', 'Gastroenterologo', 'Nefrologo', 'Reumatologo', 'Hematologo', 'Infectologo', 'Broncopulmonar', 'Medico General', 'Medico Familiar', 'Medico Internista', 'Medico Cirujano', 'Medico Anestesiologo', 'Medico Intensivista', 'Medico Geriatra', 'Medico Veterinario'
      ]
    },
    traerEspecialistas (especialidadSeleccionada) {
      // TODO: traer especialistas desde la base de datos

      console.log(especialidadSeleccionada)
      this.especialistas = [
        'Juan Perez', 'Pedro Gonzalez', 'Maria Lopez', 'Josefa Martinez', 'Luisa Rodriguez', 'Jorge Hernandez', 'Miguel Sanchez', 'Carlos Gonzalez', 'Fernando Perez', 'Ricardo Lopez', 'Javier Martinez', 'Raul Rodriguez', 'Roberto Hernandez', 'Francisco Sanchez', 'Eduardo Gonzalez', 'Ramon Perez', 'Daniel Lopez', 'Alejandro Martinez', 'Rafael Rodriguez', 'Jose Hernandez', 'Arturo Sanchez', 'Manuel Gonzalez', 'Joaquin Perez', 'Sergio Lopez', 'Oscar Martinez', 'Guillermo Rodriguez', 'Julio Hernandez', 'Ignacio Sanchez', 'Hector Gonzalez', 'Alfonso Perez', 'Mauricio Lopez', 'Victor Martinez', 'Alberto Rodriguez', 'Mario Hernandez', 'Enrique Sanchez', 'Gustavo Gonzalez', 'Adrian Perez', 'Pablo Lopez', 'Emilio Martinez', 'Salvador Rodriguez', 'Agustin Hernandez', 'Jeronimo Sanchez', 'Cristian Gonzalez', 'Elias Perez', 'Benjamin Lopez', 'Eugenio Martinez', 'Cesar Rodriguez', 'Federico Hernandez', 'Rodrigo Sanchez'
      ]
    },
    cargarHoras () {
      console.log('Cargar Horas')
      this.events = [{
        name: 'Dermatologo',
        start: new Date('2023-11-13T19:00:00'),
        end: new Date('2023-11-13T19:15:00'),
        color: 'teal darken-1',
        timed: true,
        profesionalSalud: {
          nombre: 'Juan Perez',
          especialidad: 'Dermatologo',
          rut: '12.345.678-9'
        },
        responsable: {
          nombre: 'Juan Perez',
          rut: '12.345.678-9'
        },
        fechaCreacion: new Date('2023-11-13T19:00:00'),
        duracion: 15,
        estado: 'Disponible'
      },
      {
        name: 'Urologo',
        start: new Date('2023-11-13T19:15:00'),
        end: new Date('2023-11-13T19:30:00'),
        timed: true,
        color: 'red darken-1',
        profesionalSalud: {
          nombre: 'Juan Perez',
          especialidad: 'Dermatologo',
          rut: '12.345.678-9'
        },
        responsable: {
          nombre: 'Juan Perez',
          rut: '12.345.678-9'
        },
        fechaCreacion: new Date('2023-11-13T19:00:00'),
        duracion: 15,
        estado: 'Disponible'
      }]
    },
    showEvent ({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event
        console.log(this.selectedEvent)
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
    }
  }
}
</script>
