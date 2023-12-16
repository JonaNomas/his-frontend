<template>
  <div>
    <h1>Atención Urgencia</h1>
    <v-row>
      <v-col md="4" sm="12">
        <v-row>
          <v-col>
            <h3>Pendientes de Atención</h3>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-card class="mb-2" v-for="(item, i) in 10" :key="i">
              <v-card-text>
                <v-row class="d-flex align-center">
                  <v-col lg="2">C4</v-col>
                  <v-col lg="7">Victor Alexis Guzman Contreras</v-col>
                  <v-col lg="3"><v-btn color="success" block><v-icon>mdi-magnify</v-icon></v-btn></v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>

      <v-divider vertical></v-divider>

      <v-col md="8" sm="12">
        <v-row>
          <v-col>
            <h3>En Atención</h3>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4" v-for="(item, i) in 10" :key="i">
            <v-card elevation="2">
              <v-card-title>
                <div class="text-center">Box {{ i + 1 }}</div>
              </v-card-title>
              <v-card-subtitle>
                Victor Guzman Contreras
              </v-card-subtitle>
              <v-card-text>
                Card Text
              </v-card-text>
              <v-card-actions>
                <v-btn color="red" :to="`/urgencias/atencion/${i}`" text block>
                  Ver Atención
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'AtencionAtencionUrgenciaVista',
  data () {
    return {}
  },
  methods: {}
}
</script>
