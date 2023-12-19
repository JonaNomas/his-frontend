<template>
  <div>
    <v-row>
      <v-col>
        <h1>Gestion Camas</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            <v-row>
              <v-col>Listado pacientes hospitalizados</v-col>
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
          <v-toolbar-title><v-icon left x-large>mdi-bed</v-icon> Mover Paciente de Cama</v-toolbar-title>
        </v-toolbar>

        <v-card-text>
          <v-row class="mt-5">
            <v-col>
              <v-autocomplete dense v-model="selectCamaDisponible" label="Mover a Cama Disponible"
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
        { text: 'Diagnostico', value: 'diagnostico' },
        { text: 'Cama', value: 'cama' },
        { text: 'Acciones', value: 'actions', sortable: false, align: 'center' }
      ],
      listadoPacientesEnAtencion: [
        { idAtencion: 12, rut: '17654321-0', nombre: 'Diego Andrés Martínez Castro', diagnostico: 'Infarto Agudo de Miocardio (IAM)', cama: '301' },
        { idAtencion: 15, rut: '12345678-5', nombre: 'Victor Alexis Guzman Contreras', diagnostico: 'Neumonía', cama: '302' },
        { idAtencion: 20, rut: '19876543-2', nombre: 'Valentina Isabella González Ramírez', diagnostico: 'Insuficiencia Cardíaca Congestiva', cama: '303' },
        { idAtencion: 22, rut: '11098765-4', nombre: 'Mateo Nicolás Pérez Herrera', diagnostico: 'Fractura de Cadera', cama: '401' },
        { idAtencion: 23, rut: '12345678-9', nombre: 'Camila Sofía Fernández Díaz', diagnostico: 'Diabetes Descompensada', cama: '402' },
        { idAtencion: 32, rut: '13210987-6', nombre: 'Isabella Gabriela López Ramírez', diagnostico: 'Enfermedad Pulmonar Obstructiva Crónica (EPOC)', cama: '403' },
        { idAtencion: 33, rut: '14567890-1', nombre: 'Sofía Valentina Herrera González', diagnostico: 'Insuficiencia Renal Aguda', cama: '404' },
        { idAtencion: 34, rut: '17654321-9', nombre: 'Nicolás Diego Martínez López', diagnostico: 'Sepsis ', cama: '201' },
        { idAtencion: 35, rut: '18901234-5', nombre: 'Andrés Alejandro Díaz Castro', diagnostico: 'Cirugía de Apendicitis Aguda', cama: '203' }
      ],
      camasDisponibles: [
        405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 419, 420,
        304, 305, 306, 307, 308, 309, 310, 311, 312, 313, 314, 315, 316, 317, 318, 319, 320,
        202, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220
      ]
    }
  },
  methods: {}
}
</script>
