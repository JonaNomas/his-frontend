import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/agendamientoHoras',
    name: 'agendamientoHoras',
    component: () => import(/* webpackChunkName: "about" */ '../views/AgendamientoHorasVista.vue')
  },
  {
    path: '/ingresar',
    name: 'ingresar',
    component: () => import(/* webpackChunkName: "about" */ '../views/IngresarVista.vue')
  },
  {
    path: '/usuario',
    name: 'usuario',
    component: () => import(/* webpackChunkName: "about" */ '../views/UsuarioVista.vue')
  },
  {
    path: '/buscarPaciente',
    name: 'buscarPaciente',
    component: () => import(/* webpackChunkName: "about" */ '../views/BuscarPacienteVista.vue')
  },
  {
    path: '/nuevoPaciente',
    name: 'nuevoPaciente',
    component: () => import(/* webpackChunkName: "about" */ '../views/IngresarNuevoPaciente.vue')
  },
  {
    path: '/atencionUrgencias',
    name: 'atencionUrgencias',
    component: () => import(/* webpackChunkName: "about" */ '../views/AtencionUrgenciaVista.vue')
  },
  {
    path: '/hospitalizacion',
    name: 'hospitalizacion',
    component: () => import(/* webpackChunkName: "about" */ '../views/HospitalizacionVista.vue')
  },
  {
    path: '/cirugia',
    name: 'cirugia',
    component: () => import(/* webpackChunkName: "about" */ '../views/CirugiasVista.vue')
  },
  {
    path: '/atencionesMedicas',
    name: 'atencionesMedicas',
    component: () => import(/* webpackChunkName: "about" */ '../views/AtencionesMedicas.vue')
  },
  {
    path: '/imagenologia',
    name: 'imagenologia',
    component: () => import(/* webpackChunkName: "about" */ '../views/ImagenologiaVista.vue')
  },
  {
    path: '/laboratorio',
    name: 'laboratorio',
    component: () => import(/* webpackChunkName: "about" */ '../views/LaboratorioVista.vue')
  },
  {
    path: '/bancoSangre',
    name: 'bancoSangre',
    component: () => import(/* webpackChunkName: "about" */ '../views/BancoSangreVista.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
