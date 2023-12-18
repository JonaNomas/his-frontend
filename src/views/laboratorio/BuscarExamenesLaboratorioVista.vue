<template>
  <div>
    <v-row>
      <v-col>
        <h1>Buscar Examenes Ingresados</h1>
      </v-col>
    </v-row>

    <v-row class="fill-height">
      <v-col class="d-flex justify-center">
        <v-card max-width="500" width="500" elevation="3">
          <v-card-text>
            <v-form ref="form" v-model="formularioBuscarModel" @submit.prevent="buscarPacientePorRut" lazy-validation
              :disabled="btnBuscarCargando">
              <v-row>
                <v-col cols="10">
                  <v-text-field label="RUN" v-model="buscarRun" prepend-icon="mdi-account"></v-text-field>
                </v-col>
                <v-col cols="2">
                  <v-btn type="submit" class="mt-3" block color="success" :loading="btnBuscarCargando"
                    :disabled="btnBuscarCargando">
                    <v-icon>mdi-magnify</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
            <v-alert text v-model="alertaErrorModel" outlined dismissible type="error" class="mt-5">
              {{ mensajeError }}
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <div v-if="mostrarResultado">
      <v-row>
        <v-col>
          <h2>Resultados</h2>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-data-table :hide-default-footer="true" :disable-pagination="true" dense
            :headers="headersTablaExamenesLaboratorio" :items="listadoExamenesLaboratorio" :search="filtroExamenes"
            class="elevation-1">
            <template #[`item.actions`]="{ item }">
              <div>
                <v-icon color="error" @click="eliminarExamen(item)">mdi-delete</v-icon>
              </div>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BuscarExamenesLaboratorioVista',
  data () {
    return {
      // Resultado
      mostrarResultado: true,
      // Modal de error
      alertaErrorModel: false,
      mensajeError: '',
      // Formulario
      buscarRun: '',
      btnBuscarCargando: false,
      // Tabla
      headersTablaExamenesLaboratorio: [
        { text: 'ID', value: 'id' },
        { text: 'Rut', value: 'rut' },
        { text: 'Nombre', value: 'nombre' },
        { text: 'Fecha', value: 'fecha' },
        { text: 'Acciones', value: 'actions', sortable: false }
      ]
    }
  }
}
</script>
