export default [
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
    path: '/atencionUrgencias/ingreso',
    name: 'ingresoAtencionUrgencias',
    component: () => import(/* webpackChunkName: "ingresoUrgencia" */ '../views/atencionUrgencia/IngresoAtencionUrgenciaVista.vue'),
    meta: {
      requiereAutentificacion: true,
      permisosRequeridos: [],
      tituloPagina: 'MedSoft - Ingreso - Atención Urgencia'
    }
  },
  {
    path: '/atencionUrgencias/triage',
    name: 'triageAtencionUrgencias',
    component: () => import(/* webpackChunkName: "triageUrgencia" */ '../views/atencionUrgencia/TriageAtencionUrgenciaVista.vue'),
    meta: {
      requiereAutentificacion: true,
      permisosRequeridos: [],
      tituloPagina: 'MedSoft - Triage - Atención Urgencia'
    }
  },
  {
    path: '/atencionUrgencias/atencion',
    name: 'atencionAtencionUrgencias',
    component: () => import(/* webpackChunkName: "atencionUrgencia" */ '../views/atencionUrgencia/AtencionAtencionUrgenciaVIsta.vue'),
    meta: {
      requiereAutentificacion: true,
      permisosRequeridos: [],
      tituloPagina: 'MedSoft - Atención Urgencia'
    }
  },
  {
    path: '/atencionUrgencias/alta',
    name: 'altaAtencionUrgencias',
    component: () => import(/* webpackChunkName: "altaUrgencia" */ '../views/atencionUrgencia/AltaAtencionUrgenciaVista.vue'),
    meta: {
      requiereAutentificacion: true,
      permisosRequeridos: [],
      tituloPagina: 'MedSoft - Alta - Atención Urgencia'
    }
  }

]
