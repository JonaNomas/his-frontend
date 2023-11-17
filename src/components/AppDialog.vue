<template>
  <v-dialog width="250" v-model="dialog">
    <v-card>
      <v-toolbar flat dense dark color="primary">
        <v-toolbar-title>{{ title }}</v-toolbar-title>
      </v-toolbar>

      <!-- <v-card-title dark color="primary">{{ title }}</v-card-title> -->
      <v-card-text class="mt-2" v-html="content"></v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: Boolean,
    title: String,
    content: String,
  },
  computed: {
    dialog: {
      get() {
        return this.value;
      },
      set() {
        this.$emit("close", true);
      },
    },
  },
};
</script>
