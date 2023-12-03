<template>
  <v-app-bar app color="primary" dark class="under-line" elevation="0">
    <div class="d-flex align-center">
      <v-img
        src="@/assets/medsoft2_x128.png"
        max-width="40"
        class="mr-3"></v-img>
      <v-toolbar-title class="font-weight-light titulo-aplicacion">MedSoft</v-toolbar-title>
    </div>

    <v-spacer></v-spacer>

    <v-btn text :to="{ name: 'ingresar' }" v-if="!$store.state.estaLoggeado">
      <v-icon left>mdi-account</v-icon> Ingresar
    </v-btn>
    <v-menu offset-y v-if="$store.state.estaLoggeado">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
          text
          class="ml-2"
        >
        <v-icon left>mdi-account</v-icon> {{ nombreUsuario }}
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
  },
  computed: {
    nombreUsuario () {
      const nombreNavBar = this.$store.state.usuario.nombre[0]
      const apellidoPaternoNavBar = this.$store.state.usuario.apellidoPaterno
      const apellidoMaternoNavBar = this.$store.state.usuario.apellidoMaterno[0]
      return nombreNavBar + '. ' + apellidoPaternoNavBar + ' ' + apellidoMaternoNavBar + '.'
    }
  }
}
</script>

<style scoped>
.titulo-aplicacion{
  letter-spacing: 0.2rem;
}
</style>
