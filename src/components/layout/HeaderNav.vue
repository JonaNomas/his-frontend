<template>
  <v-app-bar app color="primary" dark class="under-line" elevation="0">
    <div class="d-flex align-center">
      <v-toolbar-title>HisNeitor</v-toolbar-title>
    </div>

    <v-spacer></v-spacer>

    <v-btn text :to="{ name: 'usuario' }">
      <v-icon left>mdi-account</v-icon> Ingresar
    </v-btn>
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
          text
          class="ml-2"
        >
        <v-icon left>mdi-account</v-icon> J. Perez S.
        </v-btn>
      </template>
      <v-list dense>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          :to="{ name: item.ruta }" exact
        >
          <v-list-item-title><v-icon left>{{ item.icono }}</v-icon>{{ item.titulo }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
  name: 'HeaderNav',
  data () {
    return {
      items: [
        { titulo: 'Inicio', icono: 'mdi-home', ruta: 'home' },
        { titulo: 'Agendamiento Horas', icono: 'mdi-calendar-month', ruta: 'agendamientoHoras' },
        { titulo: 'About', icono: 'mdi-help-box', ruta: 'about' },
        { titulo: 'Cerrar Sesión', icono: 'mdi-exit-to-app', ruta: 'home' }
      ]
    }
  }
}
</script>

<style scoped>
.under-line {
  border-bottom: 1px solid rgba(0,0,0,.12) !important;
}
</style>
