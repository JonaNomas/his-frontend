<template>
  <div>
    <v-row class="fill-height">
      <v-col class="d-flex justify-center mt-15">
        <v-card max-width="500" width="500" elevation="5">
          <v-toolbar color="primary" dark dense>
            <v-toolbar-title><v-icon left>mdi-account</v-icon> Login</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field label="RUN" prepend-icon="mdi-account"></v-text-field>
              <v-text-field label="Contraseña" prepend-icon="mdi-key-variant" type="password"></v-text-field>
              <v-btn type="submit" class="mt-3" block color="success">Ingresar</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      valid: false
    }
  }
}
</script>
