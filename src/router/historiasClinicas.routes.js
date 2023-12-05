export default [
  {
    path: '/buscarPaciente',
    name: 'buscarPaciente',
    component: () => import(/* webpackChunkName: "about" */ '../views/BuscarPacienteVista.vue'),
    meta: {
      requiereAutentificacion: true,
      permisosRequeridos: [],
      tituloPagina: 'MedSoft - Buscar paciente'
    }
  },
  {
    path: '/nuevoPaciente',
    name: 'nuevoPaciente',
    component: () => import(/* webpackChunkName: "about" */ '../views/IngresarNuevoPaciente.vue'),
    meta: {
      requiereAutentificacion: true,
      permisosRequeridos: [],
      tituloPagina: 'MedSoft - Ingresar Nuevo Paciente'
    }
  }
]
