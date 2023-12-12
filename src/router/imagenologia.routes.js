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
  }
]
