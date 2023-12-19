export default [
  {
    path: '/imagenologia',
    name: 'imagenologia',
    component: () => import(/* webpackChunkName: "imagenologia" */ '../views/HomeView.vue'),
    meta: {
      requiereAutentificacion: true,
      permisosRequeridos: [],
      tituloPagina: 'MedSoft - Imagenologia'
    }
  },
  {
    path: '/imagenologia/cargarExamen',
    name: 'cargarExamenImagenologia',
    component: () => import(/* webpackChunkName: "imagenologia" */ '../views/imagenologia/CargarExamenImagenologiaVista.vue'),
    meta: {
      requiereAutentificacion: true,
      permisosRequeridos: [],
      tituloPagina: 'MedSoft - Cargar Examen - Imagenologia'
    }
  },
  {
    path: '/imagenologia/mantenedor',
    name: 'mantenedorImagenologia',
    component: () => import(/* webpackChunkName: "imagenologia" */ '../views/imagenologia/MantenedorExamenesImagenologiaVista.vue'),
    meta: {
      requiereAutentificacion: true,
      permisosRequeridos: [],
      tituloPagina: 'MedSoft - Mantenedor - Imagenologia'
    }
  }
]
