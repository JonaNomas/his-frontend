<template>
  <div id="app">
    <v-app>
      <NavigationDrawer :value="drawer" @close="drawer = false" />

      <!-- v-app-bar -->
      <AppBar @toggle="drawer = !drawer" />

      <v-main>
        <v-container fluid>
          <!-- content here -->
          <Example />
          <CalendarioCitas />
        </v-container>
      </v-main>

      <!-- v-footer -->
      <AppFooter />

      <!-- v-dialog -->
      <AppDialog
        :value="showDialog"
        @close="showDialog = false"
        v-bind="{ ...dialog }"
      />
    </v-app>
  </div>
</template>

<script>
import AppBar from "./components/AppBar"
import AppDialog from "./components/AppDialog"
import AppFooter from "./components/AppFooter"
import Example from "./components/Example"
import NavigationDrawer from "./components/NavigationDrawer"
import CalendarioCitas from "./components/CalendarioCitas"

export default {
  name: "App",
  components: {
    AppBar,
    AppDialog,
    AppFooter,
    Example,
    NavigationDrawer,
    CalendarioCitas
  },
  data: () => ({
    drawer: true,
    dialog: {},
    showDialog: false,
  }),
  methods: {
    alert(content, title = "Informacion") {
      this.showDialog = true
      this.dialog = { content, title }
    },
  },
  mounted() {
    // Override default alert to display Vuetify dialog.
    // It is better to use vuex.
    window.alert = this.alert
  },
}
</script>
