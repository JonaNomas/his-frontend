export default [
  {
    path: '/urgencias/ingreso',
    name: 'ingresoUrgencias',
    component: () => import(/* webpackChunkName: "urgencias" */ '../views/atencionUrgencia/IngresoAtencionUrgenciaVista.vue'),
    meta: {
      requiereAutentificacion: true,
      permisosRequeridos: [],
      tituloPagina: 'MedSoft - Ingreso - Atención Urgencia'
    }
  },
  {
    path: '/urgencias/triage',
    name: 'triageUrgencias',
    component: () => import(/* webpackChunkName: "urgencias" */ '../views/atencionUrgencia/TriageAtencionUrgenciaVista.vue'),
    meta: {
      requiereAutentificacion: true,
      permisosRequeridos: [],
      tituloPagina: 'MedSoft - Triage - Atención Urgencia'
    }
  },
  {
    path: '/urgencias/triage/:id',
    name: 'insertarTriageAtencionUrgenciaVista',
    component: () => import(/* webpackChunkName: "urgencias" */ '../views/atencionUrgencia/InsertarTriageAtencionUrgenciaVista.vue'),
    meta: {
      requiereAutentificacion: true,
      permisosRequeridos: [],
      tituloPagina: 'MedSoft - Triage - Atención Urgencia'
    }
  },
  {
    path: '/urgencias/atencion',
    name: 'atencionUrgencias',
    component: () => import(/* webpackChunkName: "urgencias" */ '../views/atencionUrgencia/AtencionAtencionUrgenciaVista.vue'),
    meta: {
      requiereAutentificacion: true,
      permisosRequeridos: [],
      tituloPagina: 'MedSoft - Atención Urgencia'
    }
  },
  {
    path: '/urgencias/alta',
    name: 'altaUrgencias',
    component: () => import(/* webpackChunkName: "urgencias" */ '../views/atencionUrgencia/AltaAtencionUrgenciaVista.vue'),
    meta: {
      requiereAutentificacion: true,
      permisosRequeridos: [],
      tituloPagina: 'MedSoft - Alta - Atención Urgencia'
    }
  }

]
