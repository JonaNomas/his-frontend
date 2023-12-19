export default [
  {
    path: '/hospitalizacion/ingreso',
    name: 'ingresoHospitalizacion',
    component: () => import(/* webpackChunkName: "hospitalizacion" */ '../views/hospitalizacion/IngresoHospitalizacionVista.vue'),
    meta: {
      requiereAutentificacion: true,
      permisosRequeridos: [],
      tituloPagina: 'MedSoft - Ingreso - Hospitalización'
    }
  },
  {
    path: '/hospitalizacion/atencionEnfermeria',
    name: 'atencionEnfermeriaHospitalizacion',
    component: () => import(/* webpackChunkName: "hospitalizacion" */ '../views/hospitalizacion/AtencionEnfermeraHospitalizacionVista.vue'),
    meta: {
      requiereAutentificacion: true,
      permisosRequeridos: [],
      tituloPagina: 'MedSoft - Atención Enfermería - Hospitalización'
    }
  },
  {
    path: '/hospitalizacion/atencionEnfermeria/hispitalizacion/:id',
    name: 'atencionEnfermeriaHospitalizacionDias',
    component: () => import(/* webpackChunkName: "hospitalizacion" */ '../views/hospitalizacion/VerHospitalizacionEnfermera.vue'),
    meta: {
      requiereAutentificacion: true,
      permisosRequeridos: [],
      tituloPagina: 'MedSoft - Paciente - Enfermería - Hospitalización'
    }
  },
  {
    path: '/hospitalizacion/atencionMedica',
    name: 'atencionMedicaHospitalizacion',
    component: () => import(/* webpackChunkName: "hospitalizacion" */ '../views/hospitalizacion/EvaluacionMedicaHospitalizacionVista.vue'),
    meta: {
      requiereAutentificacion: true,
      permisosRequeridos: [],
      tituloPagina: 'MedSoft - Evaluación Medica - Hospitalización'
    }
  },
  {
    path: '/hospitalizacion/atencionMedica/hispitalizacion/:id',
    name: 'atencionMedicaHospitalizacionDias',
    component: () => import(/* webpackChunkName: "hospitalizacion" */ '../views/hospitalizacion/VerHospitalizacionMedico.vue'),
    meta: {
      requiereAutentificacion: true,
      permisosRequeridos: [],
      tituloPagina: 'MedSoft - Paciente - Medico - Hospitalización'
    }
  },
  {
    path: '/hospitalizacion/alta',
    name: 'altaHospitalizacion',
    component: () => import(/* webpackChunkName: "hospitalizacion" */ '../views/hospitalizacion/AltaHospitalizacionVista.vue'),
    meta: {
      requiereAutentificacion: true,
      permisosRequeridos: [],
      tituloPagina: 'MedSoft - Alta - Hospitalización'
    }
  },
  {
    path: '/hospitalizacion/gestionCamas',
    name: 'gestionCamasHospitalizacion',
    component: () => import(/* webpackChunkName: "hospitalizacion" */ '../views/hospitalizacion/GestionCamasHospitalizacionVista.vue'),
    meta: {
      requiereAutentificacion: true,
      permisosRequeridos: [],
      tituloPagina: 'MedSoft - Gestión Camas - Hospitalización'
    }
  }
]
