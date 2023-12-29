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
          <v-expansion-panel v-for="(item, i) in listadoPendienteTriage" :key="i">
            <v-expansion-panel-header>
              <v-row>
                <v-col class="d-flex align-center">
                  <v-icon left>mdi-account</v-icon>
                  {{ item.nombre }}
                </v-col>

                <v-col class="d-flex align-center">
                  <v-icon left>mdi-alert-box</v-icon>
                  {{ item.queOcurre }} - {{ item.lugarAfectado }}
                </v-col>
                <v-col class="d-flex justify-end pr-5">
                  <v-btn small color="error" :to="`/urgencias/triage/${i}`">Atender</v-btn>
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
                          <td>{{ item.run }}</td>
                        </tr>
                        <tr>
                          <td class="negrita">Nombre Completo</td>
                          <td class="negrita">:</td>
                          <td>{{ item.nombre }}</td>
                        </tr>
                        <tr>
                          <td class="negrita">Previsión</td>
                          <td class="negrita">:</td>
                          <td>{{ item.prevision }}</td>
                        </tr>
                        <tr>
                          <td class="negrita">Sexo</td>
                          <td class="negrita">:</td>
                          <td>{{ item.sexo }}</td>
                        </tr>
                        <tr>
                          <td class="negrita">Fecha de Nacimiento</td>
                          <td class="negrita">:</td>
                          <td>{{ item.fechaNacimiento }}</td>
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
                <v-col cols="6" md="3" d-flex justify-start>{{ item.queOcurre }}</v-col>
                <v-divider vertical></v-divider>
                <v-col cols="6" md="3" class="font-weight-black">Lugar Afectado: </v-col>
                <v-col cols="6" md="3" d-flex justify-start>{{ item.lugarAfectado }}</v-col>
              </v-row>
              <v-divider class="mb-5"></v-divider>
              <v-row>
                <v-col class="font-weight-black">Descripción:</v-col>
              </v-row>
              <v-row>
                <v-col>{{ item.descripcion }}</v-col>
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
          <v-expansion-panel v-for="(item, i) in listadoTriageFinalizado" :key="i">
            <v-expansion-panel-header>
              <v-row>
                <v-col class="d-flex align-center">
                  <TriageCategorizacionEtiqueta :categoria="item.triage" class="mr-2" />
                  <v-icon left>mdi-account</v-icon>
                  {{ item.nombre }}
                </v-col>

                <v-col class="d-flex align-center">
                  <v-icon left>mdi-alert-box</v-icon>
                  {{ item.queOcurre }} - {{ item.lugarAfectado }}
                </v-col>
                <v-col class="d-flex justify-end pr-5">
                  <v-btn small color="success" :to="`/urgencias/triage/${i}`">Editar</v-btn>
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
                          <td>{{ item.run }}</td>
                        </tr>
                        <tr>
                          <td class="negrita">Nombre Completo</td>
                          <td class="negrita">:</td>
                          <td>{{ item.nombre }}</td>
                        </tr>
                        <tr>
                          <td class="negrita">Previsión</td>
                          <td class="negrita">:</td>
                          <td>{{ item.prevision }}</td>
                        </tr>
                        <tr>
                          <td class="negrita">Sexo</td>
                          <td class="negrita">:</td>
                          <td>{{ item.sexo }}</td>
                        </tr>
                        <tr>
                          <td class="negrita">Fecha de Nacimiento</td>
                          <td class="negrita">:</td>
                          <td>{{ item.fechaNacimiento }}</td>
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
                <v-col cols="6" md="3" d-flex justify-start>{{ item.queOcurre }}</v-col>
                <v-divider vertical></v-divider>
                <v-col cols="6" md="3" class="font-weight-black">Lugar Afectado: </v-col>
                <v-col cols="6" md="3" d-flex justify-start>{{ item.lugarAfectado }}</v-col>
              </v-row>
              <v-divider class="mb-5"></v-divider>
              <v-row>
                <v-col class="font-weight-black">Descripción:</v-col>
              </v-row>
              <v-row>
                <v-col>{{ item.descripcion }}</v-col>
              </v-row>
              <v-row>
                <v-col>
                  <h3 class="d-flex align-center"><v-icon left>mdi-triangle</v-icon>Triage</h3>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <TablaReducidaTriageValores />
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>

  </div>
