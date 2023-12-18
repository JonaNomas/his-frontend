/**
 * Realiza el inicio de sesión de un usuario a través de la API.
 *
 * @param {string} rut - El RUT del usuario.
 * @param {string} password - La contraseña del usuario.
 * @returns {Promise<{}>} Una promesa que se resuelve con los datos de la respuesta de la API.
 * @throws {Error} Se lanza un error si el RUT o la contraseña no están especificados.
 */
import api from '@/services/api.js'

export default async function (rut, password) {
  try {
    // Validar parámetros
    if (!rut) {
      throw new Error('El RUT del usuario no está especificado.')
    }
    if (!password) {
      throw new Error('La contraseña del usuario no está especificada.')
    }

    // Llamada a la API
    const response = await api().post('/api/Usuario/Login', {
      rut,
      password
    })

    // Devolver datos de la respuesta
    return response.data
  } catch (error) {
    // Manejar errores de forma adecuada
    console.error('Error:', error.message)
    throw error
  }
}
