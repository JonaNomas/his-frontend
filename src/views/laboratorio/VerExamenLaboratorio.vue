<template>
  <div>
    <v-row>
      <v-col>
        <h1>Viendo Resultados Examen Laboratorio</h1>
      </v-col>

      <v-col class="d-flex justify-end">
        <v-btn color="primary" @click="imprimirDocumento">Imprimir</v-btn>
      </v-col>
    </v-row>

    <div ref="imp1">
      <DocumentoImpresionLaboratorio :paciente="pacienteEncontrado" :examenes="listadoTabla" />
    </div>

    <div v-if="mostrarResultado">
      <v-row>
        <v-col>
          <h2>Resultados fecha 2023-12-15</h2>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <TablaDatosSimplePaciente :pacienteEncontrado="pacienteEncontrado" />
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-data-table :hide-default-footer="true" :disable-pagination="true" :headers="headersTabla"
            :items="listadoTabla" class="elevation-1">
            <template #[`item.actions`]="{ item }">
              <div>
                <v-btn x-small color="accent" button :to="`/laboratorio/buscar/${item.id}`">Ver</v-btn>
              </div>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import TablaDatosSimplePaciente from '@/components/TablaDatosSimplePaciente.vue'
import obtenerPacientePorRut from '@/services/paciente/obtenerPacientePorRut'
import DocumentoImpresionLaboratorio from '@/components/impresiones/DocumentoImpresionLaboratorio.vue'
import imprimirDocumento from '@/utils/imprimirDocumento'

export default {
  name: 'VerExamenLaboratorio',
  data () {
    return {
      imprimirCampo: true,
      // Resultado
      mostrarResultado: true,
      pacienteEncontrado: {},
      buscarRun: '',
      // Modal de error
      alertaErrorModel: false,
      mensajeError: '',
      // Formulario
      btnBuscarCargando: false,
      formularioBuscarModel: true,
      // Tabla
      headersTabla: [
        { text: 'Nombre', value: 'nombre', align: 'center' },
        { text: 'Resultado', value: 'resultado', align: 'center' },
        { text: 'Valor Minimo', value: 'valorMinimo', align: 'center' },
        { text: 'Valor Maximo', value: 'valorMaximo', align: 'center' }
      ],
      listadoTabla: []
    }
  },
  methods: {
    buscarPacientePorRut () {
      this.btnBuscarCargando = true
      this.alertaErrorModel = false
      this.seEncontroPaciente = false
      obtenerPacientePorRut('19033183-0')
        .then((response) => {
          if (response === '') {
            this.mensajeError = 'No se encontró un paciente con el RUN ingresado.'
            this.alertaErrorModel = true
            this.btnBuscarCargando = false
            this.seEncontroPaciente = false
            return
          }
          this.seEncontroPaciente = true
          this.pacienteEncontrado = response
          this.btnBuscarCargando = false
          this.llenarTabla()
        })
        .catch(() => {
          this.btnBuscarCargando = false
          this.seEncontroPaciente = false
        })
    },
    async llenarTabla () {
      this.listadoTabla = [
        {
          id: 1,
          nombre: 'Hemoglobina',
          resultado: '15',
          valorMinimo: '12',
          valorMaximo: '16'
        },
        {
          id: 2,
          nombre: 'Hematocrito',
          resultado: '45',
          valorMinimo: '40',
          valorMaximo: '50'
        },
        {
          id: 3,
          nombre: 'Leucocitos',
          resultado: '10',
          valorMinimo: '4',
          valorMaximo: '10'
        },
        {
          id: 4,
          nombre: 'Plaquetas',
          resultado: '200',
          valorMinimo: '150',
          valorMaximo: '400'
        },
        {
          id: 5,
          nombre: 'Glucosa',
          resultado: '100',
          valorMinimo: '70',
          valorMaximo: '100'
        },
        {
          id: 6,
          nombre: 'Colesterol',
          resultado: '200',
          valorMinimo: '150',
          valorMaximo: '400'
        },
        {
          id: 7,
          nombre: 'Trigliceridos',
          resultado: '100',
          valorMinimo: '70',
          valorMaximo: '100'
        },
        {
          id: 8,
          nombre: 'HDL',
          resultado: '200',
          valorMinimo: '150',
          valorMaximo: '400'
        },
        {
          id: 9,
          nombre: 'LDL',
          resultado: '100',
          valorMinimo: '70',
          valorMaximo: '100'
        },
        {
          id: 10,
          nombre: 'VLDL',
          resultado: '200',
          valorMinimo: '150',
          valorMaximo: '400'
        },
        {
          id: 11,
          nombre: 'TSH',
          resultado: '100',
          valorMinimo: '70',
          valorMaximo: '100'
        },
        {
          id: 12,
          nombre: 'T4 Libre',
          resultado: '200',
          valorMinimo: '150',
          valorMaximo: '400'
        },
        {
          id: 13,
          nombre: 'T3 Libre',
          resultado: '100',
          valorMinimo: '70',
          valorMaximo: '100'
        },
        {
          id: 14,
          nombre: 'T4 Total',
          resultado: '200',
          valorMinimo: '150',
          valorMaximo: '400'
        },
        {
          id: 15,
          nombre: 'T3 Total',
          resultado: '100',
          valorMinimo: '70',
          valorMaximo: '100'
        },
        {
          id: 16,
          nombre: 'Tiroglobulina',
          resultado: '200',
          valorMinimo: '150',
          valorMaximo: '400'
        },
        {
          id: 17,
          nombre: 'Anticuerpos Anti Tiroglobulina',
          resultado: '100',
          valorMinimo: '70',
          valorMaximo: '100'
        },
        {
          id: 18,
          nombre: 'Anticuerpos Anti Tiroperoxidasa',
          resultado: '200',
          valorMinimo: '150',
          valorMaximo: '400'
        },
        {
          id: 19,
          nombre: 'Anticuerpos Anti Receptor TSH',
          resultado: '100',
          valorMinimo: '70',
          valorMaximo: '100'
        },
        {
          id: 20,
          nombre: 'Anticuerpos Anti Microsomales',
          resultado: '200',
          valorMinimo: '150',
          valorMaximo: '400'
        },
        {
          id: 21,
          nombre: 'Anticuerpos Anti Tiroglobulina',
          resultado: '100',
          valorMinimo: '70',
          valorMaximo: '100'
        },
        {
          id: 22,
          nombre: 'Anticuerpos Anti Tiroperoxidasa',
          resultado: '200',
          valorMinimo: '150',
          valorMaximo: '400'
        },
        {
          id: 23,
          nombre: 'Anticuerpos Anti Receptor TSH',
          resultado: '100',
          valorMinimo: '70',
          valorMaximo: '100'
        },
        {
          id: 24,
          nombre: 'Anticuerpos Anti Microsomales',
          resultado: '200',
          valorMinimo: '150',
          valorMaximo: '400'
        }
      ]
    },
    imprimirDocumento
  },
  mounted () {
    this.buscarPacientePorRut()
  },
  components: { TablaDatosSimplePaciente, DocumentoImpresionLaboratorio }
}
</script>
