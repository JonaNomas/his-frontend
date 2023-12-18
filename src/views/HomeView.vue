<template>
  <div>
    <v-row>
      <v-col>
        <h1>Inicio</h1>
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
