import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '../store/index.js'

import pacienteRoutes from './paciente.routes'
import urgenciasRoutes from './urgencias.routes.js'
import hospitalizacionRoutes from './hospitalizacion.routes.js'
import cirugiaRoutes from './cirugia.routes.js'
import atencionesMedicasRoutes from './atencionesMedicas.routes.js'
import imagenologiaRoutes from './imagenologia.routes.js'
import laboratorioRoutes from './laboratorio.routes.js'
import bancoSangreRoutes from './bancoSangre.routes.js'

Vue.use(VueRouter)

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
  ...pacienteRoutes,
  ...urgenciasRoutes,
  ...hospitalizacionRoutes,
  ...cirugiaRoutes,
  ...atencionesMedicasRoutes,
  ...imagenologiaRoutes,
  ...laboratorioRoutes,
  ...bancoSangreRoutes
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.requiereAutentificacion)) {
    // Si no esta registrado, redirigir a la pagina de ingresar
    if (!store.state.estaLoggeado) {
      next({ path: '/ingresar' })
      document.title = to.meta.tituloPagina
    } else {
      if (to.matched.some(route => route.meta.permisosRequeridos.length > 0)) {
        // Si no tiene permisos, redirigir a la pagina de inicio
        if (!store.state.permisos.some(permiso => to.meta.permisosRequeridos.includes(permiso))) {
          next({ path: '/' })
          document.title = to.meta.tituloPagina
        } else {
          next()
          document.title = to.meta.tituloPagina
        }
      }
      next()
      document.title = to.meta.tituloPagina
    }
  } else {
    next()
    document.title = to.meta.tituloPagina
  }
})

export default router
