export default [
  {
    path: '/bancoSangre',
    name: 'bancoSangre',
    component: () => import(/* webpackChunkName: "bancoSangre" */ '../views/HomeView.vue'),
    meta: {
      requiereAutentificacion: true,
      permisosRequeridos: [],
      tituloPagina: 'MedSoft - Banco de Sangre'
    }
  },
  {
    path: '/bancoSangre/donacion',
    name: 'donacionBancoSangre',
    component: () => import(/* webpackChunkName: "bancoSangre" */ '../views/bancoSangre/DonacionBancoSangreVista.vue'),
    meta: {
      requiereAutentificacion: true,
      permisosRequeridos: [],
      tituloPagina: 'MedSoft - Donación -  Banco de Sangre'
    }
  }
]
