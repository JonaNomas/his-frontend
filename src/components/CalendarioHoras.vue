<template>
  <div>
    <v-row class="fill-height">
      <v-col>

        <v-form class="mb-5">
          <v-row>
            <v-col cols="12" sm="12" md="6">
              <v-select
                :items="especialidades"
                label="Especialidad"
                outlined
                dense
                hide-details
                @change="traerEspecialistas($event.value)"
                >
              </v-select>
            </v-col>
            <v-col>
              <v-select
                :items="especialistas"
                label="Especialista"
                outlined
                dense
                hide-details
                >
              </v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn block color="success" @click="cargarHoras">Cargar</v-btn>
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
                <v-list-item v-for="(dia, index ) in weekdays" :key="index" @click="vistaSemana = dia.texto; weekday = dia.valor">
                  <v-list-item-title>{{dia.texto}}</v-list-item-title>
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

          <v-calendar ref="calendar"
            v-model="focus"
            color="primary"
            :events="events"
            :event-color="getEventColor"
            :type="type"
            :weekdays="weekday"
            @click:event="showEvent"
            @click:more="viewDay"
            @click:date="viewDay"
            >
          </v-calendar>

          <v-menu v-model="selectedOpen" :close-on-content-click="false" :activator="selectedElement" offset-x>
            <v-card color="grey lighten-4" min-width="350px" flat>
              <v-toolbar :color="selectedEvent.color" dark>
                <v-btn icon>
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon>
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </v-toolbar>
              <v-card-text>
                <span v-html="selectedEvent.details"></span>
              </v-card-text>
              <v-card-actions>
                <v-btn text color="secondary" @click="selectedOpen = false">
                  Cancelar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>

        </v-sheet>

      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  name: 'CalendarioHoras',
  data () {
    return {
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
      colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
      especialidades: [],
      especialistas: []
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
        color: 'blue',
        timed: true
      },
      {
        name: 'test',
        start: new Date('2023-11-13T19:16:00'),
        end: new Date('2023-11-13T19:30:00'),
        timed: true,
        color: 'grey lighten-1'
      }]
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
    }
  }
}
</script>
