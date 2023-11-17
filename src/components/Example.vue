<template>
  <v-card class="pt-2">
    <v-img
      class="d-block mx-auto"
      width="125"
      src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-light.png"
    />

    <v-card-title class="justify-center">{{ title }}</v-card-title>

    <v-card-text class="pb-0">
      <p v-for="(p, i) in paragraphs" :key="i" v-html="p"></p>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn @click="clicked" color="primary">
        <v-icon class="mr-2">mdi-check</v-icon>Ok
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "ExampleExample",
  data: () => ({
    title: "Vuetify Example ",
    paragraphs: [
      `This is an example component using Vuetify <code>v-card</code> and icons from <a href="https://cdn.materialdesignicons.com/5.4.55">Material design icons</a>.`,
      `Use this template to create a mockup using Vuetify.`,
    ],
  }),
  methods: {
    clicked() {
      window.alert("Example button clicked.", "Example");
    },
  },
};
</script>
