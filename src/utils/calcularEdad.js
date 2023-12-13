/**
 *
 * @param {String} fechaNacimiento Fecha en formato ISO 8601 (1980-01-01T00:00:00)
 * @returns {Number} Edad en años
 */
export default function (fechaNacimiento) {
  // Convierte la cadena de fecha de nacimiento a un objeto de fecha
  const fn = new Date(fechaNacimiento)

  // Obtiene la fecha actual
  const fechaActual = new Date()

  // Calcula la diferencia en milisegundos entre las dos fechas
  const diferencia = fechaActual - fn

  // Convierte la diferencia de milisegundos a años
  const edadEnAnios = Math.floor(diferencia / (365.25 * 24 * 60 * 60 * 1000))

  return edadEnAnios
}
