import api from '@/services/api'

/**
 * Obtiene datos de la agenda desde la API según los parámetros proporcionados.
 *
 * @param {Number} idEspecialidad - ID de la especialidad médica para filtrar la agenda.
 * @param {Number} idProfesional - Rut del profesional de la salud para filtrar la agenda.
 * @param {string} rutPaciente - Rut del paciente para filtrar la agenda.
 * @param {number} ano - Año para el cual se desea obtener la agenda.
 * @param {number} mes - Mes para el cual se desea obtener la agenda (1 para enero, 2 para febrero, etc.).
 * @returns {Promise<Object>} - Una promesa que se resuelve con los datos de la agenda obtenidos desde la API.
 * @throws {Error} - Se arroja un error si ocurre algún problema al obtener la agenda desde la API.
 *
 */
export default async function (idEspecialidad, idProfesional, rutPaciente, ano, mes, unidad) {
  try {
    const respuestaAPI = await api().post('/api/Agenda/obtenerAgenda', {
      idEspecialidad: idEspecialidad,
      idProfesional: idProfesional,
      rutPaciente: rutPaciente,
      ano: ano,
      mes: mes,
      unidad: unidad
    })
    return respuestaAPI.data
  } catch (error) {
    throw new Error('Error al obtener la agenda desde la API: ' + error.message)
  }
}

/**
 * {
  "idEspecialidad": 0,
  "idProfesional": 0,
  "rutPaciente": "",
  "ano": 2023,
  "mes": 11
}
 */
