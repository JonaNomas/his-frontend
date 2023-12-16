<template>
  <div>
    <v-row>
      <v-col>
        <h1>Revisión Traige</h1>
        <p class="font-weight-light">ID Atención: {{ $route.params.id }}</p>
      </v-col>
      <v-col cols="3" sm="4" md="2">
        <v-btn block color="secondary" :to="`/urgencias/triage/`"><v-icon
            left>mdi-arrow-left</v-icon>Volver</v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <h3>Información del Paciente</h3>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-simple-table dense>
          <template v-slot:default>
            <tbody>
              <tr>
                <td class="negrita">Run</td>
                <td class="negrita">:</td>
                <td>12.345.678-9</td>
              </tr>
              <tr>
                <td class="negrita">Nombre Completo</td>
                <td class="negrita">:</td>
                <td>Maximiliano Maximiliano Sepulveda Sepulveda</td>
              </tr>
              <tr>
                <td class="negrita">Previsión</td>
                <td class="negrita">:</td>
                <td>Fonasa</td>
              </tr>
              <tr>
                <td class="negrita">Sexo</td>
                <td class="negrita">:</td>
                <td>Masculino</td>
              </tr>
              <tr>
                <td class="negrita">Fecha de Nacimiento</td>
                <td class="negrita">:</td>
                <td>12/12/1990</td>
              </tr>
              <tr>
                <td class="negrita">¿Que Ocurre?</td>
                <td class="negrita">:</td>
                <td>Dolor</td>
              </tr>
              <tr>
                <td class="negrita">Lugar Afectado</td>
                <td class="negrita">:</td>
                <td>Cabeza</td>
              </tr>
              <tr>
                <td class="negrita">Descripción Consulta</td>
                <td class="negrita">:</td>
                <td>Dolor en la cabeza que se intensifica durante el dia, presenta vomitos recurrentes.</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <h3>Control Signos Vitales</h3>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-text-field type="number" dense label="Presión Arterial Sistolica (PSA)" v-model="inputPas"
          prepend-inner-icon="mdi-arm-flex" outlined hide-details min="0"></v-text-field>
      </v-col>
      <v-col>
        <v-text-field type="number" dense label="Presión Arterial Diastolica (PAD)" v-model="inputPad"
          prepend-inner-icon="mdi-arm-flex" outlined hide-details min="0"></v-text-field>
      </v-col>
      <v-col>
        <v-text-field type="number" dense label="Pulso por Minuto" v-model="pulso" prepend-inner-icon="mdi-heart-pulse"
          outlined hide-details min="0"></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="6" md="3">
        <v-text-field type="number" dense label="Temperatura Axilar" v-model="temperaturaAxilar"
          prepend-inner-icon="mdi-thermometer" outlined hide-details min="0"></v-text-field>
      </v-col>
      <v-col cols="6" md="3">
        <v-text-field type="number" dense label="Temperatura Rectal" v-model="temperaturaRectal"
          prepend-inner-icon="mdi-thermometer" outlined hide-details min="0"></v-text-field>
      </v-col>
      <v-col cols="6" md="3">
        <v-text-field type="number" dense label="Saturación de O2" v-model="saturacionO2"
          prepend-inner-icon="mdi-approximately-equal" outlined hide-details max="100"></v-text-field>
      </v-col>
      <v-col cols="6" md="3">
        <v-text-field type="number" dense label="Frecuencia Respiratoria" v-model="frecuenciaRespiratoria"
          prepend-inner-icon="mdi-weather-windy" outlined hide-details min="0"></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-text-field type="number" dense label="Dolor (EVA)" v-model="dolorEva" prepend-inner-icon="mdi-alert-octagram"
          outlined hide-details min="0" max="10"></v-text-field>
      </v-col>
      <v-col>
        <v-text-field type="number" dense label="OMV (Glassgow)" v-model="omvGlassgow"
          prepend-inner-icon="mdi-brain" outlined hide-details min="0" max="15"></v-text-field>
      </v-col>
      <v-col>
        <v-text-field type="number" dense label="Hemoglucotest" v-model="hemoglucotest"
          prepend-inner-icon="mdi-diabetes" outlined hide-details></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <h3>Categorización Final Triage</h3>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-autocomplete dense label="Categorización Triage" v-model="selectCategorizacionTriage"
          prepend-inner-icon="mdi-bullhorn" outlined hide-details :items="datosSelectCategorizacionTriage"
          item-text="nombre" item-value="id"></v-autocomplete>
      </v-col>
    </v-row>

    <v-alert text v-model="alertaErrorModel" outlined dismissible type="error" class="mt-5">
      {{ mensajeError }}
    </v-alert>

    <v-row>
      <v-col>
        <v-btn block dense color="secondary" @click="guardarTriage"><v-icon left>mdi-content-save-all</v-icon>Guardar</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'InsertarTriageAtencionUrgenciaVista',
  data () {
    return {
      inputPas: '',
      inputPad: '',
      pulso: '',
      temperaturaAxilar: '',
      temperaturaRectal: '',
      saturacionO2: '',
      frecuenciaRespiratoria: '',
      dolorEva: '',
      omvGlassgow: '',
      hemoglucotest: '',
      selectCategorizacionTriage: '',
      datosSelectCategorizacionTriage: [
        { nombre: 'C1', id: 1 },
        { nombre: 'C2', id: 2 },
        { nombre: 'C3', id: 3 },
        { nombre: 'C4', id: 4 },
        { nombre: 'C5', id: 5 }
      ],
      // Error Alert
      alertaErrorModel: false,
      mensajeError: ''

    }
  },
  methods: {
    guardarTriage () {
      const triage = {
        inputPas: this.inputPas,
        inputPad: this.inputPad,
        pulso: this.pulso,
        temperaturaAxilar: this.temperaturaAxilar,
        temperaturaRectal: this.temperaturaRectal,
        saturacionO2: this.saturacionO2,
        frecuenciaRespiratoria: this.frecuenciaRespiratoria,
        dolorEva: this.dolorEva,
        omvGlassgow: this.omvGlassgow,
        hemoglucotest: this.hemoglucotest,
        selectCategorizacionTriage: this.selectCategorizacionTriage
      }
      console.log('Guardar Triage: ', triage)
    }
  }
}
</script>

<style scoped>
.negrita {
  font-weight: bold;
}
</style>
