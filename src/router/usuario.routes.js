export default [
  {
    path: '/usuario/cambiar/contrasena',
    name: 'usuarioCambiarContrasena',
    component: () => import(/* webpackChunkName: "usuario" */ '../views/usuario/CambiarPasswordUsuarioVista.vue'),
    meta: {
      requiereAutentificacion: true,
      permisosRequeridos: [],
      tituloPagina: 'MedSoft - Cambiar Contraseña - Usuario'
    }
  },
  {
    path: '/usuario/funcionarios/nuevo',
    name: 'nuevoFuncionario',
    component: () => import(/* webpackChunkName: "usuario" */ '../views/usuario/CrearFuncionarioVista.vue'),
    meta: {
      requiereAutentificacion: true,
      permisosRequeridos: [],
      tituloPagina: 'MedSoft - Nuevo Funcionario - Funcionarios'
    }
  }
]
