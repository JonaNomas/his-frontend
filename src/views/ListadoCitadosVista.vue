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
          prepend-inner-icon="mdi-hospital-building" outlined hide-details :items="listadoUnidadesDeAtencion"
          item-text="nombre" item-value="nombre"></v-autocomplete>
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
          <template #[`item.acciones`]="{ item }">
            <div class="text-center">
              <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn x-small color="secondary" dark v-bind="attrs" v-on="on">
                    Cambiar Estado
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item dense link v-for="(el, index) in listadoAccionesMenu" :key="el.id || index">
                    <v-icon left>mdi-account-sync</v-icon>
                    <v-list-item-content>
                      <v-list-item-title @click="cambiarEstadoCitado(item, el)" v-text="el"></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </template>
          <template #[`item.estadoAtencion`]="{ item }">
            <v-chip small label :color="item.estado === 'Asignada'? 'accent': item.estado === 'Atendida'? 'success':'error'">{{ item.estado }}</v-chip>
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
      listadoAccionesMenu: [
        'Asignada',
        'Atendida',
        'No Asistió'
      ],
      listadoUnidadesDeAtencion: [
        { id: 1, nombre: 'Hospitalización' },
        { id: 2, nombre: 'Centro Quirúrgico' },
        { id: 3, nombre: 'Policlínico' },
        { id: 4, nombre: 'Imagenología' },
        { id: 5, nombre: 'Laboratorio' }
      ],
      headersTablaCitados: [
        { text: 'RUN', value: 'run' },
        { text: 'Nombre', value: 'nombre' },
        { text: 'Motivo', value: 'motivo' },
        { text: 'Fecha', value: 'fecha' },
        { text: 'Estado', value: 'estadoAtencion' },
        { text: 'Acciones', value: 'acciones', sortable: false, align: 'center' }
      ]
    }
  },
  methods: {
    cargarListado () {
      this.estaCargandoInformacion = true
      this.listadoCitados = [
        { id: 1, estado: 'Asignada', run: '12345678-5', nombre: 'Alejandro Nicolás Rodríguez López', motivo: 'Imagenología', fecha: this.fechaSeleccionada },
        { id: 2, estado: 'Asignada', run: '19876543-2', nombre: 'Valentina Isabella González Ramírez', motivo: 'Imagenología', fecha: this.fechaSeleccionada },
        { id: 3, estado: 'Asignada', run: '17654321-0', nombre: 'Diego Andrés Martínez Castro', motivo: 'Imagenología', fecha: this.fechaSeleccionada },
        { id: 4, estado: 'Asignada', run: '12345678-9', nombre: 'Camila Sofía Fernández Díaz', motivo: 'Imagenología', fecha: this.fechaSeleccionada },
        { id: 5, estado: 'Asignada', run: '11098765-4', nombre: 'Mateo Nicolás Pérez Herrera', motivo: 'Imagenología', fecha: this.fechaSeleccionada },
        { id: 6, estado: 'Asignada', run: '13210987-6', nombre: 'Isabella Gabriela López Ramírez', motivo: 'Imagenología', fecha: this.fechaSeleccionada },
        { id: 7, estado: 'Asignada', run: '18901234-5', nombre: 'Andrés Alejandro Díaz Castro', motivo: 'Imagenología', fecha: this.fechaSeleccionada },
        { id: 8, estado: 'Asignada', run: '14567890-1', nombre: 'Sofía Valentina Herrera González', motivo: 'Imagenología', fecha: this.fechaSeleccionada },
        { id: 9, estado: 'Asignada', run: '17654321-9', nombre: 'Nicolás Diego Martínez López', motivo: 'Imagenología', fecha: this.fechaSeleccionada },
        { id: 10, estado: 'Asignada', run: '11122334-5', nombre: 'Gabriela Camila Castro Ramírez', motivo: 'Policlínico', fecha: this.fechaSeleccionada },
        { id: 11, estado: 'Asignada', run: '12345678-5', nombre: 'Alejandro Nicolás Rodríguez López', motivo: 'Policlínico', fecha: this.fechaSeleccionada },
        { id: 12, estado: 'Asignada', run: '19876543-2', nombre: 'Valentina Isabella González Ramírez', motivo: 'Policlínico', fecha: this.fechaSeleccionada },
        { id: 13, estado: 'Asignada', run: '17654321-0', nombre: 'Diego Andrés Martínez Castro', motivo: 'Policlínico', fecha: this.fechaSeleccionada },
        { id: 14, estado: 'Asignada', run: '12345678-9', nombre: 'Camila Sofía Fernández Díaz', motivo: 'Policlínico', fecha: this.fechaSeleccionada },
        { id: 15, estado: 'Asignada', run: '18901234-5', nombre: 'Andrés Alejandro Díaz Castro', motivo: 'Laboratorio', fecha: this.fechaSeleccionada },
        { id: 16, estado: 'Asignada', run: '14567890-1', nombre: 'Sofía Valentina Herrera González', motivo: 'Laboratorio', fecha: this.fechaSeleccionada },
        { id: 17, estado: 'Asignada', run: '17654321-9', nombre: 'Nicolás Diego Martínez López', motivo: 'Laboratorio', fecha: this.fechaSeleccionada },
        { id: 18, estado: 'Asignada', run: '11122334-5', nombre: 'Gabriela Camila Castro Ramírez', motivo: 'Laboratorio', fecha: this.fechaSeleccionada },
        { id: 19, estado: 'Asignada', run: '12345678-5', nombre: 'Alejandro Nicolás Rodríguez López', motivo: 'Laboratorio', fecha: this.fechaSeleccionada },
        { id: 20, estado: 'Asignada', run: '19876543-2', nombre: 'Valentina Isabella González Ramírez', motivo: 'Laboratorio', fecha: this.fechaSeleccionada },
        { id: 21, estado: 'Asignada', run: '17654321-0', nombre: 'Diego Andrés Martínez Castro', motivo: 'Hospitalización', fecha: this.fechaSeleccionada },
        { id: 22, estado: 'Asignada', run: '12345678-9', nombre: 'Camila Sofía Fernández Díaz', motivo: 'Hospitalización', fecha: this.fechaSeleccionada },
        { id: 23, estado: 'Asignada', run: '11098765-4', nombre: 'Mateo Nicolás Pérez Herrera', motivo: 'Hospitalización', fecha: this.fechaSeleccionada },
        { id: 24, estado: 'Asignada', run: '13210987-6', nombre: 'Isabella Gabriela López Ramírez', motivo: 'Hospitalización', fecha: this.fechaSeleccionada },
        { id: 25, estado: 'Asignada', run: '18901234-5', nombre: 'Andrés Alejandro Díaz Castro', motivo: 'Hospitalización', fecha: this.fechaSeleccionada },
        { id: 26, estado: 'Asignada', run: '14567890-1', nombre: 'Sofía Valentina Herrera González', motivo: 'Hospitalización', fecha: this.fechaSeleccionada },
        { id: 27, estado: 'Asignada', run: '17654321-9', nombre: 'Nicolás Diego Martínez López', motivo: 'Hospitalización', fecha: this.fechaSeleccionada },
        { id: 28, estado: 'Asignada', run: '11122334-5', nombre: 'Gabriela Camila Castro Ramírez', motivo: 'Hospitalización', fecha: this.fechaSeleccionada },
        { id: 29, estado: 'Asignada', run: '12345678-5', nombre: 'Alejandro Nicolás Rodríguez López', motivo: 'Hospitalización', fecha: this.fechaSeleccionada },
        { id: 30, estado: 'Asignada', run: '19876543-2', nombre: 'Valentina Isabella González Ramírez', motivo: 'Hospitalización', fecha: this.fechaSeleccionada },
        { id: 31, estado: 'Asignada', run: '17654321-0', nombre: 'Diego Andrés Martínez Castro', motivo: 'Centro Quirúrgico', fecha: this.fechaSeleccionada },
        { id: 32, estado: 'Asignada', run: '12345678-9', nombre: 'Camila Sofía Fernández Díaz', motivo: 'Centro Quirúrgico', fecha: this.fechaSeleccionada },
        { id: 33, estado: 'Asignada', run: '11098765-4', nombre: 'Mateo Nicolás Pérez Herrera', motivo: 'Centro Quirúrgico', fecha: this.fechaSeleccionada },
        { id: 34, estado: 'Asignada', run: '13210987-6', nombre: 'Isabella Gabriela López Ramírez', motivo: 'Centro Quirúrgico', fecha: this.fechaSeleccionada },
        { id: 35, estado: 'Asignada', run: '18901234-5', nombre: 'Andrés Alejandro Díaz Castro', motivo: 'Centro Quirúrgico', fecha: this.fechaSeleccionada },
        { id: 36, estado: 'Asignada', run: '14567890-1', nombre: 'Sofía Valentina Herrera González', motivo: 'Centro Quirúrgico', fecha: this.fechaSeleccionada },
        { id: 37, estado: 'Asignada', run: '17654321-9', nombre: 'Nicolás Diego Martínez López', motivo: 'Centro Quirúrgico', fecha: this.fechaSeleccionada }
      ]

      this.listadoCitados = this.listadoCitados.filter(citado => citado.motivo === this.selectTipoAtencion)
      this.estaCargandoInformacion = false
    },
    cambiarEstadoCitado (citado, nuevoEstado) {
      this.listadoCitados = this.listadoCitados.map(el => {
        if (el.id === citado.id) {
          el.estado = nuevoEstado
        }
        return el
      })
    }
  }
}
</script>
