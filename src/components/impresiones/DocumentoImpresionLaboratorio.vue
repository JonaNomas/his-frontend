<template>
  <div class="d-none">

    <table class="w-100 pure-table pure-table-center mb-5">
      <tr>
        <td class="text-center pure-img"><img width="100px" src="@/assets/medsoft2_x128.png" alt="Logo"></td>
        <td class="text-center"><h1>Resultados Examen Laboratorio</h1></td>
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

    <table class="w-100 pure-table pure-table-center pure-table-horizontal">
      <thead>
        <tr>
          <th style="font-weight: bold;">Nombre Examen</th>
          <th style="font-weight: bold;">Resultado</th>
          <th style="font-weight: bold;">Valor Referencia</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(examen, index) in examenes" :key="index">
          <td>{{ examen.nombre }}</td>
          <td>{{ examen.resultado }}</td>
          <td>{{ examen.valorMinimo }} - {{ examen.valorMaximo }}</td>
        </tr>
      </tbody>
    </table>

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
    examenes: {
      type: Array,
      required: true
    }
  }
}
</script>
