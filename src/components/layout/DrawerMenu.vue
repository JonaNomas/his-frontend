<template>
  <v-navigation-drawer app v-model="drawer" permanent>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="text-h6">
          Application
        </v-list-item-title>
        <v-list-item-subtitle>
          subtext
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense nav v-for="ruta in rutas" :key="ruta.tituloConjunto">
      <v-subheader>{{ ruta.tituloConjunto }}</v-subheader>
      <v-list-item v-for="link in ruta.links" :key="link.titulo" link :to="{ name: link.ruta }" exact>
        <v-list-item-icon>
          <v-icon>{{ link.icono }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ link.titulo }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
    </v-list>

  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'DrawerMenu',
  data () {
    return {
      rutas: [
        {
          tituloConjunto: 'General',
          links: [
            { titulo: 'Inicio', icono: 'mdi-home', ruta: 'home' },
            { titulo: 'Buscar Paciente', icono: 'mdi-text-box-search-outline', ruta: 'buscarPaciente' },
            { titulo: 'Ingresar Nuevo Paciente', icono: 'mdi-account-plus-outline', ruta: 'nuevoPaciente' }
          ]
        },
        {
          tituloConjunto: 'Generar Atención',
          links: [
            { titulo: 'Atencion Urgencia', icono: 'mdi-heart-pulse', ruta: 'atencionUrgencias' },
            { titulo: 'Hospitalizacion', icono: 'mdi-hospital-building', ruta: 'hospitalizacion' },
            { titulo: 'Cirugia', icono: 'mdi-box-cutter', ruta: 'cirugia' },
            { titulo: 'Atenciones Medicas', icono: 'mdi-stethoscope', ruta: 'atencionesMedicas' },
            { titulo: 'Agendamiento Horas', icono: 'mdi-calendar-multiselect', ruta: 'agendamientoHoras' }
          ]
        },
        {
          tituloConjunto: 'Cargar Examen',
          links: [
            { titulo: 'Imagenologia', icono: 'mdi-radiology-box', ruta: 'imagenologia' },
            { titulo: 'Laboratorio', icono: 'mdi-test-tube', ruta: 'laboratorio' },
            { titulo: 'Banco de Sangre', icono: 'mdi-blood-bag', ruta: 'bancoSangre' }
          ]
        }
      ],
      right: true
    }
  },
  props: {
    value: Boolean
  },
  computed: {
    drawer: {
      get () {
        return this.value
      },
      set (value) {
        if (!value) this.$emit('close', true)
      }
    }
  }
}
</script>
