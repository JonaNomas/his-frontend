<template>
  <v-navigation-drawer app v-model="$store.state.layout.drawer.visible" v-if="$store.state.estaLoggeado && $store.state.layout.drawer.visible"
    :mini-variant="$store.state.layout.drawer.mini" permanent>
    <v-list dense nav>
      <v-list-item to="/" exact>
        <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Inicio</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item to="/atencionesMedicas/agendamiento" exact>
        <v-list-item-icon>
          <v-icon>mdi-calendar-multiselect</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Agendamiento Horas</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item to="/listadoCitados" exact>
        <v-list-item-icon>
          <v-icon>mdi-view-list</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Listar Citados</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>

    <v-list dense nav v-for="ruta in rutas" :key="ruta.tituloConjunto">
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
          <v-list-item-title>{{ ruta.nombreConjunto }}</v-list-item-title>
        </template>

        <v-list-item link v-for="link in ruta.links" :key="link.titulo"
          :class="$store.state.layout.drawer.mini ? '' : 'pl-7'" :to="{ path: link.ruta }" exact>
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
          nombreConjunto: 'Historia Clinica',
          icono: 'mdi-account-group',
          links: [
            { titulo: 'Buscar Paciente', icono: 'mdi-text-box-search-outline', ruta: '/paciente/buscar' },
            { titulo: 'Nuevo Paciente', icono: 'mdi-account-plus-outline', ruta: '/paciente/nuevo' }
          ]
        },
        {
          nombreConjunto: 'Atención Urgencia',
          icono: 'mdi-heart-pulse',
          links: [
            { titulo: 'Ingreso', icono: 'mdi-account-plus', ruta: '/urgencias/ingreso' },
            { titulo: 'Triage', icono: 'mdi-numeric', ruta: '/urgencias/triage' },
            { titulo: 'Atención', icono: 'mdi-doctor', ruta: '/urgencias/atencion' },
            { titulo: 'Alta', icono: 'mdi-account-minus', ruta: '/urgencias/alta' }
          ]
        },
        {
          nombreConjunto: 'Hospitalización',
          icono: 'mdi-hospital-building',
          links: [
            { titulo: 'Ingreso', icono: 'mdi-account-plus', ruta: '/hospitalizacion/ingreso' },
            { titulo: 'Atención Enfermeria', icono: 'mdi-pill', ruta: '/hospitalizacion/atencionEnfermeria' },
            { titulo: 'Atención Medica', icono: 'mdi-doctor', ruta: '/hospitalizacion/atencionMedica' },
            { titulo: 'Alta', icono: 'mdi-account-minus', ruta: '/hospitalizacion/alta' },
            { titulo: 'Gestión Camas', icono: 'mdi-bed', ruta: '/hospitalizacion/gestionCamas' }

          ]
        },
        {
          nombreConjunto: 'Centro Quirúrgico',
          icono: 'mdi-box-cutter',
          links: [
            { titulo: 'Ingreso', icono: 'mdi-account-plus', ruta: '/cirugia/ingreso' },
            { titulo: 'Gestion Pabellones', icono: 'mdi-bed', ruta: '/cirugia/gestionPabellones' },
            { titulo: 'Registro Cirugía', icono: 'mdi-file-document', ruta: '/cirugia/registro' },
            { titulo: 'Alta', icono: 'mdi-account-minus', ruta: '/cirugia/alta' }
          ]
        },
        {
          nombreConjunto: 'Policlínico',
          icono: 'mdi-stethoscope',
          links: [
            { titulo: 'Atención Medica', icono: 'mdi-stethoscope', ruta: '/atencionesMedicas/atencion' }
          ]
        },
        {
          nombreConjunto: 'Imagenología',
          icono: 'mdi-radiology-box',
          links: [
            { titulo: 'Cargar Examen', icono: 'mdi-radiology-box', ruta: '/imagenologia/cargarExamen' },
            { titulo: 'Mantenedor', icono: 'mdi-radiology-box', ruta: 'imagenologia' }
          ]
        },
        {
          nombreConjunto: 'Laboratorio',
          icono: 'mdi-test-tube',
          links: [
            { titulo: 'Buscar Exámenes', icono: 'mdi-test-tube', ruta: '/laboratorio/buscar' },
            { titulo: 'Cargar Examen', icono: 'mdi-test-tube', ruta: '/laboratorio/cargarExamen' },
            { titulo: 'Mantenedor', icono: 'mdi-test-tube', ruta: '/laboratorio/mantenedor' }
          ]
        },
        {
          nombreConjunto: 'Banco de Sangre',
          icono: 'mdi-blood-bag',
          links: [
            { titulo: 'Ingreso', icono: 'mdi-blood-bag', ruta: 'bancoSangre' },
            { titulo: 'Registrar Donación', icono: 'mdi-blood-bag', ruta: '/bancoSangre/donacion' }
          ]
        }
      ]
    }
  }
}
</script>
