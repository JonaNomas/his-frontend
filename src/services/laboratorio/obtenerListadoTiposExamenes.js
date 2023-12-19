import api from '@/services/api'

/**
 * Obtiene un array de objetos con los exámenes de laboratorio.
 *
 * @async
 * @function
 * @returns {Promise<Array<{}>>} Un array de objetos con los exámenes de laboratorio.
 * @throws {Error} Si hay algún error al realizar la solicitud a la API.
 */
export default async function () {
  try {
    const respuestaAPI = await api().get('/api/Laboratorio/obtenerTipoExamenLaboratorio')
    return respuestaAPI.data
  } catch (error) {
    throw new Error('Error al obtener las especialidades desde la API: ' + error.message)
  }
}
