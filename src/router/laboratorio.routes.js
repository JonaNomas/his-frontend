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
  }
]
