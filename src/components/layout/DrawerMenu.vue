<template>
  <v-navigation-drawer app v-model="$store.state.layout.drawer.visible" v-if="$store.state.estaLoggeado" :mini-variant="$store.state.layout.drawer.mini"
    permanent>
    <!-- <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="text-h6">
          Titulo
        </v-list-item-title>
        <v-list-item-subtitle>
          {{layout}}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider> -->

    <v-list dense nav v-for="ruta in rutas" :key="ruta.tituloConjunto">
      <v-subheader v-show="!$store.state.layout.drawer.mini">{{ ruta.tituloConjunto }}</v-subheader>
      <v-list-item v-for="link in ruta.links" :key="link.titulo" link :to="{ name: link.ruta }" exact>
        <v-list-item-icon>
          <v-icon>{{ link.icono }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ link.titulo }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>

      <!-- <v-list-group :value="false" prepend-icon="mdi-account-circle">
        <template v-slot:activator>
          <v-list-item-title>Users</v-list-item-title>
        </template>

        <v-list-item link class="pl-7">
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Hola Mundo</v-list-item-title>
        </v-list-item>
      </v-list-group> -->

    </v-list>
    <v-row>
      <v-col>
        <v-list dense nav>
          <v-list-item link @click="$store.commit('invertirLayoutDrawerMini')">
            <v-list-item-icon>
              <v-icon>{{ $store.state.layout.drawer.mini ? 'mdi-arrow-collapse-right' :
                'mdi-arrow-collapse-left' }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ $store.state.layout.drawer.mini ? 'Expandir' : 'Contraer' }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>

  </v-navigation-drawer>
</template>

<script>

export default {
  name: 'DrawerMenu',
  data () {
    return {
      drawer: true,
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
      ]
    }
  }
}
</script>
