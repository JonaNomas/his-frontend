import api from '@/services/api'

/**
 *
 * @param {String} rut Rut del paciente con formato 12345678-9
 * @returns {{}} Retorna un objeto con los datos del paciente
 */
export default async function (rut) {
  if (rut === undefined) throw new Error('No se ha especificado el run del paciente')

  try {
    const respuestaAPI = await api().post('/api/Paciente/obtenerPaciente', {
      rut
    })
    return respuestaAPI.data
  } catch (error) {
    throw new Error('Error al obtener la especialidad desde la API: ' + error.message)
  }
}
