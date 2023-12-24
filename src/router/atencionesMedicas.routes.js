export default [
  {
    path: '/atencionesMedicas/atencion',
    name: 'atencionesMedicas',
    component: () => import(/* webpackChunkName: "policlinico" */ '../views/atencionesMedicas/AtencionMedicaVista.vue'),
    meta: {
      requiereAutentificacion: true,
      permisosRequeridos: [],
      tituloPagina: 'MedSoft - Atenciones Medicas'
    }
  },
  {
    path: '/atencionesMedicas/agendamiento',
    name: 'agendamientoAtencionesMedicas',
    component: () => import(/* webpackChunkName: "policlinico" */ '../views/atencionesMedicas/AgendamientoAtencionMedicaVista.vue'),
    meta: {
      requiereAutentificacion: true,
      permisosRequeridos: [],
      tituloPagina: 'MedSoft - Agendamiento - Atenciones Medicas'
    }
  }
]
