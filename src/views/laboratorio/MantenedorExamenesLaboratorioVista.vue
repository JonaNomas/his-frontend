<template>
  <div>
    <v-row>
      <v-col>
        <h1>Mantenedor Exámenes Laboratorio</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            <v-row>
              <v-col lg="4" sm="12">Laboratorio</v-col>
              <v-col lg="4" sm="12"><v-btn color="secondary" dense block @click="dialogCrearExamen = true"><v-icon
                    left>mdi-plus</v-icon>Crear</v-btn></v-col>
              <v-col lg="4" sm="12"><v-text-field dense v-model="filtroExamenes" append-icon="mdi-magnify" outlined
                  label="Filtrar Exámenes" hide-details></v-text-field></v-col>
            </v-row>

          </v-card-title>

          <v-alert dense text v-model="alertaErrorModel" outlined dismissible type="error" class="my-5">
            {{ mensajeError }}
          </v-alert>

          <v-data-table :hide-default-footer="true" :disable-pagination="true" dense
            :headers="headersTablaExamenesLaboratorio" :items="listadoExamenesLaboratorio" :search="filtroExamenes"
            class="elevation-1">
            <template #[`item.actions`]="{ item }">
              <div>
                <!-- <v-icon color="success" @click="editarExamen(item)">mdi-pencil-box</v-icon> -->
                <v-icon color="error" @click="eliminarExamen(item)">mdi-delete</v-icon>
              </div>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>

    <!--Dialog Para Crear-->
    <v-dialog v-model="dialogCrearExamen" max-width="700">
      <v-card>
        <v-toolbar color="primary" dark>
          <v-toolbar-title><v-icon left>mdi-plus</v-icon> Nuevo Examen</v-toolbar-title>
        </v-toolbar>

        <v-card-text>
          <v-row class="mt-5">
            <v-col>
              <v-text-field hide-details dense outlined label="Codigo" required
                v-model="nuevoExamenCodigo"></v-text-field>
            </v-col>
            <v-col>
              <v-autocomplete dense label="Tipo Atencion" v-model="nuevoExamenTipoExamen"
                outlined hide-details :items="listadoTiposExamenes" item-text="nombre" item-value="id"></v-autocomplete>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field hide-details dense outlined label="Nombre Examen" required
                v-model="nuevoExamenNombreExamen"></v-text-field>
            </v-col>
            <v-col>
              <v-text-field hide-details type="number" min="0" dense outlined label="Valor Minimo" required
                v-model="nuevoExamenValorMinimo"></v-text-field>
            </v-col>
            <v-col>
              <v-text-field hide-details type="number" min="0" dense outlined label="Valor Maximo" required
                v-model="nuevoExamenValorValorMaximo"></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-btn dense block color="success" @click="crearNuevoExamenLaboratorio">Crear</v-btn>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="error" text @click="dialogCrearExamen = false">
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!--Dialog Para Eliminar-->
    <v-dialog :persistent="estaCargandoEliminar" v-model="dialogEliminarExamen" max-width="700px">
      <v-card>
        <v-toolbar dense color="error" dark>
          <v-toolbar-title><v-icon left>mdi-delete-empty</v-icon> Eliminando</v-toolbar-title>
        </v-toolbar>
        <v-card-text class="mt-10">
          <h3 class="text-center">¿Esta seguro que desea eliminar este registro permanentemente?</h3>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogEliminarExamen = false"
            :disabled="estaCargandoEliminar">Cancelar</v-btn>
          <v-btn color="error darken-1" text @click="confirmarEliminarExamen" :loading="estaCargandoEliminar"
            :disabled="estaCargandoEliminar">Confirmar</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
