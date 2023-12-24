<template>
  <div class="d-none">

    <table class="w-100 pure-table pure-table-center mb-5">
      <tr>
        <td class="text-center pure-img"><img width="100px" src="@/assets/medsoft2_x128.png" alt="Logo"></td>
        <td class="text-center"><h1>Resultado Examen Imagenología</h1></td>
      </tr>
    </table>

    <table class="pure-table pure-table-bordered w-100 mb-5">
      <tr>
        <td><strong>N° Orden</strong></td>
        <td>116</td>
        <td><strong>Fecha Examen</strong></td>
        <td>20-12-2023</td>
      </tr>
      <tr>
        <td><strong>Nombre</strong></td>
        <td>{{ nombreCompleto }}</td>
        <td><strong>RUN</strong></td>
        <td>{{ paciente.run }}</td>
      </tr>
      <tr>
        <td><strong>Fecha Nacimiento</strong></td>
        <td>{{ fechaDDMMAAAA(paciente.fechaNacimiento) }}</td>
        <td><strong>Edad</strong></td>
        <td>{{ calcularEdad(paciente.fechaNacimiento) }} Años</td>
      </tr>
      <tr>
        <td><strong>Sexo</strong></td>
        <td>{{ paciente.sexo }}</td>
        <td><strong>Nombre Social</strong></td>
        <td>{{ paciente.nombreSocial }}</td>
      </tr>
      <tr>
        <td><strong>Impreso por:</strong></td>
        <td>{{ `${$store.state.usuario.nombre} ${$store.state.usuario.apellidoPaterno} ${$store.state.usuario.apellidoMaterno}` }}</td>
        <td><strong>Fecha Impresión:</strong></td>
        <td>{{ fechaDDMMAAAA(new Date()) }}</td>
      </tr>
    </table>

    <h3>Examen</h3>
    <p>TAC Encefalo</p>

    <h3>Motivo Examen</h3>
    <p>Cefalea</p>

    <h3>Informe</h3>
    <p>Base de cráneo y calota de configuración anatomica normal. Amplia neumatización de celdas aéreas mastoideas y cavidades paranasales. Contenido de la fosa posterior sin hallazgos patológicos, observándose IV ventrículo y cisternas regionales permeables. Hemisferios cerebrales de morfología conservada, destacando normal gradiente de diferenciación de sustancia gris y blanca,con adecuada representación de núcleos de la base y tálamos ópticos.No se aprecian lesiones focales intra-axiales. Sistema ventricular supratentorial de forma y tamaño conservado. Compartimiento cisternal y espacio subaracnoídeo epicortical permeable. El uso de contraste endovenoso solo realza las estructuras vasculares normales del encéfalo. Calcificación de la glándula pineal y plexo coroideo de atrios ventriculares.</p>

    <h3>Impresión Diagnóstica</h3>
    <p>Examen sin hallazgos patológicos.</p>

    <h3>Medico Responsable</h3>
    <p>F. Perez P. - 12345678-5</p>

  </div>
</template>
<script>
import fechaDDMMAAAA from '@/utils/fechaDDMMAAAA'
import calcularEdad from '@/utils/calcularEdad'
export default {
  name: 'DocumentoImpresionLaboratorio',
  data () {
    return {

    }
  },
  computed: {
    nombreCompleto () {
      return `${this.paciente.nombrePrimer} ${this.paciente.nombreSegundo} ${this.paciente.apellidoPaterno} ${this.paciente.apellidoMaterno}`
    }

  },
  methods: {
    fechaDDMMAAAA,
    calcularEdad
  },
  props: {
    paciente: {
      type: Object,
      required: true
    },
    examen: {
      type: Array,
      required: true
    }
  }
}
</script>
