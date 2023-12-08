import api from '@/services/api'

/**
 *
 * @param {String} rut Rut del paciente con formato 12345678-9
 * @returns {{}} Retorna un objeto con los datos del paciente
 */
export default function (rut) {
  return api().post('/api/Paciente/obtenerPaciente', {
    rut
  })
}
