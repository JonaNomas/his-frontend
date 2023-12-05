export default [
  {
    path: '/imagenologia',
    name: 'imagenologia',
    component: () => import(/* webpackChunkName: "about" */ '../views/ImagenologiaVista.vue'),
    meta: {
      requiereAutentificacion: true,
      permisosRequeridos: [],
      tituloPagina: 'MedSoft - Imagenologia'
    }
  }
]
