export default [
  {
    path: '/paciente/buscar',
    name: 'buscarPaciente',
    component: () => import(/* webpackChunkName: "paciente" */ '../views/pacientes/BuscarPacienteVista.vue'),
    meta: {
      requiereAutentificacion: true,
      permisosRequeridos: [],
      tituloPagina: 'MedSoft - Buscar paciente'
    }
  },
  {
    path: '/paciente/nuevo',
    name: 'nuevoPaciente',
    component: () => import(/* webpackChunkName: "paciente" */ '../views/pacientes/IngresarPacienteVista.vue'),
    meta: {
      requiereAutentificacion: true,
      permisosRequeridos: [],
      tituloPagina: 'MedSoft - Ingresar Nuevo Paciente'
    }
  },
  {
    path: '/paciente/actualizar',
    name: 'actualizarPaciente',
    component: () => import(/* webpackChunkName: "paciente" */ '../views/pacientes/IngresarPacienteVista.vue'),
    meta: {
      requiereAutentificacion: true,
      permisosRequeridos: [],
      tituloPagina: 'MedSoft - Actualizar Paciente'
    }
  }
]
