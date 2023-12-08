<template>
  <div>
    <v-row class="d-flex justify-center">
      <v-col sm="12" lg="6">
        <div class="contenerdorTabla">
          <h2>Datos personales</h2>
          <v-simple-table dense>
            <template v-slot:default>
              <tbody>
                <tr>
                  <td class="negrita">Rut</td>
                  <td class="negrita">:</td>
                  <td>{{ pacienteEncontrado?.run ?? 'No Registra' }}</td>
                </tr>
                <tr>
                  <td class="negrita">ID Paciente</td>
                  <td class="negrita">:</td>
                  <td>{{ pacienteEncontrado?.idPaciente ?? 'No Registra' }}</td>
                </tr>
                <tr>
                  <td class="negrita">Primer Nombre</td>
                  <td class="negrita">:</td>
                  <td>{{ pacienteEncontrado?.nombrePrimer ?? 'No Registra' }}</td>
                </tr>
                <tr>
                  <td class="negrita">Segundo Nombre</td>
                  <td class="negrita">:</td>
                  <td>{{ pacienteEncontrado.nombreSegundo ?? 'No Registra' }}</td>
                </tr>
                <tr>
                  <td class="negrita">Apellido Paterno</td>
                  <td class="negrita">:</td>
                  <td>{{ pacienteEncontrado?.apellidoPaterno ?? 'No Registra' }}</td>
                </tr>
                <tr>
                  <td class="negrita">Apellido Materno</td>
                  <td class="negrita">:</td>
                  <td>{{ pacienteEncontrado?.apellidoMaterno ?? 'No Registra' }}</td>
                </tr>
                <tr>
                  <td class="negrita">Fecha Nacimiento</td>
                  <td class="negrita">:</td>
                  <td>{{ fechaDDMMAAAA(pacienteEncontrado?.fechaNacimiento) ?? 'No Registra' }}</td>
                </tr>
                <tr>
                  <td class="negrita">Sexo</td>
                  <td class="negrita">:</td>
                  <td>{{ pacienteEncontrado?.sexo ?? 'No Registra' }}</td>
                </tr>
                <tr>
                  <td class="negrita">Nombre Social</td>
                  <td class="negrita">:</td>
                  <td>{{ pacienteEncontrado?.nombreSocial ?? 'No Registra' }}</td>
                </tr>
                <tr>
                  <td class="negrita">Estado Civil</td>
                  <td class="negrita">:</td>
                  <td>{{ pacienteEncontrado?.estadoCivil ?? 'No Registra' }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </div>
      </v-col>
    </v-row>

    <v-row class="d-flex justify-center">
      <v-col sm="12" lg="6">
        <div class="contenerdorTabla">
          <h2>Datos de Salud</h2>
          <v-simple-table dense>
            <template v-slot:default>
              <tbody>
                <tr>
                  <td class="negrita">Grupo Sanguineo</td>
                  <td class="negrita">:</td>
                  <td>{{ pacienteEncontrado?.grupoSanguineo ?? 'No Registra' }}</td>
                </tr>
                <tr>
                  <td class="negrita">Donador</td>
                  <td class="negrita">:</td>
                  <td>{{ pacienteEncontrado?.donador ? 'Si': 'No' }}</td>
                </tr>
                <tr>
                  <td class="negrita">Previsión</td>
                  <td class="negrita">:</td>
                  <td>{{ pacienteEncontrado?.prevision ?? 'No Registra' }}</td>
                </tr>
                <tr>
                  <td class="negrita">Estado Salud</td>
                  <td class="negrita">:</td>
                  <td>Vivo</td>
                </tr>
                <tr>
                  <td class="negrita">Fecha Defunción</td>
                  <td class="negrita">:</td>
                  <td>Vivo</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </div>
      </v-col>
    </v-row>

    <v-row class="d-flex justify-center">
      <v-col sm="12" lg="6">
        <div class="contenerdorTabla">
          <h2>Contacto</h2>
          <v-simple-table dense>
            <template v-slot:default>
              <tbody>
                <tr>
                  <td class="negrita">Telefono</td>
                  <td class="negrita">:</td>
                  <td>{{ pacienteEncontrado?.telefono ?? 'No Registra' }}</td>
                </tr>
                <tr>
                  <td class="negrita">Direccion</td>
                  <td class="negrita">:</td>
                  <td>{{ pacienteEncontrado.direccion }}</td>
                </tr>
                <tr>
                  <td class="negrita">Correo Electronico</td>
                  <td class="negrita">:</td>
                  <td>{{ pacienteEncontrado.correo }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </div>
      </v-col>
    </v-row>

    <v-row class="d-flex justify-center">
      <v-col sm="12" lg="6">
        <div class="contenerdorTabla">
          <h2>Contacto Emergencia</h2>
          <v-simple-table dense>
            <template v-slot:default>
              <tbody>
                <tr>
                  <td class="negrita">Nombre Contacto Emergencia</td>
                  <td class="negrita">:</td>
                  <td>{{ pacienteEncontrado.contactoEmergencia ?? 'No Registra' }}</td>
                </tr>
                <tr>
                  <td class="negrita">Parentesco</td>
                  <td class="negrita">:</td>
                  <td>{{ pacienteEncontrado?.parentesco ?? 'No Registra' }}</td>
                </tr>
                <tr>
                  <td class="negrita">Telefono</td>
                  <td class="negrita">:</td>
                  <td>{{ pacienteEncontrado?.telefonoEmergencia ?? 'No registra' }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import fechaDDMMAAAA from '@/utils/fechaDDMMAAAA'

export default {
  name: 'TablaDatosIdentificacionPaciente',
  data () {
    return {
      //
    }
  },
  methods: {
    fechaDDMMAAAA
  },
  props: ['pacienteEncontrado']
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