</template>

<script>
import TriageCategorizacionEtiqueta from '@/components/urgencias/TriageCategorizacionEtiqueta.vue'
import TablaReducidaTriageValores from '@/components/urgencias/TablaReducidaTriageValores.vue'

export default {
  name: 'TriageAtencionUrgenciaVista',
  data () {
    return {
      listadoPendienteTriage: [
        // { triage: '', nombre: 'Victor Alexis Guzman Contreras', queOcurre: 'Corte', lugarAfectado: 'Cabeza', run: '19033183-0', prevision: 'Fonasa', sexo: 'Masculino', fechaNacimiento: '12/12/1990', descripcion: 'Refiere golpe en cabeza en domicilio lo que produjo un corte sangrante.', id: 1 },
        { triage: '', nombre: 'Roberto Maximiliano Diaz Soto', queOcurre: 'Dolor', lugarAfectado: 'Estomago', run: '19033183-0', prevision: 'Fonasa', sexo: 'Masculino', fechaNacimiento: '12/12/1990', descripcion: 'Refiere golpe en cabeza en domicilio lo que produjo un corte sangrante.', id: 1 }
      ],
      listadoTriageFinalizado: [
        { triage: 1, nombre: 'Victor Alexis Guzman Contreras', queOcurre: 'Corte', lugarAfectado: 'Cabeza', run: '19033183-0', prevision: 'Fonasa', sexo: 'Masculino', fechaNacimiento: '12/12/1990', descripcion: 'Refiere golpe en cabeza en domicilio lo que produjo un corte sangrante.', id: 1, pas: 120, pad: 80, pulso: 80, tAxilar: 36.5, tRectal: 36.5, saturacion: 98, fr: 16, eva: 5, omv: 15, hgt: 98 },
        { triage: 2, nombre: 'Laura Valentina Rojas Diaz', queOcurre: 'Corte', lugarAfectado: 'Cabeza', run: '19033183-0', prevision: 'Fonasa', sexo: 'Masculino', fechaNacimiento: '12/12/1990', descripcion: 'Refiere golpe en cabeza en domicilio lo que produjo un corte sangrante.', id: 1, pas: 120, pad: 80, pulso: 80, tAxilar: 36.5, tRectal: 36.5, saturacion: 98, fr: 16, eva: 5, omv: 15, hgt: 98 },
        { triage: 3, nombre: 'Juan Carlos Perez Muñoz', queOcurre: 'Corte', lugarAfectado: 'Cabeza', run: '19033183-0', prevision: 'Fonasa', sexo: 'Masculino', fechaNacimiento: '12/12/1990', descripcion: 'Refiere golpe en cabeza en domicilio lo que produjo un corte sangrante.', id: 1, pas: 120, pad: 80, pulso: 80, tAxilar: 36.5, tRectal: 36.5, saturacion: 98, fr: 16, eva: 5, omv: 15, hgt: 98 },
        { triage: 4, nombre: 'Carlos Luis Gomes Rodriguez', queOcurre: 'Corte', lugarAfectado: 'Cabeza', run: '19033183-0', prevision: 'Fonasa', sexo: 'Masculino', fechaNacimiento: '12/12/1990', descripcion: 'Refiere golpe en cabeza en domicilio lo que produjo un corte sangrante.', id: 1, pas: 120, pad: 80, pulso: 80, tAxilar: 36.5, tRectal: 36.5, saturacion: 98, fr: 16, eva: 5, omv: 15, hgt: 98 }
      ]
    }
  },
  methods: {},
  components: { TriageCategorizacionEtiqueta, TablaReducidaTriageValores }
}
</script>
