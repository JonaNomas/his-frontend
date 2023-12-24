export default [
  {
    path: '/laboratorio',
    name: 'laboratorio',
    component: () => import(/* webpackChunkName: "laboratorio" */ '../views/HomeView.vue'),
    meta: {
      requiereAutentificacion: true,
      permisosRequeridos: [],
      tituloPagina: 'MedSoft - Laboratorio'
    }
  },
  {
    path: '/laboratorio/cargarExamen',
    name: 'cargarExamenLaboratorio',
    component: () => import(/* webpackChunkName: "laboratorio" */ '../views/laboratorio/CargarExamenLaboratorioVista.vue'),
    meta: {
      requiereAutentificacion: true,
      permisosRequeridos: [],
      tituloPagina: 'MedSoft - Cargar Examen - Laboratorio'
    }
  },
  {
    path: '/laboratorio/buscar',
    name: 'buscarLaboratorio',
    component: () => import(/* webpackChunkName: "laboratorio" */ '../views/laboratorio/BuscarExamenesLaboratorioVista.vue'),
    meta: {
      requiereAutentificacion: true,
      permisosRequeridos: [],
      tituloPagina: 'MedSoft - Buscar - Laboratorio'
    }
  },
  {
    path: '/laboratorio/mantenedor',
    name: 'mantenedorLaboratorio',
    component: () => import(/* webpackChunkName: "laboratorio" */ '../views/laboratorio/MantenedorExamenesLaboratorioVista.vue'),
    meta: {
      requiereAutentificacion: true,
      permisosRequeridos: [],
      tituloPagina: 'MedSoft - Mantenedor - Laboratorio'
    }
  },
  {
    path: '/laboratorio/buscar/:id',
    name: 'buscarIDLaboratorio',
    component: () => import(/* webpackChunkName: "laboratorio" */ '../views/laboratorio/VerExamenLaboratorio.vue'),
    meta: {
      requiereAutentificacion: true,
      permisosRequeridos: [],
      tituloPagina: 'MedSoft - Resultados - Laboratorio'
    }
  }

]
