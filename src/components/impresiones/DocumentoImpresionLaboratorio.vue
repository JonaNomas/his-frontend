<template>
  <div class="d-none">

    <table class="w-100 pure-table pure-table-center mb-5">
      <tr>
        <td class="text-center pure-img"><img width="100px" src="@/assets/medsoft2_x128.png" alt="Logo"></td>
        <td class="text-center"><h1>Resultados Examen Laboratorio</h1></td>
      </tr>
    </table>

    <table class="pure-table pure-table-bordered mb-5" style="border-collapse: collapse; width: 100%;">
      <tr>
        <td><strong>N° Orden</strong></td>
        <td>3213212</td>
        <td><strong>Fecha</strong></td>
        <td>20-12-2023</td>
      </tr>
      <tr>
        <td><strong>Nombre</strong></td>
        <td>Victor Guzman Contreras</td>
        <td><strong>RUN</strong></td>
        <td>19033183-0</td>
      </tr>
      <tr>
        <td><strong>Fecha Nacimiento</strong></td>
        <td>06-02-1995</td>
        <td><strong>Edad</strong></td>
        <td>28 Años</td>
      </tr>
      <tr>
        <td><strong>Sexo</strong></td>
        <td>M</td>
        <td><strong>Nombre Social</strong></td>
        <td>El</td>
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
        <tr>
          <td>Glucosa</td>
          <td>89</td>
          <td>70 - 100</td>
        </tr>
        <tr>
          <td>Colesterol Total</td>
          <td>150</td>
          <td>0 - 200</td>
        </tr>
        <tr>
          <td>Trigliceridos</td>
          <td>89</td>
          <td>0 - 150</td>
        </tr>
      </tbody>
    </table>

  </div>
</template>
<script>
export default {
  name: 'DocumentoImpresionLaboratorio',
  data () {
    return {

    }
  }
}
</script>
