<template>
  <div>
    <h1 class="mb-5">Triage Atención Urgencia</h1>
    <v-row>
      <v-col>
        <h3 class="d-flex align-center"><v-icon left>mdi-account-clock</v-icon>Pendiente Triage</h3>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-expansion-panels>
          <v-expansion-panel v-for="(item, i) in 5" :key="i">
            <v-expansion-panel-header>
              <v-row>
                <v-col class="d-flex align-center">
                  <v-icon left>mdi-account</v-icon>
                  Maximiliano Maximiliano Sepulveda Sepulveda
                </v-col>

                <v-col class="d-flex align-center">
                  <v-icon left>mdi-alert-box</v-icon>
                  Perdida de Conocimiento - Cabezas
                </v-col>
                <v-col class="d-flex justify-end pr-5">
                  <v-btn small color="error" :to="`/atencionUrgencias/triage/${i}`">Atender</v-btn>
                </v-col>
              </v-row>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row>
                <v-col>
                  <h3 class="d-flex align-center"><v-icon left>mdi-card-account-details-outline</v-icon>Identificacion del
                    Paciente</h3>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-simple-table dense>
                    <template v-slot:default>
                      <tbody>
                        <tr>
                          <td class="negrita">Run</td>
                          <td class="negrita">:</td>
                          <td>12.345.678-9</td>
                        </tr>
                        <tr>
                          <td class="negrita">Nombre Completo</td>
                          <td class="negrita">:</td>
                          <td>Maximiliano Maximiliano Sepulveda Sepulveda</td>
                        </tr>
                        <tr>
                          <td class="negrita">Previsión</td>
                          <td class="negrita">:</td>
                          <td>Fonasa</td>
                        </tr>
                        <tr>
                          <td class="negrita">Sexo</td>
                          <td class="negrita">:</td>
                          <td>Masculino</td>
                        </tr>
                        <tr>
                          <td class="negrita">Fecha de Nacimiento</td>
                          <td class="negrita">:</td>
                          <td>12/12/1990</td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <h3 class="d-flex align-center"><v-icon left>mdi-alert-box</v-icon>Motivo Consulta</h3>
                </v-col>
              </v-row>

              <v-row class="mb-2">
                <v-col cols="6" md="3" class="font-weight-black">¿Que Ocurre?: </v-col>
                <v-col cols="6" md="3" d-flex justify-start> Perdida Conocimiento</v-col>
                <v-divider vertical></v-divider>
                <v-col cols="6" md="3" class="font-weight-black">Lugar Afectado: </v-col>
                <v-col cols="6" md="3" d-flex justify-start>Cabeza</v-col>
              </v-row>
              <v-divider class="mb-5"></v-divider>
              <v-row>
                <v-col class="font-weight-black">Descripción:</v-col>
              </v-row>
              <v-row>
                <v-col>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque deserunt architecto fuga harum
                  similique ratione odit dolore, a culpa ut eius, dolor est facilis debitis doloribus assumenda! Sint
                  ducimus perferendis expedita totam. Ad, mollitia, unde omnis eius recusandae beatae ratione corrupti
                  assumenda accusamus odit impedit maiores esse culpa corporis numquam!</v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <h3 class="d-flex align-center"><v-icon left>mdi-account-check</v-icon>Triage Finalizado</h3>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-expansion-panels>
          <v-expansion-panel v-for="(item, i) in 3" :key="i">
            <v-expansion-panel-header>
              <v-row>
                <v-col class="d-flex align-center">
                  <v-chip dense class="mr-3 font-weight-black text-center d-flex justify-center" dark color="red">C{{ i }}</v-chip>
                  <v-icon left>mdi-account</v-icon>
                  Maximiliano Maximiliano Sepulveda Sepulveda
                </v-col>

                <v-col class="d-flex align-center">
                  <v-icon left>mdi-alert-box</v-icon>
                  Perdida de Conocimiento - Cabezas
                </v-col>
                <v-col class="d-flex justify-end pr-5">
                  <v-btn small color="success" to="/">Editar</v-btn>
                </v-col>
              </v-row>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row>
                <v-col>
                  <h3 class="d-flex align-center"><v-icon left>mdi-card-account-details-outline</v-icon>Identificacion del
                    Paciente</h3>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-simple-table dense>
                    <template v-slot:default>
                      <tbody>
                        <tr>
                          <td class="negrita">Run</td>
                          <td class="negrita">:</td>
                          <td>12.345.678-9</td>
                        </tr>
                        <tr>
                          <td class="negrita">Nombre Completo</td>
                          <td class="negrita">:</td>
                          <td>Maximiliano Maximiliano Sepulveda Sepulveda</td>
                        </tr>
                        <tr>
                          <td class="negrita">Previsión</td>
                          <td class="negrita">:</td>
                          <td>Fonasa</td>
                        </tr>
                        <tr>
                          <td class="negrita">Sexo</td>
                          <td class="negrita">:</td>
                          <td>Masculino</td>
                        </tr>
                        <tr>
                          <td class="negrita">Fecha de Nacimiento</td>
                          <td class="negrita">:</td>
                          <td>12/12/1990</td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <h3 class="d-flex align-center"><v-icon left>mdi-alert-box</v-icon>Motivo Consulta</h3>
                </v-col>
              </v-row>

              <v-row class="mb-2">
                <v-col cols="6" md="3" class="font-weight-black">¿Que Ocurre?: </v-col>
                <v-col cols="6" md="3" d-flex justify-start> Perdida Conocimiento</v-col>
                <v-divider vertical></v-divider>
                <v-col cols="6" md="3" class="font-weight-black">Lugar Afectado: </v-col>
                <v-col cols="6" md="3" d-flex justify-start>Cabeza</v-col>
              </v-row>
              <v-divider class="mb-5"></v-divider>
              <v-row>
                <v-col class="font-weight-black">Descripción:</v-col>
              </v-row>
              <v-row>
                <v-col>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque deserunt architecto fuga harum
                  similique ratione odit dolore, a culpa ut eius, dolor est facilis debitis doloribus assumenda! Sint
                  ducimus perferendis expedita totam. Ad, mollitia, unde omnis eius recusandae beatae ratione corrupti
                  assumenda accusamus odit impedit maiores esse culpa corporis numquam!</v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>

  </div>
</template>

<script>
export default {
  name: 'TriageAtencionUrgenciaVista',
  data () {
    return {}
  },
  methods: {}
}
</script>
