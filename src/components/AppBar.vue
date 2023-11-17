<template>
  <v-app-bar app>
    <v-app-bar-nav-icon @click="$emit('toggle')"></v-app-bar-nav-icon>

    <v-toolbar-title>Vuetify Mockup</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-menu>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-on="on" v-bind="attrs">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item>
          <v-list-item-title>Menu one</v-list-item-title>
        </v-list-item>

        <v-list-item>
          <v-list-item-title>Menu two</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
  }),
}
</script>
