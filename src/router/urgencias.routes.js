export default [
  {
    path: '/atencionUrgencias/ingreso',
    name: 'ingresoAtencionUrgencias',
    component: () => import(/* webpackChunkName: "urgencias" */ '../views/atencionUrgencia/IngresoAtencionUrgenciaVista.vue'),
    meta: {
      requiereAutentificacion: true,
      permisosRequeridos: [],
      tituloPagina: 'MedSoft - Ingreso - Atención Urgencia'
    }
  },
  {
    path: '/atencionUrgencias/triage',
    name: 'triageAtencionUrgencias',
    component: () => import(/* webpackChunkName: "urgencias" */ '../views/atencionUrgencia/TriageAtencionUrgenciaVista.vue'),
    meta: {
      requiereAutentificacion: true,
      permisosRequeridos: [],
      tituloPagina: 'MedSoft - Triage - Atención Urgencia'
    }
  },
  {
    path: '/atencionUrgencias/triage/:id',
    name: 'insertarTriageAtencionUrgenciaVista',
    component: () => import(/* webpackChunkName: "urgencias" */ '../views/atencionUrgencia/InsertarTriageAtencionUrgenciaVista.vue'),
    meta: {
      requiereAutentificacion: true,
      permisosRequeridos: [],
      tituloPagina: 'MedSoft - Triage - Atención Urgencia'
    }
  },
  {
    path: '/atencionUrgencias/atencion',
    name: 'atencionAtencionUrgencias',
    component: () => import(/* webpackChunkName: "urgencias" */ '../views/atencionUrgencia/AtencionAtencionUrgenciaVista.vue'),
    meta: {
      requiereAutentificacion: true,
      permisosRequeridos: [],
      tituloPagina: 'MedSoft - Atención Urgencia'
    }
  },
  {
    path: '/atencionUrgencias/alta',
    name: 'altaAtencionUrgencias',
    component: () => import(/* webpackChunkName: "urgencias" */ '../views/atencionUrgencia/AltaAtencionUrgenciaVista.vue'),
    meta: {
      requiereAutentificacion: true,
      permisosRequeridos: [],
      tituloPagina: 'MedSoft - Alta - Atención Urgencia'
    }
  }

]
