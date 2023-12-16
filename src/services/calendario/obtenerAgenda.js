import api from '@/services/api'

/**
 * Obtiene datos de la agenda desde la API según los parámetros proporcionados.
 *
 * @param {Number} especialidad - ID de la especialidad médica para filtrar la agenda.
 * @param {string} profesional - Rut del profesional de la salud para filtrar la agenda.
 * @param {string} paciente - Rut del paciente para filtrar la agenda.
 * @param {number} ano - Año para el cual se desea obtener la agenda.
 * @param {number} mes - Mes para el cual se desea obtener la agenda (1 para enero, 2 para febrero, etc.).
 * @returns {Promise<Object>} - Una promesa que se resuelve con los datos de la agenda obtenidos desde la API.
 * @throws {Error} - Se arroja un error si ocurre algún problema al obtener la agenda desde la API.
 *
 * @example
 * // Ejemplo de uso:
 * try {
 *   const agendaData = await obtenerAgenda('cardiología', 'Dr. Smith', 'John Doe', 2023, 1);
 *   console.log(agendaData);
 * } catch (error) {
 *   console.error('Error al obtener la agenda:', error.message);
 * }
 */
export default async function (especialidad, profesional, paciente, ano, mes) {
  try {
    const respuestaAPI = await api().post('/api/Agenda/obtenerAgenda', {
      especialidad: 'TODOS',
      profesional: 'TODOS',
      paciente: 'TODOS',
      ano: 2023,
      mes: 1
    })
    return respuestaAPI.data
  } catch (error) {
    throw new Error('Error al obtener la agenda desde la API: ' + error.message)
  }
}
