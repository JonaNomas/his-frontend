<template>
  <div>
    <v-row>
      <v-col>
        <h1>Viendo Resultados Examen Imagenología </h1>
      </v-col>

      <v-col class="d-flex justify-end">
        <v-btn color="primary" @click="imprimirDocumento">Imprimir</v-btn>
      </v-col>
    </v-row>

    <div ref="imp1">
      <DocumentoImpresionImagenologia :paciente="pacienteEncontrado" :examenes="listadoTabla" />
    </div>

    <v-row>
      <v-col>
        <h2>TAC Encefalo</h2>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <h3>Resultados fecha 2023-12-16</h3>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <TablaDatosSimplePaciente :pacienteEncontrado="pacienteEncontrado" />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <h3>Motivo Examen</h3>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        Cefalea
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <h3>Informe</h3>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        Base de cráneo y calota de configuración anatomica normal. Amplia neumatización de celdas aéreas mastoideas y cavidades paranasales. Contenido de la fosa posterior sin hallazgos patológicos, observándose IV ventrículo y cisternas regionales permeables. Hemisferios cerebrales de morfología conservada, destacando normal gradiente de diferenciación de sustancia gris y blanca,con adecuada representación de núcleos de la base y tálamos ópticos.No se aprecian lesiones focales intra-axiales. Sistema ventricular supratentorial de forma y tamaño conservado. Compartimiento cisternal y espacio subaracnoídeo epicortical permeable. El uso de contraste endovenoso solo realza las estructuras vasculares normales del encéfalo. Calcificación de la glándula pineal y plexo coroideo de atrios ventriculares.
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <h3>Impresión Diagnostica</h3>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        Examen sin hallazgos patológicos.
      </v-col>
    </v-row>
  </div>
</template>

<script>
import TablaDatosSimplePaciente from '@/components/TablaDatosSimplePaciente.vue'
import DocumentoImpresionImagenologia from '@/components/impresiones/DocumentoImpresionImagenologia.vue'
import obtenerPacientePorRut from '@/services/paciente/obtenerPacientePorRut'
import imprimirDocumento from '@/utils/imprimirDocumento'

export default {
  name: 'VerExamenImagenologiaVista',
  data () {
    return {
      pacienteEncontrado: {}
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
    imprimirDocumento
  },
  mounted () {
    this.buscarPacientePorRut()
  },
  components: { TablaDatosSimplePaciente, DocumentoImpresionImagenologia }
}
</script>
