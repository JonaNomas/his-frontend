import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '../store/index.js'

Vue.use(VueRouter)

// const PERMISOS = {
//   ADMINISTRADOR: 0,
//   MEDICO: 1,
//   ENFERMERA: 2,
//   TECNOLOGO: 3,
//   MATRONA: 4,
//   KINESIOLOGO: 5,
//   TENS: 6,
//   ADMINISTRATIVO: 7,
//   CLINICO: 8,
//   NUTRICIONISTA: 9
// }

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      requiereAutentificacion: true,
      permisosRequeridos: [],
      tituloPagina: 'MedSoft - Inicio'
    }
  },
  {
    path: '/agendamientoHoras',
    name: 'agendamientoHoras',
    component: () => import(/* webpackChunkName: "about" */ '../views/AgendamientoHorasVista.vue'),
    meta: {
      requiereAutentificacion: true,
      permisosRequeridos: [],
      tituloPagina: 'MedSoft - Agendamiento de horas'
    }
  },
  {
    path: '/ingresar',
    name: 'ingresar',
    component: () => import(/* webpackChunkName: "about" */ '../views/IngresarVista.vue'),
    meta: {
      requiereAutentificacion: false,
      permisosRequeridos: [],
      tituloPagina: 'MedSoft - Ingreso'
    }
  },
  {
    path: '/usuario',
    name: 'usuario',
    component: () => import(/* webpackChunkName: "about" */ '../views/UsuarioVista.vue'),
    meta: {
      requiereAutentificacion: true,
      permisosRequeridos: [],
      tituloPagina: 'MedSoft - Cuenta de usuario'
    }
  },
  {
    path: '/buscarPaciente',
    name: 'buscarPaciente',
    component: () => import(/* webpackChunkName: "about" */ '../views/BuscarPacienteVista.vue'),
    meta: {
      requiereAutentificacion: true,
      permisosRequeridos: [],
      tituloPagina: 'MedSoft - Buscar paciente'
    }
  },
  {
    path: '/nuevoPaciente',
    name: 'nuevoPaciente',
    component: () => import(/* webpackChunkName: "about" */ '../views/IngresarNuevoPaciente.vue'),
    meta: {
      requiereAutentificacion: true,
      permisosRequeridos: [],
      tituloPagina: 'MedSoft - Ingresar Nuevo Paciente'
    }
  },
  {
    path: '/atencionUrgencias',
    name: 'atencionUrgencias',
    component: () => import(/* webpackChunkName: "about" */ '../views/AtencionUrgenciaVista.vue'),
    meta: {
      requiereAutentificacion: true,
      permisosRequeridos: [],
      tituloPagina: 'MedSoft - Atención Urgencia'
    }
  },
  {
    path: '/hospitalizacion',
    name: 'hospitalizacion',
    component: () => import(/* webpackChunkName: "about" */ '../views/HospitalizacionVista.vue'),
    meta: {
      requiereAutentificacion: true,
      permisosRequeridos: [],
      tituloPagina: 'MedSoft - Hospitalización'
    }
  },
  {
    path: '/cirugia',
    name: 'cirugia',
    component: () => import(/* webpackChunkName: "about" */ '../views/CirugiasVista.vue'),
    meta: {
      requiereAutentificacion: true,
      permisosRequeridos: [],
      tituloPagina: 'MedSoft - Cirugia'
    }
  },
  {
    path: '/atencionesMedicas',
    name: 'atencionesMedicas',
    component: () => import(/* webpackChunkName: "about" */ '../views/AtencionesMedicas.vue'),
    meta: {
      requiereAutentificacion: true,
      permisosRequeridos: [],
      tituloPagina: 'MedSoft - Atenciones Medicas'
    }
  },
  {
    path: '/imagenologia',
    name: 'imagenologia',
    component: () => import(/* webpackChunkName: "about" */ '../views/ImagenologiaVista.vue'),
    meta: {
      requiereAutentificacion: true,
      permisosRequeridos: [],
      tituloPagina: 'MedSoft - Imagenologia'
    }
  },
  {
    path: '/laboratorio',
    name: 'laboratorio',
    component: () => import(/* webpackChunkName: "about" */ '../views/LaboratorioVista.vue'),
    meta: {
      requiereAutentificacion: true,
      permisosRequeridos: [],
      tituloPagina: 'MedSoft - Laboratorio'
    }
  },
  {
    path: '/bancoSangre',
    name: 'bancoSangre',
    component: () => import(/* webpackChunkName: "about" */ '../views/BancoSangreVista.vue'),
    meta: {
      requiereAutentificacion: true,
      permisosRequeridos: [],
      tituloPagina: 'MedSoft - Banco de Sangre'
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
      document.title = to.meta.tituloPagina
    } else {
      next()
      document.title = to.meta.tituloPagina
    }
  } else {
    next()
    document.title = to.meta.tituloPagina
  }
})

export default router
