<template>
  <div class="d-none">

    <table class="w-100 pure-table pure-table-center mb-5">
      <tr>
        <td class="text-center pure-img"><img width="100px" src="@/assets/medsoft2_x128.png" alt="Logo"></td>
        <td class="text-center"><h1>Hora Medica</h1></td>
      </tr>
    </table>

    <table class="pure-table pure-table-bordered w-100 mb-5">
      <tr>
        <td><strong>N° Atención</strong></td>
        <td>116</td>
        <td><strong>Fecha Agendación</strong></td>
        <td>{{ fechaDDMMAAAA(new Date()) }}</td>
      </tr>
      <tr>
        <td><strong>Paciente</strong></td>
        <td>Victor Guzman Contreras</td>
        <td><strong>Run Paciente</strong></td>
        <td>19033183-0</td>
      </tr>
      <tr>
        <td><strong>Impreso por:</strong></td>
        <td>{{ `${$store.state.usuario.nombre} ${$store.state.usuario.apellidoPaterno} ${$store.state.usuario.apellidoMaterno}` }}</td>
        <td><strong>Fecha Impresión:</strong></td>
        <td>{{ fechaDDMMAAAA(new Date()) }}</td>
      </tr>
    </table>

    <table class="w-100 pure-table pure-table-horizontal">
      <thead>
        <tr>
          <th style="font-weight: bold;">Unidad</th>
          <th style="font-weight: bold;">Especialidad</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Policlínico</td>
          <td>Cardiología</td>
        </tr>
      </tbody>
    </table>
    <table class="w-100 pure-table pure-table-horizontal">
      <thead>
        <tr>
          <th style="font-weight: bold;">Nombre Medico</th>
          <th style="font-weight: bold;">Run Medico</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Juan Perez Perez</td>
          <td>12345678-5</td>
        </tr>
      </tbody>
    </table>
    <table class="w-100 pure-table pure-table-horizontal">
      <thead>
        <tr>
          <th style="font-weight: bold;">Día</th>
          <th style="font-weight: bold;">Hora</th>
          <th style="font-weight: bold;">Duración</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>01-12-2023</td>
          <td>09:00:00</td>
          <td>30 min</td>
        </tr>
      </tbody>
    </table>

  </div>
</template>
<script>
import fechaDDMMAAAA from '@/utils/fechaDDMMAAAA'
import calcularEdad from '@/utils/calcularEdad'
export default {
  name: 'DocumentoImpresionHoraMedica',
  data () {
    return {

    }
  },
  computed: {
    // nombreCompleto () {
    //   return `${this.paciente?.nombrePrimer} ${this.paciente?.nombreSegundo} ${this.paciente?.apellidoPaterno} ${this.paciente?.apellidoMaterno}`
    // }

  },
  methods: {
    fechaDDMMAAAA,
    calcularEdad
  },
  props: {
  }
}
</script>
