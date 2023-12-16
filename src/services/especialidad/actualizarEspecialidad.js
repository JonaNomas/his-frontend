import api from '@/services/api'

/**
 * Actualiza una especialidad existente utilizando la API.
 *
 * @async
 * @function
 * @param {number} id - El ID de la especialidad que se desea actualizar.
 * @param {string} especialidad - El nuevo nombre de la especialidad.
 * @returns {Promise<boolean>} Retorna true si la especialidad se actualiza correctamente (código de estado 200), de lo contrario, retorna false.
 * @throws {Error} Si no se especifica un ID o una especialidad, o si ocurre un error al realizar la solicitud para actualizar la especialidad.
 */
export default async function (id, especialidad) {
  if (!id || !especialidad) throw new Error('No se ha especificado un id o una especialidad')
  try {
    const respuestaAPI = await api().post('/api/Especialidades/crearEspecialidad', {
      id,
      nombre: especialidad
    })
    return respuestaAPI.status === 200
  } catch (error) {
    throw new Error('Error al actualizar la especialidad desde la API: ' + error.message)
  }
}
