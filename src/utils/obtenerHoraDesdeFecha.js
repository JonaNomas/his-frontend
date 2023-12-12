/**
 *
 * @param {String} fechaString Fecha entregada por la API
 * @returns {String} Hora en formato HH:MM:SS
 */
export default function (fechaString) {
  // Crear un objeto Date con la cadena de fecha
  const fecha = new Date(fechaString)

  // Obtener la hora, minutos y segundos
  const horas = fecha.getHours()
  const minutos = fecha.getMinutes()
  const segundos = fecha.getSeconds()

  // Formatear la hora en un formato legible
  const horaFormateada = horas.toString().padStart(2, '0') + ':' +
                       minutos.toString().padStart(2, '0') + ':' +
                       segundos.toString().padStart(2, '0')

  return horaFormateada
}
