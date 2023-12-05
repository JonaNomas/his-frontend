export default [
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
    path: '/cirugia/ingreso',
    name: 'ingresoCirugia',
    component: () => import(/* webpackChunkName: "about" */ '../views/cirugia/IngresoCirugiaVista.vue'),
    meta: {
      requiereAutentificacion: true,
      permisosRequeridos: [],
      tituloPagina: 'MedSoft - Ingreso - Cirugia'
    }
  },
  {
    path: '/cirugia/agendamiento',
    name: 'agendamientoCirugia',
    component: () => import(/* webpackChunkName: "about" */ '../views/cirugia/AgendamientoCirugiaVista.vue'),
    meta: {
      requiereAutentificacion: true,
      permisosRequeridos: [],
      tituloPagina: 'MedSoft - Agendamiento - Cirugia'
    }
  },
  {
    path: '/cirugia/gestionPabellones',
    name: 'gestionPabellonesCirugia',
    component: () => import(/* webpackChunkName: "about" */ '../views/cirugia/GestionPabellonesCirugiaVista.vue'),
    meta: {
      requiereAutentificacion: true,
      permisosRequeridos: [],
      tituloPagina: 'MedSoft - Gestion Pabellones - Cirugia'
    }
  },
  {
    path: '/cirugia/registro',
    name: 'registroCirugia',
    component: () => import(/* webpackChunkName: "about" */ '../views/cirugia/RegistroCirugiaVista.vue'),
    meta: {
      requiereAutentificacion: true,
      permisosRequeridos: [],
      tituloPagina: 'MedSoft - Registro - Cirugia'
    }
  },
  {
    path: '/cirugia/alta',
    name: 'altaCirugia',
    component: () => import(/* webpackChunkName: "about" */ '../views/cirugia/AltaCirugiaVista.vue'),
    meta: {
      requiereAutentificacion: true,
      permisosRequeridos: [],
      tituloPagina: 'MedSoft - Alta - Cirugia'
    }
  }
]
