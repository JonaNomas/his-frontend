<template>
  <div>
    <v-row>
      <v-col>
        <h1>Listado Citados</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-autocomplete :disabled="estaCargandoInformacion" dense label="Tipo Atencion" v-model="selectTipoAtencion"
          prepend-inner-icon="mdi-hospital-building" outlined hide-details :items="listadoTipoAtencion" item-text="nombre"
          item-value="id"></v-autocomplete>
      </v-col>
      <v-col>
        <v-dialog ref="dialogoSeleccionarFecha" v-model="modalSeleccionarFecha" :return-value.sync="fechaSeleccionada"
          persistent width="290px">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field :disabled="estaCargandoInformacion" dense v-model="fechaSeleccionada" label="Fecha" outlined
              hide-details prepend-inner-icon="mdi-calendar-month" readonly v-bind="attrs" v-on="on"></v-text-field>
          </template>
          <v-date-picker v-model="fechaSeleccionada" scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="modalSeleccionarFecha = false">
              Cancelar
            </v-btn>
            <v-btn text color="primary" @click="$refs.dialogoSeleccionarFecha.save(fechaSeleccionada)">
              Asignar
            </v-btn>
          </v-date-picker>
        </v-dialog>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn block dense color="accent" :loading="estaCargandoInformacion" :disabled="estaCargandoInformacion"
          @click="cargarListado">Cargar Listado</v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <h3 class="text-center">Pacientes Citados</h3>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-data-table :hide-default-footer="true" :disable-pagination="true" dense :headers="headersTablaCitados"
          :items="listadoCitados" class="elevation-1">
          <template #[`item.actions`]="{ item }">
            <div>
              <v-icon color="error" @click="eliminarSignosVitales(item)">mdi-delete</v-icon>
            </div>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'ListadoCitadosVista',
  data () {
    return {
      estaCargandoInformacion: false,
      fechaSeleccionada: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      modalSeleccionarFecha: false,
      selectTipoAtencion: '',
      listadoCitados: [],
      listadoTipoAtencion: [
        { id: 1, nombre: 'Hospitalización' },
        { id: 2, nombre: 'Centro Quirúrgico' },
        { id: 3, nombre: 'Policlínico' },
        { id: 4, nombre: 'Imagenología' },
        { id: 5, nombre: 'Laboratorio' },
        { id: 6, nombre: 'Banco de Sangre' }
      ],
      headersTablaCitados: [
        { text: 'RUT', value: 'run' },
        { text: 'Nombre', value: 'nombre' },
        { text: 'Motivo', value: 'motivo' },
        { text: 'Fecha', value: 'fecha' }
      ]
    }
  },
  methods: {
    cargarListado () {
      this.estaCargandoInformacion = true
      this.listadoCitados = [
        { run: '12345678-9', nombre: 'Juan Rodrigo Perez Pereira', motivo: 'RX Torax AP', fecha: this.fechaSeleccionada },
        { run: '12345678-9', nombre: 'Juan Rodrigo Perez Pereira', motivo: 'RX Torax AP', fecha: this.fechaSeleccionada },
        { run: '12345678-9', nombre: 'Juan Rodrigo Perez Pereira', motivo: 'RX Torax AP', fecha: this.fechaSeleccionada },
        { run: '12345678-9', nombre: 'Juan Rodrigo Perez Pereira', motivo: 'RX Torax AP', fecha: this.fechaSeleccionada },
        { run: '12345678-9', nombre: 'Juan Rodrigo Perez Pereira', motivo: 'RX Torax AP', fecha: this.fechaSeleccionada },
        { run: '12345678-9', nombre: 'Juan Rodrigo Perez Pereira', motivo: 'RX Torax AP', fecha: this.fechaSeleccionada },
        { run: '12345678-9', nombre: 'Juan Rodrigo Perez Pereira', motivo: 'RX Torax AP', fecha: this.fechaSeleccionada },
        { run: '12345678-9', nombre: 'Juan Rodrigo Perez Pereira', motivo: 'RX Torax AP', fecha: this.fechaSeleccionada },
        { run: '12345678-9', nombre: 'Juan Rodrigo Perez Pereira', motivo: 'RX Torax AP', fecha: this.fechaSeleccionada },
        { run: '12345678-9', nombre: 'Juan Rodrigo Perez Pereira', motivo: 'RX Torax AP', fecha: this.fechaSeleccionada },
        { run: '12345678-9', nombre: 'Juan Rodrigo Perez Pereira', motivo: 'RX Torax AP', fecha: this.fechaSeleccionada },
        { run: '12345678-9', nombre: 'Juan Rodrigo Perez Pereira', motivo: 'RX Torax AP', fecha: this.fechaSeleccionada },
        { run: '12345678-9', nombre: 'Juan Rodrigo Perez Pereira', motivo: 'RX Torax AP', fecha: this.fechaSeleccionada },
        { run: '12345678-9', nombre: 'Juan Rodrigo Perez Pereira', motivo: 'RX Torax AP', fecha: this.fechaSeleccionada },
        { run: '12345678-9', nombre: 'Juan Rodrigo Perez Pereira', motivo: 'RX Torax AP', fecha: this.fechaSeleccionada },
        { run: '12345678-9', nombre: 'Juan Rodrigo Perez Pereira', motivo: 'RX Torax AP', fecha: this.fechaSeleccionada },
        { run: '12345678-9', nombre: 'Juan Rodrigo Perez Pereira', motivo: 'RX Torax AP', fecha: this.fechaSeleccionada },
        { run: '12345678-9', nombre: 'Juan Rodrigo Perez Pereira', motivo: 'RX Torax AP', fecha: this.fechaSeleccionada },
        { run: '12345678-9', nombre: 'Juan Rodrigo Perez Pereira', motivo: 'RX Torax AP', fecha: this.fechaSeleccionada },
        { run: '12345678-9', nombre: 'Juan Rodrigo Perez Pereira', motivo: 'RX Torax AP', fecha: this.fechaSeleccionada },
        { run: '12345678-9', nombre: 'Juan Rodrigo Perez Pereira', motivo: 'RX Torax AP', fecha: this.fechaSeleccionada },
        { run: '12345678-9', nombre: 'Juan Rodrigo Perez Pereira', motivo: 'RX Torax AP', fecha: this.fechaSeleccionada },
        { run: '12345678-9', nombre: 'Juan Rodrigo Perez Pereira', motivo: 'RX Torax AP', fecha: this.fechaSeleccionada },
        { run: '12345678-9', nombre: 'Juan Rodrigo Perez Pereira', motivo: 'RX Torax AP', fecha: this.fechaSeleccionada },
        { run: '12345678-9', nombre: 'Juan Rodrigo Perez Pereira', motivo: 'RX Torax AP', fecha: this.fechaSeleccionada }
      ]
      this.estaCargandoInformacion = false
    }
  }
}
</script>
