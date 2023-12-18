<template>
  <div class="contenedorTablaRiesgosUrgencia">
    <table class="tablaRiesgosUrgencia">
      <thead>
        <tr>
          <th>Fecha y Hora</th>
          <th>IRI</th>
          <th>UPP</th>
          <th>Caidas</th>
          <th>Responsable</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ riesgos?.fechaHora ? fechaHora(riesgos?.fechaHora) : '' }}</td>
          <td>{{ riesgos?.iri }}</td>
          <td>{{ riesgos?.upp }}</td>
          <td>{{ riesgos?.caidas }}</td>
          <td>{{ riesgos?.responsable.nombre }} ({{ riesgos?.responsable.cargo }})</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import fechaDDMMAAAA from '@/utils/fechaDDMMAAAA'
import obtenerHoraDesdeFecha from '@/utils/obtenerHoraDesdeFecha'

export default {
  name: 'RiesgosUrgencia',
  methods: {
    fechaHora (fechaHora) {
      return `${fechaDDMMAAAA(fechaHora)} ${obtenerHoraDesdeFecha(fechaHora)}`
    }
  },
  props: {
    riesgos: {
      required: true
    }
  }
}
</script>

<style scoped>
.tablaRiesgosUrgencia {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
  padding: 10px;
}

.tablaRiesgosUrgencia>thead>tr>th,
.tablaRiesgosUrgencia>tbody>tr>td {
  border: 1px solid #ccc;
  padding: 5px;
}

.tablaRiesgosUrgencia td {
  padding: 10px !important;
  font-size: 15px;
}

.contenedorTablaRiesgosUrgencia {
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
