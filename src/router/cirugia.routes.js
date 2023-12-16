export default [
  {
    path: '/cirugia/ingreso',
    name: 'ingresoCirugia',
    component: () => import(/* webpackChunkName: "cirugia" */ '../views/cirugia/IngresoCirugiaVista.vue'),
    meta: {
      requiereAutentificacion: true,
      permisosRequeridos: [],
      tituloPagina: 'MedSoft - Ingreso - Cirugia'
    }
  },
  {
    path: '/cirugia/agendamiento',
    name: 'agendamientoCirugia',
    component: () => import(/* webpackChunkName: "cirugia" */ '../views/cirugia/AgendamientoCirugiaVista.vue'),
    meta: {
      requiereAutentificacion: true,
      permisosRequeridos: [],
      tituloPagina: 'MedSoft - Agendamiento - Cirugia'
    }
  },
  {
    path: '/cirugia/gestionPabellones',
    name: 'gestionPabellonesCirugia',
    component: () => import(/* webpackChunkName: "cirugia" */ '../views/cirugia/GestionPabellonesCirugiaVista.vue'),
    meta: {
      requiereAutentificacion: true,
      permisosRequeridos: [],
      tituloPagina: 'MedSoft - Gestion Pabellones - Cirugia'
    }
  },
  {
    path: '/cirugia/registro',
    name: 'registroCirugia',
    component: () => import(/* webpackChunkName: "cirugia" */ '../views/cirugia/RegistroCirugiaVista.vue'),
    meta: {
      requiereAutentificacion: true,
      permisosRequeridos: [],
      tituloPagina: 'MedSoft - Registro - Cirugia'
    }
  },
  {
    path: '/cirugia/alta',
    name: 'altaCirugia',
    component: () => import(/* webpackChunkName: "cirugia" */ '../views/cirugia/AltaCirugiaVista.vue'),
    meta: {
      requiereAutentificacion: true,
      permisosRequeridos: [],
      tituloPagina: 'MedSoft - Alta - Cirugia'
    }
  }
]
