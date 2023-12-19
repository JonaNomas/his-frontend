<template>
  <div>
    <v-row>
      <v-col>
        <h1>Alta Cirugia</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            <v-row>
              <v-col>Listado pacientes en atención</v-col>
              <v-col><v-text-field dense v-model="filtroPacientes" append-icon="mdi-magnify" outlined
                  label="Filtrar Pacientes" hide-details></v-text-field></v-col>
            </v-row>

          </v-card-title>

          <v-alert dense text v-model="alertaErrorModel" outlined dismissible type="error" class="my-5">
            {{ mensajeError }}
          </v-alert>

          <v-data-table :hide-default-footer="true" :disable-pagination="true" dense
            :headers="headersTablaExamenesLaboratorio" :items="listadoExamenesLaboratorio" :search="filtroPacientes"
            class="elevation-1">
            <template #[`item.actions`]="{ item }">
              <div>
                <!-- <v-icon color="success" @click="editarExamen(item)">mdi-pencil-box</v-icon> -->
                <v-icon color="error" @click="eliminarExamen(item)">mdi-delete</v-icon>
              </div>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'AltaCirugia',
  data () {
    return {
      // Alerta
      alertaErrorModel: false,
      mensajeError: '',
      filtroPacientes: '',
      headersTablaExamenesLaboratorio: [
        { text: 'ID', value: 'idExamenLaboratorio', align: 'center' },
        { text: 'Rut', value: 'codigo', align: 'center' },
        { text: 'Nombre', value: 'tipoExamen' },
        { text: 'Acciones', value: 'actions', sortable: false, align: 'center' }
      ]
    }
  },
  methods: {}
}
</script>
