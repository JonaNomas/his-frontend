<template>
  <div class="contenedorTablaTriage">
    <table class="tablaReducidaTriageValores" v-if="!estaCargandoLaTabla">
      <thead>
        <tr>
          <th>Cat.</th>
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
          <th>HORA</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <TriageCategorizacionEtiqueta :categoria="datos.categoria" />
          </td>
          <td>{{ datos.pas ?? '-' }}</td>
          <td>{{ datos.pad ?? '-' }}</td>
          <td>{{ datos.pulso ?? '-' }}</td>
          <td>{{ datos.temperaturaAxilar ?? '-' }}</td>
          <td>{{ datos.temperaturaRectal ?? '-' }}</td>
          <td>{{ datos.saturacionOxigeno ?? '-' }}</td>
          <td>{{ datos.frecuenciaRespiratoria ?? '-' }}</td>
          <td>{{ datos.escalaVisualAnaloga ?? '-' }}</td>
          <td>{{ datos.omv ?? '-' }}</td>
          <td>{{ datos.hgt ?? '-' }}</td>
          <td>{{ datos.hgt ?? '-' }}</td>
        </tr>
      </tbody>
    </table>
    <div class="cargandoTabla" v-if="estaCargandoLaTabla">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
  </div>
</template>

<script>
import TriageCategorizacionEtiqueta from '@/components/urgencias/TriageCategorizacionEtiqueta.vue'

export default {
  name: 'TablaReducidaTriageValores',
  data () {
    return {
      attrs: {
        tile: true,
        loading: true,
        height: 75,
        type: 'image'
      },
      datos: {},
      estaCargandoLaTabla: false
    }
  },
  components: {
    TriageCategorizacionEtiqueta
  },
  methods: {
    cargarDatosTriageDeLaAtencionDeUrengias () {
      this.estaCargandoLaTabla = true
      // Peticion a la API
      this.datos = {
        id: 1,
        idConsultaUrgencia: 300,
        pas: 120,
        pad: 80,
        pulso: 80,
        temperaturaAxilar: 36.5,
        temperaturaRectal: 36.5,
        saturacionOxigeno: 98,
        frecuenciaRespiratoria: 16,
        escalaVisualAnaloga: 5,
        omv: 0,
        hgt: 120,
        categoria: '1',
        hora: '12:00'
      }

      this.estaCargandoLaTabla = false
    }
  },
  mounted () {
    this.cargarDatosTriageDeLaAtencionDeUrengias()
  },
  props: {
    idConsultaUrgencia: {
      required: true
    }
  }
}
</script>

<style scoped>
.tablaReducidaTriageValores {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
  padding: 10px;
}

.tablaReducidaTriageValores>thead>tr>th,
.tablaReducidaTriageValores>tbody>tr>td {
  border: 1px solid #ccc;
  padding: 5px;
}

.tablaReducidaTriageValores td {
  padding: 10px !important;
  font-size: 15px;
}

.contenedorTablaTriage {
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
