<template>
  <v-navigation-drawer app v-model="$store.state.layout.drawer.visible" v-if="$store.state.estaLoggeado" :mini-variant="$store.state.layout.drawer.mini"
    permanent>

    <v-list dense nav v-for="ruta in rutas2" :key="ruta.tituloConjunto">
      <!-- <v-subheader v-show="!$store.state.layout.drawer.mini">{{ ruta.tituloConjunto }}</v-subheader>
      <v-list-item v-for="link in ruta.links" :key="link.titulo" link :to="{ name: link.ruta }" exact>
        <v-list-item-icon>
          <v-icon>{{ link.icono }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ link.titulo }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider> -->

      <v-list-group :value="false" :prepend-icon="ruta.icono">
        <template v-slot:activator>
          <v-list-item-title>{{ruta.nombreConjunto}}</v-list-item-title>
        </template>

        <v-list-item link v-for="link in ruta.links" :key="link.titulo" :class="$store.state.layout.drawer.mini ? '':'pl-7'" :to="{ name: link.ruta }" exact>
          <v-list-item-icon>
            <v-icon>{{ link.icono }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ link.titulo }}</v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>
      </v-list-group>

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
      ],
      rutas2: [
        {
          nombreConjunto: 'Historia Clinica',
          icono: 'mdi-account-group',
          links: [
            { titulo: 'Buscar Paciente', icono: 'mdi-text-box-search-outline', ruta: 'buscarPaciente' },
            { titulo: 'Nuevo Paciente', icono: 'mdi-account-plus-outline', ruta: 'nuevoPaciente' }
          ]
        },
        {
          nombreConjunto: 'Atención Urgencia',
          icono: 'mdi-heart-pulse',
          links: [
            { titulo: 'Ingreso', icono: 'mdi-account-plus-outline', ruta: 'atencionUrgencias' },
            { titulo: 'Triage', icono: 'mdi-account-plus-outline', ruta: 'atencionUrgencias' },
            { titulo: 'Atención', icono: 'mdi-account-plus-outline', ruta: 'atencionUrgencias' },
            { titulo: 'Alta', icono: 'mdi-account-plus-outline', ruta: 'atencionUrgencias' }
          ]
        },
        {
          nombreConjunto: 'Hospitalización',
          icono: 'mdi-hospital-building',
          links: [
            { titulo: 'Ingreso', icono: 'mdi-hospital-building', ruta: 'hospitalizacion' },
            { titulo: 'Atención Enfermeria', icono: 'mdi-hospital-building', ruta: 'hospitalizacion' },
            { titulo: 'Atención Medica', icono: 'mdi-hospital-building', ruta: 'hospitalizacion' },
            { titulo: 'Alta', icono: 'mdi-hospital-building', ruta: 'hospitalizacion' },
            { titulo: 'Gestión Camas', icono: 'mdi-hospital-building', ruta: 'hospitalizacion' },
            { titulo: 'Agendamiento', icono: 'mdi-hospital-building', ruta: 'hospitalizacion' }

          ]
        },
        {
          nombreConjunto: 'Cirugía',
          icono: 'mdi-box-cutter',
          links: [
            { titulo: 'Ingreso', icono: 'mdi-box-cutter', ruta: 'cirugia' },
            { titulo: 'Agendamiento', icono: 'mdi-box-cutter', ruta: 'cirugia' },
            { titulo: 'Gestion Pabellones', icono: 'mdi-box-cutter', ruta: 'cirugia' },
            { titulo: 'Registro Cirugía', icono: 'mdi-box-cutter', ruta: 'cirugia' },
            { titulo: 'Alta', icono: 'mdi-box-cutter', ruta: 'cirugia' }
          ]
        },
        {
          nombreConjunto: 'Atenciones Medicas',
          icono: 'mdi-stethoscope',
          links: [
            { titulo: 'Agendamiento Horas', icono: 'mdi-stethoscope', ruta: 'agendamientoHoras' },
            { titulo: 'Citados por Día', icono: 'mdi-stethoscope', ruta: 'agendamientoHoras' },
            { titulo: 'Atención Medica', icono: 'mdi-stethoscope', ruta: 'agendamientoHoras' }
          ]
        },
        {
          nombreConjunto: 'Imagenología',
          icono: 'mdi-radiology-box',
          links: [
            { titulo: 'Agendamiento', icono: 'mdi-radiology-box', ruta: 'imagenologia' },
            { titulo: 'Cargar Examen', icono: 'mdi-radiology-box', ruta: 'imagenologia' },
            { titulo: 'Listar Citados', icono: 'mdi-radiology-box', ruta: 'imagenologia' },
            { titulo: 'Mantenedor', icono: 'mdi-radiology-box', ruta: 'imagenologia' }
          ]
        },
        {
          nombreConjunto: 'Laboratorio',
          icono: 'mdi-test-tube',
          links: [
            { titulo: 'Agendamiento', icono: 'mdi-test-tube', ruta: 'laboratorio' },
            { titulo: 'Mantenedor', icono: 'mdi-test-tube', ruta: 'laboratorio' },
            { titulo: 'Listar Citados', icono: 'mdi-test-tube', ruta: 'laboratorio' },
            { titulo: 'Ingresar Examen', icono: 'mdi-test-tube', ruta: 'laboratorio' }
          ]
        },
        {
          nombreConjunto: 'Banco de Sangre',
          icono: 'mdi-blood-bag',
          links: [
            { titulo: 'Agendamiento', icono: 'mdi-blood-bag', ruta: 'bancoSangre' },
            { titulo: 'Ingreso', icono: 'mdi-blood-bag', ruta: 'bancoSangre' },
            { titulo: 'Listar Citados', icono: 'mdi-blood-bag', ruta: 'bancoSangre' },
            { titulo: 'Registrar Donación', icono: 'mdi-blood-bag', ruta: 'bancoSangre' }
          ]
        }
      ]
    }
  }
}
</script>
