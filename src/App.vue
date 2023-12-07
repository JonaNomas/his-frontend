<template>
  <v-app>
    <DrawerMenu />
    <HeaderNav />
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
    <FooterGeneral />
  </v-app>
</template>

<script>

import HeaderNav from './components/layout/HeaderNav.vue'
import DrawerMenu from './components/layout/DrawerMenu.vue'
import FooterGeneral from './components/layout/FooterGeneral.vue'
import decodificarJWT from './utils/decodificarJWT'

export default {
  name: 'App',

  data: () => ({
    //
  }),
  beforeCreate () {
    // TODO: Falta ver si el token es valido
    if (!this.$store.state.estaLoggeado) {
      const token = sessionStorage.getItem('token')
      console.log(token)
      if (token) {
        const usuario = decodificarJWT(token)
        console.log(usuario)
        this.$store.commit('setUsuario', usuario)
        this.$store.commit('setEstaLoggeado', true)
      } else {
        this.$router.push({ path: '/ingresar' })
      }
    }
  },
  components: {
    HeaderNav,
    DrawerMenu,
    FooterGeneral
  }
}
</script>
