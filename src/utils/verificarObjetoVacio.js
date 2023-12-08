/**
 *
 * @param {{}} obj Objeto a verificar
 * @returns {Boolean} Retorna true si el objeto está vacío, false si no lo está
 */
export default function (obj) {
  return Object.keys(obj).length === 0
}
