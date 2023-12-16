import api from '@/services/api'

/**
 * Crea una nueva especialidad utilizando la API.
 *
 * @async
 * @function
 * @param {string} especialidad - El nombre de la especialidad que se desea crear.
 * @returns {Promise<Boolean>} Retorna true si la especialidad se crea correctamente (código de estado 200), de lo contrario, retorna false.
 * @throws {Error} Si ocurre un error al realizar la solicitud para crear la especialidad.
 */
export default async function (especialidad) {
  try {
    const respuestaAPI = await api().post('/api/Especialidades/crearEspecialidad', {
      nombre: especialidad
    })
    return respuestaAPI.status === 200
  } catch (error) {
    throw new Error('Error al crear la especialidad desde la API: ' + error.message)
  }
}
