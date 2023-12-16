import api from '@/services/api'

/**
 * Obtiene la información de una especialidad por su ID desde la API.
 *
 * @async
 * @function
 * @param {number} id - El ID de la especialidad que se desea obtener.
 * @returns {Promise<{id:Number, nombre:String}>} Un objeto con la información de la especialidad, que tiene como propiedades 'id', 'nombre',
 * @throws {Error} Si no se especifica el ID de la especialidad o si ocurre un error al realizar la solicitud a la API.
 */
export default async function (id) {
  if (id === undefined) throw new Error('No se ha especificado el id de la especialidad')

  try {
    const respuestaAPI = await api().get(`/api/Especialidades/obtenerEspecialidadesPorId/${id}`)
    return respuestaAPI.data
  } catch (error) {
    throw new Error('Error al obtener la especialidad desde la API: ' + error.message)
  }
}
