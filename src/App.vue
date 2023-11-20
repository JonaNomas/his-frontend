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

export default {
  name: 'App',

  data: () => ({
    //
  }),
  components: {
    HeaderNav,
    DrawerMenu,
    FooterGeneral
  }
}
</script>
