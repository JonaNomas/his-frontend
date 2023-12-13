<template>
  <div class="contenerdorTabla">
    <h3 class="d-flex align-center mb-2"><v-icon left>mdi-account</v-icon>Datos del Paciente</h3>
    <v-simple-table dense>
      <template v-slot:default>
        <tbody>
          <tr>
            <td class="negrita">Run</td>
            <td class="negrita">:</td>
            <td>{{ pacienteEncontrado.run ?? 'No Registra' }}</td>
          </tr>
          <tr>
            <td class="negrita">ID Paciente</td>
            <td class="negrita">:</td>
            <td>{{ pacienteEncontrado.idPaciente ?? 'No Registra' }}</td>
          </tr>
          <tr>
            <td class="negrita">Apellido Paterno</td>
            <td class="negrita">:</td>
            <td>{{ pacienteEncontrado.apellidoPaterno ?? 'No Registra' }}</td>
          </tr>
          <tr>
            <td class="negrita">Apellido Materno</td>
            <td class="negrita">:</td>
            <td>{{ pacienteEncontrado.apellidoMaterno ?? 'No Registra' }}</td>
          </tr>
          <tr>
            <td class="negrita">Primer Nombre</td>
            <td class="negrita">:</td>
            <td>{{ pacienteEncontrado.nombrePrimer ?? 'No Registra' }}</td>
          </tr>
          <tr>
            <td class="negrita">Segundo Nombre</td>
            <td class="negrita">:</td>
            <td>{{ pacienteEncontrado.nombreSegundo ?? 'No Registra' }}</td>
          </tr>
          <tr>
            <td class="negrita">Edad</td>
            <td class="negrita">:</td>
            <td>{{ calcularEdad(pacienteEncontrado.fechaNacimiento) + ' Años' }}</td>
          </tr>
          <tr>
            <td class="negrita">Previsión</td>
            <td class="negrita">:</td>
            <td>{{ pacienteEncontrado.prevision ?? 'No Registra' }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>
<script>
import calcularEdad from '@/utils/calcularEdad'

export default {
  name: 'TablaDatosSimplePaciente',
  props: {
    pacienteEncontrado: {
      type: Object,
      required: true
    }
  },
  methods: {
    calcularEdad,
    fechaDDMMAAAA (fecha) {
      if (fecha) {
        const fechaSplit = fecha.split('-')
        return `${fechaSplit[2]}/${fechaSplit[1]}/${fechaSplit[0]}`
      }
      return ''
    }
  }
}
</script>

<style scoped>
.negrita {
  font-weight: bold;
}

.contenerdorTabla {
  border: thin solid rgba(0, 0, 0, 0.12);
  border-radius: 5px;
  padding: 20px;
}
</style>
