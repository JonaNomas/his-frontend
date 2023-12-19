<template>
  <div>
    <v-row>
      <v-col>
        <h1>Alta Atención Urgencias</h1>
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
          <v-toolbar-title><v-icon left>mdi-plus</v-icon> Antecedentes Morbidos</v-toolbar-title>
        </v-toolbar>

        <v-card-text>
          <v-row class="mt-5">
            <v-col>
              Alta
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="error" text @click="dialogAlta = false">
            Cerrar
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
        { text: 'Motivo', value: 'motivo' },
        { text: 'Acciones', value: 'actions', sortable: false, align: 'center' }
      ],
      listadoPacientesEnAtencion: [
        { idAtencion: 26, rut: '12345678-5', nombre: 'Victor Alexis Guzman Contreras', motivo: 'Corte - Cabeza' },
        { idAtencion: 39, rut: '19876543-2', nombre: 'Valentina Isabella González Ramírez', motivo: 'Dolor - Cabeza' },
        { idAtencion: 43, rut: '17654321-0', nombre: 'Diego Andrés Martínez Castro', motivo: 'Quemadura - Torax' },
        { idAtencion: 47, rut: '12345678-9', nombre: 'Camila Sofía Fernández Díaz', motivo: 'Corte - Cuello' },
        { idAtencion: 54, rut: '11098765-4', nombre: 'Mateo Nicolás Pérez Herrera', motivo: 'Fractura-Extremidades   Superiores' },
        { idAtencion: 58, rut: '13210987-6', nombre: 'Isabella Gabriela López Ramírez', motivo: 'Perdida de Conocimiento - Otro' },
        { idAtencion: 61, rut: '18901234-5', nombre: 'Andrés Alejandro Díaz Castro', motivo: 'Hemorragia - Espalda' },
        { idAtencion: 72, rut: '14567890-1', nombre: 'Sofía Valentina Herrera González', motivo: 'Molestia - Abdomen' },
        { idAtencion: 86, rut: '17654321-9', nombre: 'Nicolás Diego Martínez López', motivo: 'Perdida Extremidad - Extremidades nferiores' }
      ]
    }
  },
  methods: {}
}
</script>
