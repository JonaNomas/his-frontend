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
                  <td>19033183-0</td>
                </tr>
                <tr>
                  <td class="negrita">ID Paciente</td>
                  <td class="negrita">:</td>
                  <td>19033183-0</td>
                </tr>
                <tr>
                  <td class="negrita">Primer Nombre</td>
                  <td class="negrita">:</td>
                  <td>Victor</td>
                </tr>
                <tr>
                  <td class="negrita">Segundo Nombre</td>
                  <td class="negrita">:</td>
                  <td>Alexis</td>
                </tr>
                <tr>
                  <td class="negrita">Apellido Paterno</td>
                  <td class="negrita">:</td>
                  <td>Guzman</td>
                </tr>
                <tr>
                  <td class="negrita">Apellido Materno</td>
                  <td class="negrita">:</td>
                  <td>Contreras</td>
                </tr>
                <tr>
                  <td class="negrita">Fecha Nacimiento</td>
                  <td class="negrita">:</td>
                  <td>06-02-2023</td>
                </tr>
                <tr>
                  <td class="negrita">Sexo</td>
                  <td class="negrita">:</td>
                  <td>Masculino</td>
                </tr>
                <tr>
                  <td class="negrita">Nombre Social</td>
                  <td class="negrita">:</td>
                  <td>El</td>
                </tr>
                <tr>
                  <td class="negrita">Estado Civil</td>
                  <td class="negrita">:</td>
                  <td>Soltero</td>
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
                  <td>A+</td>
                </tr>
                <tr>
                  <td class="negrita">Donador</td>
                  <td class="negrita">:</td>
                  <td>No</td>
                </tr>
                <tr>
                  <td class="negrita">Prevision</td>
                  <td class="negrita">:</td>
                  <td>Fonasa A</td>
                </tr>
                <tr>
                  <td class="negrita">Estado Salud</td>
                  <td class="negrita">:</td>
                  <td>Vivo</td>
                </tr>
                <tr>
                  <td class="negrita">Fecha Defuncion</td>
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
                  <td>992143287</td>
                </tr>
                <tr>
                  <td class="negrita">Direccion</td>
                  <td class="negrita">:</td>
                  <td>Pasaje Los Magnolios #0688</td>
                </tr>
                <tr>
                  <td class="negrita">Correo Electronico</td>
                  <td class="negrita">:</td>
                  <td>vguzmanc@medsoft.cl</td>
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
                  <td>Brisa Cecilia Contreras Ramirez</td>
                </tr>
                <tr>
                  <td class="negrita">Parentesco</td>
                  <td class="negrita">:</td>
                  <td>Madre</td>
                </tr>
                <tr>
                  <td class="negrita">Telefono</td>
                  <td class="negrita">:</td>
                  <td>552144547</td>
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
export default {
  name: 'TablaDatosIdentificacionPaciente',
  data () {
    return {

      //
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
