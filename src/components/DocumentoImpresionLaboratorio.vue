<template>
  <div class="d-none">

    <table style="width: 100%;">
      <tr>
        <td style="width: 20%;" :style="headerTableDocumento"><img :style="logoApp" src="../assets/medsoft2_x128.png" alt="Logo"></td>
        <td style="width: 80%;" :style="headerTableDocumento"><h1 :style="estiloTitulo">Resultados Examen Laboratorio</h1></td>
      </tr>
    </table>

    <table style="border-collapse: collapse; width: 100%;">
      <tr>
        <td :style="estiloCeldasTabla"><strong>N° Orden</strong></td>
        <td :style="estiloCeldasTabla">3213212</td>
        <td :style="estiloCeldasTabla"><strong>Fecha</strong></td>
        <td :style="estiloCeldasTabla">20-12-2023</td>
      </tr>
      <tr>
        <td :style="estiloCeldasTabla"><strong>Nombre</strong></td>
        <td :style="estiloCeldasTabla">Victor Guzman Contreras</td>
        <td :style="estiloCeldasTabla"><strong>RUN</strong></td>
        <td :style="estiloCeldasTabla">19033183-0</td>
      </tr>
      <tr>
        <td :style="estiloCeldasTabla"><strong>Fecha Nacimiento</strong></td>
        <td :style="estiloCeldasTabla">06-02-1995</td>
        <td :style="estiloCeldasTabla"><strong>Edad</strong></td>
        <td :style="estiloCeldasTabla">28 Años</td>
      </tr>
      <tr>
        <td :style="estiloCeldasTabla"><strong>Sexo</strong></td>
        <td :style="estiloCeldasTabla">M</td>
        <td :style="estiloCeldasTabla"><strong>Nombre Social</strong></td>
        <td :style="estiloCeldasTabla">El</td>
      </tr>
    </table>

    <table style="width: 100%; text-align: center; font-family: 'Arial'; margin-top: 15px;">
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
      estiloTitulo: {
        textAlign: 'center',
        fontFamily: 'Arial',
        fontSize: '25px'
      },
      estiloCeldasTabla: {
        fontFamily: 'Arial',
        border: '1px solid #929292',
        padding: '5px'
      },
      logoApp: {
        width: '100px',
        height: '100px'
      },
      headerTableDocumento: {
        fontFamily: 'Arial',
        border: '1px solid #929292',
        padding: '5px',
        textAlign: 'center'
      }
    }
  }
}
</script>
