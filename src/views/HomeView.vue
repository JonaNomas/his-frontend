<template>
  <div>
    <h1>Inicio</h1>
    <v-btn color="success" @click="pruebaAxios">text</v-btn>
    <p>{{ info }}</p>
    <h1>H1</h1>
    <h2>H2</h2>
    <h3>H3</h3>
    <h4>H4</h4>
    <h5>H5</h5>
    <h6>H6</h6>
    <br>
    <br>
    <v-btn class="ma-2" color="primary">Primario</v-btn>
    <v-btn class="ma-2" color="secondary">Secundario</v-btn>
    <v-btn class="ma-2" color="accent">Accent</v-btn>
    <v-btn class="ma-2" color="error">Error</v-btn>
    <v-btn class="ma-2" color="success">Éxito</v-btn>
    <v-btn class="ma-2" color="warning">Advertencia</v-btn>
    <br>
    <v-btn class="ma-2" color="primary"><v-icon left>mdi-account</v-icon>Primario</v-btn>
    <v-btn class="ma-2" color="secondary"><v-icon left>mdi-account</v-icon>Secundario</v-btn>
    <v-btn class="ma-2" color="accent"><v-icon left>mdi-account</v-icon>Accent</v-btn>
    <v-btn class="ma-2" color="error"><v-icon left>mdi-account</v-icon>Error</v-btn>
    <v-btn class="ma-2" color="success"><v-icon left>mdi-account</v-icon>Éxito</v-btn>
    <v-btn class="ma-2" color="warning"><v-icon left>mdi-account</v-icon>Advertencia</v-btn>
    <br>
    <br>
    <v-alert dismissible text type="success" width="300">Éxito</v-alert>
    <v-alert dismissible text type="error" width="300">Error</v-alert>
    <v-alert dismissible text type="warning" width="300">Advertencia</v-alert>

    <v-row justify="space-around">
      <v-col cols="auto">
        <v-dialog transition="dialog-bottom-transition" max-width="600">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" v-bind="attrs" v-on="on">From the bottom</v-btn>
          </template>
          <template v-slot:default="dialog">
            <v-card>
              <v-toolbar color="primary" dark>Opening from the bottom</v-toolbar>
              <v-card-text>
                <div class="text-h2 pa-12">Hello world!</div>
              </v-card-text>
              <v-card-actions class="justify-end">
                <v-btn text @click="dialog.value = false">Close</v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </v-col>

      <v-col cols="auto">
        <v-dialog transition="dialog-top-transition" max-width="600">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" v-bind="attrs" v-on="on">From the top</v-btn>
          </template>
          <template v-slot:default="dialog">
            <v-card>
              <v-toolbar color="primary" dark>Título</v-toolbar>
              <v-card-text>
                <div class="pa-12">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil dolore vero ipsam ea. Doloremque nisi quod incidunt ipsam unde nostrum!</div>
              </v-card-text>
              <v-card-actions class="justify-end">
                <v-btn text @click="dialog.value = false">Cerrar</v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
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
