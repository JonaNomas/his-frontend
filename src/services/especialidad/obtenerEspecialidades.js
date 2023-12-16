import api from '@/services/api'

/**
 * Obtiene un array de objetos que contienen id y nombre de las especialidades.
 *
 * @async
 * @function
 * @returns {Promise<Array<{}>>} Un array de objetos con las especialidades, donde cada objeto tiene las propiedades id y nombre.
 * @throws {Error} Si hay algún error al realizar la solicitud a la API.
 */
export default async function () {
  try {
    const respuestaAPI = await api().get('/api/Especialidades/obtenerEspecialidades')
    return respuestaAPI.data
  } catch (error) {
    throw new Error('Error al obtener las especialidades desde la API: ' + error.message)
  }
}
