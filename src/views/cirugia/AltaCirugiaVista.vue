<template>
  <div>
    <v-row>
      <v-col>
        <h1>Alta Centro Quirúgico</h1>
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
          <v-toolbar-title><v-icon left>mdi-close-box</v-icon> Cerrar Cirugía</v-toolbar-title>
        </v-toolbar>

        <v-card-text>
          <v-row class="mt-5">
            <v-col>
              <p class="text-h3 text-center">Se cerrara de forma permanente esta Cirugía, ¿Desea continuar?</p>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="secondary" text @click="dialogAlta = false">
            Cancelar
          </v-btn>
          <v-btn color="error" text @click="dialogAlta = false">
            Cerrar Cirugía
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
        { text: 'Tipo Cirugía', value: 'motivo' },
        { text: 'Acciones', value: 'actions', sortable: false, align: 'center' }
      ],
      listadoPacientesEnAtencion: [
        { idAtencion: 16, rut: '19876543-2', nombre: 'Valentina Isabella González Ramírez', motivo: 'CX FX Cadera' },
        { idAtencion: 18, rut: '17654321-0', nombre: 'Diego Andrés Martínez Castro', motivo: 'Aseo Quirurgico' },
        { idAtencion: 24, rut: '19033183-0', nombre: 'Victor Alexis Guzman Contreras', motivo: 'Apendicitis Aguda' },
        { idAtencion: 32, rut: '12345678-9', nombre: 'Camila Sofía Fernández Díaz', motivo: 'Rotura Ligamento Cruzado' }
      ]
    }
  },
  methods: {}
}
</script>
