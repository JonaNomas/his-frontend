<template>
  <div>
    <v-row>
      <v-col>
        <h1>Gestión Pabellones Quirúrgicos</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            <v-row>
              <v-col>Listado pacientes en Centro Quirúrgico</v-col>
              <v-col><v-text-field dense v-model="filtroPacientes" append-icon="mdi-magnify" outlined
                  label="Filtrar Pacientes" hide-details></v-text-field></v-col>
            </v-row>

          </v-card-title>

          <v-alert dense text v-model="alertaErrorModel" outlined dismissible type="error" class="my-5">
            {{ mensajeError }}
          </v-alert>

          <v-data-table :hide-default-footer="true" :disable-pagination="true" dense :headers="headersTablaDePacientes"
            :items="listadoPacientesEnAtencion" :search="filtroPacientes" class="elevation-1">
            <template #[`item.actions`]="{ item }">
              <div>
                <v-icon color="accent" @click="dialogAlta = item">mdi-bed</v-icon>
              </div>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="dialogAlta" max-width="700">
      <v-card>
        <v-toolbar color="primary" dark>
          <v-toolbar-title><v-icon left x-large>mdi-bed</v-icon> Mover Paciente</v-toolbar-title>
        </v-toolbar>

        <v-card-text>
          <v-row class="mt-5">
            <v-col>
              <v-autocomplete dense v-model="selectCamaDisponible" label="Mover a Pabellon Disponible"
          prepend-inner-icon="mdi-account" outlined hide-details :items="camasDisponibles"></v-autocomplete>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="secondary" text @click="dialogAlta = false">
            Cancelar
          </v-btn>
          <v-btn color="success" text @click="dialogAlta = false">
            Mover Paciente
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'GestionCamasHospitalizacionVista',
  data () {
    return {
      // Dialogos
      dialogAlta: false,
      // Alerta
      alertaErrorModel: false,
      selectCamaDisponible: '',
      mensajeError: '',
      filtroPacientes: '',
      headersTablaDePacientes: [
        { text: 'ID', value: 'idAtencion', align: 'center' },
        { text: 'Rut', value: 'rut', align: 'center' },
        { text: 'Nombre', value: 'nombre' },
        { text: 'Tipo Cirugía', value: 'diagnostico' },
        { text: 'Pabellon', value: 'cama' },
        { text: 'Acciones', value: 'actions', sortable: false, align: 'center' }
      ],
      listadoPacientesEnAtencion: [
        { idAtencion: 12, rut: '17654321-0', nombre: 'Diego Andrés Martínez Castro', diagnostico: 'CX FX Cadera', cama: 'Pabellon 3' },
        { idAtencion: 15, rut: '12345678-5', nombre: 'Victor Alexis Guzman Contreras', diagnostico: 'Aseo Quirurgico', cama: 'Recuperación' },
        { idAtencion: 20, rut: '19876543-2', nombre: 'Valentina Isabella González Ramírez', diagnostico: 'Apendicitis Aguda', cama: 'Pabellon 5' },
        { idAtencion: 22, rut: '11098765-4', nombre: 'Mateo Nicolás Pérez Herrera', diagnostico: 'Rotura Ligamento Cruzado', cama: 'Recuperación' }
      ],
      camasDisponibles: [
        'Pabellon 1', 'Pabellon 2', 'Pabellon 4', 'Recuperación'
      ]
    }
  },
  methods: {}
}
</script>
