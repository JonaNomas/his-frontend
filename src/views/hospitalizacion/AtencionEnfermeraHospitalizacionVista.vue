<template>
  <div>
    <v-row>
      <v-col>
        <h1>Evaluación Enfermería</h1>
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

          <v-data-table :hide-default-footer="true" :disable-pagination="true" dense :headers="headersTablaDePacientes"
            :items="listadoPacientesEnAtencion" :search="filtroPacientes" class="elevation-1">
            <template #[`item.actions`]="{ item }">
              <div>
                <v-btn x-small color="accent" button :to="`/hospitalizacion/atencionEnfermeria/hispitalizacion/${item.idAtencion}`">Ver Hospitalización</v-btn>
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
  name: 'EvaluacionEnfermeriaHospitalizacionVista',
  data () {
    return {
      filtroPacientes: '',
      headersTablaDePacientes: [
        { text: 'Cama', value: 'cama' },
        { text: 'Run', value: 'rut', align: 'center' },
        { text: 'Nombre', value: 'nombre' },
        { text: 'Diagnóstico', value: 'diagnostico' },
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
      ]
    }
  },
  methods: {}
}
</script>
