export default [
  {
    path: '/hospitalizacion',
    name: 'hospitalizacion',
    component: () => import(/* webpackChunkName: "hospitalizacion" */ '../views/HospitalizacionVista.vue'),
    meta: {
      requiereAutentificacion: true,
      permisosRequeridos: [],
      tituloPagina: 'MedSoft - Hospitalización'
    }
  },
  {
    path: '/hospitalizacion/ingreso',
    name: 'ingresoHospitalizacion',
    component: () => import(/* webpackChunkName: "hospitalizacion" */ '../views/hospitalizacion/IngresoHospitalizacionVista.vue'),
    meta: {
      requiereAutentificacion: true,
      permisosRequeridos: [],
      tituloPagina: 'MedSoft - Ingreso - Hospitalización'
    }
  },
  {
    path: '/hospitalizacion/atencionEnfermeria',
    name: 'atencionEnfermeriaHospitalizacion',
    component: () => import(/* webpackChunkName: "hospitalizacion" */ '../views/hospitalizacion/AtencionEnfermeraHospitalizacionVista.vue'),
    meta: {
      requiereAutentificacion: true,
      permisosRequeridos: [],
      tituloPagina: 'MedSoft - Atención Enfermería - Hospitalización'
    }
  },
  {
    path: '/hospitalizacion/atencionMedica',
    name: 'atencionMedicaHospitalizacion',
    component: () => import(/* webpackChunkName: "hospitalizacion" */ '../views/hospitalizacion/EvaluacionMedicaHospitalizacionVista.vue'),
    meta: {
      requiereAutentificacion: true,
      permisosRequeridos: [],
      tituloPagina: 'MedSoft - Evaluación Medica - Hospitalización'
    }
  },
  {
    path: '/hospitalizacion/alta',
    name: 'altaHospitalizacion',
    component: () => import(/* webpackChunkName: "hospitalizacion" */ '../views/hospitalizacion/AltaHospitalizacionVista.vue'),
    meta: {
      requiereAutentificacion: true,
      permisosRequeridos: [],
      tituloPagina: 'MedSoft - Alta - Hospitalización'
    }
  },
  {
    path: '/hospitalizacion/gestionCamas',
    name: 'gestionCamasHospitalizacion',
    component: () => import(/* webpackChunkName: "hospitalizacion" */ '../views/hospitalizacion/GestionCamasHospitalizacionVista.vue'),
    meta: {
      requiereAutentificacion: true,
      permisosRequeridos: [],
      tituloPagina: 'MedSoft - Gestión Camas - Hospitalización'
    }
  },

  {
    path: '/hospitalizacion/agendamiento',
    name: 'agendamientoHospitalizacion',
    component: () => import(/* webpackChunkName: "hospitalizacion" */ '../views/hospitalizacion/AgendamientoHospitalizacionVista.vue'),
    meta: {
      requiereAutentificacion: true,
      permisosRequeridos: [],
      tituloPagina: 'MedSoft - Agendamiento - Hospitalización'
    }
  }
]
