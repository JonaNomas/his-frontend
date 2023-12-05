export default [
  {
    path: '/bancoSangre',
    name: 'bancoSangre',
    component: () => import(/* webpackChunkName: "about" */ '../views/BancoSangreVista.vue'),
    meta: {
      requiereAutentificacion: true,
      permisosRequeridos: [],
      tituloPagina: 'MedSoft - Banco de Sangre'
    }
  }
]
