export default [
  {
    path: '/bancoSangre',
    name: 'bancoSangre',
    component: () => import(/* webpackChunkName: "about" */ '../views/HomeView.vue'),
    meta: {
      requiereAutentificacion: true,
      permisosRequeridos: [],
      tituloPagina: 'MedSoft - Banco de Sangre'
    }
  }
]
