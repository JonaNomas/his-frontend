<template>
  <div>
    <v-row>
      <v-col>
        <h1>Alta Hospitalización</h1>
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
                <!-- <v-icon color="success" @click="editarExamen(item)">mdi-pencil-box</v-icon> -->
                <v-icon color="accent" @click="dialogAlta = item">mdi-exit-to-app</v-icon>
              </div>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="dialogAlta" max-width="700">
      <v-card>
        <v-toolbar color="primary" dark>
          <v-toolbar-title><v-icon left>mdi-close-box</v-icon> Alta Hospitalización</v-toolbar-title>
        </v-toolbar>

        <v-card-text>
          <v-row class="mt-5">
            <v-col>
              <p class="text-h3 text-center">Se cerrara de forma permanente esta Hospitalización, ¿Desea continuar?</p>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="secondary" text @click="dialogAlta = false">
            Cancelar
          </v-btn>
          <v-btn color="error" text @click="dialogAlta = false">
            Dar de Alta
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'AltaCirugia',
  data () {
    return {
      // Dialogos
      dialogAlta: false,
      // Alerta
      alertaErrorModel: false,
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
        { idAtencion: 12, rut: '17654321-0', nombre: 'Diego Andrés Martínez Castro', diagnostico: 'Quemadura - Torax', cama: '301' },
        { idAtencion: 15, rut: '12345678-5', nombre: 'Victor Alexis Guzman Contreras', diagnostico: 'Corte - Cabeza', cama: '302' },
        { idAtencion: 20, rut: '19876543-2', nombre: 'Valentina Isabella González Ramírez', diagnostico: 'Dolor - Cabeza', cama: '303' },
        { idAtencion: 22, rut: '11098765-4', nombre: 'Mateo Nicolás Pérez Herrera', diagnostico: 'Fractura-Extremidades   Superiores', cama: '401' },
        { idAtencion: 23, rut: '12345678-9', nombre: 'Camila Sofía Fernández Díaz', diagnostico: 'Corte - Cuello', cama: '402' },
        { idAtencion: 32, rut: '13210987-6', nombre: 'Isabella Gabriela López Ramírez', diagnostico: 'Perdida de Conocimiento - Otro', cama: '403' },
        { idAtencion: 33, rut: '14567890-1', nombre: 'Sofía Valentina Herrera González', diagnostico: 'Molestia - Abdomen', cama: '404' },
        { idAtencion: 34, rut: '17654321-9', nombre: 'Nicolás Diego Martínez López', diagnostico: 'Perdida Extremidad - Extremidades nferiores', cama: '201' },
        { idAtencion: 35, rut: '18901234-5', nombre: 'Andrés Alejandro Díaz Castro', diagnostico: 'Hemorragia - Espalda', cama: '203' }
      ]
    }
  },
  methods: {}
}
</script>
