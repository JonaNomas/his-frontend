<template>
  <v-app-bar app color="primary" dark class="under-line" elevation="0">
    <v-app-bar-nav-icon @click="$store.commit('invertirLayoutDrawerVisible')"></v-app-bar-nav-icon>
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
          :to="{ path: item.ruta }" exact
        >
          <v-list-item-title><v-icon left>{{ item.icono }}</v-icon>{{ item.titulo }}</v-list-item-title>
        </v-list-item>

        <v-list-item link>
          <v-list-item-title @click="$store.commit('cerrarSesion')"><v-icon left>mdi-exit-to-app</v-icon>Cerrar Sesión</v-list-item-title>
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
        { titulo: 'Inicio', icono: 'mdi-home', ruta: '/' },
        { titulo: 'Cambiar Contraseña', icono: 'mdi-form-textbox-password', ruta: '/usuario/cambiar/contrasena' },
        { titulo: 'Agregar Funcionario', icono: 'mdi-account-plus', ruta: '/usuario/funcionarios/nuevo' }
      ]
    }
  },
  methods: {
    abrirMenu () {
      this.$store.state.layout.drawer.mini = !this.$store.state.layout.drawer.mini
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