export default {
  name: 'MantenedorExamenesLaboratorioVista',
  data () {
    return {
      mensajeError: 'Error',
      alertaErrorModel: false,
      test: true,
      estaCargandoEliminar: false,
      dialogEliminarExamen: false,
      dialogCrearExamen: false,
      eliminarExamenIndex: null,
      itemEliminarExamen: null,
      listadoExamenesLaboratorio: [],
      listadoTiposExamenes: [],
      filtroExamenes: '',
      headersTablaExamenesLaboratorio: [
        { text: 'ID', value: 'id', align: 'center' },
        { text: 'Codigo', value: 'codigo', align: 'center' },
        { text: 'Tipo Examen', value: 'tipoExamen' },
        { text: 'Nombre', value: 'nombre' },
        { text: 'Valor Minimo', value: 'valorMinimo', align: 'center' },
        { text: 'Valor Maximo', value: 'valorMaximo', align: 'center' },
        { text: 'Acciones', value: 'actions', sortable: false, align: 'center' }
      ],
      // nuevoExamen
      nuevoExamenCodigo: '',
      nuevoExamenTipoExamen: '',
      nuevoExamenNombreExamen: '',
      nuevoExamenValorMinimo: '',
      nuevoExamenValorValorMaximo: ''
    }
  },
  methods: {
    listarExamenesLaboratorio () {
      // TODO: LLamada a API
      this.listadoExamenesLaboratorio = [
        {
          id: 1,
          codigo: '001',
          tipoExamen: 'Hemograma',
          nombre: 'Hemoglobina',
          valorMinimo: 12,
          valorMaximo: 18
        },
        {
          id: 2,
          codigo: '002',
          tipoExamen: 'Hemograma',
          nombre: 'Hematocrito',
          valorMinimo: 40,
          valorMaximo: 50
        },
        {
          id: 3,
          codigo: '003',
          tipoExamen: 'Hemograma',
          nombre: 'Leucocitos',
          valorMinimo: 4,
          valorMaximo: 10
        },
        {
          id: 4,
          codigo: '004',
          tipoExamen: 'Hemograma',
          nombre: 'Plaquetas',
          valorMinimo: 150,
          valorMaximo: 450
        },
        {
          id: 5,
          codigo: '005',
          tipoExamen: 'Hemograma',
          nombre: 'VSG',
          valorMinimo: 0,
          valorMaximo: 20
        },
        {
          id: 6,
          codigo: '006',
          tipoExamen: 'Hemograma',
          nombre: 'Neutrofilos',
          valorMinimo: 40,
          valorMaximo: 75
        },
        {
          id: 7,
          codigo: '007',
          tipoExamen: 'Hemograma',
          nombre: 'Linfocitos',
          valorMinimo: 20,
          valorMaximo: 40
        },
        {
          id: 8,
          codigo: '008',
          tipoExamen: 'Hemograma',
          nombre: 'Monocitos',
          valorMinimo: 2,
          valorMaximo: 8
        },
        {
          id: 9,
          codigo: '009',
          tipoExamen: 'Hemograma',
          nombre: 'Eosinofilos',
          valorMinimo: 1,
          valorMaximo: 4
        }
      ]
    },
    listarTiposExamenes () {
      // TODO: Lamada a API
      this.listadoTiposExamenes = [
        {
          id: 1,
          nombre: 'Química Hemática'
        },
        {
          id: 2,
          nombre: 'Ex. Hematológicos'
        },
        {
          id: 3,
          nombre: 'Ex. Microbiológicos'
        },
        {
          id: 4,
          nombre: 'Orina'
        },
        {
          id: 5,
          nombre: 'Ex. Reumatológicos'
        },
        {
          id: 6,
          nombre: 'Ex. Hormonales'
        },
        {
          id: 7,
          nombre: 'Otros'
        }
      ]
    },
    editarExamen (item) {
      console.log(item)
    },
    eliminarExamen (item) {
      this.dialogEliminarExamen = true
      this.eliminarExamenIndex = this.listadoExamenesLaboratorio.indexOf(item)
      this.itemEliminarExamen = item
    },
    confirmarEliminarExamen () {
      if (this.eliminarExamenIndex === null) return
      this.estaCargandoEliminar = true

      // TODO: Peticion a API para eliminar y comprobar si es verdadero

      if (this.test) {
        this.listadoExamenesLaboratorio.splice(this.eliminarExamenIndex, 1)
        this.dialogEliminarExamen = false
        this.estaCargandoEliminar = false
        this.eliminarExamenIndex = null
        this.itemEliminarExamen = null
        return
      }
      this.mensajeError = 'Error al eliminar el examen'
      this.alertaErrorModel = true
      this.dialogEliminarExamen = false
      this.estaCargandoEliminar = false
      this.eliminarExamenIndex = null
      this.itemEliminarExamen = null
    },
    crearNuevoExamenLaboratorio () {
      if (this.nuevoExamenCodigo === '' || this.nuevoExamenTipoExamen === '' || this.nuevoExamenNombreExamen === '' || this.nuevoExamenValorMinimo === '' || this.nuevoExamenValorValorMaximo === '') {
        this.mensajeError = 'Debe completar todos los campos'
        this.alertaErrorModel = true
        this.dialogCrearExamen = false
        return
      }

      // TODO: Peticion a API para crear nuevo examen
      // INFO: Cuando se cree el nuevo examen debe devolver el objeto creado
      const nuevoExamen = {
        id: this.listadoExamenesLaboratorio.length + 1,
        codigo: this.nuevoExamenCodigo,
        tipoExamen: this.listadoTiposExamenes.find(tipoExamen => tipoExamen.id === this.nuevoExamenTipoExamen).nombre,
        nombre: this.nuevoExamenNombreExamen,
        valorMinimo: this.nuevoExamenValorMinimo,
        valorMaximo: this.nuevoExamenValorValorMaximo
      }

      this.listadoExamenesLaboratorio.push(nuevoExamen)
      this.dialogCrearExamen = false
    }
  },
  mounted () {
    this.listarExamenesLaboratorio()
    this.listarTiposExamenes()
  }
}
</script>
