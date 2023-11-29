import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '../store/index.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      requiereAutentificacion: true,
      permisosRequeridos: []
    }
  },
  {
    path: '/agendamientoHoras',
    name: 'agendamientoHoras',
    component: () => import(/* webpackChunkName: "about" */ '../views/AgendamientoHorasVista.vue'),
    meta: {
      requiereAutentificacion: true,
      permisosRequeridos: []
    }
  },
  {
    path: '/ingresar',
    name: 'ingresar',
    component: () => import(/* webpackChunkName: "about" */ '../views/IngresarVista.vue'),
    meta: {
      requiereAutentificacion: false,
      permisosRequeridos: []
    }
  },
  {
    path: '/usuario',
    name: 'usuario',
    component: () => import(/* webpackChunkName: "about" */ '../views/UsuarioVista.vue'),
    meta: {
      requiereAutentificacion: true,
      permisosRequeridos: []
    }
  },
  {
    path: '/buscarPaciente',
    name: 'buscarPaciente',
    component: () => import(/* webpackChunkName: "about" */ '../views/BuscarPacienteVista.vue'),
    meta: {
      requiereAutentificacion: true,
      permisosRequeridos: []
    }
  },
  {
    path: '/nuevoPaciente',
    name: 'nuevoPaciente',
    component: () => import(/* webpackChunkName: "about" */ '../views/IngresarNuevoPaciente.vue'),
    meta: {
      requiereAutentificacion: true,
      permisosRequeridos: []
    }
  },
  {
    path: '/atencionUrgencias',
    name: 'atencionUrgencias',
    component: () => import(/* webpackChunkName: "about" */ '../views/AtencionUrgenciaVista.vue'),
    meta: {
      requiereAutentificacion: true,
      permisosRequeridos: []
    }
  },
  {
    path: '/hospitalizacion',
    name: 'hospitalizacion',
    component: () => import(/* webpackChunkName: "about" */ '../views/HospitalizacionVista.vue'),
    meta: {
      requiereAutentificacion: true,
      permisosRequeridos: []
    }
  },
  {
    path: '/cirugia',
    name: 'cirugia',
    component: () => import(/* webpackChunkName: "about" */ '../views/CirugiasVista.vue'),
    meta: {
      requiereAutentificacion: true,
      permisosRequeridos: []
    }
  },
  {
    path: '/atencionesMedicas',
    name: 'atencionesMedicas',
    component: () => import(/* webpackChunkName: "about" */ '../views/AtencionesMedicas.vue'),
    meta: {
      requiereAutentificacion: true,
      permisosRequeridos: []
    }
  },
  {
    path: '/imagenologia',
    name: 'imagenologia',
    component: () => import(/* webpackChunkName: "about" */ '../views/ImagenologiaVista.vue'),
    meta: {
      requiereAutentificacion: true,
      permisosRequeridos: []
    }
  },
  {
    path: '/laboratorio',
    name: 'laboratorio',
    component: () => import(/* webpackChunkName: "about" */ '../views/LaboratorioVista.vue'),
    meta: {
      requiereAutentificacion: true,
      permisosRequeridos: []
    }
  },
  {
    path: '/bancoSangre',
    name: 'bancoSangre',
    component: () => import(/* webpackChunkName: "about" */ '../views/BancoSangreVista.vue'),
    meta: {
      requiereAutentificacion: true,
      permisosRequeridos: []
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.requiereAutentificacion)) {
    if (!store.state.estaLoggeado) {
      next({ path: '/ingresar' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
