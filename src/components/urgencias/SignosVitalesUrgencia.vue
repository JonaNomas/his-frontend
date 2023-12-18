<template>
  <div class="contenedorTablaSignosVitales">
    <table class="tablaSignosVitales">
      <thead>
        <tr>
          <th>Fecha y Hora</th>
          <th>PAS</th>
          <th>PAD</th>
          <th>PULSO</th>
          <th>T° Ax.</th>
          <th>T° Rec.</th>
          <th>Sat O2.</th>
          <th>FR</th>
          <th>EVA</th>
          <th>OMV</th>
          <th>HGT</th>
          <th>Responsable</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in signosVitales" :key="i">
          <td>{{ fechaHora(item.fechaHora) }}</td>
          <td>{{ item.pas }}</td>
          <td>{{ item.pad }}</td>
          <td>{{ item.pulso }}</td>
          <td>{{ item.temperaturaAxilar }}</td>
          <td>{{ item.temperaturaRectal }}</td>
          <td>{{ item.saturacionOxigeno }}</td>
          <td>{{ item.frecuenciaRespiratoria }}</td>
          <td>{{ item.eva }}</td>
          <td>{{ item.omv }}</td>
          <td>{{ item.hgt }}</td>
          <td>{{ item.responsable.nombre }} ({{ item.responsable.cargo }})</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import fechaDDMMAAAA from '@/utils/fechaDDMMAAAA'
import obtenerHoraDesdeFecha from '@/utils/obtenerHoraDesdeFecha'

export default {
  name: 'SignosVitalesUrgencia',
  methods: {
    fechaHora (fechaHora) {
      return `${fechaDDMMAAAA(fechaHora)} ${obtenerHoraDesdeFecha(fechaHora)}`
    }
  },
  props: {
    signosVitales: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.tablaSignosVitales {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
  padding: 10px;
}

.tablaSignosVitales>thead>tr>th,
.tablaSignosVitales>tbody>tr>td {
  border: 1px solid #ccc;
  padding: 5px;
}

.tablaSignosVitales td {
  padding: 10px !important;
  font-size: 15px;
}

.contenedorTablaSignosVitales {
  overflow-x: auto;
  width: 100%;
}

.cargandoTabla{
  height: 75px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ccc;
}
</style>
