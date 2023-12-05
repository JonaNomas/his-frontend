export default [
  {
    path: '/atencionesMedicas/atencion',
    name: 'atencionesMedicas',
    component: () => import(/* webpackChunkName: "about" */ '../views/atencionesMedicas/AtencionMedicaVista.vue'),
    meta: {
      requiereAutentificacion: true,
      permisosRequeridos: [],
      tituloPagina: 'MedSoft - Atenciones Medicas'
    }
  },
  {
    path: '/atencionesMedicas/agendamiento',
    name: 'agendamientoAtencionesMedicas',
    component: () => import(/* webpackChunkName: "about" */ '../views/atencionesMedicas/AgendamientoAtencionMedicaVista.vue'),
    meta: {
      requiereAutentificacion: true,
      permisosRequeridos: [],
      tituloPagina: 'MedSoft - Agendamiento - Atenciones Medicas'
    }
  },
  {
    path: '/atencionesMedicas/citados',
    name: 'citadosAtencionesMedicas',
    component: () => import(/* webpackChunkName: "about" */ '../views/atencionesMedicas/ListadoCitadosAtencionMedicaVista.vue'),
    meta: {
      requiereAutentificacion: true,
      permisosRequeridos: [],
      tituloPagina: 'MedSoft - Citados - Atenciones Medicas'
    }
  }
]
