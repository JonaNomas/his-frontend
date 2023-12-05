export default [
  {
    path: '/laboratorio',
    name: 'laboratorio',
    component: () => import(/* webpackChunkName: "about" */ '../views/LaboratorioVista.vue'),
    meta: {
      requiereAutentificacion: true,
      permisosRequeridos: [],
      tituloPagina: 'MedSoft - Laboratorio'
    }
  }
]
