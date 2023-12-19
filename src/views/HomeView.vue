<template>
  <div>
    <v-row>
      <v-col>
        <h1>Inicio</h1>
      </v-col>
    </v-row>

    <v-row class="d-flex align-stretch">
      <v-col cols="12" md="6" xl="6" xs="12">
        <v-card color="secondary" dark>
          <v-card-text color="white">
            <div class="contenedor-card">
              <div class="titulo-card-inicio d-flex align-center justify-center">Pacientes en Urgencia</div>
              <div class="numero-card-inicio d-flex align-center justify-center"><v-icon
                  x-large left>mdi-account-settings</v-icon>10</div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" xl="6" xs="12">
        <v-card color="secondary" dark>
          <v-card-text color="white">
            <div class="contenedor-card">
              <div class="titulo-card-inicio d-flex align-center justify-center">Pacientes en Hospitalizados</div>
              <div class="numero-card-inicio d-flex align-center justify-center"><v-icon
                  x-large left>mdi-bed</v-icon>12</div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'HomeView',
  data () {
    return {
      info: null
    }
  },

  components: {
  },
  methods: {
    pruebaAxios () {
      axios.post('https://api.medsoft.cl/api/Agenda/obtenerAgenda').then(response => (this.info = response.data))
    }
  }
}
</script>
<style scoped>
.titulo-card-inicio {
  font-size: 2rem;
  font-weight: 500;
}

.numero-card-inicio {
  font-size: 5rem;
  font-weight: 500;
  margin-top: 2rem;
  color: white !important;
}

.contenedor-card{
  padding: 100px 0px;
}
</style>
