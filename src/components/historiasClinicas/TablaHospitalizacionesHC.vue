<template>
  <v-row>
    <v-col>
      <v-card>
        <v-card-title>
          Hospitalizaciones
          <v-spacer></v-spacer>
          <v-text-field v-model="searchTablaAtencionesUrgencia" append-icon="mdi-magnify" label="Buscar" single-line
            hide-details></v-text-field>
        </v-card-title>
        <v-data-table :headers="headersTablaAtencionesUrgencia" :items="desserts" :search="search" dense></v-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'TablaHospitalizacionesHC',
  data () {
    return {
      searchTablaAtencionesUrgencia: '',
      headersTablaAtencionesUrgencia: [
        { text: 'ID', value: 'ID' },
        { text: 'Fecha y Hora Adminsión', value: 'fechaHoraAdmision' },
        { text: 'Fecha y Hora Egreso', value: 'fechaHoraEgreso' },
        { text: 'Motivo', value: 'motivo' },
        { text: 'Triage', value: 'triage' },
        { text: 'Estado', value: 'estado' },
        { text: 'Informe', value: 'informe' }
      ],
      desserts: [
        {
          ID: '20020',
          fechaHoraAdmision: '19/12/2023 23:28:33',
          fechaHoraEgreso: '20/12/2023 00:09:33',
          motivo: 'Dolor de cabeza',
          triage: 'C4',
          estado: 'Egresado',
          informe: '[LINK]'
        }
      ]
    }
  }
}
</script>
